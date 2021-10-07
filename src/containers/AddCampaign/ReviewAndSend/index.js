import React, { useState, useEffect, useContext } from "react";
import styles from "./ReviewAndSend.module.scss";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import SVG from "react-inlinesvg";
import moment from "moment";
import { RootContext } from "../../../context/RootContext";

/**SVG */
const EditSVG = ({ onClick }) => {
	return <SVG src={`${process.env.PUBLIC_URL}/images/edit.svg`} onClick={onClick} />;
};

const ReviewAndSend = ({
	products,
	team,
	campaignName,
	startDate,
	endDate,
	startTime,
	endTime,
	discount,
	discountType,
	minimum,
	customeMessage,
	selectedMembers,
	budget,
	targetGrossSale,
	collections,
	deliverables,
	compensations,
	compensationPayment,
	selectedNegotiable,
	selectedInfluncer,
	handleActiveStep,
	handleActiveNext,
}) => {
	/**variables */
	const [totalPosts, setTotalPosts] = useState(0);
	const [teamMembers, setTeamMembers] = useState([]);
	const { currentUser } = useContext(RootContext);
	var paymentScheduleMap = {
		FIRST_OF_MONTH: "1st of every month",
		FIFTEENTH_OF_MONTH: "15th of every month",
		LAST_DAY_OF_MONTH: "Last day of every month",
	};
	var compensationTypeMap = {
		REVENUE_SHARE: "Revenue Share",
		CASH_PER_POST: "Cash Per Post",
		CASH_PER_MONTHLY_DELIVERABLE: "Cash Per Monthly Deliverable",
		GIFT_CARD: "Gift Card",
	};
	var compensationHeadingMap = {
		REVENUE_SHARE: "Revenue Share Percentage",
		CASH_PER_POST: "Amount per Post",
		CASH_PER_MONTHLY_DELIVERABLE: "Amount Per Monthly Deliverable",
		GIFT_CARD: "Amount Per Gift Card",
	};
	var postFrequencyMap = {
		BI_MONTHLY: " 2 months",
		WEEK: " 1 week",
		MONTH: " 1 month",
		BI_WEEKLY: " 2 weeks",
	};
	/**activates the send invite button */
	useEffect(() => {
		handleActiveNext();
	}, []);

	/**{function} get the heading for payment schedule */
	const getPaymentSchedule = (compensation) => {
		return paymentScheduleMap[compensation];
	};
	/**{function} to get over budget */
	const overAmount1 = () => {
		let over = 0;
		compensations.forEach((item) => {
			if (item.compensationType === "REVENUE_SHARE") {
				over =
					parseFloat((item.amount * parseFloat(targetGrossSale)) / 100) -
					parseFloat(budget);
			}
		});
		return parseFloat(over);
	};

	/**{function} to get months between 2 dates  */
	function monthBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2).add(1, 'd');
		return Math.ceil(date2.diff(date1, 'days') / 30);
	}

	/**{function} to calculate days between dates */
	function biMonthBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2).add(1, 'd');
		return Math.ceil(date2.diff(date1, 'days') / 60);
	}

	/**{function} to calculate days between dates */
	function biWeekBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2).add(1, 'd');
		return Math.ceil(date2.diff(date1, 'days') / 14);
	}

	/**{hook} filter members */
	useEffect(() => {
		//set scroll to top
		document.getElementsByClassName(
			"AddCampaign_dialogContent__3teJx"
		)[0].scrollTop = 0;
		const filterdMembers = selectedMembers.filter(
			(memb) => memb !== currentUser.username
		);
		setTeamMembers(filterdMembers);
	}, [selectedMembers]);

	/**{hook} calculate the total posts**/
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		let totalPost = 0;
		deliverables.forEach((item) => {
			if (item.frequency === "WEEK") {
				totalPost =
					totalPost +
					parseInt(item.posts) *
					weeksBetween(new Date(startDate), new Date(endDate));
			} else if (item.frequency === "BI_WEEKLY") {
				totalPost =
					totalPost +
					parseInt(item.posts) *
					biWeekBetween(new Date(startDate), new Date(endDate));
			} else if (item.frequency === "MONTH") {
				totalPost =
					totalPost +
					parseInt(item.posts) *
					monthBetween(new Date(startDate), new Date(endDate));
			} else if (item.frequency === "BI_MONTHLY") {
				totalPost =
					totalPost +
					parseInt(item.posts) *
					biMonthBetween(new Date(startDate), new Date(endDate));
			}
		});

		setTotalPosts(totalPost);
	}, []);

	/**{function} capitalizes the first character of each word. */
	String.prototype.toProperCase = function () {
		return this.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	/**{function} add commas in numbers */
	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	/**{function} to get compensation type */
	const getCompensationType = (compensation) => {
		return compensationTypeMap[compensation];
	};

	/**{function} to get compensation heading */
	const getCompensationHeading = (compensation) => {
		return compensationHeadingMap[compensation];
	};

	/**{function} to get compensation amount */
	const getCompensationAmount = (compensation) => {
		switch (compensation.compensationType) {
			case "REVENUE_SHARE":
				return (
					<span>
						{compensation.amount &&
							numberWithCommas(parseFloat(compensation.amount))}
            % (${" "}
						{numberWithCommas(
							Math.trunc((compensation.amount * targetGrossSale) / 100)
						)}
            )
					</span>
				);
			case "CASH_PER_POST":
				return (
					<span>
						${" "}
						{compensation.amount &&
							numberWithCommas(Math.trunc(parseFloat(compensation.amount)))}
					</span>
				);
			case "CASH_PER_MONTHLY_DELIVERABLE":
				return (
					<span>
						${" "}
						{compensation.amount &&
							numberWithCommas(Math.trunc(parseFloat(compensation.amount)))}
					</span>
				);
			case "GIFT_CARD":
				return (
					<span>
						${" "}
						{compensation.amount &&
							numberWithCommas(Math.trunc(parseFloat(compensation.amount)))}
					</span>
				);
			default:
				return <span></span>;
		}
	};

	/**{function} to get compensation type value */
	const getCompensationTypeValue = (compensation) => {
		switch (compensation.compensationType) {
			case "REVENUE_SHARE":
				return (
					<h5>
						$
						{numberWithCommas(
							Math.trunc(
								parseFloat(
									compensation.amount &&
									(
										(compensation.amount * parseFloat(targetGrossSale)) /
										100
									).toFixed(2)
								)
							)
						)}
					</h5>
				);
			case "CASH_PER_POST":
				return (
					<h5>
						$
						{compensation.amount &&
							numberWithCommas(
								Math.trunc(parseFloat(compensation.amount) * totalPosts)
							)}
					</h5>
				);
			case "CASH_PER_MONTHLY_DELIVERABLE":
				return (
					<h5>
						$
						{compensation.amount &&
							numberWithCommas(Math.trunc(parseFloat(compensation.amount)))}
					</h5>
				);
			case "GIFT_CARD":
				return (
					<h5>
						$
						{compensation.amount &&
							numberWithCommas(Math.trunc(parseFloat(compensation.amount)))}
					</h5>
				);
			default:
				return <h5></h5>;
		}
	};

	/**{function} to get post frequency value */
	const getPostFrequency = (frequency) => {
		return postFrequencyMap[frequency];
	};
	/**{function} to get Total Compensation Estimate */
	const getTotal = () => {
		let total = 0;
		compensations.forEach((item) => {
			if (item.compensationType === "REVENUE_SHARE") {
				total =
					total + parseFloat((item.amount * parseFloat(targetGrossSale)) / 100);
			} else if (item.compensationType === "CASH_PER_POST") {
				let totalPost = 0;
				deliverables.forEach((item) => {
					if (item.frequency === "WEEK") {
						totalPost =
							totalPost +
							parseInt(item.posts) *
							weeksBetween(new Date(startDate), new Date(endDate));
					} else if (item.frequency === "BI_WEEKLY") {
						totalPost =
							totalPost +
							parseInt(item.posts) *
							biWeekBetween(new Date(startDate), new Date(endDate));
					} else if (item.frequency === "MONTH") {
						totalPost =
							totalPost +
							parseInt(item.posts) *
							monthBetween(new Date(startDate), new Date(endDate));
					} else if (item.frequency === "BI_MONTHLY") {
						totalPost =
							totalPost +
							parseInt(item.posts) *
							biMonthBetween(new Date(startDate), new Date(endDate));
					}
				});
				total = total + parseFloat(item.amount) * totalPost;
			} else {
				total = total + parseFloat(item.amount);
			}
		});
		return parseFloat(total).toFixed(2);
	};

	/**{function} to get ammount of over budget  */
	const overAmount = () => {
		let over = getTotal() - parseFloat(budget);

		return parseFloat(over);
	};

	const [collectionData, setCollectionData] = useState([]);

	/**{function} to get weeks between 2 dates */
	function weeksBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2).add(1, 'd');
		return Math.ceil(date2.diff(date1, 'days') / 7);
	}
	/**{hook} used to set collection data  */
	useEffect(() => {
		window.scrollTo(0, 0);

		let collls = [];
		if (products && products.length > 0) {
			products.forEach((item) => {
				let index = collections.findIndex(
					(collItem) => collItem.id === item.collectionId
				);
				if (index !== -1) {
					collls.push({
						name: collections[index].name,
						products:
							collections[index].products &&
							collections[index].products.products.filter((itm) => {
								let secIndex = item.products.findIndex(
									(sec) => sec.productId === itm.id
								);
								if (secIndex !== -1) {
									return itm;
								}
							}),
					});
				}
			});
		}

		setCollectionData(collls);
	}, [products, collections]);

	return (
		<div className={styles.mainContainer}>
			<div className={styles.influe}>
				<div className={styles.influencerContainer}>
					<Avatar className={styles.avatar} src={selectedInfluncer.imageUrl} />{" "}
					<p>{selectedInfluncer.name}</p>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.titleAndAction}>
					<h3>Campaign Details</h3>
					<span>
						<EditSVG onClick={() => handleActiveStep(1)} />
					</span>
				</div>
				<div className={styles.campaigndDetails}>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<div className={styles.campaignItemInfo}>
								<p>Campaign Name</p>
								<span>{campaignName}</span>
							</div>
						</Grid>
						<Grid item xs={4}>
							<div className={styles.campaignItemInfo}>
								<p>Start Date, Time</p>
								<span>
									{moment(startDate).format("MM/DD/YYYY")}, {startTime}
								</span>
							</div>
						</Grid>
						<Grid item xs={4}>
							<div className={styles.campaignItemInfo}>
								<p>End Date, Time</p>
								<span>
									{moment(endDate).format("MM/DD/YYYY")}, {endTime}
								</span>
							</div>
						</Grid>
						<Grid item xs={4}>
							<div className={styles.campaignItemInfo}>
								<p>Promotional Discount</p>
								<span>
									{discountType === "Percentage" ? "" : "$"}
									{numberWithCommas(discount)}
									{discountType === "Percentage" ? "%" : ""}
								</span>
							</div>
						</Grid>
						{discountType === "Amount" ? (
							<Grid item xs={4}>
								<div className={styles.campaignItemInfo}>
									<p>Minimum Cart Value</p>
									<span>
										{"$"}
										{numberWithCommas(minimum)}
									</span>
								</div>
							</Grid>
						) : (
								""
							)}
						<Grid item xs={4}>
							<div className={styles.campaignItemInfo}>
								<p>Campaign Duration</p>
								<span>
									{weeksBetween(new Date(startDate), new Date(endDate))} week
                  {weeksBetween(new Date(startDate), new Date(endDate)) === 1
										? ""
										: "s"}
								</span>
							</div>
						</Grid>
						<Grid item xs={12}>
							<div className={styles.campaignItemInfo}>
								<p>Custom Message to Influencer</p>
								<span>{customeMessage}</span>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.titleAndAction}>
					<h3>Team Members</h3>
					<EditSVG onClick={() => handleActiveStep(2)} />
				</div>
				<div className={styles.teamMembersContainer}>
					<Grid container spacing={3}>
						{teamMembers && teamMembers.length > 0 ? (
							teamMembers.map((member, index) => {
								const element = team.findIndex(
									(item) => item.user.id === member
								);
								if (element !== -1) {
									return (
										<Grid item xs={4} key={index}>
											<div className={styles.teamMemberItem}>
												<Avatar src={team[element].user.imageUrl} />
												<span>{team[element].user.fullName}</span>
											</div>
										</Grid>
									);
								}
							})
						) : (
								<div className={styles.noTeamMember}>
									{" "}
                No team members have been added to this campaign.
								</div>
							)}
					</Grid>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.titleAndAction}>
					<h3>Budget & Conversion</h3>
					<EditSVG onClick={() => handleActiveStep(3)} />
				</div>
				<div className={styles.budgetAndConversionContainer}>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<div className={styles.budgetContainerItem}>
								<p>Budget</p>
								<span>${numberWithCommas(Math.trunc(budget))}</span>
							</div>
						</Grid>
						<Grid item xs={4}>
							<div className={styles.budgetContainerItem}>
								<p>Target Gross Sale Goal</p>
								<span>${numberWithCommas(Math.trunc(targetGrossSale))}</span>
							</div>
						</Grid>
					</Grid>
				</div>
				{overAmount() > 0 && (
					<div className={styles.compensationBadge}>
						<p>
							You are ${numberWithCommas(Math.trunc(overAmount()))} over budget
            </p>
					</div>
				)}
			</div>
			<div className={styles.section}>
				<div className={styles.titleAndAction}>
					<h3>Collection</h3>
					<EditSVG onClick={() => handleActiveStep(4)} />
				</div>
				<div className={styles.collectionContainer}>
					{collectionData.map((item, index) => {
						return (
							<div className={styles.collectionSection} key={index}>
								<p className={styles.sectionTitle}>{item.name}</p>
								<div className={styles.collectionItems}>
									{item.products.length > 0 &&
										item.products.map((collection, index) => {
											return (
												<div className={styles.collectionItem} key={index}>
													<div className={styles.itemPlaceholderBox}>
														<img
															className={styles.itemPlaceholderBox}
															src={
																collection.images &&
																collection.images.images.length > 0 &&
																collection.images.images[0].src
															}
														/>
													</div>
													<p className={styles.boxItem}>{collection.name}</p>
													<p className={styles.boxPrice}>
														$
                            {collection.priceRange && collection.priceRange.max
															? collection.priceRange.max.amount
															: ""}{" "}
													</p>
													{collection &&
														collection.estimatedQty &&
														collection.estimatedQty !== null && (
															<p className={styles.boxPrice}> 25 in stock</p>
														)}
												</div>
											);
										})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.titleAndAction}>
					<h3>Deliverables</h3>
					<EditSVG onClick={() => handleActiveStep(5)} />
				</div>
				{deliverables.map((item, index) => {
					return (
						<div className={styles.deliverablesContainer} key={index}>
							<h4 style={index > 0 ? { marginTop: "40px" } : {}}>
								Deliverable {index + 1}
							</h4>
							<Grid container spacing={3} key={index}>
								<Grid item xs={4} className={styles.displayNone}>
									<div className={styles.deliverableItem}>
										<p>Deliverable Deadline</p>
										<span>
											{moment(item.deadlineDate).format("MMMM Do, YYYY")}
										</span>
									</div>
								</Grid>
								<Grid item xs={4}>
									<div className={styles.deliverableItem}>
										<p>Social Platform</p>
										<span>{item.platform}</span>
									</div>
								</Grid>
								<Grid item xs={4}>
									<div className={styles.deliverableItem}>
										<p>Post Type</p>
										<span>
											{item.postType && item.postType !== null
												? item.postType.toProperCase()
												: ""}
										</span>
									</div>
								</Grid>
								<Grid item xs={4}>
									<div className={styles.deliverableItem}>
										<p>Content Type</p>
										<span>
											{item.frameContentType && item.frameContentType !== null
												? item.frameContentType.toProperCase()
												: ""}
										</span>
									</div>
								</Grid>
								<Grid item xs={4}>
									<div className={styles.deliverableItem}>
										<p>Frames Required</p>
										<span>
											{item.framesRequired && item.framesRequired !== null
												? item.framesRequired
												: ""}
										</span>
									</div>
								</Grid>
								{item.brandTag && (
									<Grid item xs={4}>
										<div className={styles.deliverableItem}>
											<p>Brand tag</p>
											<span>@{item.brandTag}</span>
										</div>
									</Grid>
								)}
								{item.hashTag && (
									<Grid item xs={4}>
										<div className={styles.deliverableItem}>
											<p>Hashtag</p>
											<span>#{item.hashTag}</span>
										</div>
									</Grid>
								)}
								<Grid item xs={4}>
									<div className={styles.deliverableItem}>
										<p>Post Frequency</p>
										<span>
											{item.posts} posts every{" "}
											{getPostFrequency(item.frequency)}
										</span>
									</div>
								</Grid>
							</Grid>
						</div>
					);
				})}
				<div className={styles.postTotalContainer}>
					<h4>Post Total:</h4>
					<h5>{numberWithCommas(totalPosts)} Posts</h5>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.titleAndAction}>
					<h3>Compensation</h3>
					<EditSVG onClick={() => handleActiveStep(6)} />
				</div>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<div className={styles.compensationInfluencer}>
							<p>Influencer Payment Schedule</p>
							<span>{getPaymentSchedule(compensationPayment)}</span>
						</div>
					</Grid>
				</Grid>
				{compensations.map((item, index) => {
					return (
						<div className={styles.compensationContainer} key={index}>
							<div className={styles.compensationHeading}>
								<h4>Compensation Type {index + 1}</h4>
								<h5>{getCompensationTypeValue(item)}</h5>
							</div>
							<Grid container spacing={3}>
								<Grid item xs={4}>
									<div className={styles.compensationItem}>
										<p>Compensation Type</p>
										<span>{getCompensationType(item.compensationType)}</span>
									</div>
								</Grid>
								<Grid item xs={6}>
									<div className={styles.compensationItem}>
										<p>{getCompensationHeading(item.compensationType)}</p>
										{getCompensationAmount(item)}
									</div>
								</Grid>
							</Grid>
						</div>
					);
				})}
				<div className={styles.compensationHeading}>
					<h4>Total Compensation Estimate*:</h4>
					<h5>${numberWithCommas(Math.trunc(getTotal()))}</h5>
				</div>
				{overAmount() > 0 && (
					<div
						className={`${styles.compensationBadge} ${styles.compensationEstimate}`}
					>
						<p>
							You are ${numberWithCommas(Math.trunc(overAmount()))} over budget
            </p>
					</div>
				)}
				<p className={styles.estimateText}>
					* some amounts may be estimates based on target sales
        </p>{" "}
			</div>
			<div class={styles.section}>
				<div className={styles.titleAndAction}>
					<h3>Negotiables</h3>
					<EditSVG onClick={() => handleActiveStep(7)} />
				</div>
				<div className={styles.negotiablesContainer}>
					<Grid container spacing={3}>
						{selectedNegotiable.map((nego, index) => {
							if (nego.isChecked) {
								return (
									<Grid item xs={4} key={index}>
										<div className={styles.negotiableItem}>
											<p>{nego.text}</p>
										</div>
									</Grid>
								);
							}
						})}
					</Grid>
				</div>
			</div>
		</div>
	);
};

export default ReviewAndSend;
