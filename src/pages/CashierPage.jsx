import { useState, useMemo } from "react";
import { useMenu } from "../hooks/useMenu.js";
import { useCart } from "../hooks/useCart.js";
import { useTransactions } from "../hooks/useTransactions.js";
import { useAuth } from "../hooks/useAuth.js";
import { ScrollArea } from "../components/ui/scroll-area";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

// ── Cashier Components ──────────────────────────────────────────────────────
import { CategoryFilter } from "../components/cashier/CategoryFilter.jsx";
import { MenuItemCard } from "../components/cashier/MenuItemCard.jsx";
import { CartPanel } from "../components/cashier/CartPanel.jsx";
import { CustomizeDialog } from "../components/cashier/CustomizeDialog.jsx";
import { CheckoutDialog } from "../components/cashier/CheckoutDialog.jsx";

let orderCounter = 247;

export function CashierPage() {
  const { menuItems } = useMenu();
  const { cart, addToCart, removeFromCart, updateCartItem, clearCart } =
    useCart();
  const { addTransaction } = useTransactions();
  const { currentUser } = useAuth();

  // ── UI State ──────────────────────────────────────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderNumber] = useState(() => ++orderCounter);
  const [orderType, setOrderType] = useState("Dine In");
  const [customizeDialog, setCustomizeDialog] = useState({
    open: false,
    item: null,
  });
  const [selectedVariant, setSelectedVariant] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountReceived, setAmountReceived] = useState("");

  // ── Derived Data ──────────────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    if (!menuItems) return [];
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleItemClick = (item) => {
    setCustomizeDialog({ open: true, item });
    setSelectedVariant(item.variants[0].label);
    setItemQuantity(1);
  };

  const handleAddToCart = () => {
    if (!customizeDialog.item) return;
    const item = customizeDialog.item;
    const variantPrice =
      item.variants.find((v) => v.label === selectedVariant)?.price ??
      item.variants[0].price;
    const subtotal = variantPrice * itemQuantity;

    addToCart({
      id: `cart-${Date.now()}-${Math.random()}`,
      menuItem: item,
      variant: selectedVariant,
      quantity: itemQuantity,
      subtotal,
    });

    setCustomizeDialog({ open: false, item: null });
    toast.success(`${item.name} added to order`);
  };

  const handleQuantityChange = (id, delta) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    const unitPrice = item.subtotal / item.quantity;
    updateCartItem(id, { quantity: newQty, subtotal: unitPrice * newQty });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setAmountReceived("");
    setPaymentMethod("Cash");
    setCheckoutOpen(true);
  };

  const handleCompletePayment = () => {
    if (
      paymentMethod === "Cash" &&
      (!amountReceived || parseFloat(amountReceived) < cartTotal)
    ) {
      toast.error("Insufficient amount received");
      return;
    }

    addTransaction({
      id: `txn-${Date.now()}`,
      orderNumber,
      orderType,
      items: [...cart],
      total: cartTotal,
      date: new Date(),
      paymentMethod,
      status: "Completed",
      cashier: currentUser?.name || "Unknown",
    });

    clearCart();
    setCheckoutOpen(false);
    toast.success(`Order #${orderNumber} completed!`);
  };

  return (
    <div className="h-full flex min-h-0">
      {/* ── Left: Product Grid ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-background min-h-0">
        <div className="p-6 border-b border-border bg-card space-y-4 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold font-display">
              Point of Sale
            </h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        <ScrollArea className="flex-1 min-h-0 p-6">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-24">
              <p className="text-sm">No items match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onClick={handleItemClick}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* ── Right: Cart ─────────────────────────────────────────────────── */}
      <CartPanel
        cart={cart}
        orderNumber={orderNumber}
        orderType={orderType}
        onOrderTypeChange={setOrderType}
        onQuantityChange={handleQuantityChange}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={handleCheckout}
      />

      {/* ── Dialogs ──────────────────────────────────────────────────────── */}
      <CustomizeDialog
        open={customizeDialog.open}
        item={customizeDialog.item}
        selectedVariant={selectedVariant}
        quantity={itemQuantity}
        onVariantChange={setSelectedVariant}
        onQuantityChange={setItemQuantity}
        onAddToCart={handleAddToCart}
        onClose={() => setCustomizeDialog({ open: false, item: null })}
      />
      <CheckoutDialog
        open={checkoutOpen}
        cart={cart}
        orderNumber={orderNumber}
        orderType={orderType}
        paymentMethod={paymentMethod}
        amountReceived={amountReceived}
        onPaymentMethodChange={(m) => {
          setPaymentMethod(m);
          setAmountReceived("");
        }}
        onAmountChange={setAmountReceived}
        onConfirm={handleCompletePayment}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
