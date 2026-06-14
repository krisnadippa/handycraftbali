"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

const categories = [
  {
    name: "INTERIOR",
    image: "/images/ctg1.jpg",
    bgColor: "bg-[#EFEFEF]",
  },
  {
    name: "LAMP",
    image: "/images/ctg2.webp",
    bgColor: "bg-[#E9E4DE]",
  },
  {
    name: "VAS",
    image: "/images/ctg3.jpg",
    bgColor: "bg-[#E2DFDC]",
  },
  {
    name: "WOOD",
    image: "/images/ctg4.jpg",
    bgColor: "bg-[#F0ECE7]",
  },
];

function CategoryImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className="absolute inset-0 w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function Categories() {
  const [activeTab, setActiveTab] = useState("ALL");

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
    <section className="w-full bg-white py-12 px-6 md:px-12 max-w-[1280px] mx-auto flex flex-col gap-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col gap-8 w-full"
      >
        {/* Header Row */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-black">
            Browse by categories
          </h2>
          
          {/* Filters */}
          <div className="flex items-center gap-2">
            {["ALL", "WOMAN", "CHILDREN"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-black hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grid of 4 Cards */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {categories.map((cat) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              key={cat.name}
              className={`group rounded-[2rem] p-6 relative overflow-hidden flex flex-col justify-end aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] shadow-sm cursor-pointer ${cat.bgColor}`}
            >
              <CategoryImage
                src={cat.image}
                alt={cat.name}
              />
              
              {/* White Label Pill at bottom left */}
              <div className="relative z-10 self-start">
                <span className="bg-white text-black font-sans font-bold text-xs tracking-wider px-5 py-2.5 rounded-full shadow-sm">
                  {cat.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
