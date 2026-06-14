"use client";

import { useState } from "react";
import { ChevronDown, Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Hero() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [selectedSort, setSelectedSort] = useState("New Arrivals");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 20 },
    },
  };

  return (
    <section className="w-full bg-white pb-12 pt-4 px-6 md:px-12 max-w-[1280px] mx-auto flex flex-col gap-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col gap-6 w-full"
      >
        {/* 1. Filter & Search Row */}
        <motion.div variants={itemVariants} className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-2 bg-white">
          {/* Left filters: dropdowns */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full md:w-auto">
            {/* Categories Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setCategoriesOpen(!categoriesOpen);
                  setSortOpen(false);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-sans font-medium hover:bg-gray-50 transition-colors cursor-pointer bg-white"
              >
                {selectedCategory}
                <ChevronDown size={16} className={`text-gray-500 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {categoriesOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setCategoriesOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mt-2 w-56 rounded-2xl bg-white border border-gray-100 shadow-xl py-2 z-20 flex flex-col"
                    >
                      {[
                        { name: "All Categories", val: "ALL" },
                        { name: "Interior Decor", val: "INTERIOR" },
                        { name: "Lampu Anyaman", val: "LAMP" },
                        { name: "Vas Keramik", val: "VAS" },
                        { name: "Ukir Kayu", val: "WOOD" }
                      ].map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setCategoriesOpen(false);
                            if (typeof window !== "undefined") {
                              if (window.location.pathname !== "/products") {
                                window.location.href = `/products?category=${cat.val.toLowerCase()}`;
                              } else {
                                const newUrl = `${window.location.pathname}?category=${cat.val.toLowerCase()}`;
                                window.history.pushState({}, "", newUrl);
                                window.dispatchEvent(new CustomEvent("filter-category", { detail: cat.val }));
                              }
                            }
                          }}
                          className="px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors font-sans w-full cursor-pointer"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            {/* New Arrivals/Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setSortOpen(!sortOpen);
                  setCategoriesOpen(false);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-sans font-medium hover:bg-gray-50 transition-colors cursor-pointer bg-white"
              >
                {selectedSort}
                <ChevronDown size={16} className={`text-gray-500 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mt-2 w-56 rounded-2xl bg-white border border-gray-100 shadow-xl py-2 z-20 flex flex-col"
                    >
                      {["New Arrivals", "Best Sellers", "Top Rated", "Promo & Discounts"].map((sortOption) => (
                        <button
                          key={sortOption}
                          onClick={() => {
                            setSelectedSort(sortOption);
                            setSortOpen(false);
                            if (typeof window !== "undefined") {
                              if (window.location.pathname !== "/products") {
                                window.location.href = `/products?sort=${sortOption.toLowerCase()}`;
                              } else {
                                const newUrl = `${window.location.pathname}?sort=${sortOption.toLowerCase()}`;
                                window.history.pushState({}, "", newUrl);
                                window.dispatchEvent(new CustomEvent("filter-sort", { detail: sortOption }));
                              }
                            }
                          }}
                          className="px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors font-sans w-full cursor-pointer"
                        >
                          {sortOption}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Right: Search Input */}
          <div className="relative w-full md:w-80 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[380px] md:max-w-none">
              <input
                type="text"
                placeholder="Search"
                onFocus={() => {
                  if (typeof window !== "undefined" && window.location.pathname !== "/products") {
                    window.location.href = "/products?search=focus";
                  }
                }}
                onChange={(e) => {
                  if (typeof window !== "undefined" && window.location.pathname === "/products") {
                    window.dispatchEvent(new CustomEvent("search-products", { detail: e.target.value }));
                  }
                }}
                className="w-full pl-5 pr-12 py-2.5 rounded-full border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              />
              <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </motion.div>

        {/* 2. Main Hero Banner Card */}
        <motion.div variants={itemVariants} className="relative w-full aspect-[1.1/1] sm:aspect-[1.5/1] md:aspect-[2997/1344] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm bg-gray-50">
          {/* Background Image */}
          <motion.img
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.8 }}
            src="/images/herosect.png"
            alt="Premium Balinese Art & Crafts"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ imageRendering: "auto" }}
          />
          
          {/* Thin overlay to ensure contrast */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 pointer-events-none">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-sans font-medium tracking-tight leading-tight max-w-[90%] md:max-w-[80%]"
            >
              Premium Balinese Art & Crafts
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white/90 text-[13px] sm:text-sm md:text-base font-sans max-w-[85%] md:max-w-[45%] mt-4 leading-relaxed"
            >
              Jelajahi keindahan seni tradisional Bali. Produk kerajinan tangan otentik langsung dari pengrajin terbaik di pulau dewata.
            </motion.p>
            
            {/* Explore Product Button */}
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5, type: "spring" as const }}
              className="mt-6 md:mt-8 bg-white text-black font-sans font-semibold text-xs md:text-sm tracking-wider px-6 py-3.5 rounded-full flex items-center gap-3 shadow-md hover:bg-gray-100 transition-colors uppercase cursor-pointer pointer-events-auto"
            >
              Lihat Produk
              <span className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white">
                <ArrowRight size={14} className="stroke-[2.5]" />
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* 3. Bottom Grid Cards */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Left Card: Ukir Kayu Estetik */}
          <motion.div variants={itemVariants} whileHover={{ y: -3 }} className="bg-[#E6D6C6] rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 h-[180px] md:h-[200px] relative overflow-hidden flex flex-col justify-between group shadow-sm cursor-pointer">
            <div className="max-w-[55%] z-10">
              <h2 className="text-base sm:text-xl md:text-2xl font-sans font-medium tracking-tight text-gray-900 leading-snug">
                Ukir Kayu Estetik
              </h2>
            </div>
            
            <div className="self-start z-10">
              <button className="bg-white text-black font-sans font-semibold text-xs px-5 py-2.5 rounded-full shadow-sm group-hover:bg-black group-hover:text-white transition-all cursor-pointer">
                Shop Now
              </button>
            </div>
            
            {/* Vas image aligned to the right-bottom, optimized for mobile */}
            <img
              src="/images/vas.png"
              alt="Ukir Kayu Estetik"
              className="absolute right-2 md:right-8 bottom-[-8px] md:bottom-[-15px] h-[125%] md:h-[145%] w-[48%] md:w-[58%] object-contain object-right-bottom transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Right Card: Lampu Anyaman Bambu */}
          <motion.div variants={itemVariants} whileHover={{ y: -3 }} className="bg-[#D8CBC3] rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 h-[180px] md:h-[200px] relative overflow-hidden flex flex-col justify-between group shadow-sm cursor-pointer">
            <div className="max-w-[55%] z-10">
              <h2 className="text-base sm:text-xl md:text-2xl font-sans font-medium tracking-tight text-gray-900 leading-snug">
                Lampu Anyaman Bambu
              </h2>
            </div>
            
            <div className="self-start z-10">
              <button className="bg-white text-black font-sans font-semibold text-xs px-5 py-2.5 rounded-full shadow-sm group-hover:bg-black group-hover:text-white transition-all cursor-pointer">
                Shop Now
              </button>
            </div>
            
            {/* Lamp image aligned to the top-right, optimized for mobile */}
            <img
              src="/images/lamp.png"
              alt="Lampu Anyaman Bambu"
              className="absolute right-[-5px] md:right-[-20px] top-[-20px] md:top-[-45px] h-[125%] md:h-[145%] w-[48%] md:w-[58%] object-contain object-top transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
