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
          {["description", "additional information", "reviews (3)"].map((tab) => (
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
                The new Pinnapple Macbook Pro delivers game-changing performance for pro users. With the powerful M1 chip to supercharge pro-level workflows while getting amazing battery life, it's the ultimate pro notebook.
              </p>
              <p>
                Featuring a brilliant Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional performance of the M1 architecture to a whole new level for pro users.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-500">
                <li>Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU, and machine learning performance</li>
                <li>Up to 10-core CPU delivers up to 3.7x faster performance to fly through pro workflows quicker than ever</li>
                <li>Up to 32-core GPU with up to 13x faster performance for graphics-intensive apps and games</li>
                <li>16-core Neural Engine for up to 11x faster machine learning performance</li>
                <li>Longer battery life, up to 17 hours</li>
              </ul>
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
                    <td className="py-3 font-bold text-gray-900 w-1/4">Weight</td>
                    <td className="py-3 text-gray-500">1.6 kg</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-bold text-gray-900">Dimensions</td>
                    <td className="py-3 text-gray-500">31.26 × 22.12 × 1.55 cm</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-bold text-gray-900">Color</td>
                    <td className="py-3 text-gray-500">Dark Grey, Silver</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-bold text-gray-900">Storage</td>
                    <td className="py-3 text-gray-500">512GB, 1TB, 2TB</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === "reviews (3)" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-500 italic">Customer reviews will appear here.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
