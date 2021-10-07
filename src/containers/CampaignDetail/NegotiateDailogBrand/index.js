import React, { useEffect, useState } from "react";
import {
	Grid,
	Dialog,
	Select,
	DialogTitle,
	Avatar,
	Popover,
	Checkbox,
	DialogContent,
	DialogActions,
} from "@material-ui/core";
import styles from "./NegotiateDialog.module.scss";
import TextField from "../../../components/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import SVG from "react-inlinesvg";
import { Plus } from "react-feather";
import CreateNegotiateItem from "./CreateNegotiateItem";
import NegotiateAnotherItem from "../NegotiateDialog/CreateNegotiateItem"
import moment from 'moment';

const options = [];
for (let i = 1; i <= 20; i += 0.5) {
	options.push(i);
}



const NegotiateDialog = ({
	data,
	open,
	negotiables,
	handleOpen,
	handleClose,
	negotiate,
	activity,
	negotiateAnother,
	handleNegotiateAnother,
	handleNegotiate,
	handleAnotherItem,
	negotiateCampaign,
	startDateOpen,
	endDateOpen,
	handleStartDateOpen,
	handleEndDateOpen,
	startTimeOpen,
	endTimeOpen,
	handleStartTimeOpen,
	handleEndTimeOpen,
	brandAcceptOffer,
	handleOpenNegotiateDialog,
	availableNegotiableitems,
	handleRemoveNegotiate
}) => {

	useEffect(() => {
		negotiate.map((item) => {
			if (item.chooseNew || item.newPrice) {
				setActiveNext(true);
			} else {
				setActiveNext(false);
			}
		});
	}, [negotiate]);

	const ChevronSVG = () => {
		return <SVG src={`${process.env.PUBLIC_URL}/images/chevron-left.svg`} />;
	};
	const [messageDialog, setMessageDialog] = useState(false);
	const [confirmationDialog, setConfirmationDialog] = useState(false);
	// const [confirmationFlag, setConfirmationFlag] = useState(null);
	const handleCloseMessageDialog = () => {
		setMessageDialog(false);
	};
	const [activeNext, setActiveNext] = useState(false);
	// const handleNegotiateCampaign = () => {
	// 	setMessageDialog(false)
	// 	negotiateCampaign();
	// };
	const handleBack = () => { };
	const handleMessageBack = () => {
		setMessageDialog(false);
		handleOpenNegotiateDialog();
	};
	const handleNext = () => {
		setMessageDialog(true);
		handleClose();
	};

	const handleEditConfirmationDialog = () => {
		setConfirmationDialog(false);
		handleOpen();
	};

	const handleCloseDialog = () => {
		handleClose();
		setMessageDialog(false);
	};

	const handleAcceptCampaignInvite = () => {
		brandAcceptOffer();
		setConfirmationDialog(false);
		setMessageDialog(false);
	};
	const handleNegotiateCampaign = () => {
		const d = data;
		let confirmationFlag = true;
		let totalLength = 0;
		Object.entries(d.negotiations[0]).filter((key, value) => {
			if (
				typeof key[1] == "object" &&
				key[0] != "organization" &&
				key[1] &&
				Object.keys(key[1]).length > 0
			)
				totalLength++;
		});
		if (negotiate.length != totalLength) {
			confirmationFlag = false;
		}

		// negotiate.map((item) => {
		// 	if (item.negotiateItem === "revenueShare") {
		// 		if (
		// 			d.negotiations[0][item.negotiateItem].percentage !==
		// 			item.newPriceValue + ""
		// 		) {
		// 			confirmationFlag = false;
		// 		}
		// 	}
		// 	else if (item.negotiateItem === "campaignDuration") {
		// 		if (d.negotiations[0][item.negotiateItem].startDate !== item.negotiateNewStartDate || d.negotiations[0][item.negotiateItem].endDate !== item.negotiateNewEndDate) {
		// 			confirmationFlag = false;
		// 		}
		// 	}
		// 	else {
		// 		if (
		// 			d.negotiations[0][item.negotiateItem].amount !== item.negotiateValue
		// 		) {
		// 			confirmationFlag = false;
		// 		}
		// 	}
		// });

		if (confirmationFlag) {
			setConfirmationDialog(true);
		} else {
			negotiateCampaign();
			setMessageDialog(false);
		}

		console.log(confirmationDialog);

		// if (negotiate.length != Object.keys(map).length)
		// 	setConfirmationDialog(false);
		// negotiate.map((item) => {
		// 	if (item.negotiateValue + "" !== map[item.negotiateItem]) {
		// 		setConfirmationDialog(false);
		// 	}
		// })
		// if (confirmationDialog)
		// 	handleCloseMessageDialog();
		// else {
		// 	negotiateCampaign("negotiate");
		// }
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
				<DialogTitle className={styles.Heading} id="negotiate-dialog-title">
					<div className={styles.headingContainer}>
						<p className={styles.headingTitleText}> Negotiate</p>
						<div className={styles.headingWidth}>
							<p className={styles.headingEstimate}> Total Comp Estimate: ${numberWithCommas(Math.trunc(((getTotal()))))}</p>
							<p className={styles.headingBudget}> Remaining Budget: ${data.budget.amount - numberWithCommas(Math.trunc(((getTotal()))))}</p>
						</div>
					</div>
				</DialogTitle>
				{negotiate.map((item, index) => (
					item.negotiateValue != undefined && activity.find((x) => x[item.negotiateItem]).sender != "original" &&
					<CreateNegotiateItem
						item={item}
						key={index}
						negotiate={negotiate}
						activity = {activity}
						brandName = {data && data.brand.name}
						influencerName = {data && data.influencer.name}
						showApprovedActivity = {activity[0][item.negotiateItem] != undefined}
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
					/>
				))}
				{negotiateAnother.map((item, index) => (
					<NegotiateAnotherItem
						item={item}
						startDate={item.negotiateNewStartDate}
						endDate={item.negotiateNewEndDate}
						index={index}
						negotiate={negotiateAnother}
						index={index}
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
					/>
				))}
				<div className={styles.addMore}>
					<div onClick={handleAnotherItem}>
						<Plus />
						<p>Negotiate another item</p>
					</div>
				</div>
				<div className={styles.footer}>
					<span onClick={() => handleCloseDialog()}>Cancel</span>
					<button
						// className={activeNext ? "" : styles.disabledNext}
						// disabled={activeNext ? false : true}
						onClick={() => {
							handleNext();
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
					<span
						className={styles.negotiateMessageHeading}
						onClick={handleMessageBack}
					>
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
								label="Enter Custom Message"
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
							Send to Influencer
            </button>
					</div>
				</DialogActions>
				<div>
					{/* {errorMessage !== "" && (
						<div style={{ color: "red" }}>{errorMessage}</div>
					)} */}
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
					{/* {errorMessage !== '' && <div style={{ color: 'red' }}>{errorMessage}</div>} */}
				</div>
			</Dialog>
		</>
	);
};

export default NegotiateDialog;
