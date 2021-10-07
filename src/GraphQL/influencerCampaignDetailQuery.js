import { API } from "aws-amplify";

const influencerCampaignDetailQuery = async (brandId, campaignId) => {
  try {
    const {
      data: { influencerCampaign },
    } = await API.graphql({
      query: `{
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
                micrositeUrl
                declineMessage
                declineReason
                negotiations {
                  id
                  message
                  postFee {
                    amount
                    currency
                  }
                  revenueShare {
                    percentage
                  }
                  monthlyRetainerFee {
                    amount
                    currency
                  }
                  giftCard {
                    amount
                    currency
                  }
                  campaignDuration {
                    endDate
                    startDate
                    totalDuration
                  }
                  organization {
                    id
                    name
                  }
                  created
                }
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
						declineMessage
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
         
      }`,
    });

    if (influencerCampaign && influencerCampaign !== null) {
      return {
        error: false,
        data: influencerCampaign,
      };
    }
  } catch (error) {
    let message = "";
    if (error.errors && error.errors.length > 0)
      error.errors.forEach((m) => {
        message = message + m.message;
      });

    return {
      error: true,
      message: message,
    };
  }
};

export default influencerCampaignDetailQuery;
