import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core'
import TextField from '../../../components/TextField';

const BrandName = ({ brandName, handlebrandName, handleActiveForBrand }) => {
	useEffect(() => {
		handleActiveForBrand();
	}, [brandName])
	return (
		<Grid item md={12}>
			<TextField
				id='outlined-basic'
				fullWidth
				value={brandName}
				onChange={handlebrandName}
				label='Brand Name'
				variant='outlined'
			/>
		</Grid>
	);
};

export default BrandName;