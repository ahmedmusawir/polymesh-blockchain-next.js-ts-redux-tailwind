import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";

export default function Failure() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <FaTimesCircle className="text-red-500 mb-4" size="5em" />
      <h1 className="text-4xl font-bold mb-6">Something Went Wrong</h1>
      <p className="text-xl text-gray-700 mb-8">
        Unfortunately, we were unable to create your token.
      </p>
      {/* <button onClick={() => router.back()} className="btn btn-primary">
        Go Back To Token Config
      </button> */}
      <button
        onClick={() => router.push("/polymesh-studio")}
        className="btn btn-primary"
      >
        Go Back To Studio
      </button>
    </div>
  );
}
