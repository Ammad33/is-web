import React, { useState } from "react";
import styles from "./SharedFile.module.scss";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Download } from "react-feather";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const SharedFile = ({}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [imageOpen, setImageOpen] = useState(false);
  const [active, setActive] = useState("images");

  const handleClickOpen = () => {
    setImageOpen(true);
  };
  const handleCloseImage = () => {
    setImageOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            height: "400px",
            width: "550px",
          },
        }}
        open={imageOpen}
        onClose={handleCloseImage}
        aria-labelledby="responsive-dialog-title"
      >
        {" "}
        <div className={styles.dialogTitleContainer}>
          <DialogTitle
            id="responsive-dialog-title"
            className={styles.dialogTitle}
          >
            <Download />
          </DialogTitle>
        </div>
        <DialogContent>
          <DialogContentText>
            <img
              src={`${process.env.PUBLIC_URL}/images/dummygrey`}
              onClick={handleClickOpen}
              className={styles.sharefiles}
              alt="no image"
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Grid container spacing={2} className={styles.mediaContainer}>
        <Grid item xs={10}>
          <div className={styles.sharedFileContainer}>
            <div className={styles.sharedFileContent}>
              <button
                className={active === "images" ? styles.active : ""}
                onClick={() => {
                  setActive("images");
                }}
              >
                Image/Videos
              </button>
              <button
                className={active === "other" ? styles.other : ""}
                onClick={() => {
                  setActive("other");
                }}
              >
                Other files
              </button>
            </div>
            {active === "images" ? (
              <div className={styles.imagesContainer}>
                {[...Array(16)].map((_, i) => {
                  return (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/dummygrey`}
                      onClick={handleClickOpen}
                      className={styles.sharefiles}
                      alt="no image"
                    />
                  );
                })}
              </div>
            ) : (
              <div className={styles.otherFiles}>
                {[...Array(5)].map((_, i) => {
                  return (
                    <>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="File Name"
                            secondary={"10-30 5.30pm"}
                          />
                          <p className={styles.fileSize}> 62kb</p>{" "}
                          <span className={styles.downloadIcon}>
                            {" "}
                            <Download />{" "}
                          </span>
                        </ListItem>
                      </List>
                      <Divider />
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SharedFile;
