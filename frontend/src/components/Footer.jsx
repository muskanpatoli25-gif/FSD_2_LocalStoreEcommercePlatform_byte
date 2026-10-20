import { useState } from "react";
import { Link } from "react-router-dom";

// TODO: apne asli links/email yahan likhein
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/",
  pinterest: "https://www.pinterest.com/",
};
const CONTACT_EMAIL = "hello@veloura.example";

const socialClass = `
  w-10 h-10
  rounded-full
  bg-white/10
  flex items-center justify-center
  hover:bg-[#E8B4B8]
  hover:text-[#4A3F3F]
  hover:-translate-y-1
  transition-all
  duration-300
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-[#E8B4B8]
`;

const footerLink =
  "hover:text-[#E8B4B8] hover:translate-x-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B4B8] rounded";

function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success

  // Demo only: backend me newsletter endpoint nahi hai, email save nahi hota
  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="bg-[#4A3F3F] text-[#FFFAF6]">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B4B8]"
            >
              <div
                className="
                  w-12 h-12
                  rounded-full
                  bg-[#F6E3E0]
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                  group-hover:scale-105
                  transition-transform
                  duration-300
                "
              >
                <img
                  src="/images/logo.jpeg"
                  alt="VELOURA Beauty"
                  className="w-10 h-10 object-contain"
                />
              </div>

              <div>
                <p className="font-serif text-2xl text-[#FFFAF6]">
                  VELOURA
                </p>

                <p className="text-[8px] uppercase tracking-[0.25em] text-[#E8B4B8]">
                  Beauty & Ritual
                </p>
              </div>
            </Link>

            <p className="mt-6 text-sm text-[#D8CECB] leading-7 max-w-xs">
              Discover thoughtfully curated beauty essentials designed
              to make your everyday self-care feel a little more special.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mt-6">

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VELOURA on Instagram"
                className={socialClass}
              >
                <span aria-hidden="true">◎</span>
              </a>

              <a
                href={SOCIAL_LINKS.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VELOURA on Pinterest"
                className={socialClass}
              >
                <span aria-hidden="true">♡</span>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email VELOURA"
                className={socialClass}
              >
                <span aria-hidden="true">✉</span>
              </a>

            </div>
          </div>


          {/* SHOP */}
          <nav aria-label="Shop">
            <h2 className="font-serif text-xl text-[#FFFAF6] mb-5">
              Shop VELOURA
            </h2>

            <div className="flex flex-col gap-3 text-sm text-[#D8CECB]">
              <Link to="/products" className={footerLink}>All Products</Link>
              <Link to="/products?category=Skincare" className={footerLink}>Skincare</Link>
              <Link to="/products?category=Makeup" className={footerLink}>Makeup</Link>
              <Link to="/products?category=Haircare" className={footerLink}>Haircare</Link>
              <Link to="/products?category=Fragrance" className={footerLink}>Fragrance</Link>
            </div>
          </nav>


          {/* EXPLORE */}
          <nav aria-label="Explore">
            <h2 className="font-serif text-xl text-[#FFFAF6] mb-5">
              Explore
            </h2>

            <div className="flex flex-col gap-3 text-sm text-[#D8CECB]">
              <Link to="/about" className={footerLink}>Our Story</Link>
              <Link to="/products" className={footerLink}>Beauty Collection</Link>
              <Link to="/cart" className={footerLink}>Your Beauty Bag</Link>
              <Link to="/checkout" className={footerLink}>Secure Checkout</Link>
            </div>
          </nav>


          {/* NEWSLETTER */}
          <div>
            <h2 className="font-serif text-xl text-[#FFFAF6] mb-5">
              Stay in the Glow
            </h2>

            <p className="text-sm text-[#D8CECB] leading-6 mb-5">
              Get beauty inspiration, new arrivals and special
              offers delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} noValidate>

              <label htmlFor="footer-email" className="sr-only">
                Your email address
              </label>

              <div
                className="
                  flex
                  bg-white/10
                  rounded-full
                  p-1
                  border
                  border-white/10
                  focus-within:border-[#E8B4B8]
                  transition-colors
                "
              >
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Your email"
                  autoComplete="email"
                  aria-invalid={status === "error"}
                  aria-describedby="footer-email-message"
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-4
                    py-2
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-[#BDB2AF]
                  "
                />

                <button
                  type="submit"
                  className="
                    px-5
                    py-2
                    rounded-full
                    bg-[#E8B4B8]
                    text-[#4A3F3F]
                    text-xs
                    font-semibold
                    hover:bg-[#F6E3E0]
                    hover:scale-105
                    transition-all
                    duration-300
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#FFFAF6]
                  "
                >
                  Join
                </button>
              </div>

              <p
                id="footer-email-message"
                role="status"
                aria-live="polite"
                className={`mt-3 text-xs min-h-[1rem] ${
                  status === "error" ? "text-[#F2B8B8]" : "text-[#E8B4B8]"
                }`}
              >
                {status === "error" && "Please enter a valid email address."}
                {status === "success" && "Thank you! You're on the list."}
              </p>

            </form>

          </div>

        </div>
      </div>


      {/* BOTTOM FOOTER */}
      <div className="border-t border-white/10">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-5
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-3
            text-xs
            text-[#BDB2AF]
          "
        >

          <p>
            © 2026 VELOURA Beauty. All rights reserved.
          </p>

          <p>
            Made with <span aria-hidden="true">♡</span> for your everyday glow.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;