import { ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  name: string
  value?: string | number
  onChange?: (value: any) => void
  type?: string
  className?: string
}

const Input = ({ name, value: initialValue, onChange, type, className }: Props) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value

    setValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={"relative flex items-center w-full mt-2 h-11 " + className}>
      <input
        className="peer w-full text-gray-800 shadow-none outline-none focus:outline-none focus:ring-0 px-3 pt-2.5 pb-2 border-gray-300 bg-transparent border-2 rounded-lg focus:border-blue-500"
        type={type || "text"}
        onChange={handleChange}
        value={value}
      />
      <motion.label
        className={"absolute px-1 text-gray-500 transition-all top-2.5 peer-focus:-top-2 peer-focus:text-xs bg-white rounded-full peer-focus:text-blue-500 left-3 pointer-events-none " + ((value != undefined) && "-top-2 text-xs bg-white")}
        layoutId={`input-${name}`}
      >
        {name}
      </motion.label>
    </div>
  )
}

export default Input
