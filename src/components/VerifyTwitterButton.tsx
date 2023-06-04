import Button from "./Button";
import { signIn } from "next-auth/react";

export const VerifyTwitter = () => {
  const connectTwitter = async () => {
    await signIn();
  };
  return (
    <Button
      title="Verify Twitter"
      handleClick={() => connectTwitter()}
      className="w-full bg-green-500 text-white"
    />
  );
};
