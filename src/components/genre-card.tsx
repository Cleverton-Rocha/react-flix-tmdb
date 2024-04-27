import React from 'react'

type GenreCardProps = {
  genreName: string
}

const GenreCard: React.FC<GenreCardProps> = ({ genreName }) => {
  return (
    <>
      <div className="mx-auto flex items-center">
        <span className="absolute w-[180px] rounded-full px-4 py-3 text-center text-xl text-white hover:bg-[#131313]">
          {genreName}
        </span>
      </div>
    </>
  )
}

export default GenreCard
