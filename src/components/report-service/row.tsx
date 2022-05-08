import { useGet } from '../../requests'
import { Month } from '../../types'
import { workingMonth } from '../../utils/formating'


interface Props {
  preacherID: number
  month: Month
}

const Row = ({ preacherID, month }: Props) => {
  const { data } = useGet(`/report/${preacherID}`, { params: month })

  return (
    <tr className={"border-t " + ((data && data.hour) === 0 ? "opacity-50" : "")}>
      <td className="capitalize">{workingMonth(month)}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.publication}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.video}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.hour}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.visit}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.study}</td>
    </tr>
  )
}

export default Row
