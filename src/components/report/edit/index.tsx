import { useState } from "react"

import PreacherCard from "../../preacher/card"
import { useGet } from "../../../requests"
import Button from "../../forms/button"
import Modal from "../../modal"

import MonthChoose from "./month-choose"
import EditForm from "./form"


interface EditReportProps {
  id: number
  update: () => void
}

const EditReport = ({ id, update }: EditReportProps) => {
  const [open, setOpen] = useState(false)
  const { data: returned } = useGet(`/returned/${id}`)

  const handleClick = () => {
    setOpen(true)
  }

  const title = (
    <>
      <h1 className="text-xl font-bold">Ampiditra Tatitra</h1>
      {id && <PreacherCard id={id} />}
    </>
  )

  return (
    <div className="fixed bottom-0 right-0 grid w-full grid-cols-4 px-2 mb-3">
      <div className="flex justify-end col-start-3 px-2">
        <Button
          onClick={handleClick}
          className={returned && "!bg-blue-200 !text-blue-900"}
        >
          {returned ? "Hanavao tatitra" : "Hampiditra tatitra"}
        </Button>
      </div>
      <Modal open={open} setOpen={setOpen} title={title}>
        <MonthChoose preacherId={id} />
        <EditForm preacherID={id} setOpen={setOpen} update={update} />
      </Modal>
    </div>
  )
}

export default EditReport
