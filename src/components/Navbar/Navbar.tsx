import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material'
import {
  Menu as MenuIcon,
} from '@mui/icons-material'

interface NavbarProps {
  onMenuClick: () => void
  darkMode: boolean
  onThemeToggle: () => void
}

const Navbar: React.FC<NavbarProps> = ({
  onMenuClick,
  darkMode,
  onThemeToggle,
}) => {
  return (
    <AppBar position="fixed" className="bg-primary-600">
      <Toolbar className="flex justify-between">
        <div className="flex items-center">
          <IconButton
            edge="start"
            color="inherit"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <MenuIcon />
          </IconButton>
        </div>
        <Typography variant="h6">
          Document Management System
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar