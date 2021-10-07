import React, { useContext } from "react";
import { MenuItem } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { RootContext } from "./../../context/RootContext";
import styles from "./Logout.module.scss";

const Logout = () => {
  const {
    brandType,
    setCurrentUser,
    setLogoutMessage,
    setBrandName,
    setBrandIdd,
    setActiveRoute,
    setBrands,
    setBrandType,
    setInfluencers,
    setMeData,
    setNotification,
  } = useContext(RootContext);

  const signOut = async () => {
    try {
      setMeData(null);
      setNotification();
      setLogoutMessage("Successfully logged out");
      setCurrentUser();
      setBrands(null);
      setInfluencers(null);
      setBrandName();
      setBrandIdd();
      setBrandType();
      setActiveRoute("/");
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <>
      <MenuItem className={styles.itemsFont} onClick={signOut}>
        Logout
      </MenuItem>
    </>
  );
};

export default Logout;
