import React, { useState, useContext, useEffect } from "react";
import styles from "./Account.module.scss";
import mainStyles from "../../../index.module.scss";
import { Grid, InputAdornment } from "@material-ui/core";
import TextField from "../../../components/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import CDialog from "../../../components/ConfirmationDialog";
import Translation from "../../../assets/translation.json";
import SVG from "react-inlinesvg";
import { Avatar } from "@material-ui/core";
import { RootContext } from "../../../context/RootContext";

const Eye_offSVG = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/eye-off.svg`} />;
};
const EyeSVG = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/eye.svg`} />;
};
const Account = ({
  fullname,
  imgUrl,
  handleImageFile,
  handleImageProfile,
  handleFullName,
  email,
  handleEmail,
  brandName,
  handleBrandName,
  oldPassword,
  newPassword,
  setOldPassword,
  setNewPassword,
  handleChangePassword,
  handleSaveAccount,
  emailVerfied,
  teamAdmin,
  typeName,
  errorMessage,
}) => {
  const [openCDialog, setOpenCDialog] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [passwordCleared, setPasswordCleared] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [actionType, setActionType] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [path, setPath] = useState(null);
  const [imageHash, setImageHash] = useState(Date.now());

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const toggleNewPasswordVisiblity = () => {
    setNewPasswordShown(newPasswordShown ? false : true);
  };

  const handleCancelPassword = () => {
    setEditPassword(false);
    setPasswordCleared(false);
  };

  const handleCancelCDialog = () => {
    setOpenCDialog(false);
  };
  const handleConfirmCDialog = () => {
    setOpenCDialog(false);
  };
  const handleSetPasswordCleared = () => {
    setPasswordCleared(true);
    setEditPassword(true);
  };

  const getInputEndormentContent = () => {
    if (!passwordCleared) {
      return <a onClick={handleSetPasswordCleared}>Edit</a>;
    } else {
      return passwordShown ? (
        <div onClick={togglePasswordVisiblity}>
          <EyeSVG />
        </div>
      ) : (
        <div onClick={togglePasswordVisiblity}>
          <Eye_offSVG />
        </div>
      );
    }
  };
  useEffect(() => {
    setPath(null);
    if (imgUrl != null) {
      if (imgUrl.indexOf("blob") == -1) imgUrl += "?t=" + Date.now();
      setPath(imgUrl);
    }
  }, [imgUrl]);
  return (
    <div>
      <div className={styles.brandContainter}>
        <Avatar className={styles.brandImage} alt="Profile" src={`${path}`} />
        <label htmlFor="hero1" className={styles.heroLabel}>
          {imgUrl && imgUrl !== null
            ? "Change user photo"
            : "Upload user photo "}
        </label>
        <input
          id="hero1"
          className={styles.displayNone}
          type={"file"}
          onChange={(e) => {
            handleImageFile(e.target.files[0]);
            handleImageProfile(URL.createObjectURL(e.target.files[0]));
            setImageHash("");
          }}
        />

        <input
          id="filePicker"
          className={styles.visibilityHidden}
          type={"file"}
        />
      </div>
      <div className={styles.formContainer}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              fullWidth
              value={fullname}
              onChange={handleFullName}
              label="Full Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              fullWidth
              label={typeName === "Brand" ? "Brand Name" : "Display Name"}
              variant="outlined"
              value={brandName}
              onChange={handleBrandName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={true}
              id="outlined-basic"
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmail}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={editPassword ? false : true}
              id="outlined-basic"
              fullWidth
              value={editPassword ? oldPassword : "Password"}
              onChange={setOldPassword}
              label={editPassword ? "Old Password" : "Password"}
              type={passwordShown ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    className={styles.inputendornment}
                    position="end"
                  >
                    <span>{getInputEndormentContent()}</span>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} className={styles.verifiedEmail}>
            {emailVerfied && emailVerfied != null ? (
              <p>
                Email Verified
                <CheckCircleIcon fontSize="small" />{" "}
              </p>
            ) : (
              <p> Verify your email address </p>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}></Grid>
          {editPassword ? (
            <>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="New Password"
                  value={newPassword}
                  onChange={setNewPassword}
                  type={newPasswordShown ? "text" : "password"}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        className={styles.inputendornment}
                        position="end"
                      >
                        <span>
                          {newPasswordShown ? (
                            <div onClick={toggleNewPasswordVisiblity}>
                              {" "}
                              <EyeSVG />{" "}
                            </div>
                          ) : (
                            <div onClick={toggleNewPasswordVisiblity}>
                              {" "}
                              <Eye_offSVG />{" "}
                            </div>
                          )}
                        </span>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <button
                  className={styles.active}
                  onClick={handleChangePassword}
                >
                  Update
                </button>
                <button
                  className={styles.notActive}
                  onClick={handleCancelPassword}
                >
                  Cancel
                </button>
              </Grid>
            </>
          ) : (
            " "
          )}
        </Grid>
      </div>
      <hr className={mainStyles.hr} />
      <div className={styles.actionsContainer}>
        <div className={styles.accountDeactivationContainer}>
          <p className={styles.deleteTitle}>Deactivate User Account</p>
          <div className={styles.deleteAccountTextAndButton}>
            <p>
              If you know longer need your account, or want to temporarily
              disable it, you can deactivate your account.
            </p>
            <Button
              onClick={() => {
                setActionType("Deactivate");
                setOpenCDialog(true);
              }}
              className={clsx(
                mainStyles.textDangerButton,
                styles.DeactivateButton
              )}
            >
              Deactivate Account
            </Button>
          </div>
        </div>
        <div className={styles.accountDeletionContainer}>
          <p className={styles.deleteTitle}>Delete User Account</p>
          <div className={styles.deleteAccountTextAndButton}>
            <p>By deleting your account you will lose all your data.</p>
            {teamAdmin ? (
              <Button
                onClick={() => {
                  setActionType("Delete");
                  setOpenCDialog(true);
                }}
                className={clsx(
                  mainStyles.textDangerButton,
                  styles.DeactivateButton
                )}
              >
                Delete Account
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setActionType("Warning");
                  setOpenCDialog(true);
                }}
                className={clsx(
                  mainStyles.textDangerButton,
                  styles.DeactivateButton
                )}
              >
                Delete Account
              </Button>
            )}
          </div>
        </div>
        <div className={styles.saveContainer}>
          <button className={styles.nextButton} onClick={handleSaveAccount}>
            Save
          </button>
        </div>
        {errorMessage !== "" && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
      <CDialog
        open={openCDialog}
        cancelText={actionType}
        confirmText={"Cancel"}
        onCancel={handleCancelCDialog}
        onConfirm={handleConfirmCDialog}
        message={
          actionType === "Delete"
            ? Translation.DIALOG.ACCOUNT_DELETE_CDIALOG_MSG
            : actionType === "Warning"
            ? Translation.DIALOG.ACCOUNT_WARNING_CDIALOG_MSG
            : Translation.DIALOG.ACCOUNT_DEACTIVATE_CDIALOG_MSG
        }
      />
    </div>
  );
};

export default Account;
