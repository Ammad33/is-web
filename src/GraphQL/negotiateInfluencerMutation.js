import { API, graphqlOperation } from 'aws-amplify';

const negotiateInfluencerMutation = async (data) => {
    try {

        const { data: {
            influencerNegotiate
        } } = await API.graphql(
            graphqlOperation(
                `mutation influencerNegotiate($input : NegotiationInput!) {
                    influencerNegotiate(input: $input) {
                        id
                        message
        }
    }`, {
                input: data
            }));

        if (influencerNegotiate && influencerNegotiate !== null) {
            return ({
                error: false,
                data: influencerNegotiate
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

export default negotiateInfluencerMutation;