import { Documents } from "@polymeshassociation/polymesh-sdk/api/entities/Asset/Base/Documents";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getPolyClient } from "../../services/polymeshClient";

interface EditTokenParams {
  ticker: string;
  name?: string;
  assetType?: string;
  fundingRound?: string;
  // Add other editable properties here
}

export const apiPolymesh = createApi({
  reducerPath: "apiPolymesh",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Token"],
  endpoints: (builder) => ({
    // Get All Reserved Tickers
    getTickers: builder.query<any, void>({
      queryFn: async () => {
        try {
          const polyClient = await getPolyClient();
          const assets = await polyClient.assets.getTickerReservations();
          return { data: assets };
        } catch (error) {
          // If there's an error, return it as part of the result
          return { error: error as any };
        }
      },
    }),
    // Get All Tokens
    getAssets: builder.query<any, void>({
      queryFn: async () => {
        try {
          const polyClient = await getPolyClient();
          const assets = await polyClient.assets.getAssets();
          return { data: assets };
        } catch (error) {
          // If there's an error, return it as part of the result
          return { error: error as any };
        }
      },
    }),
    // Single Ticker Details
    getTickerDetails: builder.query<any, string>({
      queryFn: async (ticker) => {
        try {
          const polyClient = await getPolyClient();
          const reservedTicker = await polyClient.assets.getTickerReservation({
            ticker,
          });
          const details = await reservedTicker.details();
          return { data: details };
        } catch (error) {
          return { error: error as any };
        }
      },
    }),
    // Single Token Details
    getAssetDetails: builder.query<any, string>({
      queryFn: async (ticker) => {
        try {
          const polyClient = await getPolyClient();
          const fungibleAsset = await polyClient.assets.getFungibleAsset({
            ticker,
          });
          const details = await fungibleAsset.details();
          return { data: details };
        } catch (error) {
          return { error: error as any };
        }
      },
    }),
    // Getting Fund Round Info
    getFundRound: builder.query<any, string>({
      queryFn: async (ticker) => {
        try {
          const polyClient = await getPolyClient();
          const fungibleAsset = await polyClient.assets.getFungibleAsset({
            ticker,
          });
          const details = await fungibleAsset.currentFundingRound();
          return { data: details };
        } catch (error) {
          return { error: error as any };
        }
      },
    }),
    // THIS IS FOR TESTING
    getTestingDetails: builder.query<any, string>({
      queryFn: async (ticker) => {
        try {
          const polyClient = await getPolyClient();
          const fungibleAsset = await polyClient.assets.getFungibleAsset({
            ticker: "BIBO",
          });

          // THE DATA FOR TOKEN UPDATE
          const assetParams = {
            name: "Bibo's Token",
            fundingRound: "Seed",
          };

          // Get Asset Details
          // const details = await fungibleAsset.modify(assetParams);
          const details = await fungibleAsset.modify({
            name: "Bibo's Token",
            fundingRound: "Seed",
          });
          details.run();

          // return { data: myDID };
          return { data: details };
        } catch (error) {
          return { error: error as any };
        }
      },
      keepUnusedDataFor: 0, // Disables caching
    }),
    // Mutation for editing token
    editToken: builder.mutation<any, EditTokenParams>({
      queryFn: async ({ ticker, name, assetType, fundingRound }) => {
        try {
          const polyClient = await getPolyClient();
          const fungibleAsset = await polyClient.assets.getFungibleAsset({
            ticker,
          });

          const updateData: any = {};
          if (name) updateData.name = name;
          if (assetType) updateData.assetType = assetType;
          if (fundingRound) updateData.fundingRound = fundingRound;

          const details = await fungibleAsset.modify(updateData);
          await details.run(); // `run` must be is awaited if it's a promise

          return { data: details };
        } catch (error) {
          return { error: error as any };
        }
      },
      invalidatesTags: [{ type: "Token", id: "LIST" }],
    }),

    // New mutation for ticker existence check
    tickerExists: builder.mutation<boolean, string>({
      queryFn: async (ticker) => {
        try {
          const polyClient = await getPolyClient();
          await polyClient.assets.getAsset({ ticker });
          return { data: true }; // Ticker exists
        } catch (error) {
          return { data: false }; // Ticker does not exist or error occurred
        }
      },
    }),
    // Mutation for reserving a ticker
    reserveTicker: builder.mutation<any, string>({
      queryFn: async (ticker) => {
        try {
          const polyClient = await getPolyClient();
          const reservationQueue = await polyClient.assets.reserveTicker({
            ticker,
          });
          const reservation = await reservationQueue.run();
          return { data: reservation };
        } catch (error) {
          return { error: error as any };
        }
      },
    }),
    // Mutation for getting the expiry date of a ticker reservation
    expiryDate: builder.mutation<Date | null, string>({
      queryFn: async (ticker) => {
        if (!ticker) return { data: null }; // No ticker provided
        try {
          const polyClient = await getPolyClient();
          const reservation = await polyClient.assets.getTickerReservation({
            ticker,
          });
          const { expiryDate } = await reservation.details();
          return { data: expiryDate };
        } catch (error) {
          return { error: error as any };
        }
      },
    }),
    // Mutation for configuring a token
    configureToken: builder.mutation<any, { ticker: string; data: any }>({
      queryFn: async ({ ticker, data }) => {
        try {
          const polyClient = await getPolyClient();
          const reservation = await polyClient.assets.getTickerReservation({
            ticker,
          });
          const user = await polyClient.getSigningIdentity();
          const { owner } = await reservation.details();

          if (owner?.did !== user?.did) {
            throw new Error("User is not the owner of the ticker reservation.");
          }

          const assetQueue = await reservation.createAsset(data);
          const asset = await assetQueue.run();
          console.log("Inside RTK Query: asset::", asset);
          return { data: asset };
        } catch (error) {
          return { error: error as any };
        }
      },
    }),
    // Mutation for KYC verification
    kycVerification: builder.mutation<string, string>({
      queryFn: async (address) => {
        try {
          const polyClient = await getPolyClient();
          const account = await polyClient.accountManagement.getAccount({
            address,
          });
          const identity = await account.getIdentity();

          if (identity !== null) {
            return { data: "already exists" }; // Identity already exists
          }

          // If no identity, register a new one
          const newAccountQueue = await polyClient.identities.registerIdentity({
            targetAccount: address,
            createCdd: true,
          });
          const newIdentity = await newAccountQueue.run();
          return { data: newIdentity.did };
        } catch (error) {
          return { error: error as any };
        }
      },
    }),
  }),
});

export const {
  useGetFundRoundQuery,
  useGetTestingDetailsQuery,
  useGetTickersQuery,
  useGetAssetsQuery,
  useGetTickerDetailsQuery,
  useGetAssetDetailsQuery,
  useEditTokenMutation,
  useTickerExistsMutation,
  useReserveTickerMutation,
  useExpiryDateMutation,
  useConfigureTokenMutation,
  useKycVerificationMutation,
} = apiPolymesh;
