import { useFetchTopRatedMovies } from '../queries/movie'

const MovieCard: React.FC = () => {
  const topRated = useFetchTopRatedMovies()
  const imageURL = import.meta.env.VITE_IMG

  return (
    <div className="p-12 text-white">
      {topRated.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-12">
          {topRated.data?.results.map((movie) => (
            <div key={movie.id}>
              <img
                className="h-[220px] w-[150px] cursor-pointer rounded-xl transition duration-200 hover:scale-110"
                src={imageURL + movie.poster_path}
                alt=""
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieCard
