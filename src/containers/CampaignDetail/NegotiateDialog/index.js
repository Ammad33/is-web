import React, { useState, useEffect } from "react";
import styles from "./NegotiateDialog.module.scss";
import TextField from "../../../components/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import SVG from "react-inlinesvg";
import { Plus } from "react-feather";
import CreateNegotiateItem from "./CreateNegotiateItem";
import {
	Grid,
	Avatar,
	Popover,
	Checkbox,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@material-ui/core";
import moment from "moment";
import CreateNegotiateItemInfluencer from "../NegotiateDailogBrand/CreateNegotiateItem"

const Chevron = () => {
	return (
		<span className={styles.dropDownCustomizeSvg}>
			<SVG src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`} />
		</span>
	);
};



/*Svg*/
const ChevronSVG = () => {
	return <SVG src={`${process.env.PUBLIC_URL}/images/chevron-left.svg`} />;
};
const options = [];
for (let i = 1; i <= 20; i += 0.5) {
	options.push(i);
}

const NegotiateDialog = ({
	data,
	open,
	openDialog,
	negotiables,
	handleClose,
	negotiate,
	activity,
	handleNegotiate,
	handleAnotherItem,
	negotiateCampaign,
	startDateOpen,
	endDateOpen,
	negotiateAnother,
	handleNegotiateAnother,
	handleStartDateOpen,
	handleEndDateOpen,
	startTimeOpen,
	endTimeOpen,
	handleStartTimeOpen,
	handleEndTimeOpen,
	errorMessage,
	setErrorMessage,
	messageDialog,
	openMessageDialog,
	handleCloseMessageDialog,
	handleRemoveNegotiate,
	availableNegotiableitems,
	setAvailableNegotiableitems,
	acceptCampaignInvite,
}) => {
	const [confirmationDialog, setConfirmationDialog] = useState(false);


	const handleNext = (e) => {
		handleClose();
		validate(e);
		openMessageDialog();
	};
	const handleBack = () => {
		handleCloseMessageDialog();
		openDialog();
	};

	const handleEditConfirmationDialog = () => {
		setConfirmationDialog(false);
		handleCloseMessageDialog();
		openDialog();
	};

	const handleAcceptCampaignInvite = () => {
		acceptCampaignInvite();
		setConfirmationDialog(false);
	};



	const handleNegotiateCampaign = () => {
		try {
			const d = data;
			var confirmationFlag = true;
			var checkEvent = false;
			const map = new Map();
			let totalLength = 0;
			var compensationToNegoMap = {
				CampaignDuration: "campaignDuration",
				CompRevenueShare: "revenueShare",
				CompCashPerMonthlyDeliverable: "monthlyRetainerFee",
				CompCashPerPost: "postFee",
			};
			data.events.map((item) => {
				if (item.description === "Brand counter offered.") checkEvent = true;
			});
			if (!checkEvent) {
				d.compensation.map((item) => {
					if (item.__typename === "CompRevenueShare") {
						map[compensationToNegoMap[item.__typename]] = item.percentage;
					} else {
						map[compensationToNegoMap[item.__typename]] = item.amount.amount;
					}
				});
				if (negotiateAnother.length != Object.keys(map).length)
					confirmationFlag = false;
				negotiateAnother.map((item) => {
					if (item.negotiateItem)
						if (item.negotiateValue + "" !== map[item.negotiateItem]) {
							confirmationFlag = false;
						}
				});
			} else {
				Object.entries(d.negotiations[0]).filter((key, value) => {
					if (
						typeof key[1] == "object" &&
						key[0] != "organization" &&
						key[1] &&
						Object.keys(key[1]).length > 0
					)
						totalLength++;
				});
				if (negotiateAnother.length != totalLength) {
					confirmationFlag = false;
				}
				negotiateAnother.map((item) => {
					if (item.negotiateItem === "revenueShare") {
						if (
							!d.negotiations[1][item.negotiateItem] ||
							d.negotiations[1][item.negotiateItem].percentage !==
							item.negotiateValue + ""
						) {
							confirmationFlag = false;
						}
					} else {
						if (
							!d.negotiations[1][item.negotiateItem] ||
							d.negotiations[1][item.negotiateItem].amount !==
							item.negotiateValue
						) {
							confirmationFlag = false;
						}
					}
				});
			}
			if (confirmationFlag) {
				handleCloseMessageDialog();
				setConfirmationDialog(true);
			} else {
				negotiateCampaign("negotiate");
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	const validate = (e) => {
		// negotiate.map((item)=> {
		// if (item.negotiateItem === "postFrequency" && item.negotiateFrequency == ""){
		// 	setErrorMessage("value cannot be null");
		// }
		// if ((item.negotiateItem === "campaignDuration") && (item.negotiateStartDate == "" || item.negotiateEndDate == "" || item.negotiateStartTime == "" || item.negotiateEndTime == "" )){
		// 	setErrorMessage("value cannot be null");
		// }
		// else if ((item.negotiateItem !== "" && item.negotiateValue == "" && item.negotiateItem !== "campaignDuration" && item.negotiateItem !== "postFrequency") || (item.negotiateItem === "")){
		// 		setErrorMessage("value cannot be null");
		// 		e.stopPropagation();
		// 	}
		// 	else {
		// 		setErrorMessage("");
		// 	}
		// })
	};

	/*****************************Date functions***********************************/

	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	/**{function} to get weeks betweeen two dates */
	function weeksBetween(d1, d2) {

		const date1 = moment(d1);
		const date2 = moment(d2);
		return Math.ceil(date2.diff(date1, 'days') / 7);
	}

	/**{function} to get months betweeen two dates */
	function monthBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2);
		return Math.ceil(date2.diff(date1, 'days') / 30);
	}

	/**{function} to get biMonths between two dates */
	function biMonthBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2);
		return Math.ceil(date2.diff(date1, 'days') / 60);
	}

	/**{function} to get biWeeks between two dates */
	function biWeekBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2);
		return Math.ceil(date2.diff(date1, 'days') / 14);
	}
	/*****************************************************************************/

	/**{function} to get compensation total */

	const getTotal = () => {
		let total = 0;
		data.compensation.forEach(item => {
			if (item.__typename === 'CompRevenueShare') {
				total = total + parseFloat((item.percentage) * parseFloat(data.targetGrossSales.amount / 100));
			} else if (item.__typename === 'CompCashPerPost') {
				let totalPost = 0;
				data.deliverables.forEach(item => {
					if (item.frequency === 'WEEK') {
						totalPost = totalPost + (parseInt(item.posts) * weeksBetween(new Date(data.startDate * 1000), new Date(data.endDate * 1000)));
					} else if (item.frequency === 'BI_WEEKLY') {
						totalPost = totalPost + (parseInt(item.posts) * biWeekBetween(new Date(data.startDate * 1000), new Date(data.endDate * 1000)));
					} else if (item.frequency === 'MONTH') {
						totalPost = totalPost + (parseInt(item.posts) * monthBetween(new Date(data.startDate * 1000), new Date(data.endDate * 1000)));
					} else if (item.frequency === 'BI_MONTHLY') {
						totalPost = totalPost + (parseInt(item.posts) * biMonthBetween(new Date(data.startDate * 1000), new Date(data.endDate * 1000)));
					}
				});
				total = total + (parseFloat(item.amount.amount) * totalPost);
			} else {
				total = total + parseFloat(item.amount.amount);
			}
		})
		return parseFloat(total).toFixed(2);
	}

	return (
		<>
			<Dialog
				classes={{ paper: styles.negotiate }}
				aria-labelledby="confirmation-dialog-title"
				open={open}
				onClose={handleClose}
			>
				<DialogTitle className={styles.dialogTitle} id="decline-dialog-title">
					<div className={styles.headingContainer}>
						<p className={styles.headingTitleText}> Negotiate</p>
						<p className={styles.headingEstimate}> Total Comp Estimate: ${numberWithCommas(Math.trunc(((getTotal()))))}</p>
					</div>

				</DialogTitle>
				{data.internalState == "NEGOTIATING" &&
					negotiate.map((item, index) => (
						item.negotiateValue  != undefined && activity.find((x) => x[item.negotiateItem]).sender != "original" &&
						<CreateNegotiateItemInfluencer
							item={item}
							key={index}
							negotiate={negotiate}
							activity={activity}
							showApprovedActivity={activity[0][item.negotiateItem] != undefined}
							brandName={data && data.brand.name}
							influencerName={data && data.influencer.name}
							index={index}
							negotiables={negotiables}
							handleNegotiate={handleNegotiate}
							startDateOpen={startDateOpen}
							endDateOpen={endDateOpen}
							handleStartDateOpen={handleStartDateOpen}
							handleEndDateOpen={handleEndDateOpen}
							startTimeOpen={startTimeOpen}
							endTimeOpen={endTimeOpen}
							handleStartTimeOpen={handleStartTimeOpen}
							handleEndTimeOpen={handleEndTimeOpen}
							fromInfluencer={true}
						/>
					))
				}
				{negotiateAnother.map((item, index) => (
					<CreateNegotiateItem
						data = {data}
						item={item}
						startDate={item.negotiateStartDate}
						endDate={item.negotiateEndDate}
						index={index}
						negotiate={negotiateAnother}
						index={index}
						orgNegotiation = {true}
						negotiables={negotiables}
						handleNegotiate={handleNegotiateAnother}
						startDateOpen={startDateOpen}
						endDateOpen={endDateOpen}
						startTimeOpen={startTimeOpen}
						endTimeOpen={endTimeOpen}
						handleStartDateOpen={handleStartDateOpen}
						handleEndDateOpen={handleEndDateOpen}
						handleStartTimeOpen={handleStartTimeOpen}
						handleEndTimeOpen={handleEndTimeOpen}
						handleRemoveNegotiate={handleRemoveNegotiate}
						availableNegotiableitems={availableNegotiableitems}
						setAvailableNegotiableitems={setAvailableNegotiableitems}
					/>
				))}
				<div className={styles.addMore} onClick={handleAnotherItem}>
					<Plus />
					<p>Negotiate another item</p>
				</div>
				<div className={styles.footer}>
					<span onClick={handleClose}>Cancel</span>
					<button
						// className={
						// 	negotiate[0].negotiateValue != "" &&
						// 		negotiate[0].negotiateItem != ""
						// 		? ""
						// 		: styles.disabledButton
						// }
						// disabled={
						// 	negotiate[0].negotiateValue != "" &&
						// 		negotiate[0].negotiateItem != ""
						// 		? false
						// 		: true
						// }
						onClick={(e) => {
							handleNext(e);
						}}
					>
						Next
          </button>
				</div>
			</Dialog>

			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				aria-labelledby="Decline Dialog"
				open={messageDialog}
				classes={{ paper: styles.negotiateMessage }}
			>
				<DialogTitle className={styles.dialogTitle} id="decline-dialog-title">
					<span className={styles.negotiateMessageHeading} onClick={handleBack}>
						<ChevronSVG />
						<p className={styles.titleText}> Negotiate</p>
					</span>
				</DialogTitle>
				<DialogContent className={styles.dialogContent}>
					<Grid item xs={12} sm={12} md={12}>
						<FormControl fullWidth variant="outlined">
							<TextField
								labelid="demo-simple-select-outlined-label"
								id="message"
								label="Custom Message"
								fullWidth
								rows={10}
								multiline={true}
								variant="outlined"
								className={styles.messageField}
								value={negotiate && negotiate.length > 0 && negotiate[0].negotiateMessage}
								onChange={(e) =>
									handleNegotiate(e.target.value, 0, "Negotiate Message")
								}
								MenuProps={{ variant: "menu" }}
							></TextField>
						</FormControl>
					</Grid>
				</DialogContent>
				<DialogActions className={styles.dialogActions}>
					<div className={styles.footer}>
						<span onClick={() => handleCloseMessageDialog()}>Cancel</span>
						<button onClick={() => handleNegotiateCampaign()}>
							Send to Brand
            </button>
					</div>
				</DialogActions>
				<div>
					{errorMessage !== "" && (
						<div style={{ color: "red" }}>{errorMessage}</div>
					)}
				</div>
			</Dialog>

			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				aria-labelledby="Confirmation Dialog"
				open={confirmationDialog}
				classes={{ paper: styles.negotiateMessage }}
			>
				<DialogTitle className={styles.dialogTitle} id="decline-dialog-title">
					<p className={styles.titleText}> Negotiate</p>
				</DialogTitle>
				<p className={styles.confirmationMessage}>
					{" "}
          Based on these selections it looks like you are agreeing to the
          current offer, would you like to accept
        </p>
				<DialogActions className={styles.dialogActions}>
					<div className={styles.confirmationDialogFooter}>
						<span onClick={() => handleEditConfirmationDialog()}>Edit</span>
						<button onClick={() => handleAcceptCampaignInvite()}>Accept</button>
					</div>
				</DialogActions>
				<div>
					{errorMessage !== "" && (
						<div style={{ color: "red" }}>{errorMessage}</div>
					)}
				</div>
			</Dialog>
		</>
	);
};

export default NegotiateDialog;
