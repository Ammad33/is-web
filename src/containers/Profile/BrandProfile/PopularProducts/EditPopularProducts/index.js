import React from "react";
import { Grid, InputAdornment, Dialog, Select } from "@material-ui/core";
import styles from "./EditPopularProducts.module.scss";
import TextField from "../../../../../components/TextField";
import { HelpCircle, Search } from "react-feather";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import SVG from "react-inlinesvg";

const Chevron = () => {
  return (
    <span className={styles.dropDownCustomizeSvg}>
      <SVG src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`} />
    </span>
  );
};
const EditPopularProducts = ({ open, handleChange, closeAdd }) => {
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <Dialog
      classes={{ paper: styles.editContact }}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      onClose={closeAdd}
    >
      <div className={styles.content}>
        <h6>Popular Products</h6>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth variant="outlined">
            <Select
              id="outlined-basic"
              IconComponent={() => <Chevron />}
              fullWidth
              defaultValue={"Choose Collection"}
              value="Choose Collection"
              variant="outlined"
              MenuProps={{ variant: "menu" }}
            >
              <MenuItem value="Choose Collection"> Choose Collection</MenuItem>
              <MenuItem value={"Percentage"}>Percentage</MenuItem>
              <MenuItem value={"Amount"}>Amount</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </div>
      <div className={styles.footer}>
        <span onClick={closeAdd}>Cancel</span>
        <button disabled={true}>Save</button>
      </div>
    </Dialog>
  );
};

export default EditPopularProducts;
