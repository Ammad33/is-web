import React from 'react';
import styles from './Compensation.module.scss';
import { Edit } from 'react-feather';
import moment from 'moment';

const Compensation = ({ onClick, handleEdit, compensation, status, targetGrossSales, paymentSchedule, deliverables, startDate, endDate }) => {
	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	const getPaymentSchedule = (compensation) => {
		switch (compensation) {
			case 'FIRST_OF_MONTH':
				return (
					'1st of every month');
			case 'FIFTEENTH_OF_MONTH':
				return ('15th of every month');
			case 'LAST_DAY_OF_MONTH':
				return ('Last day of every month');
			default:
				return '';
		}
	}

	const getCompensationType = () => {
		switch (compensation[0].__typename) {
			case 'CompRevenueShare':
				return (
					<p>Revenue Share</p>);
			case 'CompCashPerPost':
				return (<p>Cash Per Post</p>);
			case 'CompCashPerMonthlyDeliverable':
				return (<p>Cash Per Monthly Deliverable</p>);
			case 'CompGiftCard':
				return (<p>Gift Card</p>);
			default:
				return '';
		}
	}
	const getCompensationHeading = () => {
		switch (compensation[0].__typename) {
			case 'CompRevenueShare':
				return (
					<h6>Revenue Share Percentage</h6>);
			case 'CompCashPerPost':
				return (<h6>Amount per Post</h6>);
			case 'CompCashPerMonthlyDeliverable':
				return (<h6>Amount Per Monthly Deliverable</h6>);
			case 'CompGiftCard':
				return (<h6>Gift Card Amount</h6>);
			default:
				return <h6></h6>;
		}
	}

	const getCompensationAmount = () => {
		switch (compensation[0].__typename) {
			case 'CompRevenueShare':
				return (
					<p>{compensation[0].percentage && numberWithCommas((compensation[0].percentage))}% ($ {numberWithCommas(Math.trunc(parseFloat((compensation[0].percentage) * parseFloat(targetGrossSales.amount / 100))))})</p>);
			case 'CompCashPerPost':
				return (<p>${compensation[0].amount && numberWithCommas(Math.trunc(compensation[0].amount.amount))}</p>);
			case 'CompCashPerMonthlyDeliverable':
				return (<p>${compensation[0].amount && numberWithCommas(Math.trunc(compensation[0].amount.amount))}</p>);
			case 'CompGiftCard':
				return (<p>${compensation[0].amount && numberWithCommas(Math.trunc(compensation[0].amount.amount))}</p>);
			default:
				return <p></p>;
		}
	}
	/*****************************Date functions***********************************/
	/**{function} to get weeks betweeen two dates */
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

	/**{function} to get biWeeks between two dates */
	function biWeekBetween(d1, d2) {
		const date1 = moment(d1);
		const date2 = moment(d2);
		return Math.ceil(date2.diff(date1, 'days') / 14);
	}
	/*****************************************************************************/

	/**{function} to get compensation total */
	const getTotal = () => {
		let total = 0;
		compensation.forEach(item => {
			if (item.__typename === 'CompRevenueShare') {
				total = total + parseFloat((item.percentage) * parseFloat(targetGrossSales.amount / 100));
			} else if (item.__typename === 'CompCashPerPost') {
				let totalPost = 0;
				deliverables.forEach(item => {
					if (item.frequency === 'WEEK') {
						totalPost = totalPost + (parseInt(item.posts) * weeksBetween(new Date(startDate * 1000), new Date(endDate * 1000)));
					} else if (item.frequency === 'BI_WEEKLY') {
						totalPost = totalPost + (parseInt(item.posts) * biWeekBetween(new Date(startDate * 1000), new Date(endDate * 1000)));
					} else if (item.frequency === 'MONTH') {
						totalPost = totalPost + (parseInt(item.posts) * monthBetween(new Date(startDate * 1000), new Date(endDate * 1000)));
					} else if (item.frequency === 'BI_MONTHLY') {
						totalPost = totalPost + (parseInt(item.posts) * biMonthBetween(new Date(startDate * 1000), new Date(endDate * 1000)));
					}
				});
				total = total + (parseFloat(item.amount.amount) * totalPost);
			} else {
				total = total + parseFloat(item.amount.amount);
			}
		})
		return parseFloat(total).toFixed(2);
	}

	return (
		<div className={styles.compensationContainer}>
			<div className={styles.headerContainer}>
				<h1>Compensation</h1>
				{(status && status === 'DRAFT') ? (
					<Edit onClick={() => handleEdit(6)} />
				) : (
						''
					)}
			</div>
			<div className={styles.conatianer}>
				<div className={styles.detailSubContent}>
					<h6>Influencer Schedule Payment </h6>
					<p>{paymentSchedule && paymentSchedule !== null ? getPaymentSchedule(paymentSchedule) : ''}</p>
				</div>
				{

				}
				<div className={styles.detailSubContent}>
					<h6>Compensation Type</h6>
					{
						compensation && compensation.length > 0 && getCompensationType()
					}

				</div>
				<div className={styles.detailSubContent}>
					{compensation && compensation.length > 0 && getCompensationHeading()}
					<p>{compensation && compensation.length > 0 && getCompensationAmount()}</p>
				</div>
				<div className={styles.detailSubContent}>
					<h6 className={styles.totalCompEstimate}>Total Comp Estimate: ${numberWithCommas(Math.trunc(((getTotal()))))}</h6>
				</div>
			</div>
			{compensation && compensation.length > 0 &&
				<button onClick={() => onClick('Compensation')}>See all</button>
			}
		</div>
	);
};

export default Compensation;
