import React, { useContext, useEffect, useState } from 'react';
import styles from './AddTeamMembers.module.scss';
import { Avatar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '../../../components/TextField';
import { RootContext } from '../../../context/RootContext';
import { Users } from 'react-feather';
import clsx from 'clsx';
const AddTeamMembers = ({
	search,
	handleSearch,
	selectedMembers,
	handleAdd,
	members,
	handleActiveNext,
}) => {
	const { currentUser } = useContext(RootContext);
	const [teamMembers, setTeamMembers] = useState([]);

	/**activate the next button**/
	useEffect(() => {
		handleActiveNext();
	}, []);

	useEffect(() => {

		const filterdMembers = members && members.filter(
			(memb) => memb.user.id !== currentUser.username
		);
		setTeamMembers(filterdMembers);
	}, [members]);

	return (
		<>
			<div className={styles.padding8}>
				{/* hidden for phase 1*/}
				{/* <TextField
        id='outlined-basic'
        fullWidth
        type='text'
        label='Search or invite by email address'
        variant='outlined'
        value={search}
        onChange={handleSearch}
      /> */}
				<div
					className={clsx(
						styles.mainContainer,
						teamMembers.length ? '' : styles.noPadding
					)}
				>
					{teamMembers.length ? (
						<>
							{teamMembers.map((member) => {
								const index = selectedMembers.findIndex(
									(item) => item === member.user.id
								);
								return (
									<div className={styles.memberRow} key={member.user.id}>
										<Avatar
											alt='Member Img'
											src={
												member.user.imageUrl && member.user.imageUrl !== null
													? member.user.imageUrl
													: ''
											}
											className={styles.memberAvatar}
										/>
										<p className={styles.memberName}>{member.user.fullName}</p>
										{index === -1 ? (
											<button onClick={() => handleAdd(member.user)}> Add</button>
										) : (
												<CheckCircleIcon
													className={styles.svg}
													onClick={() => handleAdd(member.user)}
												/>
											)}
									</div>
								);
							})}
						</>
					) : (
							<div className={styles.noContentContainer}>
								<Users className={styles.img} />
								<h2>No Team Members Yet</h2>
								<p>
									To add team members to a campaign, you must first invite members
									under Team
            </p>
							</div>
						)}
				</div>
			</div>
		</>
	);
};

export default AddTeamMembers;
