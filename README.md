# Books Store Monorepo

This is a monorepo containing:
- backend/ Express + Mongoose API
- Frontend/ React (Vite) app

Deployment notes:
- Heroku dyno starts with `Procfile` → `web: node backend/index.js`
- Frontend is built on deploy via backend/package.json `heroku-postbuild`
- Backend serves `Frontend/dist` statically in production with SPA fallback

Environment variables required:
- `DBURL` MongoDB connection string (Heroku Config Var)

Local development:
- API: from `backend/` run `npm run dev`
- Frontend: from `Frontend/` run `npm run dev`<h1> This is my ReadmeFile</h1>