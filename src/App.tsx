import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'
import { store } from './store/store'
import MainLayout from './components/Layout/MainLayout'
import Login from './pages/Login'
import UserList from './pages/UserList'
import DocumentList from './pages/DocumentList'
import './index.css'
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#7c3aed', // purple-600
    },
  },
})

function App() {
  console.log("App component loaded"); // Debugging

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<DocumentList />} />
              <Route path="documents" element={<DocumentList />} />
              <Route path="users" element={<UserList />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}


export default App
