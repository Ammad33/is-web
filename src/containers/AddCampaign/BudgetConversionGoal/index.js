import React, { useEffect, useState } from "react";
import { Grid, InputAdornment } from "@material-ui/core";
import mainStyles from "../../../index.module.scss";
import styles from "./BudgetConversationGoal.module.scss";
import TextField from "../../../components/TextField";
import NumberFormat from "react-number-format";
const BudgetAndConversionGoals = ({
  budget,
  handleBudget,
  handleGrossSale,
  targetGrossSale,
  setActiveForBudget,
}) => {
  const [error, setError] = useState(false);

  /**checks for condition and activate the next button for budget */
  useEffect(() => {
    setActiveForBudget();
  }, [budget, targetGrossSale]);
  return (
    <Grid container spacing={2} className={styles.mainContainer}>
      <Grid item md={12}>
        <NumberFormat
          customInput={TextField}
          thousandSeparator={true}
          prefix={"$"}
          variant="outlined"
          label="Budget"
          min={0}
          id="outlined-basic"
          value={budget}
          onValueChange={handleBudget}
          helperText={error ? <span> error </span> : " "}
          fullWidth
          className={mainStyles.placeholderColor}
          allowNegative={false}
        />
        {/* <TextField
          id='outlined-basic'
          fullWidth
          value={budget}
          onChange={handleBudget}
          className={mainStyles.placeholderColor}
          label='Budget'
          helperText={error ? <span> error </span> : ' '}
          variant='outlined'
          type='number'
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
        /> */}
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <NumberFormat
          customInput={TextField}
          thousandSeparator={true}
          prefix={"$"}
          variant="outlined"
          label="Target Gross Sales"
          id="outlined-basic"
          value={targetGrossSale}
          onValueChange={handleGrossSale}
          helperText={error ? <span> error </span> : " "}
          fullWidth
          className={mainStyles.placeholderColor}
          allowNegative={false}
        />
        {/* <TextField
          id='outlined-basic'
          fullWidth
          type='number'
          value={targetGrossSale}
          className={mainStyles.placeholderColor}
          onChange={handleGrossSale}
          label='Target Gross Sales'
          variant='outlined'
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
        /> */}
      </Grid>
    </Grid>
  );
};

export default BudgetAndConversionGoals;
