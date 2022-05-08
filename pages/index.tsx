import { NextPage } from "next"

import NumberWidget from "../src/components/number-widget"
import MainBoard from "../src/components/main-board"
import Container from "../src/components/container"
import instance from "../src/requests/instance"

const Numbers = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <NumberWidget title="Isan'ny Mpitory" />
      <NumberWidget className="!bg-green-100" title="Namerina tatitra" filter={async (p) => {
        return (await instance.get(`/returned/${p}`)).data
      }} />
      <NumberWidget className="!bg-red-100" title="Tsy namerina tatitra" filter={async (p) => {
        return !(await instance.get(`/returned/${p}`)).data
      }} />
    </div>
  )
}

const Index: NextPage = () => {
  return (
    <Container>
      <MainBoard />
      <Numbers />
    </Container>
  )
}

export default Index
