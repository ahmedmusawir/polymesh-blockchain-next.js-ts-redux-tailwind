import { Page } from "@/components/globals";
import StudioEntryPoint from "@/components/polymesh/StudioEntryPoint";
import Head from "next/head";
import React from "react";

const StudioEntryContent = () => {
  return (
    <>
      <Head>
        <title>Welcome to Token Studio</title>
        <meta name="description" content="Security Token Launchpad" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page className={""} FULL={false}>
        <StudioEntryPoint />
      </Page>
    </>
  );
};

export default StudioEntryContent;
