import { useState } from 'react'
import { useRouter } from 'next/router'
import { Phone as PhoneIcon } from "react-feather"
import { MapPin as MapPinIcon } from "react-feather"
import { Calendar as CalendarIcon } from "react-feather"
import { Edit2 as Edit2Icon } from "react-feather"

import { useGet } from "../../../requests"
import Block from "../../block"
import EditPreacher from '../edit'
import ItemAbout from './item'


interface Props {
  id: number
}

const PreacherAbout = ({ id }: Props) => {
  const router = useRouter()
  const { data, isLoading } = useGet(`/preacher/${id}`)
  const [editOpen, setEditOpen] = useState(false)

  return (
    <Block loading={isLoading} className="flex flex-col group">
      <ItemAbout Icon={MapPinIcon} name="address" data={data} />
      <ItemAbout Icon={CalendarIcon} name="baptism" prefix="Batisa" data={data} hasBelow />
      <ItemAbout name="birth" prefix="Teraka" data={data} />
      <ItemAbout Icon={PhoneIcon} name="phone1" data={data} hasBelow />
      <ItemAbout name="phone2" data={data} hasBelow />
      <ItemAbout name="phone3" data={data} />
      <div className="hidden ml-auto group-hover:flex">
        <button
          className="flex bg-white hover:bg-gray-700 hover:text-white pill"
          onClick={() => { setEditOpen(true) }}
        >
          <Edit2Icon size={16} />
          <span className="ml-2">Hanova</span>
        </button>
      </div>
      <EditPreacher open={editOpen} setOpen={setEditOpen} id={id} />
    </Block>
  )
}

export default PreacherAbout
