export type FormValues = {
  name: string;
  assetType: string;
  tokenCustomType: string;
  securityIdentifiers: Obj[];
  fundingRound: string;
  otherFundingRound: string;
  isDivisible: string;
  references: Reference[];
};

type Reference = { type: string; reference: string };
type Obj = { type: string; value: string };
