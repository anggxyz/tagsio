import { useConnectModal } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import useWallet from "../hooks/useWallet";
import formatWalletAddress from "../utils/formatAddress";


const LoginButton = () => {
  const { openConnectModal } = useConnectModal();
  const wallet = useWallet();
  if (wallet.isSignedIn) {
    return (
      <Button
        title={formatWalletAddress(wallet.wallet)}
        hoverEffect={false}
      />
    )
  }
  else {
    return (
      <Button onClick={openConnectModal} title="Connect" />
    )
  }
};
export default LoginButton;
