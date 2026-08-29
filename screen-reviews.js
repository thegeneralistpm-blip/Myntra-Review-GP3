const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const appStoreFile = fs.existsSync(path.join(dataDir, 'myntra_app_store_global_last_2500.json'))
  ? 'myntra_app_store_global_last_2500.json'
  : (fs.existsSync(path.join(dataDir, 'myntra_app_store_global_last_2000.json'))
  ? 'myntra_app_store_global_last_2000.json'
  : (fs.existsSync(path.join(dataDir, 'myntra_app_store_last_1000.json')) ? 'myntra_app_store_last_1000.json' : 'myntra_app_store_last_500.json'));
const playStoreFile = fs.existsSync(path.join(dataDir, 'myntra_google_play_last_20000.json'))
  ? 'myntra_google_play_last_20000.json'
  : (fs.existsSync(path.join(dataDir, 'myntra_google_play_last_5000.json'))
  ? 'myntra_google_play_last_5000.json'
  : (fs.existsSync(path.join(dataDir, 'myntra_google_play_last_2000.json'))
  ? 'myntra_google_play_last_2000.json'
  : (fs.existsSync(path.join(dataDir, 'myntra_google_play_last_1000.json')) ? 'myntra_google_play_last_1000.json' : 'myntra_google_play_last_500.json')));
const appStore = JSON.parse(fs.readFileSync(path.join(dataDir, appStoreFile)));
const playStore = JSON.parse(fs.readFileSync(path.join(dataDir, playStoreFile)));
const redditPath = path.join(dataDir, 'myntra_reddit_discussions.json');
const reddit = fs.existsSync(redditPath) ? JSON.parse(fs.readFileSync(redditPath)) : [];
const externalPath = path.join(dataDir, 'myntra_external_discussions.json');
const external = fs.existsSync(externalPath) ? JSON.parse(fs.readFileSync(externalPath)) : [];
const aiPath = path.join(dataDir, 'ai_classifications.json');
const aiClassifications = fs.existsSync(aiPath) ? JSON.parse(fs.readFileSync(aiPath)) : {};

const themes = [
  { name: 'Wishlist Clutter & Organization', terms: ['wishlist', 'clutter', 'organize', 'forgot', 'folders', 'categories', 'find', 'hundreds', 'filter wishlist', 'add to wishlist', 'wishlisted', 'discover', 'browse', 'recommendation', 'recommendations', 'suggestion', 'suggestions', 'homepage', 'home page', 'navigation', 'interface', 'app layout', 'scrolling', 'size chart', 'filter', 'filters'] },
  { name: 'Size & Stock Availability', terms: ['out of stock', 'sold out', 'restock', 'size unavailable', 'notify me', 'back in stock', 'stock'] },
  { name: 'Fit & Fabric Anxiety', terms: ['size fit', 'fitting', 'tight', 'loose', 'fabric', 'material', 'returns', 'exchanges', 'authenticity', 'exchange', 'return', 'refund', 'genuine', 'original', 'fake', 'sizing', 'quality', 'authentic'] },
  { name: 'Delivery & Shipping Friction', terms: ['shipping fee', 'delivery charge', 'slow delivery', 'delivery date', 'postcode', 'charges', 'shipping charge', 'delivery fee'] },
  { name: 'Occasion & Styling Inspiration', terms: ['how to style', 'match', 'wear', 'outfit', 'pair with', 'lookbook', 'looks', 'styling', 'pair', 'matching'] }
];

function screen(review) {
  const text = `${review.title || ''} ${review.text || ''}`.toLowerCase();
  const hasTerm = term => new RegExp('(^|[^a-z])' + term.replace(/[.*+?^$()|[\]\\]/g, '\\$&') + '($|[^a-z])', 'i').test(text);
  const isDeliveryPersonSearch = /search\s+(him|her|driver|rider|delivery)/i.test(text);
  const matched = themes.filter(theme => {
    if (theme.name === 'Wishlist Clutter & Organization') {
      return theme.terms.some(hasTerm) || (hasTerm('search') && !isDeliveryPersonSearch);
    }
    return theme.terms.some(hasTerm);
  }).map(theme => theme.name);
  return {
    ...review,
    study_relevant: matched.length > 0,
    matched_themes: matched,
    screening_reason: matched.length ? `Matched: ${matched.join('; ')}` : 'No mention of wishlist clutter, size stock availability, fit fabric anxiety, delivery friction, or styling inspiration.'
  };
}

const records = [...appStore, ...playStore, ...reddit, ...external].map(review => {
  let mappedSource = review.source;
  if (review.source === 'Q-Commerce') mappedSource = 'Fashion Communities';
  else if (review.source === 'Forum / News') mappedSource = 'Shopping Communities';
  else if (review.source === 'Social') mappedSource = 'Social Media Conversations';
  else if (review.source === 'Product Review') mappedSource = 'Product Q&A';

  const base = screen({ ...review, source: mappedSource });
  const ai = aiClassifications[base.review_id];
  return ai ? { ...base, study_relevant: Boolean(ai.relevant), matched_themes: ai.themes || [], screening_reason: `AI (${ai.provider}): ${ai.reason || 'Classified review.'}`, ai } : base;
});
const relevant = records.filter(item => item.study_relevant);
const excluded = records.filter(item => !item.study_relevant);
const bySource = Object.fromEntries([...new Set(records.map(item => item.source))].map(source => [source, {
  downloaded: records.filter(item => item.source === source).length,
  in_scope: relevant.filter(item => item.source === source).length,
  excluded: excluded.filter(item => item.source === source).length
}]));
const report = {
  screened_at: new Date().toISOString(),
  total_downloaded: records.length,
  in_scope_for_category_discovery_analysis: relevant.length,
  excluded_from_themed_analysis: excluded.length,
  exclusion_policy: 'Excluded only from the category-discovery analysis when no theme keyword was present. Raw reviews are retained and remain visible.',
  source_breakdown: bySource,
  theme_definitions: themes.map(({ name, terms }) => ({ name, terms }))
};
fs.writeFileSync(path.join(dataDir, 'review_screening.json'), JSON.stringify(records, null, 2));
fs.writeFileSync(path.join(dataDir, 'screening_report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
