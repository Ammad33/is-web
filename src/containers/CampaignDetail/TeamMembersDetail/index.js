import React from 'react';
import { Avatar } from '@material-ui/core';
import ChipButton from '../../../components/ChipButton';
import TextField from '../../../components/TextField';
import styles from './TeamMembersDetail.module.scss';

const TeamMembersDetail = ({
  addInTeam,
  search,
  handleSearch,
  selectedMembers,
  team }) => {

  return (
    <div className={styles.mainContainer}>
      <h3>Team Members</h3>
      <div className={styles.membersContainer}>
        <div className={styles.addedMembersList}>
          {selectedMembers.map((member) => {
            return (
              <div className={styles.listItem} key={member.id}>
                <Avatar src={member.imageUrl} />
                <span>{member.fullName}</span>
              </div>
            );
          })}
        </div>
        <p className={styles.memberHeading}>Add other members to this Campaign</p>
        <TextField
          id='outlined-basic'
          fullWidth
          type='text'
          label='Search or invite by email address'
          variant='outlined'
          value={search}
          onChange={handleSearch}
        />
        <div className={styles.addTeamMembers}>
          <div className={styles.addMembersList}>
            {team.map((member) => {
              return (
                <div className={styles.listItem} key={member.id}>
                  <Avatar src={member.imageUrl} />
                  <span>{member.fullName}</span>
                  <ChipButton
                    handleClick={() => addInTeam(member)}
                    title={'Add'}
                    buttonSize={'sm'}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembersDetail;
