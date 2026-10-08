import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-inkSoft text-sm">Loading…</div>
  }
  if (!user) {
    return <Navigate to="/auth?role=student" replace />
  }
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }
  return children
}