import React, { useState } from 'react'

import { cn } from '../utils/utils'

type PasswordToggleProps = {
  inputType: string
  setInputType: (inputType: string) => void
  className?: string
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({
  inputType,
  setInputType,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
    if (inputType === 'password') {
      setInputType('text')
    } else {
      setInputType('password')
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        type="checkbox"
        checked={showPassword}
        onChange={togglePasswordVisibility}
        className="cursor-pointer"
      />
      <span className="text-sm">Show password</span>
    </div>
  )
}

export default PasswordToggle
