# UETCO — Unified Environment for Theories and Creative Output

This project is a modern academic content platform with a real admin CRUD environment, a preserved QUAT CAPTCHA, and a Vercel-ready structure.

## Project overview
The original project was a static HTML prototype. This version upgrades it into a production-oriented web app foundation with:
- modern landing page
- subject and module browsing
- file listing and access
- protected admin area
- CRUD backend routes for subjects, modules, and files
- QUAT CAPTCHA verification for admin entry
- Vercel-ready app structure

## Tech stack
- Next.js 14
- TypeScript
- React
- Server-side API routes
- JSON-backed CRUD store for local development

## Local development
```bash
npm install
npm run dev
```
Then open `http://localhost:3000`.

## Admin access
- Username: `haresh`
- Password: `UETCO2007`

## Project charter
See `docs/project-charter.md`.

## QUAT CAPTCHA documentation
See `docs/quat-captcha.md`.

## Vercel deployment
This project is Vercel-friendly and can be deployed by importing the repository into Vercel. For production-ready persistence, replace the JSON file store with PostgreSQL or another managed database.

## Footer requirement
The application footer is set to:
`PAGE DEVELOPED AND MANAGED BY Dv.Haresh`

## Notes
The current storage layer is intentionally simple and local for rapid setup. The route architecture is already organized so a database layer can be substituted later without redesigning the UI.
