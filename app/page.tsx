import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";
import About from "../components/About";
import Reviews from "../components/Reviews";
import FaqSection from "../components/ui/faq-sections";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Categories />
      <Products limit={8} />
      <About />
      <Reviews />
      <FaqSection />
      <Contact />
      <Footer />
    </main>
  );
}
