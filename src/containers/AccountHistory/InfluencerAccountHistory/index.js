import React, { useState } from 'react';
import styles from './InfluencerAccountHistory.module.scss';
import InfluencerInvoice from './InfluencerInvoice';
import FomoPromoInvoice from '../BrandAccountHistory/FomoPromoInvoice'



const InfluencerAccountHistory = ({ data, fomoPromoInvoiceData }) => {

	const [active, setActive] = useState('Influencer Invoices');
	const [expanded, setExpanded] = React.useState((0));
	const handleExpandClick = (event, index) => {
		if (expanded == event.currentTarget.dataset["target"]) {
			setExpanded(0)
		}
		else {
			setExpanded(event.currentTarget.dataset["target"]);
		}
	};
	return (
		<>
			<div className={styles.mainContainer}>
				<div className={styles.accountHistoryHeadingContainer}>
					<div className={styles.accountHistoryHeading}>
						<span>Billing</span>
					</div>
				</div>
				<div className={styles.FiltersContainer}>
					<button
						className={active === 'Influencer Invoices' ? styles.active : ''}
						onClick={() => {
							setActive('Influencer Invoices');
						}}
					>
						Influencer Invoices
          </button>
					<button
						className={active === 'fomopromo Invoices' ? styles.active : ''}
						onClick={() => {
							setActive('fomopromo Invoices');
						}}
					>
						fomopromo Invoices
          </button>
				</div >
				<div>
					{active === 'Influencer Invoices' ? (
						<InfluencerInvoice data={data}
							handleExpandClick={handleExpandClick}
							expanded={expanded} />
					) : (
							<FomoPromoInvoice data={fomoPromoInvoiceData}
								handleExpandClick={handleExpandClick}
								expanded={expanded} />
						)}
				</div>
			</div>
		</>
	);
};

export default InfluencerAccountHistory;
