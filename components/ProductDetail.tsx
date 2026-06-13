"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Heart, Minus, Plus, Truck, X, MessageCircle, ChevronLeft } from "lucide-react";

export default function ProductDetail() {
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1531297172868-6cb31ee8000b?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000"
  ];

  return (
    <section className="w-full bg-white py-6 px-6 md:px-12 max-w-[1280px] mx-auto">
      {/* Back to Products */}
      <div className="mb-6">
        <a 
          href="/products" 
          className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-500 hover:text-black transition-colors group"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to products
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Images (Col span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-transparent rounded-2xl overflow-hidden p-6 flex items-center justify-center">
            <span className="absolute top-4 left-4 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">New</span>
            <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
              <Heart size={18} />
            </button>
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={images[activeImage]} 
              alt="Product Image" 
              className="w-full h-auto max-h-full object-contain drop-shadow-xl mix-blend-multiply"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`w-full aspect-square bg-transparent rounded-xl overflow-hidden border-2 transition-all p-2 ${activeImage === idx ? 'border-gray-900' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain mix-blend-multiply" />
              </button>
            ))}
          </div>
        </div>

        {/* Middle Column: Product Info (Col span 4) */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-yellow-400 text-sm">
              ★★★★★
            </div>
            <span className="text-gray-400 text-sm">(5)</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-sans font-bold text-gray-900 tracking-tight leading-snug mb-4">
            Pinnapple Macbook Pro 2022 M1 / 512GB Dark Grey
          </h1>
          
          <div className="text-3xl font-sans font-bold text-gray-900 mb-6">
            $579.00
          </div>
          
          <ul className="flex flex-col gap-2.5 mb-6 text-sm text-gray-600 font-sans leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
              Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
              DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
              Commanding Power Design: Twin 16+1+2 Phases Digital VRM
            </li>
          </ul>
          
          <div className="inline-block bg-green-50 text-green-600 text-xs font-bold px-3 py-1.5 rounded mb-6 w-max uppercase tracking-wider">
            Free Shipping
          </div>
          
          <hr className="border-gray-100 mb-6" />
          
          <div className="flex items-center gap-2 text-green-600 text-sm font-semibold mb-4">
            <Check size={16} strokeWidth={3} />
            In stock
          </div>
          
          <p className="text-sm font-bold text-gray-900 mb-3 uppercase">qty</p>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-200 rounded-lg w-32 h-12">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex-1 flex items-center justify-center text-gray-600 hover:text-black transition-colors">
                <Minus size={16} />
              </button>
              <span className="flex-1 text-center font-semibold text-gray-900">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="flex-1 flex items-center justify-center text-gray-600 hover:text-black transition-colors">
                <Plus size={16} />
              </button>
            </div>
            
            <button className="flex-grow bg-[#14A800] hover:bg-green-700 text-white font-sans font-bold text-sm tracking-wide px-6 h-12 rounded-lg transition-colors shadow-sm">
              ADD TO CART
            </button>
            
            <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors flex-shrink-0">
              <Heart size={18} className="fill-current text-gray-400" />
            </button>
          </div>
          
          <hr className="border-gray-100 mb-6" />
          
          <div className="flex flex-col gap-3 text-sm font-sans mb-8">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 min-w-[90px]">SKU:</span>
              <span className="text-gray-500">ABC025168</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 min-w-[90px]">CATEGORY:</span>
              <span className="text-gray-500">Cell Phones & Tablets</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 min-w-[90px]">TAGS:</span>
              <span className="text-gray-500">Laptop, Macbook, Computer, M1</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-black transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-black transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-5 1.55-5 4.5V8z"></path>
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-black transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-black transition-colors" aria-label="WhatsApp">
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Cart/Brand (Col span 3) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Brand Box */}
          <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center aspect-[4/3]">
            <p className="text-sm text-gray-500 font-medium self-start mb-4">Brand: <span className="font-bold text-gray-900">Sonex</span></p>
            <div className="flex-grow flex items-center justify-center w-full">
              <h2 className="text-4xl font-black italic tracking-tighter text-gray-900">sonex</h2>
            </div>
          </div>
          
          {/* Your Cart Box */}
          <div className="border border-green-500 rounded-2xl p-6 bg-white shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-6">Your Cart</h3>
            
            <div className="flex gap-4 mb-6 relative">
              <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center p-2 flex-shrink-0">
                <img src={images[0]} alt="Cart Item" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-gray-900 leading-tight pr-6">Pinnapple Macbook Pro 2022 M1/ 512GB</h4>
                <p className="text-sm text-gray-500 mt-1">3 x $579.00</p>
              </div>
              <button className="absolute top-0 right-0 text-gray-400 hover:text-red-500">
                <X size={16} />
              </button>
            </div>
            
            <hr className="border-gray-100 mb-6" />
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-500 font-medium text-sm">Sub Total:</span>
              <span className="text-gray-900 font-bold text-lg">$1,737.00</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="w-full py-3 rounded-lg bg-gray-900 hover:bg-black text-white font-bold text-xs tracking-wider transition-colors">
                VIEW CART
              </button>
              <button className="w-full py-3 rounded-lg bg-[#14A800] hover:bg-green-700 text-white font-bold text-xs tracking-wider transition-colors">
                CHECKOUT
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
            <Truck size={18} className="text-gray-900" />
            Ships from <span className="font-bold text-gray-900">United States</span>
          </div>
          
        </div>
      </div>
    </section>
  );
}
