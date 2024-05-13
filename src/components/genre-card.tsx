import React from 'react'

import { cn } from '../utils/utils'

type GenreCardProps = {
  genreName: string
  className?: string
  onClick: () => void
}

const GenreCard: React.FC<GenreCardProps> = ({
  genreName,
  onClick,
  className,
}) => {
  return (
    <>
      <div
        onClick={onClick}
        className="mx-auto flex cursor-pointer items-center"
      >
        <span
          className={cn(
            'absolute w-[125px] rounded-full px-4 py-1.5 text-center text-lg text-white hover:bg-[#131313] md:w-[180px] md:px-4 md:py-3 md:text-xl',
            className,
          )}
        >
          {genreName}
        </span>
      </div>
    </>
  )
}

export default GenreCard
