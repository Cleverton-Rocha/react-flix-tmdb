import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      navigate('/')
    }
  }, [navigate])

  return <>{children}</>
}
