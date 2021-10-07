import React from 'react';
import { Divider } from '@material-ui/core';
import styles from './Notifications.module.scss';
import Switch from '../../../components/Switch';


const Notification = ({ actionRequired,
	signContracts,
	influncerPosts,
	campaignStart,
	typeName,
	hanldeActionRequired,
	hanldeSignContracts,
	hanldeInfluencerPost,
	hanldeCampaignStart }) => {


	return (
		<>
			<div className={styles.notifictionItemFirst}>
				<div >
					<p className={styles.heading}>
						Action Required
                    </p>
					<p className={styles.content}>
						Get notifications when there is an action you need to take to move a campaign forward.
                    </p>
				</div>
				<Switch
					checked={actionRequired}
					onChange={hanldeActionRequired}
					name="actionRequired"
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
			</div>
			<Divider />
			<div className={styles.notifictionItem}>
				<div >
					<p className={styles.heading}>
						Signed Contracts
                    </p>
					<p className={styles.content}>
						Get notifications when the other party has signed the campaign contract.
                    </p>
				</div>
				<Switch
					checked={signContracts}
					onChange={hanldeSignContracts}
					name="actionRequired"
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
			</div>
			<Divider />
			{typeName === 'Brand' ? (
				<div className={styles.notifictionItem}>
					<div >
						<p className={styles.heading}>
							Influencer Posts
									</p>
						<p className={styles.content}>
							Get notifications when the influencer uploads a post.
									</p>
					</div>
					<Switch
						checked={influncerPosts}
						onChange={hanldeInfluencerPost}
						name="actionRequired"
						inputProps={{ 'aria-label': 'secondary checkbox' }}
					/>
				</div>
			) : ("")}

			<Divider />
			<div className={styles.notifictionItem}>
				<div >
					<p className={styles.heading}>
						Campaign Start
                    </p>
					<p className={styles.content}>
						Get notifications a day before a campaign is starting.
                    </p>
				</div>
				<Switch
					checked={campaignStart}
					onChange={hanldeCampaignStart}
					name="actionRequired"
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
			</div>
		</>);
};

export default Notification;