import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function AddInventoryDialog({ open, formData, onChange, onConfirm, onClose }) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="item-name">Item Name *</Label>
            <Input
              id="item-name"
              placeholder="e.g., Organic Tomatoes"
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              placeholder="e.g., Vegetables, Dairy, Packaging"
              value={formData.category}
              onChange={(e) => onChange({ ...formData, category: e.target.value })}
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current-stock">Current Stock *</Label>
              <Input
                id="current-stock"
                type="number"
                placeholder="0"
                value={formData.currentStock}
                onChange={(e) => onChange({ ...formData, currentStock: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit *</Label>
              <Input
                id="unit"
                placeholder="kg, pcs, L"
                value={formData.unit}
                onChange={(e) => onChange({ ...formData, unit: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="reorder-level">Reorder Level *</Label>
            <Input
              id="reorder-level"
              type="number"
              placeholder="e.g., 10"
              value={formData.reorderLevel}
              onChange={(e) => onChange({ ...formData, reorderLevel: e.target.value })}
              className="mt-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
