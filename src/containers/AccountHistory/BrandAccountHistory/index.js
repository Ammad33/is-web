import React, { useState } from 'react';
import styles from './BrandAccountHistory.module.scss';
import BrandInvoice from './BrandInvoice';
import FomoPromoInvoice from './FomoPromoInvoice'



const BrandAccountHistory = ({ data, fomoPromoInvoiceData }) => {

	const [active, setActive] = useState('Brand Invoices');
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
						className={active === 'Brand Invoices' ? styles.active : ''}
						onClick={() => {
							setActive('Brand Invoices');
						}}
					>
						Brand Invoices
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
					{active === 'Brand Invoices' ? (
						<BrandInvoice data={data}
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

export default BrandAccountHistory;
