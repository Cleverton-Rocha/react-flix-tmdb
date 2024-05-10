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

export function useFetchMovieByGenre(genreName: string) {
  return useQuery({
    queryKey: ['genre', genreName],
    queryFn: () => getMovieByGenre({ genreName, pageParam: 1 }),
  })
}

export function useFetchTopRatedMoviesInfinityQuery() {
  return useInfiniteQuery({
    queryKey: ['topRatedInfinity'],
    queryFn: getTopRatedMovies,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length + 1
    },
  })
}

export function useFetchMovieByGenreInfinityQuery(genreName: string) {
  return useInfiniteQuery({
    queryKey: ['genreInfinity', genreName],
    queryFn: ({ pageParam }) => getMovieByGenre({ genreName, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length + 1
    },
  })
}

export function useFetchMovieByNameInfinityQuery(movieName: string) {
  return useInfiniteQuery({
    queryKey: ['movieInfinity', movieName],
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
