import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowRight, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCategories, getProducts } from '../services/api';

export default function ShoppingList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedProd, setSelectedProd] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const [list, setList] = useState([]);

  useEffect(() => {
    getCategories().then(data => setCategories(data));
  }, []);

  useEffect(() => {
    if (selectedCat) {
      getProducts(selectedCat).then(data => setProducts(data));
      setSelectedProd('');
    } else {
      setProducts([]);
    }
  }, [selectedCat]);

  const addItem = () => {
    if (!selectedProd) return;
    const prodDetails = products.find(p => p.id === selectedProd);
    if (!prodDetails) return;
    
    setList([...list, { 
      productId: prodDetails.id, 
      name: prodDetails.name,
      unit: prodDetails.unit,
      quantity: Number(quantity) 
    }]);
    
    // Reset selections
    setSelectedProd('');
    setQuantity(1);
  };

  const removeItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleCompare = () => {
    localStorage.setItem('kharido_list', JSON.stringify(list));
    navigate('/markets');
  };

  const activeProduct = products.find(p => p.id === selectedProd);

  return (
    <div className="p-5 pb-12 flex flex-col h-full relative">
      <h2 className="text-4xl text-[#2B2118] mb-1" style={{ fontFamily: "'Yatra One', cursive" }}>Bazaar List</h2>
      <p className="text-[#5B4E3E] text-sm mb-6 font-bold">Add items to compare market prices.</p>
      
      <div className="bg-[#FBF6EA] border-[3px] border-[#2B2118] p-5 rounded-[1.5rem] shadow-[6px_6px_0px_#2B2118] mb-6 flex flex-col gap-4 relative z-10">
        <div className="absolute -top-3 left-6 w-8 h-3 bg-[#EADFC7] rounded-sm transform -rotate-2 border border-[#2B2118] opacity-80 shadow-sm"></div>
        
        <div>
          <label className="text-xs font-black uppercase tracking-wider text-[#A24A32] mb-1.5 block">1. Select Category</label>
          <select 
            className="w-full bg-white border-2 border-[#2B2118] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E3A83B] font-bold text-[#2B2118] shadow-[2px_2px_0_#2B2118] appearance-none"
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
          >
            <option value="">-- Choose Category --</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {selectedCat && (
          <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}}>
            <label className="text-xs font-black uppercase tracking-wider text-[#A24A32] mb-1.5 block mt-3">2. Select Product</label>
            <select 
              className="w-full bg-white border-2 border-[#2B2118] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E3A83B] font-bold text-[#2B2118] shadow-[2px_2px_0_#2B2118] appearance-none"
              value={selectedProd}
              onChange={(e) => setSelectedProd(e.target.value)}
            >
              <option value="">-- Choose Item --</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </motion.div>
        )}

        {selectedProd && (
          <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="flex items-end gap-3 mt-3">
            <div className="flex-1">
              <label className="text-xs font-black uppercase tracking-wider text-[#A24A32] mb-1.5 block">Quantity</label>
              <div className="flex bg-white border-2 border-[#2B2118] rounded-xl overflow-hidden shadow-[2px_2px_0_#2B2118]">
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={e => setQuantity(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 font-bold focus:outline-none text-[#2B2118]"
                />
                <div className="bg-[#EADFC7] flex items-center px-4 font-bold text-[#5B4E3E] border-l-2 border-[#2B2118]">
                  {activeProduct?.unit}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <button 
          onClick={addItem}
          disabled={!selectedProd}
          className="w-full bg-[#E3A83B] text-[#2B2118] font-black p-3.5 rounded-xl flex justify-center items-center gap-2 border-[3px] border-[#2B2118] shadow-[4px_4px_0_#2B2118] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          <Plus size={22} strokeWidth={3} /> Add to List
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4 hide-scrollbar">
        <h3 className="font-black text-[#2B2118] mb-4 text-lg uppercase tracking-wider flex items-center gap-2">
          Your List 
          <span className="bg-[#4B6142] text-white text-xs px-2 py-0.5 rounded-full border border-[#2B2118]">{list.length}</span>
        </h3>
        
        {list.length === 0 ? (
          <div className="text-center text-[#5B4E3E] mt-10 opacity-70 flex flex-col items-center">
            <ListChecks size={56} className="mb-4 text-[#A24A32]" />
            <p className="font-bold text-lg">Your bag is empty.</p>
            <p className="text-sm">Start adding items above!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {list.map((item, idx) => (
              <li key={idx} className="bg-white p-4 rounded-xl shadow-[4px_4px_0_#EADFC7] border-[3px] border-[#2B2118] flex justify-between items-center relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#A24A32] border-r-[3px] border-[#2B2118]"></div>
                <div className="pl-5">
                  <span className="font-black text-[#2B2118] text-lg block">{item.name}</span>
                  <span className="text-xs text-[#2B2118] font-bold bg-[#E3A83B] px-2 py-0.5 rounded-md mt-1 inline-block border border-[#2B2118]">
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <button 
                  onClick={() => removeItem(idx)}
                  className="text-[#FBF6EA] bg-[#A24A32] p-2.5 rounded-lg border-2 border-[#2B2118] shadow-[2px_2px_0_#2B2118] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                >
                  <Trash2 size={20} strokeWidth={2.5} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {list.length > 0 && (
        <div className="pt-2">
          <button 
            onClick={handleCompare}
            className="w-full bg-[#4B6142] text-[#FBF6EA] font-black p-4 rounded-[1.5rem] border-[3px] border-[#2B2118] shadow-[4px_4px_0_#2B2118] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 text-lg"
          >
            Find Cheapest Market <ArrowRight size={22} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
}
