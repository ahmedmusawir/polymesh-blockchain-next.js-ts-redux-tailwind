import { FormValues } from "./ConfigForm.types";

export const initialValues = {
  name: "",
  assetType: "Equity Common",
  tokenCustomType: "",
  securityIdentifiers: [{ type: "None", value: "" }],
  fundingRound: "",
  otherFundingRound: "",
  isDivisible: "Indivisible",
  references: [{ type: "", reference: "" }],
};

export const instrumentType = [
  {
    name: "Equity Common",
  },
  {
    name: "Equity Preferred",
  },
  {
    name: "Commodity",
  },
  {
    name: "Fixed Income",
  },
  {
    name: "REIT",
  },
  {
    name: "Fund",
  },
  {
    name: "Revenue Share Agreement",
  },
  {
    name: "Structured Product",
  },
  {
    name: "Derivative",
  },
  {
    name: "Stable Coin",
  },
  {
    name: "Custom",
  },
];

export const securityIdentifierType = [
  {
    name: "None",
  },
  {
    name: "Isin",
  },
  {
    name: "Cusip",
  },
  {
    name: "Cins",
  },
  {
    name: "Lei",
  },
];

export const assignedFundingRound = [
  {
    name: "Angel",
  },
  {
    name: "Pre-Seed",
  },
  {
    name: "Seed",
  },
  {
    name: "Venture - Series Unknown",
  },
  {
    name: "Series A",
  },
  {
    name: "Series B",
  },
  {
    name: "Series C",
  },
  {
    name: "Equity Crowdfunding",
  },
  {
    name: "Private Equity",
  },
  {
    name: "Convertible Note",
  },
  {
    name: "Debt Financing",
  },
  {
    name: "Other",
  },
];

export const valMath = (obj: FormValues) => {
  type MyObjectType = {
    name: string;
    assetType: string;
    fundingRound: string;
    isDivisible: string;
    securityIdentifiers: string;
  };

  const newDetails: MyObjectType = {
    name: obj.name,
    assetType: obj.assetType,
    fundingRound: obj.fundingRound,
    isDivisible: obj?.isDivisible,
    securityIdentifiers: obj?.securityIdentifiers[0].value ? "true" : "",
  };

  let val = 17;
  for (const key in newDetails) {
    if (
      newDetails.hasOwnProperty(key) &&
      newDetails[key as keyof MyObjectType]
    ) {
      val += 17;
    }
  }

  if (val > 100) return 100;
  return val;
};
