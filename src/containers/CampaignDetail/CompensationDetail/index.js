import React from "react";
import styles from "./CompensationDetail.module.scss";
import moment from "moment";

const CompensationDetail = ({
  compensations,
  paymentSchedule,
  targetGrossSales,
  deliverables,
  startDate,
  endDate,
}) => {
  const paymentScheduleMap = {
    FIRST_OF_MONTH: "1st of every month",
    FIFTEENTH_OF_MONTH: "15th of every month",
    LAST_DAY_OF_MONTH: "Last day of every month",
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getPaymentSchedule = (compensation) => {
    switch (compensation) {
      case "FIRST_OF_MONTH":
        return "1st of every month";
      case "FIFTEENTH_OF_MONTH":
        return "15th of every month";
      case "LAST_DAY_OF_MONTH":
        return "Last day of every month";
      default:
        return "";
    }
  };

  function weeksBetween(d1, d2) {
    const date1 = moment(d1);
    const date2 = moment(d2);
    return Math.ceil(date2.diff(date1, "days") / 7);
  }

  function monthBetween(d1, d2) {
    const date1 = moment(d1);
    const date2 = moment(d2);
    return Math.ceil(date2.diff(date1, "days") / 30);
  }

  function biMonthBetween(d1, d2) {
    const date1 = moment(d1);
    const date2 = moment(d2);
    return Math.ceil(date2.diff(date1, "days") / 60);
  }

  function biWeekBetween(d1, d2) {
    const date1 = moment(d1);
    const date2 = moment(d2);
    return Math.ceil(date2.diff(date1, "days") / 14);
  }

  const getCompensationType = (compensation) => {
    switch (compensation.__typename) {
      case "CompRevenueShare":
        return <p>Revenue Share</p>;
      case "CompCashPerPost":
        return <p>Cash Per Post</p>;
      case "CompCashPerMonthlyDeliverable":
        return <p>Cash Per Monthly Deliverable</p>;
      case "CompGiftCard":
        return <p>Gift Card</p>;
      default:
        return "";
    }
  };

  const getCompensationTypeValue = (compensation) => {
    let totalPost = 0;
    deliverables.forEach((item) => {
      if (item.frequency === "WEEK") {
        totalPost =
          totalPost +
          parseInt(item.posts) *
            weeksBetween(new Date(startDate * 1000), new Date(endDate * 1000));
      } else if (item.frequency === "BI_WEEKLY") {
        totalPost =
          totalPost +
          parseInt(item.posts) *
            biWeekBetween(new Date(startDate * 1000), new Date(endDate * 1000));
      } else if (item.frequency === "MONTH") {
        totalPost =
          totalPost +
          parseInt(item.posts) *
            monthBetween(new Date(startDate * 1000), new Date(endDate * 1000));
      } else {
        totalPost =
          totalPost +
          parseInt(item.posts) *
            biMonthBetween(
              new Date(startDate * 1000),
              new Date(endDate * 1000)
            );
      }
    });
    switch (compensation.__typename) {
      case "CompRevenueShare":
        return (
          <h6>
            $
            {numberWithCommas(
              Math.trunc(
                parseFloat(
                  compensation.percentage &&
                    compensation.percentage * parseFloat(targetGrossSales / 100)
                )
              )
            )}
          </h6>
        );
      case "CompCashPerPost":
        return (
          <h6>
            $
            {compensation.amount &&
              numberWithCommas(
                Math.trunc(parseFloat(compensation.amount.amount) * totalPost)
              )}
          </h6>
        );
      case "CompCashPerMonthlyDeliverable":
        return (
          <h6>
            $
            {compensation.amount &&
              numberWithCommas(Math.trunc(compensation.amount.amount))}
          </h6>
        );
      case "CompGiftCard":
        return (
          <h6>
            $
            {compensation.amount &&
              numberWithCommas(Math.trunc(compensation.amount.amount))}
          </h6>
        );
      default:
        return <h6></h6>;
    }
  };

  const getCompensationHeading = (compensation) => {
    switch (compensation.__typename) {
      case "CompRevenueShare":
        return <h6>Revenue Share Percentage</h6>;
      case "CompCashPerPost":
        return <h6>Amount per Post</h6>;
      case "CompCashPerMonthlyDeliverable":
        return <h6>Amount Per Monthly Deliverable</h6>;
      case "CompGiftCard":
        return <h6>Gift Card Amount</h6>;
      default:
        return <h6></h6>;
    }
  };

  const getCompensationAmount = (compensation) => {
    switch (compensation.__typename) {
      case "CompRevenueShare":
        return (
          <p>
            {compensation.percentage &&
              numberWithCommas(compensation.percentage)}
            %
          </p>
        );
      case "CompCashPerPost":
        return (
          <p>
            $
            {compensation.amount &&
              numberWithCommas(Math.trunc(compensation.amount.amount))}
          </p>
        );
      case "CompCashPerMonthlyDeliverable":
        return (
          <p>
            $
            {compensation.amount &&
              numberWithCommas(Math.trunc(compensation.amount.amount))}
          </p>
        );
      case "CompGiftCard":
        return (
          <p>
            $
            {compensation.amount &&
              numberWithCommas(Math.trunc(compensation.amount.amount))}
          </p>
        );
      default:
        return <p></p>;
    }
  };

  const getTotal = () => {
    let total = 0;
    compensations.forEach((item) => {
      if (item.__typename === "CompRevenueShare") {
        total =
          total +
          parseFloat(item.percentage * parseFloat(targetGrossSales / 100));
      } else if (item.__typename === "CompCashPerPost") {
        let totalPost = 0;
        deliverables.forEach((item) => {
          if (item.frequency === "WEEK") {
            totalPost =
              totalPost +
              parseInt(item.posts) *
                weeksBetween(
                  new Date(startDate * 1000),
                  new Date(endDate * 1000)
                );
          } else if (item.frequency === "BI_WEEKLY") {
            totalPost =
              totalPost +
              parseInt(item.posts) *
                biWeekBetween(
                  new Date(startDate * 1000),
                  new Date(endDate * 1000)
                );
          } else if (item.frequency === "MONTH") {
            totalPost =
              totalPost +
              parseInt(item.posts) *
                monthBetween(
                  new Date(startDate * 1000),
                  new Date(endDate * 1000)
                );
          } else if (item.frequency === "BI_MONTHLY") {
            totalPost =
              totalPost +
              parseInt(item.posts) *
                biMonthBetween(
                  new Date(startDate * 1000),
                  new Date(endDate * 1000)
                );
          }
        });
        total = total + parseFloat(item.amount.amount) * totalPost;
      } else {
        total = total + parseFloat(item.amount.amount);
      }
    });
    return parseFloat(total).toFixed(2);
  };

  return (
    <div className={styles.compensationContainer}>
      <h1>Compensation</h1>
      <div className={styles.influencerPayment}>
        <h6>Influencer Schedule Payment </h6>
        <p className={styles.detailSubContent}>
          {paymentSchedule && paymentSchedule !== null
            ? getPaymentSchedule(paymentSchedule)
            : ""}
        </p>
      </div>
      {compensations &&
        compensations !== null &&
        compensations.length > 0 &&
        compensations.map((item, index) => {
          return (
            <>
              <div className={styles.header}>
                <h6>Compensation Type {index + 1}</h6>
                {getCompensationTypeValue(item)}
              </div>
              <div className={styles.detailSubContent}>
                <h6>Compensation Type</h6>
                {getCompensationType(item)}
              </div>
              <div className={styles.detailSubContent}>
                {getCompensationHeading(item)}
                {getCompensationAmount(item)}
              </div>
            </>
          );
        })}

      {compensations && compensations !== null && compensations.length > 0 && (
        <div className={styles.header}>
          <h6>Total Comp Estimate:</h6>
          <h6>${numberWithCommas(Math.trunc(getTotal()))}</h6>
        </div>
      )}
    </div>
  );
};

export default CompensationDetail;
