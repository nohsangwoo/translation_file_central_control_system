import { useQueryClient } from '@tanstack/react-query'

export const useSetClientState = (key: any[]) => {
  const queryClient = useQueryClient()
  return (state: any) => queryClient.setQueryData(key, state)
}
