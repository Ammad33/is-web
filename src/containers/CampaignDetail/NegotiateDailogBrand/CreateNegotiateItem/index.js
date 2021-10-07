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
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
	Timeline,
	TimelineItem as MuiTimelineItem,
	TimelineSeparator,
	TimelineConnector,
	TimelineContent,
	TimelineOppositeContent,
	TimelineDot,
} from "@material-ui/lab";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CheckCircleoutline from "@material-ui/icons/CheckCircleOutline";
import Typography from "@material-ui/core/Typography";

const options = [];
for (let i = 1; i <= 20; i += 0.5) {
	options.push(i);
}

const useStyles = makeStyles({
	timeline: {
		// transform: "rotate(90deg)"
		margin: "-17px",
		marginLeft: "5px",
	},
	timelineContentContainer: {
		textAlign: "left",
	},
	timelineContent: {
		display: "inline-block",
		transform: "rotate(90deg)",
		textAlign: "center",
		minWidth: 50,
	},
});

const TimelineItem = withStyles({
	missingOppositeContent: {
		"&:before": {
			display: "none",
		},
	},
})(MuiTimelineItem);

const CreateNegotiateItem = ({
	item,
	index,
	negotiate,
	activity,
	brandName,
	showApprovedActivity,
	influencerName,
	handleNegotiate,
	startDateOpen,
	endDateOpen,
	handleStartDateOpen,
	handleEndDateOpen,
	startTimeOpen,
	endTimeOpen,
	handleStartTimeOpen,
	handleEndTimeOpen,
}) => {
	/**SVG */

	const [acceptedCardHeading, setAcceptedCardHeading] = useState('cancel')
	const [acceptedCard, setAcceptedCard] = useState(true);
	const Chevron = () => {
		return (
			<span className={styles.dropDownCustomizeSvg}>
				<SVG src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`} />
			</span>
		);
	};
	const [value, setValue] = React.useState('');

	useEffect(() => {
		if (acceptedCardHeading === "cancel") {
			handleNegotiate(0, index, "reOpenValue")
		}
	}, [acceptedCard])


	const handleRadioButton = (event, item, indx, val) => {
		setValue(event.target.value);
		handleNegotiate(item, indx, val);
	};

	const getHeading = (value) => {
		var negoItemToHeadingMap = {
			postFee: "Cash Per Post",
			revenueShare: "Revenue Share",
			monthlyRetainerFee: "Monthly Retainer Fee",
			giftCard: "Gift Card",
			campaignDuration: "Campaign Duration",
		};

		return negoItemToHeadingMap[value];
	};


	const handleReOpen = (event) => {
		var isOpened = acceptedCardHeading == "reopen" ? 'cancel' : 'reopen'
		setAcceptedCardHeading(isOpened);
		setAcceptedCard(acceptedCard ? false : true);

	}

	const classes = useStyles();

	return (
		<>
			<Grid container spacing={2} className={styles.container}>
				<div className={styles.secondContainer}>
					<Grid
						item
						xs={12}
						className={clsx(
							styles.headerContainer,
							index > 0 ? styles.marginTop : ""
						)}
					>
						<DialogTitle
							className={styles.Heading}
							style={index !== 0 ? { marginTop: "0px" } : {}}
							id="negotiate-dialog-title"
						>
							<p>
								<div className={styles.headingText}>
									{getHeading(item.negotiateItem)}
								</div>
								{activity.map((itm, index) => {
									return itm[item.negotiateItem] != null ? (


										<Timeline className={classes.timeline}>
											<TimelineItem className={classes.myClass}>
												<TimelineSeparator>
													<CheckCircleoutline
														color="primary"
														className={styles.timeLineIcon}
													/>
													{activity[0][item.negotiateItem] == undefined? (
														activity.filter((x) => x[item.negotiateItem]).length - index > 0 ? (
															<TimelineConnector />
														) : (
																""
															)
													) : (
															activity.filter((x) => x[item.negotiateItem]).length - index > 1 ? (
																<TimelineConnector />
															) : (
																	""
																)
														)
													}
												</TimelineSeparator>
												<TimelineContent
													className={classes.timelineContentContainer}
												>
													<Typography
														className={
															itm["sender"] === "original"
																? styles.timeLineItemsDisabled
																: styles.timeLineItems
														}
													>
														{itm["sender"] === "original"
															? "Original"
															: itm["sender"] === "Brand" ?
																activity[0][item.negotiateItem] == undefined && activity.findIndex((x) => x[item.negotiateItem] != undefined) == index ?

																	`${brandName} Accepted`
																	: `${brandName}   Proposed`

																: activity[0][item.negotiateItem] == undefined && activity.findIndex((x) => x[item.negotiateItem] != undefined) == index ?

																	`${influencerName} Accepted`
																	: `${influencerName} Proposed`
														}
														{item.negotiateItem != "revenueShare" ? "$ " : ""} {itm[item.negotiateItem]} {item.negotiateItem == "revenueShare" ? " %" : ""}
													</Typography>
												</TimelineContent>
											</TimelineItem>
										</Timeline>
									) : (
											""
										);
								})}
								{/* {item.negotiateItem !== "campaignDuration" &&
            item.negotiateItem !== "revenueShare"
              ? ": $" + item.negotiateValue
              : item.negotiateItem === "revenueShare"
              ? ":" + item.negotiateValue + "%"
              : ""} */}
							</p>
						</DialogTitle>
					</Grid>
					<div>
						<div className={styles.radioContainer}>
							{/* <Grid item xs={12} className={styles.marginbottomSelect}>
							{item.accept ? (
						<CheckCircleIcon
							onClick={() => {
								handleNegotiate(!item.accept, index, "accept");
							}}
							style={{ width: "31px", height: "31px", color: "#7b5cd9" }}
						/>
						) : (
						<RadioButtonUncheckedIcon
							className={styles.svgDisabled}
							onClick={() => {
								handleNegotiate(!item.accept, index, "accept");
							}}
							style={{ width: "31px", height: "31px" }}
						/>
						)}
						<p className={item.accept ? styles.active : styles.inActive}>Accept</p>

							{!item.accept ?(

							) : ("")}

						</Grid> */}
							<>
								{showApprovedActivity ? (
									<Grid
										item
										xs={12}
										sm={12}
										md={12}
										className={styles.marginbottomSelect}
									>
										<FormControl component="fieldset" for="agree" className={value === "agree" ? styles.radioActive : styles.radioInActive}>
											<RadioGroup aria-label="gender" id="agree" value={value} className={styles.radioButtonColor} name="gender1" onChange={(e) => {
												handleRadioButton(e, !item.accept, index, "accept")
											}}>
												<FormControlLabel value="agree" control={<Radio />} label="Agree" />
											</RadioGroup>
										</FormControl>
										<FormControl component="fieldset" for="counter" className={value === "counter" ? styles.radioActive : styles.radioInActive}>
											<RadioGroup aria-label="gender" id="counter" value={value} name="gender1" onChange={(e) => {
												handleRadioButton(e, !item.newPrice, index, "newPrice");
											}}>
												<FormControlLabel value="counter" control={<Radio />} label="Counter" />
											</RadioGroup>
										</FormControl>
									</Grid>
								) : (<p id="reopen" className={styles.reOpen} onClick={(e) => handleReOpen(e)}>{acceptedCard ? "Reopen" : "Cancel"}</p>)}
							</>
						</div>
						<div className={styles.valueContainer}>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
								className={styles.marginbottomSelect}
							>
								{value === "counter" && item.negotiateItem === "revenueShare" ? (
									<FormControl fullWidth variant="outlined">
										<TextField
											id="revenue Share"
											fullWidth
											label="Revenue Share"
											variant="outlined"
											className={mainStyles.placeholderColor}
											value={
												item.newPriceValue != ""
													? item.negotiateValue
													: item.negotiateValue
											}
											onChange={(e) => {
												handleNegotiate(e.target.value, index, "newPriceValueRevenue");
											}}
											menuprops={{ variant: "menu" }}
											select
											SelectProps={{ IconComponent: () => <Chevron /> }}
										>
											<MenuItem value="" disabled>
												Select New value
										</MenuItem>
											{options.map((option) => (
												<MenuItem key={option} value={option}>
													{option} %
												</MenuItem>
											))}
										</TextField>
									</FormControl>
								) : value === "counter" && item.negotiateItem === "campaignDuration" ? (
									<>

										<Grid item xs={6} sm={6} md={6}>
											<TextField
												id="outlined-basic"
												fullWidth
												disabled={item.chooseNew ? false : true}
												value={item.negotiateNewStartDate}
												onChange={(e) => {
													handleNegotiate(
														e.target.value,
														index,
														"Negotiate NewStartDate"
													);
												}}
												label="Start Date"
												className={styles.startDate}
												variant="outlined"
												onBlur={() => {
													console.log("Triggered because this input lost focus");
												}}
												// helperText={
												// 	startDateError ? (
												// 		<span className={styles.errorText}> Start Date IN FUTURE </span>
												// 	) : (
												// 			' '
												// 		)
												// }
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
													// value={item.negotiateNewStartDate}
													selected={item.negotiateNewStartDate}
													disablePast={true}
													initialFocusedDate={moment().add(1, "day")}
													onChange={(date) => {
														handleNegotiate(date, index, "Negotiate NewStartDate");
													}}
													allowKeyboardControl={true}
													orientation="landscape"
													openTo="date"
													format="MM/dd/yyyy"
													margin="normal"
													onBlur={() => {
														console.log("Triggered because this input lost focus");
													}}
													onClose={() => handleStartDateOpen(false)}
												/>
											</MuiPickersUtilsProvider>
										</Grid>

										<Grid item xs={6} sm={6} md={6}>
											<TextField
												id="outlined-basic"
												fullWidth
												disabled={item.chooseNew ? false : true}
												value={item.negotiateNewEndDate}
												onChange={(e) => {
													handleNegotiate(
														e.target.value,
														index,
														"Negotiate NewEndDate"
													);
												}}
												label="End Date"
												className={styles.endDate}
												variant="outlined"
												onBlur={() => {
													console.log(
														"Triggered because this input lost focus"
													);
												}}
												// helperText={
												// 	startDateError ? (
												// 		<span className={styles.errorText}> Start Date IN FUTURE </span>
												// 	) : (
												// 			' '
												// 		)
												// }
												InputProps={{
													endAdornment: (
														<InputAdornment
															className={styles.inputendornment}
															position="end"
														>
															<Calendar
																onClick={() => handleEndDateOpen(true)}
															/>
														</InputAdornment>
													),
												}}
											/>
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<DatePicker
													className={styles.displayNone}
													open={endDateOpen}
													// value={item.negotiateNewEndDate}
													disablePast={true}
													// initialFocusedDate={moment().add(1, 'day')}
													selected={item.negotiateNewEndDate}
													onChange={(date) => {
														handleNegotiate(
															date,
															index,
															"Negotiate NewEndDate"
														);
													}}
													onChange={handleNegotiate}
													allowKeyboardControl={true}
													orientation="landscape"
													openTo="date"
													format="MM/dd/yyyy"
													margin="normal"
													onBlur={() => {
														console.log(
															"Triggered because this input lost focus"
														);
													}}
													onClose={() => handleEndDateOpen(false)}
												/>
											</MuiPickersUtilsProvider>
										</Grid>
										{/* <Grid item xs={12} sm={12} md={6}>
											<TextField
												id="outlined-basic"
												fullWidth
												label="Start Time"
												disabled={item.chooseNew ? false : true}
												// defaulttime={startTime}
												className={mainStyles.placeholderColor}
												ampm="true"
												value={item.negotiateNewStartTime}
												onChange={(e) =>
													handleNegotiate(e.target.value, index, "Negotiate NewStartTime")
												}
												variant="outlined"
												// helperText={
												// 	startTimeError ? (
												// 		<span className={styles.errorText}> Start Time IN FUTURE </span>
												// 	) : (
												// 			" "
												// 		)
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
													selected={item.negotiateNewStartTime}
													ampm="true"
													onClose={() => handleStartTimeOpen(false)}
													onChange={(time) =>
														handleNegotiate(time, index, "Negotiate NewStartTime")
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
												disabled={item.chooseNew ? false : true}
												className={mainStyles.placeholderColor}
												value={item.negotiateNewEndTime}
												onChange={(e) =>
													handleNegotiate(e.target.value, index, "Negotiate NewEndTime")
												}
												variant="outlined"
												// helperText={
												// 	endTimeError ? (
												// 		<span className={styles.errorText}>
												// 			{" "}
												// End Time AFTER Start Time{" "}
												// 		</span>
												// 	) : (
												// 			" "
												// 		)
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
													selected={item.negotiateNewEndTime}
													onClose={() => handleEndTimeOpen(false)}
													onChange={(time) =>
														handleNegotiate(time, index, "Negotiate NewEndTime")
													}
													orientation="landscape"
													openTo="time"
												/>
											</MuiPickersUtilsProvider>
										</Grid> */}
									</>
								) : value === "counter" || acceptedCardHeading === "reopen" ? (
									<FormControl fullWidth variant="outlined">
										<TextField
											labelid="demo-simple-select-outlined-label"
											id="message"
											label="Enter New Value "
											fullWidth
											variant="outlined"
											className={mainStyles.placeholderColor}
											value={item.negotiateValue}
											onChange={(e) =>
												handleNegotiate(e.target.value, index, "newPriceValue")
											}
											MenuProps={{ variant: "menu" }}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">$</InputAdornment>
												),
											}}
										></TextField>
									</FormControl>
								) : ("")}
							</Grid>
						</div>
					</div>
				</div>
			</Grid >
		</>
	);
};

export default CreateNegotiateItem;
