import { createBrowserRouter } from 'react-router-dom'

import { PageShell } from '../components/layout/PageShell'

import { HomePage } from '../pages/HomePage'
import { HowItWorksPage } from '../pages/HowItWorksPage'
import { SubjectsPage } from '../pages/SubjectsPage'
import { PricingPage } from '../pages/PricingPage'
import { MentorDirectoryPage } from '../pages/MentorDirectoryPage'
import { MentorProfilePage } from '../pages/MentorProfilePage'
import { BecomeMentorPage } from '../pages/BecomeMentorPage'
import { BecomeMentorInfoPage } from '../pages/BecomeMentorInfoPage'
import { FaqPage } from '../pages/FaqPage'
import { ContactPage } from '../pages/ContactPage'
import { ReportPage } from '../pages/ReportPage'
import { TermsPage, PrivacyPage, CancellationPage } from '../pages/legal/LegalPages'
import { NotFoundPage } from '../pages/NotFoundPage'

// Functional pages
import AuthPage from '../pages/AuthPage'
import StudentDashboard from '../pages/StudentDashboard'
import MentorDashboard from '../pages/MentorDashboard'
import AdminPanel from '../pages/AdminPanel'

// Authentication / protection
import ProtectedRoute from '../components/ProtectedRoute'
import AdminRoute from '../components/Adminroute'

export const router = createBrowserRouter([
  // =========================================================
  // PUBLIC WEBSITE
  // =========================================================
  {
    path: '/',
    element: <PageShell />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },

      // Core Top Menu Pages
      { path: 'kako-raboti', element: <HowItWorksPage /> },
      { path: 'how-it-works', element: <HowItWorksPage /> },

      { path: 'predmeti', element: <SubjectsPage /> },
      { path: 'subjects', element: <SubjectsPage /> },

      { path: 'ceni', element: <PricingPage /> },
      { path: 'pricing', element: <PricingPage /> },

      { path: 'mentori', element: <MentorDirectoryPage /> },
      { path: 'mentors', element: <MentorDirectoryPage /> },

      // Mentor Profile
      { path: 'mentor/:slug', element: <MentorProfilePage /> },
      { path: 'mentori/:slug', element: <MentorProfilePage /> },
      { path: 'mentors/:slug', element: <MentorProfilePage /> },

      // Support & Information
      { path: 'faq', element: <FaqPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'kontakt', element: <ContactPage /> },
      { path: 'report', element: <ReportPage /> },

      // Become Mentor Landing / Info Page (With Navbar & Footer)
      { path: 'stani-mentor-info', element: <BecomeMentorInfoPage /> },
      { path: 'become-mentor-info', element: <BecomeMentorInfoPage /> },
      { path: 'zosto-stani-mentor', element: <BecomeMentorInfoPage /> },

      // Legal
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'cancellation', element: <CancellationPage /> },

      // Fallback
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // =========================================================
  // FUNCTIONAL / AUTHENTICATION PAGES
  // =========================================================

  // Login / Sign up
  {
    path: '/auth',
    element: <AuthPage />,
  },

  // Student dashboard
  {
    path: '/student',
    element: (
      <ProtectedRoute role="student">
        <StudentDashboard />
      </ProtectedRoute>
    ),
  },

  // Mentor dashboard
  {
    path: '/mentor',
    element: (
      <ProtectedRoute role="mentor">
        <MentorDashboard />
      </ProtectedRoute>
    ),
  },

  // Admin panel
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminPanel />
      </AdminRoute>
    ),
  },

  // =========================================================
  // BECOME A MENTOR - PUBLIC PAGES
  // =========================================================

  {
    path: '/stani-mentor',
    element: <BecomeMentorPage />,
  },

  {
    path: '/become-mentor',
    element: <BecomeMentorPage />,
  },
])