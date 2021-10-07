import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TextField from "../../../components/TextField";
import styles from "./Billing.module.scss";
import { Plus, HelpCircle } from "react-feather";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";

const Billing = () => {
  const [primaryBillingType, setPrimaryBillingType] = useState(null);
  const [secondaryBillingType, setSecondaryBillingType] = useState(null);

  const handlePrimaryBilling = (type) => {
    setPrimaryBillingType(type);
  };

  const handleSecondaryBilling = (type) => {
    setSecondaryBillingType(type);
  };
  return (
    <div>
      <p className={styles.billingHeading}>
        You will be billed automatically every 30 days. See our{" "}
        <Link to="#">pricing model </Link>
        for billing info.
      </p>
      <p className={styles.primary}>Primary Payment</p>
      <Grid container spacing={3}>
        <Grid item xs={6} className={styles.iconItem}>
          <button
            className={clsx(primaryBillingType === "CC" ? styles.active : "")}
            onClick={() => handlePrimaryBilling("CC")}
          >
            <Plus /> Add credit card
          </button>
        </Grid>
        <Grid item xs={6} className={styles.imageItem}>
          <button
            className={clsx(primaryBillingType === "PP" ? styles.active : "")}
            onClick={() => handlePrimaryBilling("PP")}
          >
            <div className={styles.content}>
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/images/paypal.png`}
                  alt="paypal"
                  height={38}
                  width={152}
                />
                <span>malloryhuntsman@gmail.com</span>
              </div>
              {primaryBillingType === "PP" ? <CheckCircleIcon /> : ""}
            </div>
          </button>
        </Grid>
        {primaryBillingType === "CC" && (
          <>
            {" "}
            <Grid item md={12}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Name on Card"
                variant="outlined"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Card Number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Expiration Date"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="CCV"
                variant="outlined"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Street Address"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="City"
                variant="outlined"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="State"
                variant="outlined"
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Zip Code"
                variant="outlined"
              />
            </Grid>
          </>
        )}
      </Grid>
      <div>
        <p className={styles.primary}>
          Secondary Payment <HelpCircle />
        </p>
        <Grid container spacing={3}>
          <Grid item xs={6} className={styles.iconItem}>
            <button
              className={clsx(
                secondaryBillingType === "CC" ? styles.active : ""
              )}
              onClick={() => handleSecondaryBilling("CC")}
            >
              <Plus /> Add credit card
            </button>
          </Grid>
          <Grid item xs={6} className={styles.imageItem}>
            <button
              className={clsx(
                secondaryBillingType === "PP" ? styles.active : ""
              )}
              onClick={() => handleSecondaryBilling("PP")}
            >
              <div className={styles.content}>
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/paypal.png`}
                    alt="paypal"
                    height={38}
                    width={152}
                  />
                  <span>malloryhuntsman@gmail.com</span>
                </div>
                {secondaryBillingType === "PP" ? <CheckCircleIcon /> : ""}
              </div>
            </button>
          </Grid>
          {secondaryBillingType === "CC" && (
            <>
              {" "}
              <Grid item md={12}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Name on Card"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Card Number"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Expiration Date"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="CCV"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Street Address"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="City"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="State"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Zip Code"
                  variant="outlined"
                />
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Billing;
