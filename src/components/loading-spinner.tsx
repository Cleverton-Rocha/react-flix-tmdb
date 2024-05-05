const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-block size-10 animate-spin rounded-full border-[3px] border-current border-t-transparent text-red-600"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner
