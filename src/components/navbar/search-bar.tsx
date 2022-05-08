import { useRouter } from 'next/router'
import { Search as SearchIcon } from 'react-feather'
import { useDispatch } from 'react-redux'
import instance from '../../requests/instance'

import { setSearch } from '../../store/slice/search'


interface Props {
  className?: string
}

const SearchBar = (props: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleFocus = () => {
    router.push("/search")
  }

  const handleChange = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value

    dispatch(setSearch(value))
    instance.get("/list-preacher", { params: { search: value } })
      .then(({ data }) => {
        if (data.length === 1) {
          router.push(`/preacher/${data[0]}`)
        } else {
          router.push("/search")
        }
      })
  }

  return (
    <form className={"flex relative items-center flex-grow " + props.className}>
      <button className="absolute" onClick={(event) => { event.preventDefault() }}>
        <SearchIcon className="mx-3" />
      </button>
      <input type="search" onChange={handleChange} onFocus={handleFocus} className="transition-[border-radius] pl-[48px] bg-slate-200 rounded-xl hover:rounded focus:rounded flex-grow h-10 border-0 focus:ring-0" />
    </form>
  )
}

export default SearchBar
