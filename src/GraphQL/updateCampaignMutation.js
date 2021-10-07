import { API, graphqlOperation } from 'aws-amplify';

const updateCampaignMutation = async (data) => {
    try {
        const { data: {
            updateCampaign
        } } = await API.graphql(
            graphqlOperation(
                `mutation updateCampaign($input : UpdateCampaignInput!) {
                updateCampaign(input: $input) {
                  id
                  name
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
            }`,
                {
                    input: data,
                }
            )
        );

        if (updateCampaign && updateCampaign !== null) {
            return ({
                error: false,
                data: updateCampaign
            });
        }
    } catch (error) {
        let message = '';

        if (error.errors && error.errors.length > 0)
            error.errors.forEach((m) => {
                message = message + m.message;
            });

        return ({
            error: true,
            message: message
        })
    }
};

export default updateCampaignMutation;