import { instance } from 'src/configs/axios'

const getUserApplicationList = async () => await instance.get('/application/user/applicationList')

export default getUserApplicationList
