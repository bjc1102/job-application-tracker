import axios from 'axios'
import { toast } from 'react-toastify'

const baseURL = 'http://localhost:5000'

export const instance = axios.create({
  baseURL,
  withCredentials: true // 서버로 쿠키를 보내려면 true로 설정
})

instance.interceptors.response.use(
  response => response,
  async error => {
    const { response, config } = error
    if (response.status === 401) {
      try {
        await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true
        })

        return instance(config)

        //refresh 에러 발생시
      } catch (refreshError) {
        //@ts-ignore
        const path = refreshError.request.responseURL.match(/\/auth\/refresh$/)[0]
        if (path === '/auth/refresh') {
          console.error('Token refresh failed')
          toast.error('로그인을 진행해주세요', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined
          })
        }

        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)
