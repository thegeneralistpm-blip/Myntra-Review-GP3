const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, 'data');
const records = JSON.parse(fs.readFileSync(path.join(dataDir, 'review_screening.json')));
const report = JSON.parse(fs.readFileSync(path.join(dataDir, 'screening_report.json')));
const themes = report.theme_definitions.map(t => ({ name: t.name, count: records.filter(r => (r.matched_themes || []).includes(t.name)).length }));
const groupedSourceCounts = Object.entries(report.source_breakdown).reduce((groups, [source, value]) => {
  const displaySource = source.startsWith('Apple App Store')
    ? 'Apple App Store (IN)' : source;
  groups[displaySource] = (groups[displaySource] || 0) + value.downloaded;
  return groups;
}, {});
const sourceCounts = Object.entries(groupedSourceCounts).map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count);
const sourceCoverage = sourceCounts.map(item => `${item.source}: ${item.count.toLocaleString()}`).join(' · ');
const summary = { report, themes, sourceCounts, sourceCoverage, appStore: records.filter(r => r.source.startsWith('Apple')).length, play: records.filter(r => r.source.startsWith('Google')).length };
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');

const style = `<style>:root{--y:#ff3f6c;--ink:#1f1f1b;--muted:#6d6d66;--bg:#f8f8f4;--card:#fff;--line:#e8e7df;--dark:#20242e}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.wrap{max-width:1180px;margin:auto;padding:24px 20px}.top{background:linear-gradient(135deg,#ff3f6c,#e01e52);color:#fff;padding:20px 22px;border-radius:16px;display:flex;justify-content:space-between;gap:15px;align-items:center;box-shadow:0 6px 20px rgba(255,63,108,0.2)}.brand{font-weight:900;font-size:26px;letter-spacing:-1px}.brand small{font-size:11px;text-transform:uppercase;letter-spacing:.07em;margin-left:9px;color:#fff;background:rgba(255,255,255,0.2);padding:3px 7px;border-radius:99px}.top p{margin:4px 0 0;font-size:12px;color:#fce4e9}.nav{display:flex;gap:6px;flex-wrap:wrap;margin:16px 0}.nav a{color:var(--ink);text-decoration:none;padding:8px 12px;border-radius:99px;font-size:12px;font-weight:750;background:#fff;border:1px solid var(--line)}.nav a.active,.nav a:hover{background:var(--dark);color:#fff;border-color:var(--dark)}.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px;box-shadow:0 2px 6px rgba(0,0,0,0.02)}.grid{display:grid;gap:14px}.stats{grid-template-columns:repeat(4,1fr)}.two{grid-template-columns:1.1fr .9fr;margin-top:14px}h1{font-size:25px;margin:16px 0 5px;letter-spacing:-.6px}h2{font-size:16px;margin:0}p{line-height:1.55;color:var(--muted)}.label{font-size:12px;color:var(--muted)}.metric{font-size:29px;font-weight:850;margin:7px 0 2px}.hint{font-size:12px;color:var(--muted)}.head{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:13px}.tag{font-size:11px;background:#fff0f5;color:#ff3f6c;border-radius:99px;padding:4px 8px;font-weight:750}.barrow{display:grid;grid-template-columns:175px 1fr 40px;gap:9px;align-items:center;margin:11px 0;font-size:13px}.bar{height:10px;background:#f0f0eb;border-radius:99px;overflow:hidden}.bar i{display:block;height:100%;background:var(--y);border-radius:99px}.priority{display:grid;grid-template-columns:27px 1fr auto;gap:10px;padding:12px 0;border-bottom:1px solid var(--line)}.priority:last-child{border:0}.rank{width:26px;height:26px;background:var(--y);color:#fff;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:850}.priority strong{font-size:13px;display:block;margin-bottom:3px}.priority p{font-size:12px;margin:0}.table-wrap{overflow:auto}.table{width:100%;border-collapse:collapse;font-size:13px}.table th{text-align:left;color:var(--muted);padding:9px}.table td{padding:11px 9px;border-top:1px solid var(--line);vertical-align:top}.text{min-width:350px;max-width:600px;line-height:1.45}.filters{display:flex;gap:10px;flex-wrap:wrap;margin:15px 0}.filters input,.filters select,textarea{font:inherit;padding:9px;border:1px solid var(--line);border-radius:8px;background:#fff}.filters input{min-width:230px}.yes{color:#087852;font-weight:800}.no{color:#9b5d14;font-weight:800}.pill{display:inline-block;background:#fff0f5;color:#ff3f6c;padding:3px 6px;border-radius:99px;font-size:11px;margin:2px}.copilot{background:var(--dark);padding:22px;border-radius:14px;color:#fff}.copilot p{color:#d4d4cb}.copilot textarea{width:100%;min-height:85px;margin:12px 0;border:1px solid #434958;border-radius:10px;padding:12px;background:#171a22;color:#fff;font:inherit}.copilot textarea:focus{border-color:#ff3f6c}.button{background:var(--y);border:0;border-radius:8px;padding:10px 14px;color:#fff;font-weight:850;cursor:pointer}.answer{margin-top:14px;background:#171a22;border:1px solid #363c4c;border-radius:10px;padding:16px;font-size:13px;line-height:1.6;max-height:550px;overflow-y:auto}.answer:empty{display:none}.quick{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}.quick button{background:#292f3d;color:#e1e4ea;border:1px solid #434958;border-radius:99px;padding:7px 11px;font-size:11px;font-weight:600;cursor:pointer}.quick button:hover{background:#ff3f6c;color:#fff;border-color:#ff3f6c}.badge-llm{display:inline-block;padding:3px 8px;border-radius:99px;font-size:11px;font-weight:800;background:rgba(255,63,108,0.2);color:#ff3f6c;margin-bottom:8px}.footer{margin-top:24px;padding:16px 0;color:var(--muted);font-size:11px;border-top:1px solid var(--line)}@media(max-width:720px){.stats,.two{grid-template-columns:1fr 1fr}.two>.card{grid-column:span 2}.barrow{grid-template-columns:115px 1fr 34px}}@media(max-width:460px){.wrap{padding:14px}.stats{grid-template-columns:1fr 1fr}.top{display:block}.text{min-width:250px}}</style>`;
const nav = active => `<header class="top"><div><div class="brand">Myntra <small>Wishlist intelligence</small></div><p>Wishlist Conversion & Discovery Engine · Voice-of-customer research</p></div><span class="tag" style="background:#fff;color:#ff3f6c;font-weight:800">⚡ 120B LLM Active</span></header><nav class="nav"><a class="${active==='overview'?'active':''}" href="index.html">Overview</a><a class="${active==='lens'?'active':''}" href="discovery-lens.html">Wishlist Friction Lens</a><a class="${active==='priority'?'active':''}" href="priority-radar.html">Priority Radar</a><a class="${active==='evidence'?'active':''}" href="evidence-library.html">Evidence Library</a><a class="${active==='copilot'?'active':''}" href="copilot.html">Discovery Copilot (LLM)</a></nav>`;
const footer = `<footer class="footer"><span>Myntra Wishlist Conversion Intelligence · Public feedback is directional evidence.</span><span><a href="review-library.html" style="color:#ff3f6c;font-weight:700">Open Full Review Library →</a></span></footer>`;
const page = (active, title, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Myntra Wishlist Conversion Intelligence</title>${style}</head><body><main class="wrap">${nav(active)}<h1>${title}</h1>${body}${footer}</main></body></html>`;

fs.writeFileSync(path.join(__dirname, 'discovery-lens.html'), page('lens', 'Wishlist Friction Lens', `<p>Current theme volumes from the screened review corpus (${report.total_downloaded.toLocaleString()} reviews).</p><section class="card" style="margin-top:15px"><div class="head"><h2>What wishlist users are signalling</h2><span class="tag">Evidence count</span></div><div id="bars"></div></section><section class="grid two"><article class="card"><h2>Coverage by source</h2><p style="margin-top:9px">${summary.sourceCoverage}</p></article><article class="card"><h2>Interpretation note</h2><p style="margin-top:9px">Use India-specific channels (Play Store reviews, Reddit r/myntra) for local sizing/delivery insights. App Store reviews provide helpful global comparisons.</p></article></section><script>const d=${json(themes)},m=Math.max(...d.map(x=>x.count),1);document.getElementById('bars').innerHTML=d.sort((a,b)=>b.count-a.count).map(x=>'<div class="barrow"><span>'+x.name+'</span><div class="bar"><i style="width:'+(x.count/m*100)+'%"></i></div><b>'+x.count.toLocaleString()+'</b></div>').join('')</script>`));

const ideas = {
  'Size & Stock Availability': ['Proactive Restock & Sizing Alerts', 'Alert users immediately when a wishlisted item is restocked in their size, or suggest identical in-stock alternatives.'],
  'Fit & Fabric Anxiety': ['High-Confidence Fit Reviews', 'Display size-fit metrics (e.g. "82% say true to size") and user-uploaded outfit pictures directly on wishlist cards.'],
  'Wishlist Clutter & Organization': ['Smart Wishlist Folders', 'Group wishlisted items automatically by occasion (e.g. "Workwear", "Vacation") or category to make retrieval easy.'],
  'Delivery & Shipping Friction': ['Friction-Free Delivery Bundling', 'Prompt users to add wishlisted items to checkout to cross the free-shipping threshold.'],
  'Occasion & Styling Inspiration': ['Personalized Outfit Lookbooks', 'Suggest outfit pairings matching wishlisted items with previously purchased clothing.']
};

fs.writeFileSync(path.join(__dirname, 'priority-radar.html'), page('priority', 'PM Priority Radar', `<p>Provisional product opportunities ranked by wishlist theme evidence volume (excluding monetary incentives). Validate next.</p><section class="card" style="margin-top:15px"><div class="head"><h2>Opportunity queue</h2><span class="tag">Not a final score</span></div>${[...themes].sort((a,b)=>b.count-a.count).map((x,i)=>`<div class="priority"><span class="rank">${i+1}</span><div><strong>${ideas[x.name][0]}</strong><p>${ideas[x.name][1]}</p></div><span class="hint">${x.count.toLocaleString()} signals</span></div>`).join('')}</section>`));

const safeRecords = json(records);
fs.writeFileSync(path.join(__dirname, 'evidence-library.html'), page('evidence', 'Evidence Library', `<p>All downloaded reviews are retained, source-labelled, and filterable. “Excluded” means excluded from the current study-theme screen, not deleted.</p><div class="filters"><input id="q" placeholder="Search review text"><select id="status"><option value="all">All review status</option><option value="yes">In scope</option><option value="no">Excluded</option></select><select id="theme"><option value="all">All screening reasons</option>${themes.map(x=>`<option>${x.name}</option>`).join('')}</select></div><p class="hint" id="count"></p><section class="card table-wrap"><table class="table"><thead><tr><th>Review text</th><th>Source</th><th>Date</th><th>Status</th><th>Reason</th></tr></thead><tbody id="rows"></tbody></table></section><script>const r=${safeRecords},g=id=>document.getElementById(id),e=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));function draw(){const q=g('q').value.toLowerCase(),s=g('status').value,t=g('theme').value,a=r.filter(x=>(s==='all'||(s==='yes')===x.study_relevant)&&(t==='all'||x.matched_themes.includes(t))&&((x.title+' '+x.text).toLowerCase().includes(q)));g('count').textContent='Showing '+a.length+' of '+r.length+' reviews.';g('rows').innerHTML=a.map(x=>'<tr><td class="text">'+e((x.title?x.title+' — ':'')+x.text)+'</td><td><a href="'+e(x.url)+'" target="_blank">'+e(x.source)+'</a></td><td>'+e(new Date(x.date).toLocaleDateString())+'</td><td class="'+(x.study_relevant?'yes':'no')+'">'+(x.study_relevant?'In scope':'Excluded')+'</td><td>'+e(x.matched_themes.join(', ')||x.screening_reason)+'</td></tr>').join('')}['q','status','theme'].forEach(id=>g(id).addEventListener(id==='q'?'input':'change',draw));draw()</script>`));

// Enhanced Copilot with 10 Rubric Questions and Dual-Mode Live LLM
fs.writeFileSync(path.join(__dirname, 'copilot.html'), page('copilot', 'Discovery Copilot (120B LLM)', `<section class="copilot"><div class="badge-llm">⚡ Real-Time LLM Intelligence · Grounded in 20,703 Reviews</div><h2>Ask the Wishlist Evidence a PM Question</h2><p>Ask questions about user hesitation, sizing anxiety, clutter, or non-monetary interventions. The 120B model synthesizes answers directly from customer feedback.</p><div class="quick"><button data-q="Why do users add items to wishlist?">1. Why users wishlist items</button><button data-q="What blocks wishlist checkout?">2. What blocks checkout</button><button data-q="What uncertainties remain after saving?">3. Residual uncertainties</button><button data-q="What causes purchase postponement?">4. Purchase postponement</button><button data-q="How do users compare shortlisted products?">5. Product comparison</button><button data-q="What info do users seek outside Myntra?">6. External research channels</button><button data-q="Role of fit, size, styling, & reviews?">7. Fit & styling role</button><button data-q="Genuine intent vs bookmarking?">8. Intent vs bookmarking</button><button data-q="Differences across user segments?">9. User segment analysis</button><button data-q="Unmet non-monetary needs?">10. Unmet customer needs</button></div><textarea id="question" placeholder="Ask any PM research question (e.g. Why do users hesitate on Size M? How does clutter affect conversion?)..."></textarea><div style="display:flex;gap:10px;align-items:center"><button class="button" id="ask">⚡ Ask Growth LLM Copilot</button><span id="loading" style="display:none;font-size:12px;color:#ff3f6c;font-weight:700">🤖 Consulting 120B Growth LLM on 20,703 reviews...</span></div><div class="answer" id="answer"></div></section><script>
const r=${safeRecords},g=id=>document.getElementById(id),esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));

function formatMarkdown(md){
  return md.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/^### (.*$)/gim,'<h4 style="color:#ff3f6c;margin:14px 0 6px;font-size:14px;border-bottom:1px solid #363c4c;padding-bottom:4px">$1</h4>')
    .replace(/^## (.*$)/gim,'<h3 style="color:#fff;margin:18px 0 8px;font-size:16px">$1</h3>')
    .replace(/^# (.*$)/gim,'<h2 style="color:#fff;margin:20px 0 10px;font-size:18px">$1</h2>')
    .replace(/\\*\\*(.*?)\\*\\*/g,'<strong style="color:#fff">$1</strong>')
    .replace(/\\*(.*?)\\*/g,'<em>$1</em>')
    .replace(/^\\> (.*$)/gim,'<blockquote style="border-left:3px solid #ff3f6c;padding-left:12px;margin:10px 0;color:#fce4e9;font-style:italic">$1</blockquote>')
    .replace(/^\\s*[-•]\\s+(.*)$/gim,'<li style="margin:4px 0">$1</li>')
    .replace(/\\n\\n/g,'<p style="margin:8px 0"></p>')
    .replace(/\\n/g,'<br>');
}

async function ask(){
  const q = (g('question').value || '').trim();
  if(!q) return;
  const ansDiv = g('answer');
  const loading = g('loading');
  loading.style.display = 'inline';
  ansDiv.style.display = 'block';
  ansDiv.innerHTML = '<em>Consulting Myntra Growth LLM across 20,703 customer reviews...</em>';

  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q })
    });
    if (res.ok) {
      const data = await res.json();
      loading.style.display = 'none';
      ansDiv.innerHTML = '<div style="margin-bottom:8px"><span class="badge-llm">⚡ Live LLM Analysis (' + esc(data.model || '120B Model') + ')</span></div>' + formatMarkdown(data.answer);
      return;
    }
  } catch(e) {
    console.log('Live endpoint unavailable, falling back...', e);
  }

  // Fallback for static GitHub Pages
  loading.style.display = 'none';
  const stop = new Set(['what','which','where','when','why','does','they','them','that','this','from','with','have','customers','customer','trying','prevent','prevents','myntra','about','their','there','would','could','should','users','user']);
  const words = q.toLowerCase().split(/[^a-z0-9]+/).filter(x => x.length > 3 && !stop.has(x));
  const m = r.filter(x => words.some(w => (x.title + ' ' + x.text + ' ' + (x.matched_themes||[]).join(' ')).toLowerCase().includes(w))).slice(0, 5);
  ansDiv.innerHTML = '<div style="margin-bottom:8px"><span class="badge-llm">🔍 Review Retrieval (' + m.length + ' Matches Found)</span></div><ul style="padding-left:18px">' + m.slice(0, 3).map(x => '<li style="margin:8px 0">“' + esc((x.title ? x.title + ' — ' : '') + x.text).slice(0, 240) + '…” <a style="color:#ff3f6c;font-weight:700" href="' + esc(x.url) + '" target="_blank">Source (' + esc(x.source) + ')</a></li>').join('') + '</ul>';
}

g('ask').onclick = ask;
document.querySelectorAll('[data-q]').forEach(x => x.onclick = e => {
  e.preventDefault();
  g('question').value = x.dataset.q;
  ask();
});
</script>`));

console.log('Built Myntra wishlist multi-page dashboard suite with LLM Copilot.');
