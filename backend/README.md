# Future of Technology – Django Backend

Django REST API foundation for the Future of Technology website. This backend will eventually serve products, projects, services, partners, and company information to the existing React frontend.

## Requirements

- Python 3.11+
- Windows PowerShell (commands below use PowerShell syntax)

## Setup (Windows PowerShell)

### 1. Create virtual environment

```powershell
cd backend
python -m venv .venv
```

### 2. Activate virtual environment

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```powershell
pip install -r requirements.txt
```

### 4. Configure environment

```powershell
Copy-Item .env.example .env
```

Edit `.env` if needed. SQLite is used by default for local development.

### 5. Run migrations

```powershell
python manage.py makemigrations
python manage.py migrate
```

### 6. Create superuser (optional, for Django Admin)

```powershell
python manage.py createsuperuser
```

### 7. Seed initial data

```powershell
python manage.py seed_initial_data
```

This command is idempotent and safe to run multiple times.

### 8. Start development server

```powershell
python manage.py runserver
```

API base URL: `http://127.0.0.1:8000/api/v1/`

Django Admin: `http://127.0.0.1:8000/admin/`

## PostgreSQL (optional)

Set in `.env`:

```env
DATABASE_ENGINE=postgresql
POSTGRES_DB=future_of_technology
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/health/` | Health check |
| `GET /api/v1/company/` | Active company profile |
| `GET /api/v1/values/` | Company values |
| `GET /api/v1/services/` | Active services |
| `GET /api/v1/services/{slug}/` | Service detail |
| `GET /api/v1/partners/` | Active partners |
| `GET /api/v1/product-categories/` | Product categories |
| `GET /api/v1/brands/` | Brands |
| `GET /api/v1/products/` | Products (filterable) |
| `GET /api/v1/products/{slug}/` | Product detail |
| `GET /api/v1/project-categories/` | Project categories |
| `GET /api/v1/projects/` | Projects (filterable) |
| `GET /api/v1/projects/{slug}/` | Project detail |

### Product filters

`category`, `brand`, `availability`, `featured`, `installment`, `warranty`, `installation`, `search`, `ordering`

### Project filters

`category`, `featured`, `status`, `location`, `search`, `ordering`

## Project structure

```
backend/
  config/       Django settings and root URLs
  core/         Company profile, values, services, partners
  catalog/      Product categories, brands, products
  portfolio/    Project categories and projects
  media/        Uploaded media (local development)
```

## Tests

```powershell
python manage.py test
```

## Notes

- The React frontend is **not** connected to this backend yet.
- Do not commit `.env` or `db.sqlite3`.
- Media files are stored locally under `backend/media/` during development.
