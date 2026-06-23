import { useState } from "react";
import { useMenu } from "../hooks/useMenu.js";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES } from "../utils/constants.js";

// ── Common Components ────────────────────────────────────────────────────────
import { PageHeader } from "../components/common/PageHeader.jsx";
import { SearchBar } from "../components/common/SearchBar.jsx";
import { FilterBar } from "../components/common/FilterBar.jsx";
import { EmptyState } from "../components/common/EmptyState.jsx";

// ── Menu Components ──────────────────────────────────────────────────────────
import { MenuStatsCards } from "../components/menu/MenuStatsCards.jsx";
import { MenuItemCard } from "../components/menu/MenuItemCard.jsx";
import { MenuItemForm } from "../components/menu/MenuItemForm.jsx";
import { DeleteConfirmDialog } from "../components/menu/DeleteConfirmDialog.jsx";

const EMPTY_FORM = {
  name: "",
  description: "",
  category: "Coffee",
  image: null,
  variants: [{ label: "Hot", price: "" }],
};

export function MenuManagementPage() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();

  // ── UI State ──────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editDialog, setEditDialog] = useState({ open: false, item: null, mode: "add" });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });
  const [formData, setFormData] = useState(EMPTY_FORM);

  // ── Derived Data ──────────────────────────────────────────────────────────
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleOpenAdd = () => {
    setFormData(EMPTY_FORM);
    setEditDialog({ open: true, item: null, mode: "add" });
  };

  const handleOpenEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description || "",
      category: item.category,
      image: item.image || null,
      variants: item.variants?.map((v) => ({ label: v.label, price: v.price.toString() })) || [
        { label: "Regular", price: "" },
      ],
    });
    setEditDialog({ open: true, item, mode: "edit" });
  };

  const handleSave = () => {
    const isVariantsValid = formData.variants.every(
      (v) => v.label.trim() !== "" && v.price !== "" && parseFloat(v.price) > 0
    );
    if (!formData.name.trim() || !isVariantsValid) {
      toast.error("Please fill in the item name and all option/price fields correctly.");
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      variants: formData.variants.map((v) => ({ label: v.label, price: parseFloat(v.price) })),
    };

    if (editDialog.mode === "add") {
      addMenuItem({ id: `m${Date.now()}`, ...payload });
      toast.success("Menu item added successfully!");
    } else if (editDialog.item) {
      updateMenuItem(editDialog.item.id, payload);
      toast.success("Menu item updated successfully!");
    }

    setEditDialog({ open: false, item: null, mode: "add" });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.item) {
      deleteMenuItem(deleteDialog.item.id);
      toast.success("Menu item deleted");
      setDeleteDialog({ open: false, item: null });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <PageHeader title="Menu Management" subtitle="Add and manage Cotamila's menu items and prices">
        <Button onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-2" /> Add Menu Item
        </Button>
      </PageHeader>

      {/* ── Stats Cards ───────────────────────────────────────────────────── */}
      <MenuStatsCards menuItems={menuItems} />

      {/* ── Search & Filters ──────────────────────────────────────────────── */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search menu items..."
              className="flex-1"
            />
            <FilterBar
              options={CATEGORIES}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              allLabel="All"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Menu Items Grid ───────────────────────────────────────────────── */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No menu items found"
          description="Try adjusting your search or filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onEdit={handleOpenEdit}
              onDelete={(item) => setDeleteDialog({ open: true, item })}
            />
          ))}
        </div>
      )}

      {/* ── Dialogs ──────────────────────────────────────────────────────── */}
      <MenuItemForm
        open={editDialog.open}
        mode={editDialog.mode}
        formData={formData}
        onChange={setFormData}
        onSave={handleSave}
        onClose={() => setEditDialog({ open: false, item: null, mode: "add" })}
      />
      <DeleteConfirmDialog
        open={deleteDialog.open}
        itemName={deleteDialog.item?.name}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteDialog({ open: false, item: null })}
      />
    </div>
  );
}
