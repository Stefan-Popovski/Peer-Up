import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ role, children }) {
  const { user, profile, isAdmin, loading } = useAuth()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-inkSoft text-sm">Loading…</div>
  }
  if (!user) {
    return <Navigate to="/auth" replace />
  }
  if (isAdmin) {
    return children // admins can preview any dashboard regardless of their own role
  }
  if (role && profile?.role && profile.role !== role) {
    return <Navigate to={`/${profile.role}`} replace />
  }
  return children
}