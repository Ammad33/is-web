import React from "react";
import { Grid, InputAdornment, Dialog } from "@material-ui/core";
import styles from "./EditProduct.module.scss";
import TextField from "../../../../../components/TextField";
import { Search } from "react-feather";
import Chip from "@material-ui/core/Chip";
import SVG from "react-inlinesvg";

const Done = () => {
  return (
    <span className={styles.doneIcon}>
      <SVG src={`${process.env.PUBLIC_URL}/images/check.svg`} />
    </span>
  );
};

const EditProduct = ({ open, closeAdd }) => {
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
        <h6>Product Categories</h6>
        <div>
          <p className={styles.productsHeading}>
            Search and select categories that best represent your brand and
            products.
          </p>
        </div>
        <Grid item xs={12} className={styles.element}>
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Chip
          size="medium"
          label="Active Lifestyle"
          className={styles.chip}
          onDelete={handleDelete}
          deleteIcon={<Done />}
        />
        <Chip
          size="medium"
          label="Beauty"
          className={styles.chip}
          onDelete={handleDelete}
          deleteIcon={<Done />}
        />
        <Chip
          size="medium"
          label="Clean Editing"
          className={styles.chip}
          onDelete={handleDelete}
          deleteIcon={<Done />}
        />
        <Chip
          size="medium"
          label="Clickable"
          className={styles.chip}
          onDelete={handleDelete}
          deleteIcon={<Done />}
        />
        <Chip
          size="medium"
          label="Clickable"
          className={styles.chip}
          onDelete={handleDelete}
          deleteIcon={<Done />}
        />
        <Chip
          size="medium"
          label="Clickable"
          className={styles.chip}
          onDelete={handleDelete}
          deleteIcon={<Done />}
        />
      </div>
      <div className={styles.footer}>
        <span onClick={closeAdd}>Cancel</span>
        <button disabled={true}>Save</button>
      </div>
    </Dialog>
  );
};

export default EditProduct;
