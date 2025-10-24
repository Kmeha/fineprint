const GEMINI_API_KEY = "AIzaSyDPFjvIlf9BTEkACSawlDkOhFZynA7sbTQ"; // 🔐 Replace with your actual Gemini API key

// Simple client-side heuristic scanner for risky clauses.
const Analyzer = (function(){
 const patterns = [
   {key:'auto_renew', title:'Auto-renewal / Cancellation difficulty', regex:/auto-?renew|auto.?renewal|renewal (period|term)|cannot cancel within/i},
   {key:'arbitration', title:'Mandatory arbitration / waiver of jury trial', regex:/arbitration|waive (?:your )?right to (trial|jury)|class action waiver|small claims court/i},
   {key:'data_sharing', title:'Data sharing / third-party transfer', regex:/share (?:your )?data|third[- ]party|sell.*data|transfer.*personal/i},
   {key:'liability_waiver', title:'Liability limitation / indemnity', regex:/limitation of liability|not liable|hold harmless|indemni/i},
   {key:'fees_penalties', title:'Hidden fees or charges', regex:/fee(s)? (?:may apply|charged|charged for)|penalt|late fee|termination fee/i},
   {key:'auto_charge', title:'Automatic charges / payment authorization', regex:/authorize.*charge|charge your card|billing.*automatically|recurring charge/i},
   {key:'governing_law', title:'Unfavorable governing law / jurisdiction', regex:/governing law|jurisdiction.*(state|country)|venue.*court/i},
   {key:'data_retention', title:'Long data retention', regex:/retain.*(data|information)|retain for|store.*indefinitely/i}
 ];


 // Add this mapping object after the patterns array
 const clauseMapping = {
   'auto_renew': {
     severity: 'caution',
     explanation: 'The contract continues unless you cancel in advance.',
     suggestion: 'Request explicit renewal approval instead of automatic.'
   },
   'arbitration': {
     severity: 'risky',
     explanation: 'You’re responsible for almost any problem, even if it’s not your fault.',
     suggestion: 'Negotiate to limit liability only to your own mistakes.'
   },
   'data_sharing': {
     severity: 'caution',
     explanation: 'Your data may be shared or sold to third parties.',
     suggestion: 'Ask for opt-out options or data deletion rights.'
   },
   'liability_waiver': {
     severity: 'risky',
     explanation: 'The designer agrees to hold the client harmless for any damages, including indirect losses.',
     suggestion: 'Negotiate to limit liability only to your own mistakes.'
   },
   'fees_penalties': {
     severity: 'caution',
     explanation: 'Hidden or late fees may apply unexpectedly.',
     suggestion: 'Clarify all fee structures upfront.'
   },
   'auto_charge': {
     severity: 'risky',
     explanation: 'They can cancel at any time without paying you.',
     suggestion: 'Ask for a cancellation fee or payment for completed work.'
   },
   // Add more mappings as needed for other patterns (e.g., safe ones below)
   'governing_law': { severity: 'safe', explanation: 'Standard jurisdiction clause.', suggestion: '' },
   'data_retention': { severity: 'safe', explanation: 'Data is retained only as needed.', suggestion: '' }
 };


 // Add this mock safe clauses array right after clauseMapping
 const safePatterns = [
   { title: 'Payment Timeline', excerpt: 'The client shall release payment within 14 days of project completion.', explanation: 'You’ll be paid within 2 weeks after finishing work.', severity: 'safe', suggestion: '✔️ This is standard and fair.' },
   { title: 'Copyright Ownership', excerpt: 'All rights to the final design transfer to the client upon full payment.', explanation: 'Once you’re paid, the client owns the design.', severity: 'safe', suggestion: '✔️ Normal for freelance agreements.' }
 ];


 function excerptAround(text, idx, radius=120){
   const start = Math.max(0, idx - radius);
   const end = Math.min(text.length, idx + radius);
   return text.slice(start, end).replace(/\s+/g,' ');
 }


 // New: Clean up messy excerpts (strip HTML, decode entities, trim junk)
 function cleanExcerpt(rawExcerpt) {
   let clean = rawExcerpt
     // Decode common Unicode/HTML entities
     .replace(/\\u003c/g, '<').replace(/\\u003e/g, '>')
     .replace(/\\u0026/g, '&').replace(/\\u0022/g, '"')
     // Strip HTML tags
     .replace(/<[^>]*>/g, '')
     // Remove JSON-like keys (e.g., "object4":, "title":)
     .replace(/"[^"]*":\s*/g, '')
     // Remove extra quotes and escapes (FIXED: Proper regex)
     .replace(/["\\]/g, '')
     // Trim non-letter starts/ends and normalize spaces
     .replace(/^[^\w\s]*|[^\w\s]*$/g, '').trim()
     .replace(/\s+/g, ' ');


   // Limit to 100 chars for readability, add ellipsis
   if (clean.length > 100) {
     clean = clean.substring(0, 100) + '...';
   }


   // If still empty or junk, use a fallback
   if (clean.length < 10 || !/[a-zA-Z]{5}/.test(clean)) {
     clean = 'Clause detected in contract (details obscured).';
   }


   return clean;
 }


 function scan(text){
  // 🧽 Clean the extracted text before analysis
  let cleanedText = text
    .replace(/\s+/g, ' ')           // collapse multiple spaces/newlines
    .replace(/[^\x20-\x7E]/g, '')   // remove hidden / non-ASCII characters
    .replace(/ﬁ/g, 'fi')            // fix ligatures common in PDFs
    .replace(/ﬂ/g, 'fl')
    .trim();

  const hits = [];
  const lower = cleanedText.toLowerCase(); // For matching



   // Process pattern hits
   patterns.forEach(p => {
     let m;
     const re = new RegExp(p.regex, 'gi');
     const keyHits = []; // Temp array for this key to dedup later
    while((m = re.exec(cleanedText)) !== null){
  const idx = m.index;
  let ex = excerptAround(cleanedText, idx);

       ex = cleanExcerpt(ex); // Clean it
       const mapping = clauseMapping[p.key] || { severity: 'caution', explanation: 'Potential risk detected.', suggestion: 'Review this clause carefully.' };
       keyHits.push({
         key: p.key,
         title: p.title,
         excerpt: ex,
         score: Math.round(100 - Math.min(80, ex.length/5)),
         severity: mapping.severity,
         explanation: mapping.explanation,
         suggestion: mapping.suggestion
       });
     }
     // Pick the best (highest score) for this key to avoid duplicates
     if (keyHits.length > 0) {
       keyHits.sort((a, b) => b.score - a.score);
       hits.push(keyHits[0]); // Only keep the top one per key
     }
   });
  
   // Add mock safe clauses (for demo; in real use, detect them via patterns)
   safePatterns.forEach(safe => {
if (cleanedText.toLowerCase().includes(safe.excerpt.toLowerCase().slice(0, 20))) {
       hits.push({ ...safe, score: 90 });
     }
   });


   // Final dedup across all (now minimal due to per-key logic)
   const dedup = [];
   const seen = new Set();
   hits.forEach(h => {
     const k = h.key || h.title; // Use key or title
     if (!seen.has(k)) {
       seen.add(k);
       dedup.push(h);
     }
   });
  
   // Sort by score desc
   dedup.sort((a,b) => b.score - a.score);
   return dedup;
 }


 return {scan};
 
})();
