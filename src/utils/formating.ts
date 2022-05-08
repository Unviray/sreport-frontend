import moment from "moment"

import { Month } from "../types"

export const workingMonth = (data: Month, short = false) => {
  const month = short
    ? moment.monthsShort(data.month - 1)
    : moment.months(data.month - 1)

  return `${month} ${data.year}`
}

export const percentage = (partial: number, total: number) => {
  if (total === 0) {
    return partial.toString()
  }
  if (partial === 0) {
    return "0%"
  }

  return ((100 * partial) / total).toPrecision(3).toString() + "%"
}
