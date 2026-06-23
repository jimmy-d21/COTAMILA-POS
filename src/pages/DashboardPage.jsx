import { useTransactions } from "../hooks/useTransactions.js";
import { useInventory } from "../hooks/useInventory.js";

// ── Common Components ────────────────────────────────────────────────────────
import { PageHeader } from "../components/common/PageHeader.jsx";

// ── Dashboard Components ─────────────────────────────────────────────────────
import { KpiCards } from "../components/dashboard/KpiCards.jsx";
import { BestSellersTable } from "../components/dashboard/BestSellersTable.jsx";
import { CategoryPieChart } from "../components/dashboard/CategoryPieChart.jsx";

// ── Chart Components ─────────────────────────────────────────────────────────
import { DailyRevenueLineChart } from "../components/charts/DailyRevenueLineChart.jsx";
import { PeakHoursBarChart } from "../components/charts/PeakHoursBarChart.jsx";

// ── Inventory Components ─────────────────────────────────────────────────────
import { LowStockBanner } from "../components/inventory/LowStockBanner.jsx";

export function DashboardPage() {
  const { transactions } = useTransactions();
  const { inventory } = useInventory();

  // ── Date Helpers ──────────────────────────────────────────────────────────
  const today = new Date("2026-06-23");
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);

  const isToday = (date) => {
    const d = new Date(date);
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  // ── Derived Data ──────────────────────────────────────────────────────────
  const completedTxns = transactions.filter((t) => t.status === "Completed");
  const todayTxns = completedTxns.filter((t) => isToday(t.date));
  const weekTxns = completedTxns.filter((t) => {
    const d = new Date(t.date);
    return d >= weekStart && d <= today;
  });

  const todaySales = todayTxns.reduce((sum, t) => sum + t.total, 0);
  const todayOrders = todayTxns.length;
  const weeklyRevenue = weekTxns.reduce((sum, t) => sum + t.total, 0);

  const lowStockItems = inventory.filter(
    (i) => i.currentStock <= i.reorderLevel,
  );

  // ── Best Sellers ──────────────────────────────────────────────────────────
  const itemSalesMap = new Map();
  todayTxns.forEach((t) =>
    t.items.forEach((item) => {
      const prev = itemSalesMap.get(item.menuItem.id);
      if (prev) {
        prev.count += item.quantity;
        prev.revenue += item.subtotal;
      } else {
        itemSalesMap.set(item.menuItem.id, {
          name: item.menuItem.name,
          count: item.quantity,
          revenue: item.subtotal,
        });
      }
    }),
  );
  const bestSellers = Array.from(itemSalesMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // ── Peak Hours ────────────────────────────────────────────────────────────
  const hourlyData = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 8;
    const hourTxns = todayTxns.filter(
      (t) => new Date(t.date).getHours() === hour,
    );
    return {
      hour: `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? "PM" : "AM"}`,
      sales: hourTxns.reduce((sum, t) => sum + t.total, 0),
      orders: hourTxns.length,
    };
  });

  // ── Daily Revenue (last 7 days) ───────────────────────────────────────────
  const dailyRevenueData = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - i));
    const dayTxns = completedTxns.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getDate() === day.getDate() &&
        d.getMonth() === day.getMonth() &&
        d.getFullYear() === day.getFullYear()
      );
    });
    return {
      date: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue: dayTxns.reduce((sum, t) => sum + t.total, 0),
    };
  });

  // ── Category Breakdown ────────────────────────────────────────────────────
  const catMap = new Map();
  todayTxns.forEach((t) =>
    t.items.forEach((item) => {
      catMap.set(
        item.menuItem.category,
        (catMap.get(item.menuItem.category) || 0) + item.subtotal,
      );
    }),
  );
  const categoryChartData = Array.from(catMap.entries()).map(
    ([name, value]) => ({ name, value }),
  );

  return (
    <div className="p-6 space-y-6">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <PageHeader
        title="Manager Dashboard"
        subtitle="Overview of store performance and metrics"
      />

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <KpiCards
        todaySales={todaySales}
        todayOrders={todayOrders}
        weeklyRevenue={weeklyRevenue}
        lowStockCount={lowStockItems.length}
      />

      {/* ── Daily Revenue Line Chart ──────────────────────────────────────── */}
      <DailyRevenueLineChart data={dailyRevenueData} />

      {/* ── Peak Hours + Category Pie (side by side) ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PeakHoursBarChart data={hourlyData} />
        <CategoryPieChart data={categoryChartData} />
      </div>

      {/* ── Best Sellers Table ────────────────────────────────────────────── */}
      <BestSellersTable items={bestSellers} />

      {/* ── Low Stock Banner ──────────────────────────────────────────────── */}
      <LowStockBanner items={lowStockItems} />
    </div>
  );
}
