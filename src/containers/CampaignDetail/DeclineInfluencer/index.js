import React from 'react';
import styles from './DeclineInfluencer.module.scss';
import { Avatar, Chip, Popover } from '@material-ui/core';
import { ChevronRight, MoreVertical, Download, Mail } from 'react-feather';
import clsx from 'clsx';
import Activity from '../Activity';
import CampaignDetail from '../CampaignDetail';
import Compensation from '../Compensation';
import Deliverables from '../Deliverables';
import Collections from '../Collections';
import { useHistory } from 'react-router-dom';
import DeclineCard from '../DelinneCard';
import _ from 'lodash';

const DeclineInfluencer = ({
	handleEdit,
	data,
	handleSeeClick,
	getTotal,
	name,
}) => {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleClose = () => {
		setAnchorEl(null);
	};
	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
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
					<div className={styles.secondElement}>
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
							Estimated Compensation: ${numberWithCommas(Math.trunc(getTotal(data && data.compensation)))}
						</p>
						<div className={styles.borderDiv}></div>
						<Chip
							className={clsx(styles.campaignStatus, styles.lost)}
							label={'Decline'}
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

				<div className={styles.firstConatiner}>
					<DeclineCard />
					<Activity activities={data?.events} onClick={handleSeeClick} />
				</div>
				<div className={styles.secondContainer}>
					<div>
						<div className={styles.first}>
							<CampaignDetail campaign={data} handleEdit={handleEdit} />
							<Compensation
								compensation={
									data && data.compensation && data.compensation !== null
										? _.compact(data.compensation)
										: []
								}
								onClick={handleSeeClick}
								handleEdit={handleEdit}
								targetGrossSales={data.targetGrossSales}
								paymentSchedule={data.paymentSchedule}
							/>
						</div>
						<div className={styles.Collections1}>
							<Collections
								handleEdit={handleEdit}
								products={data.products}
								id={data.id}
							/>
						</div>
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
			</div>
		</>
	);
};

export default DeclineInfluencer;
