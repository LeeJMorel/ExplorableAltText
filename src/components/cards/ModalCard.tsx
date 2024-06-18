import * as Ariakit from "@ariakit/react";
import Button from "../buttons/button";

function ModalCard() {
  const dialog = Ariakit.useDialogStore();
  return (
    <div className="modalCard">
      <Button onClick={dialog.show} className="button">
        Show modal
      </Button>
      <Ariakit.Dialog
        store={dialog}
        backdrop={<div className="backdrop" />}
        className="dialog"
      >
        <Ariakit.DialogHeading className="heading">
          Success
        </Ariakit.DialogHeading>
        <p className="description">
          Your payment has been successfully processed. We have emailed your
          receipt.
        </p>
        <div>
          <Ariakit.DialogDismiss className="button">OK</Ariakit.DialogDismiss>
        </div>
      </Ariakit.Dialog>
    </div>
  );
}

export default ModalCard;
