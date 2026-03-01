# QuickHire - Frontend

A modern job board frontend built with Next.js, TypeScript, and Tailwind CSS. Features job listings, search & filter, job details with apply functionality, and an admin dashboard.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** React Icons
- **Notifications:** React Hot Toast
- **Fonts:** Clash Display, Epilogue

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Backend API running at `http://localhost:5000`

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Artreeus/Quickhire-frontend.git
cd Quickhire-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The app will be running at `http://localhost:3000`.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, categories, featured jobs, CTA |
| `/jobs` | Job listings with search, filter, and pagination |
| `/jobs/:id` | Job detail page with full description and apply form |
| `/admin` | Admin dashboard to create and delete jobs |

## Features

- **Responsive Design:** Fully responsive from mobile to desktop
- **Search & Filter:** Search by keyword, filter by category, location, and job type
- **Job Application:** Apply with name, email, resume link, and cover note
- **Input Validation:** Client-side and server-side validation for all forms
- **Loading States:** Skeleton loaders and spinners for better UX
- **Toast Notifications:** Success/error feedback for all actions
- **Admin Panel:** Create and delete job listings with confirmation dialogs

## Folder Structure

```
Frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with Navbar & Footer
│   │   ├── page.tsx         # Landing page
│   │   ├── globals.css      # Global styles & Tailwind config
│   │   ├── jobs/
│   │   │   ├── page.tsx     # Job listings page
│   │   │   └── [id]/
│   │   │       └── page.tsx # Job detail page
│   │   └── admin/
│   │       └── page.tsx     # Admin dashboard
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── JobCard.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   └── home/
│   │       ├── HeroSection.tsx
│   │       ├── CompanyLogos.tsx
│   │       ├── CategorySection.tsx
│   │       ├── FeaturedJobs.tsx
│   │       └── CTASection.tsx
│   ├── lib/
│   │   └── api.ts           # API client functions
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

## Design

The UI closely follows the provided Figma design template with:
- **Color Palette:** Primary (#4640DE), Secondary (#26A4FF), Dark (#25324B)
- **Typography:** Clash Display for headings, Epilogue for body text
- **Layout:** 1440px max-width, responsive grid system

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
