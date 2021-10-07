import React from "react";
import styles from "./Auth.module.scss";

const Auth = ({ children, image }) => {
  return (
    <main className={styles.authContainer}>
      <section className={styles.logoAndComponent}>
        <img
          className={styles.logoDiv}
          src={`${process.env.PUBLIC_URL}/images/FomoPromo_logo__primary_color.png`}
          alt="Logo"
        />
        <div className={styles.formDiv}>{children}</div>
      </section>
      <section className={styles.sidebar}>
        <div className="after">
          <img src={image} alt="Logo" />
        </div>
      </section>
    </main>
  );
};

export default Auth;
