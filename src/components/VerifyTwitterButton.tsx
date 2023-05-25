import Image from "next/image";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import type { User } from "@prisma/client";
import { signIn } from "next-auth/react";

const disconnectTwitterApi = async ({ userId }: { userId: string }) => {
  try {
    const r = (
      await (
        await fetch("/api/update/removeTwitterFields", {
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

export const VerifyTwitter = ({
  user,
  refetch,
  isSignedIn,
}: {
  user: User | undefined;
  refetch: () => void;
  isSignedIn: boolean;
}) => {
  const { isDisconnected } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const disconnectTwitter = async () => {
    setIsLoading(true);
    try {
      if (user?.id) {
        await disconnectTwitterApi({ userId: user?.id });
        await refetch();
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const connectTwitter = async () => {
    await signIn();
    await refetch();
  };

  const [buttonLabel, setButtonLabel] = useState<string>("Remove");

  // @todo fix, messy
  useEffect(() => {
    if (isLoading) {
      setButtonLabel("...");
    }
    if (isError) {
      setButtonLabel("error. refresh?");
    }
    if (!isLoading && !isError) {
      setButtonLabel("Remove");
    }
  }, [isLoading, isError]);
  if (user?.twitterId && !isDisconnected) {
    return (
      <div className="flex w-full transform flex-row items-center justify-between gap-3 rounded-md bg-slate-300 p-3 text-slate-800 transition duration-500">
        <div className="flex flex-row items-center gap-4">
          {user.twitterImage && (
            <Image
              src={user.twitterImage}
              width={75}
              height={75}
              alt="hello"
              className="rounded-full border-4 border-primary-muted outline outline-offset-4"
            />
          )}
          <div className="font-semibold italic">{user.twitterHandle}</div>
        </div>
        <Button
          title={buttonLabel}
          handleClick={() => disconnectTwitter()}
          hoverEffect={false}
          className="h-10 w-auto bg-red-500 text-white hover:bg-red-600"
          disabled={isLoading}
        />
      </div>
    );
  }
  console.log(isDisconnected || !isSignedIn);
  if (isDisconnected || !isSignedIn) {
    return (
      <Button
        title="Connect Wallet to Verify Twitter"
        handleClick={() => {
          /** do nothing */
        }}
        hoverEffect={false}
        disabled={true}
      />
    );
  }
  return (
    <Button
      title="Verify Twitter"
      handleClick={() => connectTwitter()}
      className="w-full bg-green-500 text-white"
    />
  );
};
