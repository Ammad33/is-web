import React, { useState, useEffect, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";
import styles from "./Team.module.scss";
import { API } from "aws-amplify";
import SVG from "react-inlinesvg";
import { RootContext } from "../../context/RootContext";
import AddMember from "./AddMember";
import TeamData from "./TeamData";

const NoUser = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/noUsers.svg`} />;
};

const Team = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [teams, setTeam] = useState([]);
  const { brandId } = useContext(RootContext);

  useEffect(() => {
    getTeam();
  }, []);

  const getTeam = async () => {
    try {
      const team = await API.graphql({
        query: `{
          brand(id:"${brandId}") {
            roles{
              id
              name
              administration
            }
            users {
              user {
                imageUrl
                id
                fullName
								email			
              }
              role{
                id
                name
                administration
              }
            }
          }
        }`,
      });
      if (team.data !== null && team.data.brand !== null) {
        setTeam(team.data.brand.users);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveMember = (index) => {};

  const closeHandle = () => {
    setAddOpen(false);
  };

  return (
    <>
      <AddMember open={addOpen} closeAdd={closeHandle} />

      <div className={styles.TeamContainer}>
        <div className={styles.TeamHeadingContainer}>
          <div className={styles.TeamHeading}>
            <span>Team</span>
          </div>
          <button onClick={() => setAddOpen(true)}>
            <AddIcon /> Add Member
          </button>
        </div>
      </div>

      {teams.length === 0 ? (
        <div>
          <div className={styles.noMembers}>
            <Grid alignItems="center">
              <NoUser />
            </Grid>
          </div>
          <div className={styles.noMembersText}>
            <h6>No Team Members Yet</h6>
            <p>Add team or agency members to help you manage campaigns</p>
          </div>
        </div>
      ) : (
        <div className={styles.TeamInfoContainer}>
          {teams && teams !== null
            ? teams.map((team, index) => (
                <TeamData
                  TeamMembers={team}
                  length={teams.length}
                  index={index}
                  handleRemoveMember={handleRemoveMember}
                />
              ))
            : ""}
        </div>
      )}
    </>
  );
};

export default Team;
