# KharidoSmart (खरीदो-स्मार्ट) REST API Specification

This document provides complete documentation for the KharidoSmart REST API and client-side fallback engines.

---

## 1. Architecture & Base URLs

| Environment | Base URL | Description |
|---|---|---|
| **Local Backend** | `http://localhost:4000/api` | Express.js Node service with in-memory database |
| **GitHub Pages / PWA** | Client-Side Embedded Engine (`src/services/api.js`) | Zero-latency browser fallback ensuring 100% offline availability |

---

## 2. Endpoints

### 2.1 Get Categories
Retrieve all supported product categories with localization and icon identifiers.

- **Method:** `GET`
- **Route:** `/api/categories`
- **Query Parameters:** None
- **Response `200 OK`:**
```json
[
  { "id": "c1", "name": "Grocery (किराना)", "icon": "Wheat" },
  { "id": "c2", "name": "Vegetables & Fruits (सब्जियां और फल)", "icon": "Carrot" },
  { "id": "c3", "name": "Clothing (कपड़े)", "icon": "Shirt" },
  { "id": "c4", "name": "Farming (खेती का सामान)", "icon": "Tractor" }
]
```

---

### 2.2 Get Products
List available commodities, optionally filtered by category.

- **Method:** `GET`
- **Route:** `/api/products`
- **Query Parameters:**
  - `categoryId` (optional, string): e.g., `c1`, `c2`
- **Response `200 OK`:**
```json
[
  { "id": "p1", "categoryId": "c1", "name": "Atta (आटा)", "unit": "kg", "basePrice": 35 },
  { "id": "p2", "categoryId": "c1", "name": "Mustard Oil (सरसों का तेल)", "unit": "litre", "basePrice": 140 },
  { "id": "p5", "categoryId": "c2", "name": "Potatoes (आलू)", "unit": "kg", "basePrice": 22 }
]
```

---

### 2.3 Get Markets
List all registered and procedurally generated Mandis, Haats, and Retail Bazaars.

- **Method:** `GET`
- **Route:** `/api/markets`
- **Query Parameters:** None
- **Response `200 OK`:**
```json
[
  {
    "id": "m1",
    "name": "Kisan Mandi, Sadar",
    "type": "Wholesale Mandi",
    "distance": 3.2,
    "isOpen": true,
    "schedule": "Mon-Sat, 5:00 AM - 2:00 PM",
    "speciality": "Famous for fresh vegetables and wholesale grains.",
    "priceModifiers": { "c1": 0.95, "c2": 0.85, "c3": 1.0, "c4": 1.0 },
    "travelCost": 20
  }
]
```

---

### 2.4 Smart Fair-Price Comparison Engine
Calculate the most economical market for a complete shopping cart, accounting for travel transit costs.

- **Method:** `POST`
- **Route:** `/api/compare`
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "shoppingList": [
    { "productId": "p1", "quantity": 10 },
    { "productId": "p5", "quantity": 5 }
  ]
}
```

- **Response `200 OK`:**
```json
{
  "markets": [
    {
      "id": "m1",
      "name": "Kisan Mandi, Sadar",
      "type": "Wholesale Mandi",
      "distance": 3.2,
      "isOpen": true,
      "schedule": "Mon-Sat, 5:00 AM - 2:00 PM",
      "speciality": "Famous for fresh vegetables and wholesale grains.",
      "travelCost": 20,
      "totalItemsCost": 425,
      "estimatedTotalTripCost": 445,
      "itemDetails": [
        {
          "productName": "Atta (आटा)",
          "quantity": 10,
          "unit": "kg",
          "estPricePerUnit": 33,
          "itemTotal": 330
        },
        {
          "productName": "Potatoes (आलू)",
          "quantity": 5,
          "unit": "kg",
          "estPricePerUnit": 19,
          "itemTotal": 95
        }
      ]
    }
  ]
}
```

---

### 2.5 Bazaar Saathi AI Chatbot
Rule-based NLP and intent classifier providing bilingual market guidance in Hindi and English.

- **Method:** `POST`
- **Route:** `/api/chat`
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "message": "Aata sasta kahan milega?"
}
```

- **Response `200 OK`:**
```json
{
  "reply": "Aata aur rashan 'Kisan Mandi' me sasta milega. Aata lagbhag ₹33/kg mil raha hai wahan."
}
```

---

## 3. Formulas & Algorithmic Design

$$\text{TripCost}(M) = \sum_{i=1}^{N} \Big(\text{Round}\big(\text{BasePrice}_i \times \text{PriceModifier}_{M, \text{Category}(i)}\big) \times \text{Quantity}_i\Big) + \text{TravelCost}_M$$

1. **Category Discounts:** Wholesale mandis apply lower multipliers (e.g. 0.85x) on fresh produce; retail centers apply convenience markup (1.10x - 1.20x).
2. **Net Economic Advantage:** A distant wholesale market is only ranked #1 if bulk savings exceed the roundtrip travel fare.
