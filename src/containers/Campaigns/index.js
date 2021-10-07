import React, { useState, useEffect, useContext } from "react";
import { Grid, Popover } from "@material-ui/core";
import CampaignsCard from "./CampaignsCard";
import AddIcon from "@material-ui/icons/Add";
import styles from "./Campaings.module.scss";
import AddCampaign from "../AddCampaign";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import SVG from "react-inlinesvg";
import { RootContext } from "../../context/RootContext";
import _ from "lodash";
import meQuery from "../../GraphQL/MeQuery";
import getBrandCampaignsQuery from "../../GraphQL/getBrandCampaignsQuery";
import getInfluencerCampaignQuery from "../../GraphQL/getInfluencerCampaignQuery";
import deleteCampaignMutation from "../../GraphQL/deleteCampaignMutation";

/*******************SVG functions ***********************************/
const IconCampaign = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Campaigns_large.svg`} />;
};

const ChevronDown = () => {
  return (
    <span className={styles.dropDownCustomizeSvg}>
      <SVG src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`} />
    </span>
  );
};
const ChevronUp = () => {
  return (
    <span className={styles.dropDownCustomizeSvg}>
      <SVG src={`${process.env.PUBLIC_URL}/images/chevron-up.svg`} />
    </span>
  );
};
/*******************************************************************/

/**main component */
const Campaigns = () => {
  /**state variables */
  const history = useHistory();
  const [active, setActive] = useState("ALL");
  const [campaigns, setCampaigns] = useState([]);
  const [bkupCampaigns, setBkupCampaigns] = useState([]);
  const [addCampaign, setAddCampagin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  /**************** */

  /**rootContext */
  const {
    brandId,
    setBrands,
    searchValue,
    brandType,
    setInfluencers,
    setBrandIdd,
    setBrandName,
    setShowLoader,
    setBrandType,
    setActiveRoute,
    currentUser,
    setCurrentUser,
  } = useContext(RootContext);
  /**************** */

  /**state variables */
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("Recent Activity");
  const [brandDropDown, setBrandDropDown] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  /*************************/

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

  /**decide the position of the popover(dropdown) */

  const handleClick = (event) => {
    setBrandDropDown(true);
    setAnchorEl(event.currentTarget);
  };

  /**close the popover */
  const handleClose = () => {
    setAnchorEl(null);
    setBrandDropDown(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (!brandId || brandId === "") {
      getMeData();
    }
  }, []);

  /**API call to get influencers and brands data*/

  const getMeData = async () => {
    try {
      const result = await meQuery();
      /**seprating brands and influencers data */
      if (result.error === false) {
        let brandsData = [];
        let influencersData = [];
        result.data.organizations !== null &&
          result.data.organizations.forEach((item) => {
            if (item.organization.__typename === "Influencer") {
              influencersData.push(item);
            } else if (item.organization.__typename === "Brand") {
              brandsData.push(item);
            }
          });
        setBrands(brandsData);
        setInfluencers(influencersData);
        if (brandsData.length > 0) {
          setBrandName(brandsData[0].organization.name);
          setBrandIdd(brandsData[0].organization.id);
          setBrandType(brandsData[0].organization.__typename);
        } else if (influencersData.length > 0) {
          setBrandName(influencersData[0].organization.name);
          setBrandIdd(influencersData[0].organization.id);
          setBrandType(influencersData[0].organization.__typename);
        }
        setErrorMessage("");
      } else {
        setErrorMessage(result.message);
      }
    } catch (e) {
      if (e) {
        setErrorMessage(e);
      }
    }
  };

  /**API call to get the campaigns information */
  const getCampaigns = async () => {
    try {
      setLoading(true);
      setShowLoader(true);
      const result = await getBrandCampaignsQuery(brandId);
      if (result.error === false) {
        let myArray = _.sortBy(result.data, function (dateObj) {
          return new Date(dateObj.created);
        }).reverse();
        setCampaigns(myArray);
        setBkupCampaigns(result.data);
        setLoading(false);
        setShowLoader(false);
        setErrorMessage("");
      } else {
        setErrorMessage(result.message);
      }
    } catch (e) {
      setLoading(false);
      setShowLoader(false);
      setErrorMessage(e);
    }
  };

  /**API call to get the campaigns information of the influencer */
  const getInfluencerCampaigns = async () => {
    try {
      setLoading(true);
      setShowLoader(true);
      const result = await getInfluencerCampaignQuery(brandId);
      if (result.error === false) {
        let myArray = _.sortBy(result.data, function (dateObj) {
          return new Date(dateObj.created);
        }).reverse();
        setCampaigns(myArray);
        setErrorMessage("");
      } else {
        setErrorMessage(result.message);
      }
      setLoading(false);
      setShowLoader(false);
    } catch (e) {
      setLoading(false);
      setShowLoader(false);
      setErrorMessage(e);
    }
  };

  useEffect(() => {
    if (brandId !== "") {
      setCampaigns([]);
      if (brandType === "Brand") {
        getCampaigns();
      } else if (brandType === "Influencer") {
        getInfluencerCampaigns();
      }
    }
  }, [brandId, addCampaign, brandType]);

  /**handling search bar changes */
  useEffect(() => {
    searchCampaigns();
  }, [searchValue]);

  const searchCampaigns = () => {
    let copiedCampaigns = [...bkupCampaigns];
    if (searchValue.trim()) {
      copiedCampaigns = copiedCampaigns.filter((campaign) => {
        return (
          campaign.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
        );
      });
    }
    setCampaigns(copiedCampaigns);
  };

  /**{function} to delete the campaign*/
  const handleDelete = async (campaignId) => {
    setErrorMessage("");
    try {
      let result = await deleteCampaignMutation({
        brandId: brandId,
        id: campaignId,
      });

      if (result.error === false) {
        setErrorMessage("");
        getCampaigns();
      } else {
        setErrorMessage(result.message);
      }
    } catch (e) {
      setErrorMessage(e);
    }
  };

  /**sorting the campaigns */
  const onSort = (value) => {
    setSelectedState(value);
    if (value === "Recent Activity") {
      let data = [...campaigns];
      let myArray = _.sortBy(data, function (dateObj) {
        return new Date(dateObj.created);
      }).reverse();
      setCampaigns(myArray);
      setAnchorEl(null);
      setBrandDropDown(false);
    }
    if (value === "Alphabetical") {
      let data = [...campaigns];
      let myArray = _.sortBy(data, (o) => o.name.toLowerCase());
      setCampaigns(myArray);
      setAnchorEl(null);
      setBrandDropDown(false);
    }
  };

  /**{function} to handle the selected campaign card
   * push the campaign detail page in browser
   */

  const handleCampaginDetail = (id) => {
    history.push(`/campaignDetail/${id}`, { campaignId: id });
    setActiveRoute("campaignDetail");
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            width: "206px",
          },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={styles.popOver}>
          <div onClick={() => onSort("Recent Activity")}>
            <p>Recent Activity</p>
          </div>
          <div onClick={() => onSort("Alphabetical")}>
            <p>Alphabetical</p>
          </div>
        </div>
      </Popover>

      {addCampaign && (
        <AddCampaign
          open={addCampaign}
          handleCancel={() => setAddCampagin(false)}
          brandId={brandId}
        />
      )}
      <div className={styles.campaignsContainer}>
        <div className={styles.CampaignHeadingContainer}>
          <div className={styles.CampaignHeading}>
            <span>Campaigns</span>
            <div onClick={handleClick}>
              <p>{selectedState}</p>
              <div className={styles.brandDropDownSVG}>
                {brandDropDown ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>
          </div>
          {brandType === "Brand" ? (
            <button onClick={() => setAddCampagin(true)}>
              <AddIcon /> New Campaign
            </button>
          ) : (
            ""
          )}
        </div>
        <div className={styles.CampaignHeadingButton}>
          <button
            className={active === "ALL" ? styles.allActive : ""}
            onClick={() => setActive("ALL")}
          >
            All
          </button>
          {brandType === "Brand" ? (
            <button
              className={active === "DRAFT" ? styles.draftActive : ""}
              onClick={() => setActive("DRAFT")}
            >
              Draft
            </button>
          ) : (
            <button
              className={active === "INVITED" ? styles.inviteActive : ""}
              onClick={() => setActive("INVITED")}
            >
              Invited
            </button>
          )}
          {brandType === "Brand" ? (
            <button
              className={active === "INVITED" ? styles.inviteActive : ""}
              onClick={() => setActive("INVITED")}
            >
              Invited
            </button>
          ) : (
            <button
              className={active === "PENDING" ? styles.pendingActive : ""}
              onClick={() => setActive("PENDING")}
            >
              Pending
            </button>
          )}
          {brandType === "Brand" ? (
            <button
              className={active === "PENDING" ? styles.pendingActive : ""}
              onClick={() => setActive("PENDING")}
            >
              Pending
            </button>
          ) : (
            ""
          )}

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
        {campaigns.length === 0 && !loading ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={styles.CampaignsGrid}
          >
            <Grid item xs={12}>
              <IconCampaign />
            </Grid>
            <Grid item xs={12}>
              <div className={styles.noCampaignYet}>No Campaigns Yet</div>
            </Grid>
            <Grid item xs={12}>
              <div className={styles.noCampaignYetHelper}>
                Click on the New Campaign button to start creating a campaign.
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
                <Grid className={styles.gridItem} item key={campaign.id}>
                  <CampaignsCard
                    campaign={campaign}
                    onClick={() => {
                      handleCampaginDetail(campaign.id);
                    }}
                    handleDelete={handleDelete}
                  />
                </Grid>
              );
            })}
        </Grid>
        {errorMessage !== "" && (
          <div className={styles.errorMessageContainer}>{errorMessage}</div>
        )}
      </div>
    </>
  );
};
export default Campaigns;
