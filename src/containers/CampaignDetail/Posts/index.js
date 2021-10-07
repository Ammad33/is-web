import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Post.module.scss";
import clsx from "clsx";

const Posts = ({ width }) => {
  const history = useHistory();

  return (
    <div className={clsx(styles.postContainer, width ? styles.fullWidth : "")}>
      <h1>Posts</h1>
      <div className={styles.mainDiv}>
        <div className={styles.elemtdiv}>
          <img alt="post1" src={`${process.env.PUBLIC_URL}/images/post1.png`} />
        </div>
        <div className={styles.elemtdiv}>
          <img alt="post2" src={`${process.env.PUBLIC_URL}/images/post2.png`} />
        </div>
        <div className={styles.elemtdiv}>
          <img
            alt="post3"
            src={`${process.env.PUBLIC_URL}/images/bottle.png`}
          />
        </div>
      </div>
      <button onClick={() => history.push("/posts")}>See all</button>
    </div>
  );
};

export default Posts;
