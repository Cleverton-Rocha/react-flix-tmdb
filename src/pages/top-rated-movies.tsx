import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ChevronRight, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Movie } from '../utils/types'
import Header from '../components/header'
import HomeBanner from '../components/home-banner'
import MovieCard from '../components/movie-card'
import { useFetchTopRatedMoviesInfinityQuery } from '../queries/movie'
import LoadingSpinner from '../components/loading-spinner'

const TopRatedMovies: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false)

  const { data, status, fetchNextPage, isFetchingNextPage } =
    useFetchTopRatedMoviesInfinityQuery()

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
      <div className="px-12">
        <Header />
        <HomeBanner />
        {status === 'pending' && <LoadingSpinner />}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="select-none font-semibold text-white md:text-2xl">
              Top rated movies
            </h1>
            <div className="flex items-center text-white transition duration-200 hover:text-red-700">
              <Link className="font-semibold md:text-xl" to="/home">
                Home
              </Link>
              <ChevronRight />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-5 md:grid-cols-9 md:gap-12 md:pr-12">
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
            <div ref={ref}></div>
            {isFetchingNextPage && <LoadingSpinner />}
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

export default TopRatedMovies
