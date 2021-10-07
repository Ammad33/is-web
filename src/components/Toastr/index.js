import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { RootContext } from '../../context/RootContext';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Toastr = () => {
	const { toastrData, setToastrData } = useContext(RootContext);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setToastrData({ showToastr: false });
	};

	return (
		<Snackbar
			open={toastrData.showToastr}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<Alert onClose={handleClose} severity={toastrData.severity}>
				{toastrData.message}
			</Alert>
		</Snackbar>
	);
};

export default Toastr;
