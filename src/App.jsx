import { useEffect } from 'react'
import { retrieveRawInitData, isMiniAppSupported } from '@telegram-apps/sdk'

function App() {
  const initDataRaw = retrieveRawInitData();

  useEffect(() => {
    if (!initDataRaw) return;

    const callApi = async () => {
      alert(`sending api request with data: ${initDataRaw}`);

      const response = await fetch('https://localdevapi.roxl.net/api/auth/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData: initDataRaw }),
      });

      const data = await response.json();

      alert(`response received: ${JSON.stringify(data)}`);
    };

    callApi();
  }, [initDataRaw]);

  return (
    <div>
      <h1>Mini App</h1>
      <p>isMiniAppSupported: {isMiniAppSupported() ? '✅ yes' : '❌ no'}</p>
      <p>initDataRaw: {initDataRaw || 'empty'}</p>
    </div>
  );
}

export default App;