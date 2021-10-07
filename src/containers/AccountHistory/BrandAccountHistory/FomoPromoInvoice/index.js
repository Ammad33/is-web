import React, { useState, useEffect } from "react";
import styles from "./FomoPromoInvoice.module.scss";
import { Download, Share2 } from "react-feather";
import SVG from "react-inlinesvg";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import clsx from "clsx";

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

const PlusSVG = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/plus1.svg`} />;
};

const MinusSVG = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/minus1.svg`} />;
};

const FomoPromoInvoice = ({ data, handleExpandClick, expanded }) => {
  var nf = new Intl.NumberFormat();
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Brand");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeUserFee, setActiveUserFee] = useState(0);
  const [activeCampaign, setActiveCampaign] = useState(0);
  const [gmvFee, setGmvFee] = useState(0);

  const calculateFee = (num1, num2, num3, num4, num5, num6) => {
    setActiveUserFee(num1 * num4);
    setActiveCampaign(num2 * num5);
    setGmvFee(num3 * num6);
  };

  const handleClick = (event) => {
    setFilterDropdown(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setFilterDropdown(false);
  };

  const handleFilter = (event) => {
    setSelectedFilter(event.currentTarget.dataset["value"]);
    handleClose();
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className={styles.mainContainer}>
        <span>
          {" "}
          Update your billing preferences in{" "}
          <Link to="/settings" className={styles.link}>
            settings.
          </Link>
        </span>
        <div className={styles.dateFilter}>
          <p>
            <div>
              <div onClick={handleClick} className={styles.brandDropDown}>
                2020
                <div className={styles.brandDropDownSVG}>
                  {filterDropdown ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
            </div>
          </p>
        </div>
        <div className={styles.fomoPromoInvoiceInfoContainer}>
          <div className={styles.fomoPromoInvoiceContainer}>
            <div className={styles.contentContainer}>
              {data &&
                data != null &&
                data.map((item, index) => {
                  return (
                    <div>
                      <CardActions disableSpacing>
                        <div className={styles.contentDownload}>
                          {" "}
                          <Download />
                        </div>
                        <div className={styles.contentInvoice}>
                          {" "}
                          November 2020 Invoice
                        </div>
                        <div className={styles.contentInvoiceIssue}>
                          {" "}
                          Invoice Issued: <p>{item.invoiceIssued}</p>{" "}
                        </div>
                        <div className={styles.contentAutoPayment}>
                          {" "}
                          Auto Payment: <p>{item.autoPayment} </p>{" "}
                        </div>
                        <div className={styles.contentBilled}>
                          {" "}
                          Billed: <p>{item.billed}</p>{" "}
                        </div>
                        <IconButton
                          onClick={(e) => {
                            handleExpandClick(e, index);
                            calculateFee(
                              item.activeUsers,
                              item.activeCampaigns,
                              item.gmv,
                              item.activeUserFee,
                              item.activeCampaignFee,
                              item.gmvFee
                            );
                          }}
                          aria-expanded={expanded}
                          aria-label="show more"
                          data-target={item.id}
                        >
                          {expanded == item.id ? <MinusSVG /> : <PlusSVG />}
                        </IconButton>
                      </CardActions>
                      <Collapse
                        in={expanded == item.id}
                        timeout="auto"
                        unmountOnExit
                        key={item.id}
                      >
                        <CardContent>
                          <div className={styles.collapseContentContainer}>
                            <div className={styles.collapseContent}>
                              <div>
                                Active User: <p>{item.activeUsers} </p>{" "}
                              </div>
                              <div>
                                Active Campaigns:{" "}
                                <p> {item.activeCampaigns} </p>{" "}
                              </div>
                              <div>
                                GMV: <p> {nf.format(item.gmv)} </p>{" "}
                              </div>
                            </div>
                            <div className={styles.collapseContent}>
                              <div>
                                Active User Fee:{" "}
                                <p>
                                  ${item.activeUserFee} x {item.activeUsers} = $
                                  {nf.format(activeUserFee)}{" "}
                                </p>{" "}
                              </div>
                              <div>
                                Active Campaigns:{" "}
                                <p>
                                  {" "}
                                  ${item.activeCampaignFee} x{" "}
                                  {nf.format(item.activeCampaigns)} = $
                                  {nf.format(activeCampaign)}{" "}
                                </p>{" "}
                              </div>
                              <div>
                                GMV Fee:{" "}
                                <p>
                                  {" "}
                                  {item.gmvFee}% x ${nf.format(item.gmv)} = $
                                  {nf.format(gmvFee)}{" "}
                                </p>{" "}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Collapse>
                      {data[data.length - 1] == item ? (
                        ""
                      ) : (
                        <Divider className={styles.divider} />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FomoPromoInvoice;
