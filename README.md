# Student-friendly MEAN-style Starter (Local)

This is a simplified, student-oriented MEAN-style starter project prepared to run locally.
It focuses on clear structure and readable code so a professor can review it easily.

## What's included
- `backend/` - Node.js + Express + Mongoose backend with JWT auth, product CRUD, cart, orders.
- `frontend/` - A tiny static frontend demonstrating how to call the API (replaceable with Angular).

## Local setup (backend)
1. Make sure you have Node.js (v18+) and MongoDB installed and running locally.
2. Open a terminal in `backend/`:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # edit .env if needed
   npm start
   ```
3. The backend will run on `http://localhost:5000`.

## Testing quickly
- Create two test users via HTTP clients like Postman or curl:
  1. Admin user:
     POST /api/auth/register
     ```json
     { "name":"Admin","email":"admin@example.com","password":"password123","role":"admin" }
     ```
  2. Buyer user:
     POST /api/auth/register
     ```json
     { "name":"Buyer","email":"buyer@example.com","password":"password123","role":"buyer" }
     ```
- Use returned token in `Authorization: Bearer <token>` header for protected routes.
- Add products (admin) POST /api/products
- Browse products from the frontend at `frontend/index.html` (open directly in browser).

## Notes / Student-friendly choices
- This project keeps things intentionally simple:
  - No production-level error handling or advanced folder nesting.
  - Authentication uses JWT with an example `.env`.
  - Frontend is a simple static demo; if you need a full Angular 17+ app,
    follow the instructions below to scaffold one and connect to the backend.

## How to replace frontend with Angular 17+
1. Install Angular CLI:
   ```bash
   npm install -g @angular/cli
   ```
2. Create a new app:
   ```bash
   ng new frontend-app
   cd frontend-app
   ng generate service api
   ```
3. Implement services to call the backend endpoints at `http://localhost:5000/api/...`.

## Project structure (student-oriented)
```
/ecommerce-student-friendly
├─ backend/
│  ├─ models/
│  ├─ routes/
│  ├─ middleware/
│  └─ server.js
├─ frontend/
│  └─ index.html
└─ README.md
```

## License
MIT


## Angular Frontend (scaffold)

A minimal Angular 17+ scaffold is included at `frontend/angular-app`. To run it locally:

1. Make sure you have Node.js and the Angular CLI installed:
   ```bash
   npm install -g @angular/cli
   ```
2. Install dependencies and start:
   ```bash
   cd frontend/angular-app
   npm install
   ng serve
   ```
3. The app will run at `http://localhost:4200` and talk to the backend at `http://localhost:5000`.

Notes:
- This scaffold is intentionally minimal to keep the project student-friendly.
- If you run into TypeScript or Angular version mismatches, update package versions in `package.json` to match your environment.
