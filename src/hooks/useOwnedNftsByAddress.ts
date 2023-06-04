import { useQuery } from "react-query";
import { useUser } from "../context/UserContext";
import type { OwnedNftsResponse } from "alchemy-sdk";

const SIZE = 5;
const CONTRACT_ADDRESSES = ["0x5Af0D9827E0c53E4799BB226655A1de152A425a5"];

export const useOwnedNftsByAddress = (pageKey?: string) => {
  const { fetchedUser: user } = useUser();
  const { isSignedIn } = user;
  const { data, refetch, isFetching, isError } = useQuery(
    [`nfts_${user.address}`],
    async () => {
      try {
        const r = (
          await (
            await fetch("/api/alchemy/getNfts", {
              body: JSON.stringify({
                address: user.address,
                size: SIZE,
                contractAddresses: CONTRACT_ADDRESSES,
                pageKey,
              }),
              method: "POST",
              headers: { "Content-type": "application/json" },
            })
          ).json()
        ).data;
        return r;
      } catch (err) {
        throw err;
      }
    },
    {
      enabled: isSignedIn,
    }
  );
  return {
    fetch: refetch,
    isFetching,
    isError,
    nfts: data as OwnedNftsResponse,
  };
};
