import React from "react";
import { Grid } from "@material-ui/core";
import styles from "./Social.module.scss";
import SVG from "react-inlinesvg";

const Facebook = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Facebook block.svg`} />;
};
const Instagram = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Instagram block.svg`} />;
};
const Youtube = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Youtube block.svg`} />;
};

const Social = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.socialContainer}>
        <div className={styles.socialIcons}>
          <Instagram />
        </div>
        <div className={styles.detailSubContent}>94.1K Followers</div>
        <div className={styles.influencerHandler}>@samOzkural</div>
      </div>
      {/* <div className={styles.socialContainer}>
        <div className={styles.socialIcons}>
          <Youtube />
        </div>
        <div className={styles.detailSubContent}>94.1K Followers</div>
        <div className={styles.influencerHandler}>Sam Ozkural</div>
      </div> */}
      {/* <div className={styles.socialContainer}>
        <div className={styles.socialIcons}>
          <Facebook />
        </div>
        <div className={styles.detailSubContent}>94.1K Followers</div>
        <div className={styles.influencerHandler}>Sam Ozkural</div>
      </div> */}
    </div>
  );
};

export default Social;
