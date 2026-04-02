# ReturnEase Landing Page

Marketing landing page for **ReturnEase**, a concierge planning service helping NRI tech families return to India with a sequenced, execution-first playbook.

## Tech Stack

- Vite
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev
```

### Build and preview

```bash
npm run build
npm run preview
```

## Runtime Defaults

The app ships with sensible production defaults for `https://returnease.in`:

- SEO/OG metadata in `index.html`
- Plausible analytics script (`data-domain="returnease.in"`)
- Lead webhook fallback to FormSubmit (`hello@returnease.in`)
- Booking fallback to email link

## Optional Environment Variables

Create `.env.local` to override defaults:

```bash
VITE_LEAD_WEBHOOK_URL=https://your-webhook-endpoint
VITE_CONTACT_WEBHOOK_URL=https://your-contact-webhook-endpoint
VITE_BOOKING_URL=https://your-calendly-or-booking-link
```

## Conversion Flow

The discovery funnel now includes:

- deterministic multi-step progression (no timer race conditions)
- consent checkbox before submit
- async lead submission with loading/success/error UX
- booking CTA after successful submission

## Accessibility and QA

Implemented improvements:

- accordion `aria-expanded` and `aria-controls`
- explicit label-to-input associations for form controls
- React 18 `createRoot` bootstrap

Recommended launch checks:

1. Verify all footer links and policy page in production.
2. Submit a discovery response and confirm webhook delivery.
3. Validate analytics events (`cta_click`, `form_step_completed`, `lead_submit_success`).
4. Test mobile and desktop layouts in Chrome, Safari, and Firefox.
5. Run `npm run lint` and `npm run build` before deploy.
