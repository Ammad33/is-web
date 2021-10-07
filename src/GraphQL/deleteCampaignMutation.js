import { API, graphqlOperation } from "aws-amplify";

const deleteCampaignMutation = async (data) => {
  try {
    let {
      data: { deleteCampaign },
    } = await API.graphql(
      graphqlOperation(
        `mutation deleteCampaign($brandId: ID!, $id: ID!) {
                        deleteCampaign(brandId: $brandId, id:$id)
                    }`,
        data
      )
    );

    if (deleteCampaign && deleteCampaign === true) {
      return {
        error: false,
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

export default deleteCampaignMutation;
