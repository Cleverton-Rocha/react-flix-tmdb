const HomeBanner = () => {
  return (
    <div className="grid select-none grid-cols-2 px-80">
      <span className="my-auto w-[700px] p-12 text-6xl text-white">
        Take your movie experience to the next{' '}
        <span className="text-red-700">level</span>
      </span>
      <img
        className="h-[600px] object-cover"
        src="https://image.tmdb.org/t/p/original/qi6Edc1OPcyENecGtz8TF0DUr9e.jpg"
        alt="Movie Banner"
      />
    </div>
  )
}

export default HomeBanner
