"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function ProductDescription() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="w-full bg-white py-12 px-6 md:px-12 max-w-[1280px] mx-auto border-t border-gray-100 mt-10">
      <div className="flex flex-col">
        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
          {["description", "additional information"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
                activeTab === tab ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="text-gray-600 leading-relaxed font-sans text-sm md:text-base max-w-4xl">
          {activeTab === "description" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <p>
                Produk kerajinan tangan otentik khas Bali yang dibuat langsung oleh pengrajin lokal berpengalaman. Desain premium dengan sentuhan budaya tradisional Bali yang khas untuk mempercantik ruangan Anda.
              </p>
              <p>
                Dibuat menggunakan bahan baku alami pilihan berkualitas tinggi (kayu, anyaman bambu, kuningan, dll) dengan teknik pembuatan presisi tinggi yang diwariskan secara turun-temurun. Setiap produk adalah karya seni yang unik dan memiliki nilai estetika tinggi.
              </p>
            </motion.div>
          )}
          
          {activeTab === "additional information" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <table className="w-full text-sm text-left">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-bold text-gray-900 w-1/4">Origin</td>
                    <td className="py-3 text-gray-500">Bali, Indonesia</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-bold text-gray-900">Material</td>
                    <td className="py-3 text-gray-500">Alami & Ramah Lingkungan</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-bold text-gray-900">Crafting</td>
                    <td className="py-3 text-gray-500">100% Handmade</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
