import { Calendar, Clock, AlertCircle } from "react-feather";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Grid, InputAdornment, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import SelectMenu from "../../../components/SelectMenu";
import styles from "./AddCampaignDetail.module.scss";
import { TimePicker } from "@material-ui/pickers";
import mainStyles from "../../../index.module.scss";
import TextField from "../../../components/TextField";
import moment from "moment";

const options = [];
for (let i = 1; i <= 100; i += 1) {
  options.push(i);
}

/*
handleCampaignName,
	handleStartDate {function} used to set the start date
	handleEndDate {function} used to set the end date
	campaignName {function} for setting campaign name and name validation
	startDate {date variable} to store start date
	startDateError {bool} act as flag for the start date error
	endDate {date variable} to store end date
	endDateError {bool} act as flag for the end date error
	startTime {time variable} used to set start time
	startTimeError {bool} act as flag for the start time error
	endTime {time variable} used to set start time
	endTimeError {bool} act as flag for the end time error
	discount {variable} used to store discount
	discountType {variable} used to store discount type
	customeMessage {variable}
	handleStartTime {function} to handle satrt time
	handleEndTime {function} to handle end time
	handleDiscountType {function} to handle DiscountType
	handleDiscount {function} to handle Discount
	handleCustomMessage {function} to handle DiscountType
	startDateOpen {bool} to open/close datepicker
	endDateOpen {bool} to open/close datepicker
	handleStartDateOpen {function} start date handle
	handleEndDateOpen {function} end date handle
	handleStartTimeOpen {function} start time handle
	startTimeOpen {bool} to open/close time
	endTimeOpen {bool} to open/close time
	handleEndTimeOpen {function} end time handle
	filledForm {function} checks to active the Next button
	partialFilledForm  {function} checks for active Save
	campaignError {string} to store campaign errors
	minimium {string} to store minimum cart value
	handleMinimium {function} to handle minimum cart value 
	*/

const AddCampaignDetails = ({
  handleCampaignName,
  handleStartDate,
  handleEndDate,
  campaignName,
  startDate,
  startDateError,
  endDate,
  endDateError,
  startTime,
  startTimeError,
  endTime,
  endTimeError,
  discount,
  discountType,
  customeMessage,
  handleStartTime,
  handleEndTime,
  handleDiscountType,
  handleDiscount,
  handleCustomMessage,
  startDateOpen,
  endDateOpen,
  handleStartDateOpen,
  handleEndDateOpen,
  handleStartTimeOpen,
  startTimeOpen,
  endTimeOpen,
  handleEndTimeOpen,
  filledForm,
  partialFilledForm,
  campaignError,
  minimium,
  handleMinimium,
  handleDefaultDate,
  handleDefaultTime,
  dummyStartDate,
  dummyStartEndTime,
}) => {
  const Chevron = ({ Check, MenuId, ...other }) => {
    const onClick = () => {
      if (Check === "open") {
        setOpen(!open);
      } else if (Check === "open1") {
        setOpen1(!open1);
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

  useEffect(() => {
    if (moment(startDate).isSameOrBefore("01/01/1970")) {
      handleDefaultDate(startDate);
    }
    if (startDate === "" || moment(startDate).isSameOrBefore("01/01/1970")) {
      handleDefaultTime();
    }
  }, []);

  const handleCalenderOpen = (value, startDate) => {
    handleStartDateOpen(true);
  };

  useEffect(() => {
    filledForm();
    partialFilledForm();
  }, [
    campaignName,
    startDate,
    endDate,
    startTime,
    endTime,
    discount,
    discountType,
    customeMessage,
  ]);

  useEffect(() => {
    partialFilledForm();
  });

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  return (
    <Grid container spacing={2} className={styles.mainContainerGrid}>
      <Grid item md={12} className={styles.campaignNameGrid}>
        <TextField
          id="outlined-basic"
          fullWidth
          value={campaignName}
          onChange={handleCampaignName}
          label="Campaign Name"
          className={mainStyles.placeholderColor}
          helperText={
            campaignError &&
            campaignError !== "" && (
              <span className={styles.errorMessage}>{campaignError}</span>
            )
          }
          variant="outlined"
          InputProps={{
            endAdornment: campaignError && campaignError !== "" && (
              <InputAdornment className={styles.inputendornment} position="end">
                <AlertCircle color="#D55656" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id="outlined-basic"
          fullWidth
          value={startDate}
          value={dummyStartDate ? "" : startDate}
          onChange={(e) => handleStartDate(e.target.value)}
          label="Start Date"
          className={mainStyles.placeholderColor}
          variant="outlined"
          onBlur={() => {}}
          helperText={
            startDateError ? (
              <span className={styles.errorText}> Start Date IN FUTURE </span>
            ) : (
              " "
            )
          }
          InputProps={{
            endAdornment: (
              <InputAdornment className={styles.inputendornment} position="end">
                <Calendar
                  onClick={(value) => handleCalenderOpen(value, startDate)}
                />
              </InputAdornment>
            ),
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            className={styles.displayNone}
            open={startDateOpen}
            value={startDate}
            disablePast={true}
            initialFocusedDate={moment().add(1, "day")}
            onChange={handleStartDate}
            allowKeyboardControl={true}
            orientation="landscape"
            openTo="date"
            format="MM/dd/yyyy"
            margin="normal"
            onBlur={() => {}}
            onClose={() => handleStartDateOpen(false)}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id="outlined-basic"
          fullWidth
          label="End Date"
          value={dummyStartDate ? "" : endDate}
          className={mainStyles.placeholderColor}
          onChange={(e) => handleEndDate(e.target.value)}
          variant="outlined"
          helperText={
            endDateError ? (
              <span className={styles.errorText}>
                {" "}
                End date AFTER Start date{" "}
              </span>
            ) : (
              " "
            )
          }
          InputProps={{
            endAdornment: (
              <InputAdornment className={styles.inputendornment} position="end">
                <Calendar onClick={() => handleEndDateOpen(true)} />
              </InputAdornment>
            ),
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            className={styles.displayNone}
            open={endDateOpen}
            value={endDate}
            allowKeyboardControl={true}
            disablePast={true}
            minDate={moment(startDate).add("1", "month")}
            onClose={() => handleEndDateOpen(false)}
            onChange={handleEndDate}
            orientation="landscape"
            openTo="date"
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id="outlined-basic"
          fullWidth
          label="Start Time"
          defaulttime={startTime}
          className={mainStyles.placeholderColor}
          ampm="true"
          value={dummyStartEndTime ? "" : startTime}
          onChange={(e) => handleStartTime(e.target.value)}
          variant="outlined"
          helperText={
            startTimeError ? (
              <span className={styles.errorText}> Start Time IN FUTURE </span>
            ) : (
              " "
            )
          }
          InputProps={{
            endAdornment: (
              <InputAdornment className={styles.inputendornment} position="end">
                <Clock onClick={() => handleStartTimeOpen(true)} />
              </InputAdornment>
            ),
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            className={styles.displayNone}
            open={startTimeOpen}
            value="00.01"
            ampm="true"
            onClose={() => handleStartTimeOpen(false)}
            onChange={handleStartTime}
            orientation="landscape"
            openTo="time"
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id="time"
          fullWidth
          label="End Time"
          className={mainStyles.placeholderColor}
          value={dummyStartEndTime ? "" : endTime}
          onChange={(e) => handleEndTime(e.target.value)}
          variant="outlined"
          helperText={
            endTimeError ? (
              <span className={styles.errorText}>
                {" "}
                End Time AFTER Start Time{" "}
              </span>
            ) : (
              " "
            )
          }
          InputProps={{
            endAdornment: (
              <InputAdornment className={styles.inputendornment} position="end">
                <Clock onClick={() => handleEndTimeOpen(true)} />
              </InputAdornment>
            ),
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            className={styles.displayNone}
            open={endTimeOpen}
            value="00.01"
            onClose={() => handleEndTimeOpen(false)}
            onChange={handleEndTime}
            orientation="landscape"
            openTo="time"
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormControl fullWidth variant="outlined">
          <TextField
            id="Discount Type"
            fullWidth
            label="Discount Type"
            variant="outlined"
            value={discountType}
            className={mainStyles.placeholderColor}
            onChange={(e) => handleDiscountType(e.target.value)}
            menuprops={{ variant: "menu" }}
            select
            SelectProps={{
              IconComponent: () => (
                <Chevron MenuId="menuDiscountType" Check="open" />
              ),
              open: open,
              onClose: () => {
                setOpen(false);
              },
              onOpen: () => {
                setOpen(true);
              },
            }}
            helperText={endTimeError ? <span> </span> : " "}
          >
            <MenuItem value="Discount Type" disabled>
              Discount Type
            </MenuItem>
            <MenuItem value={"Percentage"}>Percentage</MenuItem>
            <MenuItem value={"Amount"}>Amount</MenuItem>
          </TextField>
        </FormControl>
      </Grid>
      {discountType && discountType == "Percentage" ? (
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <TextField
              labelid="demo-simple-select-outlined-label"
              id="outlined-basic"
              label="Discount Value"
              fullWidth
              variant="outlined"
              className={mainStyles.placeholderColor}
              value={discount}
              onChange={(e) => handleDiscount(e.target.value)}
              menuprops={{ variant: "menu" }}
              select
              SelectProps={{
                IconComponent: () => (
                  <Chevron MenuId="menuDiscountValue" Check="open1" />
                ),
                open: open1,
                onClose: () => {
                  setOpen1(false);
                },
                onOpen: () => {
                  setOpen1(true);
                },
              }}
            >
              <MenuItem value="" disabled>
                Discount Percentage
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option} %
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Discount Value"
            className={mainStyles.placeholderColor}
            value={discount}
            onChange={(e) => handleDiscount(e.target.value)}
            variant="outlined"
            helperText={" "}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
      )}
      {discountType && discountType == "Amount" ? (
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Minimum Cart Value"
            className={mainStyles.placeholderColor}
            value={minimium}
            onChange={handleMinimium}
            variant="outlined"
            helperText={" "}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
      ) : (
        ""
      )}
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          id="outlined-basic"
          fullWidth
          multiline
          value={customeMessage}
          onChange={handleCustomMessage}
          className={mainStyles.placeholderColor}
          rows={4}
          label={"Enter a max 1000 characters to send with your invitation"}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default AddCampaignDetails;
