import { Page } from "@/components/globals";
import ConfigureToken from "@/components/polymesh/ConfigureToken/ConfigureToken";
import Head from "next/head";
import React from "react";

const Template = () => {
  return (
    <>
      <Head>
        <title>Next Page Template</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <ConfigureToken />
      </Page>
    </>
  );
};

export default Template;
