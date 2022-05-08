interface Props {
  children: React.ReactNode
  rightBar?: React.ReactNode
}

const Container = ({ children, rightBar }: Props) => {
  return (
    <div className="grid h-full grid-cols-3">
      <div className="h-full col-span-2 pb-16">
        {children}
      </div>
      <div className="col-span-1 pl-2">
        {rightBar}
      </div>
    </div>
  )
}

export default Container
