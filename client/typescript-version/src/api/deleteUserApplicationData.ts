import { instance } from 'src/configs/axios'

const deleteUserApplicationData = async (id: number) => await instance.delete(`/application/user/application/${id}`)

export default deleteUserApplicationData
