import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

// Home page ke "VELOURA Bestsellers" jo pehle 4 products dikhata hai, unhi par badge
const BESTSELLER_IDS = ["1", "2", "3", "4"];

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animation sirf ek baar chalegi
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // "Added" message 1.5 second baad khud hat jaye
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  const price = Number(product.price) || 0;
  const hasStock = product.stock != null && Number.isFinite(Number(product.stock));
  const stock = hasStock ? Number(product.stock) : Infinity;
  const outOfStock = stock <= 0;
  const lowStock = stock > 0 && stock <= 5;
  const isBestseller = BESTSELLER_IDS.includes(String(product.id));

  const handleAdd = () => {
    if (outOfStock) return;
    addToCart(product);
    setAdded(true);
  };

  // Badge ki common (mobile chhoti / desktop pehle jaisi) styling
  const badgeBase = `
    absolute
    top-2 left-2 sm:top-4 sm:left-4
    text-[9px] sm:text-[10px]
    uppercase
    tracking-wider
    px-2 py-1 sm:px-3 sm:py-1.5
    rounded-full
  `;

  return (
    <article
      ref={cardRef}
      className={`
        beauty-product-card
        ${isVisible ? "product-visible" : ""}
        group
        bg-white
        rounded-2xl sm:rounded-[1.5rem]
        overflow-hidden
        border border-[#EDE1DC]
        hover:border-[#D8C8C2]
        hover:-translate-y-2
        hover:shadow-2xl
        hover:shadow-[#7A9E88]/10
        transition-all
        duration-500
      `}
    >

      {/* PRODUCT IMAGE */}
      <Link
        to={`/products/${product.id}`}
        className="block relative aspect-square overflow-hidden bg-[#F6E3E0]"
      >

        <img
          src={product.image}
          alt={product.name}
          className={`
            w-full
            h-full
            object-cover
            group-hover:scale-110
            transition-transform
            duration-700
            ${outOfStock ? "opacity-60" : ""}
          `}
        />

        {/* Overlay */}
        <div className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/20
          via-transparent
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        " />

        {/* Badge: stock ya bestseller */}
        {outOfStock ? (
          <span className={`${badgeBase} bg-[#4A3F3F]/90 text-white`}>
            Out of stock
          </span>
        ) : lowStock ? (
          <span
            className={`${badgeBase} bg-[#FFFAF6]/95 backdrop-blur-sm text-[#B7894A]`}
          >
            Only {stock} left
          </span>
        ) : isBestseller ? (
          <span
            className={`${badgeBase} bg-[#FFFAF6]/95 backdrop-blur-sm text-[#4A3F3F]`}
          >
            Bestseller
          </span>
        ) : null}

        {/* Arrow */}
        <div
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4"
          aria-hidden="true"
        >

          <span className="
            w-10
            h-10
            rounded-full
            bg-white/90
            backdrop-blur
            flex
            items-center
            justify-center
            text-[#4A3F3F]
            opacity-0
            translate-y-3
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-300
            shadow-md
          ">
            →
          </span>

        </div>

      </Link>


      {/* PRODUCT INFO */}
      <div className="p-3 sm:p-5">

        <p className="
          text-[9px] sm:text-[10px]
          uppercase
          tracking-[0.15em] sm:tracking-[0.2em]
          text-[#7A9E88]
          font-semibold
          truncate
        ">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>

          <h2 className="
            font-serif
            text-base sm:text-xl
            leading-snug
            mt-1 sm:mt-2
            text-[#4A3F3F]
            group-hover:text-[#7A9E88]
            transition-colors
            duration-300
            line-clamp-2 sm:line-clamp-none
          ">
            {product.name}
          </h2>

        </Link>

        <p className="
          text-xs sm:text-sm
          text-[#817474]
          mt-1.5 sm:mt-2
          line-clamp-2
          leading-relaxed
        ">
          {product.description}
        </p>


        {/* PRICE + CART */}
        <div className="flex items-center justify-between gap-2 mt-3 sm:mt-5">

          <p className="font-semibold text-sm sm:text-base text-[#4A3F3F]">
            ${price.toFixed(2)}
          </p>

          <button
            onClick={handleAdd}
            disabled={outOfStock}
            aria-label={
              outOfStock
                ? `${product.name} is out of stock`
                : `Add ${product.name} to bag`
            }
            className={`
              flex
              items-center
              gap-1 sm:gap-2
              px-3 py-1.5 sm:px-4 sm:py-2
              rounded-full
              text-[11px] sm:text-xs
              font-semibold
              whitespace-nowrap
              transition-all
              duration-300
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#7A9E88]
              focus-visible:ring-offset-2
              ${
                outOfStock
                  ? "bg-[#EDE1DC] text-[#9A8C8C] cursor-not-allowed"
                  : added
                  ? "bg-[#7A9E88] text-white"
                  : "bg-[#E8B4B8] text-[#4A3F3F] hover:bg-[#7A9E88] hover:text-white hover:scale-105"
              }
            `}
          >
            {outOfStock ? (
              "Sold out"
            ) : added ? (
              <>
                <span>✓</span>
                Added
              </>
            ) : (
              <>
                <span>+</span>
                Add
              </>
            )}
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;
