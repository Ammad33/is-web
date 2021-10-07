import React from "react";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import styles from "./ConfirmationDialog.module.scss";
import globalStyles from "../../index.module.scss";

const CDialog = ({
  onAddCampaignSave,
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
  message,
  open,
  ...other
}) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onConfirm();
  };
	const handleAddCampaignSave = () => {
    onAddCampaignSave();
  };

  return (
    <Dialog
      classes={{ paper: styles.cDialog }}
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      {...other}
    >
      <DialogContent className={styles.cDialogContent}>
        {cancelText == "Warning" ? <span> Oops! </span> : ""}
        <p className={styles.cDialogDescription}>{message}</p>
      </DialogContent>
      <div className={styles.cDialogActions}>
        {cancelText == "Warning" ? (
          <Button className={styles.confirm} onClick={handleOk}>
            {" "}
            Got it{" "}
          </Button>
        ) : (
          <>
            <Button className={styles.confirm} onClick={handleOk}>
              {confirmText ? confirmText : "Ok"}
            </Button>
						{onAddCampaignSave && onAddCampaignSave !== undefined && (
              <Button className={styles.addCampaignSave} onClick={handleAddCampaignSave}>
								Save
							</Button>
            )}
            <Button
              variant="contained"
              className={globalStyles.dangerButton}
              onClick={handleCancel}
            >
              {cancelText ? cancelText : "Cancel"}
            </Button>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default CDialog;
