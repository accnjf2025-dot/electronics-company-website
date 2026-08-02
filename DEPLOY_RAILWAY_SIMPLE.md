# Deploy Future of Technology on Railway (Simple Unified Demo)

This guide deploys the **entire application as one Railway web service**:

- React production build (same origin)
- Django REST API at `/api/v1/`
- Django Admin at `/admin/`
- Django static files (Admin, DRF)
- Uploaded media at `/media/`

This is a **low-traffic temporary demo**, not the final production architecture.

## What this deployment uses

| Component | Demo choice | Why temporary |
|-----------|-------------|---------------|
| Database | SQLite on a Railway Volume | Low concurrency; not ideal for multiple workers |
| Media | Django serves `/media/` directly | Fine for demos; use object storage in production |
| Frontend | Django SPA fallback | Simple single-service setup |

## Architecture overview

```
Browser  →  Railway public URL (HTTPS)
              ├── /api/v1/*     → Django REST API
              ├── /admin/*      → Django Admin
              ├── /static/*     → WhiteNoise (Admin/DRF assets)
              ├── /media/*      → Django (uploaded files on Volume)
              └── /*            → React SPA (index.html + Vite assets)
```

Production frontend API calls use **`VITE_API_BASE_URL=/api/v1`** (same origin).  
Local development still uses **`http://127.0.0.1:8001/api/v1`** via root `.env`.

---

## Prerequisites

- GitHub repo pushed: `mycarali2055-pixel/Future-of-Technology-`
- Branch: `main`
- Root `Dockerfile` present (Railway auto-detects it)
- A [Railway](https://railway.app/) account

---

## Step-by-step Railway dashboard

### 1. Open Railway

Go to [https://railway.app/](https://railway.app/) and sign in.

### 2. Create New Project

Click **New Project**.

### 3. Deploy from GitHub Repo

Choose **Deploy from GitHub repo**.

### 4. Connect GitHub

Authorize Railway if prompted, then select your GitHub account.

### 5. Select the repository

Choose:

**`mycarali2055-pixel/Future-of-Technology-`**

Deploy the **`main`** branch.

### 6. Confirm Dockerfile detection

In the service **Settings → Build**, confirm:

- **Builder:** Dockerfile
- **Dockerfile path:** `Dockerfile` (repository root)

Railway builds a multi-stage image:

1. **Node stage** — `npm ci` + `npm run build` with `VITE_API_BASE_URL=/api/v1`
2. **Python stage** — installs Django deps, copies backend + React `dist/` to `/app/frontend_dist`

### 7. Add environment variables

Open the service **Variables** tab and add:

| Variable | Value | Notes |
|----------|-------|-------|
| `SECRET_KEY` | *(generate a long random string)* | Required in production |
| `DEBUG` | `false` | Never use `true` on Railway |
| `SECURE_SSL_REDIRECT` | `true` | HTTPS redirect behind Railway proxy |
| `DATA_DIR` | `/data` | Matches Volume mount path below |

**Generate `SECRET_KEY` locally (example):**

```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

Never commit real secret values to Git.

Optional (usually auto-set by Railway after domain generation):

| Variable | Example |
|----------|---------|
| `RAILWAY_PUBLIC_DOMAIN` | `your-app.up.railway.app` |

When `RAILWAY_PUBLIC_DOMAIN` is present, Django automatically adds it to `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`.

### 8. Add a Railway Volume

1. Open your service in Railway.
2. Click **Volumes** (or **Add Volume**).
3. Create a new Volume attached to this service.
4. **Mount path:** `/data`

This persists:

- SQLite database: `/data/db.sqlite3`
- Uploaded media: `/data/media/`

### 9. Generate a public domain

1. Open service **Settings → Networking**.
2. Click **Generate Domain**.
3. Railway assigns a URL like `https://your-app.up.railway.app`.

### 10. Verify `RAILWAY_PUBLIC_DOMAIN`

After generating the domain, Railway typically injects `RAILWAY_PUBLIC_DOMAIN`.  
If needed, redeploy once so Django picks up the domain for `ALLOWED_HOSTS` / CSRF.

### 11. Redeploy if needed

Trigger **Deploy** after adding variables or the Volume.

### 12. Check health endpoint

Open:

```
https://YOUR-RAILWAY-DOMAIN/api/v1/health/
```

Expected response:

```json
{"status":"ok"}
```

HTTP status: **200** (no authentication required).

### 13. Open Django Admin

```
https://YOUR-RAILWAY-DOMAIN/admin/
```

### 14. Create the admin superuser (one time)

Use Railway **Shell** for the service:

```bash
cd /app/backend
python manage.py createsuperuser
```

Follow the prompts. **Do not** commit credentials.

**Optional non-interactive method** (set temporary Railway variables, run once, then remove them):

```bash
python manage.py createsuperuser --noinput
```

Requires these variables (temporary only):

- `DJANGO_SUPERUSER_USERNAME`
- `DJANGO_SUPERUSER_EMAIL`
- `DJANGO_SUPERUSER_PASSWORD`

Never recreate or reset the administrator on every deployment.

### 15. Seed initial data (one time)

Still in Railway Shell:

```bash
cd /app/backend
python manage.py seed_initial_data
```

This loads baseline company content. It is safe to run once on a fresh database.

### 16. Add demo product/project via Admin

1. Log in to `/admin/`.
2. Add at least one **Product** and one **Project** (with images if desired).
3. Uploaded files are stored on the Volume at `/data/media/`.

### 17. Verify Arabic and English

Open the public site:

```
https://YOUR-RAILWAY-DOMAIN/
```

Check:

- Homepage loads
- Language toggle (Arabic / English)
- `/products`, `/projects`, `/services`, `/partners`, `/contact`
- API-backed content appears

### 18. Share the single public URL

Everything runs on one domain — share:

```
https://YOUR-RAILWAY-DOMAIN/
```

---

## Demo data strategy

### Recommended (fresh Railway database)

1. Deploy with an empty Volume.
2. Startup runs `migrate` automatically.
3. Run `seed_initial_data` **once** via Shell.
4. Create superuser **once** via Shell.
5. Add test product/project through Admin.

### Optional (copy local SQLite + media)

Copying your local `backend/db.sqlite3` and `backend/media/` to the Railway Volume is a **deliberate one-time import**. It is **not** performed automatically during deploy.

If you choose this path:

1. Stop the service or use Shell while the Volume is mounted.
2. Copy files to `/data/db.sqlite3` and `/data/media/`.
3. Redeploy.

Prefer the fresh database approach for the first deployment.

---

## Docker startup behavior

On each container start, `backend/start.sh`:

1. Resolves data directory: `RAILWAY_VOLUME_MOUNT_PATH` → `DATA_DIR` → `/app/backend`
2. Creates the directory and `/media` subdirectory
3. Runs `python manage.py migrate --noinput`
4. Runs `python manage.py collectstatic --noinput`
5. Starts Gunicorn: `config.wsgi:application` on `0.0.0.0:$PORT`

Volume initialization happens at **runtime**, not during Docker build.

---

## Exact Railway configuration summary

| Setting | Value |
|---------|-------|
| Builder | Dockerfile (root) |
| Volume mount path | `/data` |
| `DATA_DIR` | `/data` |
| Health check | `/api/v1/health/` |
| SQLite path (production) | `/data/db.sqlite3` |
| Media path (production) | `/data/media/` |
| API base URL (production build) | `/api/v1` |
| WSGI module | `config.wsgi:application` |

---

## Local development (unchanged)

Frontend:

```bash
npm.cmd run dev
```

Backend:

```bash
cd backend
.\.venv\Scripts\python.exe manage.py runserver 8001
```

Root `.env`:

```
VITE_API_BASE_URL=http://127.0.0.1:8001/api/v1
```

Local Django uses `backend/db.sqlite3` and `backend/media/` when no Volume variables are set.

---

## Temporary demo limitations

- **SQLite** — single-writer; avoid multiple Gunicorn workers for this demo.
- **Django-served media** — not CDN-backed; suitable for low traffic only.
- **No automatic DB import** — local demo data is not copied on deploy.
- **Same-origin only in production** — no permissive CORS; frontend and API share one domain.
- **Not hardened for high traffic** — migrate to PostgreSQL + object storage for production.

---

## Troubleshooting

| Symptom | Check |
|---------|-------|
| 400 Bad Request | `ALLOWED_HOSTS` / `RAILWAY_PUBLIC_DOMAIN` |
| CSRF error on Admin login | `CSRF_TRUSTED_ORIGINS`, HTTPS domain |
| Blank frontend | Build logs; confirm `frontend_dist` copied in Docker image |
| Admin has no CSS | `collectstatic` in startup logs; WhiteNoise middleware |
| Uploads disappear after restart | Volume mounted at `/data`, `DATA_DIR=/data` |
| Health check fails | `/api/v1/health/` returns 200 without DB query |

---

## Commit and push deployment files

After verifying locally:

```bash
git add Dockerfile .dockerignore railway.toml DEPLOY_RAILWAY_SIMPLE.md backend/start.sh backend/config/settings.py backend/config/urls.py backend/config/views.py backend/requirements.txt .env.example backend/.env.example .gitignore
git commit -m "Add Railway unified deployment with Django serving React SPA"
git push origin main
```

Railway redeploys automatically when `main` is updated (if connected).
