import { useConnectModal } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import formatWalletAddress from "../utils/formatAddress";
import { useUser } from "../context/UserContext";
import { signOut } from "next-auth/react";

export const ConnectWalletButton = () => {
  const { openConnectModal } = useConnectModal();
  const { fetchedUser: user } = useUser();
  const { isSignedIn } = user;
  if (isSignedIn && user?.address) {
    return (
      <div className="flex flex-row gap-2">
        <Button
          handleClick={() => {
            /** do nothing */
          }}
          title={formatWalletAddress(user.address)}
          className="w-full bg-blue-500 text-white"
          disabled={true}
        />{" "}
        <Button
          title="Disconnect"
          handleClick={() => signOut()}
          hoverEffect={false}
          className="h-10 w-auto bg-red-500 text-white hover:bg-red-600"
        />
      </div>
    );
  }
  return (
    <Button
      handleClick={openConnectModal}
      title="Connect Wallet"
      hoverEffect={true}
      className="w-full bg-blue-500 text-white"
    />
  );
};