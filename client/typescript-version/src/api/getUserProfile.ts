import { instance } from 'src/configs/axios'

const getUserProfile = async () => await instance.get('/user')

export default getUserProfile
