import { type ElementType, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import { siteConfig } from '../config/site';
import { trackEvent } from '../lib/analytics';

type DiscoveryData = {
  origin: string;
  destination: string;
  familyMembers: string;
  hasKids: boolean | null;
  childrenAges: string;
  hasEquity: boolean | null;
  consent: boolean;
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const originOptions = [
  'US',
  'UK',
  'UAE',
  'Germany',
  'Singapore',
  'Australia',
  'Canada',
  'Other',
];

const destinationOptions = ['Bengaluru', 'Hyderabad', 'Pune', 'NCR', 'Other'];

export function DiscoveryForm() {
  const [step, setStep] = useState(1);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState<DiscoveryData>({
    origin: '',
    destination: '',
    familyMembers: '',
    hasKids: null,
    childrenAges: '',
    hasEquity: null,
    consent: false,
  });

  const totalSteps = 5;

  const readinessData = useMemo(() => {
    let score = 72;
    const flags: {
      icon: ElementType;
      label: string;
      severity: 'high' | 'medium';
      detail: string;
    }[] = [];

    if (formData.hasEquity) {
      score -= 8;
      flags.push({
        icon: Shield,
        label: 'RNOR Tax Exposure',
        severity: 'high',
        detail: `Cross-border equity from ${formData.origin} requires RNOR filing within 60 days of landing.`,
      });
    }

    if (formData.hasKids) {
      score -= 5;
      flags.push({
        icon: GraduationCap,
        label: 'School Admission Window',
        severity: 'high',
        detail: `${formData.destination} international school applications close Oct-Jan. Late movers face waitlists.`,
      });
    }

    flags.push({
      icon: Briefcase,
      label: 'Documentation Sequencing',
      severity: 'medium',
      detail:
        'SIM -> Aadhaar -> Bank KYC loop requires pre-planned execution to avoid 3-4 week delays.',
    });

    return { score, flags };
  }, [formData.destination, formData.hasEquity, formData.hasKids, formData.origin]);

  const stepLabels = ['Origin', 'Destination', 'Family', 'Finances', 'Results'];

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const isStepValid = () => {
    if (step === 1) return formData.origin !== '';
    if (step === 2) return formData.destination !== '';
    if (step === 3) {
      const members = Number(formData.familyMembers);
      const hasValidMembers =
        formData.familyMembers.trim() !== '' &&
        Number.isFinite(members) &&
        members >= 1;
      if (!hasValidMembers) {
        return false;
      }
      if (formData.hasKids === null) {
        return false;
      }
      if (formData.hasKids && formData.childrenAges.trim() === '') {
        return false;
      }
      return true;
    }
    if (step === 4) return formData.hasEquity !== null;
    return true;
  };

  const mailtoLink = useMemo(() => {
    const subject = encodeURIComponent('ReturnEase Blueprinting Call Request');
    const body = encodeURIComponent(
      `Hi ReturnEase Team,\n\nI'd like to book a 30-min Blueprinting Call.\n\nMy Details:\n- Moving from: ${formData.origin}\n- Moving to: ${formData.destination}\n- Family members: ${formData.familyMembers}\n- School-age children: ${formData.hasKids ? 'Yes' : 'No'}\n- Ages of children: ${formData.hasKids ? formData.childrenAges : 'N/A'}\n- US-based Equity/RSUs: ${formData.hasEquity ? 'Yes' : 'No'}\n\nLooking forward to speaking.`
    );

    return `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  }, [
    formData.childrenAges,
    formData.destination,
    formData.familyMembers,
    formData.hasEquity,
    formData.hasKids,
    formData.origin,
  ]);

  const bookingLink = siteConfig.bookingUrl.startsWith('mailto:')
    ? mailtoLink
    : siteConfig.bookingUrl;
  const isExternalBookingLink = bookingLink.startsWith('http');

  const handleLeadSubmit = async () => {
    if (!formData.consent || submitState === 'submitting' || submitState === 'success') {
      return;
    }

    setSubmitState('submitting');
    setSubmitError('');

    const leadPayload = {
      origin: formData.origin,
      destination: formData.destination,
      familyMembers: formData.familyMembers,
      hasKids: formData.hasKids ? 'Yes' : 'No',
      childrenAges: formData.hasKids ? formData.childrenAges : 'N/A',
      hasEquity: formData.hasEquity ? 'Yes' : 'No',
      readinessScore: readinessData.score,
      riskFlags: readinessData.flags.map((flag) => flag.label).join(', '),
      source: 'returnease-landing-page',
      submittedAt: new Date().toISOString(),
      _subject: 'New ReturnEase Discovery Lead',
    };

    try {
      const response = await fetch(siteConfig.leadWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(leadPayload),
      });

      if (!response.ok) {
        throw new Error('Lead submission request failed.');
      }

      setSubmitState('success');
      trackEvent('lead_submit_success', {
        step: 5,
        readiness_score: readinessData.score,
        has_kids: formData.hasKids ? 1 : 0,
        has_equity: formData.hasEquity ? 1 : 0,
      });
    } catch (error) {
      setSubmitState('error');
      setSubmitError('Submission failed. You can still book directly by email below.');
      trackEvent('lead_submit_error', {
        step: 5,
        error_type: error instanceof Error ? error.message : 'unknown_error',
      });
    }
  };

  return (
    <section id="discovery" className="py-24 bg-white border-b-2 border-ink">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl text-ink mb-4">Start Your Discovery</h2>
          <p className="text-lg text-ink/70 font-medium">
            Tell us about your move to get a personalized blueprint.
          </p>
        </div>

        <div className="bg-white border-2 border-ink shadow-solid overflow-hidden">
          <div className="border-b-2 border-ink bg-cream px-6 py-3 flex items-center justify-between">
            {stepLabels.map((label, i) => {
              const stepNum = i + 1;
              const isComplete = step > stepNum;
              const isCurrent = step === stepNum;

              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${
                      isComplete
                        ? 'bg-amber-500 border-ink text-ink'
                        : isCurrent
                          ? 'bg-ink border-ink text-white'
                          : 'bg-cream border-ink/20 text-ink/30'
                    }`}
                  >
                    {isComplete ? '✓' : stepNum}
                  </div>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider hidden sm:inline ${
                      isCurrent ? 'text-ink' : isComplete ? 'text-ink/60' : 'text-ink/30'
                    }`}
                  >
                    {label}
                  </span>
                  {i < stepLabels.length - 1 && (
                    <div
                      className={`w-6 md:w-10 h-px mx-1 ${
                        isComplete ? 'bg-amber-500' : 'bg-ink/10'
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-8 md:p-10 min-h-[340px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-serif text-ink mb-1">Where are you coming from?</h3>
                      <p className="text-sm text-ink/50 font-medium">
                        Select your current country of residence.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {originOptions.map((country) => (
                        <button
                          key={country}
                          type="button"
                          aria-pressed={formData.origin === country}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, origin: country }));
                            setStep(2);
                            trackEvent('form_step_completed', {
                              step: 1,
                              answer: country.toLowerCase(),
                            });
                          }}
                          className={`p-3.5 border-2 text-left font-bold text-sm transition-all ${
                            formData.origin === country
                              ? 'border-amber-600 bg-amber-50 text-amber-800'
                              : 'border-ink/15 hover:border-ink/40 text-ink/80'
                          }`}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-serif text-ink mb-1">Where is your office/base?</h3>
                      <p className="text-sm text-ink/50 font-medium">
                        This determines your school and housing matrix.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {destinationOptions.map((city) => (
                        <button
                          key={city}
                          type="button"
                          aria-pressed={formData.destination === city}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, destination: city }));
                            setStep(3);
                            trackEvent('form_step_completed', {
                              step: 2,
                              answer: city.toLowerCase(),
                            });
                          }}
                          className={`p-3.5 border-2 text-left font-bold text-sm transition-all ${
                            formData.destination === city
                              ? 'border-amber-600 bg-amber-50 text-amber-800'
                              : 'border-ink/15 hover:border-ink/40 text-ink/80'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-serif text-ink mb-1">Tell us about your family.</h3>
                      <p className="text-sm text-ink/50 font-medium">
                        This helps us personalize housing, school, and city sequencing.
                      </p>
                    </div>
                    <label className="block">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60 mb-2">
                        Family Members
                      </span>
                      <input
                        type="number"
                        min={1}
                        value={formData.familyMembers}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            familyMembers: event.target.value,
                          }))
                        }
                        className="w-full bg-white border-2 border-ink px-4 py-2.5 text-sm font-medium text-ink focus:outline-none focus:border-amber-600"
                        placeholder="Total members moving"
                      />
                    </label>
                    <div>
                      <p className="text-sm text-ink/50 font-medium mb-3">
                        Do you have school-age children?
                      </p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        aria-pressed={formData.hasKids === true}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, hasKids: true }));
                          trackEvent('form_step_completed', {
                            step: 3,
                            answer: 'has_kids_yes',
                          });
                        }}
                        className={`p-5 border-2 text-center font-bold text-lg transition-all ${
                          formData.hasKids === true
                            ? 'border-amber-600 bg-amber-50 text-amber-800'
                            : 'border-ink/15 hover:border-ink/40 text-ink/80'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        aria-pressed={formData.hasKids === false}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            hasKids: false,
                            childrenAges: '',
                          }));
                          trackEvent('form_step_completed', {
                            step: 3,
                            answer: 'has_kids_no',
                          });
                        }}
                        className={`p-5 border-2 text-center font-bold text-lg transition-all ${
                          formData.hasKids === false
                            ? 'border-amber-600 bg-amber-50 text-amber-800'
                            : 'border-ink/15 hover:border-ink/40 text-ink/80'
                        }`}
                      >
                        No
                      </button>
                    </div>
                    </div>
                    {formData.hasKids === true && (
                      <label className="block">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60 mb-2">
                          Ages of Children
                        </span>
                        <input
                          type="text"
                          value={formData.childrenAges}
                          onChange={(event) =>
                            setFormData((prev) => ({
                              ...prev,
                              childrenAges: event.target.value,
                            }))
                          }
                          className="w-full bg-white border-2 border-ink px-4 py-2.5 text-sm font-medium text-ink focus:outline-none focus:border-amber-600"
                          placeholder="Example: 5, 9, 13"
                        />
                      </label>
                    )}
                    {formData.hasKids === true && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 bg-amber-50 border border-amber-600/30 text-amber-900 text-sm font-medium flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                        Education planning (Phase 2) will be prioritized in your playbook.
                      </motion.div>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-serif text-ink mb-1">
                        Do you have US-based RSUs/Equity?
                      </h3>
                      <p className="text-sm text-ink/50 font-medium">
                        This activates the RNOR Tax Shield module.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        aria-pressed={formData.hasEquity === true}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, hasEquity: true }));
                          setStep(5);
                          trackEvent('form_step_completed', {
                            step: 4,
                            answer: 'has_equity_yes',
                          });
                        }}
                        className={`p-5 border-2 text-center font-bold text-lg transition-all ${
                          formData.hasEquity === true
                            ? 'border-amber-600 bg-amber-50 text-amber-800'
                            : 'border-ink/15 hover:border-ink/40 text-ink/80'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        aria-pressed={formData.hasEquity === false}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, hasEquity: false }));
                          setStep(5);
                          trackEvent('form_step_completed', {
                            step: 4,
                            answer: 'has_equity_no',
                          });
                        }}
                        className={`p-5 border-2 text-center font-bold text-lg transition-all ${
                          formData.hasEquity === false
                            ? 'border-amber-600 bg-amber-50 text-amber-800'
                            : 'border-ink/15 hover:border-ink/40 text-ink/80'
                        }`}
                      >
                        No
                      </button>
                    </div>
                    {formData.hasEquity === true && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 bg-amber-50 border border-amber-600/30 text-amber-900 text-sm font-medium flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                        RNOR Tax Shield strategy (Phase 1) will be included in your plan.
                      </motion.div>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-3">
                        Preliminary Return Readiness Score
                      </p>
                      <div className="inline-flex items-baseline gap-1">
                        <span className="text-6xl font-serif text-ink">{readinessData.score}</span>
                        <span className="text-2xl font-serif text-ink/30">/100</span>
                      </div>
                      <p className="text-sm text-ink/50 font-medium mt-2">
                        {formData.origin} -&gt; {formData.destination} • Family size:{' '}
                        {formData.familyMembers} • {readinessData.flags.length} risk
                        flag{readinessData.flags.length !== 1 ? 's' : ''} identified
                      </p>
                    </div>

                    <div className="space-y-3">
                      {readinessData.flags.map((flag, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.15 }}
                          className={`p-4 border-2 flex items-start gap-3 ${
                            flag.severity === 'high'
                              ? 'border-amber-600 bg-amber-50'
                              : 'border-ink/15 bg-cream'
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 ${
                              flag.severity === 'high'
                                ? 'border-amber-600 bg-amber-100 text-amber-700'
                                : 'border-ink/20 bg-white text-ink/50'
                            }`}
                          >
                            <flag.icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-bold text-ink">{flag.label}</span>
                              {flag.severity === 'high' && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 border border-amber-600/30">
                                  Action Required
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-ink/60 font-medium leading-relaxed">
                              {flag.detail}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {submitState !== 'success' && (
                      <div className="space-y-4">
                        <label
                          htmlFor="consent"
                          className="flex items-start gap-3 p-3 border border-ink/15 bg-cream text-sm text-ink/70 font-medium"
                        >
                          <input
                            id="consent"
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(event) =>
                              setFormData((prev) => ({ ...prev, consent: event.target.checked }))
                            }
                            className="mt-0.5 h-4 w-4 rounded border-ink/30 text-amber-600 focus:ring-amber-600"
                          />
                          <span>
                            I consent to ReturnEase contacting me about my relocation plan. My details
                            will only be used for planning and communication.
                          </span>
                        </label>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <button
                            type="button"
                            onClick={handleLeadSubmit}
                            disabled={!formData.consent || submitState === 'submitting'}
                            className="w-full bg-amber-600 text-white px-8 py-4 border-2 border-ink font-bold text-lg shadow-solid hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-solid-sm transition-all flex items-center justify-center gap-2 group disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                          >
                            {submitState === 'submitting'
                              ? 'Submitting your discovery...'
                              : 'Get Personalized Playbook'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>

                          <p className="text-center text-xs text-ink/40 font-medium mt-3" aria-live="polite">
                            {submitState === 'error'
                              ? submitError
                              : 'We will review your risk flags and share the next-step protocol.'}
                          </p>
                        </motion.div>
                      </div>
                    )}

                    {submitState === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-2 border-amber-600 bg-amber-50 p-5"
                      >
                        <p className="text-sm font-bold text-amber-800 uppercase tracking-widest mb-2">
                          Discovery Submitted
                        </p>
                        <p className="text-sm text-ink/70 font-medium mb-4">
                          Thanks. We have your details and will prepare your protocol. You can book your
                          30-minute call now.
                        </p>
                        <a
                          href={bookingLink}
                          target={isExternalBookingLink ? '_blank' : undefined}
                          rel={isExternalBookingLink ? 'noopener noreferrer' : undefined}
                          onClick={() =>
                            trackEvent('cta_click', {
                              location: 'discovery_results',
                              cta: 'book_blueprinting_call',
                            })
                          }
                          className="w-full bg-ink text-white px-8 py-3 border-2 border-ink font-bold text-sm shadow-solid-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                        >
                          Book your 30-min Blueprinting Call
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {step < 5 && (
              <div className="mt-auto pt-8 flex items-center justify-between border-t border-ink/10">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-sm font-bold text-ink/50 hover:text-ink disabled:opacity-30 disabled:hover:text-ink/50 transition-colors uppercase tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex items-center gap-2 text-sm font-bold text-white bg-ink px-5 py-2.5 border-2 border-ink disabled:opacity-50 transition-all uppercase tracking-wider"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
