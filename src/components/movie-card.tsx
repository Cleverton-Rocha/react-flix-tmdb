import React from 'react'
import { Link } from 'react-router-dom'

type MovieCardProps = {
  movieTitle: string
  moviePoster: string
  movieId: number
}

const MovieCard: React.FC<MovieCardProps> = ({
  movieTitle,
  moviePoster,
  movieId,
}) => {
  const imageURL = import.meta.env.VITE_IMG

  return (
    <>
      <Link to={`/movie/${movieId}`} className="mx-auto">
        <img
          className="h-[200px] cursor-pointer select-none rounded transition duration-200 hover:scale-105 md:h-[200px] md:w-[150px]"
          src={imageURL + moviePoster}
          alt={movieTitle}
        />
      </Link>
    </>
  )
}

export default MovieCard
