# MeStar Academy Student Dashboard

A Vue 3 school dashboard demonstration using Vite, Vue Router, Pinia, and browser-local mock data.

## Run locally

1. Install Node.js 20 or later.
2. From this folder run `npm install`.
3. Run `npm run dev` and open the local URL Vite prints (usually `http://localhost:5173`).

Demo accounts:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@mestar.edu` | `admin123` |
| Teacher | `teacher@mestar.edu` | `teacher123` |
| Parent | `parent@mestar.edu` | `parent123` |

The login form also has role buttons that fill the demo credentials. Student, attendance, and marks edits persist in this browser's local storage. The current login stays in session storage.

## Demo limitations

This project has no backend. Credentials and records are mock data; local storage and route guards are not a security boundary. Parent data filtering demonstrates the intended UI only. A production deployment needs a server-side identity provider, authorization on every API, a database, validated parent-child relationships, secure password handling, audit logs, and server-backed attendance and assessment workflows. Student, teacher, and parent account provisioning and password reset require those backend services.
