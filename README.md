# FinePrint — Chrome Extension (Prototype)

FinePrint scans digital contracts for risky clauses using client-side NLP heuristics, optional OCR (Tesseract.js), and local encrypted storage.

## Features (prototype)
- Extract visible text from the current page and run heuristic scans for common risky clauses (auto-renewal, arbitration, data sharing, liability waivers, etc.).
- Upload documents (text files or images). Image OCR requires adding Tesseract.js to `vendor/`.
- Encrypt and save analysis reports locally using a passphrase (PBKDF2 + AES-GCM).
- Optional: provide an OpenAI API key in Settings to enable server-side summarization (you control the key).

## How to install locally
1. Download the ZIP and extract.
2. (Optional) For OCR support, download `tesseract.min.js` and related files and place them into `vendor/` within the extension folder.
3. Open Chrome → Extensions → Developer mode → Load unpacked → select the extracted folder.
4. Click the FinePrint icon to use.

## Security & privacy notes
- This is a client-side prototype. By default nothing is sent to remote servers.
- If you enter an OpenAI API key, any text you explicitly submit for summarization will be sent to OpenAI.
- Encrypted reports are stored locally in Chrome storage and can only be decrypted with the passphrase you provide.

## Files
- `manifest.json` — Chrome extension manifest (v3)
- `popup.html` / `popup.js` — main UI
- `content.js` — extracts page text
- `analyzer.js` — heuristic clause scanner
- `crypto.js` — encryption helpers
- `options.html` / `options.js` — settings and saved reports viewer
- `icons/` — placeholder icons

## License
MIT. This is provided for educational and prototyping use only and is NOT legal advice.
