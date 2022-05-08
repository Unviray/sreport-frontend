import { NextPage } from "next"
import { useSelector } from "react-redux"

import PreacherCard from "../src/components/preacher/card"
import { TypeSearch } from "../src/store/slice/search"
import Container from "../src/components/container"
import { useGet } from "../src/requests"


const Search: NextPage = () => {
  const search = useSelector((state: TypeSearch) => state.search.value)

  const { data: ids } = useGet(`/list-preacher`, { params: { search } })

  return (
    <Container>
      {ids && ids.map((id: number) => <PreacherCard key={id} id={id} />)}
    </Container>
  )
}

export default Search
