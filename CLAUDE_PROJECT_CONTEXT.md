# Myntra Wishlist Conversion Engine — Project Context

## Purpose of this file

Use this document as the complete handoff context for another AI assistant. The project is a Product Management graduation project for Myntra.

Do not expose, request, commit, or reproduce any API keys. API credentials are kept only as GitHub repository secrets.

---

## 1. Project objective

**Company:** Myntra (fashion & lifestyle e-commerce, India)

**Strategic goal / North Star Metric:**

> Increase the percentage of users who purchase at least one item from their wishlist within 30 days of adding it.

**Key Constraint:** Cannot offer monetary incentives to the users (no discounts, coupons, price cuts, or monetary promotions).

The project investigates why users browse fashion products, wishlist them (expressing high interest), but stop short of purchasing them. It builds product-led opportunity hypotheses to improve wishlist-to-purchase conversion.

The Discovery Engine is a voice-of-customer research system. It turns public feedback into evidence-backed hypotheses for PM research. It does **not** prove causality or replace customer interviews.

---

## 2. Assignment requirements

The project was required to build an AI-powered wishlist conversion dashboard that analyses public feedback at scale from sources such as:

- App Store reviews
- Google Play reviews
- Reddit discussions (r/myntra)
- Fashion and shopping communities
- Social media conversations
- YouTube comments
- Product reviews and Q&A where relevant

It should help answer:

1. Why do users repeatedly add items to their wishlist but don't checkout?
2. What blocks wishlist-to-purchase conversion?
3. How do users navigate their wishlist today?
4. What role does wishlist clutter and forgetfulness play?
5. What information do users need before purchasing wishlisted items (e.g. sizing charts, fit reviews)?
6. What frustrations emerge repeatedly around sizing stock and delivery friction?
7. Which user segments are more likely to convert?
8. What unmet non-monetary needs emerge consistently across discussions?

Part 2 of the assignment requires 5–6 user interviews to validate the hypotheses discovered through public feedback.

---

## 3. Evidence corpus

The system processes source-labelled public feedback records from:
- Google Play (India storefront package: `com.myntra.android`)
- Apple App Store (India and global storefront app ID: `907394059`)
- External discussions (Reddit r/myntra, fashion/shopping communities, social conversations, YouTube comments, and product Q&A)

---

## 4. Main themes used by the conversion engine

1. **Size & Stock Availability**
   - stockout, size unavailable, restock notifications, and size-specific availability.

2. **Fit & Fabric Anxiety**
   - Sizing chart clarity, fabric/material quality doubts, return/exchange timeline speed, and brand authenticity.

3. **Wishlist Clutter & Organization**
   - Large/cluttered wishlists, forgotten saved items, and difficulty in filtering, searching, or organizing.

4. **Delivery & Shipping Friction**
   - High delivery fees, slow shipping timelines, and postcode restrictions at checkout.

5. **Occasion & Styling Inspiration**
   - Lack of ideas on how to style, wear, or pair wishlisted items with existing wardrobes.

---

## 5. Main PM insight and hypotheses

### Strongest opportunity hypothesis

> Users wishlist fashion products but stop short of buying because of size stockouts, size fit anxiety, delivery charge friction, wishlist clutter (forgetting items), or lack of styling ideas. Since we cannot offer discounts, we must build product-led trust, restock, styling, and organization tools.

### Supporting hypotheses

- **Confidence:** Fit/fabric anxiety holds back purchase. Displaying detailed sizing reviews and customer photos directly on wishlist cards builds buying confidence.
- **Stock:** Items sell out before decision. Sending real-time restock alerts for wishlisted sizes or suggesting identical in-stock alternatives converts high-intent users.
- **Organization:** Cluttered wishlists lead to forgotten items. Automatically organizing wishlists into smart folders (e.g. "Workwear", "Vacation") keeps items relevant.
- **Friction:** High shipping charges trigger abandonment. Suggesting wishlisted items as checkout add-ons to cross the free-shipping threshold converts users.
- **Inspiration:** Sourcing occasion styling ideas helps buy. Creating personalized lookbooks pairing wishlisted items with previous purchases inspires purchases.

---

## 6. Recommended target segment for interviews

**Myntra customers** who have accumulated at least 10 items in their wishlist over the last 30 days but have not converted any of them into a purchase.

---

## 7. Current dashboard experience

### Main merged dashboard

File: `index.html` (built via `build-merged-dashboard.js`)
It contains:
- Overview and Wishlist North Star context
- Wishlist Friction Lens charts
- Source coverage & rating mix charts
- Priority Radar / opportunity queue (Smart Folders, Sizing Alerts, Lookbooks)
- AI Copilot for wishlist PM evidence queries

### Separate Review Library

File: `review-library.html` (built via `build-review-library.js`)
It contains:
- Raw downloaded records
- Multi-dimensional filters (source, status, screening reason, text search)
- Wishlist question box with excerpt retrieval

---

## 8. Presentation guidance

Use Myntra-inspired colors:

- Background: `#FBFBFC`
- Heading: `#20201C`
- Body text: `#6d6d66`
- Primary Pink/Magenta accent: `#FF3F6C`
- Opportunity/positive: `#087852`
- Barrier/risk: `#F28C28`
- Dark footer/emphasis: `#29303E`

---

## 9. Important project files

| File | Purpose |
|---|---|
| `server.js` | Simple Node static server for local/production serving |
| `package.json` | Project scripts and metadata |
| `screen-reviews.js` | Keyword screening and source merge |
| `ai-classify-reviews.js` | Gemini/Groq LLM classification |
| `build-merged-dashboard.js` | Builds main merged wishlist dashboard |
| `build-review-library.js` | Builds Review Library |
| `build-myntra-suite.js` | Builds supporting multi-page dashboard |
