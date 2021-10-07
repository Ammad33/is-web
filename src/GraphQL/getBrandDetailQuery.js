import { API } from "aws-amplify";

const getBrandQuery = async (brandId) => {
  try {
    const {
      data: { brand },
    } = await API.graphql({
      query: `{
                brand(id: "${brandId}"){
                    bio
                    email
                    id
                    imageUrl
                    name
                    website
                    phoneNumber
                  }
                }`,
    });

    if (brand && brand !== null) {
      return {
        error: false,
        data: brand,
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

export default getBrandQuery;
