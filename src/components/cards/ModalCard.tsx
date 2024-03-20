import { Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import React from "react";

export interface IModalCardProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

const ModalCard: React.FC<IModalCardProps> = ({
  open,
  onClose,
  title,
  content,
  actions,
}) => {
  return (
    <Dialog open={open} onClose={onClose} className="modal-card">
      {title && <DialogHeading>{title}</DialogHeading>}
      {content && <div className="modal-content">{content}</div>}
      {actions && <div className="modal-actions">{actions}</div>}
      <DialogDismiss className="modal-close" onClick={onClose}>
        Close
      </DialogDismiss>
    </Dialog>
  );
};

export default ModalCard;
