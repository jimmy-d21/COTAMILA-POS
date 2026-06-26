// Cotamila Coffee — Full Menu
// Transcribed from the official Cotamila menu boards.
// `variants` drives the price buttons shown in the POS customize dialog.
//   - Hot/Iced items: [{ label: "Hot", price }, { label: "Iced", price }]
//   - Iced-only coolers: [{ label: "Iced", price }]
//   - Single-price food items: [{ label: "Regular", price }]
// `hasAsterisk` mirrors the "*" marked on the printed menu (kept for reference;
// no functional meaning in-store beyond signature/best-seller marking).

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1551030173-122aabc4489c";

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
    image: DEFAULT_IMAGE,
  },
  {
    id: "c2",
    name: "Vietnamese",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 90 },
      { label: "Iced", price: 110 },
    ],
    image: DEFAULT_IMAGE,
  },
  {
    id: "c3",
    name: "Latte",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 100 },
      { label: "Iced", price: 120 },
    ],
    image: DEFAULT_IMAGE,
  },
  {
    id: "c4",
    name: "Spanish Latte",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 110 },
      { label: "Iced", price: 130 },
    ],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "c5",
    name: "Salted Caramel",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 110 },
      { label: "Iced", price: 130 },
    ],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "c6",
    name: "Hazelnut",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 110 },
      { label: "Iced", price: 130 },
    ],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "c7",
    name: "Cinnamon Latte",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 110 },
      { label: "Iced", price: 130 },
    ],
    image: DEFAULT_IMAGE,
  },
  {
    id: "c8",
    name: "Vanilla Latte",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 110 },
      { label: "Iced", price: 130 },
    ],
    image: DEFAULT_IMAGE,
  },
  {
    id: "c9",
    name: "Caramel Macchiato",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 135 },
      { label: "Iced", price: 145 },
    ],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "c10",
    name: "Dirty Matcha",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 120 },
      { label: "Iced", price: 140 },
    ],
    image: DEFAULT_IMAGE,
  },
  {
    id: "c11",
    name: "Tiramisu Coffee",
    category: "Coffee",
    variants: [{ label: "Iced", price: 140 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "c12",
    name: "Butterscotch Latte",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 130 },
      { label: "Iced", price: 140 },
    ],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "c13",
    name: "Strawberry Latte",
    category: "Coffee",
    variants: [
      { label: "Hot", price: 130 },
      { label: "Iced", price: 130 },
    ],
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
  },
  {
    id: "n3",
    name: "Cows Milk",
    category: "Non-Coffee",
    variants: [
      { label: "Hot", price: 85 },
      { label: "Iced", price: 95 },
    ],
    image: DEFAULT_IMAGE,
  },
  {
    id: "n4",
    name: "Strawberry Milk",
    category: "Non-Coffee",
    variants: [
      { label: "Hot", price: 100 },
      { label: "Iced", price: 110 },
    ],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "n5",
    name: "Butterscotch Milk",
    category: "Non-Coffee",
    variants: [
      { label: "Hot", price: 120 },
      { label: "Iced", price: 130 },
    ],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "n6",
    name: "Strawberry Matcha",
    category: "Non-Coffee",
    variants: [{ label: "Iced", price: 140 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "n7",
    name: "Blueberry Matcha",
    category: "Non-Coffee",
    variants: [{ label: "Iced", price: 140 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "n8",
    name: "Mango Matcha",
    category: "Non-Coffee",
    variants: [{ label: "Iced", price: 140 }],
    image: DEFAULT_IMAGE,
  },

  // ── COOLERS ──────────────────────────────────────────────────────────────
  {
    id: "co1",
    name: "Kiwi",
    category: "Coolers",
    variants: [{ label: "Iced", price: 95 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "co2",
    name: "Peach",
    category: "Coolers",
    variants: [{ label: "Iced", price: 95 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "co3",
    name: "Green Apple",
    category: "Coolers",
    variants: [{ label: "Iced", price: 95 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "co4",
    name: "Lemonade",
    category: "Coolers",
    variants: [{ label: "Iced", price: 95 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "co5",
    name: "Strawberry",
    category: "Coolers",
    variants: [{ label: "Iced", price: 95 }],
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
  },
  {
    id: "rb2",
    name: "Chicken Teriyaki",
    category: "Rice Bowl",
    description:
      "Deep-fried marinated chicken breast, homemade teriyaki sauce, sesame seeds on rice.",
    variants: [{ label: "Regular", price: 165 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "rb3",
    name: "Potato Wedges",
    category: "Rice Bowl",
    description:
      "Thick-cut fresh potato slices, seasoned and golden-fried to a crispy perfection—tender on the inside, with a flavorful, lightly spiced crust.",
    variants: [{ label: "Regular", price: 135 }],
    image: DEFAULT_IMAGE,
  },

  // ── FRIES & SANDWICHES ───────────────────────────────────────────────────
  {
    id: "fs1",
    name: "Fries",
    category: "Fries & Sandwiches",
    description: "Salted / sour cream.",
    variants: [{ label: "Regular", price: 99 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "fs2",
    name: "Pork Floss Sandwich",
    category: "Fries & Sandwiches",
    description: "Pork floss, mozzarella, mayonnaise. Served with chips.",
    variants: [{ label: "Regular", price: 155 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "fs3",
    name: "Ham & Cheese Sandwich",
    category: "Fries & Sandwiches",
    description:
      "Three layers of ham, mozzarella, mayonnaise. Served with chips.",
    variants: [{ label: "Regular", price: 155 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "fs4",
    name: "Grilled Cheese Sandwich",
    category: "Fries & Sandwiches",
    description: "Grilled local mozzarella. Served with chips.",
    variants: [{ label: "Regular", price: 120 }],
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
  },
  {
    id: "pa2",
    name: "Pinoy Style Bolognese",
    category: "Pasta",
    description:
      "Linguine, ground pork, tomatoes, carrots, and hotdog in sweet signature sauce.",
    variants: [{ label: "Regular", price: 165 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "pa3",
    name: "Bolognese",
    category: "Pasta",
    description:
      "Linguine, ground pork blended with tomatoes, carrots, and flavors of basil and parsley.",
    variants: [{ label: "Regular", price: 155 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "pa4",
    name: "Sardines Pasta",
    category: "Pasta",
    description:
      "Linguine, sardines, basil, chili flakes, olive oil, sprinkled with parmesan cheese.",
    variants: [{ label: "Regular", price: 155 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "pa5",
    name: "Pesto",
    category: "Pasta",
    description:
      "Linguine, basil, olive oil, parmesan cheese, and crushed cashew nuts.",
    variants: [{ label: "Regular", price: 155 }],
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
  },
  {
    id: "pz2",
    name: "Korean Barbeque",
    category: "Pizza",
    description:
      "Roasted beef, mushroom, black sesame seeds and mozzarella cheese.",
    variants: [{ label: "Regular", price: 260 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "pz3",
    name: "Pepperoni",
    category: "Pizza",
    description: "Beef pepperoni and parmesan cheese in traditional red sauce.",
    variants: [{ label: "Regular", price: 260 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "pz4",
    name: "Hungarian Pepperoni",
    category: "Pizza",
    description:
      "Hungarian cuts, beef pepperoni, red sauce and parmesan cheese.",
    variants: [{ label: "Regular", price: 280 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "pz5",
    name: "Italian Sausage",
    category: "Pizza",
    description:
      "Sausage, mushroom, onion, ground pork and some combination of herbs and provolone cheese.",
    variants: [{ label: "Regular", price: 260 }],
    image: DEFAULT_IMAGE,
  },

  // ── SPECIALS ─────────────────────────────────────────────────────────────
  {
    id: "sp1",
    name: "Sriracha Aioli Chicken",
    category: "Specials",
    description: "Chicken tenders, house-made sauce, egg & rice.",
    variants: [{ label: "Regular", price: 190 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "sp2",
    name: "Garlic Creme Chicken",
    category: "Specials",
    description: "Garlic creme sauce, tenders, parmesan, egg & rice.",
    variants: [{ label: "Regular", price: 190 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "sp3",
    name: "Mozzarella Sticks (House Made)",
    category: "Specials",
    description: "Thick mozzarella sticks, parmesan & house-made sauce.",
    variants: [{ label: "Regular", price: 190 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "sp4",
    name: "Chicken Sandwich",
    category: "Specials",
    description:
      "Tender breast chicken, deep fried, house-made sauce, grilled thick bread.",
    variants: [{ label: "Regular", price: 195 }],
    image: DEFAULT_IMAGE,
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────
  {
    id: "d1",
    name: "Oreo Cheesecake",
    category: "Desserts",
    variants: [{ label: "Slice", price: 160 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "d2",
    name: "Coffee Fudge Cheesecake",
    category: "Desserts",
    variants: [{ label: "Slice", price: 160 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "d3",
    name: "Blueberry Cheesecake",
    category: "Desserts",
    variants: [{ label: "Slice", price: 160 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "d4",
    name: "Smores Cheesecake",
    category: "Desserts",
    variants: [{ label: "Slice", price: 160 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "d5",
    name: "Pecan Caramel Cheesecake",
    category: "Desserts",
    variants: [{ label: "Slice", price: 160 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "d6",
    name: "Honey Butterbread",
    category: "Desserts",
    variants: [{ label: "Slice", price: 160 }],
    image: DEFAULT_IMAGE,
  },

  // ── COOKIES ──────────────────────────────────────────────────────────────
  {
    id: "ck1",
    name: "Biscoff White Chocolate",
    category: "Cookies",
    variants: [{ label: "Piece", price: 100 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "ck2",
    name: "Matcha Cream Cheese",
    category: "Cookies",
    variants: [{ label: "Piece", price: 100 }],
    image: DEFAULT_IMAGE,
  },
  {
    id: "ck3",
    name: "Chocolate Chip",
    category: "Cookies",
    variants: [{ label: "Piece", price: 90 }],
    hasAsterisk: true,
    image: DEFAULT_IMAGE,
  },
  {
    id: "ck4",
    name: "Red Velvet Cream Cheese",
    category: "Cookies",
    variants: [{ label: "Piece", price: 100 }],
    image: DEFAULT_IMAGE,
  },
];
