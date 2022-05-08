import { Book as BookIcon } from 'react-feather'
import { Video as VideoIcon } from 'react-feather'
import { Clock as ClockIcon } from 'react-feather'
import { CornerDownLeft as CornerDownLeftIcon } from 'react-feather'
import { BookOpen as BookOpenIcon } from 'react-feather'

import { useGet } from '../../requests'
import { Month } from '../../types'
import { workingMonth } from '../../utils/formating'

import Block from "../block"
import Row from './row'


interface Props {
  id: number
}

const ReportService = ({ id }: Props) => {
  const { data: serviceMonths } = useGet("/service-months")
  const { data: yearService } = useGet("/year-service")

  return (
    <Block>
    <table className="min-w-full">
      <thead>
        <tr className="border-b-2">
          <th className="text-left">Taom-panompoana {yearService}</th>
          <th className="py-2"><BookIcon className="ml-auto" /></th>
          <th className="py-2"><VideoIcon className="ml-auto" /></th>
          <th className="py-2"><ClockIcon className="ml-auto" /></th>
          <th className="py-2"><CornerDownLeftIcon className="ml-auto" /></th>
          <th className="py-2"><BookOpenIcon className="ml-auto" /></th>
        </tr>
      </thead>
      <tbody>
        {serviceMonths && serviceMonths.map((month: Month) => (
          <Row key={workingMonth(month)} preacherID={id} month={month} />
        ))}
      </tbody>
    </table>
    </Block>
  )
}


export default ReportService
