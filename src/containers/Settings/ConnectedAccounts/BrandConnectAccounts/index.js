import React, { useContext, useEffect, useState } from "react";
import styles from "./BrandConnectAccounts.module.scss";
import TextField from "../../../../components/TextField";
import ChipButton from "../../../../components/ChipButton";
import SyncIcon from "@material-ui/icons/Sync";
import { InputAdornment, Grid } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { API, graphqlOperation } from "aws-amplify";
import { RootContext } from "../../../../context/RootContext";
import clsx from "clsx";
const BrandConnectAccounts = () => {
  const [storeName, setStoreName] = useState("");
  const [storeSaved, setStoreSaved] = useState(false);
  const [storeAccessToken, setStoreAccessToken] = useState("");
  const [storeApiKey, setStoreApiKey] = useState("");
  const [storeSharedKey, setStoreSharedKey] = useState("");
  const { brandId } = useContext(RootContext);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    checkBrandConnection();
  }, []);

  const checkBrandConnection = async () => {
    try {
      const response = await API.graphql({
        query: `{
          brand(id:"${brandId}") {
            plugins {
              shopify {
                shop
              }
            }
          }
        }`,
      });
      if (response.data.brand.plugins.shopify.shop) {
        setStoreName(response.data.brand.plugins.shopify.shop);
        setStoreSaved(true);
      } else {
        setStoreSaved(false);
      }
    } catch (e) {
      setStoreSaved(false);
    }
  };

  const handleButtonClick = async (storeSaved) => {
    try {
      if (storeSaved) {
        let data = {
          shop: storeName,
          accessToken: storeAccessToken,
          apiKey: storeApiKey,
          sharedKey: storeSharedKey,
          brandId: brandId,
        };
        let registerResponse = await API.graphql(
          graphqlOperation(
            `mutation shopifyRegisterPrivate($input: ShopifyRegisterPrivateInput!) {
				    shopifyRegisterPrivate(input: $input)
		      }`,
            {
              input: data,
            }
          )
        );
        if (registerResponse.data.shopifyRegisterPrivate) {
          setStoreSaved(true);
        }
      } else {
        const disconnectResponse = await API.graphql(
          graphqlOperation(
            `mutation shopifyDisconnect($brandId: ID!){
                shopifyDisconnect(brandId: $brandId)
            }`,
            {
              brandId: brandId,
            }
          )
        );
        if (disconnectResponse.data.shopifyDisconnect) {
          setStoreName("");
          setStoreAccessToken("");
          setStoreApiKey("");
          setStoreSharedKey("");
          setStoreSaved(false);
        }
      }
    } catch (e) {
      console.log("ERROR", e);
      let message = "";

      if (e.errors && e.errors.length > 0)
        e.errors.forEach((m) => {
          message = message + m.message;
        });

      setErrorMessage(message);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <p>
          Connecting your shopify account allows us to populate your products so
          you can create successful campaigns
        </p>
        <img
          className={styles.shopifyLogo}
          src={`${process.env.PUBLIC_URL}/images/shoppify.png`}
          alt="Shopify Logo"
        />
        <div
          className={clsx(
            storeSaved ? styles.savedContainer : "",
            styles.fieldsAndAction
          )}
        >
          <TextField
            id="outlined-basic"
            fullWidth
            label="Shopify Shop Name"
            variant={storeSaved ? "filled" : "outlined"}
            value={storeName}
            onChange={(e) => {
              setStoreName(e.target.value);
            }}
            disabled={storeSaved ? true : false}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  className={styles.inputendornment}
                  position="end"
                >
                  {storeSaved ? (
                    <CheckCircleIcon className={styles.inputendornmentCheck} />
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
          />
          {storeSaved ? (
            ""
          ) : (
            <>
              <TextField
                id="outlined-basic"
                fullWidth
                value={storeAccessToken}
                onChange={(e) => {
                  setStoreAccessToken(e.target.value);
                }}
                label="Access Token"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                fullWidth
                value={storeApiKey}
                onChange={(e) => {
                  setStoreApiKey(e.target.value);
                }}
                label="API Key"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                fullWidth
                value={storeSharedKey}
                onChange={(e) => {
                  setStoreSharedKey(e.target.value);
                }}
                label="Shared Key"
                variant="outlined"
              />
            </>
          )}
          <ChipButton
            title={storeSaved ? "Clear" : "Connect"}
            buttonSize={"sm"}
            handleClick={() => handleButtonClick(!storeSaved)}
          />
          {storeSaved ? (
            <div className={styles.storeSync}>
              <SyncIcon />
              Sync
            </div>
          ) : (
            ""
          )}
        </div>
        {errorMessage !== "" && (
          <div className={styles.errorMessageStyle}>{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default BrandConnectAccounts;
