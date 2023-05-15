import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import useWallet from "../hooks/useWallet";
import formatWalletAddress from "../utils/formatAddress";
import { useDisconnect } from "wagmi"


const LoginButton = () => {
  const wallet = useWallet();
  const { disconnect } = useDisconnect({
    onSuccess(data) {
      console.log("Success", data)
    },
    onSettled(data, error) {
      console.log("Settled", { data, error })
    },
  })

  const handle = () => {
    console.log("handling");
    disconnect();
  }

  if (wallet.isSignedIn) {
    return (
      <Button
        title={formatWalletAddress(wallet.wallet)}
        handleClick={handle}
        hoverEffect={false}
      />
    )
  }
  else {
    return (
      // @todo not sure why Button component doesn't work here

      // <Button handleClick={openConnectModal} title="Connect" />
      <div className=" self-center">
        <ConnectButton label="Connect" />
      </div>
    )
  }
};
export default LoginButton;
