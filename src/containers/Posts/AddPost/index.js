import React from 'react';
import { Dialog } from '@material-ui/core';
import styles from './AddPost.module.scss';
import TextField from '../../../components/TextField';

const AddPost = ({ open, handleClose }) => {

	return (
		<Dialog
			classes={{ paper: styles.addPost }}
			aria-labelledby='confirmation-dialog-title'
			open={open}
			onClose={handleClose}
		>
			<h6>Add your post to this campaign </h6>
			<TextField
				id='outlined-basic'
				fullWidth
				label='URL'
				fullWidth
				variant='outlined'
			/>
			<div className={styles.uploadSection}>
				<div className={styles.buttonSection}>
					<p>Screenshot</p>
					<button>Upload</button>
				</div>
				<div className={styles.emptySection}>
				</div>
			</div>
			<div className={styles.footer} >
				<span onClick={handleClose}>Cancel</span>
				<button >Send to Brand</button>
			</div>
		</Dialog>
	);

};

export default AddPost;

