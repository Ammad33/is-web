import React, { useEffect } from "react";
import CreateDeliverable from "./CreateDeliverable";
import AddIcon from "@material-ui/icons/Add";
import styles from "./Deliverables.module.scss";

const Deliverables = ({
  deliveries,
  handleDeliveries,
  handleDilverableContent,
  handleDeliverDeadlineDate,
  deliverableDeadlineDateError,
  deliverableDate,
  handleDeliverableDate,
  handleActiveForDeliverable,
  handleRemoveDeliverable,
  fb,
  insta,
  tictock,
  youtube,
  twitch,
  twitter,
}) => {
  /**check for conditions and activate the next button for deliverable */
  useEffect(() => {
    handleActiveForDeliverable();
  }, [deliveries]);

  return (
    <div className={styles.padding8}>
      {deliveries.map((item, index) => {
        return (
          <CreateDeliverable
            key={index}
            deliveries={deliveries}
            deliverableItem={item}
            index={index}
            handleDilverableContent={handleDilverableContent}
            handleDeliverDeadlineDate={handleDeliverDeadlineDate}
            deliverableDeadlineDateError={deliverableDeadlineDateError}
            handleDeliverableDate={handleDeliverableDate}
            deliverableDate={deliverableDate}
            handleRemoveDeliverable={handleRemoveDeliverable}
            fb={fb}
            insta={insta}
            tictock={tictock}
            youtube={youtube}
            twitch={twitch}
            twitter={twitter}
          />
        );
      })}
      <button className={styles.addDeliverable} onClick={handleDeliveries}>
        {" "}
        <AddIcon /> Add another deliverable
      </button>
    </div>
  );
};

export default Deliverables;
