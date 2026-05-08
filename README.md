
# Kanban App

A lightweight Kanban board built with React, Redux, and Tailwind CSS. The app supports task creation, editing, drag-and-drop movement, delete confirmation, toast notifications, form validation, and state persistence.

## Setup

Install dependencies:

```bash
npm install --legacy-peer-deps
```

## Run

Start the development server:

```bash
npm run dev
```

## Features

- Task CRUD with create/edit/delete flows
- Drag-and-drop task movement across columns
- Confirmation modal for delete actions
- Toast notifications for success and error feedback
- Form validation for required fields and due date
- Persisted state via `redux-persist` and `localforage`

## Notes

- The app uses a fake third-party API integration and local persistence for demo purposes.
- Reloading the page preserves Kanban board state.

