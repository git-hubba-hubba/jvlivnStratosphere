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

## Hosting

Serve the frontend and `/api/auth` on the same origin through a reverse proxy. Use HTTPS, set `NODE_ENV=production` for Secure session cookies, and set `APP_ORIGINS` to the exact public frontend origin (comma-separated for multiple origins). Persist and protect the account-store directory. There is no email verification or password-recovery email service configured.

The existing integrations also use `PREDICTHQ_ACCESS_TOKEN` and `ANTHROPIC_API_KEY` as backend environment variables.

## Checks

```sh
npm run build
node --test backend/auth/*.test.js src/components/gamification/rules.test.js
```
