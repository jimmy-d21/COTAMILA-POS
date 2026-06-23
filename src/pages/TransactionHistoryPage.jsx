import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions.js";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";

// ── Common Components ────────────────────────────────────────────────────────
import { PageHeader } from "../components/common/PageHeader.jsx";
import { SearchBar } from "../components/common/SearchBar.jsx";
import { FilterBar } from "../components/common/FilterBar.jsx";

// ── Transaction Components ───────────────────────────────────────────────────
import { TransactionSummaryCards } from "../components/transactions/TransactionSummaryCards.jsx";
import { TransactionTable } from "../components/transactions/TransactionTable.jsx";
import { ReceiptDialog } from "../components/transactions/ReceiptDialog.jsx";

const STATUS_OPTIONS = ["Completed", "Refunded", "Pending"];

export function TransactionHistoryPage() {
  const { transactions } = useTransactions();

  // ── UI State ──────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [receiptDialog, setReceiptDialog] = useState({ open: false, transaction: null });

  // ── Derived Data ──────────────────────────────────────────────────────────
  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.cashier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || txn.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = transactions
    .filter((t) => t.status === "Completed")
    .reduce((sum, t) => sum + t.total, 0);
  const completedCount = transactions.filter((t) => t.status === "Completed").length;
  const refundedCount = transactions.filter((t) => t.status === "Refunded").length;

  return (
    <div className="p-6 space-y-6">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <PageHeader
        title="Transaction History"
        subtitle="View and manage all transactions"
      />

      {/* ── Summary Cards ─────────────────────────────────────────────────── */}
      <TransactionSummaryCards
        totalRevenue={totalRevenue}
        totalCount={transactions.length}
        completedCount={completedCount}
        refundedCount={refundedCount}
      />

      {/* ── Search & Filters ──────────────────────────────────────────────── */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by transaction ID or cashier..."
              className="flex-1"
            />
            <FilterBar
              options={STATUS_OPTIONS}
              selected={selectedStatus}
              onSelect={setSelectedStatus}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Transactions Table ────────────────────────────────────────────── */}
      <TransactionTable
        transactions={filteredTransactions}
        onView={(txn) => setReceiptDialog({ open: true, transaction: txn })}
      />

      {/* ── Receipt Dialog ────────────────────────────────────────────────── */}
      <ReceiptDialog
        open={receiptDialog.open}
        transaction={receiptDialog.transaction}
        onClose={() => setReceiptDialog({ open: false, transaction: null })}
      />
    </div>
  );
}
