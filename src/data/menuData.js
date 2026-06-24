export const mockMenuItems = [
  // ── COFFEE ────────────────────────────────────────────────────────────────
  {
    id: "c1",
    name: "Americano",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 75 },
      { label: "Iced", price: 95 },
    ],
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
  {
    id: "c2",
    name: "Vietnamese",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 90 },
      { label: "Iced", price: 110 },
    ],
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },

  // ── NON-COFFEE ───────────────────────────────────────────────────────────
  {
    id: "n1",
    name: "Matcha Latte",
    category: "Non-Coffee",
    variants: [
      { label: "Hot", price: 110 },
      { label: "Iced", price: 120 },
    ],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
  {
    id: "n2",
    name: "Dark Chocolate",
    category: "Non-Coffee",
    variants: [
      { label: "Hot", price: 100 },
      { label: "Iced", price: 110 },
    ],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },

  // ── COOLERS ──────────────────────────────────────────────────────────────
  {
    id: "co1",
    name: "Kiwi",
    category: "Coolers",
    variants: [{ label: "Iced", price: 95 }],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
  {
    id: "co2",
    name: "Peach",
    category: "Coolers",
    variants: [{ label: "Iced", price: 95 }],
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },

  // ── RICE BOWL ────────────────────────────────────────────────────────────
  {
    id: "rb1",
    name: "Sweet Chili Tenders",
    category: "Rice Bowl",
    description:
      "Marinated chicken tenders, home made sweet chili sauce on rice.",
    variants: [{ label: "Regular", price: 165 }],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
  {
    id: "rb2",
    name: "Chicken Teriyaki",
    category: "Rice Bowl",
    description:
      "Deep-fried marinated chicken breast, homemade teriyaki sauce, sesame seeds on rice.",
    variants: [{ label: "Regular", price: 165 }],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },

  // ── FRIES & SANDWICHES ───────────────────────────────────────────────────
  {
    id: "fs1",
    name: "Fries",
    category: "Fries & Sandwiches",
    description: "Salted / sour cream.",
    variants: [{ label: "Regular", price: 99 }],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
  {
    id: "fs2",
    name: "Pork Floss Sandwich",
    category: "Fries & Sandwiches",
    description: "Pork floss, mozzarella, mayonnaise. Served with chips.",
    variants: [{ label: "Regular", price: 155 }],
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },

  // ── PASTA ────────────────────────────────────────────────────────────────
  {
    id: "pa1",
    name: "Creamy Mushroom",
    category: "Pasta",
    description:
      "Linguine, sliced mushroom in signature white sauce, sprinkled with parmesan cheese.",
    variants: [{ label: "Regular", price: 155 }],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
  {
    id: "pa2",
    name: "Pinoy Style Bolognese",
    category: "Pasta",
    description:
      "Linguine, ground pork, tomatoes, carrots, and hotdog in sweet signature sauce.",
    variants: [{ label: "Regular", price: 165 }],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },

  // ── PIZZA ────────────────────────────────────────────────────────────────
  {
    id: "pz1",
    name: "Garlic Truffle",
    category: "Pizza",
    description:
      "Bacon, cheese, and roasted garlic. The earthy aroma of Italian white truffles.",
    variants: [{ label: "Regular", price: 260 }],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
  {
    id: "pz2",
    name: "Korean Barbeque",
    category: "Pizza",
    description:
      "Roasted beef, mushroom, black sesame seeds and mozzarella cheese.",
    variants: [{ label: "Regular", price: 260 }],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },

  // ── SPECIALS ─────────────────────────────────────────────────────────────
  {
    id: "sp1",
    name: "Sriracha Aioli Chicken",
    category: "Specials",
    description: "Chicken tenders, house-made sauce, egg & rice.",
    variants: [{ label: "Regular", price: 190 }],
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
  {
    id: "sp2",
    name: "Garlic Creme Chicken",
    category: "Specials",
    description: "Garlic creme sauce, tenders, parmesan, egg & rice.",
    variants: [{ label: "Regular", price: 190 }],
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────
  {
    id: "d1",
    name: "Oreo Cheesecake",
    category: "Desserts",
    variants: [{ label: "Slice", price: 160 }],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
  {
    id: "d2",
    name: "Coffee Fudge Cheesecake",
    category: "Desserts",
    variants: [{ label: "Slice", price: 160 }],
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },

  // ── COOKIES ──────────────────────────────────────────────────────────────
  {
    id: "ck1",
    name: "Biscoff White Chocolate",
    category: "Cookies",
    variants: [{ label: "Piece", price: 100 }],
    hasAsterisk: true,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
  {
    id: "ck2",
    name: "Matcha Cream Cheese",
    category: "Cookies",
    variants: [{ label: "Piece", price: 100 }],
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c",
  },
];
