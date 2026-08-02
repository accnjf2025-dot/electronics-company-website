#!/bin/sh
set -eu

DATA_DIR="${RAILWAY_VOLUME_MOUNT_PATH:-${DATA_DIR:-/app/backend}}"
mkdir -p "$DATA_DIR" "$DATA_DIR/media"
export DATA_DIR

cd /app/backend

python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec gunicorn config.wsgi:application --bind "0.0.0.0:${PORT:-8000}"
