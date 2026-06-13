# Portfolio

My personal developer portfolio. An editorial, paper styled site built with Next.js and the App Router, fully bilingual in Spanish and English.

Live: https://eduardoemanuelcf.vercel.app

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v4
- next-intl for Spanish and English routing
- Framer Motion, with motion that respects reduced motion settings
- Resend for the contact form
- Vitest and React Testing Library for tests

## Running it locally

Requires Node 18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

### Environment

The contact form sends email through Resend. Create a `.env.local` file:

```env
RESEND_API_KEY=your_key
CONTACT_FROM_EMAIL=your_verified_sender
```

Both are optional in development. Without `RESEND_API_KEY` the contact route runs in mock mode and logs the submission instead of sending it.

## Testing

```bash
npm test      # unit and integration tests
npm run lint  # eslint
npm run build # production build and type check
```

Tests cover the parts that carry real logic, not just rendering. The contact API is tested for rate limiting, the honeypot, email validation and length limits. The terminal hook is tested for its commands and state.

## Structure

```
app/[locale]          localized routes and layout
app/api/contact       contact endpoint with rate limit and anti-spam
app/api/github        cached GitHub activity proxy
components/sections   page sections (Hero, About, Experience, Projects, Skills, Contact)
components/site       header, footer, section shell
components/ui         buttons and icons
hooks                 useTerminal
messages              es and en dictionaries
styles                design tokens and global styles
```

The design system is documented in [DESIGN.md](DESIGN.md).
