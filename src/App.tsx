import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from './resources/images/Zensu_logo_nb.png'

function App() {
  const location = useLocation()
  const hideHeader = location.pathname === '/' || location.pathname === '/auth'

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {!hideHeader && (
        <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Zensu logo" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Zensu</h1>
              <p className="text-slate-600">React + Router + Supabase</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-full bg-sky-600 px-5 py-2 text-white transition hover:bg-sky-700"
            >
              Inicio
            </Link>
            <Link
              to="/auth"
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-slate-700 transition hover:bg-slate-100"
            >
              Login / Registro
            </Link>
          </nav>
        </header>
      )}

      <main>
        <Outlet />
      </main>
    </motion.div>
  )
}

export default App
