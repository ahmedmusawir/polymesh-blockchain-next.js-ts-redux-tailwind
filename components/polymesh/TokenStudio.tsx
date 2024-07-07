import {
  useGetAssetsQuery,
  useGetTickersQuery,
} from "@/features/polymesh/apiPolymesh";
import Spinner from "../ui-ux/Spinner";
import GetTickerList from "./GetLists/GetTickerList";
import GetTokenList from "./GetLists/GetTokenList";

const TokenStudio = () => {
  const { data: assets, error, isLoading } = useGetAssetsQuery();
  const {
    data: tickers,
    error: tickerError,
    isLoading: isLoadingTickers,
  } = useGetTickersQuery();

  // console.log("Assets:", assets);
  // console.log("Tickers:", tickers);

  if (isLoading || isLoadingTickers)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="container mx-auto p-6 bg-white">
      <div>
        <GetTickerList tickers={tickers} />
        <div className="mb-10"></div>
        <GetTokenList assets={assets} />
      </div>
    </div>
  );
};

export default TokenStudio;
