import React, { useEffect, useState } from 'react';
import { MapPin, AlertCircle, TrendingDown, Store, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { compareMarkets } from '../services/api';

export default function Markets() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listEmpty, setListEmpty] = useState(false);

  useEffect(() => {
    const rawList = localStorage.getItem('kharido_list');
    if (!rawList) {
      setListEmpty(true);
      setLoading(false);
      return;
    }
    
    const shoppingList = JSON.parse(rawList);
    if (shoppingList.length === 0) {
      setListEmpty(true);
      setLoading(false);
      return;
    }

    compareMarkets(shoppingList)
      .then(data => {
        setMarkets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full pt-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-leaf-600"></div>
      </div>
    );
  }

  if (listEmpty) {
    return (
      <div className="p-6 text-center text-gray-500 mt-10">
        <Store size={48} className="mx-auto mb-4 opacity-20" />
        <p>No items in your shopping list.</p>
        <p className="text-sm">Go back to "List" and add items to compare markets.</p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Market Comparison</h2>
      <p className="text-gray-500 text-sm mb-6">Compare fair prices across nearby markets.</p>

      <div className="space-y-4">
        {markets.map((market, idx) => {
          const isBest = idx === 0;
          return (
            <motion.div 
              key={market.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white rounded-2xl p-4 shadow-sm border relative overflow-hidden ${
                isBest ? 'border-yellow-400 border-2' : 'border-gray-100'
              }`}
            >
              {isBest && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                  BEST PRICE
                </div>
              )}
              
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{market.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center mt-0.5">
                    <MapPin size={10} className="mr-1" /> {market.distance} km away • {market.type}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 my-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${market.isOpen ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {market.isOpen ? '● OPEN NOW' : '○ CLOSED'}
                </span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                  {market.schedule}
                </span>
              </div>

              <div className="bg-cream-50 p-3 rounded-xl mb-3 border border-cream-100">
                <div className="text-xs text-gray-600 font-medium mb-2">Estimated Fair Price Breakdown:</div>
                <div className="space-y-1.5">
                  {market.itemDetails.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs items-center">
                      <span className="text-gray-600 truncate mr-2">{item.quantity} {item.unit} {item.productName}</span>
                      <span className="font-medium text-gray-800 whitespace-nowrap">₹{item.itemTotal}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-cream-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-600">Goods Total:</span>
                  <span className="font-bold text-sm text-gray-800">₹{market.totalItemsCost}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[10px] text-gray-500">+ Est. Travel Cost:</span>
                  <span className="text-[10px] text-gray-500">₹{market.travelCost}</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Total Trip Cost</div>
                  <div className="text-2xl font-black text-terracotta-600 leading-none">₹{market.estimatedTotalTripCost}</div>
                </div>
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(market.name)}`, '_blank')}
                  className="bg-leaf-600 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1 shadow-sm hover:bg-leaf-700 active:scale-95 transition-transform"
                >
                  <MapPin size={14} /> Navigate
                </button>
              </div>

              <div className="mt-3 text-[10px] text-gray-500 flex items-start gap-1.5 bg-gray-50 p-2 rounded">
                <AlertCircle size={12} className="shrink-0 text-gray-400 mt-0.5" />
                <span><strong>Speciality:</strong> {market.speciality}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
