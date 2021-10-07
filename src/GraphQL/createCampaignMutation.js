import { API, graphqlOperation } from "aws-amplify";

const createCampaignMutation = async (data) => {
  try {
    const {
      data: { createCampaign },
    } = await API.graphql(
      graphqlOperation(
        `mutation createCampaign($input: CreateCampaignInput!) {
            createCampaign(input: $input) {
              id
              name
              startDate
              endDate
              compensation {
                ... on CompCashPerPost {
                  __typename
                  amount {
                    amount
                    currency
                  }
                }
              }
    
            }
          }
          `,
        {
          input: data,
        }
      )
    );

    if (createCampaign && createCampaign !== null) {
      return {
        error: false,
        data: createCampaign,
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

export default createCampaignMutation;
