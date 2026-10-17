import assert from 'node:assert';

/**
 * KharidoSmart Frontend Automated Test Suite
 * Tests:
 * 1. 10-Digit Mobile Number Validation & Dual Password Confirmation
 * 2. Shopping List Cart Item Pricing & Unit Conversions
 * 3. Mandi Total Trip Cost Engine & Net Savings Comparator
 * 4. WhatsApp Bazaar Share Formatter
 * 5. PWA Offline Storage Serialization
 */

console.log('🌾 Running KharidoSmart Frontend Automated Unit Tests...\n');
let testsPassed = 0;

// ==========================================
// Test 1: Phone Validation & Fault Messages
// ==========================================
try {
  function validatePhone(input) {
    const cleaned = String(input).replace(/\D/g, '');
    if (!cleaned || cleaned.length !== 10) {
      return { valid: false, error: 'Fault: You have to write 10 digits only' };
    }
    return { valid: true, value: cleaned };
  }

  function validateDualPassword(newPass, confirmPass) {
    if (!newPass || newPass.length < 4) {
      return { valid: false, error: 'Password must be at least 4 characters' };
    }
    if (newPass !== confirmPass) {
      return { valid: false, error: 'Passwords do not match' };
    }
    return { valid: true };
  }

  assert.strictEqual(validatePhone('9876543210').valid, true);
  assert.strictEqual(validatePhone('98765 43210').valid, true);
  assert.strictEqual(validatePhone('12345').valid, false);
  assert.strictEqual(validatePhone('12345').error, 'Fault: You have to write 10 digits only');
  assert.strictEqual(validatePhone('9876543210123').valid, false);
  assert.strictEqual(validatePhone('9876543210123').error, 'Fault: You have to write 10 digits only');

  assert.strictEqual(validateDualPassword('kisan123', 'kisan123').valid, true);
  assert.strictEqual(validateDualPassword('kisan123', 'different').valid, false);
  assert.strictEqual(validateDualPassword('12', '12').valid, false);

  console.log('✅ Test 1 Passed: Mobile fault validation (10 digits) & password match verified.');
  testsPassed++;
} catch (err) {
  console.error('❌ Test 1 Failed:', err);
}

// ==========================================
// Test 2: Shopping Cart Math & Unit Prices
// ==========================================
try {
  const cart = [
    { id: 'p1', name: 'Atta (आटा)', unit: 'kg', ratePerUnit: 32, quantity: 10 },
    { id: 'p2', name: 'Mustard Oil (सरसों का तेल)', unit: 'litre', ratePerUnit: 135, quantity: 2 },
    { id: 'p3', name: 'Aloo (आलू)', unit: 'kg', ratePerUnit: 20, quantity: 5 }
  ];

  function calculateCartTotal(items) {
    return items.reduce((acc, item) => acc + (item.ratePerUnit * item.quantity), 0);
  }

  function adjustQuantity(item, delta) {
    const updated = Math.max(0, item.quantity + delta);
    return { ...item, quantity: updated };
  }

  const subtotal = calculateCartTotal(cart);
  assert.strictEqual(subtotal, 10 * 32 + 2 * 135 + 5 * 20); // 320 + 270 + 100 = 690

  const decreased = adjustQuantity(cart[2], -10);
  assert.strictEqual(decreased.quantity, 0, 'Quantity should floor at zero');

  console.log('✅ Test 2 Passed: Shopping cart subtotal calculation & quantity clamp verified.');
  testsPassed++;
} catch (err) {
  console.error('❌ Test 2 Failed:', err);
}

// ==========================================
// Test 3: Mandi Fair-Price & Trip Cost Engine
// ==========================================
try {
  const mandiRates = [
    {
      id: 'm1',
      name: 'Kisan Mandi Sadar',
      travelCost: 25,
      itemsCost: 650
    },
    {
      id: 'm2',
      name: 'Chowk Retail Market',
      travelCost: 0,
      itemsCost: 730
    },
    {
      id: 'm3',
      name: 'Mangalwar Haat',
      travelCost: 15,
      itemsCost: 640
    }
  ];

  function evaluateBestMarket(markets) {
    const evaluated = markets.map(m => ({
      ...m,
      totalTripCost: m.itemsCost + m.travelCost
    }));
    evaluated.sort((a, b) => a.totalTripCost - b.totalTripCost);
    const best = evaluated[0];
    const worst = evaluated[evaluated.length - 1];
    const savings = worst.totalTripCost - best.totalTripCost;
    return { best, savings, all: evaluated };
  }

  const result = evaluateBestMarket(mandiRates);
  // m1: 650 + 25 = 675
  // m2: 730 + 0 = 730
  // m3: 640 + 15 = 655
  assert.strictEqual(result.best.id, 'm3', 'Mangalwar Haat should be optimal');
  assert.strictEqual(result.best.totalTripCost, 655);
  assert.strictEqual(result.savings, 730 - 655); // 75 Rs savings

  console.log(`✅ Test 3 Passed: Fair-price comparison engine correctly identified best mandi with ₹${result.savings} savings.`);
  testsPassed++;
} catch (err) {
  console.error('❌ Test 3 Failed:', err);
}

// ==========================================
// Test 4: WhatsApp Bazaar Share Formatter
// ==========================================
try {
  function formatWhatsAppMessage(cartItems, total) {
    let text = `🛒 *KharidoSmart Bazaar List (खरीदारी सूची)*\n\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name}: ${item.quantity} ${item.unit}\n`;
    });
    text += `\n*कुल अनुमानित खर्च (Total):* ₹${total}\n\n`;
    text += `📍 Smart Haat Locator: https://avishrey-beep.github.io/Kharido-Smart/`;
    return text;
  }

  const sampleItems = [
    { name: 'Atta (आटा)', quantity: 5, unit: 'kg' },
    { name: 'Chini (चीनी)', quantity: 2, unit: 'kg' }
  ];
  const msg = formatWhatsAppMessage(sampleItems, 240);

  assert.ok(msg.includes('KharidoSmart Bazaar List'));
  assert.ok(msg.includes('5 kg'));
  assert.ok(msg.includes('₹240'));
  assert.ok(msg.includes('https://avishrey-beep.github.io/Kharido-Smart/'));

  console.log('✅ Test 4 Passed: WhatsApp shopping list sharing formatter verified.');
  testsPassed++;
} catch (err) {
  console.error('❌ Test 4 Failed:', err);
}

// ==========================================
// Test 5: PWA Offline Serialization Resilience
// ==========================================
try {
  const mockStorage = {};
  const storageManager = {
    save: (key, val) => { mockStorage[key] = JSON.stringify(val); },
    get: (key) => mockStorage[key] ? JSON.parse(mockStorage[key]) : null
  };

  const testUser = { phone: '9876543210', village: 'Sadar Village', isLoggedIn: true };
  storageManager.save('kharido_user', testUser);
  const loadedUser = storageManager.get('kharido_user');

  assert.deepStrictEqual(loadedUser, testUser);
  assert.strictEqual(storageManager.get('non_existent'), null);

  console.log('✅ Test 5 Passed: Offline storage serialization and caching resilience verified.');
  testsPassed++;
} catch (err) {
  console.error('❌ Test 5 Failed:', err);
}

console.log(`\n🎉 Test Suite Completed: ${testsPassed}/5 tests passed successfully!\n`);
assert.strictEqual(testsPassed, 5);
