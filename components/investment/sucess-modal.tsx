// components/SuccessModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import SuccessMessage from "./success-message";
import { DialogTitle } from "@radix-ui/react-dialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function SuccessModal({ open, onClose }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>   </DialogTitle>
          <SuccessMessage />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
