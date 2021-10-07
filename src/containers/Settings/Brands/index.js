import React, { useState } from 'react';
import styles from './Brand.module.scss';
import { Plus, MoreVertical, Mail, Edit, Trash } from 'react-feather';
import { InputAdornment, Grid, Avatar, Popover } from '@material-ui/core';
import TextField from '../../../components/TextField';
import { Search } from 'react-feather';
import AddBrand from './AddBrand';
import EditBrand from './EditBrand';

const Brands = ({ brands, newBrand, handleNewBrandChange, addNewBrand,
	clearNewBrand, newBrandError }) => {

	const [search, setSearch] = useState('');
	const [anchorEl, setAnchorEl] = React.useState(null);

	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleCloseBrand = () => {
		clearNewBrand();
		setAddOpen(false);
	}

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<>
			<AddBrand open={addOpen} closeAdd={handleCloseBrand}
				brands={brands}
				newBrand={newBrand}
				handleNewBrandChange={handleNewBrandChange}
				addNewBrand={addNewBrand}
				clearNewBrand={clearNewBrand}
				newBrandError={newBrandError}
			/>
			<EditBrand open={editOpen} closeAdd={() => setEditOpen(false)} />
			<div className={styles.inviteContainer}>
				<span onClick={() => setAddOpen(true)} className={styles.inviteSpan}><Plus /> Invite brands to work with</span>
				<p>When you invite other users to FOMO Promo and they sign up and create a campaign, you can get a credit for one campaign. See more details <span>here</span>.</p>
			</div>
			<div className={styles.searchContainer}>
				<TextField
					id='outlined-basic'
					fullWidth
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					label=''
					helperText={" "}
					InputProps={{
						startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
					}}
					variant='outlined'
				/>
			</div>
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
			>
				<div className={styles.popOver}>
					<div className={styles.editDiv} onClick={() => { setEditOpen(true); setAnchorEl(null) }}> <Edit /> <p>Edit </p></div>
					<div className={styles.deleteDiv}> <Trash /> <p>Delete</p></div>
				</div>
			</Popover>
			{[...Array(5)].map((_, i) => {
				return (
					<Grid container alignItems="center" className={styles.influencerItem}>
						<Grid item xs={4} className={styles.itemImage}>
							{i % 2 !== 0 ?
								<div className={styles.withoutAvatar} >
									<Mail />
								</div> :
								<Avatar
									className={styles.avatar}
									src='https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
								/>}
							<p>
								Care / of
                    </p>
						</Grid>
						<Grid item xs={3}>
							<p>
								Lennie James
                    </p>
						</Grid>
						<Grid item xs={3}>
							<p>
								marketing@takecareof.com
                    </p>
						</Grid>
						<Grid item xs={2} >
							<MoreVertical className={styles.moreVerticalStyle} onClick={handleClick} />
						</Grid>
					</Grid>
				)
			})}


		</>
	);
}

export default Brands;