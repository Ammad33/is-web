import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import styles from "./Help.module.scss";
import SVG from "react-inlinesvg";
import Popover from "@material-ui/core/Popover";
import TextField from "../../TextField";
/**SVG */
const HelpIcon = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/help-circle.svg`} />;
};

const Help = () => {
  const [helpDropDown, setHelpDropDown] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setHelpDropDown(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setHelpDropDown(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
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
        PaperProps={{
          style: { width: "421px", height: "434px" },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Grid>
          <div className={styles.popOverContainer}>
            <div className={styles.popOverHeader}>
              <h6> Need help with something?</h6>
              <p>
                {" "}
                Give us a few details and someone will be in touch with you.
              </p>
            </div>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Campaign Name"
              className={styles.textField}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              fullWidth
              label="Let us know what you need help with"
              className={styles.commentField}
              variant="outlined"
            />
            <div className={styles.buttonContainer}>
              <button className={styles.submit}>
                <p> Submit </p>
              </button>
            </div>
          </div>
        </Grid>
      </Popover>
      <div onClick={handleClick}>
        <HelpIcon />
      </div>
    </>
  );
};

export default Help;
