import React, { useState, useContext, useEffect } from "react";
import styles from "./InfluencerCampaignDetail.module.scss";
import { X } from "react-feather";
import ActivityDetail from "../ActivityDetail";
import DeliverablesDetail from "../DeliverablesDetail";
import Drawer from "../../../components/RightDrawer";
import CompensationDetail from "../CompensationDetail";
import AddCampaign from "../../AddCampaign";
import ClosedInfluencer from "../ClosedInfluencer";
import LostInfluencer from "../LostInfluencer";
import TeamMembersDetail from "../TeamMembersDetail";
import InviteInfluencer from "../InviteInfluencer";
import PendingInfluencer from "../PendingInfluencer";
import LiveInfluencer from "../LiveInfluencer";
import DeclineInfluencer from "../DeclineInfluencer";
import DraftBrandCampaignDetail from "../DraftBrandCampaignDetail";
import { API, graphqlOperation } from "aws-amplify";
import { RootContext } from "../../../context/RootContext";
import _ from "lodash";
import moment from "moment";

const CampaignDetailInfluencer = ({
  headingValue,
  status,
  handleDelete,
  addCampaign,
  setAddCampagin,
  data,
  addInTeam,
  removeInTeam,
  search,
  handleSearch,
  selectedMembers,
  team,
  updateCampaign,
  setAll,
  campaignId,
  handleStatus,
  internalState,
  getCampaign,
}) => {
  /**variables */
  const [openDrawer, setOpenDrawer] = useState(false);
  const [step, setStep] = useState(1);
  const [element, setElement] = useState("");
  const {
    brandId,
    createMircositeFlag,
    setCreateMicrositeFlag,
    setTemplate,
  } = useContext(RootContext);

  useEffect(() => {
    return () => {
      setCreateMicrositeFlag(false);
      setTemplate("");
    };
  }, []);

  /**{function} to handle edit campaign */
  const handleEdit = (step) => {
    setAddCampagin(true);
    setStep(step);
  };

  /**{function} to set the active step in stepper */
  const handleActiveStep = () => {
    let negotialble = true;
    if (data && data.negotiables && data.negotiables !== null) {
      Object.values(data.negotiables).map((item) => {
        if (item === true) {
          negotialble = false;
        }
      });
    }

    if (
      (data.discount &&
        data.discount !== null &&
        data.discount.percentage &&
        data.discount.percentage === "") ||
      data.discount === null ||
      (data.discount !== null &&
        data.discount.amount &&
        data.discount.amount.amount === "") ||
      data.invitationMessage === null ||
      data.invitationMessage === ""
    ) {
      setStep(1);
      setAddCampagin(true);
    } else if (
      data.budget === null ||
      data.budget.amount === "" ||
      data.targetGrossSales === null ||
      data.targetGrossSales.amount === ""
    ) {
      setStep(3);
      setAddCampagin(true);
    } else if (data.products === null || data.products.length === 0) {
      setStep(4);
      setAddCampagin(true);
    } else if (
      data.deliverables === null ||
      (data.deliverables && data.deliverables.length === 0)
    ) {
      setStep(5);
      setAddCampagin(true);
    } else if (
      data.compensation === null ||
      (data.compensation && data.compensation.length === 0)
    ) {
      setStep(6);
      setAddCampagin(true);
    } else if (negotialble) {
      setStep(7);
      setAddCampagin(true);
    } else if (data.influencer === null) {
      setStep(8);
      setAddCampagin(true);
    } else if (data.invitedAt === undefined || data.invitedAt === null) {
      setStep(9);
      setAddCampagin(true);
    }
  };

  /**{function} to close the drawer */
  const handleCloseDrawer = () => {
    if (element === "TeamMembers") {
      updateCampaign();
    }
    setElement("");
    setOpenDrawer(false);
  };

  /**{function} to set campaign detail page according to the status of the campaign*/
  const getPage = (status) => {
    switch (status) {
      case "DRAFT":
        return (
          <DraftBrandCampaignDetail
            handleEdit={handleEdit}
            handleSeeClick={handleSeeClick}
            data={data}
            getTotal={getTotal}
            name={data && data.name}
            handleDelete={handleDelete}
            handleActiveStep={handleActiveStep}
            setAll={setAll}
            headingValue={headingValue}
          />
        );
      case "CLOSED":
        return (
          <ClosedInfluencer
            data={data}
            handleEdit={handleEdit}
            handleSeeClick={handleSeeClick}
            getTotal={getTotal}
            name={data && data.name}
            handleDelete={handleDelete}
            internalState={internalState}
          />
        );
      case "LIVE":
        return (
          <LiveInfluencer
            data={data}
            handleEdit={handleEdit}
            handleSeeClick={handleSeeClick}
            getTotal={getTotal}
            name={data && data.name}
            handleDelete={handleDelete}
            internalState={internalState}
          />
        );
      case "INVITED":
        return (
          <InviteInfluencer
            data={data}
            handleEdit={handleEdit}
            handleSeeClick={handleSeeClick}
            getTotal={getTotal}
            name={data && data.name}
            handleDelete={handleDelete}
            campaignId={campaignId}
            handleStatus={handleStatus}
            internalState={internalState}
            getCampaign={getCampaign}
            createMircositeFlag={createMircositeFlag}
            setCreateMicrositeFlag={setCreateMicrositeFlag}
          />
        );
      case "LOST":
        return (
          <LostInfluencer
            data={data}
            handleEdit={handleEdit}
            handleSeeClick={handleSeeClick}
            getTotal={getTotal}
            name={data && data.name}
            handleDelete={handleDelete}
            internalState={internalState}
          />
        );
      case "PENDING":
        return (
          <PendingInfluencer
            data={data}
            handleEdit={handleEdit}
            handleSeeClick={handleSeeClick}
            getTotal={getTotal}
            name={data && data.name}
            handleDelete={handleDelete}
            campaignId={campaignId}
            internalState={internalState}
            getCampaign={getCampaign}
            createMircositeFlag={createMircositeFlag}
            setCreateMicrositeFlag={setCreateMicrositeFlag}
          />
        );
      case "DECLINED":
        return (
          <DeclineInfluencer
            data={data}
            handleEdit={handleEdit}
            handleSeeClick={handleSeeClick}
            getTotal={getTotal}
            name={data && data.name}
            handleDelete={handleDelete}
            internalState={internalState}
          />
        );
      default:
        return;
    }
  };

  /**{function} to get drawer element  */
  const getDrawerElement = (element) => {
    switch (element) {
      case "Activity":
        return <ActivityDetail activities={data?.events} />;
      case "Deliverable":
        return (
          <DeliverablesDetail
            campaign={data}
            deliverables={data && data.deliverables}
          />
        );
      case "Compensation":
        return (
          <CompensationDetail
            compensations={
              data && data.compensation && data.compensation !== null
                ? _.compact(data.compensation)
                : []
            }
            targetGrossSales={data.targetGrossSales.amount}
            deliverables={
              data && data.deliverables && data.deliverables !== null
                ? data.deliverables
                : []
            }
            startDate={data && data.startDate}
            endDate={data && data.endDate}
            paymentSchedule={data && data.paymentSchedule}
          />
        );
      case "TeamMembers":
        return (
          <TeamMembersDetail
            addInTeam={addInTeam}
            removeInTeam={removeInTeam}
            search={search}
            handleSearch={handleSearch}
            selectedMembers={selectedMembers}
            team={team}
          />
        );
      default:
        return;
    }
  };

  /**{function} to handle the drawer on campaign detail page */
  const handleSeeClick = (value) => {
    setElement(value);
    setOpenDrawer(true);
  };

  /*****************************Date functions***********************************/
  /**{function} to get weeks betweeen two dates */
  function weeksBetween(d1, d2) {
    const date1 = moment(d1);
    const date2 = moment(d2);
    return Math.ceil(date2.diff(date1, "days") / 7);
  }

  /**{function} to get months betweeen two dates */
  function monthBetween(d1, d2) {
    const date1 = moment(d1);
    const date2 = moment(d2);
    return Math.ceil(date2.diff(date1, "days") / 30);
  }

  /**{function} to get biMonths between two dates */
  function biMonthBetween(d1, d2) {
    const date1 = moment(d1);
    const date2 = moment(d2);
    return Math.ceil(date2.diff(date1, "days") / 60);
  }

  /**{function} to get biWeeks between two dates */
  function biWeekBetween(d1, d2) {
    const date1 = moment(d1);
    const date2 = moment(d2);
    return Math.ceil(date2.diff(date1, "days") / 14);
  }
  /*****************************************************************************/

  /**{function} to get compensation total */
  const getTotal = () => {
    let total = 0;
    data.compensation.forEach((item) => {
      if (item.__typename === "CompRevenueShare") {
        total =
          total +
          parseFloat(
            item.percentage * parseFloat(data.targetGrossSales.amount / 100)
          );
      } else if (item.__typename === "CompCashPerPost") {
        let totalPost = 0;
        data.deliverables.forEach((item) => {
          if (item.frequency === "WEEK") {
            totalPost =
              totalPost +
              parseInt(item.posts) *
                weeksBetween(
                  new Date(data.startDate * 1000),
                  new Date(data.endDate * 1000)
                );
          } else if (item.frequency === "BI_WEEKLY") {
            totalPost =
              totalPost +
              parseInt(item.posts) *
                biWeekBetween(
                  new Date(data.startDate * 1000),
                  new Date(data.endDate * 1000)
                );
          } else if (item.frequency === "MONTH") {
            totalPost =
              totalPost +
              parseInt(item.posts) *
                monthBetween(
                  new Date(data.startDate * 1000),
                  new Date(data.endDate * 1000)
                );
          } else if (item.frequency === "BI_MONTHLY") {
            totalPost =
              totalPost +
              parseInt(item.posts) *
                biMonthBetween(
                  new Date(data.startDate * 1000),
                  new Date(data.endDate * 1000)
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
    <>
      {addCampaign && (
        <AddCampaign
          open={addCampaign}
          step={step}
          campaign={data}
          brandId={data.brand.id}
          handleCancel={() => setAddCampagin(false)}
        />
      )}

      <Drawer anchor={"right"} open={openDrawer} onClose={handleCloseDrawer}>
        <div className={styles.x}>
          <X onClick={handleCloseDrawer} />
        </div>
        {getDrawerElement(element)}
      </Drawer>
      {getPage(status)}
    </>
  );
};

export default CampaignDetailInfluencer;
