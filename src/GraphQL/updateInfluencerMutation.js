import { API, graphqlOperation } from 'aws-amplify';

const influencerMutation = async (data) => {
    try {
        const { data: {
            updateInfluencer
        } } = await API.graphql(
            graphqlOperation(
                `mutation updateInfluencer ($input : UpdateInfluencerInput!) {
                updateInfluencer(input: $input) {
                    influencer {
                        name
                        age
                        email
                        bio
                        website
                        location
                        phoneNumber
                      }
        }
    }`, {
                input: data
            }));

        if (updateInfluencer && updateInfluencer.influencer) {
            return ({
                error: false,
                data: updateInfluencer.influencer
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

export default influencerMutation;