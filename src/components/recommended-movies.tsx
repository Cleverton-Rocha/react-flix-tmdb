import Carousel from 'react-multi-carousel'

import { responsive } from '../utils/utils'
import { useFetchMovieByGenre } from '../queries/movie'

import MovieCard from './movie-card'
import LoadingSpinner from './loading-spinner'

type RecommendedMoviesProps = {
  genreName: string
  movieId: string
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({
  genreName,
  movieId,
}) => {
  const { data, status } = useFetchMovieByGenre(genreName)

  const filteredMovies = data?.results.filter(
    (movie) => movie.id !== Number(movieId),
  )

  return (
    <>
      <div className="px-4 pb-20 md:px-12">
        <h1 className="mt-8 select-none font-semibold text-white md:mt-12 md:text-2xl">
          Recommended Movies
        </h1>
        {status === 'pending' ? (
          <LoadingSpinner className="h-64 md:h-screen" />
        ) : (
          <Carousel
            className="h-[250px] w-full px-4 py-4 md:px-12"
            draggable={true}
            removeArrowOnDeviceType={['tablet', 'mobile']}
            responsive={responsive}
          >
            {filteredMovies?.map((movie) => (
              <MovieCard
                movieId={movie.id}
                key={movie.id}
                moviePoster={movie.poster_path}
                movieTitle={movie.title}
              />
            ))}
          </Carousel>
        )}
      </div>
    </>
  )
}

export default RecommendedMovies
