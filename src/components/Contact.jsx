import { useState } from 'react';
import { submitEnquiry, ConfigurationError } from '../services/enquiryService';

const PRODUCT_OPTIONS = ['Spicy Banana Chips', 'Salty Banana Chips', 'Both Products'];

const INITIAL_FORM    = { name: '', phone: '', product: '', message: '' };
const INITIAL_ERRORS  = { name: '', phone: '', product: '' };

// Indian mobile: 10 digits, starts with 6–9
const PHONE_RE = /^[6-9]\d{9}$/;

function validate(fields) {
  const errors = { name: '', phone: '', product: '' };
  if (!fields.name.trim())  errors.name    = 'Full name is required.';
  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_RE.test(fields.phone.replace(/\s/g, ''))) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }
  if (!fields.product) errors.product = 'Please select a product.';
  return errors;
}

function hasErrors(e) {
  return Object.values(e).some(Boolean);
}

// ── Shared style constants (unchanged from original) ────────────────────────
const inputBase = [
  'w-full bg-white rounded-xl border px-4 py-3 text-sm text-forest-green',
  'placeholder:text-forest-green/35',
  'border-forest-green/20',
  'focus:outline-none focus:ring-2 focus:ring-forest-green/60 focus:border-transparent',
  'transition duration-150',
].join(' ');

const inputError = 'border-red-400 ring-1 ring-red-300';
const labelCls   = 'block text-xs font-semibold tracking-wide text-forest-green mb-1.5';
const errorCls   = 'mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1';

function FieldError({ id, message }) {
  return (
    <p id={id} className={errorCls} role="alert">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {message}
    </p>
  );
}

// ── Submission status banner ─────────────────────────────────────────────────
function StatusBanner({ type, message }) {
  const isSuccess = type === 'success';
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`mb-6 flex items-start gap-3 rounded-2xl border px-4 py-3 ${
        isSuccess
          ? 'bg-forest-green/8 border-forest-green/25'
          : 'bg-red-50 border-red-200'
      }`}
    >
      <span className="text-base leading-none mt-px shrink-0" aria-hidden="true">
        {isSuccess ? '✅' : '⚠️'}
      </span>
      <p className={`text-xs leading-relaxed ${isSuccess ? 'text-forest-green' : 'text-red-700'}`}>
        {message}
      </p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [form,       setForm]       = useState(INITIAL_FORM);
  const [errors,     setErrors]     = useState(INITIAL_ERRORS);
  const [submitting, setSubmitting] = useState(false);   // true while fetch is in-flight
  const [submitted,  setSubmitted]  = useState(false);   // true after confirmed success
  const [submitError, setSubmitError] = useState('');     // server/config error message

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear inline field error as user corrects the value
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    // Clear banner error when user starts editing again
    if (submitError) setSubmitError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // 1. Client-side validation
    const newErrors = validate(form);
    if (hasErrors(newErrors)) { setErrors(newErrors); return; }

    // 2. Prevent duplicate in-flight submissions
    if (submitting) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      await submitEnquiry({
        fullName: form.name.trim(),
        phone:    form.phone.replace(/\s/g, ''),
        product:  form.product,
        message:  form.message.trim(),
      });

      // 3. Confirmed success — clear the form and show the success panel
      setSubmitted(true);

    } catch (err) {
      // 4. Show the specific error — never show a generic "success"
      if (err instanceof ConfigurationError) {
        setSubmitError(
          'The form backend is not configured yet. ' +
          'Please set VITE_GOOGLE_SCRIPT_URL and restart the dev server.'
        );
      } else {
        setSubmitError(
          err?.message ||
          'Something went wrong. Please check your connection and try again.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setSubmitted(false);
    setSubmitError('');
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section id="contact" className="bg-natural-cream py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — unchanged */}
        <div className="text-center mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="block w-5 h-px bg-banana-yellow" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.2em] text-earth-brown uppercase">
              Get in Touch
            </span>
            <span className="block w-5 h-px bg-banana-yellow" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green mb-4 leading-tight">
            Let's Connect
          </h2>
          <p className="text-forest-green/65 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have a question about our banana chips? Get in touch with Khandesh Naturals.
            We'd love to hear from you.
          </p>
        </div>

        {/* Centred form card */}
        <div className="max-w-lg mx-auto">
          <div className="relative bg-white rounded-3xl shadow-xl border border-natural-cream/80 p-7 sm:p-10 overflow-hidden">

            {/* Corner accents — unchanged */}
            <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl bg-banana-yellow/10 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-14 h-14 rounded-tr-3xl bg-forest-green/5 pointer-events-none" aria-hidden="true" />

            {submitted ? (
              /* ── Success panel — shown only after confirmed server response ── */
              <div className="text-center py-4">
                <div
                  className="mx-auto mb-5 w-14 h-14 rounded-full bg-forest-green/10 flex items-center justify-center text-2xl"
                  aria-hidden="true"
                >
                  🌿
                </div>
                <h3 className="text-xl font-bold text-forest-green mb-2">
                  Thank you, {form.name.split(' ')[0]}!
                </h3>
                <p className="text-forest-green/65 text-sm leading-relaxed mb-2">
                  Your enquiry for{' '}
                  <strong className="font-semibold text-forest-green">{form.product}</strong>{' '}
                  has been received. We'll be in touch soon.
                </p>
                <p className="text-forest-green/45 text-xs leading-relaxed mb-7 max-w-xs mx-auto">
                  Your details have been saved to our enquiry sheet and a team member
                  will reach out to you.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-forest-green text-natural-cream text-sm font-semibold px-6 py-3 rounded-full hover:bg-forest-green/85 transition-colors duration-200"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              /* ── Contact form ── */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Server / configuration error banner */}
                {submitError && (
                  <StatusBanner type="error" message={submitError} />
                )}

                {/* Full Name */}
                <div>
                  <label htmlFor="contact-name" className={labelCls}>
                    Full Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Ravi Patil"
                    value={form.name}
                    onChange={handleChange}
                    disabled={submitting}
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    className={`${inputBase} ${errors.name ? inputError : ''} disabled:opacity-60`}
                  />
                  {errors.name && <FieldError id="name-error" message={errors.name} />}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className={labelCls}>
                    Phone Number <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="10-digit Indian mobile number"
                    maxLength={10}
                    value={form.phone}
                    onChange={handleChange}
                    disabled={submitting}
                    aria-required="true"
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    className={`${inputBase} ${errors.phone ? inputError : ''} disabled:opacity-60`}
                  />
                  {errors.phone && <FieldError id="phone-error" message={errors.phone} />}
                </div>

                {/* Product */}
                <div>
                  <label htmlFor="contact-product" className={labelCls}>
                    Interested Product <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-product"
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    disabled={submitting}
                    aria-required="true"
                    aria-describedby={errors.product ? 'product-error' : undefined}
                    aria-invalid={errors.product ? 'true' : 'false'}
                    className={`${inputBase} cursor-pointer ${errors.product ? inputError : ''} ${!form.product ? 'text-forest-green/35' : ''} disabled:opacity-60`}
                  >
                    <option value="" disabled>Select a product…</option>
                    {PRODUCT_OPTIONS.map((p) => (
                      <option key={p} value={p} className="text-forest-green">{p}</option>
                    ))}
                  </select>
                  {errors.product && <FieldError id="product-error" message={errors.product} />}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelCls}>
                    Message{' '}
                    <span className="text-forest-green/40 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Anything you'd like us to know…"
                    value={form.message}
                    onChange={handleChange}
                    disabled={submitting}
                    className={`${inputBase} resize-none disabled:opacity-60`}
                  />
                </div>

                {/* Submit button — shows loading spinner while in-flight */}
                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="w-full bg-forest-green text-natural-cream font-semibold text-sm px-6 py-3.5 rounded-full shadow hover:bg-forest-green/85 hover:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      {/* Inline spinner — pure CSS, no dependency */}
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    'Send Enquiry'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
