import React, { useState } from "react";
import styles from "./InfluencerInvoice.module.scss";
import { Download, Share2 } from "react-feather";
import Avatar from "@material-ui/core/Avatar";
import SVG from "react-inlinesvg";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import FilterPopover from "../../FilterPopover";

const ChevronDown = () => {
  return (
    <span>
      <SVG src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`} />
    </span>
  );
};
const ChevronUp = () => {
  return (
    <span>
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

const InfluencerInvoice = ({ data, handleExpandClick, expanded }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedMember, setSelecetedMember] = useState([]);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setFilterDropdown(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setFilterDropdown(false);
  };

  const handleSelectAll = () => {
    setSelectAll(selectAll ? false : true);
  };
  const handleSelection = (index) => {
    const opts = [...selectedMember];
    const firstIndex = opts.findIndex((item) => item.indx == index);
    if (firstIndex != -1) {
      if (opts[index].selected == false) {
        opts[index].selected = true;
      } else {
        opts[index].selected = false;
      }
    } else {
      opts.push({
        selected: true,
        indx: index,
      });
      setSelecetedMember(opts);
    }
    setSelecetedMember(opts);
  };
  const handleClearAll = () => {
    const opts = [...selectedMember];
    opts.map((item) => {
      item.selected = false;
    });
    setSelecetedMember(opts);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          style: { width: "250px", maxHeight: "490px" },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <FilterPopover
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
          data={data}
          selectedMember={selectedMember}
          handleSelection={handleSelection}
        />
      </Popover>
      <div className={styles.mainContainer}>
        <span> Below are invoices you owe to your influencers. </span>
        <div className={styles.dateFilter}>
          <p>
            November 2020
            <div className={styles.dateDropDown}>
              {filterDropdown ? <ChevronDown /> : <ChevronDown />}
            </div>
          </p>
          <p>
            <div className={styles.brandDropDownContainer}>
              <div className={styles.brandDropDown}>
                {"Filter by Brand"}
                {selectedMember.filter((i) => i.selected === true).length >
                0 ? (
                  <span>
                    {" "}
                    {
                      selectedMember.filter((i) => i.selected === true).length
                    }{" "}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.brandDropDownSVG} onClick={handleClick}>
                {filterDropdown ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>
          </p>
        </div>
        <div className={styles.brandInvoiceInfoContainer}>
          <div className={styles.brandInvoiceContainer}>
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
                          View Invoice
                        </div>
                        <div className={styles.contentName}>
                          {" "}
                          Campaign: <p>{item.campaign}</p>{" "}
                        </div>
                        <div className={styles.contentDate}>
                          {" "}
                          Date: <p>{item.date} </p>{" "}
                        </div>
                        <Avatar
                          className={styles.avatar}
                          src={item.img}
                          alt={"avatar"}
                        />
                        <div className={styles.contentInfluencer}>
                          {" "}
                          {item.member}{" "}
                        </div>
                        <div className={styles.contentSales}>
                          {" "}
                          Billed: <p>{item.billed}</p>{" "}
                        </div>
                        <IconButton
                          onClick={(e) => {
                            handleExpandClick(e, index);
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
                                Total Campaign Sales:{" "}
                                <p>{item.totalCampaignSale} </p>{" "}
                              </div>
                              <div>
                                Compensation: <p> {item.compensation} </p>{" "}
                              </div>
                            </div>
                            <div className={styles.collapseContent}>
                              <div>
                                Campaign Duration:{" "}
                                <p> {item.campaignDuration} </p>{" "}
                              </div>
                              <div>
                                Total Influencer Payout:{" "}
                                <p> {item.totalInfluencerPayout} </p>{" "}
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

export default InfluencerInvoice;
