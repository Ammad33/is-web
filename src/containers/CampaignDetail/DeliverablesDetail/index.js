import React from 'react';
import styles from './DeliverablesDetail.module.scss';
import moment from 'moment';

const DeliverablesDetail = ({ deliverables, campaign }) => {
	const getPostFrequency = (frequency) => {
		switch (frequency) {
			case 'BI_WEEKLY':
				return 'Every Other Week';
			case 'BI_MONTHLY':
				return 'Every Other Month';
			case 'WEEK':
				return 'Every Week';
			case 'MONTH':
				return 'Every Month';
			default:
				return '';
		}
	};


	function weeksBetween(d1, d2) {

		const date1 = moment(d1);
		const date2 = moment(d2);
		return Math.ceil(date2.diff(date1, 'days') / 7);
	}

	/**{function} to get months betweeen two dates */
	function monthBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2);
		return Math.ceil(date2.diff(date1, 'days') / 30);
	}

	/**{function} to get biMonths between two dates */
	function biMonthBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2);
		return Math.ceil(date2.diff(date1, 'days') / 60);
	}

	const TotalPost = () => {
		let totalPost = 0;
		deliverables && deliverables !== null && deliverables.forEach(item => {
			if (item.frequency === 'WEEK') {
				totalPost = totalPost + (parseInt(item.posts) * weeksBetween(new Date(campaign.startDate * 1000), new Date(campaign.endDate * 1000)));
			} else if (item.frequency === 'BI_WEEKLY') {
				totalPost = totalPost + (parseInt(item.posts) * biWeekBetween(new Date(campaign.startDate * 1000), new Date(campaign.endDate * 1000)));
			} else if (item.frequency === 'MONTH') {
				totalPost = totalPost + (parseInt(item.posts) * monthBetween(new Date(campaign.startDate * 1000), new Date(campaign.endDate * 1000)));
			} else if (item.frequency === 'BI_MONTHLY') {
				totalPost = totalPost + (parseInt(item.posts) * biMonthBetween(new Date(campaign.startDate * 1000), new Date(campaign.endDate * 1000)));
			}
		});
		return totalPost;
	}

	/**{function} to get biWeeks between two dates */
	function biWeekBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2);
		return Math.ceil(date2.diff(date1, 'days') / 14);
	}

	return (
		<div className={styles.deliverableContainer}>
			<h1>Deliverables</h1>
			{deliverables.map((deliverable, index) => {
				return (
					<React.Fragment key={index}>
						<h6 className={styles.subHeader}>Deliverable {index + 1}</h6>
						<div className={`${styles.detailSubContent} ${styles.displayNone}`}>
							<h6>Deliverable Deadline</h6>
							<p>{deliverable ? deliverable.deadlineDate : ''}</p>
						</div>
						<div className={styles.detailSubContent}>
							<h6>Social Platform</h6>
							<p>{deliverable ? deliverable.platform : ''}</p>
						</div>
						<div className={styles.detailSubContent}>
							<h6>Post Type</h6>
							<p> {deliverable ? deliverable.postType : ''}</p>
						</div>
						<div className={styles.detailSubContent}>
							<h6>Content Type</h6>
							<p> {deliverable ? deliverable.frameContentType : ''}</p>
						</div>
						<div className={styles.detailSubContent}>
							<h6>Frames Required</h6>
							<p> {deliverable ? deliverable.framesRequired : ''}</p>
						</div>
						<div className={styles.detailSubContent}>
							<h6>Brand tag</h6>
							<p>@{deliverable ? deliverable.brandTag : ''}</p>
						</div>
						<div className={styles.detailSubContent}>
							<h6>Hash tag</h6>
							<p>#{deliverable ? deliverable.hashTag : ''}</p>
						</div>
						<div
							className={`${styles.detailSubContent} ${styles.marginBottom20}`}
						>
							<h6>Post Frequency</h6>
							<p>
								{deliverable
									? `${deliverable.posts} posts ${getPostFrequency(
										deliverable.frequency
									)}`
									: ''}
							</p>
						</div>
					</React.Fragment>
				);
			})}
			{deliverables && deliverables !== null && <div className={`${styles.detailSubContent} ${styles.marginBottom20}`}>
				<h6 className={styles.postTotal}>Post Total: {TotalPost()}</h6>
			</div>}
		</div>
	);
};

export default DeliverablesDetail;
