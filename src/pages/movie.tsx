import { useParams } from 'react-router-dom'

import { useFetchMovieById } from '../queries/movie'

const Movie: React.FC = () => {
  const { movieId } = useParams()

  const { data } = useFetchMovieById(Number(movieId))

  console.log(data)

  return (
    <div>
      <h1 className="text-white">{data?.title}</h1>
    </div>
  )
}

export default Movie
