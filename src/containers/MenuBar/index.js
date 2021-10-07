import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, SvgIcon } from '@material-ui/core';
import styles from './MenuBar.module.scss';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';


const MenuBar = ({ }) => {

	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;


	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			{/* <Dialog
        classes={{ paper: styles.addCampaignDialog }}
        aria-labelledby='confirmation-dialog-title'
        open={open}
      >
        <div className={styles.mainContainer}>
            <DialogTitle className={styles.dialogTitle}>
              asdada
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
              
            </DialogContent>
        </div>
      </Dialog> */}
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Typography>The content of the Popover.</Typography>
			</Popover>

		</>
	);
};

export default MenuBar;
