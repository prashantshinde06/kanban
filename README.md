
# Kanban App

## Setup

Install dependencies with legacy peer resolution to avoid the existing `react-table` / React 19 peer warning:

```bash
npm install --legacy-peer-deps
```

## Run

Start the dev server:

```bash
npm run dev
```

## Persistence

- Kanban state is persisted with `redux-persist`.
- Persistence uses IndexedDB through `localforage`.
- Reloading the page keeps task changes, deletes, edits, and moves.

