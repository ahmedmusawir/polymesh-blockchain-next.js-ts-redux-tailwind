// PopupReservations.tsx
import React from "react";
import { useReserveTickerMutation } from "@/features/polymesh/apiPolymesh";
import { toast } from "react-toastify";
import Spinner from "@/components/ui-ux/Spinner";
import { useRouter } from "next/router";

interface Props {
  ticker: string;
  isOpen: boolean;
  onClose: () => void;
}

const PopupReservations = ({ ticker, isOpen, onClose }: Props) => {
  const [reserveTicker, { isLoading }] = useReserveTickerMutation();
  const router = useRouter();

  const handleSubmit = async () => {
    const toastId = toast.loading(
      "Please wait, while the Ticker Reservation process is ongoing...",
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        style: { background: "#3498DB", color: "#fff" }, // Default style for loading
      }
    );

    // Close the modal right after launching the toast
    onClose();

    try {
      // Attempt to reserve the ticker using the SDK
      const reservation = await reserveTicker(ticker).unwrap();

      // Log the reservation response for debugging
      console.log("Reservation successful:", reservation);

      // Extract the reserved ticker from the response if needed
      const reservedTicker = reservation.ticker; // This depends on the API response structure

      // Update toast with success message
      toast.update(toastId, {
        render: `Ticker ${reservedTicker} reserved successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        style: { background: "green", color: "#fff" }, // Success style
      });

      // Redirect the user to the token configuration page for the newly reserved ticker
      router.push(`/token/${reservedTicker}`);
    } catch (error) {
      console.error("Reservation failed:", error);

      // Update toast with error message
      toast.update(toastId, {
        render: "Failed to reserve ticker. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        style: { background: "red", color: "#fff" }, // Error style
      });

      // Optionally, redirect to a failure page or handle the error differently
      // router.push(`/token/${ticker}/token-failed`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen && "modal-open"}`}>
      <div className="modal-box relative">
        <h3 className="text-lg font-semibold mb-4">
          Confirm your information before serving your token ticker symbol
        </h3>
        <p className="mb-4">
          Confirming will prompt your Polymesh Wallet Extension. Please review
          and sign the transaction in the extension to continue.
        </p>
        <div className="flex items-center mb-4">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <span>ST</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm opacity-50">Security Token Owner</div>
            <div className="text-lg">
              Polymesh ID: 0x865c8ff23...7dce98a842e
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-sm opacity-50">Security token ticker symbol</div>
          <div className="text-lg">{ticker}</div>
        </div>
        <div className="flex justify-between items-center mb-4 bg-green-600 p-5">
          <div className="text-sm opacity-100 text-white">Total Cost</div>
          <div className="text-lg text-white">1,000 POLYX</div>
        </div>
        {isLoading && <Spinner />}
        <div className="modal-action">
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Confirm
          </button>
        </div>
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PopupReservations;
