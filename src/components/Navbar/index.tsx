import { Branding } from "./Branding";

export const Navbar = () => {
  return (
    <>
      <div
        className={`
        z-10
        w-full flex-row items-center justify-between gap-8
        px-3 font-secondary text-sm
        shadow-md
        sm:flex
      `}
      >
        <div className="flex flex-grow flex-row justify-around gap-8">
          <Branding />
        </div>
        {/* not working as expected - need to convert useUSer into context */}
        {/* <div>
          {
            hasCompletedVerification &&
            <>
            <Button
              title="View Verification"
              handleClick={openModal}
              className="w-full bg-green-500 text-white"
            />
            <VerificationModal
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              user={user}
              isSignedIn={isSignedIn}
              refetch={refetch}
            />
          </>
          }

        </div> */}
      </div>
    </>
  );
};
