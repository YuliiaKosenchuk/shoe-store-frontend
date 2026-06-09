import { NextResponse } from 'next/server';

interface SuccessResponseBody {
  success: boolean;
  status: number;
  statusText: string;
  duration: string;
}

interface ErrorResponseBody {
  success: boolean;
  error: string;
  hint: string;
}

interface ConfigErrorResponseBody {
  error: string;
}

export async function GET(): Promise<NextResponse<SuccessResponseBody | ErrorResponseBody | ConfigErrorResponseBody>> {
  const backendUrl: string | undefined = process.env.BACKEND_API_URL; 
  const fullUrl = `${backendUrl}/api/health`;

  console.log(`[Vercel Server] Fetching from: ${fullUrl}`);

  if (!backendUrl) {
    console.error('[Vercel Server] Error: BACKEND_API_URL environment variable is not configured!');
    return NextResponse.json({ error: 'Environment variable missing' }, { status: 500 });
  }

  try {
    const startTime = Date.now();
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
      },
    });
    const duration = Date.now() - startTime;

    console.log(`[Vercel Server] Success! Status: ${response.status}. Duration: ${duration}ms`);

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      duration: `${duration}ms`
    });

  } catch (error) {
    console.error(`[Vercel Server] Request failed:`, error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      hint: 'Verify if the backend is running, accessible from the internet, and the URL is correct.'
    }, { status: 502 }); // Bad Gateway
  }
}