import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, AlertCircle, Store, ShoppingBag, ArrowRight, Compass, Sparkles, Search, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { compareMarkets, getAllMarkets } from '../services/api';

export default function Markets() {
  const navigate = useNavigate();
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    let shoppingList = [];
    try {
      const rawList = localStorage.getItem('kharido_list');
      if (rawList) {
        shoppingList = JSON.parse(rawList);
      }
    } catch (e) {
      shoppingList = [];
    }

    if (shoppingList && shoppingList.length > 0) {
      setIsComparisonMode(true);
      setItemCount(shoppingList.length);
      compareMarkets(shoppingList)
        .then(data => {
          setMarkets(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setIsComparisonMode(false);
      setItemCount(0);
      getAllMarkets()
        .then(data => {
          const sorted = [...data].sort((a, b) => a.distance - b.distance);
          setMarkets(sorted);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, []);

  // Filter & Search logic
  const filteredMarkets = markets.filter(m => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      m.name.toLowerCase().includes(q) || 
      m.speciality.toLowerCase().includes(q) || 
      m.type.toLowerCase().includes(q);
    
    if (!matchesSearch) return false;

    if (filterType === 'OPEN') return m.isOpen;
    if (filterType === 'WHOLESALE') return m.type.toLowerCase().includes('wholesale');
    if (filterType === 'HAAT') return m.type.toLowerCase().includes('haat');
    if (filterType === 'RETAIL') return m.type.toLowerCase().includes('retail');
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-full pt-28 text-[#5B4E3E]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E3A83B] border-t-[#A24A32] mb-4"></div>
        <p className="font-bold text-lg" style={{ fontFamily: "'Yatra One', cursive" }}>Mandiyan dhoondh rahe hain...</p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 max-w-5xl mx-auto">
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-3xl lg:text-4xl text-[#2B2118] font-bold" style={{ fontFamily: "'Yatra One', cursive" }}>
          {isComparisonMode ? 'Bazaar Price Comparison' : 'All Nearby Mandis & Markets'}
        </h2>
        <p className="text-sm text-[#5B4E3E] font-medium mt-1">
          {isComparisonMode 
            ? `Calculated lowest trip costs for ${itemCount} item(s) in your bag.` 
            : 'Explore all 55+ local rural haats, mandis, and retail bazaars.'}
        </p>
      </div>

      {/* Mode Banner */}
      {!isComparisonMode ? (
        <div className="bg-[#FBF6EA] border-[3px] border-[#2B2118] p-4 lg:p-5 rounded-2xl shadow-[4px_4px_0_#2B2118] mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#E3A83B] border-2 border-[#2B2118] flex items-center justify-center shrink-0 shadow-[2px_2px_0_#2B2118]">
              <ShoppingBag size={24} className="text-[#2B2118]" />
            </div>
            <div>
              <h4 className="font-black text-[#2B2118] text-base">Your Bazaar List is empty</h4>
              <p className="text-xs text-[#5B4E3E] mt-0.5 max-w-md">
                Add vegetables or groceries to your list to calculate the exact cheapest mandi and travel savings!
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/shopping')}
            className="w-full sm:w-auto bg-[#4B6142] hover:bg-[#3d5036] text-[#FBF6EA] font-bold px-5 py-3 rounded-xl border-2 border-[#2B2118] shadow-[3px_3px_0_#2B2118] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 text-sm whitespace-nowrap"
          >
            <Sparkles size={16} /> Add Items to Compare <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="bg-[#FBF6EA] border-[3px] border-[#2B2118] p-4 rounded-2xl shadow-[4px_4px_0_#2B2118] mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#2B2118]">
            <span className="w-3 h-3 rounded-full bg-green-500 border border-[#2B2118] animate-pulse"></span>
            <span>Sorted by lowest total trip cost (Goods + Travel)</span>
          </div>
          <button
            onClick={() => navigate('/shopping')}
            className="text-xs font-bold text-[#A24A32] hover:underline bg-[#EADFC7] px-3 py-1.5 rounded-lg border border-[#2B2118]"
          >
            Edit List ({itemCount})
          </button>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="bg-[#FBF6EA] border-[3px] border-[#2B2118] p-4 rounded-2xl shadow-[4px_4px_0_#2B2118] mb-6 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B4E3E]" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mandi by name, village, or goods (e.g. Kisan, Weekly, Sadar)..."
            className="w-full pl-10 pr-10 py-2.5 bg-white border-2 border-[#2B2118] rounded-xl text-sm font-bold text-[#2B2118] placeholder-[#5B4E3E]/60 focus:outline-none focus:ring-2 focus:ring-[#E3A83B]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B4E3E] hover:text-[#2B2118]"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-[#5B4E3E] uppercase tracking-wider text-[11px] flex items-center gap-1 mr-1">
            <Filter size={12} /> Filter:
          </span>
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-lg border-2 border-[#2B2118] transition-all ${
              filterType === 'ALL' 
                ? 'bg-[#2B2118] text-[#FBF6EA] shadow-[2px_2px_0_#E3A83B]' 
                : 'bg-[#EADFC7] text-[#2B2118] hover:bg-[#ded1b5]'
            }`}
          >
            All ({markets.length})
          </button>
          <button
            onClick={() => setFilterType('OPEN')}
            className={`px-3 py-1.5 rounded-lg border-2 border-[#2B2118] transition-all flex items-center gap-1 ${
              filterType === 'OPEN' 
                ? 'bg-[#4B6142] text-white shadow-[2px_2px_0_#2B2118]' 
                : 'bg-[#EADFC7] text-[#2B2118] hover:bg-[#ded1b5]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Open Now
          </button>
          <button
            onClick={() => setFilterType('WHOLESALE')}
            className={`px-3 py-1.5 rounded-lg border-2 border-[#2B2118] transition-all ${
              filterType === 'WHOLESALE' 
                ? 'bg-[#A24A32] text-white shadow-[2px_2px_0_#2B2118]' 
                : 'bg-[#EADFC7] text-[#2B2118] hover:bg-[#ded1b5]'
            }`}
          >
            Wholesale Mandis
          </button>
          <button
            onClick={() => setFilterType('HAAT')}
            className={`px-3 py-1.5 rounded-lg border-2 border-[#2B2118] transition-all ${
              filterType === 'HAAT' 
                ? 'bg-[#E3A83B] text-[#2B2118] shadow-[2px_2px_0_#2B2118]' 
                : 'bg-[#EADFC7] text-[#2B2118] hover:bg-[#ded1b5]'
            }`}
          >
            Weekly Haats
          </button>
          <button
            onClick={() => setFilterType('RETAIL')}
            className={`px-3 py-1.5 rounded-lg border-2 border-[#2B2118] transition-all ${
              filterType === 'RETAIL' 
                ? 'bg-[#2B2118] text-[#FBF6EA] shadow-[2px_2px_0_#E3A83B]' 
                : 'bg-[#EADFC7] text-[#2B2118] hover:bg-[#ded1b5]'
            }`}
          >
            Retail Bazaars
          </button>
        </div>

        {/* Results Counter */}
        <div className="text-xs font-bold text-[#5B4E3E] pt-1 border-t border-[#D9C9A3]/80 flex justify-between">
          <span>Showing {filteredMarkets.length} of {markets.length} mandis</span>
          {(searchQuery || filterType !== 'ALL') && (
            <button 
              onClick={() => { setSearchQuery(''); setFilterType('ALL'); }}
              className="text-[#A24A32] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Markets List */}
      {filteredMarkets.length === 0 ? (
        <div className="bg-[#FBF6EA] border-[3px] border-[#2B2118] p-8 rounded-2xl shadow-[4px_4px_0_#2B2118] text-center my-6">
          <Store size={48} className="mx-auto mb-3 text-[#A24A32] opacity-60" />
          <h4 className="font-black text-xl text-[#2B2118]">No mandis found</h4>
          <p className="text-xs text-[#5B4E3E] mt-1">Try searching with a different keyword or resetting your filter.</p>
          <button
            onClick={() => { setSearchQuery(''); setFilterType('ALL'); }}
            className="mt-4 bg-[#E3A83B] text-[#2B2118] text-xs font-black px-4 py-2 rounded-xl border-2 border-[#2B2118]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMarkets.map((market, idx) => {
            const isBest = isComparisonMode && idx === 0 && filterType === 'ALL' && !searchQuery;
            return (
              <motion.div 
                key={market.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.04, 0.3) }}
                className={`bg-[#FBF6EA] rounded-2xl p-5 border-[3px] border-[#2B2118] shadow-[5px_5px_0_#2B2118] flex flex-col justify-between relative overflow-hidden ${
                  isBest ? 'ring-2 ring-[#A24A32]' : ''
                }`}
              >
                {isBest && (
                  <div className="absolute top-0 right-0 bg-[#A24A32] text-[#FBF6EA] text-xs font-black px-4 py-1.5 rounded-bl-xl border-b-2 border-l-2 border-[#2B2118] tracking-wider uppercase flex items-center gap-1 shadow-sm">
                    ★ BEST PRICE
                  </div>
                )}
                
                <div>
                  <div className="flex justify-between items-start mb-2 pr-16">
                    <div>
                      <h3 className="font-black text-xl text-[#2B2118] leading-snug">{market.name}</h3>
                      <p className="text-xs text-[#5B4E3E] font-bold flex items-center mt-1">
                        <MapPin size={12} className="mr-1 text-[#4B6142]" /> 
                        {market.distance} km away • <span className="text-[#A24A32] ml-1">{market.type}</span>
                      </p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 my-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border border-[#2B2118] flex items-center gap-1 ${
                      market.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${market.isOpen ? 'bg-green-600' : 'bg-red-600'}`}></span>
                      {market.isOpen ? 'OPEN NOW' : 'CLOSED'}
                    </span>
                    <span className="text-xs font-medium bg-[#EADFC7] text-[#2B2118] px-2.5 py-1 rounded-lg border border-[#2B2118]">
                      {market.schedule}
                    </span>
                  </div>

                  {/* Comparison Breakdown if available */}
                  {isComparisonMode && market.itemDetails && (
                    <div className="bg-white p-3.5 rounded-xl mb-4 border-2 border-[#2B2118] shadow-[2px_2px_0_#2B2118]">
                      <div className="text-xs text-[#5B4E3E] font-black uppercase tracking-wider mb-2">Estimated Price Breakdown:</div>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {market.itemDetails.map((item, i) => (
                          <div key={i} className="flex justify-between text-xs items-center">
                            <span className="text-[#2B2118] font-medium truncate mr-2">
                              {item.quantity} {item.unit} {item.productName}
                            </span>
                            <span className="font-bold text-[#2B2118] whitespace-nowrap">₹{item.itemTotal}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-[#D9C9A3] flex justify-between items-center text-xs">
                        <span className="font-bold text-[#5B4E3E]">Goods Total:</span>
                        <span className="font-black text-[#2B2118]">₹{market.totalItemsCost}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-xs">
                        <span className="text-[#5B4E3E] font-medium">+ Travel Cost:</span>
                        <span className="text-[#5B4E3E] font-bold">₹{market.travelCost}</span>
                      </div>
                    </div>
                  )}

                  {/* Speciality description */}
                  <div className="bg-[#EADFC7] p-2.5 rounded-xl border border-[#2B2118] text-xs text-[#2B2118] mb-4 flex items-start gap-1.5">
                    <AlertCircle size={14} className="shrink-0 text-[#A24A32] mt-0.5" />
                    <span><strong>Speciality:</strong> {market.speciality}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex justify-between items-end pt-2 border-t border-[#D9C9A3]">
                  <div>
                    <div className="text-[11px] text-[#5B4E3E] uppercase font-bold tracking-wider">
                      {isComparisonMode ? 'Total Trip Cost' : 'Est. Travel Cost'}
                    </div>
                    <div className="text-2xl font-black text-[#A24A32] leading-none mt-0.5">
                      ₹{isComparisonMode ? market.estimatedTotalTripCost : market.travelCost}
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(market.name)}`, '_blank')}
                    className="bg-[#4B6142] hover:bg-[#3d5036] text-[#FBF6EA] text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 border-2 border-[#2B2118] shadow-[2px_2px_0_#2B2118] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  >
                    <Compass size={16} /> Navigate
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
