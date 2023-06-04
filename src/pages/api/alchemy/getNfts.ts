import type { GetNftsForOwnerOptions } from "alchemy-sdk";
import { pick } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { getNftsForOwner } from "~/src/server/utils/alchemy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("[api/alchemy/getNfts]");

  const {
    address,
    size,
    pageKey,
    contractAddresses,
  }: {
    address: string;
    size: GetNftsForOwnerOptions["pageSize"];
    pageKey: GetNftsForOwnerOptions["pageKey"];
    contractAddresses: GetNftsForOwnerOptions["contractAddresses"];
  } = pick(req.body, ["address", "size", "pageKey", "contractAddresses"]);

  if (!address || !size) {
    throw new Error(
      `Address or size undefined: ${JSON.stringify({ address, size, pageKey })}`
    );
  }

  console.log(`Fetching only for ${JSON.stringify({ contractAddresses })}`);

  const options: GetNftsForOwnerOptions = {
    pageSize: size,
    pageKey,
    contractAddresses,
  };

  const nfts = await getNftsForOwner({ address, options });

  res.status(200).json({
    data: nfts,
  });
}
