import React, { useEffect, useContext, useState } from "react";
import { ChevronRight } from "react-feather";
import { useHistory } from "react-router-dom";
import styles from "./ReviewBrandMicrosite.module.scss";
import { API, graphqlOperation } from "aws-amplify";
import { RootContext } from "../../../context/RootContext";
import Iframe from "react-iframe";
import { Auth } from "aws-amplify";
import Tooltip from "@material-ui/core/Tooltip";

const ReviewBrandMicrosite = ({ name, campaignId }) => {
  const history = useHistory();
  const [campaign, setCampaign] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { brandId, currentUser, setCurrentUser } = useContext(RootContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let id = campaignId.split("#");
    setCampaign(id[1]);
  }, []);

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      cognitoUser.refreshSession(
        currentSession.refreshToken,
        (err, session) => {
          let currentUserAWS = { ...currentUser };
          currentUserAWS.signInUserSession = session;
          setCurrentUser(currentUserAWS);
        }
      );
    } catch (e) {
      console.log("Unable to refresh Token", e);
    }
  };

  const approveMicrosite = async () => {
    try {
      await API.graphql(
        graphqlOperation(
          `mutation myMutation {
						approveMicrosite(brandId: "${brandId}", campaignId: "${campaignId}")
					}`
        )
      );
      window.location.reload();
    } catch (err) {
      console.log("Error In approving microsite", err);
      let message = "";

      if (err.errors && err.errors.length > 0)
        err.errors.forEach((m) => {
          message = message + m.message;
        });

      setErrorMessage(message);
      return null;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.crumsContainer}>
        <span onClick={() => history.push("/campaigns")}>Campaigns</span>
        <ChevronRight />
        <Tooltip title={name}>
          <span onClick={() => history.push("/campaignDetail")}>
            {name.length > 15 ? `${name.substring(0, 15)}...` : name}
          </span>
        </Tooltip>
        <ChevronRight />
        <span>Review Microsite</span>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.secondContainer}>
          <Iframe
            url={`${process.env.REACT_APP_FOMO_URL}/?brandId=${brandId}&campaignId=campaign%23${campaign}&accessToken=${currentUser.signInUserSession.accessToken.jwtToken}`}
            width="100%"
            height="100%"
            id="myId"
            className={styles.secondContainer}
            display="initial"
            position="relative"
          />
        </div>
        <div className={styles.actionsContainer}>
          <div className={styles.declineBtn}>Decline with comments</div>
          <button
            className={styles.approveBtn}
            onClick={() => approveMicrosite()}
          >
            Approve
          </button>
        </div>
        <div className={styles.errorContainer}>
          {errorMessage !== "" && (
            <div className={styles.errorSignContract}>{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewBrandMicrosite;
