// polymeshService.ts
import { Polymesh } from "@polymeshassociation/polymesh-sdk";
import { BrowserExtensionSigningManager } from "@polymeshassociation/browser-extension-signing-manager";

let polyClient: Polymesh | null = null;

export const getPolyClient = async () => {
  if (polyClient) {
    return polyClient;
  }

  const signingManager = await BrowserExtensionSigningManager.create({
    appName: "YourAppName", // replace with your actual app name
  });

  polyClient = await Polymesh.connect({
    nodeUrl: "wss://testnet-rpc.polymesh.live", // or another network you’re using
    signingManager,
  });

  return polyClient;
};
