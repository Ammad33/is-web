import React, { useContext, useState } from "react";
import { Avatar, Badge, Grid } from "@material-ui/core";
import styles from "./headerStyles.module.scss";
import SVG from "react-inlinesvg";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { RootContext } from "./../../context/RootContext";
import Logout from "../../containers/Logout";
import SelectBrand from "./SelectBrand";
import Notification from "../../containers/Notification";
import Help from "../../components/Header/Help";
import { DebounceInput } from "react-debounce-input";

const SearchIcon = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Search.svg`} />;
};

const Header = (meData) => {
  const history = useHistory();
  const {
    activeRoute,
    setActiveRoute,
    searchValue,
    setSearchValue,
  } = useContext(RootContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openSettings = () => {
    history.push("/settings");
    setActiveRoute("Settings");
    setAnchorEl(null);
  };
  const openAccountHistory = () => {
    history.push("/accountHistory");
    setActiveRoute("AccountHistory");
    setAnchorEl(null);
  };
  const openProfile = () => {
    history.push("/profile");
    setActiveRoute("Profile");
    setAnchorEl(null);
  };
  const openTeam = () => {
    history.push("/team");
    setActiveRoute("Team");
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          style: { width: "331px", height: "254px", marginTop: "20px" },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Grid className={styles.menuBarGrid}>
          <div
            className={styles.popupContainer}
            onClick={() => {
              openSettings();
            }}
          >
            <Avatar
              src={
                meData &&
                meData !== null &&
                meData.meData !== null &&
                `${meData.meData.imageUrl}?${new Date().getTime()}`
              }
            />
            {meData && meData !== null && meData.meData !== null && (
              <span className={styles.name}>
                {meData.meData.fullName}
                <div className={styles.email}>{meData.meData.email}</div>
                <p></p>
              </span>
            )}
          </div>
          <Divider className={styles.divider} />
          <div className={styles.menuBarItems}>
            <MenuItem
              className={styles.itemsFont}
              onClick={() => {
                openProfile();
              }}
            >
              {" "}
              {meData.brandType} Profile
            </MenuItem>
            {/* <MenuItem
              className={styles.itemsFont}
              onClick={() => {
                openTeam();
              }}
            >
              Team
            </MenuItem> */}
            {/* <MenuItem
              className={styles.itemsFont}
              onClick={() => {
                openSettings();
              }}
            >
              Settings
            </MenuItem>
            <MenuItem
              className={styles.itemsFont}
              onClick={() => {
                openAccountHistory();
              }}
            >
              Account History
            </MenuItem> */}
            <Logout />
          </div>
        </Grid>
      </Popover>
      <div className={styles.mainContainer}>
        <div className={styles.searchContainer}>
          {activeRoute == "AccountHistory" ||
          activeRoute == "campaignDetail" ? (
            ""
          ) : (
            <span className={styles.headerSearchIcon}>
              <SearchIcon />
            </span>
          )}
          <DebounceInput
            debounceTimeout={500}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.selectBrandContainer}>
          <SelectBrand />
        </div>
        <div className={styles.helpContainer}>
          <Help />
        </div>
        <div className={styles.notificationContainer}>
          <Notification />
        </div>
        <div className={styles.avatarContainer}>
          <Avatar
            onClick={handleClick}
            src={
              meData && meData !== null && meData.meData !== null
                ? `${meData.meData.imageUrl}?${new Date().getTime()}`
                : ""
            }
          />
        </div>
      </div>
    </>
  );
};

export default Header;
