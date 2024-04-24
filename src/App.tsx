import { Outlet } from 'react-router-dom'

import { ToasterProvider } from './providers/toast-provider'

const App = () => {
  return (
    <>
      <Outlet />
      <ToasterProvider />
    </>
  )
}

export default App
