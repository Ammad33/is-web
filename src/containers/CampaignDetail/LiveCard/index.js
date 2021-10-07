import React from 'react';
import styles from './LiveCard.module.scss';
import { AlertCircle } from 'react-feather';
import { useHistory } from 'react-router-dom';

const LiveCard = () => {
	const history = useHistory();
	return (
		<div className={styles.liveContainer}>
			<h1><AlertCircle /> Add Your second post</h1>
			<p className={styles.firstp}>Upload a screenshot and a link to your post for the brand to see</p>
			<button className={styles.accept} onClick={() => history.push('/posts')} >Add</button>
		</div>)
};

export default LiveCard