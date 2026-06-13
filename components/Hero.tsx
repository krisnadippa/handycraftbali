"use client";

import { ChevronDown, Search, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
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
        <motion.div variants={itemVariants} className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 bg-white">
          {/* Left filters: dropdowns and search */}
          <div className="flex flex-wrap items-center gap-3 flex-grow max-w-full md:max-w-[70%]">
            {/* Categories Dropdown */}
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-sans font-medium hover:bg-gray-50 transition-colors cursor-pointer bg-white">
              Categories
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {/* New Product Dropdown */}
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-sans font-medium hover:bg-gray-50 transition-colors cursor-pointer bg-white">
              New Product
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {/* Search Input */}
            <div className="relative flex-grow min-w-[220px] max-w-[380px]">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-5 pr-12 py-2.5 rounded-full border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              />
              <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          
          {/* Right filters: Category pills */}
          <div className="flex flex-wrap items-center gap-2">
            {["Men", "Women", "Children", "Brands"].map((tag) => (
              <button
                key={tag}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-sans font-medium hover:border-black hover:text-black transition-colors cursor-pointer bg-white"
              >
                {tag}
              </button>
            ))}
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
