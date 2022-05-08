import { motion } from "framer-motion"


interface Props {
  name: string
  active: boolean
  onClick: () => void
}


const StepItem = ({ name, active, onClick }: Props) => {
  return (
    <motion.button
      className={"pill text-center " + (active ? "col-span-3 bg-blue-600 text-white" : "bg-slate-50 hover:bg-slate-100 col-span-2")}
      onClick={onClick}
      layoutId={active ? "step-active" : `step-inactive-${name}`}
    >
      {name}
    </motion.button>
  )
}


export default StepItem
