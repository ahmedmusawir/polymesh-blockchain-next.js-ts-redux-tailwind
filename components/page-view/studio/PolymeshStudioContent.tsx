import Head from "next/head";
import React from "react";
import { Page } from "../../globals";
import TokenStudio from "../../polymesh/TokenStudio";
import { useRouter } from "next/router";

const PolymeshStudioContent = () => {
  const router = useRouter();

  const handleCreateTokenClick = () => {
    router.push("/reservation");
  };

  return (
    <>
      <Head>
        <title>Raze Token Studio</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <div className="container mx-auto p-6 bg-white">
          <button
            className="btn btn-lg bg-green-600 text-white"
            onClick={handleCreateTokenClick}
          >
            Create New Token
          </button>
        </div>
        <TokenStudio />
      </Page>
    </>
  );
};

export default PolymeshStudioContent;
