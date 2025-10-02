# ⏱️ Freelancer Time Tracker – Frontend

A modern, full-stack **Freelancer Time Tracker & Invoicing App** built with **React, Redux Toolkit, RTK Query, Prisma, PostgreSQL, Node.js, and Tailwind CSS**.  
This is the **frontend** codebase.

The goal: give freelancers a clean, powerful way to **track billable hours** and **generate invoices** — all in one intuitive dashboard.

---

## 🚀 Features (Frontend)

- **React 18 + Vite** for fast dev experience.
- **Redux Toolkit + RTK Query** for state management & data fetching.
- **Tailwind CSS** for responsive, accessible design.
- **Type-Safe API Calls** via auto-generated RTK Query endpoints.
- **Authentication** flow with persisted tokens.
- **Dashboard** view of projects, time entries, and invoices.
- **Reusable UI Components** (Cards, Tables, Modals).
- **Jest + React Testing Library** unit tests.
- **Cypress E2E Tests** covering login → projects → invoices.
- **Dark Theme** support (Tailwind theme toggles).

---

## 🏗️ Project Structure
```
  frontend/
  ├─ src/
  │ ├─ app/
  │ │ ├─ store.js # Redux store
  │ │ └─ api.js/ # RTK Query APIs
  │ ├─ components/ # Reusable UI components
  │ ├─ routes/ # Auth, Projects, Invoices slices/pages
  │ ├─ pages/ # Route-level pages
  │ ├─ utils/ # Reusable functions
  │ ├─ App.jsx
  │ ├─ main.jsx
  │ └─ index.css
  ├─ public/
  │ ├─ favicon.ico
  │ └─ logo.png
  └─ package.json
```

---

## 🖥️ Local Development

1. **Clone the repo**

  ```bash
  git clone https://github.com/yourusername/freelancer-time-tracker-frontend.git
  cd freelancer-time-tracker-frontend
  ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment**
   Create .env:
   ```bash
   VITE_API_URL=http://localhost:4000/api
   ```
4. **Start dev server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173.

---
## 🧪 Testing

1. **Unit/Integration Testing**
   ```bash
   npm test
   ```

2. **End-to-End Testing**
   ```bash
    npm run cypress:open   # interactive mode
    npm run cypress:run    # headless CI mode
   ```

    **Tests include:**
      - Authentication flow
      - Project creation
      - Time entry tracking
      - Invoice generation
---
## 🎨 Design System

- Tailwind CSS for utility-first styling.
- Dark Mode Ready.
- Components built as composable and accessible.




## 🔗 Backend

This frontend expects a running backend (Node.js + PostgreSQL + Prisma) at VITE_API_URL.
See backend repo for setup.

---

## 🛠️ **Built With**

- React 18
- Redux Toolkit / RTK Query
- Tailwind CSS
- Vite
- Jest + React Testing Library
- Cypress for E2E
- Prisma / PostgreSQL on the backend


---

## 🤝 **Contributing**

PRs welcome! Please open an issue first to discuss major changes.
Ensure all tests pass before pushing:

```bash
npm run lint && npm test && npm run cypress:run
```
---
## 📄 License

MIT © 2025 Your Name


