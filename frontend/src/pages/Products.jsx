import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["All", "Skincare", "Makeup", "Haircare", "Fragrance"];

  // ================= FETCH PRODUCTS FROM API =================
  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError("");

    getProducts({
      category: selectedCategory && selectedCategory !== "All" ? selectedCategory : "",
      search: searchQuery.trim(),
    })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setProducts([]);
          setError(err.message || "Something went wrong");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // purani request ka jawab naye filter ko overwrite na kare
    return () => {
      cancelled = true;
    };
  }, [selectedCategory, searchQuery]);

  const handleCategory = (category) => {
    const params = {};

    if (category !== "All") {
      params.category = category;
    }

    if (searchQuery) {
      params.search = searchQuery;
    }

    setSearchParams(params);
  };

  const retry = () => {
    // same params dobara set karne se effect dobara nahi chalta,
    // is liye page reload sabse simple retry hai
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-[#FFFAF6] text-[#4A3F3F]">

      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-10">

        <div className="max-w-2xl">

          <p className="text-xs uppercase tracking-[0.35em] text-[#7A9E88] mb-4">
            The VELOURA Collection
          </p>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">

            Beauty,
            <br />

            <span className="text-[#7A9E88] italic">
              Beautifully Curated.
            </span>

          </h1>

          <p className="mt-5 text-[#756868] max-w-xl leading-7">

            Explore thoughtfully selected skincare, makeup,
            haircare and fragrances designed to bring beauty,
            confidence and a little luxury into your everyday life.

          </p>

        </div>

      </section>


      {/* ================= SEARCH RESULT ================= */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-7">

          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-[#F6E3E0]
              px-4
              py-2.5
              rounded-full
              text-sm
              text-[#4A3F3F]
              border
              border-[#E8D4D0]
            "
          >

            <span className="text-[#756868]">
              Searching for
            </span>

            <strong>
              "{searchQuery}"
            </strong>

            <button
              onClick={() => {
                const params = {};

                if (
                  selectedCategory &&
                  selectedCategory !== "All"
                ) {
                  params.category = selectedCategory;
                }

                setSearchParams(params);
              }}
              className="
                ml-2
                w-5
                h-5
                rounded-full
                bg-[#4A3F3F]
                text-white
                flex
                items-center
                justify-center
                text-xs
                hover:bg-[#7A9E88]
                transition-colors
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#7A9E88]
              "
              aria-label="Clear search"
            >
              ×
            </button>

          </div>

        </div>
      )}


      {/* ================= CATEGORY FILTER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10">

        <div className="flex flex-wrap gap-2 sm:gap-3">

          {categories.map((category) => {

            const isActive =
              (!selectedCategory && category === "All") ||
              selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => handleCategory(category)}
                aria-pressed={isActive}
                className={`
                  px-4 py-2 sm:px-5 sm:py-2.5
                  rounded-full
                  text-xs sm:text-sm
                  font-medium
                  transition-all
                  duration-300
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#7A9E88]

                  ${
                    isActive
                      ? "bg-[#7A9E88] text-white shadow-md shadow-[#7A9E88]/20"
                      : "bg-white text-[#5D5050] border border-[#EDE1DC] hover:bg-[#F6E3E0] hover:border-[#E8B4B8]"
                  }
                `}
              >
                {category}
              </button>
            );
          })}

        </div>

      </section>


      {/* ================= COLLECTION INFO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">

        <div className="flex items-center justify-between">

          <p className="text-sm text-[#8A7B7B]" aria-live="polite">

            {loading
              ? "Loading products..."
              : error
              ? ""
              : `${products.length} ${products.length === 1 ? "product" : "products"}`}

          </p>

          <p className="hidden sm:block text-xs uppercase tracking-[0.2em] text-[#B09F9A]">
            Beauty • Self-Care • VELOURA
          </p>

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">

        {/* ---------- LOADING STATE ---------- */}
        {loading && (
          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-3 sm:gap-6
            "
            aria-hidden="true"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl sm:rounded-3xl bg-white border border-[#EDE1DC] overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-[#F6E3E0]/60" />
                <div className="p-3 sm:p-5 space-y-3">
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
          <div className="text-center py-24" role="alert">

            <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-3">
              VELOURA Collection
            </p>

            <h2 className="font-serif text-3xl md:text-4xl">
              Something went wrong
            </h2>

            <p className="text-[#756868] mt-3 max-w-md mx-auto leading-7">
              We couldn't load the products right now. Please check
              your connection and try again.
            </p>

            <button
              onClick={retry}
              className="
                mt-7
                px-6
                py-3
                rounded-full
                bg-[#7A9E88]
                text-white
                font-medium
                shadow-lg
                shadow-[#7A9E88]/20
                hover:bg-[#688976]
                hover:-translate-y-0.5
                transition-all
              "
            >
              Try Again
            </button>

          </div>
        )}


        {/* ---------- PRODUCT GRID ---------- */}
        {!loading && !error && products.length > 0 && (

          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-3 sm:gap-6
            "
          >

            {products.map((product, index) => (

              <div
                key={product.id}
                className="animate-fade-up min-w-0"
                style={{
                  animationDelay: `${index * 60}ms`,
                }}
              >

                <ProductCard product={product} />

              </div>

            ))}

          </div>

        )}


        {/* ---------- EMPTY STATE ---------- */}
        {!loading && !error && products.length === 0 && (

          <div className="text-center py-24">

            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-full
                bg-[#F6E3E0]
                flex
                items-center
                justify-center
                text-2xl
                mb-5
                text-[#7A9E88]
              "
            >
              ✦
            </div>


            <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-3">
              VELOURA Collection
            </p>


            <h2 className="font-serif text-3xl md:text-4xl">
              Nothing found
            </h2>


            <p className="text-[#756868] mt-3 max-w-md mx-auto leading-7">
              We couldn't find a beauty essential matching
              your search. Try another product or explore
              one of our beauty collections.
            </p>


            <button
              onClick={() => setSearchParams({})}
              className="
                mt-7
                px-6
                py-3
                rounded-full
                bg-[#7A9E88]
                text-white
                font-medium
                shadow-lg
                shadow-[#7A9E88]/20
                hover:bg-[#688976]
                hover:-translate-y-0.5
                transition-all
              "
            >
              Explore All Products
            </button>

          </div>

        )}

      </section>


      {/* ================= BOTTOM BRAND MESSAGE ================= */}
      {!loading && !error && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">

          <div className="border-t border-[#E7DCD7] pt-10 text-center">

            <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-3">
              The VELOURA Experience
            </p>

            <p className="font-serif text-2xl md:text-3xl">
              Beautiful products. Beautiful moments.
            </p>

            <p className="text-sm text-[#756868] mt-3">
              Thoughtfully curated for your everyday beauty and self-care.
            </p>

          </div>

        </section>
      )}

    </main>
  );
}

export default Products;
