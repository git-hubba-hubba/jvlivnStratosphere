const DEFAULT_BACKEND_ORIGIN = 'https://jvlivnstratosphere.onrender.com';

function unavailable(message, status = 502) {
  return Response.json({error: message}, {
    status,
    headers: {'Cache-Control': 'no-store'},
  });
}

export async function onRequest({request, env}) {
  const incoming = new URL(request.url);
  let backend;
  try {
    backend = new URL(env.RENDER_BACKEND_ORIGIN || DEFAULT_BACKEND_ORIGIN);
    if (backend.protocol !== 'https:' || backend.username || backend.password ||
        backend.pathname !== '/' || backend.search || backend.hash ||
        backend.origin === incoming.origin) throw new Error('Invalid backend origin');
  } catch {
    return unavailable('The account service is not configured correctly.', 503);
  }

  // Assign the path rather than resolving it: user input cannot change the host.
  backend.pathname = incoming.pathname;
  backend.search = incoming.search;
  const headers = new Headers();
  for (const name of ['accept', 'content-type', 'cookie', 'origin']) {
    if (request.headers.has(name)) headers.set(name, request.headers.get(name));
  }
  headers.set('Cache-Control', 'no-store');

  try {
    const upstream = await fetch(backend.toString(), {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      redirect: 'manual',
      signal: AbortSignal.timeout(60000),
    });
    // Never redirect login credentials or expose Render's HTML error pages.
    if (upstream.status >= 300 && upstream.status < 400 ||
        !upstream.headers.get('content-type')?.includes('application/json')) {
      await upstream.body?.cancel();
      return unavailable('The account service is unavailable. Please try again shortly.');
    }
    // Clone rather than rebuild headers so Set-Cookie survives intact.
    const response = new Response(upstream.body, upstream);
    response.headers.set('Cache-Control', 'no-store');
    response.headers.delete('Access-Control-Allow-Origin');
    response.headers.delete('Access-Control-Allow-Credentials');
    return response;
  } catch {
    return unavailable('The account service is unavailable. Please try again shortly.');
  }
}
