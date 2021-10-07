import { API } from 'aws-amplify';

const influencerCampaignsQuery = async (brandId) => {
    try {

        const {
            data: {
                influencerCampaigns: {
                    campaigns
                }
            } } = await API.graphql({
                query: `{
					influencerCampaigns(influencerId: "${brandId}", query: {limit: 100}) {
          campaigns {
            name
            description
            id
            status
            startDate
            endDate
						created
						internalState
                        events {
                            description
                          }
						brand {
							id
							imageUrl
							name
						}
          }
        }
      }`,
            });




        if (campaigns && campaigns !== null) {
            return ({
                error: false,
                data: campaigns
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

export default influencerCampaignsQuery;