import React, { useState, useEffect } from "react";
import { Avatar, Popover } from "@material-ui/core";
import styles from "./TeamData.module.scss";
import SVG from "react-inlinesvg";
import { MoreVertical } from "react-feather";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import CDialog from "../../../components/ConfirmationDialog";
import Translation from "../../../assets/translation.json";
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import AddMember from "../AddMember";
import { makeStyles } from "@material-ui/core/styles";

const Xcircle = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/x-circle.svg`} />;
};

const Msg = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Msg.svg`} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  orange: {
    width: "46px",
    height: "46px",
    color: "black",
  },
}));

const TeamData = ({ TeamMembers, index, handleRemoveMember, length }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [openCDialog, setOpenCDialog] = useState(false);
  const classes = useStyles();

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

  const openDialog = () => {
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
      <AddMember open={addOpen} closeAdd={closeHandle} />
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
          {TeamMembers.user.imageUrl !== null ? (
            <Avatar className={styles.avatar} src={TeamMembers.user.imageUrl} />
          ) : (
            <div className={classes.root}>
              <Avatar className={classes.orange}>
                {TeamMembers.user.fullName
                  .split(" ")
                  .map((n, i, a) =>
                    i === 0 || i + 1 === a.length ? n[0] : null
                  )
                  .join("")
                  .toUpperCase()}
              </Avatar>
            </div>
          )}
          <span>{TeamMembers.user.fullName}</span>
          {TeamMembers.invitationAccepted ? (
            <p>
              <Link to="#" className={styles.invitationStyle}>
                Resend Invitation
              </Link>
            </p>
          ) : (
            <p>
              <Link to="#" className={styles.invitationStyleDecline}>
                Resend Invitation
              </Link>
            </p>
          )}
          <Select
            className={styles.dropDown}
            value={
              TeamMembers.role.administration == true ? "Admin" : "Member"
            }
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
        {index < length - 1 ? <Divider className={styles.divider} /> : ""}
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

export default TeamData;
