# Part 2: Business Metric Decomposition Flow Diagram & Analysis

**Document Metadata:**
* **Company:** Myntra (Fashion & Lifestyle E-Commerce, India)
* **North Star Target:** 30-Day Wishlist Conversion Rate (+350 bps lift / 12.0% → 15.5%)
* **Strategic Constraint:** 100% Zero Monetary Incentives (No discounts, coupons, or cashback)

---

## 1. Visual Flow Diagram

![Part 2 Business Metric Decomposition Flow Diagram](c:/Users/DELL/Downloads/gradp2-main/gradp2-main/myntra_part2_flow_diagram.jpg)

```
                                NORTH STAR BUSINESS METRIC
                   30-Day Wishlist-to-Purchase Conversion Rate (+350 bps)
                                            │
         ┌──────────────────────────────────┼──────────────────────────────────┐
         ▼                                  ▼                                  ▼
[STAGE 1: WISHILIST REVISIT]    [STAGE 2: WISHLIST TO BAG]       [STAGE 3: CHECKOUT]
  P(Stage 1: Revisit)             P(Stage 2 | Stage 1)             P(Stage 3 | Stage 2)
         │                                  │                                  │
         ▼                                  ▼                                  ▼
   USER BEHAVIOR:                    USER BEHAVIOR:                    USER BEHAVIOR:
Retrieving items saved          Commitment to purchase            Final checkout completion
    2-3 weeks ago                   size & product                     at payment page
         │                                  │                                  │
         ▼                                  ▼                                  ▼
 ⚠️ FRICTION SIGNAL:               ⚠️ FRICTION SIGNAL:                ⚠️ FRICTION SIGNAL:
Wishlist Clutter (7.2%)           Fit Anxiety (89.8%!)              Delivery Fees (3.6%)
181 Customer Signals              2,252 Customer Signals             91 Customer Signals
         │                                  │                                  │
         ▼                                  ▼                                  ▼
  PRODUCT OUTCOME:                 PRODUCT OUTCOME:                  PRODUCT OUTCOME:
Smart Occasion Folders            FitConfidence 88%                  Free Delivery Bundler
 & Size S Filter                  & Buyer Photos                     & 1-Click Move-to-Bag
                                  ⭐ (HIGHEST LEVERAGE)
```

---

## 2. Mathematical Breakdown & User Behavior Levers

$$\text{30-Day Conversion} = P(\text{Stage 1: Revisit}) \times P(\text{Stage 2: Wishlist} \to \text{Bag} \mid \text{Revisit}) \times P(\text{Stage 3: Checkout} \mid \text{Bag})$$

### 📍 Stage 1: Wishlist Revisit Rate ($P(\text{Stage 1: Revisit})$)
* **User Behavior**: Shoppers save 35–120+ items while scrolling. Over time, the wishlist becomes a cluttered feed where items get buried and forgotten.
* **Customer Friction Signal**: **181 Signals (7.2% of friction)** under *Wishlist Clutter & Organization*.
* **Product Outcome**: **Smart Occasion Folders** (*"Workwear"*, *"Festive"*, *"College"*), reducing retrieval time from 45 seconds to $< 5$ seconds.

---

### 📍 Stage 2: Wishlist-to-Bag Transfer Rate ($P(\text{Stage 2: Wishlist} \to \text{Bag} \mid \text{Revisit})$) — ⭐ HIGHEST LEVERAGE
* **User Behavior**: Shoppers reopen their wishlist, love an item, but freeze because sizing charts are generic and fabric quality is uncertain.
* **Customer Friction Signal**: **2,252 Signals (89.8% of all friction!)** under *Fit & Fabric Anxiety*.
* **Product Outcome**: **FitConfidence 88% Overlay Card & Height (5'4") / Weight (52kg) Buyer Photos**. Gives instant physical fit assurance directly on the wishlist card.

---

### 📍 Stage 3: Bag-to-Order Completion Rate ($P(\text{Stage 3: Checkout} \mid \text{Bag})$)
* **User Behavior**: Shoppers move a single ₹599 wishlisted top to the cart, but abandon at checkout when hit by an added ₹99 delivery fee for orders below ₹799.
* **Customer Friction Signal**: **91 Signals (3.6% of friction)** under *Delivery & Shipping Friction*.
* **Product Outcome**: **Free Delivery Threshold Bundler** suggesting relevant wishlisted items as 1-tap add-ons to cross minimum delivery thresholds naturally.

---

## 3. Opportunity Sizing & Leverage Analysis

| Funnel Stage | Customer Signals | % of Total Friction | Target Product Outcome | PM Leverage Priority |
| :--- | :--- | :--- | :--- | :--- |
| **Stage 1: Revisit Rate** | 181 Signals | 7.2% | Smart Occasion Folders | **Moderate Leverage**: Brings users back, but fit doubt still halts buying. |
| **Stage 2: Wishlist-to-Bag Transfer** | **2,252 Signals** | **89.8%** | **FitConfidence 88% & Height/Weight Photos** | **HIGHEST LEVERAGE ⭐**: Core lever that unblocks checkout without discounts. |
| **Stage 3: Checkout Completion** | 91 Signals | 3.6% | Free Shipping Bundler & 1-Click Bag | **High Secondary Leverage**: Unlocks single-item checkout abandoners. |
