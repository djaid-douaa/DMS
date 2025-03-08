import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const ProtectedRoute = ({ role }: { role: 'admin' | 'user' }) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" /> // Redirect if the role doesn't match
  }

  return <Outlet />
}

export default ProtectedRoute
