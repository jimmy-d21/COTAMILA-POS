import { mockMenuItems } from "./menuData.js";
import { mockStaff } from "./staffData.js";

// Generate Mock Transactions — 50 transactions for Cotamila Coffee
const generateMockTransactions = () => {
  const transactions = [];
  const today = new Date("2026-06-23");

  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 7);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(Math.floor(Math.random() * 12) + 8);
    date.setMinutes(Math.floor(Math.random() * 60));

    const numItems = Math.floor(Math.random() * 3) + 1;
    const items = [];

    for (let j = 0; j < numItems; j++) {
      const menuItem =
        mockMenuItems[Math.floor(Math.random() * mockMenuItems.length)];
      const variant =
        menuItem.variants[Math.floor(Math.random() * menuItem.variants.length)];

      const quantity = Math.floor(Math.random() * 2) + 1;

      items.push({
        id: `ci-${i}-${j}`,
        menuItem,
        variant: variant.label,
        quantity,
        subtotal: variant.price * quantity,
      });
    }

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const paymentMethods = ["Cash", "Card", "GCash"];
    const statuses = [
      "Completed",
      "Completed",
      "Completed",
      "Completed",
      "Refunded",
    ];

    transactions.push({
      id: `txn-${String(50 - i).padStart(4, "0")}`,
      orderNumber: 100 + (50 - i),
      items,
      total,
      date,
      paymentMethod:
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      cashier: mockStaff[Math.floor(Math.random() * 3)].name,
    });
  }

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const mockTransactions = generateMockTransactions();
