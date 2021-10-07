import React, { useState, useRef, useContext, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle, DialogContent, SvgIcon } from "@material-ui/core";
import styles from "./Onboarding.module.scss";
import SVG from "react-inlinesvg";
import RegistrationCode from "./RegistrationCode";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import clsx from "clsx";
import UserTypes from "./UserType";
import BrandName from "./BrandName";
import DisplayName from "./DisplayName";
import Billing from "./Billing";
import { useHistory } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { RootContext } from "../../context/RootContext";
/*Svg*/
const ChevronSVG = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/chevron-left.svg`} />;
};

const CheckCircleIconSvg = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/checkCircleIcon.svg`} />;
};

//******Stepper Element Design *************/

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-60% + 16px)",
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

/*Main start of OnBoarding component*/
const Onboarding = () => {
  /*State variables*/
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(1);
  const [activeNext, setActiveNext] = useState(false);
  const [userType, setUserType] = useState("influencer");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  const [brandName, setBrandName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [stepsName, setStepsNames] = useState(["Initial Step", "User Type"]);
  const [headingName, setHeadingName] = useState([
    "Initial Step",
    "What type of user are you?",
  ]);
  const [stepper, setStepper] = useState([
    "first",
    "second",
    "third",
    "fourth",
  ]);
  const codeEl1 = useRef(null);
  const codeEl2 = useRef(null);
  const codeEl3 = useRef(null);
  const codeEl4 = useRef(null);
  const subHeading = [
    "",
    "Tell us what type of user you are so we can personalize your experience",
    `This is the name that will appear on your brand's public profile`,
    "Setup your primary and secondary billing methods",
  ];
  /*Root context variables*/
  const { brandType, setBrandType } = useContext(RootContext);

  /**handleBack {function} get invoked when going to previous step */
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**handleNext {function} handle next button
	 and  decide sidebar title & heading title */
  const handleNext = async (activeSetp, e) => {
    if (activeSetp !== 3) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeSetp === 1) {
      if (userType === "brand") {
        let sets = ["Initial Step", "User Type", "Brand Name", "Billing"];
        let heading = [
          "Initial Step",
          "What type of user are you?",
          "Brand Name",
          "Billing",
        ];
        setStepsNames(sets);
        setHeadingName(heading);
      } else if (userType === "influencer") {
        let sets = ["Initial Step", "User Type", "Display Name", "Billing"];
        let heading = [
          "Initial Step",
          "What type of user are you?",
          "Display Name",
          "Billing",
        ];
        setStepsNames(sets);
        setHeadingName(heading);
      }
    }
    if (activeSetp === 3) {
      /******************************* Api not completed  */
      if (brandType !== null) {
        setBrandType(null);
      }

      switch (userType) {
        case "brand":
          const brandData = {
            input: {
              currencyType: "USD",
              timezone: 10,
            },
          };
          const brandMutationQuery = `mutation createBrand($input: CreateBrandInput!) {
            createBrand(input: $input) {
              imageUploadUrl
            }
          }
          `;
          brandData.input.name = brandName;
          await API.graphql(graphqlOperation(brandMutationQuery, brandData));
          break;

        case "influencer":
          const influencerData = {
            input: {
              currencyType: "USD",
              timezone: 10,
              fullName: "",
            },
          };
          const influencerMutationQuery = `mutation createInfluencer($input: CreateInfluencerInput!) {
            createInfluencer(input: $input) {
              imageUploadUrl
            }
          }
          `;
          influencerData.input.name = displayName;
          await API.graphql(
            graphqlOperation(influencerMutationQuery, influencerData)
          );
          break;

        default:
          break;
      }
      history.push("/campaigns");
    }
  };

  /**leftSideDawerClick {function} to handle the left sidebar step clicked*/
  const leftSideDawerClick = (index) => {
    if (activeStep >= index) {
      setActiveStep(index);
    } else return;
  };

  /**handleUserType {function} to set the user type */
  const handleUserType = (value) => {
    setUserType(value);
  };

  /**********{functions} to handle the next button disabled true or false ********/
  const setActiveNextForUserType = () => {
    if (userType !== "") {
      setActiveNext(true);
    } else setActiveNext(false);
  };

  const setActiveForCode = () => {
    if (first === 1 && second === 1 && third === 1 && fourth === 1) {
      setActiveNext(true);
    } else setActiveNext(false);
  };

  const setActiveForBrand = () => {
    if (brandName !== "" && userType === "brand") {
      setActiveNext(true);
    } else setActiveNext(false);
  };

  const setActiveForDisplay = () => {
    if (displayName !== "" && userType === "influencer") {
      setActiveNext(true);
    } else setActiveNext(false);
  };
  /**********************************************************************/

  /*getting content(data) to display in steps */
  const getStepContent = (activeStep) => {
    switch (activeStep) {
      case 1:
        return (
          <UserTypes
            userType={userType}
            handleUserType={handleUserType}
            handleActiveForUserType={setActiveNextForUserType}
          />
        );
      case 2:
        return userType === "brand" ? (
          <BrandName
            brandName={brandName}
            handlebrandName={(e) => setBrandName(e.target.value)}
            handleActiveForBrand={setActiveForBrand}
          />
        ) : (
          <DisplayName
            displayName={displayName}
            handleDisplayName={(e) => setDisplayName(e.target.value)}
            handleActiveForDisplay={setActiveForDisplay}
          />
        );
      case 3:
        return <Billing />;
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Dialog
        classes={{ paper: styles.onboardingDialog }}
        aria-labelledby="confirmation-dialog-title"
        open={true}
      >
        <div className={styles.mainContainer}>
          <div className={styles.onboardingSideabr}>
            <img
              className={styles.logoDiv}
              src={`${process.env.PUBLIC_URL}/images/FomoPromo_logo__white.png`}
              alt="Logo"
            />
            <h2 className={styles.heading}>Setup your account</h2>
            <div className={styles.setpsContainer}>
              {stepsName.map((label, index) => (
                <>
                  {index > 0 ? (
                    <div key={index} className={styles.stepItem}>
                      {activeStep === index ? (
                        <div className={styles.active}></div>
                      ) : activeStep < index ? (
                        <RadioButtonUncheckedIcon />
                      ) : (
                        <CheckCircleIconSvg viewBox="0 0 31 31" />
                      )}
                      <span
                        className={
                          activeStep === index
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
                    <div key={index} className={styles.stepItem}>
                      {activeStep > index ? (
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
          <div className={styles.onboardingContainer}>
            <DialogTitle className={styles.dialogTitle}>
              <div className={styles.header}>
                {activeStep > 1 ? (
                  <span onClick={handleBack}>
                    <ChevronSVG />
                  </span>
                ) : (
                  <div className={activeStep === 1 ? styles.header : ""} />
                )}
              </div>
              <div className={styles.stepperAndComponent}>
                <div className={styles.stepperNumberAndNameContainer}>
                  <p>STEP {activeStep} OF 3</p>
                  <h2>{headingName[activeStep]}</h2>
                  <p className={styles.subHeading}>
                    {activeStep === 2 && userType !== "brand"
                      ? "This is the name that appears on your public profile, use what will be the most recognizable"
                      : subHeading[activeStep]}
                  </p>
                </div>
                <Stepper
                  alternativeLabel
                  activeStep={activeStep}
                  connector={<QontoConnector />}
                  className={styles.stepperContainer}
                >
                  {stepper.map((label) => (
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
              <div className={styles.finishLater}></div>
              <button
                onClick={(e) => handleNext(activeStep, e)}
                className={clsx(
                  styles.nextButton,
                  activeNext ? styles.activeButton : styles.inActiveButton
                )}
                disabled={!activeNext}
              >
                {activeStep === 3 ? "Complete" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Onboarding;
