import Carousel from 'react-multi-carousel'

import { genres } from '../utils/genres'

import GenreCard from './genre-card'

type GenreCarouselProps = {
  label: string
}

const GenreCarousel: React.FC<GenreCarouselProps> = ({ label }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 9,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 5,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 3,
    },
  }
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="select-none text-2xl font-semibold text-white">
          {label}
        </h1>
      </div>
      <Carousel className="h-[100px] w-full" responsive={responsive}>
        {genres.map((genre) => (
          <GenreCard genreName={genre.name} />
        ))}
      </Carousel>
    </div>
  )
}

export default GenreCarousel
