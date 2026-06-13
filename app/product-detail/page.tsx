"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductDetail from "@/components/ProductDetail";
import ProductDescription from "@/components/ProductDescription";
import Products, { productsData } from "@/components/Products";
import Footer from "@/components/Footer";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<typeof productsData[0] | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get("id");
      const id = idParam ? parseInt(idParam) : 1;
      const found = productsData.find((p) => p.id === id) || productsData[0];
      setProduct(found);
    }
  }, []);

  if (!product) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-gray-500 font-sans">Loading product...</div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <Navbar />
      
      <div className="pt-8">
        {/* Main Product Detail Section */}
        <ProductDetail product={product} />
        
        {/* Product Description Tabs */}
        <ProductDescription />
        
        {/* Related Products Section */}
        <div className="mt-8">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-2">
            <h2 className="text-2xl font-sans font-bold text-gray-900 tracking-tight">Related Products</h2>
          </div>
          <Products limit={4} category={product.category} hideHeader={true} />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
