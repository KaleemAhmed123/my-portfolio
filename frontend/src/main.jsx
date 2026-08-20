import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import CredentialsPage from './pages/CredentialsPage'
import DeveloperPage from './pages/DeveloperPage'
import ProjectPage from './pages/ProjectPage/ProjectPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/credentials" element={<CredentialsPage />} />
        {/* linked from the footer of the live products */}
        <Route path="/developer" element={<DeveloperPage />} />
        {/* bare /work/:slug redirects to the first tab from inside the page */}
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/work/:slug/:tab" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
