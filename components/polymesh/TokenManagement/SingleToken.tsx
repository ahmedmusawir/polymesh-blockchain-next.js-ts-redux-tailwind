import Spinner from "@/components/ui-ux/Spinner";
import { useAuth } from "@/contexts/AuthContext";
import {
  useGetAssetDetailsQuery,
  useGetFundRoundQuery,
  useGetTestingDetailsQuery,
} from "@/features/polymesh/apiPolymesh";
import { useRouter } from "next/router";
import SlideOpenForm from "./SlideOpenForm";

const SingleToken = () => {
  const router = useRouter();
  const { ticker } = router.query;
  const { setOpenTokenEditForm } = useAuth();

  // MAIN SINGLE QUERY - DO NOT TOUCH
  const {
    data: assetDetails,
    isFetching,
    isError,
    error,
  } = useGetAssetDetailsQuery(typeof ticker === "string" ? ticker : "");

  // GETTING THE FUNDING ROUND
  const { data: fundingRound, isFetching: froundIsFetching } =
    useGetFundRoundQuery(typeof ticker === "string" ? ticker : "");

  // TEST QUERY - REMOVE LATER
  const {
    data: testDetails,
    isFetching: testFetching,
    isError: testIsError,
    error: testError,
  } = useGetTestingDetailsQuery(typeof ticker === "string" ? ticker : "");

  // console.log("Single Token Info: TESTING", assetDetails);
  // console.log("Single Token Info: TESTING", testDetails);
  // console.log("funding round", fundingRound);

  if (isFetching || froundIsFetching)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error loading details: {error.toString()}</div>;

  return (
    <div>
      <h1 className="text-center">
        Asset Details for Token:{" "}
        <span className="text-green-600">{ticker}</span>
      </h1>
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Security token details
              </h3>
              <span className="text-base font-normal text-gray-500">
                Manage your security token details here.
              </span>
            </div>
            <button
              className="btn btn-outline btn-sm border border-green-600 text-green-600"
              onClick={() => setOpenTokenEditForm(true)}
            >
              Edit token details
            </button>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="text-md font-semibold text-blue-800 mb-8">
              Your ticker symbol
            </h4>
            <div className="text-3xl font-bold text-gray-800">{ticker}</div>
            <span>Total supply</span>
            <div className="font-semibold text-gray-900" text-4xl>
              0 BIBO
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-sm font-medium mt-4">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="text-gray-600 mt-2 flex items-center justify-between"></div>

              <div className="text-gray-600 mt-2 flex items-center justify-between  border-b border-gray-200 py-5">
                <span>Security token name</span>
                <span className="font-semibold text-gray-900">
                  {assetDetails.name}
                </span>
              </div>
              <div className="text-gray-600 mt-2 flex items-center justify-between  border-b border-gray-200 py-5">
                <span>Security Type</span>
                <span className="font-semibold text-gray-900">
                  {assetDetails.assetType}
                </span>
              </div>
              <div className="text-gray-600 mt-2 flex items-center justify-between  border-b border-gray-200 py-5">
                <span>Assigned Funding Round</span>
                <span className="font-semibold text-gray-900">
                  {fundingRound}
                </span>
              </div>
              <div className="text-gray-600 mt-2 flex items-center justify-between  border-b border-gray-200 py-5">
                <span>Divisibility</span>
                <span className="font-semibold text-gray-900">Indivisible</span>
              </div>
            </div>
            {/* Repeat the div above for each piece of information needed */}
          </div>
          {/* <div className="flex items-center justify-end mt-4">
            <button className="btn btn-primary">
              Configuration Transaction
            </button>
          </div> */}
        </div>
      </div>
      {assetDetails && (
        <SlideOpenForm
          name={assetDetails.name}
          assetType={assetDetails.assetType}
          fundingRound={fundingRound}
          ticker={ticker as string}
        />
      )}
    </div>
  );
};

export default SingleToken;
