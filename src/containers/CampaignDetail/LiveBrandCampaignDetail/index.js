import React, { useState, useRef, useContext } from "react";
import { Avatar, Popover } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";
import {
  MoreVertical,
  Download,
  Mail,
  ChevronRight,
  XCircle,
  Copy,
  Link,
} from "react-feather";
import Activity from "../Activity";
import CampaignDetail from "../CampaignDetail";
import TeamMembers from "../TeamMembers";
import BudgetAndConversion from "../BudgetAndConversion";
import Deliverables from "../Deliverables";
import Collections from "../Collections";
import Compensation from "../Compensation";
import Negotiables from "../Negotiables";
import Posts from "../Posts";
import Contract from "../Contract";
import _ from "lodash";
import styles from "./LiveBrandCampaignDetail.module.scss";
import Translation from "../../../assets/translation.json";
import StopDialog from "../../../components/CancellationDialog";
import { RootContext } from "../../../context/RootContext";
import copy from "copy-to-clipboard";

const LiveBrandCampaignDetail = ({
  handleEdit,
  data,
  handleSeeClick,
  name,
}) => {
  const reasons = [
    "Agreement violated",
    "Inventory low",
    "Both parties agree to cancel the campaign",
    "Other (specify below)",
  ];
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [stop, setStop] = useState(false);
  const [stopReason, setStopReason] = useState("");
  const [reasonDetail, setReasonDetail] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const { setToastrData } = useContext(RootContext);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleStopReason = (val) => {
    setStopReason(val);
  };
  const handleStopDialogOpen = () => {
    setStop(true);
    handleClose();
  };
  const handleReasonDetail = (val) => {
    setReasonDetail(val);
  };

  const copyToClipBoard = async (copyMe) => {
    try {
      copy(copyMe);
      setCopySuccess("Copied!");
      setToastrData({
        severity: "success",
        message: "Copied to clipboard.",
        showToastr: true,
      });
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <>
      <StopDialog
        open={stop}
        handleClose={() => setStop(false)}
        reason={stopReason}
        reasons={reasons}
        handleReason={handleStopReason}
        message={Translation.DIALOG.CAMPAIGN_STOP_DIALOG_MSG}
        buttonText="Stop Campaign"
        handleReasonDetail={handleReasonDetail}
        reasonDetail={reasonDetail}
      />
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
          <div onClick={() => handleStopDialogOpen()}>
            <XCircle /> <p>Stop Campaign</p>
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
            <div className={styles.micrositeContainer}   onClick={() => {
                  copyToClipBoard(data.micrositeUrl);
                }}>
              <div className={styles.linkIconAndName}>
                <Link />
                <span>Copy Microsite Link</span>
              </div>
              <Copy/>
            </div>
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
                  : data &&
                    data.discount &&
                    data.discount !== null &&
                    data.discount.amount
                  ? "$"
                  : ""}
              </h4>
            </div>
            <div>
              <Chip
                className={clsx(styles[`liveCampaign`])}
                size="small"
                label="Live"
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
            <Posts />
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
            <Collections
              handleEdit={handleEdit}
              products={data.products}
              id={data.id}
            />
            <Deliverables
              deliverables={data.deliverables}
              handleEdit={handleEdit}
              onClick={handleSeeClick}
              campaign={data}
            />
          </div>
          <div className={styles.flexContainer}>
            <Compensation
              compensation={
                data && data.compensation && data.compensation !== null
                  ? _.compact(data.compensation)
                  : []
              }
              handleEdit={handleEdit}
              onClick={handleSeeClick}
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
            <Contract />
          </div>
          <div className={styles.micrositeStyle}>
            {" "}
            {data && data.micrositeUrl && data.micrositeUrl}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveBrandCampaignDetail;
