import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

// Only the homepage is in the initial bundle. The case studies alone are ~3,500
// lines of prose that almost nobody who lands on / will ever open, and the
// credentials page pulls in the command palette with it.
const CredentialsPage = lazy(() => import('./pages/CredentialsPage'))
const DeveloperPage = lazy(() => import('./pages/DeveloperPage'))
const ProjectPage = lazy(() => import('./pages/ProjectPage/ProjectPage'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/credentials" element={<CredentialsPage />} />
          {/* linked from the footer of the live products */}
          <Route path="/developer" element={<DeveloperPage />} />
          {/* bare /work/:slug redirects to the first tab from inside the page */}
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/work/:slug/:tab" element={<ProjectPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
