import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

interface Props {
  children: React.ReactNode
}

const Layout = (props: Props) => {
  return (
    <>
      <Navbar />
      <main className="grid grid-cols-4 fixed px-2 top-[56px] pb-[56px] h-screen w-screen">
        <Sidebar />
        <div className="col-span-3 overflow-y-auto">{props.children}</div>
      </main>
    </>
  )
}

export default Layout
