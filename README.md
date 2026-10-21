# JVLIVN

React/Vite frontend with an Express backend for accounts and existing integrations.

## Local development

Use Node.js 20 or newer. Install dependencies, then run the two servers in separate terminals:

```sh
npm ci
npm ci --prefix backend
npm run dev
```

```sh
npm start --prefix backend
```

Open `http://localhost:5173`. Vite proxies `/api/auth` to the backend on port 3001. After the lion splash, visitors can create an account or log in. The nav’s Profile link opens the profile editor, learning summary, badges, and achievement control.

Accounts use salted scrypt password hashes and opaque sessions in HttpOnly, SameSite cookies. Sign-out revokes the session. Account details persist in `backend/data/accounts.json` (gitignored); set `AUTH_STORE_PATH` to choose a different persistent location. The file store supports one backend process; use a database before running multiple backend instances.

Learning notes, coding drafts, demo progress, XP, and membership preferences remain stored in the browser under each account ID. Pre-account browser progress is attached to the first account signed in on that browser. Account details persist on the backend; learning data does not yet sync between devices.

## Member community

Insights → Community hub provides topic channels and a Code review & Q&A section. Members can post discussions or questions, add up to five tags, attach an HTTPS GitHub repository/file/issue/PR link and a code snippet, reply, and toggle a helpful vote. Question authors can accept or unaccept an answer. Posts refresh every 15 seconds.

Community content is shared across signed-in members and persists alongside accounts in `AUTH_STORE_PATH`; it is not browser-local. The existing same-origin `/api/auth` proxy carries `GET /community` and `POST /community/{create,reply,vote,accept}`. Authors come from the server session, and answer acceptance is restricted to the question author. Deploy both the frontend and backend changes. The same single-process and persistent-disk requirements as accounts apply.

## Hosting

Serve the frontend and `/api/auth` on the same origin through a reverse proxy. Use HTTPS, set `NODE_ENV=production` for Secure session cookies, and set `APP_ORIGINS` to the exact public frontend origin (comma-separated for multiple origins). Persist and protect the account-store directory. There is no email verification or password-recovery email service configured.

The existing integrations also use `PREDICTHQ_ACCESS_TOKEN` and `ANTHROPIC_API_KEY` as backend environment variables.

### Cloudflare Pages frontend + Render accounts API

`functions/api/auth/[[path]].js` proxies account requests to
`https://jvlivnstratosphere.onrender.com`, preserving request bodies, Origin,
cookies, JSON statuses, and Set-Cookie responses. The browser continues using
`/api/auth` on the frontend origin. Account responses are never cached.
`public/_routes.json` limits Function invocations to the account API.

Deploy the repository through Cloudflare Pages Git integration (build command
`npm run build`, output `dist`) or Wrangler from the project root. Uploading only
`dist` through dashboard drag-and-drop does not deploy the root `functions` folder.
To override the backend address, set `RENDER_BACKEND_ORIGIN` in the Pages project's
Settings → Variables and Secrets to an HTTPS origin without a path, then redeploy.
The supplied Render address is the default; no frontend Vite variable is needed.

On Render, set `NODE_ENV=production` and
`APP_ORIGINS=https://jvlivn.pages.dev`. Add any custom frontend domains or explicitly
trusted preview origins to that comma-separated list. The proxy preserves Origin
instead of bypassing the backend's origin validation. Session cookies remain
HttpOnly, Secure, SameSite=Lax, and scoped to `/api/auth` on the frontend host.
Persist `AUTH_STORE_PATH` on a persistent disk or migrate the store to a database;
the proxy does not make Render's temporary filesystem persistent.

After deployment, `/api/auth/me` should return JSON with status 401 when signed
out. Check signup, refresh while signed in, profile edits, and logout. A 403 on
signup/login usually means Render's `APP_ORIGINS` does not include the exact
frontend origin. A 502 means Render could not return a JSON API response. The
proxy allows up to 60 seconds for Render startup; the frontend allows 65 seconds.
Local `npm run dev` still uses the existing Vite proxy to Express on port 3001.

## Checks

```sh
npm run build
node --test backend/auth/*.test.js src/components/gamification/rules.test.js
```

## Event Finder

The Process page includes Discover (organizer directory), Near you (US ZIP-code search within 15 miles), and Saved views. Organizer cards link to the organizer for current dates and pricing; they are not presented as confirmed upcoming events. Saved items use the existing per-account browser storage.

Local search requires `PREDICTHQ_ACCESS_TOKEN` on the backend. Vite and the Cloudflare Pages Function proxy `/api/predicthq/events` to the backend. Deploy the root `functions` folder and updated `public/_routes.json` with the frontend. Empty results and provider failures appear explicitly in the finder.
