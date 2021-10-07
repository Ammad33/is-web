import React, { useState } from 'react';
import styles from './ExploreBrands.module.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const ExploreBrands = ({ influencer }) => {
	const history = useHistory();
	const [influencerProfile, setInfluencerProfile] = useState(false);
	return (
		<div>
			<Card
				className={styles.influencerCard}
				onClick={() => history.push('/brandProfile')}
			>
				<CardContent className={styles.cardContent}>
					<div className={styles.cardDetails}>
						<div className={styles.personInfo}>
							<Avatar
								className={styles.personAvatar}
								src={influencer.avatar}
							/>
						</div>
						<span className={styles.BrandName}>{influencer.name}
							<div className={styles.BrandDescription}>{influencer.description}</div></span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ExploreBrands;
