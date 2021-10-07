import React from 'react';
import styles from './Performance.module.scss';
import { useHistory } from 'react-router-dom';

const Performance = () => {

	const history = useHistory();

	return (
		<div className={styles.performanceContainer}>
			<h1>Performance</h1>
			<div>
				<p>Tableau Integration</p>
			</div>
			<button onClick={() => history.push('/performance')}>See all</button>
		</div>
	);
};

export default Performance;
