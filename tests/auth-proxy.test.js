import {test, mock} from 'node:test';
import assert from 'node:assert/strict';
import {onRequest} from '../functions/api/auth/[[path]].js';

test('forwards login body and origin and returns a same-origin session cookie', async () => {
  const cookie = 'jvl_session=test; Path=/api/auth; HttpOnly; Secure; SameSite=Lax';
  const stub = mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://jvlivnstratosphere.onrender.com/api/auth/login?test=1');
    assert.equal(options.method, 'POST');
    assert.equal(options.redirect, 'manual');
    assert.equal(options.headers.get('origin'), 'https://jvlivn.pages.dev');
    assert.equal(options.headers.get('cookie'), 'jvl_session=old');
    assert.equal(options.headers.get('x-forwarded-for'), null);
    assert.deepEqual(await new Response(options.body).json(), {email: 'test@example.com'});
    return Response.json({user: {id: '1'}}, {headers: {'Set-Cookie': cookie}});
  });
  try {
    const response = await onRequest({env: {}, request: new Request('https://jvlivn.pages.dev/api/auth/login?test=1', {
      method: 'POST', headers: {'Content-Type': 'application/json', Origin: 'https://jvlivn.pages.dev', Cookie: 'jvl_session=old', 'X-Forwarded-For': 'spoofed'},
      body: JSON.stringify({email: 'test@example.com'}),
    })});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('set-cookie'), cookie);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  } finally { stub.mock.restore(); }
});

test('preserves auth failures and logout cookie removal with an overridden backend', async () => {
  const stub = mock.method(globalThis, 'fetch', async url => {
    assert.equal(url, 'https://alternate.onrender.com/api/auth/logout');
    return Response.json({error: 'Not signed in'}, {status: 401, headers: {'Set-Cookie': 'jvl_session=; Path=/api/auth; Max-Age=0'}});
  });
  try {
    const response = await onRequest({env: {RENDER_BACKEND_ORIGIN: 'https://alternate.onrender.com'}, request: new Request('https://jvlivn.pages.dev/api/auth/logout', {method: 'POST'})});
    assert.equal(response.status, 401);
    assert.match(response.headers.get('set-cookie'), /Max-Age=0/);
    assert.deepEqual(await response.json(), {error: 'Not signed in'});
  } finally { stub.mock.restore(); }
});

test('returns JSON for missing backend responses, redirects, and network failures', async () => {
  for (const result of [new Response('<html>offline</html>'), new Response(null, {status: 302, headers: {Location: 'https://other.example'}}), new Error('offline')]) {
    const stub = mock.method(globalThis, 'fetch', async () => {if (result instanceof Error) throw result; return result;});
    try {
      const response = await onRequest({env: {}, request: new Request('https://jvlivn.pages.dev/api/auth/me')});
      assert.equal(response.status, 502);
      assert.ok((await response.json()).error);
    } finally { stub.mock.restore(); }
  }
});

test('rejects invalid and looping backend configuration before sending credentials', async () => {
  const stub = mock.method(globalThis, 'fetch', () => {throw new Error('must not fetch');});
  try {
    for (const origin of ['http://example.com', 'https://example.com/path', 'https://user:password@example.com', 'https://jvlivn.pages.dev']) {
      const response = await onRequest({env: {RENDER_BACKEND_ORIGIN: origin}, request: new Request('https://jvlivn.pages.dev/api/auth/me')});
      assert.equal(response.status, 503);
    }
    assert.equal(stub.mock.callCount(), 0);
  } finally { stub.mock.restore(); }
});
