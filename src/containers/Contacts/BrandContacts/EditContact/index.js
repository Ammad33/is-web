import React from 'react';
import { Dialog, Grid } from '@material-ui/core';
import styles from './EditContact.module.scss';
import TextField from '../../../../components/TextField';

const EditContact = ({ open, handleChange, closeAdd }) => {

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
						label='Full name'
						variant='outlined'
						value="Sam Ozkural"
					/>
				</Grid>
				<Grid item xs={12} className={styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Instagram handle'
						variant='outlined'
						value="@samozkural"
					/>
				</Grid>

				<Grid item xs={12} className={styles.element}>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Email address'
						variant='outlined'
						value="samozkural@gmail.com"
					/>
				</Grid>

				{/* <Grid item xs={12} className={styles.element}>
                    <p className={styles.or}>OR</p>
                </Grid>

                <Grid item xs={12} className={styles.element}>
                    <TextField
                        id='outlined-basic'
                        fullWidth
                        label='Mobile number'
                        variant='outlined'

                    />
                </Grid> */}
			</div>
			<div className={styles.footer} >
				<span onClick={closeAdd}>Cancel</span>
				<button disabled={true}>Save</button>
			</div>

		</Dialog>
	);

};

export default EditContact;

