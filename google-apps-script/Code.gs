/**
 * Google Apps Script — Khandesh Naturals Enquiry Sheet Backend
 * ============================================================
 *
 * FILE: google-apps-script/Code.gs
 *
 * PURPOSE
 * -------
 * Receives POST requests from the Khandesh Naturals website contact form
 * and appends each valid enquiry as a new row in a Google Sheet.
 *
 * SETUP INSTRUCTIONS
 * ------------------
 * 1. Open Google Sheets → create a new spreadsheet.
 *    Name the first sheet "Enquiries" (or change SHEET_NAME below).
 *
 * 2. Copy the spreadsheet ID from the URL:
 *      https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit
 *    Paste it as the value of SPREADSHEET_ID below.
 *
 * 3. Open Extensions → Apps Script.
 *    Delete any placeholder code and paste this entire file.
 *
 * 4. Click "Save" (💾), then click "Deploy" → "New deployment".
 *    - Type: Web App
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone   ← required so the website can POST without auth
 *    Click "Deploy" and authorize when prompted.
 *
 * 5. Copy the Web App URL (ends in /exec).
 *    In your project, create a file called .env (never commit this file):
 *
 *      VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
 *
 *    Restart `npm run dev` so Vite picks up the new variable.
 *
 * 6. Submit a test enquiry from the website and verify a row appears in Sheets.
 *
 * RE-DEPLOYING AFTER CODE CHANGES
 * --------------------------------
 * Apps Script caches the deployed version. After changing this file:
 *   Deploy → Manage deployments → Edit (pencil icon) → Version: New version → Deploy.
 *
 * SECURITY NOTES
 * --------------
 * - This endpoint is publicly accessible. Anyone who discovers the URL can POST to it.
 * - Server-side field validation (below) rejects obviously malformed payloads.
 * - For stronger protection consider:
 *     • A shared secret token checked on both sides (adds minimal friction for bots).
 *     • reCAPTCHA v3 on the frontend with server-side token verification.
 *     • Moving to a proper backend (Cloud Functions, etc.) with rate limiting.
 * - Do NOT log full phone numbers or other personal data unnecessarily.
 */

// ── Configuration ─────────────────────────────────────────────────────────────

/** Paste your Google Sheets spreadsheet ID here. */
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

/** The exact name of the sheet tab where enquiries will be written. */
var SHEET_NAME = 'Enquiries';

/** Column headers — order must match appendRow() call below. */
var HEADERS = ['Timestamp', 'Full Name', 'Phone Number', 'Interested Product', 'Message'];

/** Allowed product values — must match the frontend dropdown exactly. */
var ALLOWED_PRODUCTS = ['Spicy Banana Chips', 'Salty Banana Chips', 'Both Products'];

/** Maximum character lengths for text fields. */
var LIMITS = {
  fullName: 100,
  phone:    15,
  product:  50,
  message:  1000,
};

// ── CORS helper ───────────────────────────────────────────────────────────────

/**
 * Returns a JSON ContentService output with CORS headers set.
 * Apps Script does not allow setting arbitrary response headers directly,
 * but ContentService.setMimeType(JSON) is sufficient for standard CORS
 * POST requests from browsers when the script is deployed as "Anyone" access.
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Handle OPTIONS preflight (browsers send this before cross-origin POSTs) ──

function doGet() {
  // Respond to accidental GET requests with a plain message.
  return jsonResponse({ status: 'error', message: 'This endpoint only accepts POST requests.' });
}

// ── Main POST handler ─────────────────────────────────────────────────────────

function doPost(e) {
  try {
    // 1. Parse request body
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: 'error', message: 'Empty request body.' });
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (_) {
      return jsonResponse({ status: 'error', message: 'Invalid JSON in request body.' });
    }

    // 2. Required field presence check
    var fullName = (data.fullName || '').toString().trim();
    var phone    = (data.phone    || '').toString().trim();
    var product  = (data.product  || '').toString().trim();
    var message  = (data.message  || '').toString().trim();

    if (!fullName) return jsonResponse({ status: 'error', message: 'Full name is required.' });
    if (!phone)    return jsonResponse({ status: 'error', message: 'Phone number is required.' });
    if (!product)  return jsonResponse({ status: 'error', message: 'Product selection is required.' });

    // 3. Field length limits
    if (fullName.length > LIMITS.fullName)
      return jsonResponse({ status: 'error', message: 'Full name is too long.' });
    if (phone.length > LIMITS.phone)
      return jsonResponse({ status: 'error', message: 'Phone number is too long.' });
    if (product.length > LIMITS.product)
      return jsonResponse({ status: 'error', message: 'Product value is too long.' });
    if (message.length > LIMITS.message)
      return jsonResponse({ status: 'error', message: 'Message is too long (max 1000 characters).' });

    // 4. Phone format — 10-digit Indian mobile (starts 6–9)
    var phoneDigits = phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      return jsonResponse({ status: 'error', message: 'Enter a valid 10-digit Indian mobile number.' });
    }

    // 5. Product allow-list
    if (ALLOWED_PRODUCTS.indexOf(product) === -1) {
      return jsonResponse({ status: 'error', message: 'Invalid product selection.' });
    }

    // 6. Write to Google Sheet
    var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      // Create the sheet if it doesn't exist yet
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Add header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      // Bold the header row
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    // Build the new row — use the timestamp from the client if provided,
    // otherwise use the server time (more trustworthy).
    var timestamp = new Date().toISOString();

    sheet.appendRow([
      timestamp,
      fullName,
      phoneDigits,   // store digits-only for consistency
      product,
      message,
    ]);

    // 7. Success response — do not echo back personal data
    return jsonResponse({
      status:  'success',
      message: 'Enquiry received. Thank you!',
    });

  } catch (err) {
    // Log the error server-side (visible in Apps Script → Executions)
    // but do not leak stack traces to the client.
    console.error('doPost error:', err.message);
    return jsonResponse({
      status:  'error',
      message: 'An internal error occurred. Please try again later.',
    });
  }
}
