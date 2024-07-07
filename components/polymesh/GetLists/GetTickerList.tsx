import Link from "next/link";
import React from "react";
import { FaConnectdevelop } from "react-icons/fa";

type Ticker = {
  uuid: string;
  ticker: string;
};

interface Props {
  tickers: Ticker[];
}

function GetTickerList({ tickers }: Props) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-8">Your Reserved Ticker List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Token Cards */}
        {tickers?.map((ticker: Ticker) => (
          <div
            key={ticker.uuid}
            className="border p-8 rounded-lg shadow-lg flex flex-col justify-center items-center bg-indigo-100"
          >
            <h3 className="text-xl font-semibold mb-5">{ticker.ticker}</h3>
            {/* <FaConnectdevelop className="text-blue-500 text-6xl my-5" /> */}

            <Link
              href={`/token/${ticker.ticker}`}
              className="text-white bg-green-600 hover:text-indigo-900 btn"
            >
              Create token
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default GetTickerList;
