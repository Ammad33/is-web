import React from 'react';
import { Edit } from 'react-feather';
import styles from './BudgetAndConversion.module.scss';

const BudgetAndConversion = ({ handleEdit, data, status }) => {
	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	return (
		<div className={styles.mainContainer}>
			<div className={styles.BudgetAndConversion1}>
				<h3>Budget & Conversion</h3>
				{(status && status === 'DRAFT') ? (
					<Edit onClick={() => handleEdit(3)} />
				) : (
						''
					)}
			</div>
			<div className={styles.section}>
				<h5>Budget</h5>
				<p>${data && data.budget && data.budget !== null ? numberWithCommas(Math.trunc(data.budget.amount)) : ''}</p>
			</div>
			<div className={styles.section}>
				<h5>Target Gross Sales Goal</h5>
				<p>${data && data.targetGrossSales && data.targetGrossSales !== null ? numberWithCommas(Math.trunc((data.targetGrossSales.amount))) : ''}</p>
			</div>
		</div>
	);
};

export default BudgetAndConversion;