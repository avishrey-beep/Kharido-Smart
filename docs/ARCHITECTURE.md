# KharidoSmart (खरीदो-स्मार्ट) - Technical Architecture

This document outlines the architectural blueprint, data model, and mathematical formulation powering **KharidoSmart**, an AI-powered rural marketplace assistant.

---

## 1. System Overview

```
                      +---------------------------------------+
                      |           Client Browser / PWA         |
                      |  (React 18 + Vite + Tailwind CSS)     |
                      +-------------------+-------------------+
                                          |
                        HTTP REST / Fallback In-Memory Engine
                                          |
                      +-------------------v-------------------+
                      |            Express.js API             |
                      |          (Node.js REST Service)       |
                      +-------------------+-------------------+
                                          |
                        In-Memory Store / Procedural Mandi Data
                                          |
                      +-------------------v-------------------+
                      |         55+ Mandis & Bazaars          |
                      |  Wholesale, Haat, & Retail Datasets   |
                      +---------------------------------------+
```

---

## 2. Fair-Price Comparison Algorithm

The engine computes the total financial cost of a shopping trip rather than looking at unit commodity costs alone.

For a shopping list of $N$ items and a candidate market $M$:

$$\text{TripCost}(M) = \sum_{i=1}^{N} \Big(\text{Round}\big(\text{BasePrice}_i \times \text{PriceModifier}_{M, \text{Category}(i)}\big) \times \text{Quantity}_i\Big) + \text{TravelCost}_M$$

Where:
- $\text{BasePrice}_i$: Standard benchmark price for item $i$.
- $\text{PriceModifier}_{M, C}$: Market-specific category multiplier ($0.75 - 1.25$).
- $\text{TravelCost}_M$: Roundtrip travel expenditure to reach market $M$ based on village distance.

The candidate markets are ranked ascending:

$$\text{Rank}(M) \propto \text{TripCost}(M)$$

---

## 3. High Availability & Offline Resilience

- **Primary Mode:** Queries Express backend running on `http://localhost:4000/api`.
- **Static / Edge Mode (GitHub Pages):** When deployed on GitHub Pages or during network disconnection, the service seamlessly shifts to an embedded client-side fallback database and deterministic price comparison engine without user disruption.
- **PWA Installation:** Equipped with web app manifest and meta headers for Android/iOS homescreen installation.

---

## 4. Test Verification

Run the test suite:
```bash
cd backend
npm test
```
Verifies category schema, procedural dataset generation, cost sorting accuracy, and chatbot routing.
