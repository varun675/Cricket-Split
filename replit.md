# Cricket Team Expense Sharing App

## Overview

This is a React-based expense sharing application designed specifically for the United 77 cricket team. The app helps divide match expenses fairly among three types of players: core players (who pay for themselves and cover unpaid players), self-paid players (who only pay their own fees), and unpaid players (who play but don't contribute financially). The application provides a clean, intuitive interface for calculating and displaying fee breakdowns for cricket matches.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, customizable components
- **Styling**: Tailwind CSS with custom design tokens and cricket-themed color scheme
- **State Management**: React hooks for local state, React Query for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with `/api` prefix
- **Development Server**: Vite for fast development with HMR and built-in TypeScript support
- **Build System**: esbuild for production bundling with platform-specific optimizations

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Management**: Centralized schema definitions in `shared/schema.ts` using Zod for validation
- **Development Storage**: In-memory storage implementation for rapid prototyping
- **Migrations**: Drizzle Kit for database schema migrations

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Security**: Built-in CORS handling and request logging middleware
- **Error Handling**: Centralized error handling with proper HTTP status codes

### External Dependencies

#### Database and ORM
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe ORM with schema-first approach
- **connect-pg-simple**: PostgreSQL session store for Express sessions

#### UI and Design System
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Web fonts (Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter)

#### Development and Build Tools
- **Vite**: Fast development server and build tool with TypeScript support
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for Node.js
- **Replit Integration**: Development environment plugins for Replit compatibility

#### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **@hookform/resolvers**: Resolver library connecting React Hook Form with Zod

#### State Management and Data Fetching
- **TanStack React Query**: Server state management with caching and synchronization
- **React Router**: Client-side routing (via Wouter for lightweight alternative)

#### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Conditional CSS class handling
- **class-variance-authority**: Type-safe variant handling for components
- **nanoid**: Secure URL-friendly unique ID generation