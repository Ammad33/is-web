import React from 'react';
import styles from './Declinee.module.scss';
import moment from 'moment';

const DeclineeCard = () => {
	return (
		<div className={styles.declineContainer}>
			<h1>You decline this campaign</h1>
			<p className={styles.firstp}>You declined this campaign on {moment().format('MM/DD/YYYY')}.</p>
		</div>)
};

export default DeclineeCard