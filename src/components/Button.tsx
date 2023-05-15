// tailwind styles
const basic = `p-2 rounded-md cursor-pointer`
const hover = `transform transition duration-500 hover:scale-[1.05]`


// component
const Button = ({
  title,
  handleClick,
  className,
  disabled = false,
  hoverEffect=true
}: {
  title: string,
  handleClick: () => void;
  className?: string;
  disabled?: boolean
  hoverEffect?: boolean;
}) => {
  let look;
  if (!disabled) {
    look = `
      ${className || " "}
      ${basic}
      ${hoverEffect ? hover : ""}
    `
  }
  if (disabled) {
    look = `
      ${className || ""}
      ${basic}
      bg-disabled text-disabled-text
    `
  }
  return (
    <button className={look} onClick={handleClick} disabled={disabled}>
      {title}
    </button>
  )
}

export default Button;
