import React, { useEffect } from 'react';
import { Grid, InputAdornment, Dialog } from '@material-ui/core';
import styles from './EditBrand.module.scss';
import TextField from '../../../../../components/TextField';
import { HelpCircle } from 'react-feather';


const EditBrand = ({ open, closeAdd, name,
	handleName,
	website,
	handleWebsite,
	phoneNumber,
	handlePhoneNumber,
	bio,
	handleBio,
	handleActiveSave,
	handleUpdate,
	email,
	activeSave,
	handleEmail,
	errorMessage }) => {


	useEffect(() => {
		handleActiveSave();
	}, [name, email, phoneNumber, bio, website])

	return (
		<Dialog
			classes={{ paper: styles.editContact }}
			aria-labelledby='confirmation-dialog-title'
			open={open}
			onClose={closeAdd}
		>
			<div className={styles.content}>
				<h6>Brand Information</h6>
				<Grid item xs={12} className={styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Brand Name'
						variant='outlined'
						value={name}
						onChange={handleName}
					/>
				</Grid>
				<Grid item xs={12} className={styles.element}>
					<TextField
						className={styles.bio}
						id='outlined-basic'
						fullWidth
						label='Bio'
						variant='outlined'
						value={bio}
						onChange={handleBio}
					/>
				</Grid>

				<Grid item xs={12} className={styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Email'
						variant='outlined'
						value={email}
						onChange={handleEmail}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<HelpCircle />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12} className={styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Website URL'
						variant='outlined'
						value={website}
						onChange={handleWebsite}
					/>
				</Grid>


				<Grid item xs={12} className={styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Mobile Number'
						variant='outlined'
						value={phoneNumber}
						onChange={handlePhoneNumber}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<HelpCircle />
								</InputAdornment>
							),
						}}

					/>
				</Grid>
				{

					errorMessage !== '' &&
					<Grid item xs={12} className={styles.element}>
						<p className={styles.error}>{errorMessage}</p>
					</Grid>
				}
			</div>
			<div className={styles.footer} >
				<span onClick={closeAdd}>Cancel</span>
				<button disabled={activeSave} className={activeSave ? styles.disabledClass : ''} onClick={handleUpdate}>Save</button>
			</div>

		</Dialog>
	);

};

export default EditBrand;

