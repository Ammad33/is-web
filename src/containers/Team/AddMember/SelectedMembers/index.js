import React, { useState, useEffect } from "react";
import { Avatar, Popover } from "@material-ui/core";
import styles from "./SelectedMembers.module.scss";
import SVG from "react-inlinesvg";
import { MoreVertical } from "react-feather";
import MenuItem from "@material-ui/core/MenuItem";
import CDialog from "../../../../components/ConfirmationDialog";
import Translation from "../../../../assets/translation.json";
import Select from "@material-ui/core/Select";

const Xcircle = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/x-circle.svg`} />;
};

const Msg = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Msg.svg`} />;
};

const SelectedMembers = ({ TeamMembers, index, handleRemoveMember }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [openCDialog, setOpenCDialog] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleTeam = () => {};
  const closeHandle = () => {
    setAddOpen(false);
  };

  const openDialog = (index) => {
    setOpenCDialog(true);
    setAnchorEl(null);
  };
  const handleCancelCDialog = () => {
    setOpenCDialog(false);
  };
  const handleConfirmCDialog = (index) => {
    setOpenCDialog(false);
    handleRemoveMember(index);
  };

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={styles.popOver}>
          <div className={styles.removeDiv} onClick={() => openDialog(index)}>
            {" "}
            <Xcircle /> <p>Remove Member </p>
          </div>
        </div>
      </Popover>
      <div>
        <div className={styles.headerContainer}>
          {TeamMembers.invitationAccepted ? (
            <Avatar
              className={styles.avatar}
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            />
          ) : (
            <div className={styles.msgSVG}>
              <Msg className={styles.avatar} />
            </div>
          )}
          <span>{TeamMembers.name}</span>
          <Select
            className={styles.dropDown}
            value="Member"
            onChange={handleTeam}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            variant="outlined"
            placeholder="Team"
          >
            <MenuItem value="Member">Member</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
          <MoreVertical
            className={styles.moreVerticalStyle}
            onClick={handleClick}
          />
        </div>
      </div>
      <CDialog
        open={openCDialog}
        cancelText={"Remove"}
        confirmText={"Cancel"}
        onCancel={handleConfirmCDialog}
        onConfirm={handleCancelCDialog}
        message={Translation.DIALOG.TEAM_MEMBER_DELETE_CDIALOG_MSG}
      />
    </>
  );
};

export default SelectedMembers;
