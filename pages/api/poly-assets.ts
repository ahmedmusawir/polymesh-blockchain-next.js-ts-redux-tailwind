// pages/api/assets.ts
// import { fetchAllAssets } from "@/polymesh/fetchAllAssets";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const assets = await fetchAllAssets();
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assets" });
  }
}
