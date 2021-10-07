import React, { useEffect } from "react";
import { Grid, InputAdornment, Dialog, emphasize } from "@material-ui/core";
import { HelpCircle } from "react-feather";
import styles from "./EditInfluencerInformation.module.scss";
import TextField from "../../../../../components/TextField";
import FormControl from "@material-ui/core/FormControl";
import SVG from "react-inlinesvg";
import MenuItem from "@material-ui/core/MenuItem";
import mainStyles from "../../../../../index.module.scss";

const Chevron = () => {
  return (
    <span className={styles.dropDownCustomizeSvg}>
      <SVG src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`} />
    </span>
  );
};

const EditInfluencerInformation = ({
  open,
  handleChange,
  closeAdd,
  name,
  handleName,
  age,
  handleAge,
  website,
  handleWebsite,
  phoneNumber,
  handlePhoneNumber,
  bio,
  handleBio,
  location,
  handleLocation,
  handleActiveSave,
  handleUpdate,
  email,
  activeSave,
  handleEmail,
  errorMessage,
}) => {
  useEffect(() => {
    handleActiveSave();
  }, [name, age, website, email, phoneNumber, bio]);

  return (
    <Dialog
      classes={{ paper: styles.editContact }}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      onClose={closeAdd}
    >
      <div className={styles.content}>
        <h6>Influencer Information</h6>
        <Grid item xs={12} className={styles.element}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Display Name"
            variant="outlined"
            value={name}
            onChange={handleName}
            className={mainStyles.placeholderColor}
          />
        </Grid>
        <Grid item xs={12} className={styles.element}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="Age Range"
              fullWidth
              label="Age Range"
              variant="outlined"
              className={mainStyles.placeholderColor}
              value={age}
              onChange={handleAge}
              MenuProps={{ variant: "menu" }}
              select
              SelectProps={{ IconComponent: () => <Chevron /> }}
            >
              <MenuItem value="Age Range" disabled>
                Age Range
              </MenuItem>
              <MenuItem value={10}>15-20 </MenuItem>
              <MenuItem value={20}>20-30 </MenuItem>
              <MenuItem value={30}>30-35 </MenuItem>
              <MenuItem value={40}>35-40 </MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} className={styles.element}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Location"
            variant="outlined"
            className={mainStyles.placeholderColor}
            value={location}
            onChange={handleLocation}
          />
        </Grid>
        <Grid item xs={12} className={styles.element}>
          <TextField
            className={styles.bio}
            id="outlined-basic"
            fullWidth
            label="Bio"
            rows={5}
            variant="outlined"
            value={bio}
            multiline
            onChange={handleBio}
          />
        </Grid>

        <Grid item xs={12} className={styles.element}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Email"
            variant="outlined"
            className={mainStyles.placeholderColor}
            value={email}
            onChange={handleEmail}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HelpCircle />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} className={styles.element}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Website Url"
            variant="outlined"
            className={mainStyles.placeholderColor}
            value={website}
            onChange={handleWebsite}
          />
        </Grid>

        <Grid item xs={12} className={styles.element}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Mobile Number"
            variant="outlined"
            className={mainStyles.placeholderColor}
            value={phoneNumber}
            onChange={handlePhoneNumber}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HelpCircle />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} className={styles.element}>
          <div>
            <p className={styles.productsHeading}>
              By providing your clothing sizes on your profile, brands are able
              to send you clothes for campaigns or as care packages.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} className={styles.element}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="Shirt Size"
              fullWidth
              label="Shirt Size"
              variant="outlined"
              className={mainStyles.placeholderColor}
              MenuProps={{ variant: "menu" }}
              select
              SelectProps={{ IconComponent: () => <Chevron /> }}
            >
              <MenuItem value="Shirt Size" disabled>
                Shirt Size
              </MenuItem>
              <MenuItem value="Small">Small </MenuItem>
              <MenuItem value="medium">Medium </MenuItem>
              <MenuItem value="Large">Large </MenuItem>
              <MenuItem value="Extra large">Extra large </MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} className={styles.element}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="Pant Size"
              fullWidth
              label="Pant Size"
              variant="outlined"
              className={mainStyles.placeholderColor}
              MenuProps={{ variant: "menu" }}
              select
              SelectProps={{ IconComponent: () => <Chevron /> }}
            >
              <MenuItem value="Pant Size" disabled>
                Pant Size
              </MenuItem>
              <MenuItem value="Small">Small </MenuItem>
              <MenuItem value="medium">Medium </MenuItem>
              <MenuItem value="Large">Large </MenuItem>
              <MenuItem value="Extra large">Extra large </MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} className={styles.element}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="Dress Size"
              fullWidth
              label="Dress Size"
              variant="outlined"
              className={mainStyles.placeholderColor}
              MenuProps={{ variant: "menu" }}
              select
              SelectProps={{ IconComponent: () => <Chevron /> }}
            >
              <MenuItem value="Dress Size" disabled>
                Dress Size
              </MenuItem>
              <MenuItem value="Small">Small </MenuItem>
              <MenuItem value="medium">Medium </MenuItem>
              <MenuItem value="Large">Large </MenuItem>
              <MenuItem value="Extra large">Extra large </MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} className={styles.element}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="Shoe Size"
              fullWidth
              label="Shoe Size"
              variant="outlined"
              className={mainStyles.placeholderColor}
              MenuProps={{ variant: "menu" }}
              select
              SelectProps={{ IconComponent: () => <Chevron /> }}
            >
              <MenuItem value="Shoe Size" disabled>
                Shoe Size
              </MenuItem>
              <MenuItem value="Small">Small </MenuItem>
              <MenuItem value="medium">Medium </MenuItem>
              <MenuItem value="Large">Large </MenuItem>
              <MenuItem value="Extra large">Extra large </MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        {errorMessage !== "" && (
          <Grid item xs={12} className={styles.element}>
            <p className={styles.error}>{errorMessage}</p>
          </Grid>
        )}
      </div>
      <div className={styles.footer}>
        <span onClick={closeAdd}>Cancel</span>
        <button
          disabled={activeSave}
          className={activeSave ? styles.disabledClass : ""}
          onClick={handleUpdate}
        >
          Save
        </button>
      </div>
    </Dialog>
  );
};

export default EditInfluencerInformation;
