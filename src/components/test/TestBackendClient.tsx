'use client'; // Required for Next.js App Router

import React, { useState } from 'react';

interface ResponseStatus {
  code: number;
  text: string;
  ok: boolean;
}

export default function TestBackendClient(): React.JSX.Element {
  const [status, setStatus] = useState<ResponseStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const testConnection = async (): Promise<void> => {
    setLoading(true);
    setStatus(null);
    setError(null);

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) {
      setError('NEXT_PUBLIC_API_URL is not set. Add it to .env.local or Vercel environment variables.');
      setLoading(false);
      return;
    }
    const fullUrl = `${backendUrl}/api/health`;

    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
        },
      });

      setStatus({
        code: response.status,
        text: response.statusText,
        ok: response.ok
      });
    } catch (err) {
      // Safe error message retrieval in TypeScript
      const errorMessage = err instanceof Error ? err.message : 'Unknown network error';
      setError(`${errorMessage} (likely CORS or Server is down)`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Connection Test: Client ➔ Backend</h2>
      <button onClick={testConnection} disabled={loading}>
        {loading ? 'Checking...' : 'Check Connection'}
      </button>

      {status && (
        <div style={{ marginTop: '15px', color: status.ok ? 'green' : 'red' }}>
          <strong>Response Status:</strong> {status.code} ({status.text})
        </div>
      )}

      {error && (
        <div style={{ marginTop: '15px', color: 'red' }}>
          <strong>Error:</strong> {error}
          <p style={{ fontSize: '12px', color: 'gray' }}>
            Tip: Open F12 and check the Console or Network tab for more details.
          </p>
        </div>
      )}
    </div>
  );
}