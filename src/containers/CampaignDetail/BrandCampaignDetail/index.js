import React, { useState, useEffect } from "react";
import styles from "./BrandCampaignDetail.module.scss";
import { X } from "react-feather";
import Drawer from "../../../components/RightDrawer";
import ActivityDetail from "../ActivityDetail";
import CompensationDetail from "../CompensationDetail";
import DeliverablesDetail from "../DeliverablesDetail";
import AddCampaign from "../../AddCampaign";
import TeamMembersDetail from "../TeamMembersDetail";
import DraftBrandCampaignDetail from "../DraftBrandCampaignDetail";
import PendingBrandCampaignDetail from "../PendingBrandCampaignDetail";
import LiveBrandCampaignDetail from "../LiveBrandCampaignDetail";
import ClosedBrandCampaignDetail from "../ClosedBrandCampaignDetail";
import LostBrandCampaignDetail from "../LostBrandCampaignDetail";
import _ from "lodash";

const BrandCampaignDetail = ({
	headingValue,
	handleDelete,
	status,
	addCampaign,
	updateCampaign,
	setAddCampagin,
	data,
	addInTeam,
	removeInTeam,
	search,
	handleSearch,
	selectedMembers,
	team,
	setAll,
	campaignId,
	getCampaign,
}) => {
	const [step, setStep] = useState(1);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [element, setElement] = useState("");



	const handleEdit = (step) => {
		setAddCampagin(true);
		setStep(step);
	};

	const handleSeeClick = (value) => {
		setElement(value);
		setOpenDrawer(true);
	};

	const handleCloseDrawer = () => {
		if (element === "TeamMembers") {
			updateCampaign();
		}
		setElement("");
		setOpenDrawer(false);
	};
	const getDrawerElement = (element) => {
		switch (element) {
			case "Activity":
				return <ActivityDetail activities={data?.events} />;
			case "Deliverable":
				return (
					<DeliverablesDetail
						deliverables={data && data.deliverables}
						campaign={data}
					/>
				);
			case "Compensation":
				return (
					<CompensationDetail
						compensations={
							data && data.compensation && data.compensation !== null
								? _.compact(data.compensation)
								: []
						}
						targetGrossSales={data.targetGrossSales.amount}
						deliverables={
							data && data.deliverables && data.deliverables !== null
								? data.deliverables
								: []
						}
						startDate={data && data.startDate}
						endDate={data && data.endDate}
						paymentSchedule={data && data.paymentSchedule}
					/>
				);
			case "TeamMembers":
				return (
					<TeamMembersDetail
						addInTeam={addInTeam}
						removeInTeam={removeInTeam}
						search={search}
						handleSearch={handleSearch}
						selectedMembers={selectedMembers}
						team={team}
					/>
				);
			default:
				return;
		}
	};

	const getPage = (status) => {
		switch (status) {
			case "DRAFT":
				return (
					<DraftBrandCampaignDetail
						handleEdit={handleEdit}
						handleSeeClick={handleSeeClick}
						data={data}
						name={data && data.name}
						handleDelete={handleDelete}
						handleActiveStep={handleActiveStep}
						setAll={setAll}
						headingValue={headingValue}
					/>
				);
			case "CLOSED":
				return (
					<ClosedBrandCampaignDetail
						handleEdit={handleEdit}
						handleSeeClick={handleSeeClick}
						data={data}
						name={data && data.name}
						handleDelete={handleDelete}
					/>
				);
			case "LIVE":
				return (
					<LiveBrandCampaignDetail
						handleEdit={handleEdit}
						handleSeeClick={handleSeeClick}
						data={data}
						name={data && data.name}
						handleDelete={handleDelete}
					/>
				);
			case "INVITED":
				return (
					<PendingBrandCampaignDetail
						handleEdit={handleEdit}
						handleSeeClick={handleSeeClick}
						data={data}
						name={data && data.name}
						handleDelete={handleDelete}
						campaignId={campaignId}
						getCampaign={getCampaign}
					/>
				);
			case "LOST":
				return (
					<LostBrandCampaignDetail
						handleEdit={handleEdit}
						handleSeeClick={handleSeeClick}
						data={data}
						name={data && data.name}
						handleDelete={handleDelete}
					/>
				);
			case "PENDING":
				return (
					<PendingBrandCampaignDetail
						handleSeeClick={handleSeeClick}
						data={data}
						name={data && data.name}
						handleDelete={handleDelete}
						campaignId={campaignId}
						getCampaign={getCampaign}
						negotiables={
							data.negotiables && _.keys(_.pickBy(data.negotiables))
						}
					/>
				);
			case "DECLINED":
				return (
					<LostBrandCampaignDetail
						handleEdit={handleEdit}
						handleSeeClick={handleSeeClick}
						data={data}
						name={data && data.name}
						handleDelete={handleDelete}
					/>
				);
			default:
				return <div>Default</div>;
		}
	};

	const handleActiveStep = () => {
		let negotialble = true;
		if (data && data.negotiables && data.negotiables !== null) {
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
				data.discount.percentage === "") ||
			(data.discount &&
				data.discount !== null &&
				data.discount.amount &&
				data.discount.amount.amount === "") ||
			data.startDate === null ||
			data.endDate === null ||
			data.invitationMessage === null
		) {
			setStep(1);
			setAddCampagin(true);
		} else if (
			data.budget === null ||
			data.budget.amount === "" ||
			data.targetGrossSales === null ||
			data.targetGrossSales.amount === ""
		) {
			setStep(3);
			setAddCampagin(true);
		} else if (data.products === null || data.products.length === 0) {
			setStep(4);
			setAddCampagin(true);
		} else if (data.deliverables === null || data.deliverables.length === 0) {
			setStep(5);
			setAddCampagin(true);
		} else if (data.compensation == null || data.compensation.length === 0) {
			setStep(6);
			setAddCampagin(true);
		} else if (negotialble) {
			setStep(7);
			setAddCampagin(true);
		} else if (data.influencer === null) {
			setStep(8);
			setAddCampagin(true);
		} else if (data.invitedAt === undefined || data.invitedAt === null) {
			setStep(9);
			setAddCampagin(true);
		}
	};

	return (
		<>
			{addCampaign && (
				<AddCampaign
					open={addCampaign}
					step={step}
					campaign={data}
					brandId={data.brand.id}
					handleCancel={() => setAddCampagin(false)}
				/>
			)}
			<Drawer anchor={"right"} open={openDrawer} onClose={handleCloseDrawer}>
				<div className={styles.x}>
					<X onClick={handleCloseDrawer} />
				</div>
				{getDrawerElement(element)}
			</Drawer>
			{status !== "" && getPage(status)}
		</>
	);
};

export default BrandCampaignDetail;
