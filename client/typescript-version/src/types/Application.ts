import { initialStatusData } from 'src/static/initalData'

export interface Application {
  link: string
  title: string
  platform: string
  note: string
  status: typeof initialStatusData[]
}

export interface history {
  id: number
  status: string
  status_create_date: string
}

export interface UserApplicationType {
  id: number
  title: string
  link: string
  platform: string
  note: string
  histories: history[]
}
