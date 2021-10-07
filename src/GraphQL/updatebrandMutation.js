import { API, graphqlOperation } from 'aws-amplify';

const brandMutation = async (data) => {
    try {
        const { data: {
            updateBrand
        } } = await API.graphql(
            graphqlOperation(
                `mutation updateBrand($input : UpdateBrandInput!) {
                    updateBrand(input: $input) {
                    brand {
                        name
                        email
                        bio
                        website
                        phoneNumber
                      }
        }
    }`, {
                input: data
            }));

        if (updateBrand && updateBrand.brand) {
            return ({
                error: false,
                data: updateBrand.brand
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

export default brandMutation;