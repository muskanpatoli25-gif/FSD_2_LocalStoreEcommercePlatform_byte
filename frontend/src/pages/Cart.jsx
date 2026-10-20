import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  /* ================= EMPTY CART ================= */
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFFAF6] flex items-center justify-center px-6">
        <div className="text-center max-w-md">

          <div className="w-24 h-24 mx-auto rounded-full bg-[#F6E3E0] flex items-center justify-center text-[#7A9E88] mb-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 8h12l1 12H5L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-3">
            VELOURA Beauty
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#4A3F3F]">
            Your bag is empty
          </h1>

          <p className="text-[#756868] mt-4 leading-7">
            Your next beauty favourite is waiting to be discovered.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-3 mt-8 px-7 py-3.5 rounded-full bg-[#7A9E88] text-white font-semibold hover:bg-[#688976] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#7A9E88]/20"
          >
            Explore VELOURA
            <span>→</span>
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFAF6] text-[#4A3F3F]">

      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">

        <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-3">
          Your Selection
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

          <div>
            <h1 className="font-serif text-4xl md:text-5xl">
              Your Beauty{" "}
              <span className="text-[#7A9E88] italic">Bag</span>
            </h1>

            <p className="text-[#756868] mt-3">
              Review your selected VELOURA essentials before checkout.
            </p>
          </div>

          <Link
            to="/products"
            className="text-sm font-medium text-[#7A9E88] hover:text-[#4A3F3F] transition-colors"
          >
            ← Continue Shopping
          </Link>

        </div>

      </section>


      {/* ================= CART CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ---------- CART ITEMS ---------- */}
          <div className="lg:col-span-2 space-y-4">

            {cart.map((item) => {
              const price = Number(item.price) || 0;
              const stock = Number(item.stock);
              const hasStock = item.stock != null && Number.isFinite(stock);
              const atMax = hasStock && item.quantity >= stock;
              const atMin = item.quantity <= 1;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-[1.5rem] border border-[#EDE1DC] p-4 md:p-5 flex gap-4 md:gap-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >

                  {/* PRODUCT IMAGE */}
                  <Link
                    to={`/products/${item.id}`}
                    className="shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-[#F6E3E0]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>


                  {/* PRODUCT INFO */}
                  <div className="flex-1 min-w-0">

                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A9E88] mb-2">
                      {item.category}
                    </p>

                    <Link to={`/products/${item.id}`}>
                      <h2 className="font-serif text-xl md:text-2xl text-[#4A3F3F] hover:text-[#7A9E88] transition-colors">
                        {item.name}
                      </h2>
                    </Link>

                    <p className="text-[#756868] mt-2">
                      ${price.toFixed(2)}
                    </p>


                    {/* QUANTITY + REMOVE */}
                    <div className="flex flex-wrap items-center gap-4 mt-5">

                      <div className="flex items-center border border-[#EDE1DC] rounded-full overflow-hidden">

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={atMin}
                          className="w-9 h-9 flex items-center justify-center text-[#4A3F3F] hover:bg-[#F6E3E0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7A9E88]"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <span
                          className="w-9 text-center text-sm font-semibold"
                          aria-live="polite"
                        >
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={atMax}
                          className="w-9 h-9 flex items-center justify-center text-[#4A3F3F] hover:bg-[#F6E3E0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7A9E88]"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>

                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs uppercase tracking-wider text-[#9A7D7D] hover:text-[#B05555] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A9E88] rounded"
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        Remove
                      </button>

                    </div>

                    {atMax && (
                      <p className="text-xs text-[#B7894A] mt-3">
                        Only {stock} available
                      </p>
                    )}

                  </div>


                  {/* ITEM TOTAL */}
                  <div className="hidden sm:block text-right">

                    <p className="text-xs uppercase tracking-wider text-[#9A8C8C]">
                      Total
                    </p>

                    <p className="font-semibold text-[#4A3F3F] mt-2">
                      ${(price * item.quantity).toFixed(2)}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>


          {/* ---------- ORDER SUMMARY ---------- */}
          <div className="lg:col-span-1">

            <div className="bg-[#4A3F3F] text-[#FFFAF6] rounded-[2rem] p-7 md:p-8 lg:sticky lg:top-28 shadow-xl">

              <p className="text-xs uppercase tracking-[0.25em] text-[#E8B4B8]">
                VELOURA Order
              </p>

              <h2 className="font-serif text-3xl mt-3">
                Order Summary
              </h2>

              <div className="flex items-center justify-between mt-8 pb-5 border-b border-white/10">
                <span className="text-[#D8CECB]">
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>

                <span className="font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between py-5 border-b border-white/10">
                <span className="text-[#D8CECB]">Shipping</span>
                <span className="text-[#E8B4B8] text-sm">Free</span>
              </div>

              <div className="flex items-center justify-between pt-6">
                <span className="font-serif text-xl">Total</span>

                <span className="text-2xl font-semibold text-[#E8B4B8]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-3 w-full mt-7 py-4 rounded-full bg-[#E8B4B8] text-[#4A3F3F] font-semibold hover:bg-[#F6E3E0] hover:scale-[1.02] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFAF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A3F3F]"
              >
                Secure Checkout
                <span>→</span>
              </Link>

              <p className="text-center text-xs text-[#BDB2AF] mt-5">
                Demo checkout with Arith-Coin
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Cart;