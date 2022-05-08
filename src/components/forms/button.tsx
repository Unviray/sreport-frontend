interface Props {
  children: React.ReactNode
  onClick: () => void
  className?: string
  type?: "button" | "submit" | "reset"
}

const Button = ({ children, onClick, className, type }: Props) => {
  return (
    <button
      className={"transition-all px-3 py-2 text-white bg-blue-700 hover:bg-blue-600 rounded-xl hover:rounded " + className}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  )
}

export default Button
