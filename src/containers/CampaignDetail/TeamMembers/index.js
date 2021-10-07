import React, { useState, useEffect, useContext } from 'react';
import styles from './TeamMembers.module.scss';
import { Edit } from 'react-feather';
import { Avatar } from '@material-ui/core';
import ChipButton from './../../../components/ChipButton';
import { RootContext } from '../../../context/RootContext';



const TeamMembers = ({ onClick, handleEdit, brandTeam, status }) => {

	const [teamMembers, setTeamMembers] = useState([]);
	const { currentUser } = useContext(RootContext);
	const team = teamMembers && teamMembers.length > 0 ? teamMembers.slice(0, 5) : [];


	useEffect(() => {
		const filterdMembers = brandTeam.filter(
			(memb) => memb.id !== currentUser.username
		);
		setTeamMembers(filterdMembers);
	}, [brandTeam]);

	return (
		<div className={styles.mainContainer}>
			<div className={styles.headerContainer}>
				<h3>Team Members</h3>
				{(status && status === 'DRAFT') ? (
					<Edit onClick={() => handleEdit(2)} />
				) : (
						''
					)}
			</div>
			<div className={styles.membersContainer}>
				{teamMembers && teamMembers.length > 0 ?
					<>
						{team.map((member) => {
							return (
								<div className={styles.memberItem}>
									<Avatar src={member.imageUrl} />
									<span>{member.fullName}</span>
								</div>
							);
						})}
					</>
					:
					(<p className={styles.noTeamMember} > No team members have been added to this campaign.</p>)
				}

			</div>
			{teamMembers && teamMembers !== null && teamMembers.length > 5 &&
				<div className={styles.teamMemberStyle}>
					<ChipButton

						handleClick={() => onClick('TeamMembers')}
						title={'See all'}
						buttonSize={'sm'}
					/>
				</div>
			}
		</div>
	);
};

export default TeamMembers;
