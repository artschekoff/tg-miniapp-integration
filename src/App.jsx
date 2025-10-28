import { useState } from 'react'
import { retrieveRawInitData, isMiniAppSupported } from '@telegram-apps/sdk'

function App() {
  const initDataRaw = retrieveRawInitData();

  const [loading, setLoading] = useState(false)
  const [authResponse, setAuthResponse] = useState(null)
  const [checkAuthResponse, setCheckAuthResponse] = useState(null)

  const handleAuth = async () => {
    try {
      if (loading) return

      setLoading(true)

      console.log(`sending api request with data: ${initDataRaw}`);

      const response = await fetch('https://localdevapi.roxl.net/api/auth/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData: initDataRaw }),
      });

      const data = await response.json();

      console.log(`response received: ${JSON.stringify(data)}`);

      setAuthResponse(data)
    } catch (error) {
      alert(`Auth failed: ${message.error}`)
    } finally {
      setLoading(false)
    }
  };

  const handleCheckAuth = async () => {
    try {
      setLoading(true)

      if (!authResponse?.token) {
        alert('AuthResponse -> token is not defined')
        return
      }

      const response = await fetch('https://localdevapi.roxl.net/api/auth/check', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authResponse.token}` }
      })

      const data = await response.json()

      alert(`Auth check passed: ${JSON.stringify(data)}`)

      setCheckAuthResponse(data)

    } catch (error) {
      alert(`Auth check failed: ${error.message}`)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Mini App</h1>
      <p>isMiniAppSupported: {isMiniAppSupported() ? '✅ yes' : '❌ no'}</p>
      <p>initDataRaw: {initDataRaw || 'empty'}</p>
      <p>Auth response: {JSON.stringify(authResponse)}</p>
      <p>Check Auth response: {JSON.stringify(checkAuthResponse)}</p>

      <button disabled={loading} onClick={handleAuth}>
        {loading ? 'Loading...' : 'Auth'}
      </button>

      <button disabled={loading} onClick={handleCheckAuth}>
        {loading ? 'Loading...' : 'Check auth'}
      </button>
    </div>
  );
}

export default App;