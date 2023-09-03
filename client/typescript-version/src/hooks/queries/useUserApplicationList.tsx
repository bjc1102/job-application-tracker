import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import getUserApplicationList from 'src/api/getUserApplicationList'
import { userApplications } from 'src/static/key'
import { UserApplicationType } from 'src/types/Application'

const useUserApplicationList = (): UseQueryResult<UserApplicationType[]> =>
  useQuery([userApplications], getUserApplicationList, {
    staleTime: Infinity,
    select: (response: AxiosResponse<any, any>) => response?.data
  })

export default useUserApplicationList
