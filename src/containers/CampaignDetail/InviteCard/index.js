import React, { useState, useContext, useEffect } from "react";
import styles from "./InviteCard.module.scss";
import DeclineDialog from "../../../components/CancellationDialog";
import Translation from "../../../assets/translation.json";
import { API, graphqlOperation } from "aws-amplify";
import { RootContext } from "../../../context/RootContext";
import NegotiateDialog from "../NegotiateDialog";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import moment from "moment";

var activity = []
var activityMap = []

const InviteCard = ({
	createdBy,
	campaignId,
	invitationMessage,
	handleReviewAndSign,
	negotiables,
	data,
	getCampaign,
}) => {
	const history = useHistory();
	const [negotiateAnother, setNegotiateAnother] = useState(
		data.internalState != "NEGOTIATING" ? ([
			{
				negotiateItem: "",
				negotiateMessage: "",
				negotiateValue: "",
				negotiateStartDate: "",
				negotiateEndDate: "",
				negotiateStartTime: "",
				negotiateEndTime: "",
				negotiateFrequency: "",
			},
		]) :
			[]);
	const [decline, setDecline] = useState(false);
	const [declineReason, setDeclineReason] = useState("");
	const [reasonDetail, setReasonDetail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [negotiateDialog, setNegotiateDialog] = useState(false);
	const [nego, setNego] = useState([]);
	const [negotiater, setNegotiater] = useState("");
	const [negotiate, setNegotiate] = useState([
		{
			negotiateItem: "",
			negotiateMessage: "",
			negotiateValue: "",
			negotiateStartDate: "",
			negotiateEndDate: "",
			negotiateStartTime: "",
			negotiateEndTime: "",
			negotiateFrequency: "",
		},
	]);
	const [startDateOpen, setStartDateOpen] = useState(false);
	const [endDateOpen, setEndDateOpen] = useState(false);
	const [startTimeOpen, setStartTimeOpen] = useState(false);
	const [endTimeOpen, setEndTimeOpen] = useState(false);
	const [messageDialog, setMessageDialog] = useState("");
	const { brandId } = useContext(RootContext);
	const [activityNegotiate, setActivityNegotiate] = useState([]);

	const [negotiationActivity, setNegotiationActivity] = useState();
	const [bannerNegotiation, setBannerNegotiation] = useState([])
	const [availableNegotiableitems, setAvailableNegotiableitems] = useState(
		JSON.parse(JSON.stringify(negotiables))
	); //doing deep copy


	useEffect(() => {
		negotiables.push("other");
		const temp = _.cloneDeep(activityNegotiate)
		setBannerNegotiation(temp)
	}, []);

	useEffect(()=> {
		if (bannerNegotiation.length === 0) {
			const temp = _.cloneDeep(activityNegotiate)
			setBannerNegotiation(temp)
		}

	}, [activityNegotiate])

	useEffect(() => {
		setNegotiationActivity(activity)
	}, [activity])


	useEffect(() => {
		activity = []
		activityMap = []
		var obj1 = {}
		var compensationMap = { 'CompCashPerPost': 'postFee', 'CompRevenueShare': 'revenueShare', 'CompCashPerMonthlyDeliverable': 'monthlyRetainerFee' };
		activityMap = [{ negotiateItem: "postFee", negotiateMessage: "" }, { negotiateItem: "revenueShare", negotiateMessage: "" }, { negotiateItem: "monthlyRetainerFee", negotiateMessage: "" }]
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
	useEffect(() => {
		if (
			data &&
			data !== null &&
			data.negotiations &&
			data.negotiations !== null &&
			data.negotiations.length !== 0
		) {
			const element = data.negotiations.find(
				(item) => item.organization.id === data.brand.id
			);

			if (element) {
				setNegotiater(
					element && element.organization ? element.organization.name : ""
				);
				let neggo = [];
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
								neggo.push({
									negotiateItem: item,
									negotiateValue: element[item].percentage,
									accept: false,
									newPrice: false,
									newPriceValue: "",
								});
							} else if (item === "campaignDuration") {
								neggo.push({
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
								});
							} else {
								neggo.push({
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
				setNego(neggo);
				setNegotiate(neggo);
			}
		}
	}, []);

	const reasons = [
		"Schedule conflict",
		"Campaign compensation",
		"Conflict of interest",
		"Other",
	];

	const getNegotiables = (item, combinedNego) => {
		var temp = combinedNego.filter((nego) => nego.negotiateItem === item);
		let USD = "USD";
		if (!temp || temp.length < 1) {
			return;
		}
		if (temp[0].negotiateValue && temp[0].negotiateValue != "") {
			if (temp[0].negotiateItem === "revenueShare") {
				return { percentage: temp[0].negotiateValue };
			} else if (temp[0].negotiateItem === "campaignDuration") {
				// let duration = moment.duration(temp[0].negotiateEndDate.diff(temp[0].negotiateStartDate));
				// let days = duration.asDays();
				// console.log(days)
				return {
					endDate:
						Date.parse(
							`${temp[0].negotiateEndDate} ${temp[0].negotiateEndTime} `
						) / 1000,
					startDate:
						Date.parse(
							`${temp[0].negotiateStartDate} ${temp[0].negotiateStartTime} `
						) / 1000,
					// totalDuration : days
				};
			} else if (temp[0].negotiateItem === "postFrequency") {
				return {
					deliverableId: data.deliverables[0].id,
					frequency: temp[0].negotiateFrequency,
				};
			} else {
				return { amount: temp[0].negotiateValue, currency: USD };
			}
		}
		else {
			return;
		}
	};
	useEffect(() => {
		handleAvailableOptions();
	}, [activityNegotiate]);
	const handleRemoveNegotiate = (index) => {
		const nego = [...negotiateAnother];
		nego.splice(index, 1);
		setNegotiateAnother(nego)
		// setNegotiate(nego);
	};

	const handleNegotiation = () => {
		setNegotiateDialog(true);
	};

	const handleNegotiateCampaign = (value) => {
		acceptCampaignInvite(value);
		negotiateCampaign();
	};

	const handleNegotiate = (val, index, fieldName) => {
		const nego = [...activityMap];
		if (fieldName === "Negotiate Item") {

			nego[index]["negotiateItem"] = val;
			nego[index]["negotiateValue"] = '';
		}
		if (fieldName === "newPriceValueRevenue") {
			nego[index]["negotiateValue"] = val;
		}
		if (fieldName === "newPrice") {
			nego[index]["newPrice"] = val;
			nego[index]["accept"] = false;
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
		if (fieldName === "newPriceValue") {
			var value = val.replace(/[^\d]/g, "");
			value = numberWithCommas(value);
			nego[index]["negotiateValue"] = value;
		}

		if (fieldName === "Negotiate Message") {
			nego[index]["negotiateMessage"] = val;
		}
		if (fieldName === "Negotiate Frequency") {
			nego[index]["negotiateFrequency"] = val;
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
			nego[index]["negotiateValue"] = val;
			setStartDateOpen(false);
		}
		if (fieldName === "Negotiate EndDate") {
			const moment_date = moment(val).format("L");
			const endDate =
				val !== "" && moment(val, "MM/DD/YYYY", true).isValid()
					? moment_date
					: val;
			nego[index]["negotiateEndDate"] = endDate;
			setEndDateOpen(false);
		}
		// if (fieldName === "Negotiate StartTime") {
		// 	const startTime = moment(val).format("hh:mm A");
		// 	nego[index]["negotiateStartTime"] = startTime;
		// 	setStartTimeOpen(false);
		// }
		// if (fieldName === "Negotiate EndTime") {
		// 	const endTime = moment(val).format("hh:mm A");
		// 	nego[index]["negotiateEndTime"] = endTime;
		// 	setEndTimeOpen(false);
		// }
		setActivityNegotiate(nego);

		handleAvailableOptions();
	};



	/***********{function} to handle remain availabe options************/
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

	const handleErrorMessage = (val) => {
		setErrorMessage(val);
	};

	const handleDeclineReason = (val) => {
		setDeclineReason(val);
	};
	const handleReasonDetail = (val) => {
		setReasonDetail(val);
	};
	const handleAcceptInvite = () => {
		acceptCampaignInvite();
		handleReviewAndSign();
	};

	const handleAnotherItem = () => {
		handleAvailableOptions();
		const nego = [...negotiateAnother];

		nego.push({
			negotiateItem: "",
			negotiateMessage: "",
			negotiateValue: "",
			negotiateStartDate: "",
			negotiateEndDate: "",
			negotiateFrequency: "",
		});

		setNegotiateAnother(nego);
	}
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
			nego[index]["negotiateStartDate"] = startDate;
			nego[index]["negotiateEndDate"] = endDate;
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

		setNegotiateAnother(nego);
		handleAvailableOptions();

	};
	const acceptCampaignInvite = async (negotiate) => {
		try {
			await API.graphql(
				graphqlOperation(
					`mutation AcceptInvite {
						acceptCampaignInvite(input: {
						brandId: "${createdBy.id}" ,
						influencerId: "${brandId}",
						id: "${campaignId}"})
						{
						id
						}
					}`
				)
			);
			if (!negotiate) {
				acceptCampaignTerms();
			}
		} catch (e) {
			console.log("Error in accepting invite", e);
		}
	};

	const acceptCampaignTerms = async () => {
		try {
			await API.graphql(
				graphqlOperation(
					`mutation AcceptCampaignTerms {
						influencerAcceptCampaignTerms(input: {
						campaignId: "${campaignId}",
						influencerId: "${brandId}"
						})
					}`
				)
			);
			// getCampaign();
		} catch (e) {
			console.log("Error in accepting campaign terms ", e);
		}
	};

	const declineCampaignInvite = async () => {
		try {
			await API.graphql(
				graphqlOperation(
					`mutation declineInvite {
						declineCampaign (
						id: "${campaignId}",
						influencerId: "${brandId}",
						reason: "${declineReason}",
						message: "${reasonDetail}"
						)
					}`
				)
			);
			setDecline(false);
			history.push(`/campaigns`);
		} catch (err) {
			console.log("Error In declining campaign invite", err);
			let message = "";

			if (err.errors && err.errors.length > 0)
				err.errors.forEach((m) => {
					message = message + m.message;
				});

			setErrorMessage(message);
			return null;
		}
	};

	const negotiateCampaign = async () => {
		var tmpCombinedNego = activityNegotiate.concat(negotiateAnother);
		var combinedNego = tmpCombinedNego.filter((x) => x.negotiateValue != undefined);
		try {
			let data = {
				campaignId: campaignId,
				message: activityNegotiate[0].negotiateMessage,
				revenueShare: getNegotiables("revenueShare", combinedNego),
				postFee: getNegotiables("postFee", combinedNego),
				giftCard: getNegotiables("giftCard", combinedNego),
				monthlyRetainerFee: getNegotiables("monthlyRetainerFee", combinedNego),
				campaignDuration: getNegotiables("campaignDuration", combinedNego),
				postFrequency: getNegotiables("postFrequency", combinedNego),
			};
			if (errorMessage === "value cannot be null") {
				throw "value cannot be null";
			}
			await API.graphql(
				graphqlOperation(
					`mutation influencerNegotiate($input: NegotiationInput! ) {
						influencerNegotiate (
						influencerId: "${brandId}" ,
						input: $input ){

						id
						}
					}`,
					{
						input: data,
					}
				)
			);
			setMessageDialog(false);
			setNegotiateDialog(false);
			getCampaign();
			// window.location.reload();
		} catch (e) {
			setNegotiateDialog(false);
			console.log("error in negotiate Campaign", e);
			let message = "";

			if (e.errors && e.errors.length > 0) {
				e.errors.forEach((m) => {
					message = message + m.message;
				});
				setErrorMessage(message);
			} else {
				setErrorMessage(e);
			}
		}
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




	return (
		<>
			<DeclineDialog
				open={decline}
				handleClose={() => setDecline(false)}
				reason={declineReason}
				reasons={reasons}
				handleReason={handleDeclineReason}
				message={Translation.DIALOG.CAMPAIGN_DECLINE_DIALOG_MSG}
				buttonText="Decline"
				handleReasonDetail={handleReasonDetail}
				reasonDetail={reasonDetail}
				handleDeclineCampaignInvite={declineCampaignInvite}
				errorMessage={errorMessage}
			/>
			<NegotiateDialog
				negotiateAnother={negotiateAnother}
				data={data}
				open={negotiateDialog}
				openDialog={() => setNegotiateDialog(true)}
				negotiables={negotiables}
				handleClose={() => setNegotiateDialog(false)}
				negotiate={activityNegotiate}
				activity={activity}
				handleNegotiate={handleNegotiate}
				handleNegotiateAnother={handleNegotiateAnother}
				handleAnotherItem={handleAnotherItem}
				negotiateCampaign={handleNegotiateCampaign}
				startDateOpen={startDateOpen}
				endDateOpen={endDateOpen}
				handleStartDateOpen={(value) => setStartDateOpen(value)}
				handleEndDateOpen={(value) => setEndDateOpen(value)}
				startTimeOpen={startTimeOpen}
				endTimeOpen={endTimeOpen}
				handleStartTimeOpen={(value) => setStartTimeOpen(value)}
				handleEndTimeOpen={(value) => setEndTimeOpen(value)}
				errorMessage={errorMessage}
				setErrorMessage={(value) => handleErrorMessage(value)}
				messageDialog={messageDialog}
				openMessageDialog={() => {
					setMessageDialog(true);
				}}
				handleCloseMessageDialog={() => setMessageDialog(false)}
				handleRemoveNegotiate={handleRemoveNegotiate}
				availableNegotiableitems={availableNegotiableitems}
				acceptCampaignInvite={acceptCampaignInvite}
			/>
			<div className={styles.declineContainer}>
				<h1>
					{nego && nego.length > 0
						? `${negotiater} has sent a counter offer`
						: `${createdBy.name} has invited you to a campaign`}
				</h1>
				{data && data !== null && data !== undefined && data.negotiations !== null && data.negotiations !== undefined && data.negotiations && data.negotiations[0].message != null && data.negotiations[0].message != "" ?
					<span className={styles.negotiationsMessage}>{<q>{data.negotiations[0].message}</q>}</span> : ""}
				{activityNegotiate && activityNegotiate.length > 0 ?
					(
						bannerNegotiation.map((item) => {
							return item.negotiateValue != undefined && activity.find((x) => x[item.negotiateItem]).sender != "original" ? (

								activity[0][item.negotiateItem] != undefined ? (
									<p className={styles.firstp}>
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
					: ""
				}
				{data.status === "INVITED" ? (<p className={styles.firstp}>{invitationMessage}</p>) : ("")}
				{/* {nego && nego.length > 0 ? (
					nego.map((item) => {
						return (
							<p className={styles.firstp}>
								{negotiater} is proposing a {getHeading(item.negotiateItem)}
								{item.negotiateItem !== "campaignDuration"
									? " of "
									: " from " +
									moment(item.negotiateStartDate * 1000).format(
										"MM/DD/YYYY"
									) +
									" to " +
									moment(item.negotiateEndDate * 1000).format("MM/DD/YYYY")}
								{item.negotiateItem !== "revenueShare" &&
									item.negotiateItem !== "campaignDuration"
									? "$"
									: ""}{" "}
								{item.negotiateItem !== "campaignDuration"
									? item.negotiateValue
									: ""}
								{item.negotiateItem === "revenueShare" ? "%" : ""}
							</p>
						);
					})
				) : (
						<p className={styles.firstp}>{invitationMessage}</p>
				)} */}



				<p className={styles.secondp}></p>
				<div className={styles.buttonContainer}>
					<button
						className={styles.accept}
						onClick={() => handleAcceptInvite()}
					>
						Accept
          </button>
					<button className={styles.nego} onClick={() => handleNegotiation()}>
						Negotiate
          </button>
					<button className={styles.decline} onClick={() => setDecline(true)}>
						Decline
          </button>
				</div>
			</div>{" "}
		</>
	);
};

export default InviteCard;
