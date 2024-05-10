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
      <div className="flex items-center justify-between px-12">
        <h1 className="select-none text-2xl font-semibold text-white">
          Recommended Movies
        </h1>
      </div>
      {status === 'pending' ? (
        <LoadingSpinner className="h-screen" />
      ) : (
        <Carousel className="h-[250px] w-full px-12" responsive={responsive}>
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
    </>
  )
}

export default RecommendedMovies
