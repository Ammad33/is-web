import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core'
import TextField from '../../../components/TextField';

const DisplayName = ({ displayName, handleDisplayName, handleActiveForDisplay }) => {
	useEffect(() => {
		handleActiveForDisplay();
	}, [displayName])
	return (
		<Grid item md={12}>
			<TextField
				id='outlined-basic'
				fullWidth
				value={displayName}
				onChange={handleDisplayName}
				label='Display Name'
				variant='outlined'
			/>
		</Grid>
	);
};

export default DisplayName