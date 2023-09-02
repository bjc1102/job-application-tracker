import { instance } from 'src/configs/axios'

const getJobPostingData = async (url: string) => await instance.post('/application/jobposting', { url })

export default getJobPostingData
