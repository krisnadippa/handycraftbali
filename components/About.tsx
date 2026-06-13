"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="w-full bg-white py-12 px-6 md:px-12 max-w-[1280px] mx-auto">
      {/* Exclusive Fashion Offers Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring" as const, stiffness: 80, damping: 20 }}
        className="bg-[#D8C3BC] rounded-[2rem] md:rounded-[2.5rem] py-10 md:py-12 px-6 md:px-12 flex flex-col items-center justify-center text-center shadow-sm"
      >
        
        {/* Offers Pill */}
        <span className="border border-black px-5 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-black bg-transparent mb-4">
          Offers
        </span>
        
        {/* Headings */}
        <h2 className="text-black text-3xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight uppercase leading-tight max-w-[90%]">
          EXCLUSIVE FASHION OFFERS
        </h2>
        <h2 className="text-black text-3xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight uppercase leading-tight max-w-[90%] mt-1">
          AWAIT FOR YOUR
        </h2>
        
        {/* CHECK IT NOW Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-white text-black font-sans font-bold text-xs md:text-sm tracking-wider px-6 py-3.5 rounded-full flex items-center gap-3 shadow-md hover:bg-gray-100 transition-colors uppercase cursor-pointer"
        >
          Check It Now
          <span className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white">
            <ArrowRight size={14} className="stroke-[2.5]" />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
