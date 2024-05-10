import { useParams } from 'react-router-dom'

import { useFetchMovieById } from '../queries/movie'
import Header from '../components/header'
import { formatBudget, formatDate, formatRevenue } from '../utils/utils'
import LoadingSpinner from '../components/loading-spinner'
import RecommendedMovies from '../components/recommended-movies'

const Movie: React.FC = () => {
  const { movieId } = useParams()
  const imageURL = import.meta.env.VITE_IMG
  const { data, status } = useFetchMovieById(Number(movieId))

  const date = formatDate(data?.release_date ?? '')
  const revenue = formatRevenue(data?.revenue ?? 0)
  const budget = formatBudget(data?.budget ?? 0)

  const firstGenre = data?.genres?.[0]?.name?.toLocaleLowerCase()

  return (
    <>
      <div className="px-12">
        <Header />
        {status === 'pending' ? (
          <div className="flex h-screen justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex justify-center">
              <img
                className="w-[360px] rounded"
                src={imageURL + data?.poster_path}
                alt={data?.title}
              />
            </div>
            <div className="flex w-[750px] flex-col items-center gap-5 pb-8 text-white">
              <h1 className="text-3xl text-red-700">{data?.title}</h1>
              <h2 className="text-md font-semibold">{data?.tagline}</h2>
              <div className="flex flex-wrap justify-center gap-5">
                <p>{data?.overview}</p>
                <p className="font-semibold">
                  <span className="text-red-700">Genres:</span>{' '}
                  {data?.genres.map((genre) => genre.name).join(', ')}
                </p>
                <p className="font-semibold">
                  <span className="text-red-700">Budget:</span> {budget}
                </p>
                <p className="font-semibold">
                  <span className="text-red-700">Revenue:</span> {revenue}
                </p>
                <p className="font-semibold">
                  <span className="text-red-700">Year of release:</span> {date}
                </p>
                <p className="font-semibold ">
                  <span className="text-red-700">Rating:</span>{' '}
                  {data?.vote_average.toFixed(1)} / 10
                </p>
                <p className="font-semibold">
                  <span className="text-red-700">Status:</span> {data?.status}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <RecommendedMovies
        genreName={firstGenre ?? 'ação'}
        movieId={movieId ?? ''}
      />
    </>
  )
}

export default Movie
