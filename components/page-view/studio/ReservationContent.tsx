import { Page } from "@/components/globals";
import ReservationsTicker from "@/components/polymesh/ReservationsTicker/ReservationsTicker";
import Head from "next/head";
import React from "react";

const ReservationsContent = () => {
  return (
    <>
      <Head>
        <title>Reservations Ticker</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <ReservationsTicker />
      </Page>
    </>
  );
};

export default ReservationsContent;
