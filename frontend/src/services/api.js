import axios from 'axios';

// Base URL for the Express backend if running
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Fallback embedded database for standalone / GitHub Pages deployment
const marketNames = [
  "Kalyanpur", "Shivaji", "Bhim Nagar", "Lalbagh", "Aminabad", "Gomti", 
  "Alambagh", "Indira", "Azad", "Nehru", "Subhash", "Gandhi", "Tagore", 
  "Shastri", "Rajendra", "Pratap", "Vikas", "Saraswati", "Lakshmi", "Ganesh", "Surya", "Chandra"
];
const marketTypes = ["Haat", "Mandi", "Bazaar", "Retail", "Thok Market", "Farmers Market", "Chowraha Market"];

const initialMarkets = [
  {
    id: 'm1',
    name: 'Kisan Mandi, Sadar',
    type: 'Wholesale Mandi',
    distance: 3.2,
    isOpen: true,
    schedule: 'Mon-Sat, 5:00 AM - 2:00 PM',
    speciality: 'Famous for fresh vegetables and wholesale grains.',
    priceModifiers: { c1: 0.95, c2: 0.85, c3: 1.0, c4: 1.0 },
    travelCost: 20
  },
  {
    id: 'm2',
    name: 'Mangalwar Haat (Weekly)',
    type: 'Weekly Haat',
    distance: 1.5,
    isOpen: false,
    schedule: 'Tuesdays, 6:00 AM - 6:00 PM',
    speciality: 'Known for its weekly village haat and affordable clothes.',
    priceModifiers: { c1: 1.0, c2: 0.90, c3: 0.80, c4: 0.95 },
    travelCost: 10
  },
  {
    id: 'm3',
    name: 'Chowk Bazaar Retail',
    type: 'Retail Market',
    distance: 0.8,
    isOpen: true,
    schedule: 'Daily, 10:00 AM - 9:00 PM',
    speciality: 'General daily needs and household items close to home.',
    priceModifiers: { c1: 1.10, c2: 1.20, c3: 1.10, c4: 1.15 },
    travelCost: 0
  },
  {
    id: 'm4',
    name: 'Rampur Haat',
    type: 'Weekly Haat',
    distance: 4.5,
    isOpen: true,
    schedule: 'Sundays & Thursdays, 7:00 AM - 5:00 PM',
    speciality: 'Livestock, fresh farm produce, and local handicrafts.',
    priceModifiers: { c1: 0.90, c2: 0.80, c3: 0.85, c4: 0.90 },
    travelCost: 35
  },
  {
    id: 'm5',
    name: 'Gopinath Sabzi Mandi',
    type: 'Vegetable Market',
    distance: 2.1,
    isOpen: true,
    schedule: 'Daily, 4:00 AM - 11:00 AM',
    speciality: 'Early morning fresh vegetables directly from local farmers.',
    priceModifiers: { c1: 1.05, c2: 0.75, c3: 1.15, c4: 1.0 },
    travelCost: 15
  }
];

// Generate 50 additional markets
for (let i = 6; i <= 55; i++) {
  const name = marketNames[(i * 3 + 7) % marketNames.length];
  const type = marketTypes[(i * 2 + 3) % marketTypes.length];
  const dist = parseFloat(((i * 1.37) % 14 + 1.2).toFixed(1));
  const open = (i % 5 !== 0);
  const cost = ((i * 7) % 45) + 10;
  initialMarkets.push({
    id: `m${i}`,
    name: `${name} ${type} #${i}`,
    type: type,
    distance: dist,
    isOpen: open,
    schedule: 'Daily, 8:00 AM - 8:00 PM',
    speciality: 'Extensive local market with a variety of goods and fresh produce.',
    priceModifiers: {
      c1: parseFloat((0.85 + ((i * 5) % 35) / 100).toFixed(2)),
      c2: parseFloat((0.80 + ((i * 7) % 40) / 100).toFixed(2)),
      c3: parseFloat((0.88 + ((i * 3) % 30) / 100).toFixed(2)),
      c4: parseFloat((0.90 + ((i * 4) % 25) / 100).toFixed(2))
    },
    travelCost: cost
  });
}

export const localDb = {
  categories: [
    { id: 'c1', name: 'Grocery (किराना)', icon: 'Wheat' },
    { id: 'c2', name: 'Vegetables & Fruits (सब्जियां और फल)', icon: 'Carrot' },
    { id: 'c3', name: 'Clothing (कपड़े)', icon: 'Shirt' },
    { id: 'c4', name: 'Farming (खेती का सामान)', icon: 'Tractor' }
  ],
  products: [
    { id: 'p1', categoryId: 'c1', name: 'Atta (आटा)', unit: 'kg', basePrice: 35 },
    { id: 'p2', categoryId: 'c1', name: 'Mustard Oil (सरसों का तेल)', unit: 'litre', basePrice: 140 },
    { id: 'p3', categoryId: 'c1', name: 'Rice (चावल)', unit: 'kg', basePrice: 45 },
    { id: 'p4', categoryId: 'c1', name: 'Dal (दाल)', unit: 'kg', basePrice: 110 },
    { id: 'p5', categoryId: 'c2', name: 'Potatoes (आलू)', unit: 'kg', basePrice: 22 },
    { id: 'p6', categoryId: 'c2', name: 'Onions (प्याज)', unit: 'kg', basePrice: 30 },
    { id: 'p7', categoryId: 'c2', name: 'Tomatoes (टमाटर)', unit: 'kg', basePrice: 40 },
    { id: 'p8', categoryId: 'c3', name: 'Cotton Saree (सूती साड़ी)', unit: 'piece', basePrice: 350 },
    { id: 'p9', categoryId: 'c3', name: 'Kurta (कुर्ता)', unit: 'piece', basePrice: 250 },
    { id: 'p10', categoryId: 'c4', name: 'Urea Fertilizer (यूरिया)', unit: 'bag', basePrice: 266 },
    { id: 'p11', categoryId: 'c4', name: 'Spade / Kudal (कुदाल)', unit: 'piece', basePrice: 150 },
    { id: 'p12', categoryId: 'c2', name: 'Okra / Bhindi (भिंडी)', unit: 'kg', basePrice: 40 },
    { id: 'p13', categoryId: 'c2', name: 'Cabbage (पत्ता गोभी)', unit: 'piece', basePrice: 25 },
    { id: 'p14', categoryId: 'c2', name: 'Cauliflower (फूल गोभी)', unit: 'piece', basePrice: 30 },
    { id: 'p15', categoryId: 'c2', name: 'Spinach (पालक)', unit: 'bunch', basePrice: 15 },
    { id: 'p16', categoryId: 'c2', name: 'Green Chillies (हरी मिर्च)', unit: 'kg', basePrice: 60 },
    { id: 'p17', categoryId: 'c2', name: 'Bottle Gourd (लौकी)', unit: 'piece', basePrice: 20 },
    { id: 'p18', categoryId: 'c2', name: 'Brinjal (बैंगन)', unit: 'kg', basePrice: 35 },
    { id: 'p19', categoryId: 'c2', name: 'Garlic (लहसुन)', unit: 'kg', basePrice: 120 },
    { id: 'p20', categoryId: 'c2', name: 'Ginger (अदरक)', unit: 'kg', basePrice: 100 },
    { id: 'p21', categoryId: 'c2', name: 'Carrot (गाजर)', unit: 'kg', basePrice: 30 }
  ],
  markets: initialMarkets
};

// Client-side comparison engine
function computeMarketComparison(shoppingList) {
  if (!shoppingList || shoppingList.length === 0) return [];
  const results = localDb.markets.map(market => {
    let totalItemsCost = 0;
    const itemDetails = [];

    shoppingList.forEach(item => {
      const product = localDb.products.find(p => p.id === item.productId);
      if (product) {
        const modifier = market.priceModifiers[product.categoryId] || 1.0;
        const estPricePerUnit = Math.round(product.basePrice * modifier);
        const itemTotal = estPricePerUnit * item.quantity;
        totalItemsCost += itemTotal;

        itemDetails.push({
          productName: product.name,
          quantity: item.quantity,
          unit: product.unit,
          estPricePerUnit,
          itemTotal
        });
      }
    });

    return {
      ...market,
      totalItemsCost,
      estimatedTotalTripCost: totalItemsCost + market.travelCost,
      itemDetails
    };
  });

  results.sort((a, b) => a.estimatedTotalTripCost - b.estimatedTotalTripCost);
  return results;
}

// Client-side bilingual chatbot engine
function computeChatReply(message) {
  const msg = (message || '').toLowerCase();
  if (msg.includes('sasta') || msg.includes('cheap')) {
    return "Sasti sabziyan aur rashan lene ke liye 'Kisan Mandi, Sadar' sabse behtar hai. Wahan thok (wholesale) bhav milta hai, par travel ka 20 rupaye lag sakta hai.";
  } else if (msg.includes('haat') || msg.includes('mangalwar')) {
    return "Mangalwar Haat (Weekly) sirf mangalwar ko khulta hai. Wahan kapde (clothes) aur kheti ka saman sasta milta hai.";
  } else if (msg.includes('nazdeek') || msg.includes('near')) {
    return "Aapke sabse nazdeek 'Chowk Bazaar Retail' hai, jo sirf 0.8 km door hai aur abhi khula hai.";
  } else if (msg.includes('aata') || msg.includes('atta') || msg.includes('rashan')) {
    return "Aata aur rashan 'Kisan Mandi' me sasta milega. Aata lagbhag ₹33/kg mil raha hai wahan.";
  } else if (msg.includes('bazaar') || msg.includes('market')) {
    return "Kisan Mandi subah 5 baje se dopahar 2 baje tak khuli rehti hai. Chowk Bazaar raat 9 baje tak khula hai.";
  }
  return "Namaste! Main aapka Bazaar Saathi hoon. Aap mujhse kisi bhi bazaar, daam, ya haat ke baare mein pooch sakte hain. (I am your Market Friend. Ask me about markets, prices, or haats.)";
}

// Exported API helpers with automatic network fallback
export async function getCategories() {
  try {
    const res = await axios.get(`${API_BASE_URL}/categories`, { timeout: 1500 });
    if (res.data && res.data.length > 0) return res.data;
  } catch (err) {
    // Fall back to local embedded database
  }
  return localDb.categories;
}

export async function getProducts(categoryId) {
  try {
    const url = categoryId 
      ? `${API_BASE_URL}/products?categoryId=${categoryId}` 
      : `${API_BASE_URL}/products`;
    const res = await axios.get(url, { timeout: 1500 });
    if (res.data && res.data.length > 0) return res.data;
  } catch (err) {
    // Fall back to local embedded database
  }
  if (categoryId) {
    return localDb.products.filter(p => p.categoryId === categoryId);
  }
  return localDb.products;
}

export async function compareMarkets(shoppingList) {
  try {
    const res = await axios.post(`${API_BASE_URL}/compare`, { shoppingList }, { timeout: 1500 });
    if (res.data && res.data.markets && res.data.markets.length > 0) {
      return res.data.markets;
    }
  } catch (err) {
    // Fall back to local embedded engine
  }
  return computeMarketComparison(shoppingList);
}

export async function getChatReply(message) {
  try {
    const res = await axios.post(`${API_BASE_URL}/chat`, { message }, { timeout: 1500 });
    if (res.data && res.data.reply) return res.data.reply;
  } catch (err) {
    // Fall back to local embedded engine
  }
  return computeChatReply(message);
}
