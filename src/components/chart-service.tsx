import { useEffect, useState } from "react"

import { Bar } from "react-chartjs-2"

import { workingMonth } from "../utils/formating"
import instance from "../requests/instance"
import { useGet } from "../requests"

import Block from "./block"
import { Month } from "../types"

const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        callback: function (val: any) {
          return this.getLabelForValue(val).split(" ")
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      suggestedMin: 0,
      beginAtZero: true,
      grid: {
        drawBorder: false,
        color: "#00000010",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Ora nandritran'ny taom-panompoana",
    },
  },
}


interface Props {
  id: number
}

const ChartService = ({ id }: Props) => {
  const { data: serviceMonths } = useGet("/service-months")
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    if (id && serviceMonths) {
      const hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      let responseCount = 0

      serviceMonths.forEach((value: Month, index: number) => {
        instance.get(`/report/${id}`, { params: value }).then((response) => {
          hours[index] = response.data["hour"]
          responseCount++

          if (responseCount === 12) {
            setData(hours)
          }
        })
      })
    }
  }, [id, serviceMonths])

  return (
    <Block>
      <Bar
        options={options}
        data={{
          labels: serviceMonths
            ? serviceMonths.map((month: Month) => workingMonth(month, true))
            : [],
          datasets: [
            {
              label: "Ora",
              data: data,
              borderRadius: 12,
              borderSkipped: false,
              backgroundColor: (ctx) => {
                if (!ctx.parsed) {
                  return "#1122FF"
                }
                if (ctx.parsed.y <= 10) {
                  return "#FFAA00"
                }
                if (ctx.parsed.y <= 5) {
                  return "#FF2200"
                }
                return "#1122FF"
              },
            },
          ],
        }}
      />
    </Block>
  )
}

export default ChartService
