import { SetStateAction, useEffect, useState } from "react"

import { useGet } from "../../../requests"
import instance from "../../../requests/instance"
import Button from "../../forms/button"
import TagSelect from "../../tag-select"

interface EditInputProps {
  name: string
  textarea?: boolean
  value: string | number
  onChange: (value: SetStateAction<any>) => void
}

const EditInput = ({ name, textarea, value, onChange }: EditInputProps) => {
  return (
    <label
      className={
        "flex items-center justify-between mb-1 " +
        (textarea && "!flex-col !items-start")
      }
    >
      {name}
      {textarea ? (
        <textarea
          className="w-full px-2 py-1 mt-1 border-2 border-gray-300 rounded resize-y"
          onChange={(event) => {
            onChange(event.target.value)
          }}
          value={value}
        />
      ) : (
        <input
          className="px-2 py-1 text-right border-2 border-gray-300 rounded"
          type="number"
          onChange={(event) => {
            onChange(event.target.value)
          }}
          value={value}
        />
      )}
    </label>
  )
}

interface EditFormProps {
  preacherID: number
  setOpen: (open: boolean) => void
  update: () => void
}

const EditForm = ({ preacherID, setOpen, update }: EditFormProps) => {
  const { data } = useGet(`/report/${preacherID}`)

  const [publication, setPublication] = useState(0)
  const [video, setVideo] = useState(0)
  const [hour, setHour] = useState(0)
  const [visit, setVisit] = useState(0)
  const [study, setStudy] = useState(0)
  const [note, setNote] = useState("")
  const [tags, setTags] = useState<number[]>([])

  const [submiting, setSubmiting] = useState(false)

  useEffect(() => {
    if (data) {
      setPublication(data.publication)
      setVideo(data.video)
      setHour(data.hour)
      setVisit(data.visit)
      setStudy(data.study)
      setNote(data.note)
    }
  }, [data])

  const handleSubmit = () => {
    setSubmiting(true)
    instance
      .post(`/report/${preacherID}`, {
        publication,
        video,
        hour,
        visit,
        study,
        note,
      })
      .then((result) => {
        instance.post(`/report-tag/${result.data.id}`, [0]).then(() => {
          setSubmiting(false)
          setOpen(false)
          update()
        })
      })
      .catch((error) => {
        console.error(error)
        setSubmiting(false)
      })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit()
      }}
    >
      <EditInput
        onChange={setPublication}
        value={publication}
        name="Zavatra napetraka"
      />
      <EditInput onChange={setVideo} value={video} name="Video" />
      <EditInput onChange={setHour} value={hour} name="Ora" />
      <EditInput
        onChange={setVisit}
        value={visit}
        name="Fiverenana mitsidika"
      />
      <EditInput
        onChange={setStudy}
        value={study}
        name="Fampianarana baiboly"
      />
      <hr />
      <EditInput onChange={setNote} value={note} name="Fanamarihana" textarea />
      <div className="flex items-center justify-between mt-3">
        <TagSelect tagIds={tags} setTagIds={setTags} />
        <div className="flex">
          <Button
            className="!bg-blue-200 !text-blue-900 hover:!bg-blue-300 mr-2"
            onClick={() => {
              setOpen(false)
            }}
            type="button"
          >
            Hiala
          </Button>
          <Button type="submit" onClick={() => {}}>
            {submiting ? "Eo ampampidirana" : "Ampidirina"}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default EditForm
