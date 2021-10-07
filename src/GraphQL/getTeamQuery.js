import { API } from 'aws-amplify';

const getTeamQuery = async (brandId) => {

    try {

        const {
            data: {
                brand: {
                    users
                }
            }
        } = await API.graphql({
            query: `{
      brand(id:"${brandId}") {
        users {
          user {
            imageUrl
            id
            fullName
            email
          }
        }
      }
    }`,
        });

        if (users && users !== null && users.length !== 0) {
            return ({
                error: false,
                data: users
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

export default getTeamQuery;