import { API } from "aws-amplify";

const getInfluencerQuery = async (brandId) => {
  try {
    const {
      data: { influencer },
    } = await API.graphql({
      query: `{
                influencer(id: "${brandId}"){
                    age
                    bio
                    email
                    id
                    imageUrl
                    website
                    name
                    phoneNumber
                  }
                }`,
    });

    if (influencer && influencer !== null) {
      return {
        error: false,
        data: influencer,
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

export default getInfluencerQuery;
