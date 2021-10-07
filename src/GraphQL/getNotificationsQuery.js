import { API } from 'aws-amplify';

const getNotificationQuery = async (brandId) => {
    try {
        const {
            data: {
                notifications: {
                    notifications
                }
            }
        } = await API.graphql({
            query: `{
                        notifications {
                            notifications {
                                brandId
                                campaignId
                                event
                                message
                                received
                                seen
                                sender {
                                    ... on User {
                                        id
                                        fullName
                                    }
                                    ... on Brand {
                                        id
                                        name
                                    }
                                    ... on Influencer {
                                        id
                                        name
                                    }
                                }
                            }
                        }
                    }`,
        });

        if (notifications && notifications !== null && notifications.length !== 0) {
            return ({
                error: false,
                data: notifications
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

export default getNotificationQuery;