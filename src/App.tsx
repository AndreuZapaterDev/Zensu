import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'

function App() {
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
      setSession(authSession?.session?.user?.email ?? null)
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
    <div className="app-container">
      <h1>Bienvenido a Zensu React TS</h1>
      <p>Esta app está enlazada a Supabase.</p>

      <div className="auth-card">
        <p>
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
            <button disabled={!email} onClick={handleSignIn}>
              Enviar enlace mágico
            </button>
          </>
        ) : (
          <button onClick={handleSignOut}>Cerrar sesión</button>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  )
}

export default App
