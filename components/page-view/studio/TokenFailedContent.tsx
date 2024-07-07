import Head from "next/head";
import React from "react";
import Failure from "@/components/polymesh/ConfigureToken/Failed";
import { Page } from "@/components/globals";

const TokenFailedContent = () => {
  return (
    <>
      <Head>
        <title>Token Creation Failed</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <Failure />
      </Page>
    </>
  );
};

export default TokenFailedContent;
