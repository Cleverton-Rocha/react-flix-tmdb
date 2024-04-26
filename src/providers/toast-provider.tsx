import { Toaster } from 'react-hot-toast'

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        className: 'bg-black text-white',
      }}
    />
  )
}
