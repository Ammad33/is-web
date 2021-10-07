import React from 'react';
import styles from './DeclineCard.module.scss';

const DeclineCard = ({ handleEdit }) => {
	return (
		<div className={styles.declineContainer}>
			<h1>We're sorry this one didn't work out</h1>
			<p className={styles.firstp}>The influencer declined your campaign and left you a message.</p>
			<p className={styles.secondp}>Try creating a new campaign.</p>
			<button onClick={() => handleEdit()} >Create new campaign</button>
		</div>)
};

export default DeclineCard