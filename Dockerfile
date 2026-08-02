# syntax=docker/dockerfile:1

# --- Frontend build stage ---
FROM node:22-alpine AS frontend-build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY public ./public
COPY src ./src

ENV VITE_API_BASE_URL=/api/v1
RUN npm run build

# --- Python runtime stage ---
FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=config.settings \
    FRONTEND_DIST=/app/frontend_dist

WORKDIR /app/backend

RUN apt-get update \
    && apt-get install -y --no-install-recommends libjpeg62-turbo libwebp7 \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .
COPY --from=frontend-build /app/dist /app/frontend_dist

RUN chmod +x start.sh

EXPOSE 8000

CMD ["./start.sh"]
