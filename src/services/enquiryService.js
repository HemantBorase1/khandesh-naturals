/**
 * enquiryService.js
 * ------------------
 * Reusable submission utility for Khandesh Naturals enquiry form.
 * Sends form data to a Google Apps Script Web App via a POST request.
 *
 * The endpoint is read from the Vite environment variable
 * VITE_GOOGLE_SCRIPT_URL — never hardcode it here.
 *
 * ── CORS approach ─────────────────────────────────────────────────────────────
 *
 * Google Apps Script Web Apps return "Access-Control-Allow-Origin: *" on their
 * final response when:
 *   (a) the deployment "Who has access" is set to "Anyone" (not "Anyone with
 *       Google account"), AND
 *   (b) the request is a CORS "simple request" — i.e. Content-Type is one of
 *       text/plain, application/x-www-form-urlencoded, or multipart/form-data,
 *       with no custom headers.
 *
 * Using Content-Type: text/plain;charset=utf-8 satisfies (b). The body is still
 * valid JSON — Code.gs calls JSON.parse(e.postData.contents) regardless of MIME.
 *
 * We do NOT use mode: "no-cors". That produces an opaque response (status 0,
 * unreadable body) and silently swallows 401 Unauthorized errors, causing the
 * UI to display a false success message while nothing was saved to the sheet.
 *
 * If you see a CORS error after this change, the root cause is the deployment
 * access setting, not the request format. Fix "Who has access" → "Anyone".
 * ──────────────────────────────────────────────────────────────────────────────
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
 * Throws ConfigurationError if the endpoint env-var is missing.
 * Throws SubmissionError if the server responds with an error status or
 * returns a JSON body with status !== "success".
 *
 * Only returns { ok: true } when the server has confirmed success.
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
    fullName:    payload.fullName,
    phone:       payload.phone,
    product:     payload.product,
    message:     payload.message ?? '',
    submittedAt: new Date().toISOString(),
  });

  // Send as text/plain to avoid CORS preflight (simple request).
  // Do NOT add mode: "no-cors" — that makes the response unreadable and
  // causes the UI to falsely claim success on 401 / network errors.
  let response;
  try {
    response = await fetch(ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
    });
  } catch (networkErr) {
    // fetch() threw a TypeError ("Failed to fetch"). In this context this is
    // almost always a browser CORS block: the server responded (likely with
    // 401 Unauthorized) but without an Access-Control-Allow-Origin header, so
    // the browser blocked the response and threw instead of returning it.
    //
    // Root cause: Apps Script deployment "Who has access" is NOT set to "Anyone".
    // Fix: Deploy → Manage deployments → edit → "Who has access" → "Anyone" → New version → Deploy.
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    if (!isOnline) {
      throw new SubmissionError('No internet connection. Please check your network and try again.');
    }
    throw new SubmissionError(
      'The form could not connect to the server (CORS / access error). ' +
      'The Google Apps Script deployment must be set to "Who has access: Anyone". ' +
      'Please complete that deployment step and try again.'
    );
  }

  // Apps Script always returns 200 on success. Any other status means
  // the request never reached doPost (e.g. 401 = wrong deployment access).
  if (!response.ok) {
    throw new SubmissionError(
      `Server returned HTTP ${response.status}. ` +
      (response.status === 401
        ? 'The Apps Script deployment "Who has access" must be set to "Anyone".'
        : 'Please try again later.')
    );
  }

  // Parse the JSON body that doPost() always returns.
  let data;
  try {
    data = await response.json();
  } catch {
    throw new SubmissionError(
      'The server returned an unexpected response. Please try again.'
    );
  }

  // doPost returns { status: "success" | "error", message: string }
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
