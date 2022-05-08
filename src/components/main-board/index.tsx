import { Book as BookIcon } from 'react-feather'
import { Video as VideoIcon } from 'react-feather'
import { Clock as ClockIcon } from 'react-feather'
import { CornerDownLeft as CornerDownLeftIcon } from 'react-feather'
import { BookOpen as BookOpenIcon } from 'react-feather'

import { useGet } from '../../requests'
import { useMonth } from '../../hooks'
import Block from "../block"
import Row from "./row"


const MainBoard = () => {
  const { data: tags } = useGet("/list-tag")
  const { month } = useMonth(true)

  return (
    <Block className="min-w-full">
      <table className="min-w-full">
        <thead>
          <tr className="border-b-2">
            <th></th>
            <th className="text-left capitalize">{month}</th>
            <th className="py-2">N</th>
            <th className="py-2"><BookIcon className="ml-auto" /></th>
            <th className="py-2"><VideoIcon className="ml-auto" /></th>
            <th className="py-2"><ClockIcon className="ml-auto" /></th>
            <th className="py-2"><CornerDownLeftIcon className="ml-auto" /></th>
            <th className="py-2"><BookOpenIcon className="ml-auto" /></th>
          </tr>
        </thead>
        <tbody>
          <Row name="Mpitory" noTag={tags && tags.join(",")} />
          {tags && tags.map((tag: number) => (<Row key={tag} tag={tag} />))}
          <Row name="Total" />
        </tbody>
      </table>
    </Block>
  )
}

export default MainBoard
