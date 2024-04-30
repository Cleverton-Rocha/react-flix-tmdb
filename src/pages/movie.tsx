import { useParams } from 'react-router-dom'

const Movie: React.FC = () => {
  const { movieId } = useParams()

  // fazer chamada da api com o id do filme

  return (
    <div>
      <h1 className="text-white">Movie</h1>
    </div>
  )
}

export default Movie
