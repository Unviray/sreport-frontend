export type Month = {
  month: number
  year: number
}

export type Tag = {
  name: string
  color: string
}

export interface Preacher {
  id: number
  firstname: string
  lastname: string
  display_name: string
  phone1: string
  phone2: string
  phone3: string
  address: string
  birth: string
  baptism: string
  group: number
  gender: boolean
}
