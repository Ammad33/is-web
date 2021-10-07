import React, { useState } from 'react';
import { Edit } from 'react-feather';
import styles from './InfluencerCategories.module.scss';
import Chip from '@material-ui/core/Chip';
import { Popover } from '@material-ui/core';
import EditInfluencerCategories from './EditInfluencerCategories';

const InfluencerCategories = ({ isOwner }) => {
	const [editOpen, setEditOpen] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return (
		<div className={styles.influencerInfoContainer}>
			<div className={styles.headerContainer}>
				<h1>Influencing Categories</h1>
				{isOwner ? (
					<Edit
						onClick={() => {
							setEditOpen(true);
							setAnchorEl(null);
						}}
					/>
				) : (
						''
					)}
			</div>
			<EditInfluencerCategories
				open={editOpen}
				closeAdd={() => setEditOpen(false)}
			/>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			></Popover>

			<div className={styles.detailSubContent}>
				<Chip
					size='medium'
					label='Active Lifestyle'
					className={styles.Lifestyle}
				/>
				<Chip
					size='medium'
					label='Beauty'
					className={styles.Beauty}

				/>
				<Chip
					size='medium'
					label='Clean Editing'
					className={styles.Editing}

				/>
				<Chip
					size='medium'
					label='Fitness'
					className={styles.Fitness}
				/>
				<Chip
					size='medium'
					label='Healthy Living'
					className={styles.Living}
				/>
			</div>
		</div>
	);
};

export default InfluencerCategories;
