import React, { useState, useEffect } from "react";
import { Grid, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import SVG from "react-inlinesvg";
import CreateCompensation from "./CreateCompensation";
import AddIcon from "@material-ui/icons/Add";
import styles from "./Compensations.module.scss";
import TextField from "../../../components/TextField";
import mainStyles from "../../../index.module.scss";

const Compensations = ({
  compensations,
  handleCompensations,
  handleCompensationValue,
  handleRemoveCompensation,
  handleActiveForCompensation,
  addAnother,

  compensationPayment,
  handleCompensationPayment,
  compensationProduct,
  handleCompensationProducts,
  compensationProductItems,
  handleCollectionExpand,
  compensationProducts,
  handleActiveForCompensationProduct,
  handleCompensationProductItem,
  giftCode,
  handleGiftCode,
  clearCollections,
  products,
}) => {
  useEffect(() => {
    handleAvailableOptions();
  }, []);
  useEffect(() => {
    handleAvailableOptions();
  }, [compensations]);

  /**SVG */
  const Chevron = ({ Check, MenuId, ...other }) => {
    const onClick = () => {
      if (Check === "open") {
        setOpen(!open);
      }
    };
    return (
      <span
        onClick={onClick}
        {...other}
        className={styles.dropDownCustomizeSvg}
      >
        <SVG src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`} />
      </span>
    );
  };

  var compensationTypeMap = [
    { compensationType: "CASH_PER_POST", text: "Cash per post" },
    {
      compensationType: "CASH_PER_MONTHLY_DELIVERABLE",
      text: "Cash per monthly deliverable",
    },
    { compensationType: "REVENUE_SHARE", text: "Revenue Share" },
    { compensationType: "GIFT_CARD", text: "Gift Card" },
    // { compensationType: "PRODUCT", text: "Products" },
  ];
  const [availableCompensationTypes, setAvailableCompensationTypes] = useState(
    JSON.parse(JSON.stringify(compensationTypeMap))
  ); //doing deep copy

  const handleAvailableOptions = () => {
    var allOptions = [
      { compensationType: "CASH_PER_POST", text: "Cash per post" },
      {
        compensationType: "CASH_PER_MONTHLY_DELIVERABLE",
        text: "Cash per monthly deliverable",
      },
      { compensationType: "REVENUE_SHARE", text: "Revenue Share" },
      { compensationType: "GIFT_CARD", text: "Gift Card" },
      // { compensationType: "PRODUCT", text: "Products" },
    ];
    const results = allOptions.filter(
      ({ compensationType: id1 }) =>
        !compensations.some(({ compensationType: id2 }) => id2 === id1)
    );
    setAvailableCompensationTypes(results);
  };

  const [open, setOpen] = useState(false);
  const checkAddAnother = () => {
    if (addAnother === true) {
      setAnother(true);
    }
  };
  const handle = () => {
    handleAvailableOptions();
    handleCompensations();
  };
  const [handleAnother, setAnother] = useState(false);

  useEffect(() => {
    checkAddAnother();
    handleActiveForCompensation();
  }, [compensations, compensationPayment]);

  useEffect(() => {
    clearCollections();
  }, []);

  return (
    <div>
      <Grid container spacing={3} className={styles.mainContainer1}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <TextField
              labelid="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Influencer payment schedule"
              fullWidth
              variant="outlined"
              className={mainStyles.placeholderColor}
              value={compensationPayment}
              onChange={(e) => {
                handleCompensationPayment(e.target.value);
              }}
              menuprops={{ variant: "menu" }}
              select
              SelectProps={{
                IconComponent: () => <Chevron MenuId="open" Check="open" />,
                open: open,
                onClose: () => {
                  setOpen(false);
                },
                onOpen: () => {
                  setOpen(true);
                },
              }}
            >
              <MenuItem value="" disabled>
                {" "}
                Influencer payment schedule
              </MenuItem>
              <MenuItem value={"FIRST_OF_MONTH"}>1st of every month</MenuItem>
              <MenuItem value={"FIFTEENTH_OF_MONTH"}>
                15th of every month
              </MenuItem>
              <MenuItem value={"LAST_DAY_OF_MONTH"}>
                Last day of every month
              </MenuItem>
            </TextField>
          </FormControl>
        </Grid>
      </Grid>
      {compensations.map((item, index) => (
        <CreateCompensation
          setAvailableCompensationTypes={setAvailableCompensationTypes}
          availableCompensationTypes={availableCompensationTypes}
          compensationTypeMap={compensationTypeMap}
          giftCode={giftCode}
          handleGiftCode={handleGiftCode}
          item={item}
          key={index}
          compensations={compensations}
          index={index}
          handleCompensationValue={handleCompensationValue}
          handleRemoveCompensation={handleRemoveCompensation}
          handleAnother={() => setAnother(true)}
          compensationProduct={compensationProduct}
          handleCompensationProducts={handleCompensationProducts}
          compensationProductItems={compensationProductItems}
          compensationProducts={compensationProducts}
          handleActiveForCompensationProduct={
            handleActiveForCompensationProduct
          }
          handleCollectionExpand={handleCollectionExpand}
          handleCompensationProductItem={handleCompensationProductItem}
          products={products}
          handleAvailableOptions={handleAvailableOptions}
        />
      ))}
      {compensations.length > 0 && compensations.length !== 4 && (
        <button className={styles.addDeliverable} onClick={handle}>
          {" "}
          <AddIcon /> Add another compensation type
        </button>
      )}
    </div>
  );
};

export default Compensations;
