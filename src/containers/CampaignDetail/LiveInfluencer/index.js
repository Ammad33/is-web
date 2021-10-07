import React, { useState, useContext } from "react";
import styles from "./LiveInfluencer.module.scss";
import { Avatar, Chip, Popover } from "@material-ui/core";
import {
  ChevronRight,
  MoreVertical,
  Download,
  Mail,
  Link,
  Copy,
} from "react-feather";
import clsx from "clsx";
import Performance from "../Performance";
import Posts from "../Posts";
import Activity from "../Activity";
import CampaignDetail from "../CampaignDetail";
import Compensation from "../Compensation";
import Deliverables from "../Deliverables";
import Collections from "../Collections";
import Contract from "../Contract";
import LiveCard from "../LiveCard";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { RootContext } from "../../../context/RootContext";
import copy from "copy-to-clipboard";

const LiveInfluencer = ({
  handleEdit,
  data,
  handleSeeClick,
  getTotal,
  name,
}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [copySuccess, setCopySuccess] = useState("");

  const { setToastrData } = useContext(RootContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
          <div className={`${styles.secondElement} ${styles.displayNone}`}>
            {" "}
            <Download /> <p>Download Campaign</p>
          </div>
          {/* <div className={styles.secondElement} onClick={handleDelete}>
						<Trash /> <p>Delete Campaign</p>
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
            <div
              onClick={() => {
                copyToClipBoard(data.micrositeUrl);
              }}
              className={styles.micrositeContainer}
            >
              <div className={styles.linkIconAndName}>
                <Link />
                <span>Copy Microsite Link</span>
              </div>
              <Copy/>
            </div>
            <p>
              Estimated Compensation: $
              {numberWithCommas(
                Math.trunc(getTotal(data && data.compensation))
              )}
            </p>
            <div className={styles.borderDiv}></div>
            <Chip
              className={clsx(styles.campaignStatus, styles.live)}
              label={"Live"}
            />
            <div className={styles.borderDiv}></div>
            {data && data.brand && (
              <div className={styles.avatarContainer}>
                <Avatar className={styles.avatar} src={data.brand.imageUrl} />
                <span>{data.brand.name}</span>
              </div>
            )}
          </div>
          <MoreVertical onClick={handleClick} />
        </div>

        {/* <Performance /> */}
        <div className={styles.firstConatiner}>
          <LiveCard />
          <Activity activities={data?.events} onClick={handleSeeClick} />
        </div>
        <div className={styles.performanceContainer}>
          <Performance />
        </div>
        <Posts width={true} />
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
            <div className={styles.collectionContainer}>
              <Collections handleEdit={handleEdit} id={data.id} />
            </div>
          </div>
          <div className={styles.second}>
            <Deliverables
              deliverables={data.deliverables}
              handleEdit={handleEdit}
              onClick={handleSeeClick}
              campaign={data}
            />
            <Contract />
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveInfluencer;
