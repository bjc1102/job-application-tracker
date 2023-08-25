import { useQuery } from '@tanstack/react-query'
import getUserProfile from '../api/getUserProfile'

const useUserProfile = () =>
  useQuery(['user'], getUserProfile, {
    staleTime: Infinity
  })

export default useUserProfile
