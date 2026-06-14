"use client";

import { motion } from "motion/react";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <footer className="w-full bg-white pt-16 pb-8 px-6 md:px-12 relative overflow-hidden font-sans border-t border-gray-100">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-[1280px] mx-auto flex flex-col gap-12 relative z-10"
      >
        {/* Top Section: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-6 gap-y-10 md:gap-10">
          
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-2 lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <img 
                src="/images/logo3.png" 
                alt="AquariusBaliCraft Logo" 
                className="w-12 h-12 object-contain shrink-0"
              />
              <span className="text-2xl font-bold tracking-tight text-[#0f172a]">
                AquariusBaliCraft
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">
              AquariusBaliCraft adalah toko kerajinan tangan terpercaya Anda di Bali. Menyediakan produk kerajinan berkualitas tinggi khas Bali untuk mempercantik ruangan Anda.
            </p>
          </motion.div>

          {/* Column 2: Support Links */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-5">
            <span className="text-base font-bold text-[#0f172a]">
              Support
            </span>
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Support Center</a>
              <a href="#faqs" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">FAQs</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Troubleshooting</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Feedback</a>
            </nav>
          </motion.div>

          {/* Column 3: Company Links */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-5">
            <span className="text-base font-bold text-[#0f172a]">
              Company
            </span>
            <nav className="flex flex-col gap-4">
              <a href="#about" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">About Us</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Careers</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Blog</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </motion.div>

          {/* Column 4: Legal Links */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-5">
            <span className="text-base font-bold text-[#0f172a]">
              Legal
            </span>
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Cookie Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Compliance</a>
            </nav>
          </motion.div>

          {/* Column 5: Newsletter & Social */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-2 lg:col-span-2 flex flex-col gap-6 items-start">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center bg-white border border-gray-200 p-1.5 rounded-full w-full sm:w-auto min-w-[260px] focus-within:border-gray-400 transition-colors shadow-sm"
            >
              <input
                type="email"
                required
                placeholder="Type your email"
                className="w-full bg-transparent text-sm text-gray-700 focus:outline-none placeholder-gray-400 px-4 py-1"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#0f172a] hover:bg-black text-white font-semibold text-sm py-2.5 px-6 rounded-full transition-colors cursor-pointer"
              >
                Subscribe
              </motion.button>
            </form>

            <div className="flex items-center gap-3 w-full justify-start text-gray-600">
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:text-blue-600 hover:border-blue-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:text-blue-600 hover:border-blue-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:text-blue-600 hover:border-blue-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:text-blue-600 hover:border-blue-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </motion.a>
            </div>
          </motion.div>

        </div>

        {/* Bottom Section: Copyright */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12 border-t border-gray-100 mt-8">
          <p className="text-sm text-gray-500 font-medium">
            Copyright © AquariusBaliCraft 2026
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-[#0f172a] font-medium transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#0f172a] font-medium transition-colors">Terms Of Use</a>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
}

