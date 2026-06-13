"use client";

import { useState, useEffect } from "react";
import { Menu, ShoppingBag, X, Globe, DollarSign, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [lang, setLang] = useState("EN");
  const [currency, setCurrency] = useState("USD");

  const loadCart = () => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("glorious_cart") || "[]");
      setCartItems(cart);
      const totalItems = cart.reduce((total: number, item: any) => total + (item.quantity || 1), 0);
      setCartCount(totalItems);
    }
  };

  const loadCurrency = () => {
    if (typeof window !== "undefined") {
      const savedCurrency = localStorage.getItem("glorious_currency") || "USD";
      setCurrency(savedCurrency);
    }
  };

  useEffect(() => {
    loadCart();
    loadCurrency();
    window.addEventListener("cart-updated", loadCart);
    window.addEventListener("currency-changed", loadCurrency);
    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("currency-changed", loadCurrency);
    };
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "EN" ? "ID" : "EN"));
  };

  const toggleCurrency = () => {
    const newCurrency = currency === "USD" ? "IDR" : "USD";
    setCurrency(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem("glorious_currency", newCurrency);
      window.dispatchEvent(new Event("currency-changed"));
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);

    localStorage.setItem("glorious_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("glorious_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const formatPrice = (priceStr: string) => {
    const numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
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

  const getSubtotal = () => {
    const subtotalUSD = cartItems.reduce((sum, item) => {
      const val = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return sum + val * (item.quantity || 1);
    }, 0);
    return formatPrice(`$${subtotalUSD}`);
  };

  const checkoutWhatsApp = () => {
    let text = `Halo BaliCraft, saya ingin memesan produk kerajinan tangan berikut:\n\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.quantity}x) - ${formatPrice(item.price)}\n`;
    });
    text += `\n*Total*: ${getSubtotal()}`;
    text += `\n\nMohon informasi ketersediaan barang dan metode pembayaran. Matur Suksma!`;

    const url = `https://wa.me/628123456789?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 80, damping: 20 }}
      className="w-full bg-white z-40 relative border-b border-gray-100"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        {/* Left Side: Hamburger Menu */}
        <div className="flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-black hover:text-gray-600 transition-colors p-1 cursor-pointer focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Center: Brand Logo */}
        <a href="/" className="flex items-center gap-2.5 absolute left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm tracking-tighter">
            B
          </div>
          <span className="text-[20px] font-sans font-bold tracking-tight text-black">
            BaliCraft
          </span>
        </a>

        {/* Right Side: Switchers & Cart Icon */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Switcher - Styled as Circle */}
          <button
            onClick={toggleLanguage}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-[12px] font-sans font-bold text-black hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer bg-white"
            title="Switch Language"
          >
            {lang}
          </button>

          {/* Currency Switcher - Styled as Circle */}
          <button
            onClick={toggleCurrency}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-[11px] font-sans font-bold text-black hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer bg-white"
            title="Switch Currency"
          >
            {currency === "USD" ? "$" : "Rp"}
          </button>

          {/* Cart Icon in Circle Outline */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Cart"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer relative"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-sans font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Hamburger Drawer Menu (Desktop + Mobile) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100 bg-white py-4 px-6 absolute top-full left-0 w-full shadow-lg z-30"
          >
            <nav className="flex flex-col gap-4 max-w-[1280px] mx-auto">
              <a
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="text-[14px] font-sans font-medium text-black hover:text-gray-600 transition-colors py-2 border-b border-gray-50"
              >
                Products
              </a>
              <a
                href="/#about"
                onClick={() => setMobileOpen(false)}
                className="text-[14px] font-sans font-medium text-black hover:text-gray-600 transition-colors py-2 border-b border-gray-50"
              >
                About
              </a>
              <a
                href="/#faqs"
                onClick={() => setMobileOpen(false)}
                className="text-[14px] font-sans font-medium text-black hover:text-gray-600 transition-colors py-2"
              >
                FAQs
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar Panel */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col p-6 font-sans text-black"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} />
                  <h2 className="text-lg font-bold font-sans tracking-tight">Shopping Cart</h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-grow overflow-y-auto py-4 flex flex-col gap-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <span className="text-sm font-sans">Your cart is empty</span>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-[#F9F9F9] items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-200"
                      />
                      <div className="flex-grow flex flex-col gap-1">
                        <h3 className="text-sm font-bold text-black leading-snug">{item.name}</h3>
                        <span className="text-xs font-semibold text-gray-500">{formatPrice(item.price)}</span>
                        
                        {/* Qty Controls */}
                        <div className="flex items-center gap-2.5 mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity || 1}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2 cursor-pointer transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Checkout */}
              {cartItems.length > 0 && (
                <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-500">Subtotal</span>
                    <span className="text-base font-bold text-black">{getSubtotal()}</span>
                  </div>
                  <button
                    onClick={checkoutWhatsApp}
                    className="w-full py-3.5 bg-black hover:bg-gray-900 text-white font-sans font-bold text-xs tracking-wider rounded-full shadow-md transition-colors uppercase cursor-pointer text-center"
                  >
                    Checkout via WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

