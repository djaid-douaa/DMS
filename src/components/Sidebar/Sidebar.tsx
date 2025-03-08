import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material'
import { Typography } from '@mui/material'
import {
  Description,
  People,
  Folder,
  Dashboard,
} from '@mui/icons-material'

interface SidebarProps {
  open: boolean
  onClose: () => void
  variant: 'permanent' | 'temporary'
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { path: '/', icon: <Dashboard />, label: 'Dashboard' },
    { path: '/documents', icon: <Description />, label: 'Documents' },
    { path: '/users', icon: <People />, label: 'Users' },
    { path: '/folders', icon: <Folder />, label: 'Folders' },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    if (variant === 'temporary') {
      onClose()
    }
  }

  const drawerContent = (
    <div style={{ backgroundColor: '#6a0dad', height: '100%', color: 'white' }}>
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
          DMS
        </Typography>
      </div>
      <Divider sx={{ backgroundColor: 'white' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                color: 'white',
                '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { backgroundColor: '#6a0dad', color: 'white' },
        }}
      >
        <div style={{ width: 240 }}>{drawerContent}</div>
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#6a0dad',
            color: 'white',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}

export default Sidebar
