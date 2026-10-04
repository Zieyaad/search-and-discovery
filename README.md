# Search & Discovery Mini-App

A small full-stack search and discovery application built as a technical assessment.

The application uses a Svelte frontend and a Node.js + Express backend. The backend searches a local catalogue and enriches matching results using a simulated upstream provider that introduces variable latency and occasional failures.

## Tech Stack

### Frontend

- Svelte
- TypeScript
- Vite
- HTML/CSS

### Backend

- Node.js
- Express
- TypeScript
- Node.js

## Project Structure

```text
search-and-discovery/
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── search.ts
│   │   ├── components/
│   │   │   ├── SearchBar.svelte
│   │   │   ├── SearchControls.svelte
│   │   │   └── ResultCard.svelte
│   │   ├── types/
│   │   │   └── search.ts
│   │   ├── App.svelte
│   │   ├── app.css
│   │   └── main.ts
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── data/
│   │   │   ├── catalog.json
│   │   │   └── catalog.ts
│   │   ├── routes/
│   │   │   └── search.ts
│   │   ├── services/
│   │   │   ├── searchService.ts
│   │   │   └── upstreamProvider.ts
│   │   ├── types/
│   │   │   └── catalog.ts
│   │   └── server.ts
│   ├── scripts/
│   │   └── copy-catalog.mjs
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── README.md
└── SOLUTION.md
```

## Running Locally

The frontend and backend run as separate processes during development.

### 1. Clone the repository

```bash
git clone <repository-url>
cd search-and-discovery
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open a second terminal and run:

```bash
cd search-and-discovery/server
npm install
```

### 4. Start the backend

From `server/`:

```bash
npm run dev
```

The Express API runs on:

```text
http://localhost:3000
```

### 5. Start the frontend

From `client/`:

```bash
npm run dev
```

The Vite development server normally runs on:

```text
http://localhost:5173
```

The Vite development server proxies `/api` requests to the Express server.

## API

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "status": "ok"
}
```
