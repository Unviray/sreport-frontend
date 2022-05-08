import React from 'react'

import { motion } from 'framer-motion'


interface Props {
  children: React.ReactNode
  className?: string
  loading?: boolean
  layoutId?: string
}

const Block = ({ children, className, loading, layoutId }: Props) => {
  return (
    <motion.div layoutId={layoutId} className={"transition-[height] duration-300 h-auto bg-slate-100 p-3 mt-2 rounded-xl " + className + (loading ? " animate-pulse" : "")}>
      {children}
    </motion.div>
  )
}

export default Block
