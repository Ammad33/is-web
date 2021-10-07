import React from 'react';
import styles from './Contract.module.scss';

const Contract = () => {
	return (
		<div className={styles.contractContainer}>
			<h1>Contract</h1>
			<div className={styles.detailSubContent}>
				<h6>Contract has been signed by both parties </h6>
			</div>
			<button>Preview Contract</button>
		</div>
	);
};

export default Contract;
