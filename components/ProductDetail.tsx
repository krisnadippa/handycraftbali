"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Minus, Plus, ChevronLeft, ShoppingBag, ChevronDown, ChevronUp, Truck, Clock, Tag } from "lucide-react";
import { productsData } from "@/components/Products";

export default function ProductDetail({ product }: { product: typeof productsData[0] }) {
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isDescOpen, setIsDescOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(true);

  const images = (product as any).images || [product.image];

  const loadCurrency = () => {
    if (typeof window !== "undefined") {
      const savedCurrency = localStorage.getItem("glorious_currency") || "USD";
      setCurrency(savedCurrency);
    }
  };

  useEffect(() => {
    loadCurrency();
    window.addEventListener("currency-changed", loadCurrency);
    return () => window.removeEventListener("currency-changed", loadCurrency);
  }, []);

  useEffect(() => {
    setActiveImage(0);
  }, [product.id]);

  const getNumericPrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  };

  const formatPrice = (numeric: number) => {
    if (currency === "IDR") {
      const idrPrice = numeric * 15000;
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
      }).format(idrPrice);
    }
    return `$${numeric}`;
  };

  const unitPrice = getNumericPrice(product.price);
  const wholesalePrice = unitPrice * 0.8;
  const activeUnitPrice = qty >= 50 ? wholesalePrice : unitPrice;
  const totalPrice = activeUnitPrice * qty;

  const getEstimatedArrival = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 3);
    const end = new Date(today);
    end.setDate(today.getDate() + 5);
    
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${start.getDate()} - ${end.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`;
  };

  const addToCart = () => {
    if (typeof window !== "undefined") {
      const currentCart = JSON.parse(localStorage.getItem("glorious_cart") || "[]");
      const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);
      
      if (existingItemIndex > -1) {
        currentCart[existingItemIndex].quantity = (currentCart[existingItemIndex].quantity || 1) + qty;
      } else {
        currentCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: qty,
          size: selectedSize
        });
      }
      
      localStorage.setItem("glorious_cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cart-updated"));

      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }
  };

  const orderWhatsApp = () => {
    const text = `Halo BaliCraft, saya ingin memesan ${qty} pcs "${product.name}" (Ukuran: ${selectedSize}) dengan harga satuan ${formatPrice(activeUnitPrice)} (Total: ${formatPrice(totalPrice)}).\n\nMohon informasi ketersediaan barang dan metode pembayaran. Matur Suksma!`;
    const url = `https://wa.me/628123456789?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

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
        
        {/* Left Column: Image & Thumbnails (Col span 6) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="relative w-full aspect-square flex items-center justify-center">
            <img 
              src={images[activeImage]} 
              alt={product.name} 
              className="w-[80%] h-[80%] object-contain"
            />

            {/* Success overlay animation */}
            <AnimatePresence>
              {isAdded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10 text-white rounded-3xl"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg mb-2"
                  >
                    <Check size={20} strokeWidth={3} />
                  </motion.div>
                  <span className="font-sans font-bold text-xs tracking-wider uppercase">Added to Cart!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-3 justify-center">
              {images.map((img: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 bg-white rounded-2xl overflow-hidden border-2 transition-all p-2 shadow-sm cursor-pointer ${activeImage === idx ? 'border-gray-950 scale-105 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain rounded-xl" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info (Col span 6) */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-50 border border-gray-200 text-gray-600 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 tracking-tight leading-none mb-3">
            {product.name}
          </h1>

          {/* Pricing Info */}
          <div className="flex flex-col gap-1.5 mb-5">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-sans font-bold text-gray-900">
                {formatPrice(activeUnitPrice)}
              </span>
              <span className="text-xs text-gray-500 font-semibold">/ unit</span>
            </div>
            
            {/* Wholesale Pricing Info */}
            <div className="text-xs font-sans text-gray-500 font-medium">
              Grosir (Beli ≥ 50 pcs): <span className="font-bold text-gray-900">{formatPrice(wholesalePrice)} / unit</span>
            </div>
          </div>



          {/* Size Selector */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Pilih Ukuran</p>
            <div className="flex gap-2.5">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full font-sans font-semibold text-sm transition-all flex items-center justify-center cursor-pointer ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <p className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Jumlah (Qty)</p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Qty Selector */}
            <div className="flex items-center border border-gray-200 rounded-full w-32 h-12 bg-white">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))} 
                className="flex-1 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="flex-1 text-center font-semibold text-gray-900 text-sm">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)} 
                className="flex-1 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            
            {/* Add to Cart */}
            <button 
              onClick={addToCart}
              className="flex-grow sm:flex-grow-0 bg-black hover:bg-gray-800 text-white font-sans font-bold text-xs tracking-wider px-8 h-12 rounded-full transition-colors flex items-center justify-center gap-2 uppercase cursor-pointer"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>

            {/* Order Now (WhatsApp) */}
            <button 
              onClick={orderWhatsApp}
              className="flex-grow sm:flex-grow-0 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans font-bold text-xs tracking-wider px-8 h-12 rounded-full transition-colors flex items-center justify-center gap-2 uppercase cursor-pointer"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.175-1.356a9.92 9.92 0 004.833 1.258h.005c5.507 0 9.991-4.479 9.992-9.986.002-2.668-1.037-5.176-2.927-7.067A9.921 9.921 0 0012.012 2z" />
              </svg>
              Pesan Langsung
            </button>
          </div>
          
          {/* Description & Fit Accordion */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden mb-4 w-full">
            <button 
              onClick={() => setIsDescOpen(!isDescOpen)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50/50 transition-colors text-left"
            >
              <span className="font-sans font-bold text-xs text-gray-900 uppercase tracking-wider">Deskripsi & Detail</span>
              {isDescOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <AnimatePresence initial={false}>
              {isDescOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 text-sm text-gray-600 font-sans leading-relaxed border-t border-gray-50">
                    <p className="mb-2 text-xs">Kerajinan tangan tradisional buatan Bali dengan detail estetik tinggi buatan pengrajin lokal asli. Menggunakan bahan ramah lingkungan yang tahan lama.</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-[11px]">
                      <li>Bahan: Alami / Premium lokal Bali</li>
                      <li>100% Handmade / Buatan Tangan</li>
                      <li>Finishing halus ramah lingkungan</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Shipping Accordion */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden w-full">
            <button 
              onClick={() => setIsShippingOpen(!isShippingOpen)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50/50 transition-colors text-left"
            >
              <span className="font-sans font-bold text-xs text-gray-900 uppercase tracking-wider">Informasi Pengiriman</span>
              {isShippingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <AnimatePresence initial={false}>
              {isShippingOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 border-t border-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Item 1 */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 shrink-0">
                          <Tag size={14} />
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase font-bold">Diskon Grosir</p>
                          <p className="text-xs text-gray-900 font-semibold">Potongan 20%</p>
                        </div>
                      </div>
                      
                      {/* Item 2 */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 shrink-0">
                          <ShoppingBag size={14} />
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase font-bold">Kemasan</p>
                          <p className="text-xs text-gray-900 font-semibold">Peti Kayu Aman</p>
                        </div>
                      </div>
                      
                      {/* Item 3 */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 shrink-0">
                          <Clock size={14} />
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase font-bold">Waktu Kirim</p>
                          <p className="text-xs text-gray-900 font-semibold">1-3 Hari Kerja</p>
                        </div>
                      </div>
                      
                      {/* Item 4 */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 shrink-0">
                          <Truck size={14} />
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase font-bold">Estimasi Tiba</p>
                          <p className="text-xs text-gray-900 font-semibold">{getEstimatedArrival()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
