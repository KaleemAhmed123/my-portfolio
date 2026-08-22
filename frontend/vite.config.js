import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The /dev/notes library is plain static HTML in public/, and vercel.json rewrites
// its extensionless URLs onto the real .html files. Neither the dev server nor
// preview reads vercel.json, so without this the clean links fall through to the
// SPA fallback and render a blank page — the app loads, matches no route, and
// draws nothing. Keep this in sync with the rewrites in vercel.json.
const rewriteDevNotes = (req, _res, next) => {
  const [pathname, query] = req.url.split('?')
  // No dot in the slug pattern, so interview-artifacts.css and *.html requests
  // fall straight through to the static handler untouched.
  const match = /^\/dev\/notes(?:\/([a-z0-9_-]+))?\/?$/i.exec(pathname)
  if (match) {
    req.url = `/dev/notes/${match[1] || 'index'}.html` + (query ? `?${query}` : '')
  }
  next()
}

// Block bodies on purpose: a value returned from configureServer is treated as a
// post-hook and would get called as a middleware, which crashes the dev server.
const devNotesCleanUrls = () => ({
  name: 'dev-notes-clean-urls',
  configureServer(server) {
    server.middlewares.use(rewriteDevNotes)
  },
  configurePreviewServer(server) {
    server.middlewares.use(rewriteDevNotes)
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devNotesCleanUrls()],
})
