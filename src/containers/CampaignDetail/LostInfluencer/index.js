import React from 'react';
import styles from './LostInfluencer.module.scss';
import { Avatar, Chip, Popover } from '@material-ui/core';
import { ChevronRight, MoreVertical, Download, Mail } from 'react-feather';
import clsx from 'clsx';
import Activity from '../Activity';
import CampaignDetail from '../CampaignDetail';
import Compensation from '../Compensation';
import Deliverables from '../Deliverables';
import Collections from '../Collections';
import DeclineCard from '../DeclineCard';
import { useHistory } from 'react-router-dom';
import TeamMembers from '../TeamMembers';
import BudgetAndConversion from '../BudgetAndConversion';
import Negotiables from '../Negotiables';
import _ from 'lodash';

const LostInfluencer = ({ handleEdit, data, handleSeeClick, name }) => {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<div className={styles.popOver}>
					<div>
						{' '}
						<Mail /> <p> Message Brand</p>
					</div>
					<div className={`${styles.secondElement} ${styles.displayNone}`}>
						{' '}
						<Download /> <p>Download Campaign</p>
					</div>
				</div>
			</Popover>

			<div className={styles.campaignsContainer}>
				<div className={styles.CampaignHeading}>
					<span onClick={() => history.push('/campaigns')}>Campaigns</span>
					<ChevronRight />
					<span>{name}</span>
				</div>
				<div className={styles.subHeadingSection}>
					<div className={styles.subCampaignSubHeading}>
						<p>
							Promotion:{' '}
							{data &&
								data.discount &&
								data.discount !== null &&
								data.discount.amount
								? data.discount.amount.amount
								: data &&
									data.discount &&
									data.discount !== null &&
									data.discount.percentage
									? data.discount.percentage
									: ''}{' '}
							{data &&
								data.discount &&
								data.discount !== null &&
								data.discount.percentage
								? '%'
								: data &&
									data.discount &&
									data.discount !== null &&
									data.discount.amount
									? '$'
									: ''}
						</p>
						<div className={styles.borderDiv}></div>
						<Chip
							className={clsx(styles.campaignStatus, styles.lost)}
							label={'Lost'}
						/>
						<div className={styles.borderDiv}></div>
						{data && data.brand && (
							<div className={styles.avatarContainer}>
								<Avatar className={styles.avatar} src={data.brand.imageUrl} />
								<span>{data.brand.name}</span>
							</div>
						)}
					</div>
					<MoreVertical onClick={handleClick} />
				</div>
				<div className={`${styles.firstConatiner} ${styles.declineStyle}`}>
					<DeclineCard handleEdit={handleEdit} />
					<Activity activities={data?.events} onClick={handleSeeClick} />
				</div>
				<div className={styles.firstConatiner}>
					<CampaignDetail campaign={data} handleEdit={handleEdit}>
						<>
							<h6>Custom Message to Influencer</h6>
							<p>
								Hi sam, we are so excited for the chance to work with you. We
								love your content and hope that you see value in working with
								us.
              </p>
						</>
					</CampaignDetail>
					<TeamMembers
						onClick={handleSeeClick}
						handleEdit={handleEdit}
						brandTeam={data && data.brandTeam !== null ? data.brandTeam : []}
					/>
					<BudgetAndConversion data={data} handleEdit={handleEdit} />
				</div>
				<div className={`${styles.secondContainer} ${styles.collectionContainer}`}>
					<div>
						<Collections handleEdit={handleEdit} id={data.id} />
					</div>
					<div className={styles.second}>
						<Deliverables
							deliverables={data.deliverables}
							handleEdit={handleEdit}
							onClick={handleSeeClick}
							campaign={data}
						/>
					</div>
				</div>
				<div className={styles.first}>
					<Compensation
						onClick={handleSeeClick}
						handleEdit={handleEdit}
						compensation={
							data && data.compensation && data.compensation !== null
								? _.compact(data.compensation)
								: []
						}
						targetGrossSales={data.targetGrossSales}
						paymentSchedule={data.paymentSchedule}
						deliverables={data && data.deliverables && data.deliverables !== null ? data.deliverables : []}
						startDate={data && data.startDate}
						endDate={data && data.endDate}
					/>
					<Negotiables data={data} />
				</div>
			</div>
		</>
	);
};

export default LostInfluencer;
