import React from "react";
import * as Ariakit from "@ariakit/react";
import Button from "../buttons/button";
import styles from "./Cards.module.scss";

interface ModalCardProps {
  title: string;
  description: string;
  buttons: React.ReactNode[];
}

const ModalCard: React.FC<ModalCardProps> = ({
  title,
  description,
  buttons,
}) => {
  const dialog = Ariakit.useDialogStore();

  return (
    <div className={styles.modalCard}>
      <Button onClick={dialog.show} className={styles.button}>
        Show modal
      </Button>
      <Ariakit.Dialog
        store={dialog}
        backdrop={<div className={styles.backdrop} />}
        className={styles.dialog}
      >
        <div className={styles.header}>
          <Ariakit.DialogHeading className={styles.heading}>
            {title}
          </Ariakit.DialogHeading>
          <Ariakit.DialogDismiss className={styles.closeButton}>
            ×
          </Ariakit.DialogDismiss>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonContainer}>
          {buttons.map((button, index) => (
            <div key={index} className={styles.buttonWrapper}>
              {button}
            </div>
          ))}
        </div>
      </Ariakit.Dialog>
    </div>
  );
};

export default ModalCard;
