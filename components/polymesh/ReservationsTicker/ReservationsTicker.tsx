import { useState } from "react";
import { useRouter } from "next/router";
import {
  useTickerExistsMutation,
  useReserveTickerMutation,
} from "@/features/polymesh/apiPolymesh";
import PopupReservations from "./PopupReservations";
import { FaCheck, FaTimes } from "react-icons/fa";

const ReservationsTicker = () => {
  const router = useRouter();
  const [checkTickerExists, { isLoading: isChecking }] =
    useTickerExistsMutation();
  const [reserveTicker, { isLoading: isReserving }] =
    useReserveTickerMutation();

  const [symbol, setSymbol] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [tickerAvailable, setTickerAvailable] = useState<boolean | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value.toUpperCase());
    // Reset ticker availability status when user types a new symbol
    setTickerAvailable(null);
  };

  const checkAvailability = async () => {
    if (symbol) {
      // Only check if symbol is not empty
      // Trigger ticker existence check
      const exists = await checkTickerExists(symbol).unwrap();
      setTickerAvailable(!exists);
    }
  };

  const submitTicker = async () => {
    // Only set the popup to show if the ticker is available
    const exists = await checkTickerExists(symbol).unwrap();
    if (!exists) {
      setShowPopup(true);
    } else {
      // Handle the case where the ticker already exists
      console.log("Error: Ticker Already Exists");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Reserve your ticker symbol</h2>
      {/* Ticker name form input */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Enter ticker symbol (up to 12 Characters)"
          value={symbol}
          onChange={handleChange}
          onBlur={checkAvailability}
        />
        {/* Ticker avaiablility green check mark and red x */}
        {tickerAvailable !== null && (
          <div
            className={`ml-2 flex-shrink-0 flex items-center justify-center rounded-full p-2 ${
              tickerAvailable ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {tickerAvailable ? (
              <FaCheck className="text-green-800" />
            ) : (
              <FaTimes className="text-red-800" />
            )}
          </div>
        )}
      </div>

      <div className="p-5 bg-gray-100 rounded">
        <p className="text-sm text-gray-500 pb-8">Your Ticker Symbol</p>
        <p
          className={`text-5xl font-bold pb-6 ${
            symbol ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {symbol.toUpperCase() || "New Ticker"}
        </p>
      </div>

      <div className="text-lg my-5 text-gray-400">
        Ticker symbol reservation fee 1,000 POLYX
      </div>

      {/* When button is clicked, showPopup is set to true */}
      <button
        className="btn btn-primary mt-4"
        onClick={submitTicker}
        disabled={isChecking || isReserving || symbol === ""}
      >
        Reserve ticker symbol
      </button>

      {/* PopupReservations component is controlled by showPopup state */}
      {showPopup && (
        <PopupReservations
          ticker={symbol}
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default ReservationsTicker;
