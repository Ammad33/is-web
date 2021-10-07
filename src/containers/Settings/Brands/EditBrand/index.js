import React from 'react';
import { Dialog, Grid } from '@material-ui/core';
import styles from './EditBrand.module.scss';
import TextField from '../../../../components/TextField';

const EditBrand = ({ open, closeAdd }) => {

	return (
		<Dialog
			classes={{ paper: styles.editContact }}
			aria-labelledby='confirmation-dialog-title'
			open={open}
			onClose={closeAdd}
		>
			<div className={styles.content}>
				<h6>Edit </h6>
				<Grid item xs={12} className={styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Brand name'
						variant='outlined'
						value="Care/of"
					/>
				</Grid>
				<Grid item xs={12} className={styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Point of contact name'
						variant='outlined'
						value="Lennie James"
					/>
				</Grid>

				<Grid item xs={12} className={styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Email Address'
						variant='outlined'
						value="marketing@takecareof.com"
					/>
				</Grid>

				<Grid item xs={12} className={styles.element}>
					<p className={styles.or}>OR</p>
				</Grid>

				<Grid item xs={12} className={styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Mobile Number'
						variant='outlined'

					/>
				</Grid>
			</div>
			<div className={styles.footer} >
				<span onClick={closeAdd}>Cancel</span>
				<button disabled={true}>Save</button>
			</div>

		</Dialog>
	);

};

export default EditBrand;

