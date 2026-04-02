import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, LoaderCircle, X } from 'lucide-react';
import { siteConfig } from '../config/site';
import { trackEvent } from '../lib/analytics';

type ContactFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEsc);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === 'submitting') {
      return;
    }

    setSubmitState('submitting');
    setErrorMessage('');

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      description: formData.description,
      source: 'returnease-contact-modal',
      submittedAt: new Date().toISOString(),
      _subject: 'ReturnEase Contact Request',
    };

    try {
      const response = await fetch(siteConfig.contactWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Contact submission failed');
      }

      setSubmitState('success');
      trackEvent('contact_submit_success', {
        location: 'contact_modal',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        description: '',
      });
    } catch (error) {
      setSubmitState('error');
      setErrorMessage('Could not submit right now. Please email hello@returnease.in.');
      trackEvent('contact_submit_error', {
        location: 'contact_modal',
        error_type: error instanceof Error ? error.message : 'unknown_error',
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-ink/45 backdrop-blur-[2px] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Contact ReturnEase">
      <div className="w-full max-w-xl bg-cream border-2 border-ink shadow-solid overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-ink bg-white">
          <div>
            <h2 className="text-2xl text-ink">CONTACT US</h2>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/45 mt-1">
              Tell us about your move
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 border-2 border-ink bg-cream flex items-center justify-center text-ink hover:bg-amber-50 transition-colors"
            aria-label="Close contact form">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitState === 'success' ? (
          <div className="px-6 py-10">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700 mb-2">
              Request Submitted
            </p>
            <p className="text-[15px] text-ink/75 font-medium leading-relaxed">
              Thanks for reaching out. We received your details and will contact you shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 bg-ink text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider border-2 border-ink shadow-solid-sm">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60 mb-2">
                  Name
                </span>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="w-full bg-white border-2 border-ink px-4 py-2.5 text-sm font-medium text-ink focus:outline-none focus:border-amber-600"
                  placeholder="Your full name"
                />
              </label>

              <label className="block">
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60 mb-2">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className="w-full bg-white border-2 border-ink px-4 py-2.5 text-sm font-medium text-ink focus:outline-none focus:border-amber-600"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60 mb-2">
                Phone Number
              </span>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, phone: event.target.value }))
                }
                className="w-full bg-white border-2 border-ink px-4 py-2.5 text-sm font-medium text-ink focus:outline-none focus:border-amber-600"
                placeholder="+91 ..."
              />
            </label>

            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60 mb-2">
                Description
              </span>
              <textarea
                value={formData.description}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, description: event.target.value }))
                }
                rows={5}
                className="w-full bg-white border-2 border-ink px-4 py-3 text-sm font-medium text-ink focus:outline-none focus:border-amber-600 resize-none"
                placeholder="Tell us about your timeline, city, and any key relocation concerns."
              />
            </label>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider border-2 border-ink shadow-solid hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-solid-sm transition-all disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:translate-x-0">
                {submitState === 'submitting' ? (
                  <>
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    CONTACT US
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            {errorMessage && <p className="text-sm font-medium text-red-700">{errorMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
