import { type ReactElement } from "react";

const Card = ({
  children
}: {
  children: ReactElement
}) => {
  return (
    <div
      className="flex flex-col gap-4 rounded-md bg-white/10 p-4 text-white w-80 cursor-pointer"
    >
      {children}
    </div>
  )
}

export default Card;