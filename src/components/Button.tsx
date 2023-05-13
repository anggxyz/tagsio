const Button = ({
  title, onClick, className
}: {
  title: string,
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button className={`
      ${className || ""} p-2 cursor-pointer rounded-md
      transform transition duration-500 hover:scale-[1.05]
    `} onClick={onClick}>
      {title}
    </button>
  )
}

export default Button;
