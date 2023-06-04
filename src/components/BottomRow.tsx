import Button from "./Button";
import { useUser } from "../context/UserContext";
import { ConnectWalletButton } from "./ConnectWalletButton";

export const BottomRow = () => {
  const { fetchedUser: user } = useUser();
  const { isSignedIn } = user;

  return (
    <>
      {/* <VerificationModal modalIsOpen={modalIsOpen} closeModal={closeModal} /> */}
      <div className="flex w-full flex-col gap-2">
        <Button
          title="Buy"
          handleClick={() => {
            console.log("buy here");
          }}
          className={`${!isSignedIn ? "" : "bg-green-500 text-white"}`}
          disabled={!isSignedIn}
        />
        <ConnectWalletButton />
      </div>
    </>
  );
};
