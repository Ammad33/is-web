import { API } from 'aws-amplify';

const meQuery = async () => {
    try {
        const {
            data: {
                me
            }
        } = await API.graphql({
            query: `{
                    me {
                        email
                        fullName
                        id
                        organizations {
                            organization {
                                id
                                name
                                __typename
                                ... on Influencer {
                                    id
                                }
                                imageUrl
                                email
                                roles {
                                    id
                                    administration
                                }
                            }
                        }
                        about
                        age
                        companyTitle
                        imageUrl
                        joined
                        modified
                        phoneNumber
                    }
            }`,
        });

        if (me && me !== null) {
            return ({
                error: false,
                data: me
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

export default meQuery;