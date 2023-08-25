import axios from 'axios'

// 인스턴스를 생성할때 config 기본값 설정하기
export const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true // 서버로 쿠키를 보내려면 true로 설정
})
