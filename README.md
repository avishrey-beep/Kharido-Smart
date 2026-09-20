# KharidoSmart (खरीदो-स्मार्ट)

*Tagline:* "Apne bazaar ko jaaniye, sahi daam par kharidiye."

## Overview
KharidoSmart is an AI-powered rural market discovery and fair-price assistant designed for people in villages, small towns, and semi-urban areas of India. It features an Android-first PWA design, a smart fair-price comparison engine, and a bilingual AI Chatbot named **Bazaar Saathi**.

## Features MVP
1. **Smart Shopping List:** Add items via cascading dropdowns.
2. **Market Comparison:** Compare total trip cost (goods + travel) across nearby mandis and retail shops.
3. **Bazaar Saathi:** Ask questions in Hindi/English about markets, prices, and opening hours.
4. **Rural UI:** Warm theme (Cream, Leaf Green, Terracotta) optimized for Android screens.

## How to Run

1. **Backend:**
   ```bash
   cd backend
   npm install
   node server.js
   ```
   Runs on `http://localhost:4000`

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Runs on `http://localhost:5173` (or the port specified by Vite).

## Hackathon Demo Tips
- Open the frontend in Chrome/Edge.
- Hit **F12**, click the **Device Toolbar** (Mobile icon), and select a phone like **Pixel 5** or **iPhone 12 Pro** to show the Native App feel.
- Go to the **List** tab, add some items (e.g. Atta, Potatoes).
- Click **Find My Best Market** to show the fair-price engine comparing costs.
- Click the floating **Bazaar Saathi** button and type "Aata kahan sasta milega?" to show the AI chatbot answering in Hindi!
