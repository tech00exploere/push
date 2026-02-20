# CommitPost

Full-stack blog app with:
- Authentication (register/login)
- Create/read/update/delete posts
- Post ownership checks (only owner can edit/delete post)
- Comments (read/add/delete own comment)

## Project structure
- `blog_backend` - Express + MongoDB API
- `blogging_frontend` - React + Vite client

## Local setup

1. Backend env:
- Copy `blog_backend/.env.example` to `blog_backend/.env`
- Fill `MONGO_URI`, `JWT_SECRET`, and set `CLIENT_URL=http://localhost:5173`

2. Frontend env:
- Copy `blogging_frontend/.env.example` to `blogging_frontend/.env`
- Keep `VITE_API_URL=http://localhost:5000/api` for local

3. Install and run backend:
```bash
cd blog_backend
npm install
npm run dev
```

4. Install and run frontend:
```bash
cd blogging_frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

Optional from project root:
```bash
npm run dev:backend
npm run dev:frontend
```

## Render deployment

This repo includes `render.yaml` (Blueprint).

1. Push repository to GitHub.
2. In Render, create a new Blueprint and select this repo.
3. Set secret env vars in backend service:
- `MONGO_URI`
- `JWT_SECRET`
4. After first deploy, update:
- Backend `CLIENT_URL` to your actual frontend Render URL.
- Frontend `VITE_API_URL` to your actual backend Render URL + `/api`.

## API health check

- `GET /api/health` should return:
```json
{ "ok": true }
```
