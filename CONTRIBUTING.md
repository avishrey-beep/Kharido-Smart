# Contributing to KharidoSmart (खरीदो-स्मार्ट)

Thank you for your interest in contributing to **KharidoSmart**, the open-source rural market discovery and fair-price assistant!

---

## 1. Code of Conduct & Rural-First UX Principles

KharidoSmart is engineered specifically for farmers, rural households, and small-town buyers across India. All contributions should adhere to these core UX tenets:

1. **High Contrast Neo-Brutalist Palette:**
   - Background: Warm Cream (`#FBF6EA`)
   - Accent Primary: Terracotta Red (`#A24A32`)
   - Accent Secondary: Mustard Yellow (`#E3A83B`)
   - Accent Forest: Leaf Green (`#4B6142`)
   - Borders & Heavy Text: Dark Earth (`#2B2118`), 2px - 3px solid borders with 2px - 4px hard box-shadows (`shadow-[3px_3px_0_#2B2118]`).
2. **Bilingual Accessibility:**
   - Display key UI text in Hindi with English clarifiers (e.g., `Atta (आटा)`, `खरीदारी सूची (Shopping List)`).
   - Chatbot responses should seamlessly understand Hinglish and Devanagari queries.
3. **Low-Bandwidth & Offline Tolerance:**
   - Zero reliance on external heavy CDNs during critical shopping flow.
   - PWA Service Worker caching ensuring full offline availability of previously viewed mandis and the shopping cart.
4. **Input Fault Tolerance:**
   - Phone numbers must be strictly validated for 10 numeric digits with immediate, polite feedback: `"Fault: You have to write 10 digits only"`.

---

## 2. Development Setup

### 2.1 Backend (Node.js / Express)
```bash
cd backend
npm install
npm test
node server.js
```
The server will run on `http://localhost:4000`.

### 2.2 Frontend (React 18 + Vite + Tailwind CSS)
```bash
cd frontend
npm install
npm test
npm run dev
```
The Vite development server will start on `http://localhost:5173`.

---

## 3. Running Automated Tests

Before submitting changes, ensure both frontend and backend test suites pass:

```bash
# 1. Run Backend Engine tests
cd backend && npm test

# 2. Run Frontend calculations & validation tests
cd ../frontend && npm test
```

---

## 4. Git Commit Guidelines

We follow the Conventional Commits specification to keep contribution history clear and structured:

- `feat(...)`: A new user-facing feature or enhancement.
- `fix(...)`: A bug fix.
- `docs(...)`: Documentation updates.
- `test(...)`: Adding or refactoring test suites.
- `build(...)`: Build system, bundle outputs, or GitHub Pages sync.
- `refactor(...)`: Code changes that neither fix a bug nor add a feature.

**Example:**
```bash
git commit -m "feat(pwa): add offline service worker and rural cache-first sync manager"
```

---

## 5. Submitting Pull Requests

1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Commit your changes with descriptive messages and test coverage.
3. Push to your fork and submit a Pull Request to `avishrey-beep/Kharido-Smart`.
