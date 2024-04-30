import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import { Movie } from '../utils/types'
import { responsive } from '../utils/utils'

import MovieCard from './movie-card'

type MovieCarouselProps = {
  results: Movie[]
  label: string
  redirectTo: string
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  results,
  label,
  redirectTo,
}) => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="select-none text-2xl font-semibold text-white">
          {label}
        </h1>
        <div className="flex items-center text-white transition duration-200 hover:text-red-700">
          <Link className="text-xl font-semibold" to={redirectTo}>
            See all
          </Link>
          <ChevronRight />
        </div>
      </div>
      <Carousel className="h-[250px] w-full" responsive={responsive}>
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            moviePoster={movie.poster_path}
            movieTitle={movie.title}
            movieId={movie.id}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default MovieCarousel
