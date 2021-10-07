import React, { useState, useContext, useEffect } from "react";
import {
	Avatar,
	Popover,
	Checkbox,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { Select, Grid } from "@material-ui/core";
import clsx from "clsx";
import TextField from "../../../components/TextField";
import {
	MoreVertical,
	Download,
	Copy,
	Mail,
	ChevronRight,
	XCircle,
	Circle,
	Plus,
} from "react-feather";

import Activity from "../Activity";
import CampaignDetail from "../CampaignDetail";
import TeamMembers from "../TeamMembers";
import BudgetAndConversion from "../BudgetAndConversion";
import Deliverables from "../Deliverables";
import Collections from "../Collections";
import Compensation from "../Compensation";
import Negotiables from "../Negotiables";
import SelectMenu from "../../../components/SelectMenu";
import _ from "lodash";
import SVG from "react-inlinesvg";
import styles from "./PendingBrandCampaignDetail.module.scss";
import CancelDialog from "../../../components/CancellationDialog";
import Translation from "../../../assets/translation.json";
import ReviewBrandMicrosite from "../ReviewBrandMicrosite";
import { API, graphqlOperation } from "aws-amplify";
import { RootContext } from "../../../context/RootContext";
import moment from "moment";
import NegotiateDialog from "../NegotiateDailogBrand";

const Chevron = () => {
	return (
		<span className={styles.dropDownCustomizeSvg}>
			<SVG src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`} />
		</span>
	);
};

const options = [];
for (let i = 3; i <= 20; i += 1) {
	options.push(i);
}

var activity = []
var activityMap = []

const PendingBrandCampaignDetail = ({
	data,
	handleSeeClick,
	name,
	campaignId,
	getCampaign,
	negotiables,
}) => {
	const reasons = [
		"Schedule conflict",
		"Both parties agree to terminate the campaign",
		"Other (please specify below)",
	];


	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);
	const [pendingOffer, setPendingOffer] = useState(false);
	const [openNegotiateDialog, setOpenNegotiateDialog] = useState(false);
	const [openDeclineDialog, setOpenDeclineDialog] = useState(false);
	const [allSet, setAllSet] = useState(true);
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	const [negotitaedItem, setNegotiatedItem] = useState("");
	const [percentage, setPercentage] = useState("");
	const [customeMessage, setCustomeMessage] = useState("");
	const [cancel, setCancel] = useState(false);
	const [cancelReason, setCancelReason] = useState("");
	const [reasonDetail, setReasonDetail] = useState("");
	const [flag, setFlag] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [brandRejectMessage, setBrandRejectMessage] = useState("");
	const { brandId } = useContext(RootContext);
	const [negotiate, setNegotiate] = useState([]);
	const [startDateOpen, setStartDateOpen] = useState(false);
	const [endDateOpen, setEndDateOpen] = useState(false);
	const [startTimeOpen, setStartTimeOpen] = useState(false);
	const [endTimeOpen, setEndTimeOpen] = useState(false);
	const [negotiater, setNegotiaer] = useState("");
	const [negotiateAnother, setNegotiateAnother] = useState([])
	const [availableNegotiableitems, setAvailableNegotiableitems] = useState(negotiables && negotiables != null && negotiables != "undefined" ?
		JSON.parse(JSON.stringify(negotiables)) : ""
	); //doing deep copy
	const [activityNegotiate, setActivityNegotiate] = useState([]);
	const [negotiationActivity, setNegotiationActivity] = useState();
	const [bannerNegotiation, setBannerNegotiation] = useState([])


	useEffect(() => {
		setNegotiationActivity(activity)
	}, [activity])

	useEffect(() => {
		if (bannerNegotiation.length === 0) {
			const temp = _.cloneDeep(activityNegotiate)
			setBannerNegotiation(temp)
		}
	}, [activityNegotiate])

	useEffect(() => {
		activity = []
		activityMap = []
		var obj1 = {}
		var compensationMap = { 'CompCashPerPost': 'postFee', 'CompRevenueShare': 'revenueShare', 'CompCashPerMonthlyDeliverable': 'monthlyRetainerFee' };
		activityMap = [{ negotiateItem: "postFee", negotiateMessage: "" }, { negotiateItem: "revenueShare", negotiateMessage: "" }, { negotiateItem: "monthlyRetainerFee", negotiateMessage: "" } , { negotiateItem: "campaignDuration", negotiateMessage: "" }]

		for (var compensation of Object.entries(compensationMap)) {
			var originalCompensation = data.compensation.find((x) => x.__typename == compensation[0]);
			if (originalCompensation && originalCompensation.amount)
				obj1[compensation[1]] = originalCompensation.amount.amount
			else if (originalCompensation && originalCompensation.percentage) {
				obj1[compensation[1]] = originalCompensation.percentage
			}

		}
		obj1['sender'] = 'original';
		activity.push(obj1);
		if (data.negotiations) {
			for (var i = data.negotiations.length - 1; i > -1; i--) {
				var obj2 = {}
				for (var nego of Object.entries(data.negotiations[i])) {
					var currentValue = nego[1];
					if (currentValue && currentValue.amount) {

						obj2[nego[0]] = currentValue.amount
					}
					else if (currentValue && currentValue.percentage) {
						obj2[nego[0]] = currentValue.percentage
					}
				}
				obj2['sender'] = i % 2 == 0 ? 'Influencer' : 'Brand';
				activity.push(obj2);
			}
		}
		activity.reverse();
		for (var compensation of Object.entries(compensationMap)) {
			var compItems = data.compensation.filter((x) => x.__typename == compensation[0]);
			var negoItems = activity.filter((x) => x[compensation[1]] != null)
			if (negoItems && compItems && negoItems.length > 0 && compItems.length != negoItems.length) {
				var obj = {};
				if (compItems.length == 0) {

					obj[compensation[1]] = "0"
					obj['sender'] = 'original';
					activity.push(obj);
				}
				activityMap[activityMap.findIndex((x) => x["negotiateItem"] == compensation[1])]["negotiateValue"] = negoItems[0][compensation[1]]
			}
		}
		setActivityNegotiate(activityMap);
	}, [])

	const numberWithCommas = (x) => {
		return x.toString().replaceAll(',', '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const getNegotiables = (item, combinedNego) => {
		var temp = combinedNego.filter((nego) => nego.negotiateItem === item);
		let USD = "USD";
		if (!temp || temp.length < 1) {
			return;
		}
		if (temp[0].negotiateValue && temp[0].negotiateValue != "") {
			if (temp[0].negotiateItem === "revenueShare") {
				return {
					percentage:
						temp[0].newPriceValue && temp[0].newPriceValue !== ""
							? temp[0].newPriceValue
							: temp[0].negotiateValue,
				};
			} else if (temp[0].negotiateItem === "campaignDuration") {
				return {
					endDate:
						Date.parse(
							`${temp[0].negotiateNewEndDate} 12:00 AM `
						) / 1000,
					startDate:
						Date.parse(
							`${temp[0].negotiateNewStartDate} 12:00 AM `
						) / 1000,
					// totalDuration : days
				};
			} else {
				return {
					amount:
						temp[0].newPriceValue && temp[0].newPriceValue !== ""
							? temp[0].newPriceValue
							: temp[0].negotiateValue,
					currency: USD,
				};
			}
		}
		else {
			return;
		}
	};
	const negotiateCampaign = async () => {
		var tmpCombinedNego = activityNegotiate.concat(negotiateAnother);
		var combinedNego = tmpCombinedNego.filter((x) => x.negotiateValue != undefined || x.negotiateNewStartDate != undefined);
		try {
			let data = {
				campaignId: campaignId,
				message: activityNegotiate[0].negotiateMessage,
				revenueShare: getNegotiables("revenueShare", combinedNego),
				postFee: getNegotiables("postFee", combinedNego),
				giftCard: getNegotiables("giftCard", combinedNego),
				monthlyRetainerFee: getNegotiables("monthlyRetainerFee", combinedNego),
				campaignDuration: getNegotiables("campaignDuration", combinedNego),
			};
			await API.graphql(
				graphqlOperation(
					`mutation negotiateCampaign($input: NegotiationInput! ) {
						brandNegotiate (
							brandId: "${brandId}" ,
							input: $input ){
								
								id
						}
					}`,
					{
						input: data,
					}
				)
			);
			setOpenNegotiateDialog(false);
			getCampaign();
			// history.push(`/campaignDetail/${campaignId}`);
			//   window.location.reload();
		} catch (e) {
			setOpenNegotiateDialog(false);
			console.log("error in negotiate Campaign", e);
			let message = "";

			if (e.errors && e.errors.length > 0)
				e.errors.forEach((m) => {
					message = message + m.message;
				});

			setErrorMessage(message);
		}
	};

	const handleNegotiate = (val, index, fieldName) => {
		const nego = [...activityMap];
		if (fieldName === "negotiateItem") {
			nego[index]["negotiateItem"] = val;
		}
		if (fieldName === "negotiateValue") {
			nego[index]["negotiateValue"] = val;
		}
		if (fieldName === "newPriceValueRevenue") {
			nego[index]["negotiateValue"] = val;
		}
		if (fieldName === "newPrice") {
			nego[index]["newPrice"] = val;
			nego[index]["accept"] = false;
		}
		if (fieldName === "Negotiate Message") {
			nego[index]["negotiateMessage"] = val;
		}
		if (fieldName === "accept") {
			nego[index]["accept"] = val;
			nego[index]["newPrice"] = false;
			nego[index]["chooseNew"] = false;
			nego[index]["negotiateValue"] = ""
			// else {
			// 	nego[index]["newPriceValue"] = ""
			// }
		}
		if (fieldName === "reOpenValue") {
			nego[index]["negotiateValue"] = ""
		}
		if (fieldName === "Negotiate Message") {
			nego[index]["negotiateMessage"] = val;
		}
		if (fieldName === "chooseNew") {
			nego[index]["chooseNew"] = val;
			nego[index]["accept"] = false;
		}
		if (fieldName === "newPriceValue") {
			var value = val.replace(/[^\d]/g, "");
			value = numberWithCommas(value)
			nego[index]["negotiateValue"] = value;
		}
		if (fieldName === "Negotiate StartDate") {
			const moment_date = moment(val).format("L");
			const startDate =
				val !== "" && moment(val, "MM/DD/YYYY", true).isValid()
					? moment_date
					: val;
			const endDate = moment(moment_date).add(1, "M").format("MM/DD/YYYY");
			nego[index]["negotiateStartDate"] = startDate;
			nego[index]["negotiateEndDate"] = endDate;
			setStartDateOpen(false);
		}

		if (fieldName === "Negotiate NewStartDate") {
			const moment_date = moment(val).format("L");
			const startDate =
				val !== "" && moment(val, "MM/DD/YYYY", true).isValid()
					? moment_date
					: val;
			const endDate = moment(moment_date).add(1, "M").format("MM/DD/YYYY");
			nego[index]["negotiateNewStartDate"] = startDate;
			nego[index]["negotiateNewEndDate"] = endDate;
			setStartDateOpen(false);
		}

		// if (fieldName === "Negotiate NewStartTime") {
		// 	const startTime = moment(val).format("hh:mm A");
		// 	nego[index]["negotiateNewStartTime"] = startTime;
		// 	setStartTimeOpen(false);
		// }
		// if (fieldName === "Negotiate NewEndTime") {
		// 	const endTime = moment(val).format("hh:mm A");
		// 	nego[index]["negotiateNewEndTime"] = endTime;
		// 	setEndTimeOpen(false);
		// }
		setActivityNegotiate(nego);

	};

	const handleNegotiateAnother = (val, index, fieldName) => {
		const nego = [...negotiateAnother];
		if (fieldName === "Negotiate Item") {
			nego[index]["negotiateItem"] = val;
		}
		if (fieldName === "Negotiate Value") {
			var value = val.replace(/[^\d]/g, "");
			value = numberWithCommas(value)
			nego[index]["negotiateValue"] = value;
		}
		if (fieldName === "Negotiate Revenue Value") {
			nego[index]["negotiateValue"] = val;
		}

		if (fieldName === "Negotiate StartDate") {
			const moment_date = moment(val).format("L");
			const startDate =
				val !== "" && moment(val, "MM/DD/YYYY", true).isValid()
					? moment_date
					: val;
			const endDate = moment(moment_date).add(1, "M").format("MM/DD/YYYY");
			nego[index]["negotiateNewStartDate"] = startDate;
			nego[index]["negotiateNewEndDate"] = endDate;
			setStartDateOpen(false);
		}

		// if (fieldName === "Negotiate NewStartDate") {
		// 	const moment_date = moment(val).format("L");
		// 	const startDate =
		// 		val !== "" && moment(val, "MM/DD/YYYY", true).isValid()
		// 			? moment_date
		// 			: val;
		// 	const endDate = moment(moment_date).add(1, "M").format("MM/DD/YYYY");
		// 	nego[index]["negotiateNewStartDate"] = startDate;
		// 	nego[index]["negotiateNewEndDate"] = endDate;
		// 	setStartDateOpen(false);
		// }

		// if (fieldName === "Negotiate NewStartTime") {
		// 	const startTime = moment(val).format("hh:mm A");
		// 	nego[index]["negotiateNewStartTime"] = startTime;
		// 	setStartTimeOpen(false);
		// }
		// if (fieldName === "Negotiate NewEndTime") {
		// 	const endTime = moment(val).format("hh:mm A");
		// 	nego[index]["negotiateNewEndTime"] = endTime;
		// 	setEndTimeOpen(false);
		// }
		setNegotiateAnother(nego);
		handleAvailableOptions();

	};

	const handleRemoveNegotiate = (index) => {
		const nego = [...negotiateAnother];
		nego.splice(index, 1);
		setNegotiateAnother(nego);
	};


	const handleAvailableOptions = () => {
		var allOptions = [
			"campaignDuration",
			"monthlyRetainerFee",
			"postFee",
			"postFrequency",
			"revenueShare",
			"giftCard",
			"other",
		];
		var selectedNegotiableItems = [];
		negotiateAnother.map((item) => {
			selectedNegotiableItems.push(item.negotiateItem);
		});
		negotiate.map((item) => {
			selectedNegotiableItems.push(item.negotiateItem);
		});
		var filtered = allOptions.filter((val) => {
			return !selectedNegotiableItems.includes(val);
		});
		setAvailableNegotiableitems(filtered);
	};

	// const handleAnotherItem = () => {
	// 	// const nego = [...negotiate];
	// 	// nego.push({
	// 	//   negotiateItem: "",
	// 	//   negotiateMessage: "",
	// 	//   negotiateValue: "",
	// 	// });
	// 	// setNegotiate(nego);
	// };

	const handleAnotherItem = () => {
		handleAvailableOptions();
		const nego = [...negotiateAnother];

		nego.push({
			negotiateItem: "",
			newPriceValue: "",
			negotiateMessage: "",
			negotiateNewStartDate: "",
			negotiateNewEndDate: "",
		});

		setNegotiateAnother(nego);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCancelReason = (val) => {
		setCancelReason(val);
	};
	const handleCancelDialogOpen = () => {
		setCancel(true);
		handleClose();
	};
	const handleReasonDetail = (val) => {
		setReasonDetail(val);
	};

	const startCampaign = async () => {
		try {
			await API.graphql(
				graphqlOperation(
					`mutation startCampaign {
			startCampaignDev (
			brandId: "${brandId}",
			campaignId: "${campaignId}"
			)
			}`
				)
			);
			getCampaign();
		} catch (err) {
			console.log("Error in signing contract ", err);
			let message = "";

			if (err.errors && err.errors.length > 0)
				err.errors.forEach((m) => {
					message = message + m.message;
				});

			setErrorMessage(message);
			return null;
		}
	};

	const handleAcceptInvite = () => {
		brandAcceptOffer();
	};

	const handleRejectOffer = () => {
		setOpenDeclineDialog(true);
		brandRejectOffer();
	};

	const getHeading = (value) => {
		switch (value) {
			case "postFee":
				return "Cash Per Post";
			case "revenueShare":
				return "Revenue Share";
			case "monthlyRetainerFee":
				return "Monthly Retainer Fee";
			case "giftCard":
				return "Gift Card";
			case "campaignDuration":
				return "Campaign Duration";
		}
	};

	const brandAcceptOffer = async () => {
		try {
			if (data !== null) {
				if (data.negotiations && data.negotiations.length !== 0) {
					const element = data.negotiations.find(
						(item) => item.organization.id === data.influencer.id
					);

					if (element) {
						await API.graphql(
							graphqlOperation(
								`mutation brandAcceptOffer {
						brandAcceptOffer(
						brandId: "${brandId}" ,
						offerId: "${element.id}",
						campaignId: "${campaignId}"){
							brand {
								id
							}
						}
						}`
							)
						);
						setCancel(false);
						getCampaign();
					}
				}
			}
		} catch (e) {
			console.log("Error in accepting invite", e);
		}
	};

	const brandRejectOffer = async () => {
		try {
			await API.graphql(
				graphqlOperation(
					`mutation brandReject {
     					brandRejectOffer(
						brandId: "${brandId}" ,
						campaignId: "${campaignId}",
						message: "${brandRejectMessage}")
						{
							message
						}
					}`
				)
			);
			//   window.location.reload();
			getCampaign();
		} catch (e) {
			console.log("Campaign Invite error ", e);
			let message = "";

			if (e.errors && e.errors.length > 0)
				e.errors.forEach((m) => {
					message = message + m.message;
				});

			setErrorMessage(message);
		}
	};
	useEffect(() => {
		if (data !== null) {
			let nego = [];
			if (data.negotiations && data.negotiations.length !== 0) {
				const element = data.negotiations.find(
					(item) => item.organization.id === data.influencer.id
				);
				if (element) {
					setNegotiaer(element.organization ? element.organization.name : "");
					Object.keys(element).map((item) => {
						if (
							item === "postFee" ||
							item === "revenueShare" ||
							item === "monthlyRetainerFee" ||
							item === "giftCard" ||
							item === "campaignDuration"
						) {
							if (element[item] != null) {
								if (item === "revenueShare") {
									nego.push({
										negotiateItem: item,
										negotiateValue: element[item].percentage,
										accept: false,
										newPrice: false,
										newPriceValue: "",
									});
								} else if (item === "campaignDuration") {
									nego.push({
										negotiateItem: item,
										negotiateStartDate: element[item].startDate,
										negotiateEndDate: element[item].endDate,
										accept: false,
										chooseNew: false,
										newPrice: false,
										negotiateNewStartDate: moment(
											element[item].startDate * 1000
										).format("MM/DD/YYYY"),
										negotiateNewEndDate: moment(
											element[item].endDate * 1000
										).format("MM/DD/YYYY"),
										negotiateNewStartTime: moment(
											element[item].startDate * 1000
										).format("hh:mm A"),
										negotiateNewEndTime: moment(
											element[item].startDate * 1000
										).format("hh:mm A"),
									});
								} else {
									nego.push({
										negotiateItem: item,
										negotiateValue: element[item].amount,
										accept: false,
										newPrice: false,
										newPriceValue: "",
									});
								}
							}
						}
					});
					setNegotiate(nego);
				}
			}
		}
	}, [data]);



	const getStatusContainerContent = () => {
		return (
			<>
				<CancelDialog
					open={cancel}
					handleClose={() => setCancel(false)}
					reason={cancelReason}
					reasons={reasons}
					handleReason={handleCancelReason}
					message={Translation.DIALOG.CAMPAIGN_CANCEL_DIALOG_MSG}
					buttonText="Cancel Campaign"
					handleReasonDetail={handleReasonDetail}
					reasonDetail={reasonDetail}
				/>
				<div
					className={clsx(
						styles.campaignPendingContainer,
						data.internalState === "MICROSITE_APPROVAL_REQUESTED" ||
							data.internalState === "NEGOTIATING"
							? styles.allSetCampaignPendingContainer
							: ""
					)}
				>
					{data.internalState === "MICROSITE_APPROVAL_REQUESTED" ? (
						<>
							<h1>
								<span>Microsite ready for approval</span>
							</h1>
							<p>
								The influencer has sent you the microsite to review and approve.
              </p>
							<button onClick={() => setFlag(true)}>View</button>
						</>
					) : data.internalState === "NEGOTIATING" &&
						data.events[0].description === "Influencer has counter offered." ? (
								<>
									<h1>{negotiater} sent a counter offer</h1>
									{data && data !== null && data !== undefined && data.negotiations !== null && data.negotiations !== undefined && data.negotiations && data.negotiations[0].message != null && data.negotiations[0].message != "" ?
										<span className={styles.negotiationsMessage}>{<q>{data.negotiations[0].message}</q>}</span> : ""}									<>
										{" "}
										{activityNegotiate && activityNegotiate.length > 0 ?
											(
												bannerNegotiation.map((item) => {
													return item.negotiateValue != undefined && activity.find((x) => x[item.negotiateItem]).sender != "original" ? (

														activity[0][item.negotiateItem] != undefined ? (
															<p className={styles.proposingMessage}>
																{negotiater} is proposing a{" "}
																{getHeading(item.negotiateItem)}

																{item.negotiateItem !== "campaignDuration"
																	? " of "
																	: " from " +
																	moment(item.negotiateStartDate * 1000).format(
																		"MM/DD/YYYY"
																	) +
																	" to " +
																	moment(item.negotiateEndDate * 1000).format(
																		"MM/DD/YYYY"
																	)}
																{item.negotiateItem !== "revenueShare" &&
																	item.negotiateItem !== "campaignDuration"
																	? "$"
																	: ""}{" "}
																{item.negotiateItem !== "campaignDuration"
																	? item.negotiateValue
																	: ""}
																{item.negotiateItem === "revenueShare" ? "%" : ""}
															</p>
														) : (
																<p className={styles.proposingMessage}>
																	{negotiater} has accepted a{" "}
																	{getHeading(item.negotiateItem)}
																</p>
															)
													) : ("")
												})
											)
											: ""}
									</>
									<div className={styles.offerButtons}>
										<button
											className={styles.acceptButton}
											onClick={() => handleAcceptInvite()}
										>
											Accept
                </button>
										<button
											className={styles.negotiateButton}
											onClick={() => setOpenNegotiateDialog(true)}
										>
											Negotiate
                </button>
										<button
											className={styles.declineButton}
											onClick={() => setOpenDeclineDialog(true)}
										>
											Decline
                </button>
									</div>
								</>
							) : (
								<>
									<h1>You're all set</h1>
									<p>
										No action items as of right now. We will let you know when there
										is something you need to do.
              </p>
								</>
							)}

					{allSet ? (
						""
					) : (
							<>
								<h1>
									{pendingOffer ? (
										"Sam sent a counter offer"
									) : (
											<>
												<span>Microsite ready for approval</span>
											</>
										)}
								</h1>
								{pendingOffer ? (
									<>
										<p>
											<i>Sam is proposing a Revenue share of 3% instead of 2%</i>
										</p>
										<p>
											<i>Sam is proposing $40 cash per post instead of $30</i>
										</p>
									</>
								) : (
										<p>
											The influencer has sent you the microsite to review and
											approve.
										</p>
									)}
								{pendingOffer ? (
									<div className={styles.offerButtons}>
										<button
											className={styles.acceptButton}
											onClick={() => handleAcceptInvite()}
										>
											Accept
                  </button>
										<button
											className={styles.negotiateButton}
											onClick={() => setOpenNegotiateDialog(true)}
										>
											Negotiate
                  </button>
										<button
											className={styles.declineButton}
											onClick={() => setOpenDeclineDialog(true)}
										>
											Decline
                  </button>
									</div>
								) : (
										<button
											onClick={() => {
												history.push("/review-brand-microsite");
											}}
											style={{ border: "none" }}
										>
											View
										</button>
									)}
							</>
						)}
				</div>
			</>
		);
	};
	return (
		<>
			{flag ? (
				<ReviewBrandMicrosite name={name} data={data} campaignId={data.id} />
			) : (
					<>
						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
						>
							<div className={styles.popOver}>
								<div>
									<Mail /> <p>Message Influencer</p>
								</div>
								<div>
									<Copy /> <p>Duplicate Campaign</p>
								</div>
								<div style={{ display: "none" }}>
									<Download /> <p>Download Campaign</p>
								</div>
								<div onClick={() => handleCancelDialogOpen()}>
									<XCircle /> <p>Cancel Campaign</p>
								</div>
							</div>
						</Popover>
						<div className={styles.mainContainer}>
							<div className={styles.CampaignHeading}>
								<span onClick={() => history.push("/campaigns")}>Campaigns</span>
								<ChevronRight />
								<span>{name}</span>
							</div>
							<div className={styles.campaignBasicInfo}>
								<div className={styles.campaignStatus}>
									<div>
										<h4 className={styles.promotion}>
											Promotion:{" "}
											{data &&
												data !== null &&
												data.discount &&
												data.discount !== null &&
												data.discount.percentage
												? ""
												: data.discount &&
													data.discount !== null &&
													data.discount.amount
													? "$"
													: ""}
											{data &&
												data !== null &&
												data.discount &&
												data.discount !== null &&
												data.discount.amount
												? data.discount.amount.amount
												: data &&
													data.discount &&
													data.discount !== null &&
													data.discount.percentage
													? data.discount.percentage
													: ""}{" "}
											{data &&
												data !== null &&
												data.discount &&
												data.discount !== null &&
												data.discount.percentage
												? "%"
												: data.discount &&
													data.discount !== null &&
													data.discount.amount
													? ""
													: ""}
										</h4>
									</div>
									<div>
										<Chip
											className={
												data.status === "INVITED"
													? styles.invitedCampaign
													: styles.pendingCampaign
											}
											size="small"
											label={data.status.toProperCase()}
										/>
									</div>
									{data.influencer && (
										<div className={styles.influencerSocial}>
											<Avatar src={data.influencer.imageUrl} />
											<span>{data.influencer.name}</span>
										</div>
									)}
									{/* <Checkbox
								checked={pendingOffer}
								onChange={(e) => setPendingOffer(e.target.checked)}
								/>
								<span>Show offer from influencer view</span> */}
								</div>
								<div>
									<MoreVertical onClick={handleClick} />
								</div>
							</div>
							<div className={styles.contentContainer}>
								<div className={styles.flexContainer}>
									{getStatusContainerContent()}

									<Activity activities={data?.events} onClick={handleSeeClick} />
								</div>
								<div className={styles.flexContainer}>
									<CampaignDetail campaign={data}>
										<>
											<h6>Custom Message to Influencer</h6>
											<p>
												Hi sam, we are so excited for the chance to work with you.
												We love your content and hope that you see value in
												working with us.
                    </p>
										</>
									</CampaignDetail>
									<TeamMembers
										onClick={handleSeeClick}
										status={data.status}
										brandTeam={
											data && data.brandTeam !== null ? data.brandTeam : []
										}
									/>
									<BudgetAndConversion data={data} status={data.status} />
								</div>
								<div className={styles.flexContainer}>
									<Collections
										status={data.status}
										products={data.products}
										id={data.id}
									/>
									<Deliverables
										deliverables={data.deliverables}
										status={data.status}
										onClick={handleSeeClick}
										campaign={data}
									/>
								</div>
								<div className={styles.flexContainer}>
									<Compensation
										status={data.status}
										onClick={handleSeeClick}
										compensation={
											data && data.compensation && data.compensation !== null
												? _.compact(data.compensation)
												: []
										}
										targetGrossSales={data.targetGrossSales}
										paymentSchedule={data.paymentSchedule}
										deliverables={
											data && data.deliverables && data.deliverables !== null
												? data.deliverables
												: []
										}
										startDate={data && data.startDate}
										endDate={data && data.endDate}
									/>
									<Negotiables data={data} status={data.status} />
									<div style={{ width: "391px" }}></div>
								</div>
								{data.internalState === "MICROSITE_APPROVED" ? (
									<div
										className={styles.startCampaign}
										onClick={() => startCampaign()}
									>
										{" "}
                  Start Campaign
									</div>
								) : (
										""
									)}
								{errorMessage !== "" && (
									<div style={{ padding: "10px", color: "red" }}>
										{errorMessage}
									</div>
								)}
							</div>
							<NegotiateDialog
								data={data}
								open={openNegotiateDialog}
								handleOpen={() => setOpenNegotiateDialog(true)}
								negotiables={negotiate}
								handleClose={() => setOpenNegotiateDialog(false)}
								negotiate={activityNegotiate}
								activity={activity}
								negotiateAnother={negotiateAnother}
								handleNegotiate={handleNegotiate}
								handleNegotiateAnother={handleNegotiateAnother}
								handleAnotherItem={handleAnotherItem}
								negotiateCampaign={negotiateCampaign}
								startDateOpen={startDateOpen}
								endDateOpen={endDateOpen}
								handleStartDateOpen={(value) => setStartDateOpen(value)}
								handleEndDateOpen={(value) => setEndDateOpen(value)}
								startTimeOpen={startTimeOpen}
								endTimeOpen={endTimeOpen}
								handleStartTimeOpen={(value) => setStartTimeOpen(value)}
								handleEndTimeOpen={(value) => setEndTimeOpen(value)}
								brandAcceptOffer={brandAcceptOffer}
								handleRemoveNegotiate={handleRemoveNegotiate}
								handleOpenNegotiateDialog={() => setOpenNegotiateDialog(true)}
								availableNegotiableitems={availableNegotiableitems}

							/>

							<Dialog
								disableBackdropClick
								disableEscapeKeyDown
								aria-labelledby="Decline Dialog"
								open={openDeclineDialog}
								classes={{ paper: styles.declineDialog }}
							>
								<DialogTitle
									className={styles.dialogTitle}
									id="decline-dialog-title"
								>
									<p className={styles.titleText}>
										Send the influencer a message with your decline
              </p>
								</DialogTitle>
								<DialogContent className={styles.dialogContent}>
									<Grid item xs={12} sm={12} md={12}>
										<TextField
											id="outlined-basic"
											fullWidth
											multiline
											value={brandRejectMessage}
											onChange={(e) => setBrandRejectMessage(e.target.value)}
											rows={12}
											label={"Enter custom message"}
											variant="outlined"
											className={styles.textFieldWidth}
										/>
									</Grid>
								</DialogContent>
								<DialogActions className={styles.dialogActions}>
									<button onClick={() => setOpenDeclineDialog(false)}>
										Cancel
              </button>
									<button
										className={clsx(styles.sendButton, styles.active)}
										onClick={() => brandRejectOffer()}
									>
										Send to Influencer
              </button>
								</DialogActions>
							</Dialog>
						</div>
					</>
				)
			}
		</>
	);
};

export default PendingBrandCampaignDetail;
