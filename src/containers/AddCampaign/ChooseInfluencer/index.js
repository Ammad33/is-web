import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import InfluencerCard from "./InfluencerCard";
import styles from "./ChooseInfluencer.module.scss";
import _ from "lodash";
import Scroll from "react-scroll";

const ChooseInfluencer = ({
  selectedInfluncer,
  toggleInfluncer,
  influencers,
  handleActiveForInfluncer,
  handleInfluencers,
}) => {
  const [sortedInfluencers, setSortedInfluencers] = useState(influencers);
  const myRef = useRef([]);
  const [selected, setSelected] = useState(false);
  /**check for conditions and activate the next button for influencer */

  useEffect(() => {
    window.scrollTo(0, 1000);
    handleActiveForInfluncer();
  }, [selectedInfluncer]);



  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        {influencers.map((influencer, index1) => {
          const index =
            selectedInfluncer !== null &&
            selectedInfluncer.name === influencer.name
              ? true
              : false;
          return (
            <Grid
              item
              md={6}
              xs={12}
              className={styles.gridItem}
              ref={(el) => (myRef.current[index1] = el)}
              key={index1}
            >
              <InfluencerCard
                influencer={influencer}
                selected={index}
                key={index}
                toggleInfluncer={toggleInfluncer}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ChooseInfluencer;
