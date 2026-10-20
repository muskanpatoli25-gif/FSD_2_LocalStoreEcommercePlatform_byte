import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { getProduct, getProducts } from "../api";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [isVisible, setIsVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const recommendationsRef = useRef(null);

  /* ================= SCROLL TO TOP ================= */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  /* ================= FETCH PRODUCT + RELATED ================= */
  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setNotFound(false);
    setError("");
    setIsVisible(false);
    setAdded(false);

    getProduct(id)
      .then(async (item) => {
        if (cancelled) return;
        setProduct(item);

        // related products fail ho jayein to bhi main product dikhna chahiye
        try {
          const list = await getProducts({ category: item.category });
          if (!cancelled) {
            setRelatedProducts(
              list.filter((p) => p.id !== item.id).slice(0, 4)
            );
          }
        } catch {
          if (!cancelled) setRelatedProducts([]);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setProduct(null);
        setRelatedProducts([]);
        if (err.message === "Product not found") {
          setNotFound(true);
        } else {
          setError(err.message || "Something went wrong");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  /* ================= REVEAL ANIMATION ================= */
  // product load hone ke baad hi related section render hota hai,
  // is liye observer ko product par depend karna zaruri hai
  useEffect(() => {
    if (!product || !recommendationsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(recommendationsRef.current);

    return () => observer.disconnect();
  }, [loading, product, relatedProducts.length]);

  /* ================= ADD TO CART ================= */
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFFAF6] px-6 pt-10 pb-20">
        <div className="max-w-7xl mx-auto animate-pulse" aria-busy="true">
          <div className="h-4 w-40 rounded bg-[#EDE1DC]" />
          <div className="mt-8 grid lg:grid-cols-2 rounded-[2rem] overflow-hidden border border-[#EDE1DC] bg-white">
            <div className="min-h-[450px] lg:min-h-[620px] bg-[#F6E3E0]/60" />
            <div className="p-8 md:p-12 lg:p-16 space-y-5">
              <div className="h-3 w-1/3 rounded bg-[#EDE1DC]" />
              <div className="h-10 w-3/4 rounded bg-[#EDE1DC]" />
              <div className="h-6 w-1/4 rounded bg-[#EDE1DC]" />
              <div className="h-4 w-full rounded bg-[#EDE1DC]" />
              <div className="h-4 w-5/6 rounded bg-[#EDE1DC]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ================= SERVER / NETWORK ERROR ================= */
  if (error) {
    return (
      <main className="min-h-screen bg-[#FFFAF6] flex items-center justify-center px-6">
        <div className="text-center" role="alert">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-4">
            VELOURA Collection
          </p>

          <h1 className="font-serif text-4xl text-[#4A3F3F]">
            Something went wrong
          </h1>

          <p className="text-[#756868] mt-3 max-w-md mx-auto">
            We couldn't load this product right now. Please check your
            connection and try again.
          </p>

          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#7A9E88] text-white text-sm font-semibold hover:bg-[#688976] hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A9E88] focus-visible:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  /* ================= PRODUCT NOT FOUND ================= */
  if (notFound || !product) {
    return (
      <main className="min-h-screen bg-[#FFFAF6] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-4">
            VELOURA Collection
          </p>

          <h1 className="font-serif text-4xl text-[#4A3F3F]">
            Product Not Found
          </h1>

          <p className="text-[#756868] mt-3">
            This beauty essential could not be found.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#7A9E88] text-white text-sm font-semibold hover:bg-[#688976] hover:scale-105 transition-all"
          >
            Back to Collection
            <span>→</span>
          </Link>
        </div>
      </main>
    );
  }

  /* ================= STOCK STATUS ================= */
  const stock = Number(product.stock ?? 0);
  const outOfStock = stock <= 0;
  const lowStock = stock > 0 && stock <= 5;

  return (
    <main className="min-h-screen bg-[#FFFAF6] text-[#4A3F3F]">

      {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20">

        {/* BACK BUTTON */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-[#756868] hover:text-[#7A9E88] transition-colors duration-300"
        >
          <span className="text-lg">←</span>
          Back to collection
        </Link>

        {/* PRODUCT CARD */}
        <div className="mt-8 bg-white rounded-[2rem] overflow-hidden border border-[#EDE1DC] shadow-sm">

          <div className="grid lg:grid-cols-2">

            {/* ================= PRODUCT IMAGE ================= */}
            <div className="relative bg-[#F6E3E0] min-h-[450px] lg:min-h-[620px] overflow-hidden group">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full min-h-[450px] lg:min-h-[620px] object-cover group-hover:scale-105 transition-transform duration-1000"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

              <div className="absolute top-6 left-6">
                <span className="bg-[#FFFAF6]/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] text-[#4A3F3F] shadow-sm">
                  {product.category}
                </span>
              </div>

            </div>

            {/* ================= PRODUCT INFORMATION ================= */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">

              <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] font-semibold mb-5">
                The VELOURA Experience
              </p>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-[#4A3F3F]">
                {product.name}
              </h1>

              <div className="w-16 h-[2px] bg-[#E8B4B8] my-7" />

              <p className="text-2xl md:text-3xl font-semibold text-[#7A9E88]">
                ${Number(product.price).toFixed(2)}
              </p>

              {/* STOCK STATUS */}
              <p
                className={`mt-3 text-sm font-medium ${
                  outOfStock
                    ? "text-[#B05555]"
                    : lowStock
                    ? "text-[#B7894A]"
                    : "text-[#7A9E88]"
                }`}
              >
                {outOfStock
                  ? "Out of stock"
                  : lowStock
                  ? `Only ${stock} left in stock`
                  : "In stock"}
              </p>

              <p className="mt-6 text-[#756868] leading-8 text-base max-w-xl">
                {product.description}
              </p>

              {/* ================= PRODUCT BENEFITS ================= */}
              <div className="grid grid-cols-3 gap-3 mt-8 mb-8">

                <div className="bg-[#FFFAF6] rounded-2xl p-4 text-center border border-[#EDE1DC]">
                  <div className="text-xl mb-1 text-[#7A9E88]">✦</div>
                  <p className="text-[10px] uppercase tracking-wider text-[#7A6C6C]">
                    Curated
                  </p>
                </div>

                <div className="bg-[#FFFAF6] rounded-2xl p-4 text-center border border-[#EDE1DC]">
                  <div className="text-xl mb-1 text-[#E8B4B8]">♡</div>
                  <p className="text-[10px] uppercase tracking-wider text-[#7A6C6C]">
                    Beauty
                  </p>
                </div>

                <div className="bg-[#FFFAF6] rounded-2xl p-4 text-center border border-[#EDE1DC]">
                  <div className="text-xl mb-1 text-[#7A9E88]">✧</div>
                  <p className="text-[10px] uppercase tracking-wider text-[#7A6C6C]">
                    Premium
                  </p>
                </div>

              </div>

              {/* ================= ADD TO CART ================= */}
              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className={`
                  w-full py-4 rounded-full font-semibold tracking-wide
                  transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A9E88] focus-visible:ring-offset-2
                  ${
                    outOfStock
                      ? "bg-[#D9CFCB] text-white cursor-not-allowed"
                      : "bg-[#7A9E88] text-white shadow-lg shadow-[#7A9E88]/20 hover:bg-[#688976] hover:scale-[1.02] active:scale-[0.98]"
                  }
                `}
              >
                {outOfStock
                  ? "Currently Unavailable"
                  : added
                  ? "Added to your bag ✓"
                  : "Add to VELOURA Bag"}
              </button>

              <p className="text-center text-xs text-[#8A7B7B] mt-4" aria-live="polite">
                {added
                  ? "Item added. You can keep shopping or view your bag."
                  : "A beautiful addition to your everyday beauty routine."}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      {relatedProducts.length > 0 && (
        <section
          ref={recommendationsRef}
          className="max-w-7xl mx-auto px-6 pb-24"
        >

          <div className="text-center mb-10">

            <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-3">
              Discover More
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-[#4A3F3F]">
              More from{" "}
              <span className="text-[#7A9E88] italic">
                {product.category}
              </span>
            </h2>

            <p className="mt-4 text-[#756868] max-w-xl mx-auto">
              Explore more beautiful pieces from the VELOURA{" "}
              {product.category.toLowerCase()} collection.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {relatedProducts.map((item, index) => (

              <div
                key={item.id}
                className={`
                  group bg-white rounded-[1.5rem] overflow-hidden
                  border border-[#EDE1DC]
                  transition-all duration-700
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >

                <Link
                  to={`/products/${item.id}`}
                  className="block relative aspect-square overflow-hidden bg-[#F6E3E0]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <span className="absolute top-4 left-4 bg-[#FFFAF6]/95 backdrop-blur-sm text-[#4A3F3F] text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {item.category}
                  </span>
                </Link>

                <div className="p-5">

                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-serif text-xl text-[#4A3F3F] group-hover:text-[#7A9E88] transition-colors duration-300">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mt-4">

                    <p className="font-semibold text-[#4A3F3F]">
                      ${Number(item.price).toFixed(2)}
                    </p>

                    <Link
                      to={`/products/${item.id}`}
                      aria-label={`View ${item.name}`}
                      className="w-9 h-9 rounded-full bg-[#F6E3E0] flex items-center justify-center text-[#4A3F3F] hover:bg-[#7A9E88] hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      →
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>
      )}


      {/* =====================================================
          BEAUTY MESSAGE
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#F6E3E0] px-8 py-12 md:px-14 text-center">

          <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-[#E8B4B8]/30 blur-3xl" />
          <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full bg-[#7A9E88]/10 blur-3xl" />

          <div className="relative">

            <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-3">
              The VELOURA Way
            </p>

            <h2 className="font-serif text-3xl md:text-4xl">
              Beauty is a moment,
              <br />
              not a routine.
            </h2>

            <p className="text-[#6D6060] mt-4 max-w-xl mx-auto leading-relaxed">
              Take a moment for yourself and make every
              beauty ritual feel special with VELOURA.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-[#7A9E88] text-white font-semibold hover:bg-[#688976] hover:-translate-y-0.5 transition-all"
            >
              Explore More
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;