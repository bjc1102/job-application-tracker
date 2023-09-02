import { useQuery } from '@tanstack/react-query'
import getUserApplicationList from 'src/api/getUserApplicationList'

const useUserApplicationList = () =>
  useQuery(['applicationList'], getUserApplicationList, {
    staleTime: Infinity
  })

export default useUserApplicationList
