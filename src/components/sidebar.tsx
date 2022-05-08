import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Icon as IconType } from 'react-feather'
import { Home as HomeIcon } from "react-feather"
import { Circle as CircleIcon } from "react-feather"

import { useGet } from "../requests"
import instance from "../requests/instance"
import { Tag } from "../types"

interface SidebarItemProps {
  Icon: IconType
  to: string
  title: string | number
  fill?: boolean
}

const SidebarItem = ({ Icon, to, title, fill }: SidebarItemProps) => {
  const [active, setActive] = useState(false)
  const [tagTitle, setTagTitle] = useState<Tag>({ name: '', color: '000' })
  const router = useRouter()

  useEffect(() => {
    if (typeof title === "number") {
      instance.get(`/tag/${title}`).then((response) => {
        setTagTitle(response.data[0])
      })
    }
  }, [title])

  const handleClick = () => {
    router.push(to)
  }

  return (
    <button
      className="flex items-center w-full mb-2 hover:text-primary"
      onClick={handleClick}
    >
      <Icon
        style={fill ? { fill: `#${tagTitle.color}` } : undefined}
        className="m-2"
        strokeWidth={active ? 3 : 2}
        color={`#${tagTitle.color}`}
      />
      {tagTitle.name || title}
    </button>
  )
}

const Sidebar = () => {
  const { data, isLoading, isError } = useGet("/list-tag")

  return (
    <div className="flex flex-col">
      <div className="mt-3">
        <SidebarItem title="Fandraisana" Icon={HomeIcon} to="/" />
        {data &&
          data.map((item: number) => (
            <SidebarItem key={item} title={item} Icon={CircleIcon} to="/" fill />
          ))}
      </div>
    </div>
  )
}

export default Sidebar
