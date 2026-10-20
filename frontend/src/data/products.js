const products = [
  // =========================
  // SKINCARE - 8 PRODUCTS
  // =========================

  {
    id: 1,
    name: "Glow Hydrating Serum",
    price: 24.99,
    category: "Skincare",
    image: "/images/products/glow-serum.jpeg",
    description:
      "A lightweight hydrating serum that leaves your skin soft, fresh and naturally glowing.",
  },

  {
    id: 2,
    name: "Rose Face Cream",
    price: 19.99,
    category: "Skincare",
    image: "/images/products/rose-face-cream.jpeg",
    description:
      "A luxurious rose-infused face cream designed to deeply moisturize and nourish your skin.",
  },

  {
    id: 3,
    name: "Gentle Facial Cleanser",
    price: 16.99,
    category: "Skincare",
    image: "/images/products/facial-cleanser.jpeg",
    description:
      "A gentle daily cleanser that removes impurities while keeping your skin feeling fresh and balanced.",
  },

  {
    id: 4,
    name: "Vitamin C Brightening Serum",
    price: 27.99,
    category: "Skincare",
    image: "/images/products/vitamin-c-serum.jpeg",
    description:
      "A brightening vitamin C serum that helps create a smoother and more radiant-looking complexion.",
  },

  {
    id: 5,
    name: "Hydrating Face Mask",
    price: 14.99,
    category: "Skincare",
    image: "/images/products/hydrating-mask.jpeg",
    description:
      "A soothing face mask that delivers an extra boost of hydration for soft and refreshed skin.",
  },

  {
    id: 6,
    name: "Daily Moisturizer",
    price: 21.99,
    category: "Skincare",
    image: "/images/products/daily-moisturizer.jpeg",
    description:
      "A silky everyday moisturizer that keeps your skin comfortable, smooth and hydrated.",
  },

  {
    id: 7,
    name: "Rose Water Toner",
    price: 17.99,
    category: "Skincare",
    image: "/images/products/rose-toner.jpeg",
    description:
      "A refreshing rose water toner that gently revitalizes your skin and completes your daily routine.",
  },

  {
    id: 8,
    name: "Overnight Repair Cream",
    price: 28.99,
    category: "Skincare",
    image: "/images/products/overnight-cream.jpeg",
    description:
      "A rich overnight cream designed to nourish tired-looking skin while you rest.",
  },

  // =========================
  // MAKEUP - 8 PRODUCTS
  // =========================

  {
    id: 9,
    name: "Soft Nude Lipstick",
    price: 15.99,
    category: "Makeup",
    image: "/images/products/nude-lipstick.jpeg",
    description:
      "A creamy nude lipstick with a soft finish that is perfect for effortless everyday looks.",
  },

  {
    id: 10,
    name: "Rose Blush",
    price: 18.99,
    category: "Makeup",
    image: "/images/products/rose-blush.jpeg",
    description:
      "A silky rose blush that adds a natural-looking flush of color to your cheeks.",
  },

  {
    id: 11,
    name: "Glow Highlighter",
    price: 20.99,
    category: "Makeup",
    image: "/images/products/glow-highlighter.jpeg",
    description:
      "A luminous highlighter that gives your skin a soft, radiant and beautifully lit-from-within glow.",
  },

  {
    id: 12,
    name: "Volume Mascara",
    price: 17.99,
    category: "Makeup",
    image: "/images/products/volume-mascara.jpeg",
    description:
      "A volumizing mascara designed to define and enhance your lashes for an elegant eye look.",
  },

  {
    id: 13,
    name: "Nude Eyeshadow Palette",
    price: 29.99,
    category: "Makeup",
    image: "/images/products/nude-eyeshadow.jpeg",
    description:
      "A versatile collection of warm nude shades for creating soft daytime and glamorous evening looks.",
  },

  {
    id: 14,
    name: "Velvet Makeup Brush Set",
    price: 23.99,
    category: "Makeup",
    image: "/images/products/makeup-brush-set.jpeg",
    description:
      "A premium set of soft makeup brushes designed for smooth and effortless application.",
  },

  {
    id: 15,
    name: "Liquid Foundation",
    price: 26.99,
    category: "Makeup",
    image: "/images/products/liquid-foundation.jpeg",
    description:
      "A lightweight liquid foundation that creates a smooth, natural-looking and polished finish.",
  },

  {
    id: 16,
    name: "Soft Pink Lip Gloss",
    price: 13.99,
    category: "Makeup",
    image: "/images/products/pink-lip-gloss.jpeg",
    description:
      "A glossy soft pink lip color that gives your lips a beautiful hydrated-looking shine.",
  },

  // =========================
  // HAIRCARE - 8 PRODUCTS
  // =========================

  {
    id: 17,
    name: "Silky Hair Shampoo",
    price: 18.99,
    category: "Haircare",
    image: "/images/products/silky-shampoo.jpeg",
    description:
      "A gentle shampoo that cleanses your hair while leaving it feeling soft, smooth and refreshed.",
  },

  {
    id: 18,
    name: "Repair Hair Mask",
    price: 22.99,
    category: "Haircare",
    image: "/images/products/repair-hair-mask.jpeg",
    description:
      "A nourishing hair mask created to help dry and damaged-looking hair feel softer and healthier.",
  },

  {
    id: 19,
    name: "Nourishing Hair Oil",
    price: 16.99,
    category: "Haircare",
    image: "/images/products/hair-oil.jpeg",
    description:
      "A lightweight nourishing hair oil that adds softness, shine and a silky finish.",
  },

  {
    id: 20,
    name: "Leave-In Conditioner",
    price: 19.99,
    category: "Haircare",
    image: "/images/products/leave-in-conditioner.jpeg",
    description:
      "A lightweight leave-in conditioner that helps keep hair smooth, manageable and moisturized.",
  },

  {
    id: 21,
    name: "Rose Hair Mist",
    price: 15.99,
    category: "Haircare",
    image: "/images/products/rose-hair-mist.jpeg",
    description:
      "A delicate rose-scented hair mist that leaves your hair feeling fresh and beautifully fragranced.",
  },

  {
    id: 22,
    name: "Smooth Hair Serum",
    price: 21.99,
    category: "Haircare",
    image: "/images/products/hair-serum.jpeg",
    description:
      "A smoothing hair serum that helps create a polished, glossy and frizz-free appearance.",
  },

  {
    id: 23,
    name: "Volume Hair Shampoo",
    price: 20.99,
    category: "Haircare",
    image: "/images/products/volume-shampoo.jpeg",
    description:
      "A refreshing shampoo designed to give hair a fuller-looking and lightweight finish.",
  },

  {
    id: 24,
    name: "Scalp Care Treatment",
    price: 24.99,
    category: "Haircare",
    image: "/images/products/scalp-treatment.jpeg",
    description:
      "A soothing scalp treatment created for a fresh, balanced and comfortable hair-care ritual.",
  },

  // =========================
  // FRAGRANCE - 8 PRODUCTS
  // =========================

  {
    id: 25,
    name: "Rose Bloom Eau de Parfum",
    price: 39.99,
    category: "Fragrance",
    image: "/images/products/rose-bloom.jpeg",
    description:
      "A romantic floral fragrance with delicate rose notes and a soft elegant finish.",
  },

  {
    id: 26,
    name: "Vanilla Dream Perfume",
    price: 42.99,
    category: "Fragrance",
    image: "/images/products/vanilla-dream.jpeg",
    description:
      "A warm and comforting vanilla fragrance with a sweet, creamy and luxurious character.",
  },

  {
    id: 27,
    name: "Fresh Blossom Mist",
    price: 25.99,
    category: "Fragrance",
    image: "/images/products/fresh-blossom.jpeg",
    description:
      "A light floral mist with fresh blossom notes for an effortless everyday fragrance.",
  },

  {
    id: 28,
    name: "Elegant Oud Perfume",
    price: 49.99,
    category: "Fragrance",
    image: "/images/products/elegant-oud.jpeg",
    description:
      "A sophisticated oud fragrance with warm woody notes and an elegant long-lasting character.",
  },

  {
    id: 29,
    name: "Peach Garden Mist",
    price: 27.99,
    category: "Fragrance",
    image: "/images/products/peach-garden.jpeg",
    description:
      "A playful fruity-floral mist inspired by juicy peach and blooming garden flowers.",
  },

  {
    id: 30,
    name: "Midnight Rose",
    price: 44.99,
    category: "Fragrance",
    image: "/images/products/midnight-rose.jpeg",
    description:
      "A mysterious rose fragrance with a deep floral character made for elegant evenings.",
  },

  {
    id: 31,
    name: "Jasmine Velvet Perfume",
    price: 41.99,
    category: "Fragrance",
    image: "/images/products/jasmine-velvet.jpeg",
    description:
      "A graceful jasmine fragrance with soft floral notes and a smooth velvety finish.",
  },

  {
    id: 32,
    name: "Soft Musk Eau de Parfum",
    price: 46.99,
    category: "Fragrance",
    image: "/images/products/soft-musk.jpeg",
    description:
      "A clean and sophisticated musk fragrance with a soft, intimate and timeless character.",
  },
];

export default products;