import React, { useContext } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { RootContext } from './../../context/RootContext';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '20px',
	},
	progressCircle: {
		height: '100px !important',
		width: '100px !important',
	},
	text: {
		fontSize: '30px',
		color: '#7b5cd9',
	},
}));

const Loader = () => {

	const classes = useStyles();
	const { showLoader } = useContext(RootContext);

	return (
		<Backdrop className={classes.backdrop} open={showLoader}>
			<div className={classes.contentContainer}>
				<CircularProgress className={classes.progressCircle} />
				<p className={classes.text}>Loading ...</p>
			</div>
		</Backdrop>
	);
};

export default Loader;
