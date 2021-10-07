import React, { useState, useEffect } from "react";
import { Grid, InputAdornment, DialogTitle } from "@material-ui/core";
import {
	DatePicker,
	MuiPickersUtilsProvider,
	TimePicker,
} from "@material-ui/pickers";
import { Calendar, Clock } from "react-feather";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "../../../../components/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./CreateNegotiateItem.module.scss";
import clsx from "clsx";
import SVG from "react-inlinesvg";
import mainStyles from "../../../../index.module.scss";
import moment from "moment";
import { Trash } from "react-feather";
import NumberFormat from "react-number-format";

const options = [];
for (let i = 1; i <= 20; i += 0.5) {
	options.push(i);
}

const CreateNegotiateItem = ({
	data,
	item,
	startDate,
	endDate,
	index,
	negotiate,
	handleNegotiate,
	orgNegotiation,
	negotiables,
	startDateOpen,
	endDateOpen,
	handleStartDateOpen,
	handleEndDateOpen,
	startTimeOpen,
	endTimeOpen,
	handleStartTimeOpen,
	handleEndTimeOpen,
	handleRemoveNegotiate,
	availableNegotiableitems,
}) => {
	/**SVG */
	const Chevron = () => {
		return (
			<span className={styles.dropDownCustomizeSvg}>
				<SVG src={require("../../../../assets/chevron-down.svg")} />
			</span>
		);
	};

	console.log(negotiables);

	const getContent = (option) => {
		switch (option) {
			case "monthlyRetainerFee":
				return "Monthly Retainer";
			case "postFee":
				return "Cash Per Post";
			case "giftCard":
				return "Gift Card";
			case "campaignDuration":
				return "Campaign Duration";
			case "postFrequency":
				return "Post Frequency";
			case "revenueShare":
				return "Revenue Share %";
			case "other":
				return "Other";
			default:
				return "";
		}
	};

	const handleCalenderOpen = (value, index) => {
		handleStartDateOpen(true);
	};

	return (
		<Grid container spacing={2} className={styles.container}>
			<Grid
				item
				xs={12}
				className={clsx(
					styles.headerContainer,
					index > 0 ? styles.marginTop : ""
				)}
			>
				<DialogTitle className={styles.Heading} id="negotiate-dialog-title">

					{orgNegotiation && data.internalState != "NEGOTIATING" ? (
						<p>
							{
								negotiate.length > 1 && (
									<Trash onClick={() => handleRemoveNegotiate(index)} />
								)
							}
						</p>
					) :
						(
							<p>{
								negotiate.length > 0 && (
									<Trash onClick={() => handleRemoveNegotiate(index)} />
								)
							}</p>)}
				</DialogTitle>
			</Grid>
			<Grid item xs={12} className={styles.marginbottomSelect}>
				<FormControl fullWidth variant="outlined">
					<TextField
						id="Negotiate Item"
						fullWidth
						label="Negotiate Item"
						variant="outlined"
						className={mainStyles.placeholderColor}
						value={item.negotiateItem}
						onChange={(e) => {
							handleNegotiate(e.target.value, index, "Negotiate Item");
						}}
						menuprops={{ variant: "menu" }}
						select
						SelectProps={{ IconComponent: () => <Chevron /> }}
					>
						<MenuItem value="" disabled>
							Negotiate Item
						</MenuItem>
						{item.negotiateItem == "campaignDuration" && (
							<MenuItem value="campaignDuration">Campaign Duration</MenuItem>
						)}
						{item.negotiateItem == "monthlyRetainerFee" && (
							<MenuItem value="monthlyRetainerFee">Monthly Retainer</MenuItem>
						)}
						{item.negotiateItem == "postFee" && (
							<MenuItem value="postFee">Cash Per Post</MenuItem>
						)}
						{item.negotiateItem == "postFrequency" && (
							<MenuItem value="postFrequency">Post Frequency</MenuItem>
						)}
						{item.negotiateItem == "revenueShare" && (
							<MenuItem value="revenueShare">Revenue Share</MenuItem>
						)}
						{item.negotiateItem == "giftCard" && (
							<MenuItem value="giftCard">Gift Card</MenuItem>
						)}
						{item.negotiateItem == "other" && (
							<MenuItem value="other">Other</MenuItem>
						)}
						{availableNegotiableitems.map((option) => (
							<MenuItem key={option} value={option} className={styles.menuItemValue}>
								{getContent(option)}
							</MenuItem>
						))}
					</TextField>
				</FormControl>
			</Grid>

			{item.negotiateItem != "" ? (
				item.negotiateItem === "revenueShare" ? (
					<Grid item xs={12} className={styles.marginbottomSelect}>
						<FormControl fullWidth variant="outlined">
							<TextField
								id="revenue Share"
								fullWidth
								label="Percentage"
								variant="outlined"
								className={mainStyles.placeholderColor}
								value={item.negotiateValue}
								onChange={(e) => {
									handleNegotiate(e.target.value, index, "Negotiate Revenue Value");
								}}
								menuprops={{ variant: "menu" }}
								select
								SelectProps={{ IconComponent: () => <Chevron /> }}
							>
								<MenuItem value="" disabled>
									Negotiate Item
								</MenuItem>
								{options.map((option) => (
									<MenuItem key={option} value={option}>
										{option} %
									</MenuItem>
								))}
							</TextField>
						</FormControl>
					</Grid>
				) : item.negotiateItem === "campaignDuration" ? (
					<>
						<Grid item xs={12} sm={12} md={6}>
							<TextField
								id="outlined-basic"
								fullWidth
								value={startDate}
								onChange={(e) => {
									handleNegotiate(e.target.value, index, "Negotiate StartDate");
								}}
								label="Start Date"
								className={mainStyles.placeholderColor}
								variant="outlined"
								onBlur={() => { }}
								InputProps={{
									endAdornment: (
										<InputAdornment
											className={styles.inputendornment}
											position="end"
										>
											<Calendar onClick={() => handleStartDateOpen(true)} />
										</InputAdornment>
									),
								}}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<DatePicker
									className={styles.displayNone}
									open={startDateOpen}
									value={startDate}
									selected={startDate}
									disablePast={true}
									initialFocusedDate={moment().add(1, "day")}
									onChange={(date) => {
										handleNegotiate(date, index, "Negotiate StartDate");
									}}
									allowKeyboardControl={true}
									orientation="landscape"
									openTo="date"
									format="MM/dd/yyyy"
									margin="normal"
									onBlur={() => { }}
									onClose={() => handleStartDateOpen(false)}
								/>
							</MuiPickersUtilsProvider>
						</Grid>

						<Grid item xs={12} sm={12} md={6}>
							<TextField
								id="outlined-basic"
								fullWidth
								value={endDate}
								onChange={(e) => {
									handleNegotiate(e.target.value, index, "Negotiate EndDate");
								}}
								label="End Date"
								className={mainStyles.placeholderColor}
								variant="outlined"
								onBlur={() => { }}
								InputProps={{
									endAdornment: (
										<InputAdornment
											className={styles.inputendornment}
											position="end"
										>
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
									disablePast={true}
									selected={endDate}
									onChange={(date) => {
										handleNegotiate(date, index, "Negotiate EndDate");
									}}
									allowKeyboardControl={true}
									orientation="landscape"
									openTo="date"
									format="MM/dd/yyyy"
									margin="normal"
									onBlur={() => { }}
									onClose={() => handleEndDateOpen(false)}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						{/* <Grid item xs={12} sm={12} md={6}>
							<TextField
								id="outlined-basic"
								fullWidth
								label="Start Time"
								// defaulttime={startTime}
								className={mainStyles.placeholderColor}
								ampm="true"
								value={item.negotiateStartTime}
								onChange={(e) =>
									handleNegotiate(e.target.value, index, "Negotiate StartTime")
								}
								variant="outlined"
								// helperText={
								// startTimeError ? (
								// <span className={styles.errorText}> Start Time IN FUTURE </span>
								// ) : (
								// " "
								// )
								// }
								InputProps={{
									endAdornment: (
										<InputAdornment
											className={styles.inputendornment}
											position="end"
										>
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
									selected={item.negotiateStartTime}
									ampm="true"
									onClose={() => handleStartTimeOpen(false)}
									onChange={(time) =>
										handleNegotiate(time, index, "Negotiate StartTime")
									}
									orientation="landscape"
									openTo="time"
								/>
							</MuiPickersUtilsProvider>
						</Grid> */}

						{/* <Grid item xs={12} sm={12} md={6}>
							<TextField
								id="time"
								fullWidth
								label="End Time"
								className={mainStyles.placeholderColor}
								value={item.negotiateEndTime}
								onChange={(e) =>
									handleNegotiate(e.target.value, index, "Negotiate EndTime")
								}
								variant="outlined"
								// helperText={
								// endTimeError ? (
								// <span className={styles.errorText}>
								// {" "}
								// End Time AFTER Start Time{" "}
								// </span>
								// ) : (
								// " "
								// )
								// }
								InputProps={{
									endAdornment: (
										<InputAdornment
											className={styles.inputendornment}
											position="end"
										>
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
									selected={item.negotiateEndTime}
									onClose={() => handleEndTimeOpen(false)}
									onChange={(time) =>
										handleNegotiate(time, index, "Negotiate EndTime")
									}
									orientation="landscape"
									openTo="time"
								/>
							</MuiPickersUtilsProvider>
						</Grid> */}
					</>
				) : item.negotiateItem === "postFrequency" ? (
					<Grid item xs={12} className={styles.marginbottomSelect}>
						<FormControl fullWidth variant="outlined">
							<TextField
								id="revenue Share"
								fullWidth
								label="Per Time Period"
								variant="outlined"
								className={mainStyles.placeholderColor}
								value={item.negotiateFrequency}
								onChange={(e) => {
									handleNegotiate(e.target.value, index, "Negotiate Frequency");
								}}
								menuprops={{ variant: "menu" }}
								select
								SelectProps={{ IconComponent: () => <Chevron /> }}
							>
								<MenuItem value="" disabled>
									Per Time Period
								</MenuItem>
								<MenuItem value={"MONTH"}> Every Month </MenuItem>
								<MenuItem value={"BI_MONTHLY"}>Every other month </MenuItem>
								<MenuItem value={"WEEK"}>Every Week </MenuItem>
								<MenuItem value={"BI_WEEKLY"}>Every other week </MenuItem>
							</TextField>
						</FormControl>
					</Grid>
				) : item.negotiateItem === "other" ? (
					<Grid item xs={12} sm={12} md={12}>
						<FormControl fullWidth variant="outlined">
							<TextField
								labelid="demo-simple-select-outlined-label"
								id="message"
								label="Explain"
								fullWidth
								multiline={true}
								rows={6}
								variant="outlined"
								className={mainStyles.placeholderColor}
								value={item.negotiateValue}
								onChange={(e) =>
									handleNegotiate(e.target.value, index, "Negotiate Value")
								}
								MenuProps={{ variant: "menu" }}
							></TextField>
						</FormControl>
					</Grid>
				) : (
									<Grid item xs={12} sm={12} md={12}>
										<FormControl fullWidth variant="outlined">
											<TextField
												labelid="demo-simple-select-outlined-label"
												id="message"
												label="Enter Value "
												fullWidth
												thousandSeparator={true}
												variant="outlined"
												className={mainStyles.placeholderColor}
												value={item.negotiateValue}
												onChange={(e) =>
													handleNegotiate(e.target.value, index, "Negotiate Value")
												}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">$</InputAdornment>
													),
												}}
												MenuProps={{ variant: "menu" }}
											></TextField>
										</FormControl>
									</Grid>
								)
			) : (
					""
				)}
		</Grid>
	);
};

export default CreateNegotiateItem;