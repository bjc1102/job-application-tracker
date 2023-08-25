import { instance } from 'src/configs/axios'

const getUserProfile = async () => await instance.get('/user/test')

export default getUserProfile
