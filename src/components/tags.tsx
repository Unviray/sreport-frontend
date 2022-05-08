import { useEffect, useState } from "react"
import { Circle as CircleIcon } from "react-feather"
import { Clock as ClockIcon } from "react-feather"

import { useGet } from "../requests"


interface TagProps {
  id: number
  temp?: boolean
  dot?: boolean
  zIndex: number
}
interface TagsProps {
  ids: number[]
  dot?: boolean
}

const Tag = ({ id, temp, dot, zIndex }: TagProps) => {
  const { data } = useGet(`/tag/${id}`)

  return data ? (
    dot ? (
      <span className="flex">
        <CircleIcon size="1.25rem" color={`#ffffff`} className="-mr-2.5 my-auto rounded-full" style={{ fill: `#${data[0].color}`, zIndex: 1 - zIndex }} />
      </span>
    ) : (
      <span className="flex py-0.5 px-1.5 mr-1 mt-1 text-xs rounded-xl bg-white border">
        {temp ? (
          <ClockIcon size="0.75rem" color={`#${data[0].color}`} className="mr-1 mt-0.5" style={{ fill: `#${data[0].color}40` }} />
        ) : (
          <CircleIcon size="0.75rem" color={`#${data[0].color}`} className="mr-1 mt-0.5" style={{ fill: `#${data[0].color}` }} />
        )}
        {data[0].name}
      </span>
    )
  ) : (
    <></>
  )
}


const Tags = ({ ids, dot }: TagsProps) => {
  const [tags, setTags] = useState<{id: number; temp: boolean}[]>([])

  useEffect(() => {
    setTags([])
    for (const id in ids) {
      setTags(oldTags => [...oldTags, { id, temp: ids[id] }])
    }
  }, [ids])

  return (
    <span className="flex flex-wrap items-center grow">
      {tags.map((tag, index) => (
        <Tag key={tag.id} id={tag.id} temp={tag.temp} dot={dot} zIndex={index} />
      ))}
    </span>
  )
}

export default Tags
