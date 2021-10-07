import React, { useState, useContext, useEffect } from "react";
import styles from "./CampaignsDetails.module.scss";
import BrandCampaignDetail from "./BrandCampaignDetail";
import { useHistory, withRouter } from "react-router-dom";
import InfluencerCampaignDetail from "./InfluencerCampaignDetail";
import { RootContext } from "../../context/RootContext";
import { Auth } from "aws-amplify";
import _ from "lodash";
import moment from "moment";
import brandCampaignDetailQuery from "../../GraphQL/brandCampaignDetailQuery";
import influencerCampaignDetailQuery from "../../GraphQL/influencerCampaignDetailQuery";
import getTeamQuery from "../../GraphQL/getTeamQuery";
import deleteCampaignMutation from "../../GraphQL/deleteCampaignMutation";
import updateCampaignMutation from "../../GraphQL/updateCampaignMutation";
import negotiateInfluencerMutation from "../../GraphQL/negotiateInfluencerMutation";

const CampaignDetail = ({ location }) => {


	let campaignId = 'campaign' + location.hash;

	const history = useHistory();
	const [status, setStatus] = useState('');
	const [addCampaign, setAddCampagin] = useState(false);
	const [brandState, setBrandState] = useState(true);
	const { setActiveCampaign, brandId, brandType, currentUser, setCurrentUser, setShowLoader } = useContext(RootContext);
	const [selectedMembers, setSelectedMemebers] = useState([]);
	const [team, setTeam] = useState([]);
	const [search, setSearch] = useState('');
	const [headingValue, setHeadingValue] = useState('');
	const [internalState, setInternalState] = useState('');
	const [data, setData] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

	String.prototype.toProperCase = function () {
		return this.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	const getAuth = async () => {

		try {
			const cognitoUser = await Auth.currentAuthenticatedUser();
			const currentSession = await Auth.currentSession();
			cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
				let currentUserAWS = { ...currentUser };
				currentUserAWS.signInUserSession = session;
				setCurrentUser(currentUserAWS);

			});
		} catch (e) {
			console.log('Unable to refresh Token', e);
		}

	}

	const handleSearch = async (e) => {

		setSearch(e.target.value);
		const members = [...team];
		setTeam(members.filter((item) => item.email.includes(e.target.value)));
		if (e.target.value === '') {
			let teamData = await getTeam();

			teamData = teamData && teamData.map((item) => item.user);

			if (
				selectedMembers &&
				selectedMembers !== null &&
				selectedMembers.length !== 0
			) {
				let data =
					teamData &&
					teamData !== null &&
					teamData.map((item) => {
						const index = selectedMembers.findIndex(
							(sec) => sec.email === item.email
						);
						if (index !== -1) {
							return;
						} else {
							return item;
						}
					});
				setTeam(_.compact(data));
			} else {
				setTeam(teamData);
			}
		}
	};

	const handleDelete = async () => {
		try {
			let result = await deleteCampaignMutation({
				brandId: brandId,
				id: campaignId,
			});
			if (result.error === false) {
				setErrorMessage('');
				history.push('/');
			} else {
				setErrorMessage(result.message);
			}
		} catch (e) {
			setErrorMessage(e);
		}
	};

	const updateCampaign = async () => {

		try {
			const data = {
				brandId,
				id: campaignId,
				team: selectedMembers.map((item) => item.id),
			};

			let result = await updateCampaignMutation(data);
			if (result.error === false) {
				setErrorMessage('');
				getCampaign();
			} else {
				setErrorMessage(result.message);
			}

		} catch (e) {

			setErrorMessage(e);

		}
	};

	const getCampaign = async () => {

		setShowLoader(true);
		try {

			let result;
			if (brandType.toLowerCase() == 'influencer') {
				result = await influencerCampaignDetailQuery(brandId, campaignId);
			} else {
				result = await brandCampaignDetailQuery(brandId, campaignId);
			}

			setShowLoader(false);

			if (result.error === false && result.data !== null) {

				let { data } = result;

				setData(data);

				data.deliverables &&
					data.deliverables !== null &&
					data.deliverables.map((deliverable) => {
						deliverable.postType = deliverable.postType && deliverable.postType !== null ?
							deliverable.postType.charAt(0).toUpperCase() +
							deliverable.postType.toLowerCase().slice(1) : '';
						deliverable.frameContentType = deliverable.frameContentType && deliverable.frameContentType !== null ?
							deliverable.frameContentType.charAt(0).toUpperCase() +
							deliverable.frameContentType.toLowerCase().slice(1) : '';
						deliverable.platform = deliverable.platform && deliverable.platform !== null ?
							deliverable.platform.charAt(0).toUpperCase() +
							deliverable.platform.toLowerCase().slice(1) : '';
						deliverable.deadlineDate = new Date(
							deliverable.deadlineDate * 1000
						).toDateString();
					});

				data.events = data.events.map(
					(activity) => {
						activity.time = moment.unix(activity.time).format("MM/DD");
						return activity;
					}
				);
				setInternalState(data.internalState)

				setStatus(
					data.status
						? data.status
						: 'CLOSED'
				);

				setSelectedMemebers(
					data.brandTeam
						? data.brandTeam
						: []
				);

				let teamData = await getTeam();

				teamData = teamData && teamData.map((item) => item.user);

				if (
					data.brandTeam !== null &&
					data.brandTeam.length !== 0
				) {
					let data1 =
						teamData &&
						teamData !== null &&
						teamData.map((item) => {
							const index = data.brandTeam.findIndex(
								(sec) => sec.email === item.email
							);
							if (index !== -1) {
								return;
							} else {
								return item;
							}
						});
					setTeam(_.compact(data1));
				} else {
					setTeam(teamData);
				}
				setErrorMessage('');
			} else {
				setErrorMessage(result.message);
			}

		} catch (e) {
			console.log(e);
			setErrorMessage(e);
		}
	};

	const getTeam = async () => {
		try {
			let result = await getTeamQuery(brandId);
			if (result.error === false) {
				return result.data;
			} else {
				setErrorMessage(result.message);
			}
		} catch (e) {

			setErrorMessage(e);

		}
	};

	const addInTeam = (memeber) => {
		const members = [...selectedMembers];
		members.push(memeber);
		setSelectedMemebers(members);
		const total = [...team];
		const index = total.findIndex((item) => item.email === memeber.email);
		total.splice(index, 1);
		setTeam(total);
	};

	const removeInTeam = (memeber) => {
		const total = [...selectedMembers];
		const index = total.findIndex((item) => item.email === memeber.email);
		total.splice(index, 1);
		setSelectedMemebers(total);
		const members = [...team];
		members.push(memeber);
		setTeam(members);
	};

	useEffect(() => {
		getCampaign();
	}, [addCampaign]);

	const [setAll, setSetAll] = useState(false);

	useEffect(() => {
		setSetAll(false);
		if (data && data !== null && data.negotiables !== null) {
			let negotialble = true;
			Object.values(data.negotiables).map((item) => {
				if (item === true) {
					negotialble = false;
				}
			});

			if (
				((data.discount &&
					data.discount !== null &&
					data.discount.percentage &&
					data.discount.percentage !== '') ||
					(data.discount &&
						data.discount !== null &&
						data.discount.amount &&
						data.discount.amount.amount !== '')) &&
				data.invitationMessage !== null &&
				data.invitationMessage !== '' &&
				data.budget !== null &&
				data.budget.amount !== '' &&
				data.targetGrossSales !== null &&
				data.targetGrossSales.amount !== '' &&
				data.deliverables !== null &&
				data.deliverables &&
				data.deliverables.length !== 0 &&
				data.compensation !== null &&
				data.compensation &&
				data.compensation.length !== 0 &&
				negotialble === false &&
				data.influencer !== null &&
				data.invitedAt !== null
			) {
				setSetAll(true);
			}
		}
	}, [data]);

	const handleHeading = () => {
		let negotialble = true;
		if (data && data !== null && data.negotiables !== null) {
			Object.values(data.negotiables).forEach((item) => {
				if (item === true) {
					negotialble = false;
				}
			});
		}

		if (

			(data.discount &&
				data.discount !== null &&
				data.discount.percentage &&
				data.discount.percentage === '') ||
			(data.discount &&
				data.discount !== null &&
				data.discount.amount &&
				data.discount.amount.amount === '') ||
			data.startDate === null || data.endDate === null ||
			data.invitationMessage === null
		) {
			setHeadingValue('Campaign Detail');
		} else if (data.budget === null || data.budget.amount === '') {
			setHeadingValue('Budget');
		} else if (
			data.targetGrossSales === null ||
			data.targetGrossSales.amount === ''
		) {
			setHeadingValue('Target Gross Sale');
		} else if (data.products === null || data.products.length === 0) {
			setHeadingValue('Products');
		} else if (
			data.deliverables === null ||
			(data.deliverables && data.deliverables.length === 0)
		) {
			setHeadingValue('Deliverable');
		} else if (
			data.compensation === null ||
			(data.compensation && data.compensation.length === 0)
		) {
			setHeadingValue('Compensation');
		} else if (negotialble) {
			setHeadingValue('Negotiable');
		} else if (data.influencer === null) {
			setHeadingValue('Influencer');
		}
		else if (data.invitedAt === null) {
			setHeadingValue('Invite');
		}
	};

	const handleBrandState = () => {
		setBrandState(brandState ? false : true);
	};

	useEffect(() => {
		setActiveCampaign(campaignId);
	}, []);

	useEffect(() => {
		if (data !== null) {
			handleHeading();
		}
	}, [data]);

	return (
		<div className={styles.detailContainer}>
			{brandType.toLowerCase() === 'influencer' ? (
				<InfluencerCampaignDetail
					status={status}
					data={data}
					addCampaign={addCampaign}
					setAddCampagin={setAddCampagin}
					handleDelete={handleDelete}
					selectedMembers={selectedMembers}
					team={team}
					addInTeam={addInTeam}
					removeInTeam={removeInTeam}
					search={search}
					handleSearch={handleSearch}
					updateCampaign={updateCampaign}
					setAll={setAll}
					headingValue={headingValue}
					campaignId={campaignId}
					handleStatus={() => setStatus('PENDING')}
					internalState={internalState}
					getCampaign={getCampaign}
				/>
			) : (
					<BrandCampaignDetail
						status={status}
						data={data}
						addCampaign={addCampaign}
						setAddCampagin={setAddCampagin}
						handleDelete={handleDelete}
						selectedMembers={selectedMembers}
						team={team}
						addInTeam={addInTeam}
						removeInTeam={removeInTeam}
						search={search}
						handleSearch={handleSearch}
						updateCampaign={updateCampaign}
						setAll={setAll}
						campaignId={campaignId}
						headingValue={headingValue}
						getCampaign={getCampaign}

					/>
				)}
			{errorMessage !== '' && (
				<div className={styles.errorMessage1}>
					{errorMessage}
				</div>
			)}
		</div>
	);
};

export default withRouter(CampaignDetail);
