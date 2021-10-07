import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CampaignsCard from "./CampaignsCard";
import styles from "./Campaings.module.scss";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import SVG from "react-inlinesvg";

const IconCampaign = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Campaigns_large.svg`} />;
};
const Influencer = () => {
  const history = useHistory();
  const [active, setActive] = useState("ALL");
  const [campaigns, setCampaigns] = useState([]);

  const getCampaigns = async () => {
    try {
      const campaigns = await API.graphql({
        query: `{
					campaigns(brandId: "bd809ffa-35d6-4e93-b0a9-ffc6f4f28451") {
						campaigns {
							name
							description
							id
							status
							startDate
							endDate
						}
					}
				}`,
      });
      setCampaigns(campaigns.data.campaigns.campaigns);
    } catch (e) {}
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <>
      <div className={styles.campaignsContainer}>
        <div className={styles.CampaignHeadingContainer}>
          <div className={styles.CampaignHeading}>
            <span>Campaigns</span>
            <p>
              Most recent <ExpandMoreIcon fontSize="small" />
            </p>
          </div>
        </div>
        <div className={styles.CampaignHeadingButton}>
          <button
            className={active === "ALL" ? styles.allActive : ""}
            onClick={() => setActive("ALL")}
          >
            All
          </button>
          <button
            className={active === "INVITE" ? styles.inviteActive : ""}
            onClick={() => setActive("INVITE")}
          >
            Invite
          </button>
          <button
            className={active === "PENDING" ? styles.pendingActive : ""}
            onClick={() => setActive("PENDING")}
          >
            Pending
          </button>
          <button
            className={active === "LIVE" ? styles.liveActive : ""}
            onClick={() => setActive("LIVE")}
          >
            Live
          </button>
          <button
            className={active === "CLOSED" ? styles.closedActive : ""}
            onClick={() => setActive("CLOSED")}
          >
            Closed
          </button>
          <button
            className={active === "DECLINED" ? styles.declinedActive : ""}
            onClick={() => setActive("DECLINED")}
          >
            Declined
          </button>
        </div>
        {campaigns.length === 0 ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={styles.campaignContainer}
          >
            <Grid item xs={12}>
              <IconCampaign />
            </Grid>
            <Grid item xs={12}>
              <div className={styles.noCampaignYet}>No Campaigns Yet</div>
            </Grid>
            <Grid item xs={12}>
              <div className={styles.noCampaignYetHelper}>
                Your campaigns will be available here once a brand invites you.
              </div>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        <Grid container spacing={3}>
          {campaigns.length > 0 &&
            campaigns.map((campaign) => {
              if (campaign.status !== active && active !== "ALL") {
                return null;
              }
              return (
                <Grid
                  className={styles.gridItem}
                  item
                  key={campaign.id}
                  onClick={() => history.push("/campaignDetail")}
                >
                  <CampaignsCard campaign={campaign} />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </>
  );
};

export default Influencer;
