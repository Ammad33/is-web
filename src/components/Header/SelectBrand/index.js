import React, { useContext, useState } from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import styles from "./SelectBrand.module.scss";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import { RootContext } from "../../../context/RootContext";
import SVG from "react-inlinesvg";
import { useHistory } from "react-router-dom";

/**SVG */
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

const SelectBrand = () => {
  const {
    setBrandIdd,
    brands,
    brandName,
    setBrandName,
    setCreatorRoleId,
    setMemberRoleId,
    setBrandType,
    influencers,
    setActiveRoute,
  } = useContext(RootContext);
  /**varaibles */
  const [brandDropDown, setBrandDropDown] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  /**{function} used to set the postion of dropdown/popover */
  const handleClick = (event) => {
    setBrandDropDown(true);
    setAnchorEl(event.currentTarget);
  };
  /**{function} used to close the dropdown */
  const handleClose = () => {
    setAnchorEl(null);
    setBrandDropDown(false);
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
          style: {
            width: "206px",
            marginTop: "22px",
          },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={styles.popOverContainer}>
          {brands && brands !== null && brands.length !== 0 && (
            <div className={styles.innerPopOver}>
              <p className={styles.heading}>Brands</p>
              {brands &&
                brands !== null &&
                brands.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setBrandIdd(item.organization && item.organization.id);
                        setBrandName(
                          item.organization && item.organization.name
                        );
                        setBrandType(
                          item.organization && item.organization.__typename
                        );
                        setCreatorRoleId(
                          item.organization &&
                            item.organization.roles[0] &&
                            item.organization.roles[0].id
                        );
                        setMemberRoleId(
                          item.organization &&
                            item.organization.roles[1] &&
                            item.organization.roles[1].id
                        );
                        handleClose();
                        setActiveRoute("Campaign");
                        history.push("/campaigns");
                      }}
                      className={styles.brandContainter}
                    >
                      <Avatar
                        className={styles.brandImage}
                        alt="Profile"
                        src={item.organization && item.organization.imageUrl}
                      />
                      <Tooltip
                        title={item.organization && item.organization.name}
                      >
                        <span>
                          {item.organization && item.organization.name}
                        </span>
                      </Tooltip>
                    </div>
                  );
                })}
            </div>
          )}
          {brands && brands !== null && brands.length !== 0 && <Divider />}
          {influencers && influencers !== null && influencers.length !== 0 && (
            <div className={styles.innerPopOver}>
              <p className={styles.heading}>Influencers</p>
              {influencers &&
                influencers !== null &&
                influencers.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setBrandIdd(item.organization && item.organization.id);
                        setBrandName(
                          item.organization && item.organization.name
                        );
                        setBrandType(
                          item.organization && item.organization.__typename
                        );
                        setCreatorRoleId(
                          item.organization &&
                            item.organization.roles[0] &&
                            item.organization.roles[0].id
                        );
                        setMemberRoleId(
                          item.organization &&
                            item.organization.roles[1] &&
                            item.organization.roles[1].id
                        );
                        handleClose();
                        setActiveRoute("Campaign");
                        history.push("/campaigns");
                      }}
                      className={styles.brandContainter}
                    >
                      <Avatar
                        className={styles.brandImage}
                        alt="Profile"
                        src={item.organization && item.organization.imageUrl}
                      />
                      <Tooltip
                        title={item.organization && item.organization.name}
                      >
                        <span>
                          {item.organization && item.organization.name}
                        </span>
                      </Tooltip>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </Popover>
      <div>
        <div className={styles.brandDropDown}>
          {(brands && brands.length > 1) ||
          (influencers && influencers.length > 1) ||
          (brands &&
            brands.length > 0 &&
            influencers &&
            influencers.length > 0) ? (
            <>
              <div onClick={handleClick}>
                {brandName && brandName !== "" ? brandName : "Brand Name"}
              </div>
              <div className={styles.brandDropDownSVG} onClick={handleClick}>
                {brandDropDown ? <ChevronUp /> : <ChevronDown />}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default SelectBrand;
