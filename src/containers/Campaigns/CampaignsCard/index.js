import React, { useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "./CampaingsCard.module.scss";
import { Avatar, Popover } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import { RootContext } from "../../../context/RootContext";
import { useHistory } from "react-router-dom";
import { MoreVertical, Download, Copy, Mail, Trash } from "react-feather";
/**
 * campaign {object} contain information of the campaign
 * onClick {function} to display the campaign details
 * handleDelete {function} to delete the campaign card
 **/
const CampaignsCard = ({ campaign, onClick, handleDelete }) => {
  /**RootContext**/
  const { brandType, setActiveRoute } = useContext(RootContext);
  const history = useHistory();

  /**popover states**/
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  /**{function} used to close the popover**/
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProfile = (event, id) => {
    history.push(`/influencerProfile/${id}`);
    setActiveRoute("profile");
    event.stopPropagation();
  };

  const openProfileBrand = (event, id) => {
    history.push(`/brandprofile/${id}`);
    setActiveRoute("profile");
    event.stopPropagation();
  };

  /**{function} used to specify the location of the popover**/
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  let convertedStartDate = "";
  let date = "";
  if (campaign.startDate != null) {
    convertedStartDate = moment(campaign.startDate * 1000).format("MM/DD/YYYY");
    const convertedEndDate = moment(campaign.endDate * 1000).format(
      "MM/DD/YYYY"
    );
    date = convertedStartDate + "-" + convertedEndDate;
  }
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={styles.popOver}>
          <div>
            <Mail /> <p>Message Influencer</p>
          </div>
          <div>
            <Copy /> <p>Duplicate Campaign</p>
          </div>
          <div className={styles.displayNone}>
            <Download /> <p>Download Campaign</p>
          </div>

          {campaign.status === "DRAFT" ? (
            <div onClick={() => handleDelete(campaign.id)}>
              <Trash /> <p>Delete Campaign</p>{" "}
            </div>
          ) : campaign.status === "PENDING" ? (
            <div>
              <Trash /> <p>Cancel Campaign</p>{" "}
            </div>
          ) : campaign.status === "LIVE" ? (
            <div onClick={() => handleDelete(campaign.id)}>
              <Trash /> <p>Stop Campaign</p>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      </Popover>
      <Card className={styles.campaignCard} onClick={onClick}>
        <CardContent className={styles.cardContent}>
        <div className={styles.cardStatus}>
            {brandType === "Influencer" &&
            campaign &&
            campaign.internalState != "MICROSITE_APPROVED" &&
            campaign.internalState != "MICROSITE_APPROVAL_REQUESTED" &&
            campaign.status != "LIVE" ? (
              campaign.internalState == "NEGOTIATING" ? (
                campaign.events[0] && campaign.events[0].description == "Brand counter offered." ? (
                  <span className={styles.alertBadge}>
                    <ErrorOutlineOutlinedIcon className={styles.alertIcon} />
                    Action Required
                  </span>
                ) : (
                  ""
                )
              ) : (
                <span className={styles.alertBadge}>
                  <ErrorOutlineOutlinedIcon className={styles.alertIcon} />
                  Action Required
                </span>
              )
            ) : 

            brandType == "Brand" &&
              campaign.internalState != "INVITED" && 
              campaign.internalState != "MICROSITE_APPROVED" &&
              campaign.internalState != "DECLINED" ? (
                campaign.internalState == "NEGOTIATING" && campaign.internalState ? (
                  campaign.events[0] && campaign.events[0].description == "Influencer has counter offered." ||
                  campaign.events[0] && campaign.events[0].description == "Influencer has requested microsite approval."  ? (
                    <span className={styles.alertBadge}>
                      <ErrorOutlineOutlinedIcon className={styles.alertIcon} />
                      Action Required
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  campaign.internalState != "INFLUENCER_ACCEPTED_TERMS" &&
                  campaign.internalState != "CONTRACT_SIGNED"?
                 <>
                  <span className={styles.alertBadge}>
                    <ErrorOutlineOutlinedIcon className={styles.alertIcon} />
                    Action Required
                  </span>
                </>
              :
            ""
                )
              )
             : (
              ""
            )}
          </div>
          <div className={styles.cardDetails}>
            <div className={styles.campaignInfo}>
              <Tooltip title={campaign.name}>
                <span className={styles.campaignName}>
                  {campaign.name.length > 25
                    ? `${campaign.name.substring(0, 22)}...`
                    : campaign.name}
                </span>
              </Tooltip>
              <span className={styles.campaignNumber}>
                <small>{convertedStartDate != "" ? date : ""}</small>
              </span>
              <div className={styles.wrapChip}>
                {campaign.status !== "" ? (
                  <div>
                    {campaign.status === "INVITED" ? (
                      brandType === "Influencer" ? (
                        <Chip
                          className={clsx(
                            styles.statusInvited,
                            styles[`chip${campaign.status}`]
                          )}
                          label="Invited"
                        />
                      ) : (
                        <Chip
                          className={clsx(
                            styles.statusInvited,
                            styles[`chip${campaign.status}`]
                          )}
                          label="Invited"
                        />
                      )
                    ) : campaign.status === "PENDING" ? (
                      <Chip
                        className={clsx(
                          styles.statusPending,
                          styles[`chip${campaign.status}`]
                        )}
                        label={
                          campaign.status && campaign.status.toProperCase()
                        }
                      />
                    ) : campaign.status === "DRAFT" ? (
                      <Chip
                        className={clsx(
                          styles.statusDraft,
                          styles[`chip${campaign.status}`]
                        )}
                        label={
                          campaign.status && campaign.status.toProperCase()
                        }
                      />
                    ) : campaign.status === "LIVE" ? (
                      <Chip
                        className={clsx(
                          styles.statusLive,
                          styles[`chip${campaign.status}`]
                        )}
                        label={
                          campaign.status && campaign.status.toProperCase()
                        }
                      />
                    ) : campaign.status === "CLOSED" ? (
                      <Chip
                        className={clsx(
                          styles.statusClosed,
                          styles[`chip${campaign.status}`]
                        )}
                        label={
                          campaign.status && campaign.status.toProperCase()
                        }
                      />
                    ) : campaign.status === "DECLINED" ? (
                      <Chip
                        className={clsx(
                          styles.statusDeclined,
                          styles[`chip${campaign.status}`]
                        )}
                        label={
                          campaign.status && campaign.status.toProperCase()
                        }
                      />
                    ) : (
                      <Chip
                        className={clsx(
                          styles.statusPending,
                          styles[`chip${campaign.status}`]
                        )}
                        label={
                          campaign.status && campaign.status.toProperCase()
                        }
                      />
                    )}
                  </div>
                ) : (
                  ""
                )}
                {campaign && campaign.influencer != null ? (
                  <>
                    <Avatar
                      onClick={(event) =>
                        openProfile(event, campaign.influencer.id)
                      }
                      className={styles.personAvatar}
                      src={campaign.influencer.imageUrl}
                    />
                    <span
                      onClick={(event) =>
                        openProfile(event, campaign.influencer.id)
                      }
                      className={styles.mediaTag}
                    >
                      {campaign.influencer.name != null
                        ? campaign.influencer.name
                        : ""}
                    </span>{" "}
                  </>
                ) : campaign && campaign.brand != null ? (
                  <>
                    <Avatar
                      onClick={(event) =>
                        openProfileBrand(event, campaign.brand.id)
                      }
                      className={styles.personAvatar}
                      src={campaign.brand.imageUrl}
                    />
                    <span
                      className={styles.mediaTag}
                      onClick={(event) =>
                        openProfileBrand(event, campaign.brand.id)
                      }
                    >
                      {campaign.brand != null ? campaign.brand.name : ""}
                    </span>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles.iconInfo}>
              <MoreVertical onClick={handleClick} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CampaignsCard;
