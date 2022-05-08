import { useGet } from '../../requests'


interface Props {
  name?: string
  tag?: number
  noTag?: string
}


const Row = ({ name, tag, noTag }: Props) => {
  const { data: tagInfo } = useGet(tag ? `/tag/${tag}` : null)

  const { data } = useGet("/total-month", {
    params: {
      with_tag: tag ? tag : "",
      without_tag: noTag ? noTag : "",
    }
  })

  return (
    <tr className={"border-t " + ((data && data.hour) === 0 ? "opacity-50" : "")}>
      <td><span className="inline-block w-3 h-3 rounded-full" style={tagInfo && { backgroundColor: `#${tagInfo[0].color}` }}></span></td>
      <td className="">{tagInfo ? tagInfo[0].name : name}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.number}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.publication}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.video}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.hour}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.visit}</td>
      <td className="py-1 pr-2 text-right tabular-nums">{data && data.study}</td>
    </tr>
  )
}

export default Row
