import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import {
  getMovieByGenre,
  getMovieById,
  getMovieByName,
  getTopRatedMovies,
} from '../../services/api'

export function useFetchTopRatedMovies(pageParam: number = 1) {
  return useQuery({
    queryKey: ['topRated', pageParam],
    queryFn: () => getTopRatedMovies({ pageParam }),
  })
}

export function useFetchMovieById(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieById(movieId),
  })
}

export function useFetchTopRatedMoviesInfinityQuery() {
  return useInfiniteQuery({
    queryKey: ['top-rated'],
    queryFn: getTopRatedMovies,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length + 1
    },
  })
}

export function useFetchMovieByGenreInfinityQuery(genreName: string) {
  return useInfiniteQuery({
    queryKey: ['genre', genreName],
    queryFn: ({ pageParam }) => getMovieByGenre({ genreName, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length + 1
    },
  })
}

export function useFetchMovieByNameInfinityQuery(movieName: string) {
  return useInfiniteQuery({
    queryKey: ['movie', movieName],
    queryFn: ({ pageParam }) => getMovieByName(movieName, { pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.total_pages) {
        return allPages.length + 1
      }
    },
    retry: false,
  })
}
