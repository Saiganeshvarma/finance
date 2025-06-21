# FinanceFlow Platform

Smart Financial Solutions for Everyone

---

## Overview
FinanceFlow is a modern web platform that empowers users to grow their wealth through flexible investment plans or access quick loans for their financial needs. The platform offers a seamless experience for depositors, borrowers, and admins, with robust dashboards, secure authentication, and real-time notifications.

## Features
- **Flexible Investment Plans**: Choose from multiple plans (Quick Growth, Smart Saver, Premium Plus) with up to 15% annual returns.
- **Instant Loan Applications**: Borrowers can apply for personal or business loans with fast approvals.
- **Role-Based Dashboards**: Custom dashboards for depositors, borrowers, and admins.
- **Real-Time Notifications**: Stay updated on transactions, interest credits, and loan statuses.
- **Secure Authentication**: Register and login with role selection and protected routes.
- **Comprehensive Transaction History**: Track all deposits, withdrawals, loans, repayments, and interest.
- **Modern UI/UX**: Responsive design with Tailwind CSS and Lucide icons.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API
- **Linting**: ESLint, TypeScript ESLint
- **API**: Mock REST API via [crudcrud.com](https://crudcrud.com/) (see `src/services/api.ts`)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
$ git clone <repo-url>
$ cd financeflow-platform

# Install dependencies
$ npm install
# or
yarn install
```

### Development
```bash
# Start the development server
$ npm run dev
# or
yarn dev
```
Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production
```bash
$ npm run build
# or
yarn build
```

### Linting
```bash
$ npm run lint
# or
yarn lint
```

## Project Structure
```
financeflow-platform/
├── src/
│   ├── components/         # Reusable UI components (Layout, Header, Footer, ProtectedRoute)
│   ├── contexts/           # React Contexts for Auth and App state
│   ├── pages/              # Main pages (Home, Auth, Dashboards)
│   │   ├── Auth/           # Login and Register
│   │   ├── Dashboards/     # Depositor, Borrower, Admin dashboards
│   │   └── ...
│   ├── services/           # API integration (mock REST API)
│   ├── types/              # TypeScript types and interfaces
│   ├── index.css           # Tailwind CSS imports
│   ├── main.tsx            # App entry point
│   └── App.tsx             # Main app and routing
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## User Roles & Dashboards
- **Depositor**: Invest in plans, track earnings, withdraw matured deposits.
- **Borrower**: Apply for loans, view repayment schedules, track outstanding balances.
- **Admin**: Monitor platform stats, manage users, view all deposits, loans, and transactions.

## API & Data
- Uses a mock REST API (see `src/services/api.ts`).
- Authentication and data are stored in localStorage for demo purposes.
- Main data models: User, Deposit, Loan, Transaction, Notification, DepositPlan (see `src/types/`).

## Customization
- **Styling**: Easily customizable via Tailwind CSS config (`tailwind.config.js`).
- **API**: Swap out the mock API with a real backend by updating `src/services/api.ts`.

## License
MIT
