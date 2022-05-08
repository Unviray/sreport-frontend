import { useEffect, useState } from "react"

import { useGet } from "../requests"
import { percentage } from "../utils/formating"

import Block from "./block"

interface Props {
  title: string
  filter?: (id: number) => Promise<boolean>
  className?: string
}

const NumberWidget = ({ title, filter, className }: Props) => {
  const [number, setNumber] = useState(0)
  const { data: ids } = useGet("/list-preacher")

  useEffect(() => {
    if (ids) {
      setNumber(0)
      if (filter) {
        ids.forEach((id: number) => {
          filter(id).then(pass => {
            if (pass) { setNumber(lastNumber => lastNumber + 1) }
          })
        })
      } else {
        setNumber(ids.length)
      }
    }
  }, [ids, filter])

  return (
    <Block className={className}>
      <h1>{title}</h1>
      <div className="flex flex-row-reverse">
        <span className="text-6xl opacity-75">{number}</span>
        {filter && <span className="mt-auto mr-3 opacity-25">{percentage(number, ids ? ids.length : 0)}</span>}
      </div>
    </Block>
  )
}

export default NumberWidget
