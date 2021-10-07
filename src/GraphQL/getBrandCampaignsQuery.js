import { API } from 'aws-amplify';

const brandsCampaignsQuery = async (brandId) => {
    try {
        const {
            data: {
                campaigns: {
                    campaigns
                }
            } } = await API.graphql({
                query: `{
            campaigns(brandId: "${brandId}" , query: {limit: 100}) {
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
                  influencer {
                        imageUrl
                        id
                        name
                        socialIdentities {
                            handle
                        }
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

export default brandsCampaignsQuery;