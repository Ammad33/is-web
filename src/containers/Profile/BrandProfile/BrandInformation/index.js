import React, { useState } from "react";
import { Edit, Phone } from "react-feather";
import { Popover } from "@material-ui/core";
import styles from "./BrandInformation.module.scss";
import SVG from "react-inlinesvg";
import { Globe } from "react-feather";
import EditBrand from "./EditBrand";

const Messages = () => {
  return (
    <span>
      <SVG src={`${process.env.PUBLIC_URL}/images/Messages.svg`} />
    </span>
  );
};

const BrandInformation = ({
  isOwner,
  name,
  handleName,
  age,
  handleAge,
  website,
  handleWebsite,
  phoneNumber,
  handlePhoneNumber,
  bio,
  handleBio,
  location,
  handleLocation,
  email,
  handleEmail,
  handleActiveSave,
  handleUpdate,
  activeSave,
  editOpen,
  setEditOpen,
  onCancel,
  errorMessage,
  influencerId,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [brandInformation, setBrandInformation] = useState(true);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className={styles.brandInfoContainer}>
      <div className={styles.headerContainer}>
        <h1>Brand Information</h1>
        {influencerId === undefined ? (
          <Edit
            className={styles.brandOwner}
            onClick={() => {
              setEditOpen(true);
              setAnchorEl(null);
            }}
          />
        ) : (
          ""
        )}
      </div>
      <EditBrand
        name={name}
        handleName={handleName}
        age={age}
        handleAge={handleAge}
        website={website}
        handleWebsite={handleWebsite}
        phoneNumber={phoneNumber}
        handlePhoneNumber={handlePhoneNumber}
        bio={bio}
        handleBio={handleBio}
        location={location}
        handleLocation={handleLocation}
        email={email}
        handleEmail={handleEmail}
        handleActiveSave={handleActiveSave}
        handleUpdate={handleUpdate}
        activeSave={activeSave}
        errorMessage={errorMessage}
        open={editOpen}
        closeAdd={onCancel}
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
      ></Popover>

      <>
        <div className={styles.detailSubContent}>
          <p>
            {bio
              ? bio
              : " Tell influencers a little about your brand and your products in your bio."}
          </p>
        </div>
        <div className={styles.detailSubContent}>
          <div className={styles.svgContainer}>
            <Messages />
            <span> {email ? email : ""}</span>
          </div>
          <div className={styles.svgContainer}>
            <Globe />
            <span> {website ? website : ""} </span>
          </div>
          <div className={styles.svgContainer}>
            <Phone />
            <span> {phoneNumber ? phoneNumber : ""} </span>
          </div>
        </div>
      </>
    </div>
  );
};

export default BrandInformation;
