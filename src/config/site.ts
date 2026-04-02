export const siteConfig = {
  siteName: 'ReturnEase',
  siteUrl: 'https://returnease.in',
  title: 'ReturnEase | 180-Day Return-to-India Playbook for NRI Tech Families',
  description:
    'Return to India with confidence. ReturnEase gives NRI tech families a sequenced 180-day playbook covering tax, school admissions, housing, and landing logistics.',
  contactEmail: 'hello@returnease.in',
  linkedInUrl: 'https://www.linkedin.com/company/returnease',
  termsPath: '/terms.html',
  privacyPath: '/privacy.html',
  analyticsDomain: 'returnease.in',
  leadWebhookUrl:
    import.meta.env.VITE_LEAD_WEBHOOK_URL ??
    'https://formsubmit.co/ajax/hello@returnease.in',
  bookingUrl:
    import.meta.env.VITE_BOOKING_URL ?? 'mailto:hello@returnease.in',
};
