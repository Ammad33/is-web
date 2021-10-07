import React, { useEffect } from "react";
import styles from "./InfluencerCard.module.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Avatar } from "@material-ui/core";
import clsx from "clsx";
import { Facebook, Youtube, Instagram } from "react-feather";
import { useRef } from "react";

const InfluencerCard = ({ influencer, selected, toggleInfluncer }) => {
  /**converts follower count to "m"(million)and "k"(thousand) formate */
  const calculateFollowersCount = (count) => {
    let millions = (count / 1000000).toString().split(".");
    let thousands = (count / 1000).toString().split(".");
    if (millions[0] !== "0") {
      return `${
        millions[1] ? [millions[0], millions[1][0]].join(".") : millions[0]
      }m`;
    } else {
      return `${
        thousands[1] ? [thousands[0], thousands[1][0]].join(".") : thousands[0]
      }k`;
    }
  };
  useEffect(() => {
    if (selected) executeScroll();
  }, []);
  const myRef = useRef(null);
  const nonSelectedRef = useRef(null);
  const executeScroll = () => {
    if (myRef.current) myRef.current.scrollIntoView();
  };
  return (
    <Card
      ref={selected ? myRef : nonSelectedRef}
      className={clsx(
        styles.influencerCard,
        selected ? styles.selectedInfluencer : ""
      )}
      onClick={() => toggleInfluncer(influencer)}
    >
      <CardContent className={styles.cardContent}>
        <div className={styles.cardDetails}>
          <div className={styles.personInfo}>
            <Avatar className={styles.personAvatar} src={influencer.imageUrl} />
          </div>
          <div className={styles.first_last}>
            <p>{influencer.name}</p>
          </div>
          <div className={styles.socialContainer}>
            {influencer.socialIdentities &&
              influencer.socialIdentities.map((social) => {
                switch (social.platform) {
                  case "INSTAGRAM":
                    return (
                      <div className={styles.socialItem}>
                        <Instagram />
                        <span className={styles.countText}>
                          {calculateFollowersCount(social.followerCount)}
                        </span>
                      </div>
                    );
                  default:
                    return "";
                }
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencerCard;
