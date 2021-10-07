import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import styles from './UserType.module.scss';
import clsx from 'clsx';

const UserTypes = ({ userType, handleUserType, handleActiveForUserType }) => {
	useEffect(() => {
		handleActiveForUserType();
	}, [userType]);
	return (
		<Grid className={styles.selectionContainer} container>
			<Grid item xs={6} onClick={() => handleUserType('influencer')}>
				<div
					className={clsx(
						styles.userTypeItem,
						userType === 'influencer' ? styles.active : ''
					)}
				>
					<h1>Influencer</h1>
				</div>
			</Grid>
			<Grid item xs={6}>
				<div
					className={clsx(
						styles.userTypeItem,
						userType === 'brand' ? styles.active : ''
					)}
					onClick={() => handleUserType('brand')}
				>
					<h1>Brand</h1>
				</div>
			</Grid>

		</Grid>
	);
};

export default UserTypes;
