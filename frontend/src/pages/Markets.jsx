import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, AlertCircle, Store, ShoppingBag, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { compareMarkets, getAllMarkets } from '../services/api';

export default function Markets() {
  const navigate = useNavigate();
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [itemCount, setItemCount] = useState(0);

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
          // Sort browse mode by nearest distance
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

      {/* Banner */}
      {!isComparisonMode ? (
        <div className="bg-[#FBF6EA] border-[3px] border-[#2B2118] p-4 lg:p-5 rounded-2xl shadow-[4px_4px_0_#2B2118] mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
        <div className="bg-[#FBF6EA] border-[3px] border-[#2B2118] p-4 rounded-2xl shadow-[4px_4px_0_#2B2118] mb-6 flex items-center justify-between gap-3">
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

      {/* Markets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {markets.map((market, idx) => {
          const isBest = isComparisonMode && idx === 0;
          return (
            <motion.div 
              key={market.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.05, 0.4) }}
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
    </div>
  );
}
