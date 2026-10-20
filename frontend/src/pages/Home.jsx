import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api";

function Home() {
  const categories = [
    {
      name: "Skincare",
      image: "/images/products/skincare.jpeg",
      number: "01",
    },
    {
      name: "Makeup",
      image: "/images/products/makeup.jpeg",
      number: "02",
    },
    {
      name: "Haircare",
      image: "/images/products/haircare.jpeg",
      number: "03",
    },
    {
      name: "Fragrance",
      image: "/images/products/perfume.jpeg",
      number: "04",
    },
  ];

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ================= FETCH PRODUCTS FROM API =================
  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (!cancelled) setAllProducts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredProducts = allProducts.slice(0, 4);
  const totalProducts = allProducts.length > 0 ? allProducts.length : 32;

  return (
    <main className="bg-[#FFFAF6] text-[#4A3F3F] overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative max-w-7xl mx-auto px-6 pt-10 pb-20">

        {/* Decorative circle */}
        <div className="absolute top-20 right-10 w-24 h-16 bg-[#F6E3E0] rounded-full blur-2xl opacity-60 animate-pulse" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ================= LEFT HERO CONTENT ================= */}
          <div className="relative z-10 animate-fade-up">

            {/* Brand label */}
            <div className="inline-flex items-center gap-2 bg-[#F6E3E0] rounded-full px-4 py-2 text-sm mb-7">

              <span className="w-2 h-2 rounded-full bg-[#7A9E88] animate-pulse" />

              VELOURA Beauty & Ritual

            </div>


            {/* Main heading */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">

              Your Beauty,
              <br />

              <span className="text-[#7A9E88] italic">
                Your Glow.
              </span>

            </h1>


            {/* Description */}
            <p className="mt-7 text-[#6B5D5D] max-w-lg leading-7 text-lg">

              Welcome to VELOURA, where beauty meets
              self-care. Discover thoughtfully curated skincare,
              makeup, haircare and fragrances made to make
              every moment feel a little more special.

            </p>


            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-9">

              <Link
                to="/products"
                className="group px-7 py-3.5 rounded-full bg-[#7A9E88] text-white font-semibold shadow-lg shadow-[#7A9E88]/20 hover:bg-[#688A76] hover:-translate-y-1 transition-all duration-300"
              >

                Explore VELOURA

                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>

              </Link>


              <Link
                to="/products?category=Skincare"
                className="px-7 py-3.5 rounded-full border border-[#D5C6C0] bg-white/70 hover:bg-[#F6E3E0] hover:-translate-y-1 transition-all duration-300"
              >

                Discover Skincare

              </Link>

            </div>


            {/* ================= STATS ================= */}
            <div className="flex gap-8 mt-12">

              <div>

                <p className="font-serif text-2xl">
                  {totalProducts}+
                </p>

                <p className="text-xs text-[#8A7B7B] mt-1">
                  Beauty Essentials
                </p>

              </div>


              <div className="w-px bg-[#DCCECB]" />


              <div>

                <p className="font-serif text-2xl">
                  4
                </p>

                <p className="text-xs text-[#8A7B7B] mt-1">
                  Beauty Collections
                </p>

              </div>


              <div className="w-px bg-[#DCCECB]" />


              <div>

                <p className="font-serif text-2xl">
                  100%
                </p>

                <p className="text-xs text-[#8A7B7B] mt-1">
                  Beauty & Self-Care
                </p>

              </div>

            </div>

          </div>


          {/* ================= RIGHT HERO IMAGE ================= */}
          <div className="relative animate-float w-full max-w-[400px] mx-auto">

            {/* Decorative pink layer */}
            <div className="absolute -inset-4 bg-[#F6E3E0] rounded-[3rem] rotate-3" />


            {/* Main image container */}
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">

              <img
                src="/images/products/skincare.jpeg"
                alt="VELOURA Beauty Collection"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />


              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />


              {/* Floating label */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl">

                <p className="text-xs uppercase tracking-widest text-[#7A9E88]">
                  VELOURA Beauty & Ritual
                </p>


                <div className="flex justify-between items-center mt-1">

                  <p className="font-serif text-xl">
                    Everyday Glow
                  </p>

                  <span className="text-[#7A9E88] text-xl">
                    ✦
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= MARQUEE ================= */}
      <div className="border-y border-[#E7DCD7] overflow-hidden py-4 bg-white/40">

        <div className="flex whitespace-nowrap animate-marquee">

          {[
            "VELOURA",
            "SKINCARE",
            "BEAUTY & RITUAL",
            "MAKEUP",
            "SELF CARE",
            "HAIRCARE",
            "FRAGRANCE",
            "VELOURA BEAUTY",
            "SKINCARE",
            "BEAUTY & RITUAL",
          ].map((item, index) => (

            <div
              key={index}
              className="flex items-center"
            >

              <span className="mx-7 text-xs tracking-[0.3em] text-[#7A9E88]">
                {item}
              </span>

              <span className="text-[#E8B4B8]">
                ✦
              </span>

            </div>

          ))}

        </div>

      </div>


      {/* ================= CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex items-end justify-between mb-10">

          <div>

            <p className="text-xs tracking-[0.3em] uppercase text-[#7A9E88] mb-3">
              The VELOURA Edit
            </p>

            <h2 className="font-serif text-4xl md:text-5xl">
              Discover Your Beauty
            </h2>

          </div>


          <Link
            to="/products"
            className="hidden sm:block text-sm hover:text-[#7A9E88] transition"
          >
            Explore all beauty →
          </Link>

        </div>


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

          {categories.map((category) => (

            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className="group"
            >

              <div className="relative overflow-hidden rounded-[1.8rem] bg-white aspect-[3/4] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">

                <img
                  src={category.image}
                  alt={`VELOURA ${category.name}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />


                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />


                {/* Number */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-xs">
                  {category.number}
                </div>


                {/* Category content */}
                <div className="absolute bottom-5 left-5 right-5 text-white">

                  <h3 className="font-serif text-2xl">
                    {category.name}
                  </h3>


                  <p className="text-sm text-white/80 mt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore VELOURA →
                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-[#F6E3E0] rounded-[2.5rem] p-7 md:p-12">

          <div className="flex items-end justify-between mb-9">

            <div>

              <p className="text-xs tracking-[0.3em] uppercase text-[#7A9E88] mb-3">
                Curated by VELOURA
              </p>

              <h2 className="font-serif text-4xl">
                VELOURA Bestsellers
              </h2>

            </div>


            <Link
              to="/products"
              className="hidden sm:block text-sm font-semibold hover:text-[#7A9E88]"
            >
              Shop all beauty →
            </Link>

          </div>


          {/* ---------- LOADING STATE ---------- */}
          {loading && (
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
              aria-hidden="true"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#FFFAF6] rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-[#EDE1DC]" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-1/3 rounded bg-[#EDE1DC]" />
                    <div className="h-4 w-3/4 rounded bg-[#EDE1DC]" />
                    <div className="h-4 w-1/4 rounded bg-[#EDE1DC]" />
                  </div>
                </div>
              ))}
            </div>
          )}


          {/* ---------- ERROR STATE ---------- */}
          {!loading && error && (
            <p className="text-center text-[#756868] py-10" role="alert">
              We couldn't load our bestsellers right now. Please try
              again in a moment, or{" "}
              <Link
                to="/products"
                className="underline hover:text-[#7A9E88]"
              >
                browse the full collection
              </Link>
              .
            </p>
          )}


          {/* ---------- PRODUCTS ---------- */}
          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {featuredProducts.map((product) => (

                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group bg-[#FFFAF6] rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
                >

                  <div className="relative aspect-square overflow-hidden">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />


                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                      VELOURA Pick
                    </span>

                  </div>


                  <div className="p-5">

                    <p className="text-xs uppercase tracking-wider text-[#7A9E88]">
                      {product.category}
                    </p>


                    <h3 className="font-serif text-xl mt-2">
                      {product.name}
                    </h3>


                    <div className="flex justify-between items-center mt-4">

                      <span className="font-semibold">
                        ${Number(product.price).toFixed(2)}
                      </span>


                      <span className="w-9 h-9 rounded-full bg-[#E8B4B8] flex items-center justify-center group-hover:bg-[#7A9E88] group-hover:text-white transition-colors">
                        →
                      </span>

                    </div>

                  </div>

                </Link>

              ))}

            </div>
          )}

        </div>

      </section>


      {/* ================= BEAUTY BANNER ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="relative overflow-hidden rounded-[2.8rem] bg-[#7A9E88]">

          {/* Decorative circle */}
          <div className="absolute -right-32 -top-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />


          <div className="relative grid md:grid-cols-[1.05fr_0.95fr] min-h-[430px]">

            {/* ================= LEFT CONTENT ================= */}
            <div className="relative z-10 p-10 md:p-14 lg:p-16 flex flex-col justify-center">

              <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-5">
                The VELOURA Experience
              </p>


              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">

                Beauty begins
                <br />

                with a little
                <br />

                <span className="italic text-[#F6E3E0]">
                  self-love.
                </span>

              </h2>


              <p className="text-white/80 max-w-md mt-6 leading-relaxed">

                VELOURA transforms everyday beauty into
                moments of calm, confidence and self-care.
                Create a beauty routine that feels completely yours.

              </p>


              <div className="mt-8">

                <Link
                  to="/products"
                  className="inline-flex items-center bg-[#FFFAF6] text-[#4A3F3F] px-7 py-3.5 rounded-full font-semibold shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >

                  Discover VELOURA

                  <span className="ml-2">
                    →
                  </span>

                </Link>

              </div>

            </div>


            {/* ================= RIGHT IMAGE ================= */}
            <div className="relative flex items-center justify-center p-5 md:p-7 lg:p-9">

              {/* Soft pink frame */}
              <div className="absolute inset-5 md:inset-7 lg:inset-9 rounded-[2.2rem] bg-[#F6E3E0]/80 rotate-2" />


              {/* Image */}
              <div className="relative w-full h-[330px] md:h-[370px] lg:h-[390px] rounded-[2rem] overflow-hidden shadow-2xl">

                <img
                  src="/images/products/beauty.png"
                  alt="VELOURA Beauty"
                  className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000"
                />


                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A3F3F]/25 via-transparent to-white/5" />


                {/* Floating label */}
                <div className="absolute bottom-5 left-5 right-5">

                  <div className="bg-[#FFFAF6]/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg">

                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#7A9E88]">
                      VELOURA Beauty
                    </p>


                    <p className="font-serif text-lg text-[#4A3F3F] mt-1">
                      A little moment for you.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;