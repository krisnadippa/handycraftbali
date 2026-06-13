"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship our authentic Bali handicrafts worldwide. Shipping costs and delivery times vary depending on the destination.",
  },
  {
    question: "Are the products genuinely handmade in Bali?",
    answer: "Absolutely. All our products are crafted by skilled local artisans in Bali, ensuring authenticity and supporting the local community.",
  },
  {
    question: "Can I request custom-made items?",
    answer: "Yes, we accept custom orders for certain products like wooden carvings and furniture. Please contact our support team for more details.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for items that arrive damaged or defective. Please refer to our Legal section for full terms and conditions.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    <section id="faqs" className="w-full bg-white py-16 px-6 md:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-3xl mx-auto flex flex-col items-center justify-center"
      >
        <motion.div variants={itemVariants} className="w-full text-center flex flex-col items-center mb-10">
          <p className="text-black text-sm font-sans font-bold uppercase tracking-wider mb-2">FAQ's</p>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-black mb-4">
            Looking for answers?
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-lg leading-relaxed">
            Find quick answers to common questions about our products, shipping, and authentic Bali craftsmanship.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="w-full flex flex-col">
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-gray-200 py-4 cursor-pointer group" 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-sans font-medium text-black group-hover:text-gray-600 transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-black flex-shrink-0"
                  >
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-gray-500 pt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
