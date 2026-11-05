# 🚀 Bookkeeper - A Free React Accounting Template!

[View Demo](https://flatlogic.com/templates/bookkeeper-react-accounting-template/demo) | [Download](https://github.com/flatlogic/bookkeeper-ui/archive/refs/heads/master.zip) | [More Templates](https://flatlogic.com/templates) | [Discord Community](https://discord.gg/flatlogic-community) | [Support Forum](https://flatlogic.com/forum)

**Originally a premium product priced at $69+, made available for free in January 2025!** 🎉

Looking for a perfect codebase generator for your Startup? Try [Flatlogic AI Web App Generator](https://flatlogic.com/generator) - our new tool, sort of a template++.

---

## 🎯 Why Bookkeeper?
- **Ex-Premium**: This template was previously paid. Enjoy it for free now. 😉
- **Accounting Features**: Includes essential bookkeeping components like General Ledger and Analytics Dashboards.
- **Join the Community**: [Flatlogic Discord](https://discord.gg/flatlogic-community) is where the action happens.
- **Free Node.js Backend**: Pair it up with [bookkeeper backend](https://github.com/flatlogic/bookkeeper-backend) to go full-stack.

---

## 🚀 Quick Start

Use Node.js 22.12 or newer.

```sh
git clone https://github.com/flatlogic/bookkeeper.git
cd bookkeeper
npm ci --legacy-peer-deps
npm start
```

Open http://127.0.0.1:5173. The existing development API endpoint is http://localhost:8080/api; production keeps the endpoint in `src/config.js`.

```sh
npm run build
npm run preview
npm audit
npm test
PLAYWRIGHT_DEV=1 npm test
```

Vite builds to `build/`; `package-lock.json` is the canonical lockfile after verifying the complete runtime/development graph. The superseded Yarn lock is removed. The explicit install flag preserves the existing MUIDataTables3/tree/scrollzone DnD peer-metadata conflict without introducing a framework migration; no global peer-check bypass is configured. React16, MUI4, routes, accounting forms, SCSS and assets remain.

The locally installed Chrome regression covers API-fixture login, Joi invalid-name rejection, organization create/update/delete, table search/filter/visibility/sort/pagination/selection, dynamic table controls, actual chart output, calendar cells, vector countries/marker/colors and logout in production and development. It fails on browser page errors; the live backend, OAuth and external Google Maps are not exercised. Existing React/MUI/Sass component/deprecation warnings remain.

---

## 🧩 Features

- Full Authentication Implementation
- Role-Based Access Control
- General Ledger
- Accounts Receivable
- Customer Management
- Analytics Dashboards
- Responsive Layout
- PostgreSQL Integration
- Styled Components

---

## 🛠 Built With
- React
- Node.js
- PostgreSQL
- Redux
- Webpack

---

## 📦 Pages
- Dashboard
- Accounts (General Ledger, Receivables)
- Customer Management
- Reports & Analytics
- Forms (Validation, Elements)
- Authentication (Login, Registration, Password Recovery)
- Charts & Visualizations
- Settings

---

## 🌍 Available Variants

|               | **Material**                                              | **Transparent**                                         | **Classic**                                          | **Sofia**                                          | **Flatlogic**                                      |
|---------------|-----------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------|-----------------------------------------------------|----------------------------------------------------|
| **React**     | [React Material Admin](https://github.com/flatlogic/react-material-admin-full) | [Light Blue React](https://github.com/flatlogic/light-blue-react) | [Sing App React](https://github.com/flatlogic/sing-app-react) | [Sofia React](https://github.com/flatlogic/sofia-react) | [One React](https://github.com/flatlogic/one-react) |
| **Angular**   | [Angular Material Admin](https://github.com/flatlogic/angular-material-admin-full) | [Light Blue Angular](https://github.com/flatlogic/light-blue-angular) | [Sing App Angular](https://github.com/flatlogic/sing-app-angular) | - | - |
| **Vue**       | [Material Vue](https://github.com/flatlogic/material-vue-full) | [Light Blue Vue](https://github.com/flatlogic/light-blue-vue) | [Sing App Vue](https://github.com/flatlogic/sing-app-vue) | - | - |
| **Bootstrap** | - | [Light Blue HTML5](https://github.com/flatlogic/light-blue-html5) | [Sing App HTML5](https://github.com/flatlogic/sing-app-html5) | - | [One Bootstrap](https://github.com/flatlogic/one-bootstrap-template-full) |


Additionally, these templates are tailored for specific business needs:
- [E-Commerce Frontend (React)](https://github.com/flatlogic/ecommerce-frontend) - A complete e-commerce solution.
- [Bookkeeper UI (React)](https://github.com/flatlogic/bookkeeper-ui) - Accounting dashboard for finance management.
- [User Management Template (React)](https://github.com/flatlogic/user-management-template) - User authentication and management.

---

## 👨‍💻 How to Contribute
- **Star this repo ⭐** - show some love.
- **Report bugs** - but be nice.
- **Join the [Discord](<insert-discord-invite-link>)** - meet fellow devs.

---

## 🔥 About Flatlogic
[Flatlogic AI Software Engineer](https://flatlogic.com/ai-software-development-agent) builds modern business software so you don't have to. Our AI Software Development Agent helps you generate, deploy, and maintain enterprise applications with minimal effort.

---

## 📜 License
This template is free to use. Modify it, break it, make it your own. Just don’t try to sell it back to us. 😎

---

> **Questions or feedback?**  
> Join our [Flatlogic Community Discord](https://discord.gg/flatlogic-community) or visit our [support forum](https://flatlogic.com/forum). We might even reply!

