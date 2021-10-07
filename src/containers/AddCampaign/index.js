/* eslint-disable default-case */
import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import styles from "./AddCampaign.module.scss";
import AddCampaignDetails from "./AddCampaignDetails";
import AddTeamMembers from "./AddTeamMembers";
import BudgetConversionGoal from "./BudgetConversionGoal";
import ChooseInfluencer from "./ChooseInfluencer";
import Negotiables from "./Negotiables";
import ReviewAndSend from "./ReviewAndSend";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Collection from "./Collections";
import Deliverables from "./Deliverables";
import Compensations from "./Compensations";
import clsx from "clsx";
import moment from "moment";
import CDialog from "../../components/ConfirmationDialog";
import Translation from "../../assets/translation.json";
import SVG from "react-inlinesvg";
import { API, graphqlOperation } from "aws-amplify";
import * as _ from "lodash";
import { RootContext } from "../../context/RootContext";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import updateCampaignMutation from "../../GraphQL/updateCampaignMutation";
import createCampaignMutation from "../../GraphQL/createCampaignMutation";
import getTeamQuery from "../../GraphQL/getTeamQuery";
import getCollectionsQuery from "../../GraphQL/getCollectionsQuery";

let typ = "";
let val = "";
/******************************SVG ************************/
const XSVG = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/x.svg`} />;
};

const ChevronSVG = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/chevron-left.svg`} />;
};

const CheckCircleIconSvg = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/checkCircleIcon.svg`} />;
};

const useStyles = makeStyles((theme) => ({
  fabProgress: {
    color: "#7B5CD9",
  },
}));

/***********************************************************/

/***************state variables ****************************/
const fb = {
  postType: ["Story", "Post"],
  frameContentType: ["Video", "Image"],
};
const insta = {
  postType: ["Story", "Post"],
  frameContentType: ["Video", "Image"],
};
const tictock = {
  postType: [""],
  frameContentType: [""],
  framesRequired: [""],
};
const youtube = {
  postType: [""],
  frameContentType: [""],
};
const twitch = {
  postType: [""],
  frameContentType: [""],
};
const twitter = {
  postType: [""],
  frameContentType: [""],
};

const items = [
  {
    id: 1,
    name: "Ben Parker",
    quntity: 25,
    price: 64.22,
    sku: "1234357",
  },
  {
    id: 2,
    name: "Ben Parker",
    quntity: 20,
    price: 64.22,
    sku: "1324671",
  },
  {
    id: 3,
    name: "Ben Parker",
    quntity: 20,
    price: 58.22,
    sku: "14235671",
  },
  {
    id: 4,
    name: "Ben Parker",
    quntity: 18,
    price: 50.22,
    sku: "15234671",
  },
  {
    id: 5,
    name: "Ben Parker",
    quntity: 30,
    price: 60.22,
    sku: "17234561",
  },
  {
    id: 6,
    name: "Ben Parker",
    quntity: 40,
    price: 90.22,
    sku: "18234567",
  },
  {
    id: 7,
    name: "Ben Parker",
    quntity: 20,
    price: 80.22,
    sku: "19234567",
  },
  {
    id: 8,
    name: "Ben Parker",
    quntity: 30,
    price: 70.22,
    sku: "17234567",
  },
];
/************************************************************/

//******Stepper Element Design *************//
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-85% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 10,
    borderRadius: 0,
  },
})(StepConnector);
function QontoStepIcon(props) {
  return "";
}
/********************************************************/

/********* Steppper Labels ****************/
function getSteps() {
  return [
    "Initial Step",
    "Campaign Details",
    "Add Team Members",
    "Budget & Conversion Goal",
    "Create Collection",
    "Deliverables",
    "Compensation",
    "Negotiables",
    "Choose an Influencer",
    "Review and Send",
  ];
}
/******************************************/

/* open {bool} used to open the add campaign dialog
 * handleCancle {function} invoked when campaignis cancled
 * step contains the information about the steps
 * campaign contains the campaign data*/
const AddCampaign = ({ open, handleCancel, step, campaign }) => {
  const fabClass = useStyles();
  const negotialbleOptions = [
    { id: 1, isChecked: true, key: "postFee", text: "Cash Per Post" },
    { id: 2, isChecked: true, key: "revenueShare", text: "Revenue Share %" },
    {
      id: 3,
      isChecked: true,
      key: "monthlyRetainerFee",
      text: "Cash Per Monthly Deliverable",
    },
    { id: 4, isChecked: true, key: "postFrequency", text: "Post Frequency" },
    {
      id: 5,
      isChecked: true,
      key: "giftCard",
      text: "Gift Card",
    },
    {
      id: 6,
      isChecked: true,
      key: "campaignDuration",
      text: "Campaign Duration",
    },
  ];

  /****** Stepper States ********/

  const steps = getSteps();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(step ? step : 1);

  const [activeNext, setActiveNext] = useState(false);
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const { brandId, setActiveRoute, currentUser } = useContext(RootContext); //Rootcontext
  const [campaignError, setCampaignError] = useState("");
  const [products, setProducts] = useState("");
  const [minimium, setMinimium] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeStepValue, setActiveStepValue] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  /****** Campaign Detail States ********/
  const [campaignName, setCampaignName] = useState("");
  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [
    deliverableDeadlineDateError,
    setDeliverableDeadlineDateError,
  ] = useState(false); //deleverable deadline
  const [startTime, setStartTime] = useState("");

  const [startTimeError, setStartTimeError] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [endTimeError, setEndTimeError] = useState(false);

  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [customeMessage, setCustomMessage] = useState("");
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [lastStep, setLastStep] = useState(0);
  const [dummyStartDate, setDummyStartDate] = useState(false);
  const [dummyStartEndTime, setDummyStartEndTime] = useState(false);
  const [endStep, setEndStep] = useState(1);
  const [id, setId] = useState("");

  const [giftCode, setGiftCode] = useState("");

  /***** Budget and Target Sales ********/
  const [budget, setBudget] = useState("");
  const [targetGrossSale, setTargetGrossSale] = useState("");
  const [collection, setCollection] = useState("");
  /****** Deliverable States **********/
  const [deliverableDate, setDeliverableDate] = useState(false);

  const [deliveries, setDeliveries] = useState([
    {
      deadlineDate: "",
      platform: "",
      frameContentType: "",
      postType: "",
      framesRequired: "",
      brandTag: "",
      brandTagRequired: false,
      hashTag: "",
      hashTagRequired: false,
      posts: "",
      frequency: "",
    },
  ]);

  const [influencers, setInfluencers] = useState([]);

  /**React useState hook get called when the stepper move to next or
   * previous state sets the values of all the variables used in AddCampaign
   */
  useEffect(() => {
    setActiveStep(step !== undefined ? step : 1);
    if (campaign && campaign !== null && step !== undefined) {
      setCampaignName(campaign.name);

      const startDate = new Date(campaign.startDate * 1000);
      const endDate = new Date(campaign.endDate * 1000);
      setCustomMessage(
        campaign.invitationMessage && campaign.invitationMessage !== null
          ? campaign.invitationMessage
          : ""
      );
      setCompensationPayment(
        campaign.paymentSchedule && campaign.paymentSchedule !== null
          ? campaign.paymentSchedule
          : ""
      );
      let sDate = moment(startDate).format("MM/DD/YYYY");
      let eDate = moment(endDate).format("MM/DD/YYYY");
      if (
        moment(sDate).isAfter("01/01/1970") &&
        moment(eDate).isAfter("01/01/1970")
      ) {
        setStartDate(moment(startDate).format("MM/DD/YYYY"));
        setEndDate(moment(endDate).format("MM/DD/YYYY"));
        setStartTime(moment(startDate).format("hh:mm A"));
        setEndTime(moment(endDate).format("hh:mm A"));
      }
      if (campaign.name !== "" && startDate !== "" && endDate !== "") {
        setActiveSave(true);
      }
      setDiscount(
        campaign.discount && campaign.discount !== null
          ? campaign.discount.__typename === "FlatDiscount"
            ? campaign.discount.amount.amount
            : campaign.discount.percentage
          : ""
      );
      setMinimium(
        campaign.discount &&
          campaign.discount !== null &&
          campaign.discount.__typename === "FlatDiscount" &&
          campaign.discount.minimum
          ? campaign.discount.minimum.amount
          : ""
      );
      setSelectedMemebers(
        campaign.brandTeam && campaign.brandTeam !== null
          ? campaign.brandTeam.map((item) => item.id)
          : []
      );

      setDiscountType(
        campaign.discount && campaign.discount !== null
          ? campaign.discount.__typename === "PercentageDiscount"
            ? "Percentage"
            : campaign.discount.__typename === "FlatDiscount"
            ? "Amount"
            : ""
          : ""
      );
      if (
        campaign.compensation &&
        campaign.compensation !== null &&
        campaign.compensation.length !== 0
      ) {
        setCompensation(campaign.compensation);
      } else {
        setCompensations([
          {
            compensationType: "",
            amount: "",
          },
        ]);
      }
      if (campaign.budget && campaign.budget) {
        setBudget(campaign.budget.amount);
      }

      if (campaign.targetGrossSales && campaign.targetGrossSales) {
        setTargetGrossSale(campaign.targetGrossSales.amount);
      }
      if (campaign.negotiables) {
        const negotiables = [...selectedNegotiable];
        const keys = Object.keys(campaign.negotiables);
        keys.forEach((key) => {
          negotiables.map((negotiable) => {
            if (negotiable.key === key) {
              negotiable.isChecked = campaign.negotiables[key];
            }
            return negotiable;
          });
        });
      }
      if (campaign.deliverables && campaign.deliverables.length) {
        campaign.deliverables.map((deliverable) => {
          deliverable.brandTagRequired = deliverable.brandTag ? true : false;
          deliverable.hashTagRequired = deliverable.hashTag ? true : false;
          return deliverable;
        });
        setDeliveries(getDeliveries(campaign.deliverables));
      }
      if (campaign.influencer && campaign.influencer !== null) {
        setInfluencer(campaign.influencer);
      }
    }
    filledForm();
  }, [step]);
  /*************************************************************************************/

  /**{function} returns the array of objects containg the products information  */
  const getCampaignsProducts = (CollectionData) => {
    let productSample = [];
    campaign.products &&
      campaign.products.length > 0 &&
      campaign.products.forEach((product) => {
        if (product.products && product.products.length > 0) {
          productSample.push({
            collectionId: product.collection.id,
            products: product.products.map((item) => ({
              productId: item.product.id,
            })),
          });
        }
      });

    productSample.forEach((item) => {
      CollectionData.forEach((second) => {
        if (
          second.id === item.collectionId &&
          second.products.products.length === item.products.length
        ) {
          second.selectedAll = true;
        }
      });
    });

    setCollections(CollectionData);
    return productSample;
  };

  const handleCollectionAllCheck = async (collec) => {
    let clonnedCollections = [...collections];
    const index = _.findIndex(collections, { id: collec.id });
    clonnedCollections[index].selectedAll = true;

    let clonnedProducts = [...products];
    const collectionIndex = _.findIndex(clonnedProducts, {
      collectionId: collec.id,
    });
    const mappedProducts = _.map(collec.products.products, (prod) => {
      return { productId: prod.id };
    });
    if (collectionIndex > -1) {
      clonnedProducts[collectionIndex].products = mappedProducts;
    } else {
      clonnedProducts[clonnedProducts.length] = {
        collectionId: collec.id,
        products: mappedProducts,
      };
    }
    setProducts(clonnedProducts);
    setCollections(clonnedCollections);
  };

  const handleCollectionAllUncheck = async (collec) => {
    let clonnedCollections = [...collections];
    const index = _.findIndex(collections, { id: collec.id });
    clonnedCollections[index].selectedAll = false;

    let clonnedProducts = [...products];
    const collectionIndex = _.findIndex(clonnedProducts, {
      collectionId: collec.id,
    });
    clonnedProducts[collectionIndex].products = [];
    clonnedProducts.splice(collectionIndex, 1);
    setProducts(clonnedProducts);
    setCollections(clonnedCollections);
  };

  /**{react hook} get invoked when AddCampaign dialog open
   * and closes used to set all the variable values to default
   */
  useEffect(() => {
    if (open === false) {
      setCampaignName("");
      setDiscount("");
      setDiscountType("Percentage");
      setCustomMessage("");
      setStartDate(moment().add(1, "days").format("MM/DD/YYYY"));
      setEndDate(moment().add(31, "days").format("MM/DD/YYYY"));
      setStartTime(
        moment().subtract(1, "days").startOf("day").format("hh:mm A")
      );
      setEndTime(moment().subtract(1, "days").startOf("day").format("hh:mm A"));
      setBudget("");
      setTargetGrossSale("");
      setCollections([]);
      setCompensations([
        {
          compensationType: "",
          amount: "",
        },
      ]);
      setDeliveries([
        {
          platform: "",
          frameContentType: "",
          postType: "",
          framesRequired: "",
          brandTag: "",
          brandTagRequired: false,
          hashTag: "",
          hashTagRequired: false,
          posts: "",
          frequency: "",
        },
      ]);
      setSelectedMemebers([]);
      setSelectedInfluncer(null);
      setActiveStep(1);
    }
  }, [open]);

  /**{react hook} get invoked whenever brandId is changed*/

  useEffect(() => {
    getTeam();
    getCollection();
  }, [brandId]);

  /**{react hook} get the influencers after initial render */

  useEffect(() => {
    getInfluencers();
  }, []);

  /**API call for influencers data */

  const getInfluencers = async () => {
    try {
      const influencers = await API.graphql({
        query: `{
          influencers(input: {limit:50}) {
            influencers {
              id
              name
              imageUrl
              socialIdentities {
                followerCount
                handle
                platform
              }
            }
          }
        }`,
      });
      if (
        influencers &&
        influencers.data &&
        influencers.data.influencers &&
        influencers.data.influencers.influencers &&
        influencers.data.influencers.influencers.length
      ) {
        setInfluencers(influencers.data.influencers.influencers);
      }
      if (campaign && campaign.influencer && campaign.influencer.id) {
        const selectedInfluencer = _.find(
          influencers.data.influencers.influencers,
          ["id", campaign.influencer.id]
        );
        setInfluencer(selectedInfluencer);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /******* Compensations States *********/

  const [compensationPayment, setCompensationPayment] = useState("");
  const [addAnother, setAddAnother] = useState("false");

  const [compensations, setCompensations] = useState([
    {
      compensationType: "",
      amount: "",
    },
  ]);

  /***************Compensation Product ********************/

  const [compensationProduct, setCompensationProduct] = useState("");
  const [compensationProducts, setCompensationProducts] = useState("");

  const handleCompensationProducts = (value) => {
    setCompensationProduct(value);
  };

  const setActiveForCompensationProduct = () => {
    const cols = [...compensationProducts];
    if (cols.length === 0) {
      setActiveNext(false);
    }
    if (cols.length > 0) {
      let flag = true;
      cols.forEach((item) => {
        if (item.products === undefined || item.products.length === 0) {
          flag = false;
        }
        setActiveNext(flag);
      });
    } else {
      setActiveNext(false);
    }
  };

  const handleCompensationProductItem = (id, item) => {
    const opts = [...compensationProducts];
    if (opts.length > 0) {
      const index = opts.findIndex((item) => item.collectionId === id);

      if (index !== -1) {
        if (opts[index].products) {
          const secondIndex = opts[index].products.findIndex(
            (secondItem) => secondItem.productId === item.productId
          );
          if (secondIndex === -1) {
            opts[index].products.push(item);
            setCompensationProducts(opts);
          } else {
            opts[index].products.splice(secondIndex, 1);
            if (opts[index].products && opts[index].products.length === 0) {
              opts.splice(index, 1);
            }
            setCompensationProducts(opts);
          }
        }
      } else {
        opts.push({
          collectionId: id,
          products: [item],
        });
        setCompensationProducts(opts);
      }
    } else {
      opts.push({
        collectionId: id,
        products: [item],
      });
      setCompensationProducts(opts);
    }
  };

  /** Negotiable Options */

  const [selectedNegotiable, setSelectedNegotiables] = useState([
    ...negotialbleOptions,
  ]);

  //**** Members State **********/
  const [selectedMembers, setSelectedMemebers] = useState([
    currentUser.username,
  ]);

  const [selectedInfluncer, setSelectedInfluncer] = useState([]);
  const [influencer, setInfluencer] = useState(null);
  const [openCDialog, setOpenCDialog] = useState(false);
  const [activeSave, setActiveSave] = useState(false);
  const [collections, setCollections] = useState([]);
  const [stepSeven, setStepSeven] = useState(false);

  /**** API call to get team information */
  const getTeam = async () => {
    try {
      const result = await getTeamQuery(brandId);

      if (result.error == false) {
        setTeam(result.data);
      } else {
        setErrorMessage(result.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDeliveries = (delivreis) => {
    let data = [...delivreis];
    data.forEach((item) => {
      if (item.hashTag && item.hashTag !== null && item.hashTag !== "") {
        item.hashTag = item.hashTag;
      }
      if (item.brandTag && item.brandTag !== null && item.brandTag !== "") {
        item.brandTag = item.brandTag;
      }
    });
    return data;
  };

  /**{function} get invoked when adding new deliverable */
  const handleDeliverable = () => {
    const deliverables = [...deliveries];

    deliverables.push({
      platform: "",
      frameContentType: "",
      postType: "",
      framesRequired: "",
      brandTag: "",
      brandTagRequired: false,
      hashTag: "",
      hashTagRequired: false,
      posts: "",
      frequency: "",
    });

    setDeliveries(deliverables);
  };

  /******** Handle deliverable Deadline *********/
  const handleDeliverDeadlineDate = (date, index) => {
    const opts = [...deliveries];
    const moment_date = moment(startDate).add(1, "days").format("MM/DD/YYYY");
    if (
      moment_date !== "" &&
      moment(moment_date, "MM/DD/YYYY", true).isValid()
    ) {
      opts[index].deadlineDate = moment(moment_date).format("L");
    } else {
      if (opts[index].deadlineDate.length > moment_date.length) {
        opts[index].deadlineDate = moment_date;
      } else if (moment_date.length < 11) {
        if (moment_date !== "") {
          var targetValue = moment_date;

          if (targetValue.length === 5) {
            opts[index].deadlineDate = targetValue + "/";
          } else if (targetValue.length === 2) {
            opts[index].deadlineDate = targetValue + "/";
          } else {
            opts[index].deadlineDate = targetValue;
          }
        } else {
          opts[index].deadlineDate = "";
        }
      }
    }
    setDeliveries(opts);
    setDeliverableDate(false);
    setDeliverableDeadlineDateError(false);
  };

  /***** Handle Deliverable Content ********/
  const handleDilverableContent = (value, index, fieldname) => {
    const opts = [...deliveries];
    if (fieldname === "posts") {
      const val = value.replace(/[^\d]/, "");
      if (parseInt(val) !== 0) {
        opts[index][fieldname] = val;
        setDeliveries(opts);
      }
    }
    if (fieldname === "postType" && value === "Post") {
      opts[index]["framesRequired"] = null;
    }
    if (fieldname != "posts") {
      opts[index][fieldname] = value;
      setDeliveries(opts);
    }
  };

  /***** Handle Delete Deliverable ***********/
  const handleRemoveDeliverable = (index) => {
    const opts = [...deliveries];
    opts.splice(index, 1);
    setDeliveries(opts);
  };

  /***** Add New Compesation */
  const handleCompensations = () => {
    const comp = [...compensations];

    comp.push({
      compensationType: "",
      amount: "",
    });
    setCompensations(comp);
  };

  /************ Compensation Influencer payment schedule *******/
  const handleCompensationPayment = (value) => {
    setCompensationPayment(value);
  };
  /***** Handle Compesation Value ********/

  const handleCompensationValue = (val, index, fieldName) => {
    const comp = [...compensations];
    if (fieldName === "Revenue share amount") {
      comp[index]["amount"] = val;
    }
    if (fieldName === "amount") {
      const value = val.replace(/[^\d]/, "");
      if (parseInt(value) !== 0) {
        comp[index][fieldName] = value;
      }
    }
    if (fieldName === "compensationType") {
      const found = comp.findIndex((item) => item.compensationType === val);
      if (found !== -1) {
        return;
      }
      comp[index][fieldName] = val;
    }
    setCompensations(comp);
  };

  /***** Remove Compesation *******/
  const handleRemoveCompensation = (index) => {
    const comp = [...compensations];
    comp.splice(index, 1);
    setCompensations(comp);
  };

  /**** Toggle Negotiable *********/
  const toggleNegotiable = (option) => {
    const opts = [...selectedNegotiable];
    opts.map((opt) => {
      if (opt.id === option.id) {
        opt.isChecked = !opt.isChecked;
      }
      setSelectedNegotiables(opts);
    });
  };

  /********* Add Collection ***********/
  const handleCollection = (value) => {
    setCollection(value);
  };

  /*********handle collection items*****/
  const handleCollectionItem = (id, item) => {
    const opts = [...products];
    if (opts.length > 0) {
      const index = opts.findIndex((item) => item.collectionId === id);

      if (index !== -1) {
        if (opts[index].products) {
          const secondIndex = opts[index].products.findIndex(
            (secondItem) => secondItem.productId === item.productId
          );
          if (secondIndex === -1) {
            opts[index].products.push(item);
            setProducts(opts);
          } else {
            opts[index].products.splice(secondIndex, 1);
            if (opts[index].products && opts[index].products.length === 0) {
              opts.splice(index, 1);
            }
            setProducts(opts);
          }
        }
      } else {
        opts.push({
          collectionId: id,
          products: [item],
        });
        setProducts(opts);
      }
    } else {
      opts.push({
        collectionId: id,
        products: [item],
      });
      setProducts(opts);
    }
    setTimeout(() => {
      setCollectionsSelectAll();
    });
  };

  const setCollectionsSelectAll = () => {
    let clonnedCollections = [...collections];
    clonnedCollections = _.map(clonnedCollections, (collection) => {
      const index = _.findIndex(products, { collectionId: collection.id });
      if (index > -1) {
        if (
          collection.products &&
          collection.products.products &&
          collection.products.products.length ===
            products[index].products.length
        ) {
          collection.selectedAll = true;
        } else {
          collection.selectedAll = false;
        }
      } else {
        collection.selectedAll = false;
      }
      return collection;
    });
    setCollections(clonnedCollections);
  };

  const toggleComponent = (option) => {
    getStepContent(option);
  };

  /***** Toggle Influncer ********/

  const toggleInfluncer = (option) => {
    setInfluencer(option);
  };

  //************************ Add Members  *********************/

  const addMember = (member) => {
    const opts = [...selectedMembers];

    const optIndex = opts.findIndex((item) => item === member.id);

    if (optIndex === -1) {
      opts.push(member.id);
      setSelectedMemebers(opts);
    } else {
      opts.splice(optIndex, 1);
      setSelectedMemebers(opts);
    }
  };

  /******************* Handle Budget *******************/

  const handleBudget = (e) => {
    setBudget(e.value);
  };

  /************* Handle Target Gross Sale ***********/

  const handleGrossSale = (e) => {
    setTargetGrossSale(e.value);
  };

  /***************** Handle Discount Type *********/

  const handleDiscountType = (value) => {
    setDiscount("");
    setDiscountType(value);
  };

  /******** */
  const handleDefaultDate = (date) => {
    if (date) {
      var startDate = moment().format("MM/DD/YYYY");
      setStartDate(startDate);
      setDummyStartDate(true);
    }
  };

  const handleDefaultTime = () => {
    setStartTime("");
    setEndTime("");
    setDummyStartEndTime(true);
  };

  /******************** Handle Start Date */

  const handleStartDate = (date) => {
    const moment_date = moment(date).format("L");
    setStartDate(
      date !== "" && moment(date, "MM/DD/YYYY", true).isValid()
        ? moment_date
        : date
    );
    setStartTime(moment().subtract(1, "days").startOf("day").format("hh:mm A"));
    setEndTime(moment().subtract(1, "days").startOf("day").format("hh:mm A"));
    setDummyStartDate(false);
    setDummyStartEndTime(false);
    setEndDate(moment(moment_date).add(1, "M").format("MM/DD/YYYY"));
    if (date === "") {
      setEndDate("");
      setStartTime("");
      setEndTime("");
    }
    setStartDateOpen(false);
    handleStartDateValidation(moment_date);
  };

  /**********************Handle End Date *********/
  const handleEndDate = (date) => {
    const moment_date = moment(date).format("L");
    setEndDate(
      date !== "" && moment(date, "MM/DD/YYYY", true).isValid()
        ? moment_date
        : date
    );
    setEndDateOpen(false);
    handleEndDateValidation(moment_date);
  };

  /*************End Date Validation **************/
  const handleEndDateValidation = (date) => {
    if (date < startDate) {
      setEndDateError(true);
    } else setEndDateError(false);
    handleEndTimeDateValidation(endTime, date);
  };

  /*************Start date validation*************/
  const handleStartDateValidation = (date) => {
    if (date < moment().format("MM/DD/YYYY")) {
      setStartDateError(true);
    } else setStartDateError(false);
    handleStartTimeDateValidation(startTime, date);
  };

  /*************Start Time/Date validation***********/
  const handleStartTimeDateValidation = (time, date) => {
    const startDateTime = moment(date + " " + time);
    if (startDateTime.isBefore(moment())) {
      setStartTimeError(true);
    } else setStartTimeError(false);
  };

  /*************END Time/Date validation***********/
  const handleEndTimeDateValidation = (time, date) => {
    const endDateTime = moment(date + " " + time);
    const startDateTime = moment(startDate + " " + startTime);
    if (endDateTime.isBefore(startDateTime)) {
      setEndTimeError(true);
    } else setEndTimeError(false);
  };

  /*************Start Time validation*************/
  const handleStartTimeValidation = (time) => {
    const startDateTime = moment(startDate + " " + time);
    if (startDateTime.isBefore(moment())) {
      setStartTimeError(true);
    } else setStartTimeError(false);
  };

  /*************End Time validation*************/
  const handleEndTimeValidation = (time) => {
    const startDateTime = moment(startDate + " " + startTime);
    const endDateTime = moment(endDate + " " + time);
    if (endDateTime.isBefore(startDateTime)) {
      setEndTimeError(true);
    } else setEndTimeError(false);
  };
  //*************Handle Discount *****************/

  const handleDiscount = (e) => {
    if (discountType === "Amount") {
      const value = e.replace(/[^\d]/, "");
      if (parseInt(value) !== 0) {
        setDiscount(value);
      }
    } else {
      const value = e;
      var x = parseFloat(value);
      if (value !== "" && (isNaN(x) || x < 0 || x > 100)) {
        return false;
      } else setDiscount(value);
    }
  };

  //***************** Active Next for Budget ********/

  const setActiveForBudget = () => {
    let ActiveValue = [...activeStepValue];

    if (budget !== "" && targetGrossSale !== "") {
      ActiveValue[3] = true;
      setActiveStepValue(ActiveValue);
      setActiveNext(true);
    } else {
      setActiveNext(false);
      ActiveValue[3] = false;
      setActiveStepValue(ActiveValue);
    }
  };

  //*** Active for Collection *********/

  const setActiveForCollection = () => {
    let ActiveValue = [...activeStepValue];

    const cols = [...products];
    if (cols.length === 0) {
      setActiveNext(false);
      ActiveValue[4] = false;
      setActiveStepValue(ActiveValue);
    }
    if (cols.length > 0) {
      let flag = true;
      cols.forEach((item) => {
        if (item.products === undefined || item.products.length === 0) {
          flag = false;
        }
        setActiveNext(flag);
        ActiveValue[4] = flag;
        setActiveStepValue(ActiveValue);
      });
    } else {
      setActiveNext(false);
      ActiveValue[4] = false;
      setActiveStepValue(ActiveValue);
    }
  };

  /**getting negotiable option Object*/
  const getNegotiablesObjectForAPI = () => {
    let data = {};
    selectedNegotiable.forEach((negotiable) => {
      data[negotiable.key] = negotiable.isChecked;
    });
    return data;
  };

  const getDeliverablesForAPI = () => {
    const data = [...deliveries];
    data.map((deliverable) => {
      delete deliverable.brandTagRequired;
      delete deliverable.hashTagRequired;
      delete deliverable.id;
      delete deliverable.deadlineDate;
      deliverable.platform = deliverable.platform.toUpperCase();
      deliverable.postType =
        deliverable.postType && deliverable.postType !== null
          ? deliverable.postType.toUpperCase()
          : deliverable.deliverableType && deliverable.deliverableType !== null
          ? deliverable.deliverableType.toUpperCase()
          : null;
      deliverable.frameContentType =
        deliverable.frameContentType && deliverable.frameContentType !== null
          ? deliverable.frameContentType.toUpperCase()
          : null;
      delete deliverable.deliverableType;
      return deliverable;
    });
    return data;
  };

  /**handle compensation */
  const setCompensation = (compensation) => {
    let compensationsForm = compensation.map((item) => {
      switch (item.__typename) {
        case "CompRevenueShare":
          return {
            compensationType: "REVENUE_SHARE",
            amount: item.percentage,
          };
        case "CompCashPerPost":
          return {
            compensationType: "CASH_PER_POST",
            amount: item.amount.amount,
          };
        case "CompCashPerMonthlyDeliverable":
          return {
            compensationType: "CASH_PER_MONTHLY_DELIVERABLE",
            amount: item.amount.amount,
          };
        case "CompGiftCard":
          setGiftCode(item.code);
          return {
            compensationType: "GIFT_CARD",
            amount: item.amount.amount,
          };
      }
    });
    setCompensations(compensationsForm);
  };

  const getCompensations = () => {
    let compensation = compensations.map((item) => {
      switch (item.compensationType) {
        case "REVENUE_SHARE":
          return {
            type: "REVENUE_SHARE",
            value: '{ "percentage": "' + item.amount + '"}',
          };
        case "CASH_PER_POST":
          return {
            type: "CASH_PER_POST",
            value:
              '{"amount":{"amount":"' + item.amount + '","currency":"USD"}}',
          };
        case "CASH_PER_MONTHLY_DELIVERABLE":
          return {
            type: "CASH_PER_MONTHLY_DELIVERABLE",
            value:
              '{"amount":{"amount": "' + item.amount + '","currency":"USD"}}',
          };
        case "GIFT_CARD":
          return {
            type: "GIFT_CARD",
            value:
              '{"amount":{"amount": "' +
              item.amount +
              '","currency":"USD"}, "code": "' +
              giftCode +
              '" }',
          };
      }
    });
    return _.compact(compensation);
  };

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const APIErrorDeliverables = () => {
    const data = [...deliveries];

    data.map((deliverable) => {
      const eDate = new Date(deliverable.deadlineDate * 1000);

      // deliverable.deadlineDate = moment(eDate).format('L');
      delete deliverable.deadlineDate;
      deliverable.platform = deliverable.platform.toProperCase();

      deliverable.postType =
        deliverable.postType && deliverable.postType !== null
          ? deliverable.postType.toProperCase()
          : deliverable.deliverableType && deliverable.deliverableType !== null
          ? deliverable.deliverableType.toProperCase()
          : null;
      deliverable.frameContentType =
        deliverable.frameContentType && deliverable.frameContentType !== null
          ? deliverable.frameContentType.toProperCase()
          : null;

      if (deliverable.brandTag && deliverable.brandTag !== "") {
        deliverable.brandTagRequired = true;
      } else {
        deliverable.brandTagRequired = false;
      }

      if (deliverable.hashTag && deliverable.hashTag !== "") {
        deliverable.hashTagRequired = true;
      } else {
        deliverable.hashTagRequired = false;
      }

      return deliverable;
    });
    return data;
  };

  /*{function}invoked on campaign creation or save and finish later is clicked */
  const createCampaign = async (invite) => {
    try {
      if (discountType === "Amount") {
        typ = "FLAT";
        val =
          '{"amount":{"amount":"' +
          discount +
          '","currency":"USD"},"minimum":{"amount":"' +
          minimium +
          '","currency":"USD"}}';
      } else if (discountType === "Percentage") {
        typ = "PERCENTAGE";
        val = '{"percentage":"' + discount + '"}';
      }

      setErrorMessage("");

      let data = {
        brandId,
        // team: ,
        name: campaignName,
      };

      if (startDate !== "") {
        data = {
          ...data,
          startDate: Date.parse(`${startDate} ${startTime} `) / 1000,
        };
      }
      if (endDate !== "") {
        data = {
          ...data,
          endDate: Date.parse(`${endDate} ${endTime} `) / 1000,
        };
      }

      if (discountType !== "" && discount !== "") {
        data = {
          ...data,
          discount: { value: val, type: typ },
        };
      }

      if (customeMessage !== "") {
        data = {
          ...data,
          invitationMessage: customeMessage,
        };
      }

      if (budget !== "") {
        data = {
          ...data,
          budget: { amount: budget, currency: "USD" },
        };
      }

      if (targetGrossSale !== "") {
        data = {
          ...data,
          targetGrossSales: { amount: targetGrossSale, currency: "USD" },
        };
      }
      if (
        deliveries &&
        deliveries.length > 0 &&
        deliveries[0].platform !== ""
      ) {
        data = {
          ...data,
          deliverables: getDeliverablesForAPI(),
        };
      }

      if (selectedMembers && selectedMembers.length > 0) {
        data = {
          ...data,
          team: selectedMembers,
        };
      }

      if (
        compensations &&
        compensations.length > 0 &&
        compensations[0].compensationType !== ""
      ) {
        data = {
          ...data,
          compensation: getCompensations(),
        };
      }

      if (stepSeven) {
        data = {
          ...data,
          negotiables: getNegotiablesObjectForAPI(),
        };
      }

      if (influencer && influencer.id && influencer.id !== "") {
        data.influencerId = influencer.id;
      }

      if (compensationPayment !== "") {
        data.paymentSchedule = compensationPayment;
      }

      let response = await createCampaignMutation(data);

      if (
        response &&
        response !== null &&
        response.error === false &&
        response.data !== null
      ) {
        await updateCampaignProducts(response.data.id, invite);

        setId(response.data.id);

        if (invite === undefined) {
          handleCancel();
        }

        return response.data.id;
      } else {
        setDeliveries(APIErrorDeliverables());
        setErrorMessage(response.message);

        return null;
      }
    } catch (e) {
      setDeliveries(APIErrorDeliverables());
      setErrorMessage(e);

      return null;
    }
  };

  /**handle dropdown of collections */
  const handleCollectionExpand = (value, index) => {
    const collect = [...collections];
    if (value === true) {
      collect[index].expand = false;
    } else {
      collect[index].expand = true;
    }

    setCollections(collect);
  };

  /**API call for update the campaign products */
  const updateCampaignProducts = async (id, invite) => {
    if (products && products.length > 0) {
      try {
        let data = {
          brandId,
          id: id,
          products: _.filter(products, (prod) => prod.products.length > 0),
        };

        if (
          compensations &&
          compensations.length > 0 &&
          compensations[0].compensationType !== ""
        ) {
          data = {
            ...data,
            compensation: getCompensations(),
          };
        }

        let result = await updateCampaignMutation(data);
        if (result.error === false) {
          if (invite === undefined) {
            handleCancel();
          }
          if (invite === true) {
            setInviteLoading(true);
            setTimeout(
              () => invited(campaign && campaign.id ? campaign.id : id),
              2000
            );
          }
        } else {
          setErrorMessage(result.message);
        }
      } catch (err) {
        console.log(err);
        setErrorMessage(err);
      }
    } else {
      if (invite === undefined) {
        handleCancel();
      }
    }
  };

  /**{function} to update the campaign */
  const updateCampaign = async (invite) => {
    if (discountType === "Amount") {
      typ = "FLAT";
      val =
        '{"amount":{"amount":"' +
        discount +
        '","currency":"USD"},"minimum":{"amount":"' +
        minimium +
        '","currency":"USD"}}';
    } else if (discountType === "Percentage") {
      typ = "PERCENTAGE";
      val = '{"percentage":"' + discount + '"}';
    }
    setErrorMessage("");

    try {
      let data = {
        brandId,
        id: campaign.id,
        name: campaignName,
      };

      if (startDate !== "") {
        data = {
          ...data,
          startDate: Date.parse(`${startDate} ${startTime} `) / 1000,
        };
      }
      if (endDate !== "") {
        data = {
          ...data,
          endDate: Date.parse(`${endDate} ${endTime} `) / 1000,
        };
      }

      if (discountType !== "" && discount !== "") {
        data = {
          ...data,
          discount: { value: val, type: typ },
        };
      }

      if (customeMessage !== "") {
        data = {
          ...data,
          invitationMessage: customeMessage,
        };
      }

      if (selectedMembers && selectedMembers.length > 0) {
        data = {
          ...data,
          team: selectedMembers,
        };
      }

      if (budget !== "") {
        data = {
          ...data,
          budget: { amount: budget, currency: "USD" },
        };
      }

      if (targetGrossSale !== "") {
        data = {
          ...data,
          targetGrossSales: { amount: targetGrossSale, currency: "USD" },
        };
      }

      if (
        deliveries &&
        deliveries.length > 0 &&
        deliveries[0].platform !== ""
      ) {
        data = {
          ...data,
          deliverables: getDeliverablesForAPI(),
        };
      }

      if (
        compensations &&
        compensations.length > 0 &&
        compensations[0].compensationType !== ""
      ) {
        data = {
          ...data,
          compensation: getCompensations(),
        };
      }

      if (campaign.negotiables !== null || stepSeven) {
        data = {
          ...data,
          negotiables: getNegotiablesObjectForAPI(),
        };
      }

      if (
        influencer &&
        influencer.id &&
        influencer.id !== null &&
        influencer.id !== ""
      ) {
        data.influencerId = influencer.id;
      }

      if (compensationPayment !== "") {
        data.paymentSchedule = compensationPayment;
      }

      let response = await updateCampaignMutation(data);

      await updateCampaignProducts(campaign.id, invite);

      if (
        response &&
        response !== null &&
        response.error === false &&
        response.data.id
      ) {
        return response.data.id;
      } else {
        setErrorMessage(response.message);
        setDeliveries(APIErrorDeliverables());
        return null;
      }
    } catch (e) {
      setDeliveries(APIErrorDeliverables());
      console.log("update campaign error ", e);
      setErrorMessage(e);
      return null;
    }
  };

  /**{function} invoked on send invite button
   * Contain a mutation API
   */
  const sendCampaignInvite = async () => {
    let iid = null;
    if (campaign === undefined || campaign === null) {
      if (id === "") {
        iid = await createCampaign(true);
      } else {
        updateCampaignProducts(id, true);
      }
    } else {
      iid = await updateCampaign(true);
    }
  };

  const invited = async (id) => {
    try {
      await API.graphql(
        graphqlOperation(
          `mutation MyMutation {
							sendCampaignInvite(brandId: "${brandId}", id: "${id}") {
								id
							}
						}`
        )
      );
      setInviteLoading(false);

      if (campaign !== undefined) {
        handleCancel();
      } else {
        gotoCampaginDetail(campaign !== undefined ? campaign.id : id);
      }
    } catch (e) {
      setInviteLoading(false);
      console.log("Campaign Invite error ", e);
      let message = "";

      if (e.errors && e.errors.length > 0)
        e.errors.forEach((m) => {
          message = message + m.message;
        });

      setErrorMessage(message);
    }
  };

  const gotoCampaginDetail = (id) => {
    history.push(`/campaignDetail/${id}`, { campaignId: id });
    setActiveRoute("campaignDetail");
  };

  /**API call for geting collection data*/
  const getCollection = async () => {
    try {
      const collectionsResponse = await getCollectionsQuery(brandId);

      if (collectionsResponse.error === false) {
        setCollections(
          collectionsResponse.data.map((obj) => ({
            ...obj,
            expand: false,
          }))
        );
      } else {
        setErrorMessage(collectionsResponse.message);
      }

      if (
        campaign.products &&
        campaign.products !== null &&
        campaign.products.length > 0
      ) {
        if (collectionsResponse.error === false) {
          setProducts(
            getCampaignsProducts(
              collectionsResponse.data.map((obj) => ({
                ...obj,
                expand: false,
              }))
            )
          );
        }
      }
    } catch (err) {
      if (
        err &&
        err.data &&
        err.data !== null &&
        err.data.collections &&
        err.data.collections !== null
      ) {
        setCollections(err.data.collections.collections);
      }
    }
  };

  /************* Active for deliverable */

  const setActiveForDeliverables = () => {
    const deliverables = [...deliveries];
    let ActiveValue = [...activeStepValue];

    let flag = true;
    deliverables.forEach((delive) => {
      if (delive.platform === "Facebook" || delive.platform === "Instagram") {
        if (delive.postType === "Post") {
          delive.framesRequired = null;
        } else if (delive.framesRequired == null) {
          delive.framesRequired = "";
        }
      }
      if (
        delive.platform === "Youtube" ||
        delive.platform === "Tiktok" ||
        delive.platform === "Twitch"
      ) {
        delive.frameContentType = null;
        delive.framesRequired = null;
        delive.postType = null;
      }
      if (delive.platform === "Twitter") {
        delive.framesRequired = null;
        delive.frameContentType = null;
        delive.postType = null;
      }
      if (
        delive.deadlineDate === "" ||
        delive.platform === "" ||
        delive.postType === "" ||
        delive.frameContentType === "" ||
        delive.framesRequired === "" ||
        delive.posts === "" ||
        delive.frequency === ""
      ) {
        flag = false;
      }
      if (
        (delive.brandTagRequired === true && delive.brandTag === "") ||
        (delive.hashTagRequired === true && delive.hashTag === "")
      ) {
        flag = false;
      }
    });
    setActiveNext(flag);
    ActiveValue[5] = flag;
    setActiveStepValue(ActiveValue);
  };

  /************* Active for compensations */

  const setActiveForCompensation = () => {
    let ActiveValue = [...activeStepValue];
    if (compensationPayment === "") {
      setActiveNext(false);
      ActiveValue[6] = false;
      setActiveStepValue(ActiveValue);
    }
    const compensation = [...compensations];

    let flag = true;
    compensation &&
      compensation.forEach((comp) => {
        if (
          comp.compensationType === "" ||
          comp.amount === "" ||
          (comp.compensationType === "GIFT_CARD" && giftCode != "")
        ) {
          flag = false;
        }
      });
    setActiveNext(flag);
    ActiveValue[6] = flag;
    setActiveStepValue(ActiveValue);
  };

  /************* Active for Negotiables */

  const setActiveForNegotialble = () => {
    let ActiveValue = [...activeStepValue];
    const negotiable = [...selectedNegotiable];

    let flag = false;
    negotiable.forEach((comp) => {
      if (comp.isChecked === true) {
        flag = true;
      }
    });
    setStepSeven(true);
    setActiveNext(flag);
    ActiveValue[7] = flag;
    setActiveStepValue(ActiveValue);
  };

  /************* Active for influncer */

  const setActiveForInfluncer = () => {
    let ActiveValue = [...activeStepValue];
    setActiveNext(influencer !== null ? true : false);
    ActiveValue[8] = influencer !== null ? true : false;
    setActiveStepValue(ActiveValue);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const members = [...team];
    setTeam(members.filter((item) => item.user.email.includes(e.target.value)));
    if (e.target.value === "") {
      getTeam();
    }
  };

  // /*********************** To disable next button */

  const leftSideDawerClick = (index) => {
    if (
      activeStep >= index ||
      activeStepValue[index] === true ||
      endStep === index
    ) {
      if (index > endStep || index === endStep) {
        setEndStep(1);
      }
      if (endStep === 1) {
        setEndStep(activeStep);
      }
      setActiveStep(index);
    } else return;
  };

  /**setting campaign name and name validation*/
  const handleCampaignName = (e) => {
    setCampaignName(e.target.value);
    if (e.target.value !== "") {
      let campaignName = e.target.value.trim();
      const index = campaigns.findIndex((item) => item.name === campaignName);

      if (index !== -1) {
        setCampaignError("This name already exists");
      } else {
        setCampaignError("");
      }
    }
  };

  const handleMinimum = (e) => {
    const value = e.target.value.replace(/[^\d]/, "");
    if (parseInt(value) !== 0) {
      setMinimium(value);
    }
  };

  const handleCollectionClear = () => {
    let cols = [...collections];
    cols = cols.map((item) => {
      item.expand = false;
      return item;
    });
    setCollections(cols);
  };
  /**{function} provide the content of the current step */
  const getStepContent = (activeStep) => {
    switch (activeStep) {
      case 1:
        return (
          <AddCampaignDetails
            campaignName={campaignName}
            startDate={startDate}
            startDateError={startDateError}
            endDateError={endDateError}
            endDate={endDate}
            startTime={startTime}
            startTimeError={startTimeError}
            endTime={endTime}
            endTimeError={endTimeError}
            discount={discount}
            discountType={discountType}
            customeMessage={customeMessage}
            handleCampaignName={handleCampaignName}
            startDateOpen={startDateOpen}
            endDateOpen={endDateOpen}
            startTimeOpen={startTimeOpen}
            endTimeOpen={endTimeOpen}
            campaignError={campaignError}
            minimium={minimium}
            handleMinimium={handleMinimum}
            handleStartDate={handleStartDate}
            handleStartDateOpen={(value) => setStartDateOpen(value)}
            handleEndDateOpen={(value) => setEndDateOpen(value)}
            handleStartTimeOpen={(value) => setStartTimeOpen(value)}
            handleEndTimeOpen={(value) => setEndTimeOpen(value)}
            handleEndDate={handleEndDate}
            handleStartTime={(e) => {
              setStartTime(moment(e).format("hh:mm A"));
              setStartTimeOpen(false);
              handleStartTimeValidation(moment(e).format("hh:mm"));
            }}
            handleEndTime={(e) => {
              setEndTime(moment(e).format("hh:mm A"));
              setEndTimeOpen(false);
              handleEndTimeValidation(moment(e).format("hh:mm"));
            }}
            handleDefaultDate={handleDefaultDate}
            handleDefaultTime={handleDefaultTime}
            dummyStartDate={dummyStartDate}
            dummyStartEndTime={dummyStartEndTime}
            handleDiscount={handleDiscount}
            handleDiscountType={handleDiscountType}
            handleCustomMessage={(e) => {
              setCustomMessage(e.target.value);
            }}
            filledForm={filledForm}
            partialFilledForm={partialFilledForm}
          />
        );
      case 2:
        return (
          <AddTeamMembers
            selectedMembers={selectedMembers}
            handleAdd={addMember}
            members={team}
            handleActiveNext={() => {
              let ActiveValue = [...activeStepValue];
              ActiveValue[2] = true;
              setActiveStepValue(ActiveValue);
              setActiveNext(true);
            }}
            search={search}
            handleSearch={handleSearch}
          />
        );
      case 3:
        return (
          <BudgetConversionGoal
            budget={budget}
            handleBudget={handleBudget}
            handleGrossSale={handleGrossSale}
            targetGrossSale={targetGrossSale}
            setActiveForBudget={setActiveForBudget}
          />
        );
      case 4:
        return (
          <Collection
            collections={collections}
            setCollections={setCollections}
            handleCollectionItem={handleCollectionItem}
            handleActiveForCollection={setActiveForCollection}
            handleCollectionExpand={handleCollectionExpand}
            handleCollectionAllCheck={handleCollectionAllCheck}
            handleCollectionAllUncheck={handleCollectionAllUncheck}
            products={products}
          />
        );
      case 5:
        return (
          <Deliverables
            deliveries={deliveries}
            handleDeliveries={handleDeliverable}
            handleDilverableContent={handleDilverableContent}
            handleDeliverDeadlineDate={handleDeliverDeadlineDate}
            deliverableDate={deliverableDate}
            handleDeliverableDate={(value) => setDeliverableDate(value)}
            handleActiveForDeliverable={setActiveForDeliverables}
            handleRemoveDeliverable={handleRemoveDeliverable}
            deliverableDeadlineDateError={deliverableDeadlineDateError}
            fb={fb}
            insta={insta}
            tictock={tictock}
            youtube={youtube}
            twitch={twitch}
            twitter={twitter}
          />
        );
      case 6:
        return (
          <Compensations
            compensations={compensations}
            handleCompensations={handleCompensations}
            handleCompensationValue={handleCompensationValue}
            handleRemoveCompensation={handleRemoveCompensation}
            handleActiveForCompensation={setActiveForCompensation}
            addAnother={addAnother}
            compensationPayment={compensationPayment}
            handleCompensationPayment={handleCompensationPayment}
            compensationProduct={collections}
            handleCompensationProducts={handleCompensationProducts}
            compensationProductItems={items}
            compensationProducts={collections}
            handleCollectionExpand={handleCollectionExpand}
            handleActiveForCompensationProduct={setActiveForCompensationProduct}
            handleCompensationProductItem={handleCompensationProductItem}
            giftCode={giftCode}
            products={compensationProducts}
            handleGiftCode={(e) => setGiftCode(e.target.value)}
            clearCollections={handleCollectionClear}
          />
        );
      case 7:
        return (
          <Negotiables
            selectedNegotiable={selectedNegotiable}
            toggleNegotiable={toggleNegotiable}
            handleActiveForNegotiable={setActiveForNegotialble}
          />
        );
      case 8:
        return (
          <ChooseInfluencer
            selectedInfluncer={influencer}
            toggleInfluncer={toggleInfluncer}
            influencers={influencers}
            handleActiveForInfluncer={setActiveForInfluncer}
          />
        );
      case 9:
        return (
          <ReviewAndSend
            campaignName={campaignName}
            startDate={startDate}
            endDate={endDate}
            startTime={startTime}
            endTime={endTime}
            discount={discount}
            minimum={minimium}
            discountType={discountType}
            customeMessage={customeMessage}
            selectedMembers={selectedMembers}
            budget={budget}
            targetGrossSale={targetGrossSale}
            collections={collections}
            products={products}
            deliverables={deliveries}
            compensations={compensations}
            compensationPayment={compensationPayment}
            selectedNegotiable={selectedNegotiable}
            selectedInfluncer={influencer}
            handleActiveStep={(value) => setActiveStep(value)}
            toggleComponent={toggleComponent}
            team={team}
            handleActiveNext={() => {
              let ActiveValue = [...activeStepValue];
              ActiveValue[9] = true;
              setActiveStepValue(ActiveValue);
              setActiveNext(true);
            }}
          />
        );
      default:
        return "Unknown step";
    }
  };

  /**{function} to get the little information about the step */
  const getStepInfo = () => {
    switch (activeStep) {
      case 1:
        return "Fill out the main details of this campaign";
      case 2:
        return "Team members you add will have access to information in this campaign";
      case 3:
        return "Define the influencer compensation budget and target gross sales";
      case 4:
        return "Choose the item you want to pormote in this campaign";
      case 5:
        return "Outline the deliverables you expect from the influencer";
      case 6:
        return "Choose the compensation types and ammounts for the influencer";
      case 7:
        return "Deselect the items you do not wish to negotiate with the influencer.";
      case 8:
        return "";
      case 9:
        return "";
      default:
        return "un";
    }
  };
  /** {function} checks for activeSave */
  const partialFilledForm = () => {
    if (campaignName !== "" && campaignError === "") {
      setActiveSave(true);
    } else {
      setActiveSave(false);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  const getCampaigns = async () => {
    try {
      const campaigns = await API.graphql({
        query: `{
        campaigns(brandId: "${brandId}") {
          campaigns {
            name
          }
        }
      }`,
      });
      setCampaigns(campaigns.data.campaigns.campaigns);
    } catch (e) {}
  };

  /**checks to active the Next button*/
  const filledForm = () => {
    if (
      campaignError === "" &&
      campaignName !== "" &&
      startDate !== "" &&
      endDate !== "" &&
      startTime !== "" &&
      endTime !== "" &&
      discount !== "" &&
      discountType !== "" &&
      customeMessage !== "" &&
      startDateError === false &&
      endDateError === false &&
      startTimeError === false &&
      endTimeError === false
    ) {
      let ActiveValue = [...activeStepValue];
      setActiveNext(true);
      ActiveValue[1] = true;
      setActiveStepValue(ActiveValue);
    } else {
      let ActiveValue = [...activeStepValue];
      setActiveNext(false);
      ActiveValue[1] = false;
      setActiveStepValue(ActiveValue);
    }
  };

  useEffect(() => {
    let activityValues = [...activeStepValue];
    if (campaign !== undefined) {
      if (
        campaign.name !== "" &&
        campaign.startDate !== "" &&
        campaign.startDate !== null &&
        campaign.endDate !== "" &&
        campaign.end !== null &&
        campaign.discount !== "" &&
        campaign.discount !== null &&
        campaign.discountType !== "" &&
        campaign.discountType !== null &&
        campaign.invitationMessage !== "" &&
        campaign.invitationMessage !== null
      ) {
        activityValues[1] = true;
      }
      if (
        campaign.budget &&
        campaign.budget !== null &&
        campaign.targetGrossSales &&
        campaign.targetGrossSales !== null
      ) {
        activityValues[2] = true;
        activityValues[3] = true;
      }
      if (campaign.products && campaign.products.length > 0) {
        activityValues[4] = true;
      }
      if (
        campaign.deliverables &&
        campaign.deliverables !== null &&
        campaign.deliverables.length
      ) {
        activityValues[5] = true;
      }

      if (
        campaign.compensation &&
        campaign.compensation !== null &&
        campaign.compensation.length !== 0
      ) {
        activityValues[6] = true;
      }

      if (campaign.influencer && campaign.influencer !== null) {
        activityValues[8] = true;
      }

      if (campaign.negotiables) {
        activityValues[7] = true;
      }

      if (
        activityValues[1] &&
        activityValues[2] &&
        activityValues[3] &&
        activityValues[4] &&
        activityValues[5] &&
        activityValues[6] &&
        activityValues[7] &&
        activityValues[8]
      ) {
        activeStepValue[9] = true;
      }
      setActiveStepValue(activityValues);
    }
  }, []);

  const handleNext = (activeSetp) => {
    if (activeStep === 1) {
      const startDateTime = moment(startDate + " " + startTime);
      if (startDateTime.isBefore(moment())) {
        setStartTimeError(true);
      } else {
        setStartTimeError(false);
        if (lastStep !== 0) {
          setActiveStep(lastStep);
          setLastStep(0);
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          if (activeSetp > endStep) {
            setEndStep(1);
          }
        }
      }
    } else if (activeSetp !== 9) {
      if (lastStep !== 0) {
        setLastStep(0);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeSetp > endStep) {
          setEndStep(1);
        }
      }
    }
  };

  /**goto previous step */
  const handleBack = () => {
    if (endStep === 1) {
      setEndStep(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancelCampaignDialog = () => {
    if (campaignName !== "" && startDate !== "" && endDate !== "") {
      setOpenCDialog(true);
    } else {
      handleCancel();
    }
  };

  const handleCancelCDialog = () => {
    setOpenCDialog(false);
    setStartTimeError(false);
    setEndTimeError(false);
    setStartDateError(false);
    setEndDateError(false);
    handleCancel();
  };
  const handleConfirmCDialog = () => {
    setOpenCDialog(false);
  };
  const handleSaveCDialog = () => {};
  return (
    <>
      <Dialog
        classes={{ paper: styles.addCampaignDialog }}
        aria-labelledby="confirmation-dialog-title"
        open={open}
      >
        <div className={styles.mainContainer}>
          <div className={styles.campaignSideabr}>
            <img
              className={styles.logoDiv}
              src={`${process.env.PUBLIC_URL}/images/FomoPromo_logo__white.png`}
              alt="Logo"
            />
            <h2 className={styles.heading}>Create a Campaign</h2>
            <div className={styles.setpsContainer}>
              {steps.map((label, index) => (
                <>
                  {index > 0 ? (
                    <div key={Math.random()} className={styles.stepItem}>
                      {activeStep === index &&
                      activeStepValue[index + 1] !== true &&
                      endStep !== 0 &&
                      index !== endStep - 1 ? (
                        <div className={styles.active}></div>
                      ) : activeStepValue[9] === true && index === 9 ? (
                        <div className={styles.active}></div>
                      ) : activeStepValue[index] !== true &&
                        activeStep !== endStep &&
                        endStep > activeStep &&
                        endStep >= index &&
                        activeStep !== index &&
                        index !== 9 ? (
                        <div className={styles.active}></div>
                      ) : activeStep < index &&
                        activeStepValue[index] === false ? (
                        <RadioButtonUncheckedIcon />
                      ) : activeStep < index &&
                        activeStepValue[index] === false ? (
                        <RadioButtonUncheckedIcon />
                      ) : (
                        <CheckCircleIconSvg viewBox="0 0 31 31" />
                      )}
                      <span
                        className={
                          activeStep === index ||
                          activeStepValue[index] === true ||
                          (activeStepValue[index] !== true &&
                            activeStep !== endStep &&
                            endStep > activeStep &&
                            endStep >= index)
                            ? styles.activeLabel
                            : styles.inActiveLabel
                        }
                        onClick={() => leftSideDawerClick(index)}
                      >
                        {label}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {index > 0 ? (
                    <div key={Math.random()} className={styles.stepItem}>
                      {activeStep > index ||
                      (activeStepValue[index + 1] === true && index !== 9) ? (
                        <div className={styles.activeBar} />
                      ) : endStep !== activeStep &&
                        endStep > activeStep &&
                        endStep > index &&
                        index !== 9 ? (
                        <div className={styles.activeBar} />
                      ) : (
                        <div className={styles.inActiveBar} />
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>
          </div>
          <div className={styles.campaignContainer}>
            <DialogTitle className={styles.dialogTitle}>
              <div className={styles.header}>
                {activeStep > 1 ? (
                  <span onClick={handleBack}>
                    <ChevronSVG />
                  </span>
                ) : (
                  <div></div>
                )}
                <span onClick={handleCancelCampaignDialog}>
                  <XSVG />
                </span>
              </div>
              <div className={styles.stepperAndComponent}>
                <div className={styles.stepperNumberAndNameContainer}>
                  <p>
                    STEP {activeStep} OF {steps.length - 1}
                  </p>
                  <h2>{steps[activeStep]}</h2>
                  {getStepInfo(activeStep) && (
                    <div className={styles.stepInfo}>
                      {getStepInfo(activeStep)}
                    </div>
                  )}
                </div>

                <Stepper
                  alternativeLabel
                  activeStep={activeStep}
                  connector={<QontoConnector />}
                  className={styles.stepperContainer}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
              <div className={styles.stepperAndComponent}>
                <div className={styles.stepperContent}>
                  {getStepContent(activeStep)}
                </div>
              </div>
            </DialogContent>

            <div className={styles.actions}>
              <div className={styles.finishLater}>
                {activeSave || (campaign !== undefined && activeSave) ? (
                  <span
                    onClick={() => {
                      campaign !== undefined
                        ? updateCampaign()
                        : createCampaign();
                    }}
                  >
                    {campaign !== undefined
                      ? "Save and exit"
                      : "Save and finish later"}
                  </span>
                ) : null}
              </div>
              <div>
                {inviteLoading && (
                  <CircularProgress className={fabClass.fabProgress} />
                )}
                <button
                  onClick={(e) =>
                    activeStep === 9
                      ? sendCampaignInvite()
                      : handleNext(activeStep, e)
                  }
                  className={clsx(
                    styles.nextButton,
                    activeNext ? styles.activeButton : styles.inActiveButton
                  )}
                  disabled={!activeNext}
                >
                  {activeStep === 9 ? "Send Invite" : "Next"}
                </button>
              </div>
            </div>
            {errorMessage !== "" && (
              <div className={styles.errorMessage1}>{errorMessage}</div>
            )}
          </div>
        </div>
      </Dialog>
      <CDialog
        onAddCampaignSave={handleSaveCDialog}
        open={openCDialog}
        cancelText={"Exit"}
        confirmText={"Keep working"}
        onCancel={handleCancelCDialog}
        onConfirm={handleConfirmCDialog}
        message={
          campaign
            ? "Are you sure you want to exit? You will lose all progress on this campaign and it will be deleted."
            : Translation.DIALOG.CAMPAIGN_CDIALOG_MSG
        }
      />
    </>
  );
};

export default AddCampaign;
