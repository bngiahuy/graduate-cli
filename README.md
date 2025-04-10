# Graduate-CLI

A React application built with Vite and TypeScript that uses Supabase for backend services.

## Table of Contents

- [Graduate-CLI](#graduate-cli)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Development](#development)
  - [Building for Production](#building-for-production)
  - [Configuration](#configuration)
    - [Supabase Table Design](#supabase-table-design)
      - [interaction\_count](#interaction_count)
    - [Usage in the Application](#usage-in-the-application)
    - [Environment Variables](#environment-variables)

## Project Structure

```
graduate-cli/
├── src/               # Source files
│   ├── supabase/      # Supabase configuration
│   ├── api/           # Supabase API
│   ├── data/          # Data sample
│   └── ...
├── public/            # Static assets
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd graduate-cli
   ```

2. Install dependencies using npm/yarn/pnpm:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm run dev
```

This will start a local development server, typically at http://localhost:5173

## Building for Production

To build the application for production:

```bash
npm run build
```

The build output will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Configuration

### Supabase Table Design

#### interaction_count

This table tracks the number of user interactions with the application.

1. Go to your Supabase dashboard and navigate to the SQL Editor
2. Create the `interaction_count` table by running the following SQL:

```sql
CREATE TABLE public.interaction_count (
  id SMALLINT PRIMARY KEY,
  count integer not null default 0
);

-- Insert initial record
INSERT INTO interaction_count (id, count) 
VALUES (1, 0);
```

Table structure:
- `id`: Primary key (use value 1 for the single record)
- `count`: The number of interactions

**Important:** Make sure to insert an initial record with `id = 1` as shown in the SQL code above. The application is designed to update this specific record.

### Usage in the Application

The table is used by the `updateCount.ts` API function which:
- Increments the count when the function is called
- Implements rate limiting to prevent excessive updates
- Returns the new count after updating

### Environment Variables

This project uses Supabase as a backend service. You need to set up your Supabase credentials in a `.env` file in the project root.

| Variable | Description |
|----------|-------------|
| VITE_SUPABASE_URL | Your Supabase project URL |
| VITE_SUPABASE_KEY | Your Supabase API key |