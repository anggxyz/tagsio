import { Navbar } from "~/src/components/Navbar";
// import Footer from "~/src/components/Footer";
import type { ReactNode } from "react";

const Main = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white selection:bg-highlight selection:text-primary">
      <Navbar />
      <div
        className={`
          mx-auto
          my-12
          flex-1
          sm:my-24
          ${className ?? ""}
      `}
      >
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Main;
