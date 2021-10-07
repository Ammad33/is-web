import React, { useState } from "react";
import styles from "./InviteInfluencer.module.scss";
import { Avatar, Chip, Popover } from "@material-ui/core";
import { ChevronRight, MoreVertical, Download, Mail } from "react-feather";
import clsx from "clsx";
import Activity from "../Activity";
import CampaignDetail from "../CampaignDetail";
import Compensation from "../Compensation";
import Deliverables from "../Deliverables";
import Collections from "../Collections";
import { useHistory } from "react-router-dom";
import InviteCard from "../InviteCard";
import ReviewAndSign from "../ReviewAndSign";
import _ from "lodash";

const InviteInfluencer = ({
  handleEdit,
  data,
  handleSeeClick,
  getTotal,
  name,
  campaignId,
  internalState,
  handleStatus,
  getCampaign,
  createMircositeFlag,
  setCreateMicrositeFlag,
}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [reviewAndSendFlag, setReviewAndSendFlag] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {reviewAndSendFlag ? (
        <ReviewAndSign
          name={name}
          campaignId={campaignId}
          createMircositeFlag={createMircositeFlag}
          internalState={internalState}
          template={
            data.microsite && data.microsite !== null
              ? data.microsite.template
              : ""
          }
          handleCreateMicrosite={() => setCreateMicrositeFlag(true)}
          influencer={
            data.influencer && data.influencer !== null ? data.influencer : null
          }
          brand={data.brand && data.brand !== null ? data.brand : null}
          getCampaign={getCampaign}
        />
      ) : (
        <>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className={styles.popOver}>
              <div>
                {" "}
                <Mail /> <p> Message Brand</p>
              </div>
              {/* <div className={styles.secondElement}>
									{' '}
									<Download /> <p>Download Campaign</p>
								</div> */}
            </div>
          </Popover>

          <div className={styles.campaignsContainer}>
            <div className={styles.CampaignHeading}>
              <span onClick={() => history.push("/campaigns")}>Campaigns</span>
              <ChevronRight />
              <span>{name}</span>
            </div>
            <div className={styles.subHeadingSection}>
              <div className={styles.subCampaignSubHeading}>
                <p>
                  Estimated Compensation: $
                  {numberWithCommas(
                    Math.trunc(getTotal(data && data.compensation))
                  )}
                </p>
                <div className={styles.borderDiv}></div>
                <Chip
                  className={clsx(styles.campaignStatus, styles.invite)}
                  label={"Invited"}
                />
                <div className={styles.borderDiv}></div>
                {data && data.brand && (
                  <div className={styles.avatarContainer}>
                    <Avatar
                      className={styles.avatar}
                      src={data.brand.imageUrl}
                    />
                    <span>{data.brand.name}</span>
                  </div>
                )}
              </div>
              <MoreVertical onClick={handleClick} />
            </div>

            <div className={styles.firstConatiner}>
              <InviteCard
                invitationMessage={data.invitationMessage}
                createdBy={data.brand}
                campaignId={campaignId}
                handleReviewAndSign={() => setReviewAndSendFlag(true)}
                negotiables={
                  data.negotiables && _.keys(_.pickBy(data.negotiables))
                }
                data={data}
                getCampaign={getCampaign}
              />
              <Activity activities={data?.events} onClick={handleSeeClick} />
            </div>
            <div className={styles.secondContainer}>
              <div>
                <div className={styles.first}>
                  <CampaignDetail campaign={data} handleEdit={handleEdit} />
                  <Compensation
                    compensation={
                      data && data.compensation && data.compensation !== null
                        ? _.compact(data.compensation)
                        : []
                    }
                    onClick={handleSeeClick}
                    handleEdit={handleEdit}
                    targetGrossSales={data.targetGrossSales}
                    paymentSchedule={data.paymentSchedule}
                    deliverables={
                      data && data.deliverables && data.deliverables !== null
                        ? data.deliverables
                        : []
                    }
                    startDate={data && data.startDate}
                    endDate={data && data.endDate}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <Collections
                    handleEdit={handleEdit}
                    products={data.products}
                    id={data.id}
                  />
                </div>
              </div>
              <div className={styles.second}>
                <Deliverables
                  deliverables={data.deliverables}
                  handleEdit={handleEdit}
                  onClick={handleSeeClick}
                  campaign={data}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InviteInfluencer;
