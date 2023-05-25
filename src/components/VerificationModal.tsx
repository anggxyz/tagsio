import Modal from "react-modal";
import type { User } from "@prisma/client";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { VerifyTwitter } from "./VerifyTwitterButton";
import { SignMessage } from "./SignTypedMessage";

export const VerificationModal = ({
  modalIsOpen,
  closeModal,
  user,
  isSignedIn,
  refetch,
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
  user: User | undefined;
  isSignedIn: boolean;
  refetch: () => void;
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "550px",
      height: "400px",
      borderRadius: "12px",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Get Verified"
      ariaHideApp={false}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="mb-2 flex flex-row justify-between rounded-md bg-green-700 p-2 text-white">
          <div>Get Verified</div>
          <button onClick={closeModal}>close</button>
        </div>
        <div className="flex h-full flex-col justify-center gap-3">
          <ConnectWalletButton isSignedIn={isSignedIn} user={user} />
          <VerifyTwitter
            user={user}
            refetch={refetch}
            isSignedIn={isSignedIn}
          />
          <SignMessage user={user} refetchUser={refetch} />
        </div>
      </div>
    </Modal>
  );
};
