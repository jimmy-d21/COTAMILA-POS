import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

function getStatusVariant(status) {
  switch (status) {
    case "Completed": return "default";
    case "Refunded": return "destructive";
    default: return "secondary";
  }
}

function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ReceiptDialog({ open, transaction, onClose }) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Transaction Details
            {transaction?.orderNumber ? ` · Order #${transaction.orderNumber}` : ""}
          </DialogTitle>
        </DialogHeader>

        {transaction && (
          <div className="space-y-6">
            {/* Transaction Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-mono font-semibold">{transaction.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-semibold">{formatDate(transaction.date)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cashier</p>
                <p className="font-semibold">{transaction.cashier}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Type</p>
                <p className="font-semibold">{transaction.orderType || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <Badge>{transaction.paymentMethod}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={getStatusVariant(transaction.status)}>
                  {transaction.status}
                </Badge>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="font-semibold mb-3">Order Items</h3>
              <ScrollArea className="max-h-80">
                <div className="space-y-3">
                  {transaction.items.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold">
                              {item.menuItem.name}
                            </h4>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {item.variant}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                x{item.quantity}
                              </Badge>
                            </div>
                          </div>
                          <p className="font-semibold">
                            ₱{item.subtotal.toFixed(2)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-2xl font-bold">
                ₱{transaction.total.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
