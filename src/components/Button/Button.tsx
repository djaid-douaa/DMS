import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'

interface ButtonProps extends MuiButtonProps {
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
  return (
    <MuiButton
      {...props}
      disabled={loading || props.disabled}
      className={`transition-all duration-200 ${props.className || ''}`}
    >
      {loading ? 'Loading...' : children}
    </MuiButton>
  )
}

export default Button