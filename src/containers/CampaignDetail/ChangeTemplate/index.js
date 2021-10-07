import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import styles from './ChangeTemplate.module.scss';

const CDialog = ({
	onCancel,
	onConfirm,
	open,
	...other
}) => {
	const handleCancel = () => {
		onCancel();
	};

	const handleOk = () => {
		onConfirm();
	};

	return (
		<Dialog
			classes={{ paper: styles.cDialog }}
			disableBackdropClick
			disableEscapeKeyDown
			open={open}
			{...other}
		>
			<DialogContent className={styles.cDialogContent}>
				<span> Are you sure you want to switch templates? </span>
				<p className={styles.cDialogDescription}>You will lose all progress and edits to your previous microsite,
                and will start over with the new one.</p>
			</DialogContent>
			<div className={styles.cDialogActions}>
				<button className={styles.cancel} onClick={handleCancel}>
					Cancel
               </button>
				<button className={styles.confirm} onClick={handleOk}>
					Change Template
               </button>
			</div>
		</Dialog>
	);
};

export default CDialog;
