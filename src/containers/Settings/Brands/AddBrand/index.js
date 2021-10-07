import React from 'react';
import { Dialog, Grid } from '@material-ui/core';
import styles from './AddBrand.module.scss';
import TextField from '../../../../components/TextField';
import { HelpCircle } from 'react-feather';

const AddBrand = ({ open, closeAdd, newBrand, handleNewBrandChange, addNewBrand,
	clearNewBrand, newBrandError }) => {

	return (
		<Dialog
			classes={{ paper: styles.addContact }}
			aria-labelledby='confirmation-dialog-title'
			open={open}
			onClose={closeAdd}
		>
			<div className={styles.content}>
				<h6>Add a brand </h6>
				<div className={styles.subHeadingContainer}>
					<p>Add brands manually or upload an excel file</p>
					<HelpCircle />
					<button>Upload</button>
				</div>

				<Grid item xs={12} className={newBrandError.brandName ? styles.errorElement : styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Brand name'
						variant='outlined'
						value={newBrand.brandName}
						onChange={(e) => handleNewBrandChange(e.target.value, 'brandName')}
						helperText={
							newBrandError.brandName && (
								<span className={styles.errorText}>Brand name is required </span>
							)
						}
					/>
				</Grid>
				<Grid item xs={12} className={newBrandError.pocName ? styles.errorElement : styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Point of contact name'
						variant='outlined'
						value={newBrand.pocName}
						onChange={(e) => handleNewBrandChange(e.target.value, 'pocName')}
						helperText={
							newBrandError.pocName && (
								<span className={styles.errorText}>Point of contact name is required </span>
							)
						}
					/>
				</Grid>

				<Grid item xs={12} className={newBrandError.email ? styles.errorElement : styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Email Address'
						variant='outlined'
						value={newBrand.email}
						onChange={(e) => handleNewBrandChange(e.target.value, 'email')}
						helperText={
							newBrandError.email && (
								<span className={styles.errorText}>Email Address is required </span>
							)
						}
					/>
				</Grid>

				<Grid item xs={12} className={styles.element}>
					<p className={styles.or}>OR</p>
				</Grid>

				<Grid item xs={12} className={newBrandError.mobilePhone ? styles.errorElement : styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Mobile Number'
						variant='outlined'
						value={newBrand.mobilePhone}
						onChange={(e) => handleNewBrandChange(e.target.value, 'mobilePhone')}
						helperText={
							newBrandError.mobilePhone && (
								<span className={styles.errorText}>Mobile Number is required </span>
							)
						}
					/>
				</Grid>
			</div>
			<div className={styles.footer} >
				<span onClick={closeAdd}>Cancel</span>
				<div>
					<div className={styles.spandiv} onClick={clearNewBrand} ><div className={styles.circle}></div> <p>Add another</p></div>
					<button onClick={addNewBrand}>Add</button>
				</div>
			</div>

		</Dialog>
	);

};

export default AddBrand;

