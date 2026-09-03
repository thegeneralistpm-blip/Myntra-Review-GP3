# Myntra Growth Project: Wishlist-to-Purchase Conversion Engine

## Executive Problem Statement & Assignment Brief

### Company & Role
* **Company:** Myntra (Fashion & Lifestyle E-Commerce, India)
* **Role:** Product Manager, Growth Team
* **Submission Deadline:** 5 September, 2026 at 3:59:00 PM IST

---

## 1. Context & Strategic Objective

Millions of users browse fashion products, save items they like, and add products to their wishlists. A wishlist represents a particularly interesting signal: **the user has expressed explicit interest in an item but has stopped short of purchasing it.**

Over time, users accumulate dozens—or even hundreds—of wishlisted products, while only a small proportion eventually translate into purchases.

### Strategic Goal / North Star Metric:
> **Increase the percentage of users who purchase at least one item from their wishlist within 30 days of adding it.**

### Key Strategic Value:
Improving wishlist-to-purchase conversion will:
1. Increase purchase frequency.
2. Improve monetization from existing users.
3. Help the company extract greater value from high-intent demand already present on the platform.

### Critical Constraint:
> ⚠️ **You are not being given the underlying user problem. Your task is to discover it. And for the solution, the constraint is that you CANNOT offer monetary incentives to the users (no discounts, coupons, price cuts, promotions, or cashback).**

---

## 2. Project Structure & Deliverable Parts

### Part 1: Build an AI-Powered Discovery Engine
Build an AI-powered system that analyzes user feedback at scale across:
* App Store reviews
* Play Store reviews
* Reddit discussions (e.g., `r/myntra`, fashion communities)
* Fashion and shopping communities
* Social media conversations
* YouTube comments
* Product reviews and Q&A

**Key questions the engine must answer:**
1. Why do users add fashion products to their wishlist?
2. What prevents wishlisted products from eventually being purchased?
3. What uncertainties remain after users have identified a product they like?
4. What causes users to postpone a purchase?
5. How do users compare multiple shortlisted products?
6. What information do users seek outside Myntra before purchasing?
7. What role do fit, size, styling, price, reviews, occasion, and social validation play?
8. When do users use the wishlist as genuine purchase intent versus simply as a bookmarking mechanism?
9. How do these behaviors differ across user segments?
10. What unmet needs emerge consistently across user conversations?

*Note: The engine must go beyond summarizing reviews or performing basic sentiment analysis—it must quantify and compare opportunity areas influencing the business metric.*

---

### Part 2: Break Down the Business Metric
Break down:
$$\text{Wishlist} \longrightarrow \text{Purchase Conversion (30 Days)}$$
into relevant product outcomes and user behaviors that influence it.
* Determine what user behavior must change for the metric to improve.
* Use metric decomposition alongside the AI Discovery Engine output to identify the highest-potential opportunity.

---

### Part 3: Validate the Opportunity Through User Research
AI-generated insights are a starting point.
* Choose a target user segment and opportunity area based on the initial analysis.
* Conduct **5–6 user interviews** with respondents belonging to the target segment.
* **Key interview inquiries:**
  * Why they saved each item.
  * Whether they still intend to purchase it.
  * What is stopping them.
  * What would make them purchase it.
  * What information they still need.
  * Whether they are considering alternatives.
  * What happens outside the app before they decide.
  * How they currently overcome uncertainty.

---

### Part 4: Define the Problem
Clearly articulate:
1. Target user segment.
2. Product outcome intended to influence.
3. Root cause preventing the desired behavior.
4. Existing user workarounds.
5. Why solving the problem creates meaningful user value.
6. Why solving the problem makes business sense.

**Demonstrate evolved thinking across:**
$$\text{Business Metric} \longrightarrow \text{Product Outcomes} \longrightarrow \text{AI Discovery} \longrightarrow \text{Primary Research} \longrightarrow \text{Problem Definition}$$

---

### Part 5: Build a Functional MVP
Design, build, and deploy a functional MVP addressing the identified root cause.
* May take the form of: a feature within Myntra, an AI-powered workflow, an AI agent, or a standalone shopping experience.
* **Requirement:** Must be deployed to production so it can be interacted with and tested publicly.

---

### Part 6: Define Success Metrics
* **Business Metric:** 30-day Wishlist-to-Purchase Conversion %.
* **Leading Indicators:** Specific user behaviors signaling intent.
* **Guardrail Metrics:** Metrics ensuring solutions don't harm user experience (e.g., return rates, un-wishlist rates).
* Include clear mathematical definitions and strategic rationales for each chosen metric.

---

### Part 7: Risks & Mitigation Steps
* Analyze why the proposed solution might fail.
* Identify the most critical risks (behavioral, technical, operational) and specify concrete mitigation plans.

---

## 3. Required Submission Deliverables

1. **`[Link]` AI Discovery Engine:**
   * Public link where the workflow/dashboard can be tested.
   * 1-slider within final deck explaining its architecture and findings.
2. **`[PDF]` 10-Slide Deck:**
   * Slide 1: Discovery Engine & VoC Findings
   * Slide 2: Business Metric Decomposition
   * Slide 3: Target User Segmentation
   * Slide 4: Primary Research (5–6 User Interviews)
   * Slide 5: Problem Definition & Root Cause
   * Slide 6: Solution Rationale (Zero-Discount Interventions)
   * Slide 7: Functional MVP & User Flow
   * Slide 8: Interactive Wireframes / Prototype
   * Slide 9: Success Metrics (Leading, Lagging, Guardrails)
   * Slide 10: Risks, Mitigations & GTM Rollout Plan
3. **`[Link]` Deployed MVP:**
   * Publicly accessible prototype, workflow, or interactive feature that evaluators can test live.

---

## 4. Deck Guidelines & Evaluation Rules

* **Anonymity Rule:** The name of the Fellow must **NOT** be present anywhere in the slide deck.
* **Length:** Exactly **10 slides maximum** (including title slide if used).
* **Slide Titles:** Must state the key message/takeaway succinctly (e.g., do NOT title a slide "Problem"; write the specific problem thesis).
* **Accessibility:** High text contrast, readable background colors, and color-blind friendly palettes.
* **Supporting Artifacts:** Must hyperlink to accessible supporting artifacts (surveys, transcripts, dashboards, prototypes).
* **File Constraints:** Maximum file size $< 40\text{ MB}$.
* **Minimum Font Sizes:**
  * Minimum font size **14** for Google Slides / PowerPoint.
  * Minimum font size **26** for Figma (1920×1080 frame).
  * Minimum font size **22** for Canva (1920×1080 frame).
* **Deadline:** 5 September, 2026 at 3:59:00 PM IST (Strict deadline; no late submissions accepted).
