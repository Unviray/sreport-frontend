import Link from "next/link"

import { useGet } from "../../requests"
import Block from "../block"
import Tags from "../tags"

interface Props {
  id: number
  firstname?: string
  lastname?: string
  newId?: number
  newGroup?: number
}

const PreacherCard = ({ id, firstname, lastname, newId, newGroup }: Props) => {
  const { data, isLoading } = useGet(`/preacher/${id}`)
  const { data: returned } = useGet(`/returned/${id}`)
  const { data: tags } = useGet(`/preacher-tag/${id}`)

  return (
    <Link href={`/preacher/${id}`}>
      <a>
        <Block loading={isLoading} className="!p-0" layoutId={`preacher-${id}`}>
          <div className="flex divide-x-2 divide-black divide-opacity-10">
            <div
              className={
                "flex flex-col p-3 tabular-nums rounded-l-xl " +
                (returned ? "bg-green-100 text-green-900" : "")
              }
            >
              <span>{newId || id}</span>
              <span>{newGroup || (data && data.group)}</span>
            </div>
            <div className="flex flex-col p-3">
              <span>
                {firstname || (data && data.firstname)}{" "}
                <span className="opacity-50">
                  {lastname || (data && data.lastname)}
                </span>
              </span>
              <Tags ids={tags} />
            </div>
          </div>
        </Block>
      </a>
    </Link>
  )
}

export default PreacherCard
