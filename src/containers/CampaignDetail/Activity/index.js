import React, { useState, useEffect } from 'react';
import styles from './Activity.module.scss';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
const Activity = ({ activities, onClick }) => {
	const [seeAll] = useState(activities && activities.length >= 3 ? true : false);

	return (
		<div className={styles.activityContainer}>
			<h1>Activity</h1>
			<div className={styles.mainDiv}>
				{seeAll
					? activities &&
					activities.map((activity, index) => {
						if (index < 3) {
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
									{index >= 0 && index < 2 ?
										<div className={styles.border} /> : ""}
								</>
							);
						} else {
							return '';
						}
					})
					: activities &&
					activities.map((activity, index) => {
						return (
							<>
								<div className={styles.activitySubContent}>
									<span>{activity.time}</span>
									<div></div>
									{activity.description.length > 29 ?
										<>
											<Tooltip title={`${activity.description}`}>
												<p>{activity.description.slice(0, 29)}... </p>
											</Tooltip>
										</>
										:
										<p>{activity.description}</p>}
								</div>
								{index >= 0 && index < activities.length - 1 ?
									<div className={styles.border} /> : ""}
							</>
						);
					})}
			</div>
			{seeAll && <button onClick={() => onClick('Activity')}>See all</button>}
		</div>
	);
};

export default Activity;