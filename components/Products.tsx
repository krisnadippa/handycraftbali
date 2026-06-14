"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export const productsData = [
  {
    id: 1,
    name: "Topeng Kayu Barong",
    price: "$120",
    image: "/images/prd1.jpg",
    images: ["/images/prd1.jpg", "/images/prd5.jpg", "/images/prd9.jpg"],
    category: "INTERIOR",
    initialWished: true,
    colSpan: "col-span-1",
  },
  {
    id: 2,
    name: "Lampu Hias Rotan",
    price: "$45",
    image: "/images/prd2.webp",
    images: ["/images/prd2.webp", "/images/lamp.png", "/images/prd6.jpg"],
    category: "LAMP",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 3,
    name: "Vas Keramik Terracotta",
    price: "$35",
    image: "/images/prd3.webp",
    images: ["/images/prd3.webp", "/images/vas.png", "/images/prd7.jpg"],
    category: "VAS",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 4,
    name: "Patung Ganesha Kayu",
    price: "$150",
    image: "/images/prd4.jpg",
    images: ["/images/prd4.jpg", "/images/prd8.webp", "/images/prd12.webp"],
    category: "WOOD",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 5,
    name: "Tas Anyaman Ata",
    price: "$25",
    image: "/images/prd5.jpg",
    category: "INTERIOR",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 6,
    name: "Lampu Bambu Estetik",
    price: "$40",
    image: "/images/prd6.jpg",
    category: "LAMP",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 7,
    name: "Vas Bunga Tanah Liat",
    price: "$15",
    image: "/images/prd7.jpg",
    category: "VAS",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 8,
    name: "Keranjang Bambu Bali",
    price: "$30",
    image: "/images/prd8.webp",
    category: "WOOD",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 9,
    name: "Lukisan Tradisional Ubud",
    price: "$200",
    image: "/images/prd9.jpg",
    category: "INTERIOR",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 10,
    name: "Lampu Gantung Makrame",
    price: "$55",
    image: "/images/prd10.webp",
    category: "LAMP",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 11,
    name: "Mangkok Kayu Jati",
    price: "$20",
    image: "/images/prd11.jpg",
    category: "VAS",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 12,
    name: "Patung Buddha Semadi",
    price: "$180",
    image: "/images/prd12.webp",
    category: "WOOD",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 13,
    name: "Topeng Kayu Barong",
    price: "$120",
    image: "/images/prd1.jpg",
    category: "INTERIOR",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 14,
    name: "Lampu Hias Rotan",
    price: "$45",
    image: "/images/prd2.webp",
    category: "LAMP",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 15,
    name: "Vas Keramik Terracotta",
    price: "$35",
    image: "/images/prd3.webp",
    category: "VAS",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 16,
    name: "Patung Ganesha Kayu",
    price: "$150",
    image: "/images/prd4.jpg",
    category: "WOOD",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 17,
    name: "Tas Anyaman Ata",
    price: "$25",
    image: "/images/prd5.jpg",
    category: "INTERIOR",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 18,
    name: "Lampu Bambu Estetik",
    price: "$40",
    image: "/images/prd6.jpg",
    category: "LAMP",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 19,
    name: "Vas Bunga Tanah Liat",
    price: "$15",
    image: "/images/prd7.jpg",
    category: "VAS",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 20,
    name: "Keranjang Bambu Bali",
    price: "$30",
    image: "/images/prd8.webp",
    category: "WOOD",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 21,
    name: "Lukisan Tradisional Ubud",
    price: "$200",
    image: "/images/prd9.jpg",
    category: "INTERIOR",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 22,
    name: "Lampu Gantung Makrame",
    price: "$55",
    image: "/images/prd10.webp",
    category: "LAMP",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 23,
    name: "Mangkok Kayu Jati",
    price: "$20",
    image: "/images/prd11.jpg",
    category: "VAS",
    initialWished: false,
    colSpan: "col-span-1",
  },
  {
    id: 24,
    name: "Patung Buddha Semadi",
    price: "$180",
    image: "/images/prd12.webp",
    category: "WOOD",
    initialWished: false,
    colSpan: "col-span-1",
  },
];

export default function Products({ limit, category, hideHeader = false }: { limit?: number; category?: string; hideHeader?: boolean }) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [addingId, setAddingId] = useState<number | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [currentPage, setCurrentPage] = useState(1);

  const loadCurrency = () => {
    if (typeof window !== "undefined") {
      const savedCurrency = localStorage.getItem("glorious_currency") || "USD";
      setCurrency(savedCurrency);
    }
  };

  useEffect(() => {
    loadCurrency();
    window.addEventListener("currency-changed", loadCurrency);
    return () => window.removeEventListener("currency-changed", loadCurrency);
  }, []);

  const isFirstMount = useRef(true);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, activeTab]);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    // Only scroll to the products grid on the main products page (where limit is undefined)
    if (!limit) {
      const element = document.getElementById("produk");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentPage, limit]);

  const formatPrice = (priceStr: string) => {
    const numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    if (currency === "IDR") {
      const idrPrice = numeric * 15000;
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
      }).format(idrPrice);
    }
    return `$${numeric}`;
  };

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

  const filtered = productsData.filter((p) => {
    if (category && p.category !== category) return false;
    if (activeTab !== "ALL" && p.category !== activeTab) return false;
    return true;
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedProducts = limit ? filtered.slice(0, limit) : filtered.slice(startIndex, startIndex + itemsPerPage);

  const addToCart = (product: typeof productsData[0]) => {
    if (typeof window !== "undefined") {
      const currentCart = JSON.parse(localStorage.getItem("glorious_cart") || "[]");
      const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);
      
      if (existingItemIndex > -1) {
        currentCart[existingItemIndex].quantity = (currentCart[existingItemIndex].quantity || 1) + 1;
      } else {
        currentCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
      
      localStorage.setItem("glorious_cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cart-updated"));

      setAddingId(product.id);
      setTimeout(() => {
        setAddingId(null);
      }, 1500);
    }
  };

  const orderWhatsApp = (product: typeof productsData[0]) => {
    const text = `Hi Nextgen, I want to order "${product.name}" for ${formatPrice(product.price)}.`;
    const url = `https://wa.me/628123456789?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="produk" className="w-full bg-white py-12 px-6 md:px-12 max-w-[1280px] mx-auto flex flex-col gap-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col gap-8 w-full"
      >
        {/* Header Row */}
        {!hideHeader && (
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-black">
              Popular products
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {["ALL", "INTERIOR", "LAMP", "VAS", "WOOD"].map((tab) => {
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
        )}

        {/* Grid of Products */}
        <motion.div
          key={`${currentPage}-${activeTab}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full"
        >
          {displayedProducts.map((product) => {
            return (
              <Link
                key={product.id}
                href={`/product-detail?id=${product.id}`}
                className={`flex flex-col gap-3 group cursor-pointer ${product.colSpan}`}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="flex flex-col gap-3 w-full"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-[#F4F4F4] rounded-[1.5rem] md:rounded-[2rem] aspect-[3/4] sm:aspect-auto sm:h-[320px] md:h-[360px] w-full flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Actions overlay */}
                    <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 flex gap-1.5 md:gap-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      {/* Add to Cart button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="flex-grow flex items-center justify-center gap-1 md:gap-2 bg-white text-black hover:bg-black hover:text-white font-sans font-bold text-[9px] min-[375px]:text-[10px] md:text-[11px] py-1.5 md:py-2.5 px-1.5 md:px-3 rounded-full shadow-md transition-all cursor-pointer"
                      >
                        <ShoppingBag size={12} className="md:w-[13px] md:h-[13px]" />
                        <span className="hidden min-[375px]:inline">+ Cart</span>
                        <span className="inline min-[375px]:hidden">+</span>
                      </button>

                      {/* WhatsApp button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          orderWhatsApp(product);
                        }}
                        className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center bg-[#25D366] text-white hover:bg-[#128C7E] rounded-full shadow-md transition-all cursor-pointer"
                        title="Order via WhatsApp"
                      >
                        <svg width="14" height="14" className="md:w-[16px] md:h-[16px]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.175-1.356a9.92 9.92 0 004.833 1.258h.005c5.507 0 9.991-4.479 9.992-9.986.002-2.668-1.037-5.176-2.927-7.067A9.921 9.921 0 0012.012 2z" />
                        </svg>
                      </button>
                    </div>

                    {/* Add success animation overlay */}
                    <AnimatePresence>
                      {addingId === product.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20 text-white rounded-[1.5rem] md:rounded-[2rem]"
                        >
                          <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.4 }}
                            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg mb-2"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-black md:w-[20px] md:h-[20px]">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </motion.div>
                          <span className="font-sans font-bold text-[10px] md:text-xs tracking-wider uppercase">Added!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-1 px-1">
                    <h3 className="text-base font-sans font-semibold text-black tracking-tight leading-tight">
                      {product.name}
                    </h3>
                    <span className="text-sm font-sans font-medium text-gray-500">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {limit && filtered.length > limit && (
          <div className="flex justify-center mt-6">
            <a
              href="/products"
              className="group flex items-center gap-3 pl-7 pr-2 py-2 border border-black hover:bg-neutral-50 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all cursor-pointer text-black"
            >
              <span>Lihat Semua Produk</span>
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                &rarr;
              </span>
            </a>
          </div>
        )}

        {!limit && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-black disabled:opacity-40 disabled:cursor-not-allowed hover:border-black transition-all cursor-pointer"
            >
              &larr;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-sans font-bold text-sm transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "border border-gray-200 text-gray-600 hover:border-black hover:text-black"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-black disabled:opacity-40 disabled:cursor-not-allowed hover:border-black transition-all cursor-pointer"
            >
              &rarr;
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
