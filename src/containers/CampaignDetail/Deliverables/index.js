import React from 'react';
import styles from './Deliverables.module.scss';
import { Edit } from 'react-feather';
import moment from 'moment';

const Deliverables = ({ onClick, handleEdit, deliverables, status, campaign }) => {

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
	/*****************************************************************************/


	return (
		<div className={styles.deliverableContainer}>
			<div className={styles.headerContainer}>
				<h1>Deliverables</h1>
				{(status && status === 'DRAFT') ? (
					<Edit onClick={() => handleEdit(5)} />
				) : (
						''
					)}
			</div>
			{deliverables && deliverables !== null &&
				<>
					<div className={`${styles.detailSubContent} ${styles.displayNone}`}>
						<h6>Deliverable Deadline</h6>
						<p>
							{deliverables && deliverables.length
								? deliverables[0].deadlineDate
								: ''}
						</p>
					</div>
					<div className={styles.detailSubContent}>
						<h6>Social Platform</h6>
						<p>
							{deliverables && deliverables.length && deliverables[0].platform !== null ? deliverables[0].platform : ''}
						</p>
					</div>
					<div className={styles.detailSubContent}>
						<h6>Post Type</h6>
						<p>
							{deliverables && deliverables.length
								? deliverables[0].postType && deliverables[0].postType !== null && deliverables[0].postType
								: ''}
						</p>
					</div>
					<div className={styles.detailSubContent}>
						<h6>Content Type</h6>
						<p>
							{deliverables && deliverables.length
								? deliverables[0].frameContentType && deliverables[0].frameContentType !== null && deliverables[0].frameContentType
								: ''}
						</p>
					</div>
					<div className={styles.detailSubContent}>
						<h6>Frames Required</h6>
						<p>
							{deliverables && deliverables.length
								? deliverables[0].framesRequired && deliverables[0].framesRequired !== null && deliverables[0].framesRequired
								: ''}
						</p>
					</div>
					<div className={styles.detailSubContent}>
						<h6>Brand tag</h6>
						<p>
							@{deliverables && deliverables.length && deliverables[0].brandTag && deliverables[0].brandTag !== null ? deliverables[0].brandTag : ''}
						</p>
					</div>
					<div className={styles.detailSubContent}>
						<h6>Hashtag</h6>
						<p>
							#{deliverables && deliverables.length ? deliverables[0].hashTag && deliverables[0].hashTag !== null && deliverables[0].hashTag : ''}
						</p>
					</div>
					<div className={`${styles.detailSubContent} ${styles.marginBottom1}`}>
						<h6>Post Frequency</h6>
						<p>
							{deliverables && deliverables.length
								? `${deliverables[0].posts} posts ${getPostFrequency(
									deliverables[0].frequency
								)}`
								: ''}
						</p>
					</div>
				</>}
			{deliverables && deliverables !== null && <div className={`${styles.detailSubContent} ${styles.marginBottom1}`} >
				<h6 className={styles.postTotal}>Post Total: {TotalPost()}</h6>
			</div>}
			{deliverables && deliverables !== null && deliverables.length > 1 ? (
				<button onClick={() => onClick('Deliverable')}>See all</button>
			) : (
					''
				)}
		</div>
	);
};

export default Deliverables;
