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
 *    - Who has access: Anyone   ← REQUIRED — must be "Anyone", not "Anyone with Google account"
 *    Click "Deploy" and authorize when prompted.
 *
 * 5. Copy the Web App URL (ends in /exec).
 *    In your project root, open .env and set:
 *
 *      VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
 *
 *    Restart `npm run dev` so Vite picks up the new variable.
 *
 * 6. Run testSheetWrite() from the Apps Script editor to confirm the sheet
 *    is writable BEFORE testing the web form.
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
 *     • A shared secret token checked on both sides.
 *     • reCAPTCHA v3 on the frontend with server-side token verification.
 *     • Moving to a proper backend (Cloud Functions, etc.) with rate limiting.
 * - Do NOT log full phone numbers or other personal data unnecessarily.
 */

// ── Configuration ─────────────────────────────────────────────────────────────

/** Spreadsheet ID — the token between /d/ and /edit in the Google Sheets URL. */
var SPREADSHEET_ID = '1SiqDZ2pughY6rEC3im4TucupN5jrs4daVUHlV2oj1qM';

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

// ── Response helper ───────────────────────────────────────────────────────────

/**
 * Returns a JSON ContentService output.
 *
 * CORS NOTE: Apps Script cannot respond to browser CORS preflight (OPTIONS)
 * requests. The frontend must send only CORS "simple requests":
 *   - Content-Type: text/plain;charset=utf-8  (NOT application/json)
 *   - No custom request headers
 *   - mode: "cors" (default) — Apps Script does return Access-Control-Allow-Origin: *
 *     on its final response for simple requests when deployed as "Anyone".
 *
 * The 401 Unauthorized error means the deployment is NOT set to "Anyone".
 * Fix the deployment access setting — do not work around it with no-cors.
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Standalone sheet write test (run this first from the editor) ──────────────

/**
 * testSheetWrite()
 * ----------------
 * Run this function MANUALLY from the Apps Script editor (▶ Run button)
 * BEFORE testing the web form. It confirms the sheet is accessible and writable.
 *
 * HOW TO RUN:
 *   1. In the Apps Script editor, select "testSheetWrite" from the function dropdown.
 *   2. Click ▶ Run.
 *   3. Check the Execution Log (View → Logs) for "TEST ROW WRITTEN SUCCESSFULLY".
 *   4. Open your Google Sheet and confirm a row labelled "=== TEST ROW ===" appeared.
 *   5. Delete that test row manually before going live.
 *
 * This function does NOT affect doPost(e) and is never called by the web form.
 */
function testSheetWrite() {
  try {
    Logger.log('testSheetWrite: opening spreadsheet ID = ' + SPREADSHEET_ID);
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('testSheetWrite: spreadsheet opened: ' + ss.getName());

    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      Logger.log('testSheetWrite: sheet "' + SHEET_NAME + '" not found — creating it');
      sheet = ss.insertSheet(SHEET_NAME);
    }
    Logger.log('testSheetWrite: sheet found: ' + sheet.getName());

    // Add headers if the sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      Logger.log('testSheetWrite: header row written');
    }

    // Write a clearly labelled test row
    var testTimestamp = new Date().toISOString();
    sheet.appendRow([
      testTimestamp,
      '=== TEST ROW ===',
      '9999999999',
      'Spicy Banana Chips',
      'This is a diagnostic test row — delete after confirming.'
    ]);

    Logger.log('TEST ROW WRITTEN SUCCESSFULLY at ' + testTimestamp);
    Logger.log('Open your sheet and verify the row, then delete it before going live.');

  } catch (err) {
    Logger.log('testSheetWrite ERROR: ' + err.message);
    Logger.log('Stack: ' + err.stack);
    throw err; // Surface the error in the Executions panel
  }
}

// ── GET handler ───────────────────────────────────────────────────────────────

function doGet() {
  // Respond to accidental GET requests with a plain message.
  // If this returns a Google sign-in page instead of JSON, the deployment
  // "Who has access" is NOT set to "Anyone" — fix the deployment, not the code.
  return jsonResponse({ status: 'error', message: 'This endpoint only accepts POST requests.' });
}

// ── Main POST handler ─────────────────────────────────────────────────────────

function doPost(e) {
  try {
    // 1. Parse request body
    //    The frontend sends Content-Type: text/plain with a JSON-stringified body.
    //    e.postData.contents holds the raw string regardless of MIME type.
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
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Add header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    var timestamp = new Date().toISOString();

    sheet.appendRow([
      timestamp,
      fullName,
      phoneDigits,   // store digits-only for consistency
      product,
      message,
    ]);

    // 7. Success response
    return jsonResponse({
      status:  'success',
      message: 'Enquiry received. Thank you!',
    });

  } catch (err) {
    // Log server-side (visible in Apps Script → Executions)
    // but do not leak stack traces to the client.
    console.error('doPost error:', err.message);
    return jsonResponse({
      status:  'error',
      message: 'An internal error occurred. Please try again later.',
    });
  }
}
