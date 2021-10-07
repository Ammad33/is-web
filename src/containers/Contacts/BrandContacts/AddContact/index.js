import React from 'react';
import { Dialog, Grid } from '@material-ui/core';
import styles from './AddContact.module.scss';
import TextField from '../../../../components/TextField';
import { HelpCircle } from 'react-feather';

const AddContact = ({
	open,
	formData,
	handleFormChange,
	handleAdd,
	setNew,
	closeAdd,
	formError,
	type,
}) => {
	return (
		<Dialog
			classes={{ paper: styles.addContact }}
			aria-labelledby='confirmation-dialog-title'
			open={open}
			onClose={closeAdd}
		>
			<div className={styles.content}>
				<h6>{type === 'Influencer' ? 'Add an influencer' : 'Add a brand'} </h6>
				<div className={styles.subHeadingContainer}>
					<p>
						Add {type === 'Influencer' ? 'influencers' : 'brands'} manually or
            upload an excel file
          </p>
					<HelpCircle />
					<button>Upload</button>
				</div>

				{type === 'Influencer' ? (
					<>
						<Grid
							item
							xs={12}
							className={
								formError.fullName ? styles.errorElement : styles.element
							}
						>
							<TextField
								id='outlined-basic'
								fullWidth
								label='Full Name'
								variant='outlined'
								value={formData.fullName}
								onChange={(e) => handleFormChange(e.target.value, 'fullName')}
								helperText={
									formError.fullName && (
										<span className={styles.errorText}>
											Full name is required{' '}
										</span>
									)
								}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							className={
								formError.instagramHandler
									? styles.errorElement
									: styles.element
							}
						>
							<TextField
								id='outlined-basic'
								fullWidth
								label='Instagram Handle'
								variant='outlined'
								value={formData.instagramHandler}
								onChange={(e) =>
									handleFormChange(e.target.value, 'instagramHandler')
								}
								helperText={
									formError.instagramHandler && (
										<span className={styles.errorText}>
											Instagram Handle is required{' '}
										</span>
									)
								}
							/>
						</Grid>
					</>
				) : (
						<>
							<Grid
								item
								xs={12}
								className={formError.name ? styles.errorElement : styles.element}
							>
								<TextField
									id='outlined-basic'
									fullWidth
									label='Brand Name'
									variant='outlined'
									value={formData.brandName}
									onChange={(e) => handleFormChange(e.target.value, 'brandName')}
									helperText={
										formError.brandName && (
											<span className={styles.errorText}>
												Brand name is required{' '}
											</span>
										)
									}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								className={
									formError.pointOfContact ? styles.errorElement : styles.element
								}
							>
								<TextField
									id='outlined-basic'
									fullWidth
									label='Point of contact name'
									variant='outlined'
									value={formData.pointOfContact}
									onChange={(e) =>
										handleFormChange(e.target.value, 'pointOfContact')
									}
									helperText={
										formError.pointOfContact && (
											<span className={styles.errorText}>
												Point of contact name is required
											</span>
										)
									}
								/>
							</Grid>
						</>
					)}

				<Grid
					item
					xs={12}
					className={formError.email ? styles.errorElement : styles.element}
				>
					<TextField
						id='outlined-basic'
						fullWidth
						label='Email Address'
						variant='outlined'
						value={formData.email}
						onChange={(e) => handleFormChange(e.target.value, 'email')}
						helperText={
							formError.email && (
								<span className={styles.errorText}>
									Email Address is required{' '}
								</span>
							)
						}
					/>
				</Grid>

				{/* <Grid item xs={12} className={styles.element}>
          <p className={styles.or}>OR</p>
        </Grid>

        <Grid
          item
          xs={12}
          className={
            formError.mobilePhone ? styles.errorElement : styles.element
          }
        >
          <TextField
            id='outlined-basic'
            fullWidth
            label='Mobile Number'
            variant='outlined'
            value={formData.mobilePhone}
            onChange={(e) => handleFormChange(e.target.value, 'mobilePhone')}
            helperText={
              formError.mobilePhone && (
                <span className={styles.errorText}>
                  {' '}
                  Mobile Number is required{' '}
                </span>
              )
            }
          />
        </Grid> */}
			</div>
			<div className={styles.footer}>
				<span onClick={closeAdd}>Cancel</span>
				<div>
					<div className={styles.spandiv} onClick={setNew}>
						<div className={styles.circle}></div> <p>Add another</p>
					</div>
					<button onClick={handleAdd}>Add</button>
				</div>
			</div>
		</Dialog>
	);
};

export default AddContact;
