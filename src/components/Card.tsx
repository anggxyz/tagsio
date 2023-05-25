import { type ReactElement } from "react";
import { Tilt } from "react-tilt";

const Card = ({
  children,
  description,
}: {
  children: ReactElement;
  description?: string;
}) => {
  return (
    <div>
      <Tilt
        style={{
          background: "#000",
          borderRadius: "8px",
        }}
        options={{
          scale: 1.01,
          max: 10,
          glare: true,
          "max-glare": 1,
          speed: 1000,
        }}
      >
        <div className="flex w-80 cursor-pointer  flex-col gap-4 bg-white/10 p-4 text-white">
          {children}
        </div>
      </Tilt>
      {description && (
        <div className="mt-1 rounded-md bg-primary-muted p-2">
          {description}
        </div>
      )}
    </div>
  );
};

export default Card;
