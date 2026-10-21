import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCart } from "../CartContext";

function Navbar() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";
  const onProductsPage = location.pathname === "/products";

  const [search, setSearch] = useState(urlSearch);

  // URL badalne par (jaise Products page se search clear) input sync ho
  useEffect(() => {
    setSearch(onProductsPage ? urlSearch : "");
  }, [urlSearch, onProductsPage]);

  const navLinkClass = ({ isActive }) =>
    `
      relative
      text-xs md:text-sm
      font-medium
      transition-colors
      duration-300
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-[#E8B4B8]
      rounded
      ${
        isActive
          ? "text-[#E8B4B8]"
          : "text-[#FFFAF6] hover:text-[#E8B4B8]"
      }

      after:absolute
      after:left-0
      after:-bottom-2
      after:h-[2px]
      after:bg-[#E8B4B8]
      after:transition-all
      after:duration-300

      ${
        isActive
          ? "after:w-full"
          : "after:w-0 hover:after:w-full"
      }
    `;

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();
    const params = new URLSearchParams();

    // Products page par hon to category bachi rahe
    if (onProductsPage && urlCategory) params.set("category", urlCategory);
    if (query) params.set("search", query);

    const qs = params.toString();
    navigate(qs ? `/products?${qs}` : "/products");
  };

  const searchForm = (idSuffix, className) => (
    <form onSubmit={handleSearch} role="search" className={className}>
      <label htmlFor={`nav-search-${idSuffix}`} className="sr-only">
        Search products
      </label>

      <input
        id={`nav-search-${idSuffix}`}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="
          w-full
          sm:w-32 lg:w-44
          bg-transparent
          px-4
          py-1.5 sm:py-2
          text-sm
          text-white
          outline-none
          placeholder:text-[#BDB2AF]
        "
      />

      <button
        type="submit"
        className="
          w-9 h-9 sm:w-10 sm:h-10
          shrink-0
          flex items-center justify-center
          text-[#FFFAF6]
          hover:text-[#E8B4B8]
          transition-colors
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-[#E8B4B8]
        "
        aria-label="Search"
        title="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
    </form>
  );

  const searchBoxClass = `
    items-center
    bg-white/10
    border border-white/10
    rounded-full
    overflow-hidden
    focus-within:border-[#E8B4B8]
    transition-all
  `;

  return (
    <header
      className="
        sticky top-0 z-50
        bg-[#4A3F3F]
        border-b border-white/10
        shadow-lg
      "
    >
      {/* MAIN ROW: logo | links | cart (phone par bhi ek hi row) */}
      <nav
        aria-label="Main"
        className="
          max-w-7xl mx-auto
          px-3 sm:px-6
          h-14 md:h-20
          flex items-center justify-between
          gap-2
        "
      >

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B4B8]"
          aria-label="VELOURA home"
        >
          <div
            className="
              w-9 h-9 md:w-12 md:h-12
              rounded-full
              bg-[#F6E3E0]
              flex items-center justify-center
              overflow-hidden
              group-hover:scale-105
              transition-transform
            "
          >
            <img
              src="/images/logo.jpeg"
              alt=""
              className="w-14 h-14 md:w-20 md:h-20 object-contain"
            />
          </div>

          <div className="hidden md:block">
            <p className="font-serif text-xl leading-none text-[#FFFAF6]">
              VELOURA
            </p>

            <p className="text-[8px] uppercase tracking-[0.25em] text-[#E8B4B8] mt-1">
              Beauty & Ritual
            </p>
          </div>
        </Link>


        {/* NAVIGATION (phone par logo aur cart ke beech center me) */}
        <div className="flex items-center justify-center gap-5 sm:gap-8 max-md:flex-1">

          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

        </div>


        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* SEARCH (tablet / desktop) */}
          {searchForm("desktop", `hidden sm:flex ${searchBoxClass}`)}

          {/* CART */}
          <Link
            to="/cart"
            className="
              relative
              w-9 h-9 md:w-11 md:h-11
              rounded-full
              flex items-center justify-center
              bg-[#7A9E88]
              text-white
              hover:bg-[#8CAF98]
              hover:scale-105
              transition-all
              duration-300
              shadow-lg
              shadow-black/20
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#E8B4B8]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#4A3F3F]
            "
            title="Shopping Bag"
            aria-label={
              totalItems > 0
                ? `Shopping bag, ${totalItems} ${totalItems === 1 ? "item" : "items"}`
                : "Shopping bag, empty"
            }
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="w-[18px] h-[18px] md:w-5 md:h-5"
            >
              <path d="M6 8h12l1 12H5L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>

            {totalItems > 0 && (
              <span
                aria-hidden="true"
                className="
                  absolute
                  -top-1
                  -right-1
                  min-w-5
                  h-5
                  px-1
                  rounded-full
                  bg-[#E8B4B8]
                  text-[#4A3F3F]
                  text-[10px]
                  font-bold
                  flex items-center justify-center
                  border-2
                  border-[#4A3F3F]
                "
              >
                {totalItems}
              </span>
            )}

          </Link>

        </div>
      </nav>


      {/* MOBILE: sirf search bar niche ek line me (sm se chhoti screen) */}
      <div
        className="
          sm:hidden
          px-3
          pb-2.5
          bg-[#4A3F3F]
        "
      >
        {searchForm("mobile", `flex ${searchBoxClass}`)}
      </div>

    </header>
  );
}

export default Navbar;
