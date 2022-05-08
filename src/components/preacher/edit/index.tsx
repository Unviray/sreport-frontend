import { useEffect, useState } from "react"

import { useGet } from "../../../requests"
import Button from "../../forms/button"
import Input from "../../forms/input"
import Modal from "../../modal"

import PreacherCard from "../card"
import GenderChoice from "./genderChoice"
import StepItem from "./stepItem"


type GetSet<T> = {
  value?: T,
  set: (value: T) => void
}

interface StepAboutProps {
  id: GetSet<number>
  firstname: GetSet<string>
  lastname: GetSet<string>
  gender: GetSet<boolean>
  group: GetSet<number>
}

const StepAbout = ({ firstname, lastname, id, gender, group }: StepAboutProps) => {
  return (
    <div
      className="grid grid-cols-2 gap-2 mt-4"
    >
      <Input name="Fanampin'anarana" value={firstname.value} onChange={firstname.set} />
      <Input name="Anarana" value={lastname.value} onChange={lastname.set} />
      <Input name="Numero" type="number" value={id.value} onChange={id.set} />
      <GenderChoice value={gender.value} onChange={gender.set} />
      <Input name="Groupe" type="number" value={group.value} onChange={group.set} />
    </div>
  )
}


interface StepContactProps {
  phone1: GetSet<string>
  phone2: GetSet<string>
  phone3: GetSet<string>
  address: GetSet<string>
}

const StepContact = ({ phone1, phone2, phone3, address }: StepContactProps) => {
  return (
    <div
      className="grid grid-cols-2 gap-2 mt-4"
    >
      <Input name="Finday 1" value={phone1.value} onChange={phone1.set} className="col-start-1" />
      <Input name="Adiresy" value={address.value} onChange={address.set} />
      <Input name="Finday 2" value={phone2.value} onChange={phone2.set} className="col-start-1" />
      <Input name="Finday 3" value={phone3.value} onChange={phone3.set} className="col-start-1" />
    </div>
  )
}


interface StepDateProps {
  birth: GetSet<string>
  baptism: GetSet<string>
}

const StepDate = ({ baptism, birth }: StepDateProps) => {
  return (
    <div
      className="grid grid-cols-2 gap-2 mt-4"
    >
      <Input type="date" name="Teraka" value={birth.value} onChange={birth.set} />
      <Input type="date" name="Batisa" value={baptism.value} onChange={baptism.set} />
    </div>
  )
}


interface EditPreacherProps {
  id: number
  open: boolean
  setOpen: (value: boolean) => void
}

const EditPreacher = ({ open, setOpen, id }: EditPreacherProps) => {
  const [step, setStep] = useState(0)

  const { data } = useGet(`/preacher/${id}`)

  const [firstname, setFirstname] = useState<string | undefined>()
  const [lastname, setLastname] = useState<string | undefined>()
  const [newId, setNewId] = useState<number | undefined>()
  const [newGroup, setNewGroup] = useState<number | undefined>()
  const [gender, setGender] = useState<boolean | undefined>()

  const [phone1, setPhone1] = useState<string | undefined>()
  const [phone2, setPhone2] = useState<string | undefined>()
  const [phone3, setPhone3] = useState<string | undefined>()
  const [address, setAddress] = useState<string | undefined>()

  const [birth, setBirth] = useState<string | undefined>()
  const [baptism, setBaptism] = useState<string | undefined>()

  useEffect(() => {
    if (data) {
      setFirstname(data.firstname)
      setLastname(data.lastname)
      setNewId(data.id)
      setNewGroup(data.group)
      setGender(data.gender)

      setPhone1(data.phone1)
      setPhone2(data.phone2)
      setPhone3(data.phone3)
      setAddress(data.address)

      setBirth(data.birth)
      setBaptism(data.baptism)
    }
  }, [data])

  const title = (
    <>
      <h1 className="text-xl font-bold">
        Hanavao mpitory
      </h1>
      {id && (
        <PreacherCard
          id={id}
          firstname={firstname}
          lastname={lastname}
          newId={newId}
          newGroup={newGroup}
        />
      )}
    </>
  )

  const nextStep = () => {
    if (step === 2) {
      // TODO: instance.post()
    } else {
      setStep(n => n + 1)
    }
  }

  const prevStep = () => {
    if (step === 0) {
      setOpen(false)
    } else {
      setStep(n => n - 1)
    }
  }

  return (
    <Modal open={open} setOpen={setOpen} title={title}>
      <div className="grid grid-cols-7 gap-2">
        <StepItem active={step === 0} onClick={() => { setStep(0) }} name="Mombamomba azy" />
        <StepItem active={step === 1} onClick={() => { setStep(1) }} name="Fifandraisana" />
        <StepItem active={step === 2} onClick={() => { setStep(2) }} name="Daty" />
      </div>
      <div className="flex flex-col h-64">
        {(step === 0) && (
          <StepAbout
            id={{ value: newId, set: setNewId }}
            group={{ value: newGroup, set: setNewGroup }}
            gender={{ value: gender, set: setGender }}
            firstname={{ value: firstname, set: setFirstname }}
            lastname={{ value: lastname, set: setLastname }}
          />
        )}
        {(step === 1) && (
          <StepContact
            phone1={{ value: phone1, set: setPhone1 }}
            phone2={{ value: phone2, set: setPhone2 }}
            phone3={{ value: phone3, set: setPhone3 }}
            address={{ value: address, set: setAddress }}
          />
        )}
        {(step === 2) && (
          <StepDate
            birth={{ value: birth, set: setBirth }}
            baptism={{ value: baptism, set: setBaptism }}
          />
        )}
        <div className="flex justify-end mt-auto">
          <Button className="!bg-blue-200 !text-blue-900" onClick={prevStep}>
            {(step === 0) ? "Hiala" : "Hiverina"}
          </Button>
          <Button className="ml-2" onClick={nextStep}>
            {(step === 2) ? "Ampidirina" : "Manaraka"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EditPreacher
