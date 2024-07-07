import Spinner from "@/components/ui-ux/Spinner";
import { useConfigureTokenMutation } from "@/features/polymesh/apiPolymesh";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  assetType: string;
  securityIdentifierType: string;
  fundingRound: string;
  isDivisible: boolean;
  references: Array<{
    type: string;
    reference: string;
  }>;
};

type ConfirmationModalProps = {
  details: FormValues | null;
  onClose: () => void;
};

const ConfigPopup = ({ details, onClose }: ConfirmationModalProps) => {
  const router = useRouter();
  const { ticker } = router.query;
  const [configureToken, { isLoading, isError, isSuccess, error }] =
    useConfigureTokenMutation();

  // Handler for the confirm button
  const handleConfirm = async () => {
    const toastId = toast.loading(
      "Please wait, while the Token Minting process is ongoing...",
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        style: { background: "#333", color: "#fff" }, // Default style for loading
      }
    );

    // Close the modal right after launching the toast
    onClose();

    try {
      if (details && ticker) {
        const result = await configureToken({
          ticker: ticker as string,
          data: {
            name: details.name,
            assetType: details.assetType,
            securityIdentifier: details.securityIdentifierType,
            fundingRound: details.fundingRound,
            isDivisible: false,
          },
        }).unwrap();

        console.log(result); // Log or handle the result
        toast.update(toastId, {
          render: "Token configured successfully!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          style: { background: "green", color: "#fff" }, // Success style
        });
        onClose(); // Close the modal
        router.push(`/token/${ticker}/token-success`); // Redirect to success page
      }
    } catch (e) {
      console.error("Error during token configuration:", e);
      toast.update(toastId, {
        render: "Failed to configure token.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        style: { background: "red", color: "#fff" }, // Error style
      });
      router.push(`/token/${ticker}/token-failed`); // Redirect to failure page or handle the error
    }
  };

  return (
    <div
      className={`modal ${details ? "modal-open" : ""}`}
      id="confirmationModal"
    >
      {/* Begin Modal */}
      <div className="modal modal-open">
        <div className="modal-box relative">
          <h3 className="text-2xl font-bold mb-4 pt-5">
            Confirm your security token details
          </h3>

          {isLoading && (
            <div className="flex items-center justify-center h-screen">
              <Spinner />
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <div>
                <h3 className="text-xl font-bold text-gray-700 flex">
                  <span className="bg-gray-200 rounded-full p-3 mr-2">
                    <FaUser />
                  </span>{" "}
                  <span className="mt-2">Security Token Owner:</span>
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Polymesh ID: 0x865c8ff23...7dce98a842e
                </p>
              </div>

              <hr className="my-2" />
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow flex justify-between">
              <span className="text-gray-600 font-bold">
                Security token symbol:
              </span>
              <span className="text-gray-500">{ticker}</span>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow flex justify-between">
              <span className="text-gray-600 font-bold">Token Name:</span>
              <span className="text-gray-500">{details?.name}</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow flex justify-between">
              <span className="text-gray-600 font-bold">Instrument type:</span>
              <span className="text-gray-500"> {details?.assetType}</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow flex justify-between">
              <span className="text-gray-600 font-bold">
                Security identifier:
              </span>
              <span className="text-gray-500">NONE</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow flex justify-between">
              <span className="text-gray-600 font-bold">
                Assigned Fund Round:
              </span>
              <span className="text-gray-500">{details?.fundingRound}</span>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow flex justify-between">
              <span className="text-gray-600 font-bold">
                Divisibility of token:
              </span>
              <span className="text-gray-500">
                {/* {details?.isDivisible ? "Divisible" : "Indivisible"} */}
                Indivisible
              </span>
            </div>
          </div>

          {/* Use the spacing utilities to ensure there's enough room for the absolute positioned buttons */}
          <div className="flex justify-end mt-4">
            {" "}
            {/* Remove absolute positioning, use flexbox for alignment */}
            <button
              className="btn btn-outline btn-secondary mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleConfirm}>
              {isLoading ? "Confirming..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>

      {/* End Modal */}
    </div> // Main Modal Ends
  );
};

export default ConfigPopup;
