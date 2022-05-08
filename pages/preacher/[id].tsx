import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { NextPage } from "next"

import PreacherAbout from "../../src/components/preacher/about"
import ReportService from "../../src/components/report-service"
import PreacherCard from "../../src/components/preacher/card"
import ChartService from "../../src/components/chart-service"
import EditReport from "../../src/components/report/edit"
import Container from "../../src/components/container"


const Preacher: NextPage = () => {
  const { query } = useRouter()

  const [id, setId] = useState<number>()

  useEffect(() => {
    setId(query.id as unknown as number)
  }, [query.id])

  const update = () => {
    setId(1)
    setId(query.id as unknown as number)
  }

  const rightBar = id ? (
    <>
      <PreacherCard id={id} />
      <PreacherAbout id={id} />
    </>
  ) : (
    <></>
  )

  return id ? (
    <Container rightBar={rightBar}>
      <ChartService id={id} />
      <ReportService id={id} />
      <EditReport id={id} update={update} />
    </Container>
  ) : (
    <></>
  )
}

export default Preacher
