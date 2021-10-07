import React from 'react';
import styles from './Negotiables.module.scss';
import { Edit } from 'react-feather';

const Negotiables = ({ handleEdit, data, status }) => {

	const getNegotiablesData = () => {
		if (data.negotiables !== null) {
			const keys = Object.keys(data.negotiables);
			return keys.map((key) => {
				if (data.negotiables[key]) {
					switch (key) {
						case 'monthlyRetainerFee':
							return <p>Monthly Retainer Fee</p>;
						case 'postFee':
							return <p>Post Fee</p>;
						case 'giftCard':
							return <p>Gift Card</p>;
						case 'campaignDuration':
							return <p>Campaign Duration</p>;
						case 'postFrequency':
							return <p>Post Frequency</p>;
						case 'revenueShare':
							return <p>Revenue Share</p>;
						default:
							return '';
					}
				}
			});
		}
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.headerContainer}>
				<h1>Negotiables</h1>
				{(status && status === 'DRAFT') ? (
					<Edit onClick={() => handleEdit(7)} />
				) : (
						''
					)}
			</div>
			{data?.negotiables ? <>{data.negotiables !== null && getNegotiablesData()}</> : ''}
		</div>
	);
};

export default Negotiables;
