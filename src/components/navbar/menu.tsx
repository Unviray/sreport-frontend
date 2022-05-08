import { Icon as IconType } from 'react-feather'
import { User as UserIcon } from 'react-feather'
import { Bell as BellIcon } from 'react-feather'
import { Plus as PlusIcon } from 'react-feather'


interface MenuButtonProps {
  Icon: IconType
}


const MenuButton = ({ Icon }: MenuButtonProps) => {
  return (
    <button className="px-2">
      <Icon />
    </button>
  )
}


const Menu = () => {
  return (
    <div className="flex justify-end">
      <MenuButton Icon={BellIcon} />
      <MenuButton Icon={PlusIcon} />
      <MenuButton Icon={UserIcon} />
    </div>
  )
}

export default Menu
