import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import AuthPage from './pages/Authpage.jsx'
import MentorApplication from './pages/MentorApplication.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import MentorDashboard from './pages/MentorDashboard.jsx'
import AdminPanel from './pages/Adminpanel.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/mentor-application" element={<MentorApplication />} />
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentor"
        element={
          <ProtectedRoute role="mentor">
            <MentorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />
    </Routes>
  )
}