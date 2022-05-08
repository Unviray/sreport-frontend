import { useEffect, useState } from "react"
import { Plus as PlusIcon } from "react-feather"
import { X as XIcon } from "react-feather"

import { useGet } from "../requests"
import instance from "../requests/instance"

interface TagSelectProps {
  tagIds: number[]
  setTagIds: (tagIds: number[]) => void
}

const TagSelect = ({ tagIds, setTagIds }: TagSelectProps) => {
  const { data: allTagIds } = useGet("/list-tag")

  const [opened, setOpened] = useState(false)

  const [tags, setTags] = useState<
    { id: number; name: string; color: string }[]
  >([])

  useEffect(() => {
    if (allTagIds) {
      instance.get(`/tag/${allTagIds.join(",")}`).then((result) => {
        setTags(result.data)
      })
    }
  }, [allTagIds])

  const handleChange = (selected: any) => {
    console.log(selected)
  }

  return (
    <>
      <button
        type="button"
        className="flex w-8 h-8 transition-colors duration-300 rounded-full bg-slate-200 hover:bg-slate-300"
        onClick={() => setOpened(!opened)}
      >
        {opened ? (
          <XIcon className="m-auto" />
        ) : (
          <PlusIcon className="m-auto" />
        )}
      </button>
      <div className="inline whitespace-nowrap">
        {opened &&
          tags.map((tag) => (
            <button
              type="button"
              className="transition-colors duration-300 rounded-full bg-slate-200 hover:bg-slate-300"
              onClick={() => {
                setTagIds([...tagIds, tag.id])
                setOpened(false)
              }}
            >
              {tag.name}
            </button>
          ))}
      </div>
    </>
  )
}

export default TagSelect
