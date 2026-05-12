import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../resources/images/Zensu_logo_nb.png'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [message, setMessage] = useState('')

  const normalizeEmail = (value: string) => value.trim().toLowerCase()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('Procesando...')

    const normalizedEmail = normalizeEmail(email)
    const authAction =
      mode === 'register'
        ? supabase.auth.signUp({ email: normalizedEmail, password })
        : supabase.auth.signInWithPassword({ email: normalizedEmail, password })

    const { error } = await authAction
    if (error) {
      setMessage(`Error: ${error.message}`)
      return
    }

    setMessage(
      mode === 'register'
        ? 'Registro enviado. Revisa tu correo para confirmar tu cuenta.'
        : 'Inicio de sesión correcto. Redirigiendo...'
    )
  }

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <div className="flex flex-col items-center gap-4 text-center">
        <img src={logo} alt="Zensu logo" className="h-28 w-28 object-contain" />
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">Acceso</h2>
          <p className="text-slate-600 max-w-md">
            {mode === 'login'
              ? 'Inicia sesión con tu correo electrónico.'
              : 'Regístrate y empieza a usar Zensu.'}
          </p>
        </div>
      </div>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="auth-mode-toggle flex items-center gap-3 justify-center">
          <button
            type="button"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              mode === 'login' ? 'active' : 'inactive'
            }`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              mode === 'register' ? 'active' : 'inactive'
            }`}
            onClick={() => setMode('register')}
          >
            Registro
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tunombre@gmail.com"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña segura"
            required
            minLength={6}
          />
          <button className="mt-2" type="submit">
            {mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </motion.div>
    </div>
  )
}
