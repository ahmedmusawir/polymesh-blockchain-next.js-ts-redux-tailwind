import { useRouter } from "next/router";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Success() {
  const router = useRouter();
  const [confettiRun, setConfettiRun] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setConfettiRun(false), 7000); // run confetti for 7 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      {confettiRun && typeof window !== "undefined" && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <FaCheckCircle className="text-green-500 mb-4" size="5em" />
      <h1 className="text-4xl font-bold mb-6">Congratulations!</h1>
      <p className="text-xl text-gray-700 mb-8">
        Your token has been created successfully.
      </p>
      <button
        onClick={() => router.push("/polymesh-studio")}
        className="btn btn-primary"
      >
        Manage Token
      </button>
    </div>
  );
}
