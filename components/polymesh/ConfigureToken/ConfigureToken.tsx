import Spinner from "@/components/ui-ux/Spinner";
import { useGetTickerDetailsQuery } from "@/features/polymesh/apiPolymesh";
import { useRouter } from "next/router";
import ConfigForm from "./ConfigForm";
import Timer from "./Timer";

const ConfigureToken = () => {
  const router = useRouter();
  const { ticker } = router.query;
  // Getting Single Ticker Details
  const {
    data: tickerDetails,
    isFetching,
    isError,
    error,
  } = useGetTickerDetailsQuery(typeof ticker === "string" ? ticker : "");

  console.log("Single Ticker Info:", tickerDetails);

  if (isFetching)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error loading details: {error.toString()}</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          {/* Left Column - Timer */}
          <Timer expDate={tickerDetails.expiryDate} />
        </div>
        {/* Right Column - Form */}
        <div className="md:col-span-7">
          <ConfigForm status={tickerDetails.status} />
        </div>
      </div>
    </div>
  );
};

export default ConfigureToken;
