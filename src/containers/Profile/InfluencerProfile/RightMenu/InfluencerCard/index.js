import React, { useState } from 'react';
import styles from './InfluencerCard.module.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Avatar } from '@material-ui/core';
import { Facebook, Youtube, Instagram } from 'react-feather';
import { useHistory } from 'react-router-dom';

const InfluencerCard = ({ influencer }) => {

	const history = useHistory();

	return (
		<div>
			<Card
				className={styles.influencerCard}
				onClick={() => history.push('/influencerProfile')}
			>
				<CardContent className={styles.cardContent}>
					<div className={styles.cardDetails}>
						<div className={styles.personInfo}>
							<Avatar
								className={styles.personAvatar}
								src={influencer.avatar}
							/>
						</div>
						<span className={styles.first_last}>{influencer.name}
							<div className={styles.influencername}>@{influencer.socialTag}</div></span>
						<span className={styles.instaIcon}>
							<Instagram />
							<div className={styles.instafollowers}>{influencer.instaFollowers}</div> </span>
						<span className={styles.ytIcon}>
							<Youtube />
							<div className={styles.ytfollowers}> {influencer.youtubeFollowers}</div>
						</span>
						<span className={styles.fbIcon}>
							<Facebook />
							<div className={styles.influencername}>{influencer.facebookFollowers}</div>
						</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default InfluencerCard;
