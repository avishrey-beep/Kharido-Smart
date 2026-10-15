# KharidoSmart (खरीदो-स्मार्ट)

![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-4%2F4%20Passing-success?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-Ready-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-informational?style=flat-square)

*Tagline:* "Apne bazaar ko jaaniye, sahi daam par kharidiye."

## Overview
KharidoSmart is an AI-powered rural market discovery and fair-price assistant designed for people in villages, small towns, and semi-urban areas of India. It features an Android-first PWA design, a smart fair-price comparison engine, and a bilingual AI Chatbot named **Bazaar Saathi**.

## Live Demo
🌐 **GitHub Pages:** [https://avishrey-beep.github.io/Kharido-Smart/](https://avishrey-beep.github.io/Kharido-Smart/)

## Features MVP
1. **Smart Shopping List & Quick-Add:** Add items via cascading dropdowns or 1-tap staple shortcuts (Aata, Aloo, Tamatar, Tel) with automatic localStorage persistence.
2. **Market Comparison & Browse Mode:** Real-time search and filter across 55+ nearby mandis, haats, and retail shops with distance, operating hours, and Google Maps Navigation.
3. **Smart Fair-Price Engine:** Computes exact trip cost (goods + travel) to determine the #1 cheapest mandi.
4. **Bazaar Saathi:** Ask questions in Hindi/English about markets, prices, and opening hours.
5. **Rural UI & PWA Ready:** Neo-brutalist warm theme (Cream, Leaf Green, Terracotta) with responsive split-screen desktop/mobile layout and PWA manifest for native installation.
6. **Bilingual Accessibility:** Quick language switch (`हिन्दी` / `English`) and dynamic village location badge.
7. **Standalone & Cloud Ready:** Features an embedded client-side market database engine for 100% offline & static GitHub Pages demo support, plus Express REST API support when running with backend.

## Technical Architecture
For detailed system design, algorithmic formulation, and data flow, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

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
