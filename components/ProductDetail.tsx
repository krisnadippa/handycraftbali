"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Minus, Plus, ChevronLeft, ShoppingBag, ChevronDown, ChevronUp, Truck, Clock, Tag } from "lucide-react";
import { productsData } from "@/components/Products";

function DetailImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    // If browser already loaded/cached it, mark as loaded
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-100 animate-pulse rounded-3xl" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-[80%] h-[80%] object-contain transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function ProductDetail({ product }: { product: typeof productsData[0] }) {
  const [qty, setQty] = useState<number | "">(1);
  const [activeImage, setActiveImage] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Natural");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
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
  const activeUnitPrice = (Number(qty) || 1) >= 50 ? wholesalePrice : unitPrice;
  const totalPrice = activeUnitPrice * (Number(qty) || 1);

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
      const existingItemIndex = currentCart.findIndex(
        (item: any) => item.id === product.id && item.size === selectedSize && item.color === selectedColor
      );
      
      if (existingItemIndex > -1) {
        currentCart[existingItemIndex].quantity = (currentCart[existingItemIndex].quantity || 1) + (Number(qty) || 1);
        const updatedItem = currentCart.splice(existingItemIndex, 1)[0];
        currentCart.unshift(updatedItem);
      } else {
        currentCart.unshift({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: Number(qty) || 1,
          size: selectedSize,
          color: selectedColor
        });
      }
      
      localStorage.setItem("glorious_cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cart-updated"));

      // Trigger Success Toast
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 2000);

      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }
  };

  const orderWhatsApp = () => {
    const text = `Halo BaliCraft, saya ingin memesan ${Number(qty) || 1} pcs "${product.name}" (Ukuran: ${selectedSize}, Warna: ${selectedColor}) dengan harga satuan ${formatPrice(activeUnitPrice)} (Total: ${formatPrice(totalPrice)}).\n\nMohon informasi ketersediaan barang dan metode pembayaran. Matur Suksma!`;
    const url = `https://wa.me/6281339711438?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <>
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
            <DetailImage 
              src={images[activeImage]} 
              alt={product.name} 
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
              {Number(qty) >= 50 ? (
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-3xl font-sans font-bold text-green-600">
                    {formatPrice(wholesalePrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(unitPrice)}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold font-normal">/ unit</span>
                  <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ml-1">
                    Grosir 20% Off
                  </span>
                </div>
              ) : (
                <>
                  <span className="text-3xl font-sans font-bold text-gray-900">
                    {formatPrice(activeUnitPrice)}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">/ unit</span>
                </>
              )}
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

          {/* Color Selector */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Pilih Warna</p>
            <div className="flex items-center gap-3">
              {[
                { name: "Natural", class: "bg-[#D9B48F]" },
                { name: "Hitam", class: "bg-[#1A1A1A]" },
                { name: "Terracotta", class: "bg-[#C86446]" },
                { name: "White Wash", class: "bg-[#EAE8E4] border border-gray-300" }
              ].map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`relative w-10 h-10 rounded-full cursor-pointer transition-all flex items-center justify-center ${color.class} ${
                    selectedColor === color.name ? "ring-2 ring-black ring-offset-2 scale-105" : "hover:scale-105"
                  }`}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <Check size={14} className={color.name === "White Wash" ? "text-black" : "text-white"} />
                  )}
                </button>
              ))}
              <span className="text-xs font-semibold text-gray-500 ml-1">
                {selectedColor}
              </span>
            </div>
          </div>
          
          <p className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Jumlah (Qty)</p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Qty Selector */}
            <div className="flex items-center border border-gray-200 rounded-full w-32 h-12 bg-white">
              <button 
                onClick={() => setQty(Math.max(1, (Number(qty) || 1) - 1))} 
                className="flex-1 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
              >
                <Minus size={14} />
              </button>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setQty("");
                  } else {
                    const parsed = parseInt(val, 10);
                    setQty(isNaN(parsed) ? 1 : Math.max(1, parsed));
                  }
                }}
                onBlur={() => {
                  if (qty === "" || qty < 1) {
                    setQty(1);
                  }
                }}
                className="w-12 text-center font-semibold text-gray-900 text-[16px] focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-0 p-0"
              />
              <button 
                onClick={() => setQty((Number(qty) || 1) + 1)} 
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
                  <div className="p-4 pt-4 text-sm text-gray-600 font-sans leading-relaxed border-t border-gray-50">
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
                  <div className="p-4 pt-4 border-t border-gray-50">
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

    {/* Premium Success Toast */}
    <AnimatePresence>
      {showSuccessToast && (
        <>
          {/* Dark blur backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[9998]"
          />
          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: "-40%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: "-40%", x: "-50%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 z-[9999] bg-white/95 backdrop-blur-md border border-gray-100 p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center gap-4 text-center max-w-[90%] w-[320px] text-black font-sans"
          >
            {/* Animated Cart & Green Checkmark */}
            <div className="relative w-16 h-16 bg-[#E8F8F0] rounded-full flex items-center justify-center shrink-0">
              <ShoppingBag size={28} className="text-[#25D366]" />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="absolute -top-1 -right-1 bg-[#25D366] text-white w-7 h-7 rounded-full flex items-center justify-center border-4 border-white shadow-md"
              >
                <motion.svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.polyline
                    points="20 6 9 17 4 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  />
                </motion.svg>
              </motion.div>
            </div>
            
            <div className="flex flex-col gap-1.5 mt-2">
              <h4 className="text-base font-bold text-gray-900 uppercase tracking-wider">Added to Cart!</h4>
              <p className="text-xs font-medium text-gray-500 leading-relaxed">Produk berhasil dimasukkan ke keranjang belanja Anda</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
