import { initialStatusData } from 'src/static/initalData'

export interface Application {
  link: string
  title: string
  platform: string
  files: string
  status: typeof initialStatusData[]
}
