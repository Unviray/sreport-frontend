import { useMonth } from '../../hooks'
import SearchBar from './search-bar'
import Menu from './menu'
import Link from 'next/link'


const Navbar = () => {
  const { month } = useMonth(true)

  return (
    <nav className="grid grid-cols-4 p-2 item-center bg-slate-100">
      <div className="flex items-center px-2">
        <Link href="/">
          <a className="text-xl font-bold">
            Sreport
            <span className="opacity-50">
              <span className="mx-3">/</span>
              <span className="capitalize">{month}</span>
            </span>
          </a>
        </Link>
      </div>
      <SearchBar className="col-span-2" />
      <Menu />
    </nav>
  )
}

export default Navbar
