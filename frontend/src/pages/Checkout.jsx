import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { createOrder } from "../api";

const emptyForm = { name: "", email: "", phone: "", address: "", city: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your full name";
  if (!form.email.trim()) errors.email = "Please enter your email";
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
    errors.email = "Please enter a valid email";
  if (!form.address.trim()) errors.address = "Please enter your address";
  if (!form.city.trim()) errors.city = "Please enter your city";
  return errors;
}

const inputClass = (hasError) =>
  `w-full rounded-xl border px-4 py-3 text-sm bg-[#FFFAF6] text-[#4A3F3F] placeholder:text-[#B09F9A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A9E88] ${
    hasError ? "border-[#B05555]" : "border-[#EDE1DC]"
  }`;

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | processing | success
  const [submitError, setSubmitError] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (paymentStatus === "processing") return;

    const found = validate(form);
    setErrors(found);
    setSubmitError("");
    if (Object.keys(found).length > 0) return;

    setPaymentStatus("processing");

    // success screen ke liye cart ki copy, cart khali hone se pehle
    const snapshot = cart.map((item) => ({ ...item }));

    try {
      // server order banata hai aur price/stock khud check karta hai
      const [result] = await Promise.all([
        createOrder({
          customer: {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            city: form.city.trim(),
          },
          items: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
        }),
        // animation dikhane ke liye kam az kam 2 second
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      setCompletedOrder({
        orderId: result.orderId,
        total: Number(result.total),
        items: snapshot,
        email: form.email.trim(),
      });
      setPaymentStatus("success");
      clearCart();
    } catch (err) {
      setPaymentStatus("idle");
      setSubmitError(err.message || "Payment failed. Please try again.");
    }
  };

  // ================= SUCCESS SCREEN (sabse pehle check hota hai) =================
  if (paymentStatus === "success" && completedOrder) {
    const txHash = `0x${String(completedOrder.orderId).padEnd(24, "0")}`;

    return (
      <main className="min-h-screen bg-[#FFFAF6] flex items-center justify-center px-6 py-16">
        <div className="relative overflow-hidden bg-white border border-[#EDE1DC] rounded-[2.5rem] shadow-xl p-8 md:p-12 text-center max-w-lg w-full">

          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#E8B4B8]/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full bg-[#7A9E88]/15 blur-3xl" />

          <div className="relative" role="status" aria-live="polite">

            {/* VERIFIED ICON */}
            <div className="relative w-24 h-24 mx-auto">
              <span className="absolute inset-0 rounded-full bg-[#7A9E88]/20 animate-ping" />
              <div className="relative w-24 h-24 rounded-full bg-[#7A9E88]/15 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#7A9E88] text-white flex items-center justify-center text-3xl">
                  ✓
                </div>
              </div>
            </div>

            <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mt-8">
              Order Confirmed
            </p>

            <h1 className="font-serif text-3xl md:text-4xl text-[#4A3F3F] mt-3">
              Blockchain Transaction Verified
            </h1>

            <p className="text-[#756868] leading-7 mt-5">
              Thank you! Your Arith-Coin payment was successful and your
              order has been placed. A confirmation will be sent to{" "}
              <strong className="text-[#4A3F3F]">{completedOrder.email}</strong>.
            </p>

            {/* AMOUNT */}
            <div className="bg-[#F6E3E0] rounded-2xl p-5 mt-7">
              <p className="text-xs uppercase tracking-wider text-[#756868]">
                Amount Paid
              </p>
              <p className="font-serif text-3xl text-[#4A3F3F] mt-2">
                ${completedOrder.total.toFixed(2)}
              </p>
              <p className="text-xs text-[#756868] mt-1">
                {completedOrder.total.toFixed(2)} ARITH
              </p>
            </div>

            {/* ITEMS */}
            <ul className="mt-5 text-left text-sm text-[#756868] space-y-1">
              {completedOrder.items.map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span className="truncate">
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            {/* TRANSACTION */}
            <div className="mt-6">
              <p className="text-xs text-[#9A8C8C] uppercase tracking-wider">
                Demo Transaction ID
              </p>
              <p className="font-mono text-xs text-[#756868] mt-2 break-all">
                {txHash}
              </p>
              <p className="text-xs text-[#9A8C8C] mt-3">
                Order ID: {completedOrder.orderId}
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-3 w-full mt-8 py-4 rounded-full bg-[#7A9E88] text-white font-semibold hover:bg-[#688976] hover:scale-[1.02] transition-all duration-300"
            >
              Continue Shopping
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ================= EMPTY CART =================
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
            Checkout
          </p>

          <h1 className="font-serif text-4xl text-[#4A3F3F]">
            Your bag is empty
          </h1>

          <p className="text-[#756868] mt-4 leading-7">
            Add some beautiful products before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-3 mt-8 px-7 py-3.5 rounded-full bg-[#7A9E88] text-white font-semibold hover:bg-[#688976] hover:scale-105 transition-all duration-300"
          >
            Continue Shopping
            <span>→</span>
          </Link>
        </div>
      </main>
    );
  }

  // ================= CHECKOUT PAGE =================
  const processing = paymentStatus === "processing";

  return (
    <main className="min-h-screen bg-[#FFFAF6] text-[#4A3F3F]">

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-3">
          Secure Checkout
        </p>

        <h1 className="font-serif text-4xl md:text-5xl">
          Complete Your{" "}
          <span className="text-[#7A9E88] italic">Order</span>
        </h1>

        <p className="text-[#756868] mt-3 max-w-xl">
          Enter your delivery details and pay with demo Arith-Coin.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* ================= LEFT: FORM + PAYMENT ================= */}
          <form
            onSubmit={handlePayment}
            noValidate
            className="lg:col-span-3 space-y-8"
          >

            {/* DELIVERY DETAILS */}
            <div className="bg-white rounded-[2rem] border border-[#EDE1DC] shadow-sm p-7 md:p-9">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7A9E88]">
                Step 1
              </p>
              <h2 className="font-serif text-2xl mt-1 mb-6">
                Delivery Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">

                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm mb-1.5">
                    Full name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={processing}
                    aria-invalid={!!errors.name}
                    className={inputClass(errors.name)}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-xs text-[#B05555] mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-1.5">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={processing}
                    aria-invalid={!!errors.email}
                    className={inputClass(errors.email)}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-[#B05555] mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm mb-1.5">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={processing}
                    className={inputClass(false)}
                    placeholder="03XX XXXXXXX"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm mb-1.5">
                    Address *
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={processing}
                    aria-invalid={!!errors.address}
                    className={inputClass(errors.address)}
                    placeholder="House, street, area"
                  />
                  {errors.address && (
                    <p className="text-xs text-[#B05555] mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className="block text-sm mb-1.5">
                    City *
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={handleChange}
                    disabled={processing}
                    aria-invalid={!!errors.city}
                    className={inputClass(errors.city)}
                    placeholder="Your city"
                  />
                  {errors.city && (
                    <p className="text-xs text-[#B05555] mt-1">{errors.city}</p>
                  )}
                </div>

              </div>
            </div>

            {/* PAYMENT CARD */}
            <div className="bg-white rounded-[2rem] border border-[#EDE1DC] shadow-sm p-7 md:p-9">

              <p className="text-xs uppercase tracking-[0.2em] text-[#7A9E88]">
                Step 2
              </p>

              <div className="flex items-center gap-4 mt-1 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#4A3F3F] text-[#E8B4B8] flex items-center justify-center text-lg font-serif">
                  AC
                </div>
                <h2 className="font-serif text-2xl">Pay with Arith-Coin</h2>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#F6E3E0] text-[#4A3F3F] px-4 py-2 rounded-full text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#7A9E88]" />
                Demo payment only
              </div>

              {/* WALLET */}
              <div className="bg-[#4A3F3F] rounded-2xl p-5 text-[#FFFAF6]">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-wider text-[#D8CECB]">
                    Wallet Address
                  </p>
                  <span className="text-[10px] uppercase tracking-wider text-[#E8B4B8]">
                    Demo
                  </span>
                </div>
                <p className="font-mono text-xs md:text-sm mt-3 break-all">
                  0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                </p>
              </div>

              {/* AMOUNT */}
              <div className="mt-5 bg-[#FFFAF6] border border-[#EDE1DC] rounded-2xl p-6">
                <p className="text-sm text-[#756868]">Payment Amount</p>
                <p className="font-serif text-4xl mt-2">
                  ${totalPrice.toFixed(2)}
                </p>
                <p className="text-xs text-[#756868] mt-1">
                  {totalPrice.toFixed(2)} ARITH (1 ARITH = $1, demo rate)
                </p>
              </div>

              {/* ERROR FROM SERVER */}
              {submitError && (
                <p
                  role="alert"
                  className="mt-5 rounded-xl bg-[#B05555]/10 text-[#B05555] text-sm px-4 py-3"
                >
                  {submitError}
                </p>
              )}

              {/* PROCESSING / BUTTON */}
              {processing ? (
                <div
                  className="mt-7 bg-[#F6E3E0]/60 rounded-2xl p-7 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-14 h-14 border-4 border-[#E8B4B8] border-t-[#7A9E88] rounded-full animate-spin mx-auto" />

                  <p className="font-serif text-2xl mt-5">
                    Verifying on the blockchain
                  </p>

                  <p className="text-sm text-[#756868] mt-2">
                    Confirming your Arith-Coin transaction...
                  </p>

                  <div className="flex justify-center gap-1 mt-4">
                    <span className="w-2 h-2 rounded-full bg-[#7A9E88] animate-bounce" />
                    <span
                      className="w-2 h-2 rounded-full bg-[#7A9E88] animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-[#7A9E88] animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full mt-7 py-4 rounded-full bg-[#7A9E88] text-white font-semibold hover:bg-[#688976] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#7A9E88]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A9E88] focus-visible:ring-offset-2"
                >
                  Pay with Arith-Coin →
                </button>
              )}

              <p className="text-center text-xs text-[#9A8C8C] mt-4">
                This is a simulated cryptocurrency payment for demo purposes.
              </p>
            </div>
          </form>

          {/* ================= RIGHT: ORDER SUMMARY ================= */}
          <div className="lg:col-span-2">
            <div className="bg-[#4A3F3F] text-[#FFFAF6] rounded-[2rem] p-7 md:p-8 lg:sticky lg:top-28 shadow-xl">

              <p className="text-xs uppercase tracking-[0.25em] text-[#E8B4B8]">
                Your Selection
              </p>

              <h2 className="font-serif text-3xl mt-3 mb-7">Order Summary</h2>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 pb-5 border-b border-white/10"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F6E3E0] shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-lg truncate">{item.name}</p>
                      <p className="text-xs text-[#BDB2AF] mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-[#E8B4B8]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <div className="flex justify-between text-sm text-[#D8CECB]">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-[#D8CECB] mt-3">
                  <span>Shipping</span>
                  <span className="text-[#E8B4B8]">Free</span>
                </div>

                <div className="flex justify-between items-center border-t border-white/10 mt-5 pt-5">
                  <span className="font-serif text-xl">Total</span>
                  <span className="text-2xl font-semibold text-[#E8B4B8]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-7 bg-white/5 rounded-xl p-4 flex gap-3">
                <span className="text-[#7A9E88]">✓</span>
                <p className="text-xs text-[#BDB2AF] leading-5">
                  Secure demo checkout. No real cryptocurrency or money is
                  transferred.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Checkout;