import Navbar from "@/components/Navbar";
import ProductHero from "@/components/ProductHero";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

export default function ProductPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <ProductHero />
      <Products />
      <Footer />
    </main>
  );
}
