import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { demoPasswords } from "../../data/credentialsData.js";

export function StaffViewDialog({ open, member, onClose }) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Staff Profile</DialogTitle>
        </DialogHeader>
        {member && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              {member.image ? (
                <img
                  src={member.image}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  alt={member.name}
                />
              ) : (
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold">
                  {member.name[0]}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-muted-foreground">{member.email}</p>
              <div className="flex justify-center gap-2">
                <Badge variant="default">{member.role}</Badge>
                <Badge variant="outline">{member.status}</Badge>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg text-left space-y-2">
              <div className="text-xs font-bold uppercase text-muted-foreground">
                Temporary Credentials
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Password:</span>
                <code className="bg-background px-2 py-1 rounded text-sm">
                  {demoPasswords[member.email] || "N/A"}
                </code>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
