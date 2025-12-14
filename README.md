# Suvigya Srijan Foundation

Empowering women & children through education, safety, health, values & rights, fostering dignity.

## About Suvigya Srijan Foundation

Suvigya Srijan Foundation is a non-profit organization dedicated to creating positive social change through education and holistic development. We work towards empowering marginalized communities, particularly women and children, by providing access to quality education, health services, and value-based learning.

Our mission is to build a society where every individual has the opportunity to reach their full potential regardless of their socioeconomic background.

## What We Do

### Education & Scholarship Programs

We provide merit-based scholarships to deserving students, enabling them to pursue their educational aspirations. Our scholarship examination program identifies talented individuals and supports their academic journey.

### Community Welfare

- Health awareness programs
- Safety and protection initiatives
- Values-based education
- Women empowerment programs
- Child welfare services

### Social Impact

We believe in sustainable development and community participation, working with local communities to create lasting positive change.

## Features of This Website

This website serves as a central hub for our scholarship program and community engagement:

- **Exam Status Dashboard**: Real-time tracking of scholarship examination phases
- **Document Repository**: Download question papers and view exam results
- **Admin Panel**: Secure management of exam schedules and documents
- **Responsive Design**: Accessible on all devices
- **Real-time Updates**: Instant notifications for all stakeholders

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **Backend & Database**: Supabase (PostgreSQL, Authentication, Storage)
- **Routing**: React Router
- **Forms**: React Hook Form, Zod validation
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or bun package manager
- Supabase account (free tier available at [supabase.com](https://supabase.com))

### Installation

1. **Clone the Repository**

```bash
git clone <repository-url>
cd scholarship-hub
```

2. **Install Dependencies**

```bash
npm install
# or
bun install
```

3. **Configure Supabase**

Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md) to:

- Create a Supabase project
- Configure the database
- Set up authentication
- Create storage buckets
- Configure access policies

4. **Set Up Environment Variables**

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key-here"
```

Get these values from your Supabase project:

- Go to **Project Settings** → **API**
- Copy the Project URL and Anon Key

5. **Run the Development Server**

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Project Structure

```
scholarship-hub/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Header.tsx    # Navigation header
│   │   ├── Footer.tsx    # Footer with social links
│   │   ├── Hero.tsx      # Landing hero section
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Home page
│   │   ├── About.tsx     # About NGO
│   │   ├── FAQ.tsx       # Frequently asked questions
│   │   ├── Contact.tsx   # Contact information
│   │   └── admin/        # Admin pages
│   │       ├── Login.tsx      # Admin authentication
│   │       └── Dashboard.tsx  # Admin panel
│   ├── hooks/            # Custom React hooks
│   │   ├── useExamStatus.ts   # Exam status management
│   │   ├── useAdminActions.ts # Admin operations
│   │   └── ...
│   ├── lib/              # Utility functions and config
│   │   ├── supabase.ts   # Supabase client initialization
│   │   └── utils.ts      # Helper functions
│   ├── App.tsx           # Root app component
│   └── main.tsx          # Entry point
├── SUPABASE_SETUP.md     # Detailed Supabase setup guide
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite build configuration
└── package.json          # Project dependencies
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Build
npm run build        # Build for production
npm run build:dev    # Build in development mode

# Linting
npm run lint         # Run ESLint checks

# Preview
npm run preview      # Preview production build locally
```

## Admin Dashboard

### Access the Admin Panel

1. Navigate to `/admin/login`
2. Sign in with your admin credentials (created in Supabase)
3. Access the dashboard to manage:
   - Exam schedule and dates
   - Exam phases (Not Started, Registration, Ongoing, Results)
   - Upload and manage question papers
   - Upload and publish exam results
   - Update announcements

### Admin Features

- **Exam Status Management**: Update exam phase, date, and announcements
- **Document Management**: Upload question papers and result PDFs
- **Real-time Updates**: Changes reflect immediately for all users
- **Secure Access**: Only authenticated admin users can access

## Pages

### Public Pages

- **Home**: Landing page with exam status and key information
- **About**: Information about Suvigya Srijan Foundation's mission and impact
- **FAQ**: Common questions and answers about the scholarship program
- **Contact**: Contact information and communication channels

### Admin Pages

- **Login**: Admin authentication page
- **Dashboard**: Complete admin control panel

## Database Structure

### exam_status Table

Stores the current state of the scholarship examination:

| Column           | Type      | Description                                                         |
| ---------------- | --------- | ------------------------------------------------------------------- |
| id               | TEXT      | Unique identifier (default: "default")                              |
| phase            | INTEGER   | Current phase (0=Not Started, 1=Registration, 2=Ongoing, 3=Results) |
| phaseLabel       | TEXT      | Human-readable phase description                                    |
| examDate         | TIMESTAMP | Date and time of the examination                                    |
| questionPaperURL | TEXT      | URL to the question paper PDF                                       |
| resultsURL       | TEXT      | URL to the results PDF                                              |
| announcement     | TEXT      | Important announcements                                             |
| updatedAt        | TIMESTAMP | Last update timestamp                                               |
| updatedBy        | UUID      | ID of the user who made the update                                  |

## Storage Structure

PDFs and documents are stored in Supabase Storage:

```
suvigyasrijanfoundation/
├── pdfs/
│   ├── question_[timestamp]_[filename].pdf
│   └── result_[timestamp]_[filename].pdf
```

## Security

### Authentication

- Email/password authentication via Supabase Auth
- Session management with automatic redirects
- Secure password reset capability

### Authorization

- Row-Level Security (RLS) policies on database tables
- Public read access for exam information
- Admin-only write access for sensitive data
- Authenticated uploads for documents

### Storage

- Public read access for PDF downloads
- Authenticated write access for admin uploads
- Automatic URL generation for secure file access

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automatically on push to main branch

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy

### Deploy to Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy --only hosting`

## Troubleshooting

### Common Issues

**Development Server Won't Start**

- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v16+)
- Clear Vite cache: `rm -rf .vite`

**Supabase Connection Issues**

- Verify `.env.local` has correct values
- Check Supabase project is active
- Ensure database tables are created
- Check RLS policies are configured

**Admin Login Not Working**

- Verify user exists in Supabase Authentication
- Check email/password are correct
- Ensure authentication is enabled in Supabase
- Check browser console for detailed error messages

**PDF Upload Errors**

- Verify storage bucket exists and is named correctly
- Check storage policies allow uploads
- Ensure file size is within limits
- Check browser console for CORS errors

## Contributing

We welcome contributions to improve this platform!

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -am 'Add your feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

## Support

For technical issues, questions, or suggestions:

- Email: contact@suvigyasrijanfoundation.org
- Phone: +91 7052710482
- Address: ADA colony, Naini, Prayagraj, Uttar Pradesh

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

### v1.0.0 (Current Release)

- Complete website for Suvigya Srijan Foundation
- Scholarship examination management system
- Admin dashboard with full control
- Real-time exam status updates
- PDF document management
- Responsive mobile design
- Complete authentication and security
- Supabase integration
- Modern UI with shadcn/ui components

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Backend powered by [Supabase](https://supabase.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Suvigya Srijan Foundation** © 2025. All rights reserved.

For more information about our organization, visit our social media or contact us directly.
