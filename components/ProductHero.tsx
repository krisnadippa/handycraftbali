"use client";

import { ChevronDown, Search } from "lucide-react";
import { motion } from "motion/react";

export default function ProductHero() {
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
