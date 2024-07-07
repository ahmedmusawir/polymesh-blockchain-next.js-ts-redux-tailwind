import { Page } from "@/components/globals";
import SingleToken from "@/components/polymesh/TokenManagement/SingleToken";
import Head from "next/head";
import React from "react";

const SingleTokenContent = () => {
  return (
    <>
      <Head>
        <title>Next Page SingleTokenContent</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <SingleToken />
      </Page>
    </>
  );
};

export default SingleTokenContent;
