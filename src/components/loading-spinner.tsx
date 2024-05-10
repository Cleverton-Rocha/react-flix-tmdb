import { cn } from '../utils/utils'

type LoadingSpinnerProps = {
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
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
