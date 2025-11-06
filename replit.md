# Codesmotech Offer Letter Generator

## Overview

This is a fully client-side web application for generating professional offer letters for CodesmoTech Technology Consulting Private Limited. The application runs entirely in the browser without requiring a backend server, allowing users to input employee details, configure compensation packages, customize branding elements, and generate PDF-format offer letters with digital signatures.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript for type-safe component development
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** React hooks (useState, useEffect) for local component state
- **Form Handling:** React Hook Form with Zod validation for robust form management
- **UI Components:** Radix UI primitives with custom shadcn/ui components for accessible, composable interface elements
- **Styling:** Tailwind CSS with custom design tokens for consistent theming

**Design Philosophy:**
The application follows a utility-first approach focused on corporate professionalism. The design system emphasizes form clarity with logical grouping, template fidelity to match Codesmotech's brand identity, and efficiency in the workflow from data input to PDF generation. The interface uses a card-based layout with clear visual hierarchy and responsive breakpoints for mobile, tablet, and desktop devices.

**Component Structure:**
- `OfferLetterForm`: Main form component managing all employee and compensation data
- `FormSection`: Reusable card wrapper for logically grouped form fields
- `CompensationTable`: Displays salary breakdown with automatic CTC calculations
- `PDFPreview`: Modal dialog showing 7-page offer letter preview before download
- `SignaturePad`: Canvas-based signature capture with upload fallback

**Key Architectural Decisions:**
- **Single Page Application:** Entire workflow contained in one view to minimize friction
- **Client-Side Processing:** All data processing, calculations, and PDF generation happen in the browser for privacy and simplicity
- **No Backend Dependency:** Application is fully static and can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel)
- **Form State Management:** Local state only - no persistence required as this is a one-time document generation tool

### Data Flow

**Form Data Processing:**
1. User inputs employee information, dates, and compensation details
2. Real-time calculation of salary components (Basic Pay, HRA, Special Allowance) from Annual CTC
3. Optional bonus fields can be added dynamically
4. Signature captured via canvas drawing or image upload
5. Company logo can be customized or defaults to Codesmotech branding

**PDF Generation Approach:**
The preview system renders a complete 7-page offer letter document within a scrollable modal dialog. The design matches the official Codesmotech template with:
- Branded cover page with company logo
- Multi-section offer letter content
- Annexure with detailed compensation breakdown table
- Signature and signatory information

### Deployment Architecture

**Static Hosting:**
The application is configured for GitHub Pages deployment with automated GitHub Actions workflow. The production build compiles all React components and assets into static HTML, CSS, and JavaScript files that can be served from any CDN or static host.

**Build Process:**
- Vite bundles and optimizes all frontend assets
- Assets are output to `dist/public` directory
- No server-side rendering or API endpoints required

**Alternative Deployment:**
While the repository includes Express server scaffolding (likely from a template), the offer letter generator is purely client-side and does not utilize the backend infrastructure.

## External Dependencies

### UI Component Libraries
- **Radix UI:** Headless component primitives for accessible UI elements (dialogs, select menus, tooltips, etc.)
- **shadcn/ui:** Pre-styled component implementations built on Radix UI
- **Lucide React:** Icon library for consistent iconography

### Form & Validation
- **React Hook Form:** Form state management and validation orchestration
- **Zod:** Schema validation for type-safe form data

### Styling
- **Tailwind CSS:** Utility-first CSS framework with custom configuration
- **class-variance-authority:** Utility for managing component variants
- **clsx / tailwind-merge:** Conditional className composition

### Build & Development Tools
- **Vite:** Development server and production bundler
- **TypeScript:** Type checking and development experience
- **PostCSS / Autoprefixer:** CSS processing pipeline

### Data Management
- **TanStack Query:** Configured but not actively used (likely from template)
- **date-fns:** Date formatting utilities

### Assets
- Codesmotech company logo (stored in `attached_assets/generated_images/`)
- Cover page template image
- Custom fonts (Inter, Roboto via Google Fonts)

### Backend Infrastructure (Unused)
The repository includes Drizzle ORM, PostgreSQL adapter (@neondatabase/serverless), and Express server configuration, but these are not utilized by the offer letter generator application. These dependencies appear to be remnants from a full-stack template and can be ignored for the current implementation.