/**
 * enquiryService.js
 * ------------------
 * Reusable submission utility for Khandesh Naturals enquiry form.
 * Sends form data to a Google Apps Script Web App via a POST request.
 *
 * The endpoint is read from the Vite environment variable
 * VITE_GOOGLE_SCRIPT_URL — never hardcode it here.
 */

const ENDPOINT = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

/**
 * @typedef {Object} EnquiryPayload
 * @property {string} fullName    - Customer's full name
 * @property {string} phone       - 10-digit Indian mobile number
 * @property {string} product     - Selected product option
 * @property {string} [message]   - Optional message
 */

/**
 * Submits an enquiry to the Google Apps Script backend.
 *
 * @param {EnquiryPayload} payload
 * @returns {Promise<{ ok: boolean; message: string }>}
 */
export async function submitEnquiry(payload) {
  // ── Guard: endpoint must be configured ──────────────────────────────────
  if (!ENDPOINT || ENDPOINT.trim() === '') {
    throw new ConfigurationError(
      'VITE_GOOGLE_SCRIPT_URL is not set. ' +
        'Add the deployed Apps Script URL to your .env file and restart the dev server.'
    );
  }

  const body = JSON.stringify({
    fullName: payload.fullName,
    phone: payload.phone,
    product: payload.product,
    message: payload.message ?? '',
    submittedAt: new Date().toISOString(),
  });

  // Google Apps Script Web Apps redirect POST → GET unless the body is
  // text/plain when using no-cors mode. We use a normal CORS fetch here,
  // which requires the script to return the correct CORS headers (see Code.gs).
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (!response.ok) {
    throw new SubmissionError(
      `Server responded with status ${response.status}. Please try again.`
    );
  }

  // Apps Script always returns 200 even for logic errors — check the body.
  let data;
  try {
    data = await response.json();
  } catch {
    throw new SubmissionError(
      'Unexpected response from the server. Please try again.'
    );
  }

  if (data?.status !== 'success') {
    throw new SubmissionError(
      data?.message ?? 'Submission failed. Please try again.'
    );
  }

  return { ok: true, message: data.message ?? 'Enquiry submitted successfully.' };
}

// ── Custom error classes ─────────────────────────────────────────────────────

/** Thrown when the environment variable is missing or empty. */
export class ConfigurationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'ConfigurationError';
  }
}

/** Thrown when the request reaches the server but the submission fails. */
export class SubmissionError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'SubmissionError';
  }
}
