import { useState } from "react"

interface Props {
  value?: boolean
  onChange: (value: boolean) => void
}

const GenderChoice = ({ value: initialValue, onChange }: Props) => {
  const [value, setValue] = useState(initialValue)

  const handleMale = () => {
    if (onChange) {
      onChange(false)
    }
    setValue(false)
  }

  const handleFemale = () => {
    if (onChange) {
      onChange(true)
    }
    setValue(true)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex" role="group">
        <button
          type="button"
          className={"rounded-l-lg inline-block px-6 py-2.5 bg-blue-100 text-blue-900 hover:bg-blue-200 " + ((value === false) && "!bg-blue-900 !text-blue-100")}
          onClick={handleMale}
        >
          Lahy
        </button>
        <button
          type="button"
          className={"rounded-r-lg inline-block px-6 py-2.5 bg-pink-100 text-pink-900 hover:bg-pink-200 " + ((value === true) && "!bg-pink-900 !text-pink-100")}
          onClick={handleFemale}
        >
          Vavy
        </button>
      </div>
    </div>
  )
}

export default GenderChoice
