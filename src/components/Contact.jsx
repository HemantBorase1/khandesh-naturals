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
            Interested in ordering our Banana Chips? Reach out directly or submit your details using the form below.
          </p>
        </div>

        {/* ── Contact info cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">

          {/* Phone */}
          <a
            href="tel:+919607313451"
            className="group flex items-center gap-4 bg-white rounded-2xl border border-forest-green/12 shadow-sm px-5 py-4 hover:border-forest-green/30 hover:shadow-md transition-all duration-200"
            aria-label="Call us at +91 96073 13451"
          >
            {/* Phone icon */}
            <span className="flex-shrink-0 w-11 h-11 rounded-full bg-forest-green/8 flex items-center justify-center group-hover:bg-forest-green/14 transition-colors duration-200" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-forest-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold tracking-wide text-earth-brown uppercase mb-0.5">Call Us</p>
              <p className="text-sm font-bold text-forest-green">+91 96073 13451</p>
            </div>
          </a>

          {/* WhatsApp — with pre-filled message */}
          <a
            href="https://wa.me/919607313451?text=Hello%20Khandesh%20Naturals!%20I%20am%20interested%20in%20ordering%20your%20banana%20chips.%20Please%20share%20the%20available%20products%20and%20ordering%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-white rounded-2xl border border-forest-green/12 shadow-sm px-5 py-4 hover:border-[#25D366]/40 hover:shadow-md transition-all duration-200"
            aria-label="Chat with us on WhatsApp"
          >
            {/* WhatsApp icon */}
            <span className="flex-shrink-0 w-11 h-11 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/18 transition-colors duration-200" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#128C7E]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold tracking-wide text-earth-brown uppercase mb-0.5">WhatsApp</p>
              <p className="text-sm font-bold text-[#128C7E]">Chat with Us</p>
            </div>
          </a>

          {/* Location */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Shree+Swami+Samarth+Co-Operative+Housing+Society+Ravet+Pune+Maharashtra"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-white rounded-2xl border border-forest-green/12 shadow-sm px-5 py-4 hover:border-banana-yellow/50 hover:shadow-md transition-all duration-200 sm:col-span-2 lg:col-span-1"
            aria-label="Open our location on Google Maps"
          >
            {/* Map pin icon */}
            <span className="flex-shrink-0 w-11 h-11 rounded-full bg-banana-yellow/12 flex items-center justify-center group-hover:bg-banana-yellow/22 transition-colors duration-200" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-earth-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold tracking-wide text-earth-brown uppercase mb-0.5">Our Location</p>
              <p className="text-sm font-semibold text-forest-green leading-snug">
                Shree Swami Samarth Society,<br />
                <span className="font-normal text-forest-green/70">Ravet, Pune, Maharashtra</span>
              </p>
            </div>
          </a>

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
                <p className="text-forest-green font-semibold text-xs sm:text-sm leading-relaxed mb-7 max-w-xs mx-auto">
                  Your details have been saved and a team member will reach out you within 24 Hours.
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
