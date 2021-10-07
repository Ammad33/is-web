import React from "react";
import { Grid } from "@material-ui/core";
import styles from "./RecentPosts.module.scss";

const RecentPosts = () => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.headingContainer}>
        <h1>Recent Posts</h1>
      </div>
      <Grid container spacing={1} item md={10}>
        <div className={styles.mainDiv}>
          <Grid item md={5}>
            <div className={styles.elemtdiv}>
              <img
                alt="post1"
                src={`${process.env.PUBLIC_URL}/images/post1.png`}
              />
            </div>
          </Grid>
          <Grid item md={5}>
            <div className={styles.elemtdiv}>
              <img
                alt="post2"
                src={`${process.env.PUBLIC_URL}/images/post1.png`}
              />
            </div>
          </Grid>

          <Grid item md={5}>
            <div className={styles.elemtdiv}>
              <img
                alt="post3"
                src={`${process.env.PUBLIC_URL}/images/post1.png`}
              />
            </div>
          </Grid>

          <Grid item md={5}>
            <div className={styles.elemtdiv}>
              <img
                alt="post3"
                src={`${process.env.PUBLIC_URL}/images/post1.png`}
              />
            </div>
          </Grid>

          <Grid item md={5}>
            <div className={styles.elemtdiv}>
              <img
                alt="post3"
                src={`${process.env.PUBLIC_URL}/images/post1.png`}
              />
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};
export default RecentPosts;
