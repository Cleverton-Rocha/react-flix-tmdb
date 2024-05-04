import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import './index.css'
import Login from './pages/login.tsx'
import Register from './pages/register.tsx'
import Home from './pages/home.tsx'
import queryClient from './services/queryClient.ts'
import TopRatedMovies from './pages/top-rated-movies.tsx'
import Movie from './pages/movie.tsx'
import SearchPage from './pages/search-page.tsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/create-account',
        element: <Register />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/top-rated',
        element: <TopRatedMovies />,
      },
      {
        path: '/movie/:movieId',
        element: <Movie />,
      },
      {
        path: '/search/:search',
        element: <SearchPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
