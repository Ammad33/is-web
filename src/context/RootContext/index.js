import React, { useEffect, useState } from "react";

export const RootContext = React.createContext();

export default ({ children }) => {
  /*****getting values from local storage if any***************************/
  const prevUser = JSON.parse(window.localStorage.getItem("user")) || null;
  const preActiveRoute = localStorage.getItem("route") || "Campaign";
  const brandsStored = JSON.parse(localStorage.getItem("brands")) || null;
  const influencerStored =
    JSON.parse(localStorage.getItem("influencers")) || null;
  const bId = localStorage.getItem("bId") || null;
  const bName = localStorage.getItem("bName") || null;
  const bType = localStorage.getItem("bType") || null;
  const cRollId = localStorage.getItem("cRollId") || null;
  const mRollId = localStorage.getItem("mRollId") || null;
  const create = localStorage.getItem("create") || false;
  const template = localStorage.getItem("template") || "";
  const noti = localStorage.getItem("noti") || null;
  /**********************************************************************/

  /*****setting values from local storage to constants*******************/
  const [currentUser, setCurrentUser] = useState(prevUser);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [activeRoute, setActiveRoute] = useState(preActiveRoute);
  const [activeCampaign, setActiveCampaign] = useState("");
  const [brandId, setBrandIdd] = useState(bId);
  const [brands, setBrands] = useState(brandsStored);
  const [brandName, setBrandName] = useState(bName);
  const [brandType, setBrandType] = useState(bType);
  const [creatorRoleId, setCreatorRoleId] = useState(cRollId);
  const [memberRoleId, setMemberRoleId] = useState(mRollId);
  const [searchValue, setSearchValue] = useState("");
  const [influencers, setInfluencers] = useState(influencerStored);
  const [showLoader, setShowLoader] = useState(false);
  const [toastrData, setToastrData] = useState({});
  const [updateMeData, setUpdateMeData] = useState(true);
  const [meData, setMeData] = useState(null);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [createMircositeFlag, setCreateMicrositeFlag] = useState(create);
  const [templated, setTemplate] = useState(template);
  const [notification, setNotification] = useState(noti);
  /*****************************************************************/

  /*****setting values to local storage*****************************/
  useEffect(() => {
    if (!currentUser) {
      localStorage.clear();
    } else {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
    if (!activeRoute) {
      localStorage.removeItem("route");
    } else {
      localStorage.removeItem("route");
      localStorage.setItem("route", activeRoute);
    }
    if (!brandId) {
      localStorage.removeItem("bId");
    } else {
      localStorage.removeItem("bId");
      localStorage.setItem("bId", brandId);
    }
    if (!brands || brands == null) {
      localStorage.removeItem("brands");
    } else {
      localStorage.removeItem("brands");
      localStorage.setItem("brands", JSON.stringify(brands));
    }
    if (!influencers || influencers == null) {
      localStorage.removeItem("influencers");
    } else {
      localStorage.removeItem("influencers");
      localStorage.setItem("influencers", JSON.stringify(influencers));
    }
    if (!brandName) {
      localStorage.removeItem("bName");
    } else {
      localStorage.removeItem("bName");
      localStorage.setItem("bName", brandName);
    }
    if (!brandType) {
      localStorage.removeItem("bType");
    } else {
      localStorage.removeItem("bType");
      localStorage.setItem("bType", brandType);
    }
    if (!creatorRoleId) {
      localStorage.removeItem("cRollId");
    } else {
      localStorage.removeItem("cRollId");
      localStorage.setItem("cRollId", creatorRoleId);
    }
    if (!memberRoleId) {
      localStorage.removeItem("mRollId");
    } else {
      localStorage.removeItem("mRollId");
      localStorage.setItem("mRollId", memberRoleId);
    }
    if (createMircositeFlag === undefined) {
      localStorage.removeItem("create");
    } else {
      localStorage.setItem("create", createMircositeFlag);
    }
    if (templated === undefined) {
      localStorage.removeItem("template");
    } else {
      localStorage.setItem("template", templated);
    }
    if (notification === undefined) {
      localStorage.removeItem("noti");
    } else {
      localStorage.setItem("noti", notification);
    }
  }, [
    currentUser,
    activeRoute,
    brandId,
    brands,
    brandName,
    brandType,
    creatorRoleId,
    memberRoleId,
    influencers,
    createMircositeFlag,
    templated,
    notification,
  ]);
  /*******************************************************************/

  /*****all root context variables and function ********************/
  const defaultContext = {
    currentUser,
    setCurrentUser,
    logoutMessage,
    setLogoutMessage,
    activeRoute,
    setActiveRoute,
    activeCampaign,
    setActiveCampaign,
    brandId,
    setBrandIdd,
    brands,
    setBrands,
    brandName,
    setBrandName,
    brandType,
    setBrandType,
    creatorRoleId,
    setCreatorRoleId,
    memberRoleId,
    setMemberRoleId,
    searchValue,
    setSearchValue,
    influencers,
    setInfluencers,
    showLoader,
    setShowLoader,
    toastrData,
    setToastrData,
    updateMeData,
    setUpdateMeData,
    meData,
    setMeData,
    profileUpdate,
    setProfileUpdate,
    createMircositeFlag,
    setCreateMicrositeFlag,
    templated,
    setTemplate,
    notification,
    setNotification,
  };
  /*******************************************************************/

  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};
