import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Iframe from 'react-iframe';
import styles from './Reports.module.scss';
import { Auth } from 'aws-amplify';
import { RootContext } from '../../context/RootContext';



const Reports = () => {

	const [active, setActive] = useState('ALL')
	const { brandId, currentUser, setCurrentUser } = useContext(RootContext);

	useEffect(() => {
		getAuth();
	}, []);


	const getAuth = async () => {

		try {
			const cognitoUser = await Auth.currentAuthenticatedUser();
			const currentSession = await Auth.currentSession();
			cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
				let currentUserAWS = { ...currentUser };
				currentUserAWS.signInUserSession = session;
				setCurrentUser(currentUserAWS);

			});
		} catch (e) {
			console.log('Unable to refresh Token', e);
		}

	}


	return (
		<>
			<div className={styles.reportsContainer}>
				<div className={styles.ReportHeadingContainer}>
					<div className={styles.ReportHeading}>
						<span>Reports</span>
					</div>
				</div>

				<Grid
					container
					spacing={3}
					direction='column'
				>
					<Grid item xs={12}>
						<div className={styles.ReportInfoContainer}>
							<div className={styles.ReportContainer}>
								<Iframe
									url="https://tableau.influence-sciences.com/views/FomoPromo-Homepage/GrossCampaigns?:embed=yes&:toolbar=no"
									width="100%"
									height="100%"
									id="myId"
									className={styles.secondContainer}
									display="initial"
									position="relative" />
							</div >
						</div>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default Reports;

