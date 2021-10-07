import React from 'react';
import BrandConnectAccounts from './BrandConnectAccounts';
import InfluencerConnectAccounts from './InfluencerConnectAccounts';
import styles from './ConnectedAccounts.module.scss';

const ConnectedAccounts = ({ typeName }) => {
	return (
		<div className={styles.mainContainer}>
			{typeName === 'Brand' ? (<BrandConnectAccounts />) : (<InfluencerConnectAccounts />)}
		</div>
	);
};

export default ConnectedAccounts;
