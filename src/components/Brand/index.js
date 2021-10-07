import React from "react";
import styles from "./Brand.module.scss";

const Brand = () => {
  return (
    <div className={styles.brandContainter}>
      <a href="/">
        <img alt="Profile" src={`${process.env.PUBLIC_URL}/images/logo.png`} />
      </a>
    </div>
  );
};

export default Brand;
