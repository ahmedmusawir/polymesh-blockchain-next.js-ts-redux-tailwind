import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  isPolymeshWalletInstalled,
  isUserLoggedIn,
} from "@/utils/polymeshUtils";

const StudioEntryPoint = () => {
  const router = useRouter();

  const handleConnectWallet = async () => {
    if (!isPolymeshWalletInstalled()) {
      toast.error(
        "Polymesh Wallet extension is not installed. Please install it to proceed."
      );
      return;
    }

    const loggedIn = await isUserLoggedIn();
    if (loggedIn) {
      router.push("/polymesh-studio");
    } else {
      toast.info("Please log in to your Polymesh Wallet.");
      // Here you could invoke the login flow. This depends on the wallet API. If no API is available, this step can be as simple as instructing the user to log in.
    }
  };

  const handleInstallWallet = () => {
    // Redirect to the Polymesh Wallet installation page
    window.open(
      "https://chromewebstore.google.com/detail/polymesh-wallet/jojhfeoedkpkglbfimdfabpdfjaoolaf?hl=__REACT_APP_WALLET_URL%3Dhttps://chrome.google.com/webstore/detail/polymesh-wallet/jojhfeoedkpkglbfimdfabpdfjaoolaf?hl__",
      "_blank"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          <h1 className="text-4xl font-bold mb-16">Security Token Launchpad</h1>
          <p className="mt-3 text-lg mb-8">
            Token Studio allows issuers to reserve, configure and manage their
            security token. Connect your Polymesh Wallet to get started.
          </p>
          <div className="mt-6">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleConnectWallet}
            >
              Connect Polymesh Wallet
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-500 hover:text-white text-gray-800 font-bold py-2 px-4 rounded"
              onClick={handleInstallWallet}
            >
              Install Polymesh Wallet
            </button>
          </div>
        </div>
        <div className="md:col-span-2">
          <img
            src="https://res.cloudinary.com/dyb0qa58h/image/upload/v1714364641/austin-distel-DfjJMVhwH_8-unsplash_lz2w3d.jpg"
            alt="Random"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default StudioEntryPoint;
