import { useState } from "react";
import { useInventory } from "../hooks/useInventory.js";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";

// ── Common Components ────────────────────────────────────────────────────────
import { PageHeader } from "../components/common/PageHeader.jsx";
import { SearchBar } from "../components/common/SearchBar.jsx";
import { FilterBar } from "../components/common/FilterBar.jsx";

// ── Inventory Components ─────────────────────────────────────────────────────
import { InventoryStatsCards } from "../components/inventory/InventoryStatsCards.jsx";
import { LowStockBanner } from "../components/inventory/LowStockBanner.jsx";
import { InventoryTable } from "../components/inventory/InventoryTable.jsx";
import { RestockDialog } from "../components/inventory/RestockDialog.jsx";
import { AddInventoryDialog } from "../components/inventory/AddInventoryDialog.jsx";

const EMPTY_FORM = { name: "", category: "", currentStock: "", reorderLevel: "", unit: "" };

export function InventoryPage() {
  const { inventory, updateInventory, addInventory } = useInventory();

  // ── UI State ──────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [restockDialog, setRestockDialog] = useState({ open: false, item: null });
  const [restockAmount, setRestockAmount] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState(EMPTY_FORM);

  // ── Derived Data ──────────────────────────────────────────────────────────
  const categories = Array.from(new Set(inventory.map((i) => i.category)));
  const lowStockItems = inventory.filter((i) => i.currentStock <= i.reorderLevel);

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleRestock = () => {
    if (!restockDialog.item || !restockAmount) return;
    const amount = parseFloat(restockAmount);
    if (isNaN(amount) || amount <= 0) { toast.error("Please enter a valid amount"); return; }
    updateInventory(restockDialog.item.id, {
      currentStock: restockDialog.item.currentStock + amount,
      lastRestocked: new Date(),
    });
    toast.success(`${restockDialog.item.name} restocked successfully!`);
    setRestockDialog({ open: false, item: null });
    setRestockAmount("");
  };

  const handleAddInventory = () => {
    if (!newItem.name.trim()) { toast.error("Item name is required"); return; }
    if (!newItem.category.trim()) { toast.error("Category is required"); return; }
    const currentStockNum = parseFloat(newItem.currentStock);
    if (isNaN(currentStockNum) || currentStockNum < 0) { toast.error("Invalid current stock"); return; }
    const reorderLevelNum = parseFloat(newItem.reorderLevel);
    if (isNaN(reorderLevelNum) || reorderLevelNum < 0) { toast.error("Invalid reorder level"); return; }
    if (!newItem.unit.trim()) { toast.error("Unit is required"); return; }

    addInventory({
      id: Date.now().toString(),
      name: newItem.name.trim(),
      category: newItem.category.trim(),
      currentStock: currentStockNum,
      reorderLevel: reorderLevelNum,
      unit: newItem.unit.trim(),
      lastRestocked: new Date(),
    });

    toast.success(`${newItem.name} added to inventory!`);
    setNewItem(EMPTY_FORM);
    setAddDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <PageHeader title="Inventory Management" subtitle="Track and manage raw materials and supplies">
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </PageHeader>

      {/* ── Stats Cards ───────────────────────────────────────────────────── */}
      <InventoryStatsCards
        totalItems={inventory.length}
        lowStockCount={lowStockItems.length}
        categoryCount={categories.length}
      />

      {/* ── Low Stock Banner ──────────────────────────────────────────────── */}
      <LowStockBanner items={lowStockItems} />

      {/* ── Search & Filters ──────────────────────────────────────────────── */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search inventory..."
              className="flex-1"
            />
            <FilterBar
              options={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Inventory Table ───────────────────────────────────────────────── */}
      <InventoryTable
        items={filteredInventory}
        onRestock={(item) => setRestockDialog({ open: true, item })}
      />

      {/* ── Dialogs ──────────────────────────────────────────────────────── */}
      <RestockDialog
        open={restockDialog.open}
        item={restockDialog.item}
        amount={restockAmount}
        onAmountChange={setRestockAmount}
        onConfirm={handleRestock}
        onClose={() => { setRestockDialog({ open: false, item: null }); setRestockAmount(""); }}
      />
      <AddInventoryDialog
        open={addDialogOpen}
        formData={newItem}
        onChange={setNewItem}
        onConfirm={handleAddInventory}
        onClose={() => { setNewItem(EMPTY_FORM); setAddDialogOpen(false); }}
      />
    </div>
  );
}
