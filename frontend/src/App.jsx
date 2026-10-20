import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import { CartProvider } from "./CartContext";

function NotFound() {
  return (
    <main className="min-h-screen bg-[#FFFAF6] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-4">
          VELOURA
        </p>

        <h1 className="font-serif text-4xl md:text-5xl text-[#4A3F3F]">
          Page Not Found
        </h1>

        <p className="text-[#756868] mt-3">
          The page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#7A9E88] text-white text-sm font-semibold hover:bg-[#688976] hover:scale-105 transition-all"
        >
          Back to Home
          <span>→</span>
        </Link>
      </div>
    </main>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;