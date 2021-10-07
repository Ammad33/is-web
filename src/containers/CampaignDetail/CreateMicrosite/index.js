import React, { useState, useEffect, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import styles from "./CreateMicrosite.module.scss";
import { ChevronRight, ChevronLeft } from "react-feather";
import Template from "./WhitneyTemplate";
import ChangeTemplate from "../ChangeTemplate";
import { API } from "aws-amplify";
import { RootContext } from "../../../context/RootContext";
import Tooltip from "@material-ui/core/Tooltip";

const CreateMicrosite = ({ location }) => {
  let campaignId = "campaign" + location.hash;

  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const [saveBack, setSaveBack] = useState("");
  const [confirmTemplate, setConfirmTemplate] = useState(false);
  const [changeTemplate, setChangeTemplate] = useState(false);
  const [temprorayTemplate, setTemprorayTemplate] = useState("");
  const {
    brandId,
    templated,
    setTemplate,
    setCreateMicrositeFlag,
    setShowLoader,
    brandType,
  } = useContext(RootContext);
  const [count, setCount] = useState(0);

  const handleCancel = () => {
    setConfirmTemplate(false);
    setChangeTemplate(false);
  };
  const handleOk = () => {
    setTemplate(temprorayTemplate);
    setTemprorayTemplate("");
    setSaveBack("");
    setConfirmTemplate(false);
    setChangeTemplate(true);
  };

  useEffect(() => {
    getCampaign();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (
      data &&
      data !== null &&
      data.microsite !== undefined &&
      data.internalState !== "MICROSITE_APPROVAL_REQUESTED"
    ) {
      setTemplate(
        data &&
          data !== null &&
          data.microsite &&
          data.microsite != "" &&
          data.microsite !== null
          ? data.microsite.template
          : ""
      );
    }
    if (
      data &&
      data !== null &&
      data.internalState === "MICROSITE_APPROVAL_REQUESTED"
    ) {
      setTemplate("");
      setCreateMicrositeFlag(false);
    }
  }, [data]);

  const handleTemplateClick = (index) => {
    if (saveBack !== "" && saveBack !== index) {
      setConfirmTemplate(true);
      setTemprorayTemplate(index);
    } else {
      setChangeTemplate(false);
      setTemplate(index);
      if (count !== 0) {
        getCampaign();
      }
      setCount(1);
    }
  };

  console.log(data && data !== null && data.microsite);

  const getCampaign = async () => {
    setShowLoader(true);
    try {
      const campaign = await API.graphql({
        query:
          brandType.toLowerCase() === "influencer"
            ? `{
          influencerCampaign(influencerId: "${brandId}", id: "${campaignId}") {
            id
						name
						status
            startDate
            endDate
						invitationMessage
						invitedAt
            internalState
            paymentSchedule
            products {
              collection {
                id
                name
              }
              products {
                product {
                  id
                  name
                  priceRange {
                    max {
                      amount
                      currency
                    }
                    min {
                      amount
                      currency
                    }
                  }
                  images {
                    images {
                      altText
                      src
                    }
                  }
                  estimatedQty
                }
              }
            }     
						discount {
							... on PercentageDiscount {
								__typename
								percentage
							}
							... on FlatDiscount {
								__typename
								amount {
									amount
                }
                minimum {
                  amount
                  currency
                }
							}
						}
            compensation {
              ... on CompRevenueShare {
                __typename
                percentage
              }
              ... on CompCashPerPost {
                __typename
                amount {
                  amount
                  currency
                }
              }
              ... on CompCashPerMonthlyDeliverable {
                __typename
                amount {
                  amount
                  currency
                }
              }
              ... on CompGiftCard {
                __typename
                amount {
                  amount
                  currency
                }
                code
              }
            }
            
            budget {
              amount
              currency
            }
            targetGrossSales {
              amount
              currency
            }

  
            brandTeam {
              id
              imageUrl
              fullName
              email
            }
            brand {
              imageUrl
              id
              name
            }
            negotiables {
              campaignDuration
              monthlyRetainerFee
              postFee
              postFrequency
              revenueShare
							giftCard
            }
            deliverables {
              brandTag
              deadlineDate
              postType
              description
              frameContentType
              framesRequired
              frequency
              hashTag
              id
              platform
              posts
            }
            
            influencer {
              imageUrl
              name
              id
            }
            events {
              description
              time
						}
						microsite {
							appHeader {
								shopCtaColor
								titleBgColor
								imageLarge
								image
								image1
								image2
								image3
							}
							footer {
								bgColor
							}
							hero {
								imageLarge
							}
							influencerQuote {
								bgColor
								textColor
								quoteIconColor
								quoteContent
							}
							productBuyBgColor
							productBuyTextColor
							shopBelow {
								bgColor
							}
							template
						}
          }
         
      }`
            : `{
          campaign(brandId: "${brandId}", id: "${campaignId}") {
            id
						name
						status
            startDate
            endDate
						invitationMessage
            invitedAt
						paymentSchedule
						internalState
						micrositeUrl
            products {
              collection {
                id
                name
              }
              products {
                product {
                  id
                  name
                  priceRange {
                    max {
                      amount
                      currency
                    }
                    min {
                      amount
                      currency
                    }
                  }
                  images {
                    images {
                      altText
                      src
                    }
                  }
                  estimatedQty
                }
              }
            }       
						discount {
							... on PercentageDiscount {
								__typename
								percentage
							}
							... on FlatDiscount {
								__typename
								amount {
									amount
                }
                minimum {
                  amount
                  currency
                }
							}
						}
            compensation {
              ... on CompRevenueShare {
                __typename
                percentage
              }
              ... on CompCashPerPost {
                __typename
                amount {
                  amount
                  currency
                }
              }
              ... on CompCashPerMonthlyDeliverable {
                __typename
                amount {
                  amount
                  currency
                }
              }
              ... on CompGiftCard {
                __typename
                amount {
                  amount
                  currency
                }
                code
              }
            }
            
            budget {
              amount
              currency
            }
            targetGrossSales {
              amount
              currency
            }

            
            brandTeam {
              id
              imageUrl
              fullName
              email
            }
            brand {
              imageUrl
              id
              name
            }
            negotiables {
              campaignDuration
              monthlyRetainerFee
              postFee
              postFrequency
              revenueShare
							giftCard
            }
            deliverables {
              brandTag
              deadlineDate
              postType
              description
              frameContentType
              framesRequired
              frequency
              hashTag
              id
              platform
              posts
            }
            influencer {
              imageUrl
              name
              id
            }
            events {
              description
              time
						}
						microsite {
							appHeader {
								shopCtaColor
								titleBgColor
							}
							footer {
								bgColor
							}
							influencerQuote {
								bgColor
								textColor
								quoteIconColor
							}
							productBuyBgColor
							productBuyTextColor
							shopBelow {
								bgColor
							}
							template
						}
          } 
      }`,
      });
      if (brandType.toLowerCase() == "influencer") {
        setShowLoader(false);
        setData(campaign.data.influencerCampaign);
      } else {
        setShowLoader(false);
        setData(campaign.data.campaign);
        setErrorMessage("");
      }
    } catch (e) {
      let message = errorMessage;

      if (e.errors && e.errors.length > 0)
        e.errors.forEach((m) => {
          message = message + m.message;
        });

      setErrorMessage(message);
    }
  };

  const handleCampaginDetail = (id) => {
    history.push(`/campaignDetail/${id}`, { campaignId: id });
  };

  return (
    <>
      <ChangeTemplate
        open={confirmTemplate}
        onCancel={handleCancel}
        onConfirm={handleOk}
      />
      <div className={styles.detailContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.crumsContainer}>
            <span onClick={() => history.push("/campaigns")}>Campaigns</span>
            <ChevronRight />
            <Tooltip title={data && data !== null && data.name}>
              <span
                onClick={() => {
                  handleCampaginDetail(campaignId);
                  setTemplate("");
                }}
              >
                {data && data !== null && data.name.length > 15
                  ? `${data.name.substring(0, 15)}...`
                  : data && data !== null && data.name}
              </span>
            </Tooltip>
            <ChevronRight />
            <span>Review and Sign</span>
            <ChevronRight />
            <span>Create Microsite</span>
          </div>
          {templated !== "" ? (
            <>
              <div
                onClick={() => {
                  const newValue = templated;
                  setSaveBack(newValue);
                  setTemplate("");
                }}
                className={styles.backTemplate}
              >
                <ChevronLeft />
                <span>Back to templates</span>
              </div>

              <Template
                campaignId={campaignId}
                internalState={data && data !== null && data.internalState}
                template={templated}
                microsite={
                  data && data !== null && data.microsite ? data.microsite : ""
                }
                influencer={data && data !== null && data.influencer}
                brand={data && data !== null && data.brand}
                changeTemplate={changeTemplate}
                getCampaign={getCampaign}
                handleCampaginDetail={handleCampaginDetail}
              />
            </>
          ) : (
            <div className={styles.contentContainer}>
              <div className={styles.micrositeContainer}>
                <p> Choose a microsite template below and then customize it.</p>
                <div className={styles.templateContainer}>
                  <div className={styles.template}>
                    <div onClick={() => handleTemplateClick("ONE")}>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/Microstie_Template_1.png`}
                      />
                    </div>
                    <h6>Whitney</h6>
                  </div>
                  <div className={styles.template}>
                    <div onClick={() => handleTemplateClick("TWO")}>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/Microstie_Template_2.png`}
                      />
                    </div>
                    <h6>Everett</h6>
                  </div>
                  <div className={styles.template}>
                    <div onClick={() => handleTemplateClick("FOUR")}>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/Microstie_Template_3.png`}
                      />
                    </div>
                    <h6>Lemmon</h6>
                  </div>
                  <div className={styles.template}>
                    <div onClick={() => handleTemplateClick("THREE")}>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/Microstie_Template_4.png`}
                      />
                    </div>
                    <h6>Arvon</h6>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateMicrosite);
