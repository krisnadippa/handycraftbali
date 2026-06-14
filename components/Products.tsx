"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingBag, X, Minus, Plus, Check } from "lucide-react";
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

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-100 animate-pulse rounded-[1.5rem] md:rounded-[2rem]" />
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

export default function Products({ limit, category, hideHeader = false }: { limit?: number; category?: string; hideHeader?: boolean }) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [addingId, setAddingId] = useState<number | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [currentPage, setCurrentPage] = useState(1);

  // Sort & Search state
  const [activeSort, setActiveSort] = useState("NEW ARRIVALS");
  const [searchQuery, setSearchQuery] = useState("");
  const [flyingImg, setFlyingImg] = useState<{ src: string; x: number; y: number } | null>(null);

  // Bottom drawer state
  const [drawerProduct, setDrawerProduct] = useState<typeof productsData[0] | null>(null);
  const [drawerSize, setDrawerSize] = useState("M");
  const [drawerColor, setDrawerColor] = useState("Natural");
  const [drawerQty, setDrawerQty] = useState(1);
  const [drawerActionType, setDrawerActionType] = useState<"cart" | "whatsapp">("cart");

  const loadCurrency = () => {
    if (typeof window !== "undefined") {
      const savedCurrency = localStorage.getItem("glorious_currency") || "USD";
      setCurrency(savedCurrency);
    }
  };

  useEffect(() => {
    loadCurrency();
    window.addEventListener("currency-changed", loadCurrency);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam) {
        setActiveTab(catParam.toUpperCase());
      }
      const sortParam = params.get("sort");
      if (sortParam) {
        setActiveSort(sortParam.toUpperCase());
      }
      const searchParam = params.get("search");
      if (searchParam && searchParam !== "focus") {
        setSearchQuery(searchParam);
      }
      
      if (catParam || sortParam || (searchParam && searchParam !== "focus")) {
        setTimeout(() => {
          const element = document.getElementById("produk");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    }
    
    const handleFilterCategory = (e: Event) => {
      const cat = (e as CustomEvent).detail;
      if (cat) {
        setActiveTab(cat.toUpperCase());
        const element = document.getElementById("produk");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("filter-category", handleFilterCategory);

    const handleFilterSort = (e: Event) => {
      const sortVal = (e as CustomEvent).detail;
      if (sortVal) {
        setActiveSort(sortVal.toUpperCase());
        const element = document.getElementById("produk");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("filter-sort", handleFilterSort);

    const handleSearchProducts = (e: Event) => {
      const query = (e as CustomEvent).detail;
      setSearchQuery(query || "");
      const element = document.getElementById("produk");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("search-products", handleSearchProducts);

    return () => {
      window.removeEventListener("currency-changed", loadCurrency);
      window.removeEventListener("filter-category", handleFilterCategory);
      window.removeEventListener("filter-sort", handleFilterSort);
      window.removeEventListener("search-products", handleSearchProducts);
    };
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

  let filtered = productsData.filter((p) => {
    if (category && p.category !== category) return false;
    if (activeTab !== "ALL" && p.category !== activeTab) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Apply activeSort sorting rules
  if (activeSort === "BEST SELLERS") {
    filtered = [...filtered].sort((a, b) => (b.id % 3) - (a.id % 3));
  } else if (activeSort === "TOP RATED") {
    filtered = [...filtered].sort((a, b) => (b.id % 2) - (a.id % 2));
  } else if (activeSort === "PROMO & DISCOUNTS") {
    // Show only even products as promo
    filtered = filtered.filter((p) => p.id % 2 === 0);
  }

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedProducts = limit ? filtered.slice(0, limit) : filtered.slice(startIndex, startIndex + itemsPerPage);

  const addToCart = (product: typeof productsData[0], size: string = "M", color: string = "Natural", qty: number = 1, startX?: number, startY?: number) => {
    if (typeof window !== "undefined") {
      const currentCart = JSON.parse(localStorage.getItem("glorious_cart") || "[]");
      const existingItemIndex = currentCart.findIndex(
        (item: any) => item.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItemIndex > -1) {
        currentCart[existingItemIndex].quantity = (currentCart[existingItemIndex].quantity || 1) + qty;
        const updatedItem = currentCart.splice(existingItemIndex, 1)[0];
        currentCart.unshift(updatedItem);
      } else {
        currentCart.unshift({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: qty,
          size: size,
          color: color
        });
      }
      
      localStorage.setItem("glorious_cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cart-updated"));

      // Trigger Flying Animation
      const x = startX || window.innerWidth / 2;
      const y = startY || window.innerHeight / 2;
      setFlyingImg({ src: product.image, x, y });

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        setFlyingImg(null);
        window.dispatchEvent(new Event("open-cart"));
      }, 900);

      setAddingId(product.id);
      setTimeout(() => {
        setAddingId(null);
      }, 1500);
      setDrawerProduct(null);
    }
  };

  const orderWhatsApp = (product: typeof productsData[0], size: string = "M", color: string = "Natural", qty: number = 1) => {
    const numeric = parseFloat(product.price.replace(/[^0-9.]/g, ""));
    const wholesalePrice = numeric * 0.8;
    const activeUnitPrice = qty >= 50 ? wholesalePrice : numeric;
    const totalPrice = activeUnitPrice * qty;

    const formattedUnitPrice = formatPrice(activeUnitPrice.toString());
    const formattedTotalPrice = formatPrice(totalPrice.toString());

    const text = `Halo BaliCraft, saya ingin memesan ${qty} pcs "${product.name}" (Ukuran: ${size}, Warna: ${color}) dengan harga satuan ${formattedUnitPrice} (Total: ${formattedTotalPrice}).\n\nMohon informasi ketersediaan barang dan metode pembayaran. Matur Suksma!`;
    const url = `https://wa.me/6281339711438?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setDrawerProduct(null);
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
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                    />

                    {/* Actions overlay */}
                    <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 flex gap-1.5 md:gap-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      {/* Add to Cart button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDrawerProduct(product);
                          setDrawerSize("M");
                          setDrawerColor("Natural");
                          setDrawerQty(1);
                          setDrawerActionType("cart");
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
                          setDrawerProduct(product);
                          setDrawerSize("M");
                          setDrawerColor("Natural");
                          setDrawerQty(1);
                          setDrawerActionType("whatsapp");
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

      {/* Bottom Sheet Drawer */}
      <AnimatePresence>
        {drawerProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerProduct(null)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            {/* Drawer container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-white rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.15)] z-50 px-6 py-8 md:px-12 font-sans text-black"
            >
              {/* Drag Handle Indicator */}
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 cursor-pointer" onClick={() => setDrawerProduct(null)} />

              {/* Header Info */}
              <div className="flex gap-4 items-start pb-6 border-b border-gray-100">
                <img
                  src={drawerProduct.image}
                  alt={drawerProduct.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover bg-gray-100 border border-gray-100"
                />
                <div className="flex-grow">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                    {drawerProduct.category}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-snug">
                    {drawerProduct.name}
                  </h3>
                  <div className="flex flex-col mt-1.5">
                    <span className="text-lg font-bold text-black">
                      {formatPrice(
                        (drawerQty >= 50
                          ? parseFloat(drawerProduct.price.replace(/[^0-9.]/g, "")) * 0.8
                          : parseFloat(drawerProduct.price.replace(/[^0-9.]/g, ""))
                        ).toString()
                      )}
                      <span className="text-xs text-gray-500 font-semibold font-normal ml-1">/ unit</span>
                    </span>
                    {parseFloat(drawerProduct.price.replace(/[^0-9.]/g, "")) && (
                      <span className="text-[10px] text-gray-500 font-medium">
                        Grosir (≥ 50 pcs): {formatPrice(
                          (parseFloat(drawerProduct.price.replace(/[^0-9.]/g, "")) * 0.8).toString()
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setDrawerProduct(null)}
                  className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center cursor-pointer text-gray-500"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Options Selectors */}
              <div className="py-6 flex flex-col gap-6">
                {/* Size Selector */}
                <div>
                  <p className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Pilih Ukuran</p>
                  <div className="flex gap-2.5">
                    {["S", "M", "L"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setDrawerSize(size)}
                        className={`w-11 h-11 rounded-full font-sans font-semibold text-xs transition-all flex items-center justify-center cursor-pointer ${
                          drawerSize === size
                            ? "bg-black text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <p className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Pilih Warna</p>
                  <div className="flex items-center gap-3">
                    {[
                      { name: "Natural", class: "bg-[#D9B48F]" },
                      { name: "Hitam", class: "bg-[#1A1A1A]" },
                      { name: "Terracotta", class: "bg-[#C86446]" },
                      { name: "White Wash", class: "bg-[#EAE8E4] border border-gray-300" }
                    ].map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setDrawerColor(color.name)}
                        className={`relative w-10 h-10 rounded-full cursor-pointer transition-all flex items-center justify-center ${color.class} ${
                          drawerColor === color.name ? "ring-2 ring-black ring-offset-2 scale-105" : "hover:scale-105"
                        }`}
                        title={color.name}
                      >
                        {drawerColor === color.name && (
                          <Check size={14} className={color.name === "White Wash" ? "text-black" : "text-white"} />
                        )}
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-gray-500 ml-1">
                      {drawerColor}
                    </span>
                  </div>
                </div>

                {/* Qty Selector */}
                <div>
                  <p className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Jumlah (Qty)</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-full w-32 h-11 bg-white">
                      <button
                        onClick={() => setDrawerQty(Math.max(1, drawerQty - 1))}
                        className="flex-1 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="flex-1 text-center font-semibold text-gray-900 text-sm">{drawerQty}</span>
                      <button
                        onClick={() => setDrawerQty(drawerQty + 1)}
                        className="flex-1 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-6 border-t border-gray-100 flex gap-4">
                <button
                  onClick={(e) => addToCart(drawerProduct, drawerSize, drawerColor, drawerQty, e.clientX, e.clientY)}
                  className={`flex-1 h-12 rounded-full font-sans font-bold text-xs tracking-wider transition-colors flex items-center justify-center gap-2 uppercase cursor-pointer ${
                    drawerActionType === "cart"
                      ? "bg-black hover:bg-gray-800 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-black border border-gray-200"
                  }`}
                >
                  <ShoppingBag size={14} />
                  Add to Cart
                </button>
                <button
                  onClick={() => orderWhatsApp(drawerProduct, drawerSize, drawerColor, drawerQty)}
                  className={`flex-1 h-12 rounded-full transition-colors flex items-center justify-center gap-2 uppercase cursor-pointer font-sans font-bold text-xs tracking-wider text-white ${
                    drawerActionType === "whatsapp"
                      ? "bg-[#25D366] hover:bg-[#128C7E]"
                      : "bg-gray-100 hover:bg-gray-200 text-black border border-gray-200"
                  }`}
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.175-1.356a9.92 9.92 0 004.833 1.258h.005c5.507 0 9.991-4.479 9.992-9.986.002-2.668-1.037-5.176-2.927-7.067A9.921 9.921 0 0012.012 2z" />
                  </svg>
                  Pesan Langsung
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Flying Cart Item Animation */}
      {flyingImg && (
        <motion.img
          src={flyingImg.src}
          initial={{
            position: "fixed",
            top: flyingImg.y - 40,
            left: flyingImg.x - 40,
            width: 80,
            height: 80,
            borderRadius: "50%",
            zIndex: 9999,
            objectFit: "cover",
            opacity: 1,
            scale: 1,
          }}
          animate={{
            top: 20,
            left: typeof window !== "undefined" ? window.innerWidth - 60 : 1000,
            width: 15,
            height: 15,
            opacity: 0.1,
            scale: 0.1,
          }}
          transition={{
            duration: 0.9,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="pointer-events-none shadow-lg border border-white"
        />
      )}
    </section>
  );
}
