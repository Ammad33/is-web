import { API } from 'aws-amplify';

const getCollectionQuery = async (brandId) => {

    try {

        const {
            data: {
                collections: {
                    collections
                }

            }
        } = await API.graphql({
            query: `{
              collections(brandId: "${brandId}") {
                collections {
                  id
                  name
                  products {
                    products {
                      id
                      name
                      estimatedQty
                      priceRange {
                        max {
                          amount
                          currency
                        }
                        min {
                          amount
                          currency
                        }
                      }
                      images {
                        images {
                          src
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }`,
        });

        if (collections && collections !== null && collections.length !== 0) {
            return ({
                error: false,
                data: collections
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

export default getCollectionQuery;