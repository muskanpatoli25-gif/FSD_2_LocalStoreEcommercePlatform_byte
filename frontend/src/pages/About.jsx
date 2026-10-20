import { Link } from "react-router-dom";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A9E88] focus-visible:ring-offset-2";

function About() {
  const values = [
    {
      icon: "✦",
      iconBg: "bg-[#F6E3E0]",
      title: "Thoughtfully Curated",
      text: "Every VELOURA product is selected with care to complement your everyday beauty routine.",
    },
    {
      icon: "♡",
      iconBg: "bg-[#E8B4B8]/40",
      title: "Made for You",
      text: "From everyday essentials to little luxuries, VELOURA is designed to make your routine feel personal and beautiful.",
    },
    {
      icon: "✧",
      iconBg: "bg-[#7A9E88]/15",
      title: "Everyday Luxury",
      text: "Luxury does not have to be complicated. Sometimes, it is simply a quiet moment created just for you.",
    },
  ];

  const categories = [
    {
      name: "Skincare",
      tagline: "Glow & nourish",
      icon: "✦",
      className: "bg-[#F6E3E0]",
      iconClass: "",
      taglineClass: "text-[#756868]",
    },
    {
      name: "Makeup",
      tagline: "Express yourself",
      icon: "♡",
      className: "bg-[#E8B4B8]/40",
      iconClass: "",
      taglineClass: "text-[#756868]",
    },
    {
      name: "Haircare",
      tagline: "Soft & silky",
      icon: "✧",
      className: "bg-[#7A9E88]/15",
      iconClass: "",
      taglineClass: "text-[#756868]",
    },
    {
      name: "Fragrance",
      tagline: "Leave an impression",
      icon: "♡",
      className: "bg-[#4A3F3F] text-[#FFFAF6]",
      iconClass: "text-[#E8B4B8]",
      taglineClass: "text-[#D8CECB]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFFAF6] text-[#4A3F3F]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT CONTENT */}
            <div>

              <p className="text-xs uppercase tracking-[0.35em] text-[#7A9E88] mb-5">
                The VELOURA Story
              </p>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
                Beauty should
                <br />
                feel like a{" "}
                <span className="text-[#7A9E88] italic">ritual.</span>
              </h1>

              <div className="w-16 h-[2px] bg-[#E8B4B8] my-7" />

              <p className="text-[#756868] text-base md:text-lg leading-8 max-w-xl">
                VELOURA was created with a simple belief: beauty should
                feel beautiful, intentional and personal, not rushed,
                complicated or ordinary.
              </p>

              <p className="text-[#756868] leading-7 max-w-xl mt-5">
                From nourishing skincare and effortless makeup to haircare
                essentials and captivating fragrances, every VELOURA piece
                is chosen to turn everyday moments into something worth
                enjoying.
              </p>

              <Link
                to="/products"
                className={`inline-flex items-center gap-3 mt-8 px-7 py-3.5 rounded-full bg-[#7A9E88] text-white font-medium shadow-lg shadow-[#7A9E88]/20 hover:bg-[#688976] hover:scale-105 transition-all duration-300 ${focusRing}`}
              >
                Explore VELOURA
                <span aria-hidden="true">→</span>
              </Link>

            </div>

            {/* RIGHT VISUAL */}
            <div className="relative">

              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#E8B4B8]/40 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-[#7A9E88]/15 blur-3xl" />

              <div className="relative bg-[#F6E3E0] rounded-[3rem] p-8 md:p-12 min-h-[430px] flex items-center justify-center overflow-hidden">

                <div className="absolute top-10 right-10 w-24 h-24 rounded-full border border-[#7A9E88]/30" />
                <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full border border-[#E8B4B8]/60" />

                <div className="relative text-center">

                  <div className="w-32 h-32 rounded-full bg-[#FFFAF6] mx-auto flex items-center justify-center overflow-hidden shadow-lg">
                    <img
                      src="/images/logo.jpeg"
                      alt="VELOURA logo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="font-serif text-3xl mt-8">VELOURA</p>

                  <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mt-2">
                    Beauty & Ritual
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= PHILOSOPHY ================= */}
      <section className="bg-white border-y border-[#EDE1DC]">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-4">
              The VELOURA Philosophy
            </p>

            <h2 className="font-serif text-4xl md:text-5xl">
              Little moments,
              <br />
              <span className="text-[#7A9E88] italic">
                beautifully curated.
              </span>
            </h2>

            <p className="text-[#756868] leading-7 mt-6">
              At VELOURA, we believe beauty is not about perfection. It is
              about creating small moments that make you feel confident,
              cared for and completely yourself.
            </p>

          </div>

          {/* VALUES */}
          <div className="grid md:grid-cols-3 gap-6 mt-14">

            {values.map((value) => (
              <div
                key={value.title}
                className="bg-[#FFFAF6] rounded-[2rem] p-8 text-center border border-[#EDE1DC] hover:-translate-y-2 transition-all duration-500"
              >
                <div
                  className={`w-14 h-14 mx-auto rounded-full ${value.iconBg} flex items-center justify-center text-[#7A9E88] text-xl`}
                  aria-hidden="true"
                >
                  {value.icon}
                </div>

                <h3 className="font-serif text-2xl mt-5">{value.title}</h3>

                <p className="text-[#756868] text-sm leading-7 mt-4">
                  {value.text}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-12">

          <p className="text-xs uppercase tracking-[0.3em] text-[#7A9E88] mb-3">
            The VELOURA Collection
          </p>

          <h2 className="font-serif text-4xl md:text-5xl">
            Something for{" "}
            <span className="text-[#7A9E88] italic">everyone.</span>
          </h2>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`group ${cat.className} rounded-[2rem] p-7 min-h-[190px] flex flex-col justify-end hover:-translate-y-2 transition-all duration-500 ${focusRing}`}
            >
              <span
                className={`text-3xl mb-auto ${cat.iconClass}`}
                aria-hidden="true"
              >
                {cat.icon}
              </span>

              <h3 className="font-serif text-2xl">{cat.name}</h3>

              <p className={`text-sm mt-1 ${cat.taglineClass}`}>
                {cat.tagline}
              </p>
            </Link>
          ))}

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#4A3F3F] px-8 py-16 md:px-16 text-center">

          <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[#E8B4B8]/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full bg-[#7A9E88]/10 blur-3xl" />

          <div className="relative">

            <p className="text-xs uppercase tracking-[0.3em] text-[#E8B4B8] mb-4">
              Your VELOURA journey starts here
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-[#FFFAF6]">
              Find something
              <br />
              beautiful for yourself.
            </h2>

            <p className="text-[#D8CECB] max-w-xl mx-auto mt-5 leading-7">
              Explore the VELOURA collection and discover beauty essentials
              created to make your everyday moments feel more beautiful.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 mt-8 px-7 py-3.5 rounded-full bg-[#E8B4B8] text-[#4A3F3F] font-semibold hover:bg-[#F6E3E0] hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFAF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A3F3F]"
            >
              Explore VELOURA
              <span aria-hidden="true">→</span>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default About;