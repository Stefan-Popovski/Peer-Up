import { createBrowserRouter } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { HomePage } from '../pages/HomePage'
import { HowItWorksPage } from '../pages/HowItWorksPage'
import { SubjectsPage } from '../pages/SubjectsPage'
import { PricingPage } from '../pages/PricingPage'
import { MentorDirectoryPage } from '../pages/MentorDirectoryPage'
import { MentorProfilePage } from '../pages/MentorProfilePage'
import { BecomeMentorPage } from '../pages/BecomeMentorPage'
import { FaqPage } from '../pages/FaqPage'
import { ContactPage } from '../pages/ContactPage'
import { ReportPage } from '../pages/ReportPage'
import { TermsPage, PrivacyPage, CancellationPage } from '../pages/legal/LegalPages'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageShell />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true,                 element: <HomePage /> },

      // Core Top Menu Pages (Cohesive Separate Pages)
      { path: 'kako-raboti',         element: <HowItWorksPage /> },
      { path: 'how-it-works',        element: <HowItWorksPage /> },

      { path: 'predmeti',            element: <SubjectsPage /> },
      { path: 'subjects',            element: <SubjectsPage /> },

      { path: 'ceni',                element: <PricingPage /> },
      { path: 'pricing',             element: <PricingPage /> },

      { path: 'mentori',             element: <MentorDirectoryPage /> },
      { path: 'mentors',             element: <MentorDirectoryPage /> },

      // Mentor Profile
      { path: 'mentor/:slug',        element: <MentorProfilePage /> },
      { path: 'mentori/:slug',       element: <MentorProfilePage /> },
      { path: 'mentors/:slug',       element: <MentorProfilePage /> },

      // Support & Information
      { path: 'faq',                 element: <FaqPage /> },
      { path: 'contact',             element: <ContactPage /> },
      { path: 'kontakt',             element: <ContactPage /> },
      { path: 'report',              element: <ReportPage /> },

      // Legal
      { path: 'terms',               element: <TermsPage /> },
      { path: 'privacy',             element: <PrivacyPage /> },
      { path: 'cancellation',        element: <CancellationPage /> },

      // Fallback
      { path: '*',                  element: <NotFoundPage /> },
    ],
  },
  // Dedicated route /stani-mentor (has its own clean focused header with back button)
  {
    path: '/stani-mentor',
    element: <BecomeMentorPage />,
  },
  {
    path: '/become-mentor',
    element: <BecomeMentorPage />,
  },
])
