import type { GetNftsForOwnerOptions } from "alchemy-sdk";
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_ID,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

export const getNftsForOwner = ({
  address,
  options,
}: {
  address: string;
  options: GetNftsForOwnerOptions;
}) => {
  return alchemy.nft.getNftsForOwner(address, options);
};
