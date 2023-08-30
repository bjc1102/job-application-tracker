import { initialStatusData } from 'src/static/initalData'

export interface Application {
  link: string
  title: string
  platform: string
  fileInfo: string
  status: typeof initialStatusData[]
}
