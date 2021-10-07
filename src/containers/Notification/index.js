import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./notifications.module.scss";
import SVG from "react-inlinesvg";
import Popover from "@material-ui/core/Popover";
import ShowNotification from "./ShowNotification";
import { Badge } from "@material-ui/core";
import * as moment from "moment";
import * as _ from "lodash";
import getNotificationsQuery from "../../GraphQL/getNotificationsQuery";
import { RootContext } from "../../context/RootContext";

const NotificationIcon = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/Notification.svg`} />;
};

const Notification = ({ handleNotificationBadge }) => {
  const [notifications, setNotifications] = useState([]);
  const [displayNotifications, setDisplayNotifications] = useState([]);
  const [limit, setLimit] = useState(8);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const containerRef = useRef(null);

  const { notification, setNotification } = useContext(RootContext);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      // if (containerRef.current.scrollTop ===  containerRef.current.scrollHeight){
      // }
    }
  }, [displayNotifications]);

  const handleScroll = () => {
    if (
      containerRef.current.scrollHeight -
        containerRef.current.scrollTop -
        containerRef.current.clientHeight <
      1
    ) {
      let nots = _.cloneDeep(notifications);
      mapNotifications(nots.splice(0, limit));
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    //handleNotificationBadge(true);
    setNotification("noti");
    getNotifications();
  };

  const handleClose = () => {
    setNotifications([]);
    setDisplayNotifications([]);
    setLimit(8);
    setAnchorEl(null);
  };

  const getNotifications = async () => {
    try {
      const result = await getNotificationsQuery();
      if (result.error === false) {
        const not = _.cloneDeep(result.data);
        const nots = [...result.data];
        setNotifications(not);
        mapNotifications(nots.splice(0, limit));
      }
    } catch (e) {
      console.log("error in notifcations ", e);
    }
  };

  const handleLoadMore = () => {
    let nots = _.cloneDeep(notifications);
    mapNotifications(nots.splice(0, limit));
  };

  const mapNotifications = (noti) => {
    let copyNotifications = [...noti];
    copyNotifications = copyNotifications.map((notification) => {
      const today = moment().format("dddd");
      const yesterday = moment().subtract(1, "days").format("dddd");

      if (today == moment(notification.received).format("dddd")) {
        notification.when = "Today";
      } else if (yesterday == moment(notification.received).format("dddd")) {
        notification.when = "Yesterday";
      } else {
        notification.when = moment(notification.received).format("dddd");
      }

      return notification;
    });
    setDisplayNotifications(
      Object.entries(_.groupBy(copyNotifications, "when"))
    );
    setLimit((prev) => prev + 5);
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          style: { width: "378px", height: "780px", marginTop: "22px" },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div
          className={styles.mainContainer}
          ref={containerRef}
          onScroll={() => handleScroll()}
        >
          <div className={styles.Heading}>
            <p>Notifications</p>
          </div>
          {displayNotifications &&
            displayNotifications !== null &&
            displayNotifications.length !== 0 &&
            displayNotifications.map((notif) => {
              return (
                <div className={styles.NotificationContainer}>
                  <div className={styles.notificationDay}>
                    <p>{notif[0]}</p>
                  </div>
                  <div className={styles.NotificationCardContainer}>
                    {notif[1].map((item) => (
                      <ShowNotification notifications={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          {/* {limit <= notifications.length ? (
						<div className={styles.loadMore}>
							<button onClick={handleLoadMore}>Load More</button>
						</div>
					) : (
								''
						)} */}
        </div>
      </Popover>
      <div onClick={handleClick}>
        <Badge
          className={"cursor-pointer"}
          color="secondary"
          variant={notification !== "noti" ? "dot" : ""}
        >
          <NotificationIcon />
        </Badge>
      </div>
    </>
  );
};

export default Notification;
