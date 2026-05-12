import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [session, setSession] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session?.user?.email ?? null)
    }

    checkSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, authSession) => {
      setSession(authSession?.user?.email ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleSignIn = async () => {
    setMessage('Enviando enlace mágico...')

    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setMessage(`Error: ${error.message}`)
      return
    }

    setMessage('Revisa tu correo para iniciar sesión con el enlace mágico.')
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setMessage('Sesión cerrada.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Inicio</h2>
        <p className="mt-2 text-slate-600">Usa Supabase para iniciar sesión con un enlace mágico.</p>
      </div>

      <div className="auth-card">
        <p className="text-slate-700">
          {session
            ? `Sesión activa como ${session}`
            : 'Introduce tu correo para recibir un enlace mágico de acceso.'}
        </p>

        {!session ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tunombre@correo.com"
            />
            <button className="mt-2" disabled={!email} onClick={handleSignIn}>
              Enviar enlace mágico
            </button>
          </>
        ) : (
          <button className="mt-2" onClick={handleSignOut}>Cerrar sesión</button>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  )
}
