import { Toaster } from 'react-hot-toast'

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        className: 'bg-[#131127] text-white',
      }}
    />
  )
}
