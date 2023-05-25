/**
 * Checks if user is signed in
 * returns all users data if signed in
 */

import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const fetchUser = async ({ userId }: { userId: string }) => {
  try {
    const r = (
      await (
        await fetch("/api/query/user", {
          body: JSON.stringify({ userId }),
          method: "POST",
          headers: { "Content-type": "application/json" },
        })
      ).json()
    ).data;
    return r;
  } catch (err) {
    throw err;
  }
};

const useUser = (): {
  isLoading: boolean;
  isError: boolean;
  user: User | undefined;
  refetch: () => void;
  isSignedIn: boolean;
  hasCompletedVerification: boolean;
} => {
  const { data: session } = useSession();
  const userId = session?.user.databseId;
  const [fetchedUser, setFetchedUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasCompletedVerification, setHasCompletedVerification] =
    useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refetch = async () => {
    try {
      if (userId) {
        setIsLoading(true);
        const r = await fetchUser({ userId });
        setFetchedUser(r);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const { isDisconnected } = useAccount({
    onDisconnect: async () => {
      refetch();
    },
  });
  const isSignedIn = !isDisconnected && !!session?.user.address;

  useEffect(() => {
    if (!fetchedUser && userId) {
      refetch();
    }
    if (isDisconnected) {
      refetch();
    }
    if (fetchedUser) {
      setHasCompletedVerification(fetchedUser?.hasCompletedVerification);
    }
  }, [fetchedUser, userId, isDisconnected, refetch]);

  return {
    isLoading,
    isError,
    user: fetchedUser,
    refetch,
    isSignedIn,
    hasCompletedVerification,
  };
};

export default useUser;
