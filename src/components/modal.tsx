import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'


interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  title: React.ReactNode
  children: React.ReactNode
  className?: string
}


const Modal = ({ open, setOpen, title, children, className }: Props) => {
  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      open={open}
      onClose={closeModal}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-black bg-opacity-30" />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="inline-block h-screen align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className={"inline-block w-full max-w-2xl p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl " + className}>
          <Dialog.Title as="div" className="mb-4">
            {title}
          </Dialog.Title>
          {children}
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
