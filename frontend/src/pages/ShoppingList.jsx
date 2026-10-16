import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  ArrowRight, 
  ListChecks, 
  Sparkles, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  X, 
  Minus, 
  Tag, 
  ShoppingBag,
  RotateCcw,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategories, getProducts } from '../services/api';

const QUICK_ITEMS = [
  { productId: 'p1', name: 'Atta (आटा)', unit: 'kg', quantity: 5 },
  { productId: 'p5', name: 'Potatoes (आलू)', unit: 'kg', quantity: 2 },
  { productId: 'p7', name: 'Tomatoes (टमाटर)', unit: 'kg', quantity: 1 },
  { productId: 'p2', name: 'Mustard Oil (सरसों का तेल)', unit: 'litre', quantity: 1 }
];

function splitBilingualName(fullName) {
  if (!fullName) return { english: '', hindi: '' };
  const match = fullName.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return { english: match[1].trim(), hindi: match[2].trim() };
  }
  return { english: fullName, hindi: '' };
}

export default function ShoppingList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedProd, setSelectedProd] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const [list, setList] = useState(() => {
    try {
      const saved = localStorage.getItem('kharido_list');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Load categories and all products
  useEffect(() => {
    getCategories().then(data => setCategories(data || []));
    getProducts().then(data => setAllProducts(data || []));
  }, []);

  // Sync list to localStorage
  useEffect(() => {
    localStorage.setItem('kharido_list', JSON.stringify(list));
  }, [list]);

  // Click outside listener for dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchCat = !selectedCat || p.categoryId === selectedCat;
      const matchSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allProducts, selectedCat, searchQuery]);

  const activeProduct = useMemo(() => {
    return allProducts.find(p => p.id === selectedProd);
  }, [allProducts, selectedProd]);

  const activeCategory = useMemo(() => {
    if (!activeProduct) return null;
    return categories.find(c => c.id === activeProduct.categoryId);
  }, [categories, activeProduct]);

  const handleSelectProduct = (product) => {
    setSelectedProd(product.id);
    setSelectedCat(product.categoryId);
    setIsDropdownOpen(false);
    if (!quantity || quantity < 1) {
      setQuantity(1);
    }
  };

  const handleClearSelection = () => {
    setSelectedProd('');
    setQuantity(1);
  };

  const addItem = () => {
    if (!activeProduct) return;
    
    const qtyNumber = Math.max(1, Number(quantity) || 1);
    const existingIndex = list.findIndex(i => i.productId === activeProduct.id);
    
    if (existingIndex > -1) {
      const updated = [...list];
      updated[existingIndex].quantity += qtyNumber;
      setList(updated);
    } else {
      setList([...list, { 
        productId: activeProduct.id, 
        name: activeProduct.name,
        unit: activeProduct.unit,
        basePrice: activeProduct.basePrice,
        quantity: qtyNumber 
      }]);
    }
    
    // Clear selection after adding
    setSelectedProd('');
    setQuantity(1);
  };

  const addQuickItem = (quickItem) => {
    const existingIndex = list.findIndex(i => i.productId === quickItem.productId);
    const prodDetails = allProducts.find(p => p.id === quickItem.productId);
    const basePrice = prodDetails ? prodDetails.basePrice : 0;
    
    if (existingIndex > -1) {
      const updated = [...list];
      updated[existingIndex].quantity += quickItem.quantity;
      setList(updated);
    } else {
      setList([...list, { ...quickItem, basePrice }]);
    }
  };

  const updateItemQuantity = (index, delta) => {
    const updated = [...list];
    const newQty = updated[index].quantity + delta;
    if (newQty <= 0) {
      setList(list.filter((_, i) => i !== index));
    } else {
      updated[index].quantity = newQty;
      setList(updated);
    }
  };

  const removeItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const clearList = () => {
    if (window.confirm('Are you sure you want to clear your bazaar list? (क्या आप पूरी सूची हटाना चाहते हैं?)')) {
      setList([]);
    }
  };

  const handleCompare = () => {
    localStorage.setItem('kharido_list', JSON.stringify(list));
    navigate('/markets');
  };

  // Estimated base mandi cost of list
  const totalEstimatedCost = useMemo(() => {
    return list.reduce((sum, item) => {
      const product = allProducts.find(p => p.id === item.productId);
      const price = product ? product.basePrice : (item.basePrice || 0);
      return sum + (price * item.quantity);
    }, 0);
  }, [list, allProducts]);

  const activeNames = activeProduct ? splitBilingualName(activeProduct.name) : { english: '', hindi: '' };

  return (
    <div className="p-4 sm:p-6 pb-28 max-w-4xl mx-auto flex flex-col h-full relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-3xl sm:text-4xl text-[#2B2118] font-bold" style={{ fontFamily: "'Yatra One', cursive" }}>
            Bazaar List
          </h2>
          <p className="text-[#5B4E3E] text-xs sm:text-sm font-bold">
            Apni list banayein, aur sasta bazaar dhoondhein. (Add items & compare mandi rates)
          </p>
        </div>
        {list.length > 0 && (
          <button
            onClick={clearList}
            className="text-xs text-[#A24A32] font-black hover:underline flex items-center gap-1 border border-[#A24A32] px-2.5 py-1 rounded-lg bg-white/60"
            title="Clear list"
          >
            <RotateCcw size={12} /> Clear List
          </button>
        )}
      </div>

      {/* Quick Add Staples */}
      <div className="mb-4">
        <div className="text-[11px] font-black uppercase tracking-wider text-[#A24A32] mb-1.5 flex items-center gap-1">
          <Sparkles size={14} /> Quick Add Staples (एक क्लिक में जोड़ें):
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_ITEMS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => addQuickItem(item)}
              className="bg-[#EADFC7] hover:bg-[#dfd1b3] text-[#2B2118] text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-[#2B2118] shadow-[2px_2px_0_#2B2118] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5"
            >
              <Plus size={14} strokeWidth={3} className="text-[#4B6142]" /> 
              <span>{item.quantity} {item.unit}</span>
              <span className="font-extrabold">{item.name.split('(')[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Add Item Form Card */}
      <div className="bg-[#FBF6EA] border-[3px] border-[#2B2118] p-4 sm:p-5 rounded-[1.5rem] shadow-[6px_6px_0px_#2B2118] mb-6 flex flex-col gap-4 relative z-20">
        <div className="absolute -top-3 left-6 w-8 h-3 bg-[#EADFC7] rounded-sm transform -rotate-2 border border-[#2B2118] opacity-80 shadow-sm"></div>
        
        {/* Category Filter Chips */}
        <div>
          <label className="text-xs font-black uppercase tracking-wider text-[#A24A32] mb-1.5 flex items-center gap-1">
            <Tag size={13} /> 1. Category Filter (श्रेणी चुनें):
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCat('')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-[#2B2118] transition-all ${
                selectedCat === '' 
                  ? 'bg-[#2B2118] text-[#FBF6EA] shadow-[2px_2px_0_#A24A32]' 
                  : 'bg-white text-[#2B2118] hover:bg-[#EADFC7]'
              }`}
            >
              All Items (सब)
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCat(selectedCat === c.id ? '' : c.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-[#2B2118] transition-all ${
                  selectedCat === c.id 
                    ? 'bg-[#A24A32] text-white shadow-[2px_2px_0_#2B2118]' 
                    : 'bg-white text-[#2B2118] hover:bg-[#EADFC7]'
                }`}
              >
                {c.name.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Smooth Item Selector (Replaces clumsy native select) */}
        <div className="relative" ref={dropdownRef}>
          <label className="text-xs font-black uppercase tracking-wider text-[#A24A32] mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShoppingBag size={13} /> 2. Choose Item from Mandi List (सामान चुनें):
            </span>
            <span className="text-[11px] font-semibold text-[#5B4E3E]">
              {filteredProducts.length} items available
            </span>
          </label>

          {/* Trigger Button */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="w-full bg-white border-2 border-[#2B2118] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E3A83B] font-bold text-[#2B2118] shadow-[2px_2px_0_#2B2118] flex items-center justify-between transition-all hover:bg-[#FFFDF8]"
          >
            <div className="flex items-center gap-2 text-left truncate">
              {activeProduct ? (
                <>
                  <CheckCircle2 size={18} className="text-[#4B6142] flex-shrink-0" />
                  <span className="font-black text-[#2B2118] truncate">{activeNames.english}</span>
                  {activeNames.hindi && (
                    <span className="text-xs bg-[#EADFC7] text-[#2B2118] px-2 py-0.5 rounded border border-[#2B2118]/50 flex-shrink-0 font-bold">
                      {activeNames.hindi}
                    </span>
                  )}
                  <span className="text-xs text-[#5B4E3E] font-medium hidden sm:inline">
                    (₹{activeProduct.basePrice}/{activeProduct.unit})
                  </span>
                </>
              ) : (
                <span className="text-[#7D6B56] font-medium flex items-center gap-2">
                  <Search size={16} className="text-[#A24A32]" />
                  Tap to search or pick an item (सामान यहाँ से चुनें)...
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[#2B2118] ml-2 flex-shrink-0">
              {isDropdownOpen ? <ChevronUp size={20} strokeWidth={2.5} /> : <ChevronDown size={20} strokeWidth={2.5} />}
            </div>
          </button>

          {/* Animated Custom Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border-[3px] border-[#2B2118] rounded-xl shadow-[6px_6px_0px_#2B2118] z-50 overflow-hidden flex flex-col"
              >
                {/* Search Bar inside Dropdown */}
                <div className="p-2.5 bg-[#FBF6EA] border-b-2 border-[#2B2118] flex items-center gap-2">
                  <Search size={16} className="text-[#A24A32] ml-1 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name in English or Hindi (e.g. Potato, Dal)..."
                    className="w-full bg-transparent text-xs font-bold text-[#2B2118] focus:outline-none placeholder-[#7D6B56]"
                    autoFocus
                  />
                  {searchQuery && (
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-[#7D6B56] hover:text-[#2B2118]"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Items List */}
                <div className="max-h-60 overflow-y-auto divide-y divide-[#EADFC7]">
                  {filteredProducts.length === 0 ? (
                    <div className="p-4 text-center text-xs font-bold text-[#7D6B56]">
                      No items found matching "{searchQuery}".
                    </div>
                  ) : (
                    filteredProducts.map((p) => {
                      const { english, hindi } = splitBilingualName(p.name);
                      const isSelected = selectedProd === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectProduct(p)}
                          className={`w-full p-3 text-left flex items-center justify-between transition-colors ${
                            isSelected 
                              ? 'bg-[#FFF3D6] text-[#2B2118]' 
                              : 'hover:bg-[#FBF6EA] text-[#2B2118]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            {isSelected ? (
                              <CheckCircle2 size={16} className="text-[#4B6142] flex-shrink-0" />
                            ) : (
                              <span className="w-4 h-4 rounded-full border border-[#2B2118]/30 flex-shrink-0 inline-block"></span>
                            )}
                            <span className="font-black text-sm truncate">{english}</span>
                            {hindi && (
                              <span className="text-xs bg-[#EADFC7] px-2 py-0.5 rounded font-bold border border-[#2B2118]/30 flex-shrink-0">
                                {hindi}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 text-right">
                            <span className="text-xs font-black text-[#A24A32] bg-[#FBF6EA] px-2 py-0.5 rounded border border-[#2B2118]/20">
                              ₹{p.basePrice} / {p.unit}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* High-Visibility "Selected Item" Preview Banner */}
        <AnimatePresence>
          {activeProduct && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#FFF9EE] border-[3px] border-[#A24A32] p-4 rounded-2xl shadow-[4px_4px_0_#2B2118] relative"
            >
              <div className="flex justify-between items-start mb-2 border-b-2 border-[#A24A32]/20 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-black tracking-wide text-[#4B6142] uppercase">
                  <CheckCircle2 size={16} className="text-[#4B6142]" />
                  <span>Selected Item (चुना हुआ सामान):</span>
                </div>
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="text-xs text-[#A24A32] hover:bg-[#F0D5CD] font-bold p-1 rounded-md flex items-center gap-1 border border-[#A24A32]"
                  title="Choose different item"
                >
                  <X size={14} /> Change Item
                </button>
              </div>

              {/* Bilingual Display */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-black text-[#2B2118]">
                    {activeNames.english}
                  </span>
                  {activeNames.hindi && (
                    <span className="text-sm font-extrabold text-[#A24A32] bg-[#EADFC7] px-2.5 py-0.5 rounded-lg border border-[#2B2118]">
                      {activeNames.hindi}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#5B4E3E] bg-white px-2.5 py-1 rounded-lg border border-[#2B2118]">
                    {activeCategory?.name.split('(')[0].trim() || 'Mandi'}
                  </span>
                  <span className="text-sm font-black text-[#2B2118] bg-[#E3A83B] px-3 py-1 rounded-lg border border-[#2B2118]">
                    ₹{activeProduct.basePrice} / {activeProduct.unit}
                  </span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="bg-white border-2 border-[#2B2118] p-3 rounded-xl flex items-center justify-between gap-3 shadow-[2px_2px_0_#2B2118]">
                <span className="text-xs font-black uppercase tracking-wider text-[#A24A32]">
                  Quantity ({activeProduct.unit}):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.max(1, Number(prev) - 1))}
                    className="w-8 h-8 rounded-lg bg-[#EADFC7] hover:bg-[#dfd1b3] text-[#2B2118] font-black flex items-center justify-center border-2 border-[#2B2118] shadow-[1px_1px_0_#2B2118] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center font-black text-lg text-[#2B2118] bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Number(prev) + 1)}
                    className="w-8 h-8 rounded-lg bg-[#EADFC7] hover:bg-[#dfd1b3] text-[#2B2118] font-black flex items-center justify-center border-2 border-[#2B2118] shadow-[1px_1px_0_#2B2118] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                  <span className="font-extrabold text-sm text-[#5B4E3E] ml-1">
                    {activeProduct.unit}
                  </span>
                </div>
              </div>

              {/* Cost Subtotal Preview */}
              <div className="mt-2 text-right text-xs font-bold text-[#5B4E3E]">
                Est. Base Cost: <strong className="text-sm font-black text-[#2B2118]">₹{activeProduct.basePrice * (Number(quantity) || 1)}</strong>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add to List Button */}
        <button 
          type="button"
          onClick={addItem}
          disabled={!activeProduct}
          className="w-full bg-[#E3A83B] hover:bg-[#d4992e] text-[#2B2118] font-black p-3.5 rounded-xl flex justify-center items-center gap-2 border-[3px] border-[#2B2118] shadow-[4px_4px_0_#2B2118] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={22} strokeWidth={3} /> 
          {activeProduct ? (
            <span>Add {quantity} {activeProduct.unit} {activeNames.english} to Bag</span>
          ) : (
            <span>1. Choose an Item to Add</span>
          )}
        </button>
      </div>

      {/* User's Current List */}
      <div className="flex-1 overflow-y-auto pr-1 pb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-black text-[#2B2118] text-lg uppercase tracking-wider flex items-center gap-2">
            Your List (आपकी झोली)
            <span className="bg-[#4B6142] text-white text-xs px-2.5 py-0.5 rounded-full border border-[#2B2118] font-bold">
              {list.length} {list.length === 1 ? 'item' : 'items'}
            </span>
          </h3>

          {list.length > 0 && (
            <span className="text-xs font-extrabold text-[#2B2118] bg-[#EADFC7] px-2.5 py-1 rounded-lg border border-[#2B2118]">
              Est. Mandi: ₹{totalEstimatedCost}
            </span>
          )}
        </div>
        
        {list.length === 0 ? (
          <div className="text-center text-[#5B4E3E] my-6 flex flex-col items-center p-6 bg-white border-2 border-dashed border-[#2B2118] rounded-2xl shadow-[2px_2px_0_#2B2118]">
            <ListChecks size={52} className="mb-3 text-[#A24A32]" />
            <p className="font-black text-lg text-[#2B2118]">Your bag is currently empty.</p>
            <p className="text-xs mt-1 text-[#7D6B56] max-w-sm">
              Use the Quick Add pills above or pick an item from the Mandi list to compare real-time prices across 55+ markets.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {list.map((item, idx) => {
              const { english, hindi } = splitBilingualName(item.name);
              const product = allProducts.find(p => p.id === item.productId);
              const unitPrice = product ? product.basePrice : (item.basePrice || 0);
              const itemTotal = unitPrice * item.quantity;

              return (
                <li 
                  key={idx} 
                  className="bg-white p-3.5 sm:p-4 rounded-xl shadow-[3px_3px_0_#2B2118] border-2 border-[#2B2118] flex justify-between items-center relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#A24A32]"></div>
                  
                  <div className="pl-3 sm:pl-4 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-[#A24A32] bg-[#FBF6EA] px-1.5 py-0.5 rounded border border-[#2B2118]/20">
                        #{idx + 1}
                      </span>
                      <span className="font-black text-[#2B2118] text-base">
                        {english}
                      </span>
                      {hindi && (
                        <span className="text-xs font-bold text-[#A24A32] bg-[#EADFC7] px-2 py-0.5 rounded border border-[#2B2118]/40">
                          {hindi}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="text-xs text-[#2B2118] font-bold bg-[#E3A83B] px-2.5 py-0.5 rounded-md border border-[#2B2118]">
                        {item.quantity} {item.unit}
                      </span>
                      {unitPrice > 0 && (
                        <span className="text-xs text-[#5B4E3E] font-medium">
                          ≈ ₹{itemTotal} (@ ₹{unitPrice}/{item.unit})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove Action */}
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <div className="flex items-center bg-[#FBF6EA] border border-[#2B2118] rounded-lg overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => updateItemQuantity(idx, -1)}
                        className="px-2 py-1 text-[#2B2118] hover:bg-[#EADFC7] font-black text-xs"
                        title="Decrease"
                      >
                        <Minus size={12} strokeWidth={3} />
                      </button>
                      <span className="px-2 font-bold text-xs text-[#2B2118]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateItemQuantity(idx, 1)}
                        className="px-2 py-1 text-[#2B2118] hover:bg-[#EADFC7] font-black text-xs"
                        title="Increase"
                      >
                        <Plus size={12} strokeWidth={3} />
                      </button>
                    </div>

                    <button 
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-[#FBF6EA] bg-[#A24A32] hover:bg-[#8e3f29] p-2 rounded-lg border-2 border-[#2B2118] shadow-[2px_2px_0_#2B2118] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                      title="Remove item"
                    >
                      <Trash2 size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Compare Button */}
      {list.length > 0 && (
        <div className="pt-3 sticky bottom-16 sm:bottom-0 bg-[#FBF6EA]/95 py-2">
          <button 
            type="button"
            onClick={handleCompare}
            className="w-full bg-[#4B6142] hover:bg-[#3d5036] text-[#FBF6EA] font-black p-4 rounded-2xl border-[3px] border-[#2B2118] shadow-[4px_4px_0_#2B2118] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 text-base sm:text-lg"
          >
            Find Cheapest Market for These {list.length} Items <ArrowRight size={22} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
}
