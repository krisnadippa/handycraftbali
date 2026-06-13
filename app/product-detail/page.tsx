import Navbar from "@/components/Navbar";
import ProductDetail from "@/components/ProductDetail";
import ProductDescription from "@/components/ProductDescription";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

export default function ProductDetailPage() {
  return (
    <main className="bg-white">
      <Navbar />
      
      <div className="pt-8">
        {/* Main Product Detail Section */}
        <ProductDetail />
        
        {/* Product Description Tabs */}
        <ProductDescription />
        
        {/* Related Products Section */}
        <div className="mt-8">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-2">
            <h2 className="text-2xl font-sans font-bold text-gray-900 tracking-tight">Related Products</h2>
          </div>
          <Products />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
