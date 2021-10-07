import React, { useState } from "react";
import { Avatar, Popover } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";
import {
  MoreVertical,
  Download,
  Copy,
  Mail,
  ChevronRight,
} from "react-feather";
import Activity from "../Activity";
import CampaignDetail from "../CampaignDetail";
import TeamMembers from "../TeamMembers";
import BudgetAndConversion from "../BudgetAndConversion";
import Deliverables from "../Deliverables";
import Collections from "../Collections";
import Compensation from "../Compensation";
import Negotiables from "../Negotiables";
import _ from "lodash";

import styles from "./LostBrandCampaignDetail.module.scss";

const LostBrandCampaignDetail = ({
  handleEdit,
  data,
  handleSeeClick,
  name,
}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
          horizontal: "left",
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
        </div>
      </Popover>
      <div className={styles.mainContainer}>
        <div className={styles.CampaignHeading}>
          <span onClick={() => history.push("/campaigns")}>Campaigns</span>
          <ChevronRight />
          <span>{name}</span>
        </div>
        <div className={styles.campaignBasicInfo}>
          <div className={styles.campaignStatus}>
            <div>
              <h4 className={styles.promotion}>
                Promotion:{" "}
                {data &&
                data.discount &&
                data.discount !== null &&
                data.discount.amount
                  ? data.discount.amount.amount
                  : data &&
                    data.discount &&
                    data.discount !== null &&
                    data.discount.percentage
                  ? data.discount.percentage
                  : ""}{" "}
                {data &&
                data.discount &&
                data.discount !== null &&
                data.discount.percentage
                  ? "%"
                  : data.discount &&
                    data.discount !== null &&
                    data.discount.amount
                  ? "$"
                  : ""}
              </h4>
            </div>
            <div>
              <Chip
                className={clsx(styles[`lostCampaign`])}
                size="small"
                label="Declined"
              />
            </div>
            {data.influencer && (
              <div className={styles.influencerSocial}>
                <Avatar src={data.influencer.imageUrl} />
                <span>{data.influencer.name}</span>
              </div>
            )}
          </div>
          <div>
            <MoreVertical onClick={handleClick} />
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.flexContainer}>
            <div className={styles.campaignLostContainer}>
              <h1>{data.influencer.name} declined your campaign invite</h1>
              {data.declineMessage && (
                <p>"{data.declineMessage && data.declineMessage}"</p>
              )}

              {/* <button onClick={() => handleEdit()}>Create new campaign</button> */}
            </div>
            <Activity activities={data?.events} onClick={handleSeeClick} />
          </div>
          <div className={styles.flexContainer}>
            <CampaignDetail campaign={data} handleEdit={handleEdit}>
              <>
                <h6>Custom Message to Influencer</h6>
                <p>
                  Hi sam, we are so excited for the chance to work with you. We
                  love your content and hope that you see value in working with
                  us.
                </p>
              </>
            </CampaignDetail>
            <TeamMembers
              onClick={handleSeeClick}
              handleEdit={handleEdit}
              brandTeam={data && data.brandTeam !== null ? data.brandTeam : []}
            />
            <BudgetAndConversion handleEdit={handleEdit} data={data} />
          </div>
          <div className={styles.flexContainer}>
            <Collections handleEdit={handleEdit} id={data.id} />
            <Deliverables
              deliverables={data.deliverables}
              handleEdit={handleEdit}
              onClick={handleSeeClick}
              campaign={data}
            />
          </div>
          <div className={styles.flexContainer}>
            <Compensation
              handleEdit={handleEdit}
              onClick={handleSeeClick}
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
            <Negotiables data={data} />
            <div className={styles.negotiableStyle}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LostBrandCampaignDetail;
