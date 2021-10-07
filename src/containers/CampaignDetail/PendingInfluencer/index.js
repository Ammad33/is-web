import React, { useState } from "react";
import styles from "./PendingInfluencer.module.scss";
import { Avatar, Chip, Popover } from "@material-ui/core";
import { ChevronRight, MoreVertical, Download, Mail } from "react-feather";
import clsx from "clsx";
import Activity from "../Activity";
import CampaignDetail from "../CampaignDetail";
import Compensation from "../Compensation";
import Deliverables from "../Deliverables";
import Collections from "../Collections";
import { useHistory } from "react-router-dom";
import PendingCard from "../PendingCard";
import ReviewAndSign from "../ReviewAndSign";
import _ from "lodash";
import InviteCard from "../InviteCard";

const PendingInfluencer = ({
  handleEdit,
  data,
  handleSeeClick,
  getTotal,
  name,
  campaignId,
  internalState,
  getCampaign,
  createMircositeFlag,
  setCreateMicrositeFlag,
}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // const [createMircositeFlag, setCreateMicrositeFlag] = useState(false);
  const [signContractFlag, setSignContractFlag] = useState(false);
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
      {/* {createMircositeFlag ? (<CreateMicroSite
				name={name}
				internalState={internalState}
				campaignId={campaignId}
				internalState={internalState}
				getCampaign={getCampaign}
				influencer={data.influencer && data.influencer !== null ? data.influencer : null}
				brand={data.brand && data.brand !== null ? data.brand : null}
				microsite={data.microsite && data.microsite !== null ? data.microsite : ''}
			/>) : */}
      {signContractFlag ||reviewAndSendFlag  ? (
        <ReviewAndSign
          name={name}
          campaignId={campaignId}
          getCampaign={getCampaign}
          createMircositeFlag={createMircositeFlag}
          internalState={internalState}
          influencer={
            data.influencer && data.influencer !== null ? data.influencer : null
          }
          brand={data.brand && data.brand !== null ? data.brand : null}
          template={
            data.microsite && data.microsite !== null
              ? data.microsite.template
              : ""
          }
          handleCreateMicrosite={() => setCreateMicrositeFlag(true)}
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
              {/* <div className={styles.secondElement} style={{ display: "none" }}>
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
                  className={clsx(styles.campaignStatus, styles.pending)}
                  label={"Pending"}
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
              {data.internalState === "NEGOTIATING"  && data.events[0].description === "Brand counter offered." ? (
                <InviteCard
                  invitationMessage={data.invitationMessage}
                  createdBy={data.brand}
                  campaignId={campaignId}
                  negotiables={
                    data.negotiables && _.keys(_.pickBy(data.negotiables))
                  }
									handleReviewAndSign={() => setReviewAndSendFlag(true)}
                  data={data}
                  negotiations={data.negotiations ? data.negotiations : []}
									getCampaign = {getCampaign}
                />
              ) : (
                <PendingCard
                  handlecreateMircositeFlag={() => setCreateMicrositeFlag(true)}
                  handleSignContractFlag={() => setSignContractFlag(true)}
                  data={data}
                />
              )}

              <Activity activities={data?.events} onClick={handleSeeClick} />
            </div>
            <div className={styles.secondContainer}>
              <div>
                <div className={styles.first}>
                  <CampaignDetail campaign={data} />
                  <Compensation
                    onClick={handleSeeClick}
                    handleEdit={handleEdit}
                    compensation={
                      data && data.compensation && data.compensation !== null
                        ? _.compact(data.compensation)
                        : []
                    }
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

export default PendingInfluencer;
