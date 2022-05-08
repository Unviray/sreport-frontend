import { useMonth } from "../../../hooks"
import { useGet } from "../../../requests"
import { Month } from "../../../types"
import { workingMonth } from "../../../utils/formating"

interface MonthBubbleProps {
  preacherId: number
  month: Month
}

const MonthBubble = ({ preacherId, month }: MonthBubbleProps) => {
  const { month: wm } = useMonth()
  const { data: returned } = useGet(`/returned/${preacherId}`, {
    params: { month: month.month, year: month.year },
  })

  return (
    <button
      className={
        "flex content-center items-center py-2 text-xs text-center bg-green-100 text-green-900 rounded-lg " +
        (returned ? "" : "!bg-slate-100 ") +
        (wm.month === month.month && wm.year === month.year
          ? "!border-blue-500 border-2"
          : "")
      }
    >
      {workingMonth(month, true)}
    </button>
  )
}

interface MonthChooseProps {
  preacherId: number
}

const MonthChoose = ({ preacherId }: MonthChooseProps) => {
  const { data: serviceMonths } = useGet("/service-months")

  return (
    <div className="grid grid-cols-12 gap-1 mb-3">
      {serviceMonths &&
        serviceMonths.map((month: Month) => (
          <MonthBubble
            key={workingMonth(month)}
            preacherId={preacherId}
            month={month}
          />
        ))}
    </div>
  )
}

export default MonthChoose
