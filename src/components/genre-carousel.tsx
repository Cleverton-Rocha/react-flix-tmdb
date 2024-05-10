import Carousel from 'react-multi-carousel'
import { useEffect, useState } from 'react'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { ChevronUp } from 'lucide-react'

import { genres } from '../utils/genres'
import { cn, responsive } from '../utils/utils'
import { useFetchMovieByGenreInfinityQuery } from '../queries/movie'
import { Movie } from '../utils/types'

import GenreCard from './genre-card'
import MovieCard from './movie-card'
import LoadingSpinner from './loading-spinner'

const GenreCarousel: React.FC = () => {
  const [genreName, setGenreName] = useState('ação')
  const [showScroll, setShowScroll] = useState(false)

  const { data, status, fetchNextPage, isFetchingNextPage } =
    useFetchMovieByGenreInfinityQuery(genreName)

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  useEffect(() => {
    const checkScrollTop = () => {
      const shouldShowScroll = window.scrollY > 600
      setShowScroll(shouldShowScroll)
    }

    window.addEventListener('scroll', checkScrollTop)

    return () => {
      window.removeEventListener('scroll', checkScrollTop)
    }
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="select-none text-2xl font-semibold text-white">
            Genres
          </h1>
        </div>
        <Carousel className="h-[100px] w-full" responsive={responsive}>
          {genres.map((genre) => (
            <GenreCard
              className={cn(
                genreName === genre.name.toLowerCase() &&
                  'border-2 border-red-700 hover:border-none',
              )}
              onClick={() => setGenreName(genre.name.toLowerCase())}
              genreName={genre.name}
              key={genre.id}
            />
          ))}
        </Carousel>
        <div>
          {status === 'pending' && <LoadingSpinner className="h-screen" />}
          <div className="grid grid-cols-9 gap-12 pr-12">
            {data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.results.map((movie: Movie) => (
                  <MovieCard
                    movieId={movie.id}
                    key={movie.id}
                    moviePoster={movie.poster_path}
                    movieTitle={movie.title}
                  />
                ))}
              </React.Fragment>
            ))}
            {isFetchingNextPage && <LoadingSpinner />}
            <div ref={ref}></div>
          </div>
        </div>
      </div>
      <ChevronUp
        className={`fixed bottom-5 right-5 h-10 w-10 cursor-pointer rounded-full border-2 text-white transition duration-200 hover:text-red-700 ${showScroll ? 'visible' : 'invisible'}`}
        onClick={scrollTop}
      />
    </>
  )
}

export default GenreCarousel
