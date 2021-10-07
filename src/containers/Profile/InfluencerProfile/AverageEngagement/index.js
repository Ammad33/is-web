import React from "react";
import { Grid } from "@material-ui/core";
import styles from "./AverageEngagement.module.scss";
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
const Twitter = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Twitter block.svg`} />;
};
const TikTok = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/tiktok block.svg`} />;
};
const Twitch = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Twitch Block.svg`} />;
};

const AverageEngagement = () => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.headingContainer}>
        <h1>Average Engagement</h1>
      </div>
      <Grid container spacing={1}>
        <Grid item md={5}>
          <div className={styles.mainDiv}>
            <Instagram />
            <div className={styles.iconDescription}> 60.8% Engagement</div>
          </div>
        </Grid>
        <Grid item md={5}>
          <div className={styles.mainDiv}>
            <Youtube />
            <div className={styles.iconDescription}> 60.8% Engagement</div>
          </div>
        </Grid>
        <Grid item md={5}>
          <div className={styles.mainDiv}>
            <Facebook />
            <div className={styles.iconDescription}> 60.8% Engagement</div>
          </div>
        </Grid>
        <Grid item md={5}>
          <div className={styles.mainDiv}>
            <TikTok />
            <div className={styles.iconDescription}> 60.8% Engagement</div>
          </div>
        </Grid>
        <Grid item md={5}>
          <div className={styles.mainDiv}>
            <Twitter />
            <div className={styles.iconDescription}> 60.8% Engagement</div>
          </div>
        </Grid>
        <Grid item md={5}>
          <div className={styles.mainDiv}>
            <Twitch />
            <div className={styles.iconDescription}> 60.8% Engagement</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AverageEngagement;
