import { useEffect, useState } from "react";

// Helper function to initialize a 60-day countdown
const initializeCountdown = () => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 60); // 60 days from now
  return endDate;
};

interface TimerProps {
  // Accepts the expiration date as a prop
  expDate: Date;
}
const Timer = ({ expDate }: TimerProps) => {
  // const [expiryDate] = useState(initializeCountdown());
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(expDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(new Date(expDate)));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expDate]);

  if (!timeLeft) {
    return <div className="text-4xl text-red-500">Ticker expired</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-2xl font-semibold text-center">
        Configure Your Security Token
      </div>
      {/* <div className="flex items-center justify-center space-x-3"> */}
      <div className="flex items-center justify-center space-x-3 bg-gray-100 p-5">
        <div className="w-40 p-4 bg-white rounded shadow">
          <p className="text-lg font-medium text-gray-700">{timeLeft.days}</p>
          <p className="text-sm text-gray-500">Days</p>
        </div>
        <div className="w-40 p-4 bg-white rounded shadow">
          <p className="text-lg font-medium text-gray-700">{timeLeft.hours}</p>
          <p className="text-sm text-gray-500">Hours</p>
        </div>
        <div className="w-40 p-4 bg-white rounded shadow">
          <p className="text-lg font-medium text-gray-700">
            {timeLeft.minutes}
          </p>
          <p className="text-sm text-gray-500">Mins</p>
        </div>
        <div className="w-40 p-4 bg-white rounded shadow">
          <p className="text-lg font-medium text-gray-700">
            {timeLeft.seconds}
          </p>
          <p className="text-sm text-gray-500">Secs</p>
        </div>
      </div>
      <div
        className="info-box bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="mt-10">
            <svg
              className="fill-current h-6 w-6 text-blue-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 20a10 10 0 110-20 10 10 0 010 20zM9 4a1 1 0 012 0v1a1 1 0 01-2 0V4zm2 4a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L11 11.414V16a1 1 0 11-2 0v-4.586l-1.293 1.293a1 1 0 01-1.414-1.414l3-3A1 1 0 0111 8z" />
            </svg>
          </div>
          <div className="py-10">
            <p className="font-bold">Information</p>
            <p className="text-sm">
              Configuring your security token is not your security token
              offering (STO). It is the process of setting the specifics of your
              security token. Please consult your legal and financial advisor
              for regulations applicable to your security token.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate the time left until the expiry date
const calculateTimeLeft = (endDate: Date) => {
  const now = new Date();
  const difference = endDate.getTime() - now.getTime();

  if (difference <= 0) {
    return null; // Timer expired
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
};

export default Timer;
