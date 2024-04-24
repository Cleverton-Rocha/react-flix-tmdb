import { useQuery } from '@tanstack/react-query'

import { getTopRatedMovies } from '../../services/api'

export function useFetchTopRatedMovies(pageNumber: number = 1) {
  return useQuery({
    queryKey: ['topRated', pageNumber],
    queryFn: () => getTopRatedMovies(pageNumber),
  })
}
