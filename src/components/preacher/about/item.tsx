import { Icon as IconType } from 'react-feather'
import { Preacher } from '../../../types'

interface Props {
  Icon?: IconType
  data: Preacher
  name: keyof Preacher
  prefix?: string
  hasBelow?: boolean
}

const ItemAbout = ({ Icon, data, name, prefix, hasBelow }: Props) => {
  if (!data) {
    return (<></>)
  }

  if (!data[name]) {
    return (<></>)
  }

  return (
    <div className={"flex rounded-l-xl " + (hasBelow ? "mb-1" : "mb-3")}>
      {Icon ? (<Icon className="mr-3" />) : (<span className="w-6 mr-3"></span>)}
      {prefix && <span className="mr-2 opacity-50">{prefix}</span>}
      {data[name]}
    </div>
  )
}

export default ItemAbout
