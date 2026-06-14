"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ProductHero() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [selectedSort, setSelectedSort] = useState("New Arrivals");

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search");
      if (searchParam && searchInputRef.current) {
        if (searchParam === "focus") {
          setTimeout(() => {
            if (searchInputRef.current) searchInputRef.current.focus();
          }, 300);
        } else {
          searchInputRef.current.value = searchParam;
          window.dispatchEvent(new CustomEvent("search-products", { detail: searchParam }));
        }
      }

      const sortParam = params.get("sort");
      if (sortParam) {
        const matchingOption = ["New Arrivals", "Best Sellers", "Top Rated", "Promo & Discounts"].find(
          (opt) => opt.toLowerCase() === sortParam.toLowerCase()
        );
        if (matchingOption) {
          setSelectedSort(matchingOption);
        }
      }

      const catParam = params.get("category");
      if (catParam) {
        const matchingCat = [
          { name: "All Categories", val: "ALL" },
          { name: "Interior Decor", val: "INTERIOR" },
          { name: "Lampu Anyaman", val: "LAMP" },
          { name: "Vas Keramik", val: "VAS" },
          { name: "Ukir Kayu", val: "WOOD" }
        ].find((cat) => cat.val.toLowerCase() === catParam.toLowerCase());
        if (matchingCat) {
          setSelectedCategory(matchingCat.name);
        }
      }
    }
  }, []);

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
        className="flex flex-col gap-6 w-full mt-4"
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
                ref={searchInputRef}
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

        {/* Product Hero Banner Card */}
        <motion.div
          variants={itemVariants}
          className="relative w-full aspect-[2/1] sm:aspect-[2.5/1] md:aspect-[3/1] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm"
        >
        {/* Background Image */}
        <motion.img
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8 }}
          src="/images/productpage.png"
          alt="Our Product"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Thin overlay to ensure contrast */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 pointer-events-none">
          <motion.h1 
            variants={itemVariants}
            className="text-white text-3xl sm:text-5xl md:text-6xl font-sans font-semibold tracking-tight leading-tight"
          >
            Our Product
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-white/90 text-sm md:text-base font-sans max-w-[80%] md:max-w-[45%] mt-3 leading-relaxed font-light"
          >
            Explore our exclusive collection of handcrafted items.
          </motion.p>
        </div>
      </motion.div>
      </motion.div>
    </section>
  );
}
