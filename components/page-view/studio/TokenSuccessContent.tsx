import Head from "next/head";
import React from "react";
import Success from "@/components/polymesh/ConfigureToken/Success";
import { Page } from "@/components/globals";

const TokenSuccessContent = () => {
  return (
    <>
      <Head>
        <title>Token Success</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <Success />
      </Page>
    </>
  );
};

export default TokenSuccessContent;
