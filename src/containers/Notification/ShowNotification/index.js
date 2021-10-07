import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import styles from './showNotification.module.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const ShowNotification = ({ notifications }) => {
	const classes = useStyles();
	return (
		<>
			<div className={styles.NotifcationInfoContainer}>
				<List
					component='nav'
					className={classes.root}
					aria-label='mailbox folders'
				>
					<ListItem button>
						<div className={styles.personInfo}>
							<Avatar className={styles.personAvatar} />
						</div>
						<div className={styles.notificationContent}>
							<div>
								<span className={styles.BrandName}>
									{notifications.sender.name}
								</span>
								<span className={styles.notificationTime}>
									{moment(notifications.received).format('HH:mm A')}{' '}
								</span>
							</div>
							<div className={styles.BrandDescription}>
								{notifications.message}
							</div>
						</div>
					</ListItem>
				</List>
			</div>
		</>
	);
};

export default ShowNotification;
