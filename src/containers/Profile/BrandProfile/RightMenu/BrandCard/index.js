import React from 'react';
import styles from './BrandCard.module.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Avatar } from '@material-ui/core';

const BrandCard = ({ brand }) => {
	return (
		<div>
			<Card className={styles.brandCard}>
				<CardContent className={styles.cardContent}>
					<div className={styles.cardDetails}>
						<div className={styles.personInfo}>
							<Avatar className={styles.personAvatar} src={brand.avatar} />
						</div>
						<span className={styles.BrandName}>
							{brand.name}
							<div className={styles.BrandDescription}>{brand.description}</div>
						</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default BrandCard;
