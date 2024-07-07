import { getPolyClient } from "@/services/polymeshClient";

// Typescript declaration of the Global Window Object
declare global {
  interface Window {
    injectedWeb3?: any;
  }
}

// Checking for the Wallet Extension
export const isPolymeshWalletInstalled = (): boolean => {
  return Boolean(window.injectedWeb3 && window.injectedWeb3["polywallet"]);
};

// Connecting to wallet once the Extension is present
export const connectToPolymeshWallet = async () => {
  if (!isPolymeshWalletInstalled()) {
    throw new Error("Polymesh Wallet extension is not installed.");
  }

  try {
    // This should trigger wallet interaction if installed
    const polyClient = await getPolyClient();
    return polyClient;
  } catch (error) {
    console.error("Failed to connect to Polymesh Wallet:", error);
    throw error;
  }
};

// Checking if the user is logged into the Polymesh Account
export const isUserLoggedIn = async (): Promise<boolean> => {
  try {
    const polyClient = await connectToPolymeshWallet();
    const accounts = await polyClient.accountManagement.getSigningAccounts();
    console.log("Signing Account", accounts);
    return accounts.length > 0;
  } catch {
    return false;
  }
};

// Returning Fund Round for Single Token Asset
export const getFundingRound = async (
  ticker: string
): Promise<string | null> => {
  try {
    const polyClient = await connectToPolymeshWallet();
    const fungibleAsset = await polyClient.assets.getFungibleAsset({
      ticker,
    });

    const fundRound = fungibleAsset.currentFundingRound();

    return fundRound;
  } catch {
    return "";
  }
};
