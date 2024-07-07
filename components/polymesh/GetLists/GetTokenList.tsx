import Link from "next/link";
import React from "react";
import { FaConnectdevelop } from "react-icons/fa";

type Asset = {
  uuid: string;
  ticker: string;
};

interface Props {
  assets: Asset[];
}

function GetTokenList({ assets }: Props) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-8">Your Token List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Token Cards */}
        {assets?.map((asset: Asset) => (
          <div
            key={asset.uuid}
            className="border p-8 rounded-lg shadow-lg flex flex-col justify-center items-center"
          >
            <h3 className="text-xl font-semibold">{asset.ticker}</h3>
            <FaConnectdevelop className="text-green-700 text-6xl my-5" />

            <Link
              href={`/token/${asset.ticker}/dashboard`}
              className="text-green-800 hover:text-indigo-900 btn"
            >
              Manage token
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default GetTokenList;
