// Simple client-side heuristic scanner for risky clauses.
const Analyzer = (function(){
  const patterns = [
    {key:'auto_renew', title:'Auto-renewal / Cancellation difficulty', regex:/auto-?renew|auto.?renewal|renewal (period|term)|cannot cancel within/i, examples:['auto-renew','renewal period']},
    {key:'arbitration', title:'Mandatory arbitration / waiver of jury trial', regex:/arbitration|waive (?:your )?right to (trial|jury)|class action waiver|small claims court/i},
    {key:'data_sharing', title:'Data sharing / third-party transfer', regex:/share (?:your )?data|third[- ]party|sell.*data|transfer.*personal/i},
    {key:'liability_waiver', title:'Liability limitation / indemnity', regex:/limitation of liability|not liable|hold harmless|indemni/i},
    {key:'fees_penalties', title:'Hidden fees or charges', regex:/fee(s)? (?:may apply|charged|charged for)|penalt|late fee|termination fee/i},
    {key:'auto_charge', title:'Automatic charges / payment authorization', regex:/authorize.*charge|charge your card|billing.*automatically|recurring charge/i},
    {key:'governing_law', title:'Unfavorable governing law / jurisdiction', regex:/governing law|jurisdiction.*(state|country)|venue.*court/i},
    {key:'data_retention', title:'Long data retention', regex:/retain.*(data|information)|retain for|store.*indefinitely/i}
  ];

  function excerptAround(text, idx, radius=120){
    const start = Math.max(0, idx - radius);
    const end = Math.min(text.length, idx + radius);
    return text.slice(start, end).replace(/\s+/g,' ');
  }

  function scan(text){
    const hits = [];
    const lower = text;
    patterns.forEach(p=>{
      let m;
      const re = new RegExp(p.regex, 'gi');
      while((m = re.exec(text)) !== null){
        const idx = m.index;
        const ex = excerptAround(text, idx);
        hits.push({key:p.key, title:p.title, excerpt: ex, score: Math.round(100 - Math.min(80, ex.length/5))});
      }
    });
    // Deduplicate by title+excerpt
    const dedup = [];
    const seen = new Set();
    hits.forEach(h=>{
      const k = h.title + '||' + h.excerpt.slice(0,80);
      if(!seen.has(k)){ seen.add(k); dedup.push(h); }
    });
    // Sort by score desc
    dedup.sort((a,b)=>b.score - a.score);
    return dedup;
  }

  return {scan};
})();
