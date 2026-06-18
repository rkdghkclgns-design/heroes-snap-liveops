import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` is the repo path for the GitHub Pages project site
// (https://<user>.github.io/heroes-snap-liveops/), and '/' for local dev.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/heroes-snap-liveops/' : '/',
  server: {
    port: 5180,
    open: false,
  },
}))
