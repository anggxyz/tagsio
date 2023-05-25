import Button from "./Button";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { VerificationModal } from "./VerificationModal";

export const BottomRow = () => {
  const { user, isSignedIn, refetch, hasCompletedVerification } = useUser();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const buyFunc = () => {
    console.log("buy");
  };
  const redeemFunc = () => {
    console.log("redeem");
  };

  useEffect(() => {
    if (user?.twitterId && !user.signature) {
      setIsOpen(true);
    }
  }, [user]);

  return (
    <>
      <VerificationModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        user={user}
        isSignedIn={isSignedIn}
        refetch={refetch}
      />
      {hasCompletedVerification && (
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-row gap-2">
            <Button
              title="Buy"
              handleClick={buyFunc}
              className="w-full bg-highlight text-white"
            />
            <Button
              title="Redeem"
              handleClick={redeemFunc}
              disabled
              className="w-full"
            />
          </div>

          <Button
            title="View Verification"
            handleClick={openModal}
            className="w-full bg-green-200 hover:bg-green-400"
            hoverEffect={false}
          />
        </div>
      )}
      {!hasCompletedVerification && (
        <>
          <Button
            title="Get Verified"
            handleClick={openModal}
            className="w-full bg-green-500 text-white"
          />
        </>
      )}
    </>
  );
};
