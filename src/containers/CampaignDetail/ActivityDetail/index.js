import React from 'react';
import styles from './ActivityDetail.module.scss';
import Tooltip from '@material-ui/core/Tooltip';


const ActivityDetail = ({ activities }) => {
	return (
		<div className={styles.activityContainer}>
			<h1>Activity</h1>
			<div className={styles.mainDiv}>
				{activities &&
					activities.map((activity, index) => {
						return (
							<>
								<div className={styles.activitySubContent}>
									<span>{activity.time}</span>
									<div></div>
									{activity.description.length > 29 ?
										<>
											<Tooltip title={`${activity.description}`}>
												<p>{activity.description.slice(0, 24)}... </p>
											</Tooltip>
										</>
										:
										<p>{activity.description}</p>}
								</div>
								{index >= 0 && index < activities.length - 1 ? (
									<div className={styles.border} />
								) : (
										''
									)}
							</>
						);
					})}
			</div>
		</div>
	);
};

export default ActivityDetail;