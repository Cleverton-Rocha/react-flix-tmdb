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
            'absolute w-[180px] rounded-full px-4 py-3 text-center text-xl text-white hover:bg-[#131313]',
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
