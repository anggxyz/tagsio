import type { User } from "@prisma/client";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useDisconnect } from "wagmi";
import Button from "./Button";
import formatWalletAddress from "../utils/formatAddress";

export const ConnectWalletButton = ({
  isSignedIn,
  user,
}: {
  isSignedIn: boolean;
  user?: User;
}) => {
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
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
          handleClick={() => disconnect()}
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
      hoverEffect={false}
      className="w-full bg-blue-500 text-white"
    />
  );
};
