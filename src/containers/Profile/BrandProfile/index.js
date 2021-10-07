import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import styles from "./brandProfile.module.scss";
import { Avatar } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import BrandInformation from "./BrandInformation";
import ProductCategories from "./ProductCategories";
import PopularProducts from "./PopularProducts";
import RightMenu from "./RightMenu";
import { API, graphqlOperation } from "aws-amplify";
import uploadImages from "../../../actions/uploadImges";
import { RootContext } from "../../../context/RootContext";
import updatebrandMutation from "../../../GraphQL/updatebrandMutation";
import getBrandDetailQuery from "../../../GraphQL/getBrandDetailQuery";

const BrandProfile = () => {
  const [isOwner, setIsOwner] = useState(false);

  const { influencerId } = useParams();

  var [influencerProfile, setInfluencerProfile] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [influencerName, setInfluencerName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [activeSave, setActiveSave] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [path, setPath] = useState("");
  const { brandId, setBrands, setInfluencers, setProfileUpdate } = useContext(
    RootContext
  );

  useEffect(() => {
    if (imageFile !== null && imageUrl !== "") {
      postImage(imageUrl);
    }
  }, [imageUrl, imageFile]);

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    updateBrand();
  }, []);

  const UpdateInfluencer = async () => {
    setErrorMessage("");
    try {
      let res = await updatebrandMutation({
        id: brandId,
        age: age,
        bio: bio,
        email: email,
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
      });

      if (res.error == false) {
        const { data } = res;
        setEditOpen(false);
        setName(data.name);
        setBio(data.bio);
        setAge(data.age);
        setEmail(data.email);
        setWebsite(data.website);
        setPhoneNumber(data.phoneNumber);
        setLocation(data.location);
      } else {
        setErrorMessage(res.message);
      }
    } catch (e) {}
  };

  ////////for picture to correctly work////////
  useEffect(() => {
    console.log(
      "brandProfile influencer Profile--------->>>",
      influencerProfile
    );
    setPath(null);
    if (influencerProfile != null) {
      if (influencerProfile.indexOf("blob") == -1)
        influencerProfile += "?t=" + Date.now();
      setPath(influencerProfile);
    }
  }, [influencerProfile]);

  const getBrands = async () => {
    try {
      if (influencerId) {
        const response = await getBrandDetailQuery(influencerId);
        if (response.error === false) {
          setInfluencerProfile(response.data.imageUrl);
          setName(response.data.name);
          setEmail(response.data.email);
          setPhoneNumber(response.data.phoneNumber);
          setWebsite(response.data.website);
          setBio(response.data.bio);
        }
      } else {
        const team = await API.graphql({
          query: `{
					me {
						organizations {
						  organization {
						    ... on Brand {
                  id
                  email
                  imageUrl
                  name
                  bio
                  website
                  phoneNumber
                }
						  }
						}
					  }
        }`,
        });

        team.data &&
          team.data !== null &&
          team.data.me.organizations &&
          team.data.me.organizations.length > 0 &&
          team.data.me.organizations.forEach((item) => {
            if (item.organization.id === brandId) {
              setInfluencerProfile(item.organization.imageUrl);
              setName(item.organization.name);
              setAge(item.organization.age);
              setEmail(item.organization.email);
              setPhoneNumber(item.organization.phoneNumber);
              setWebsite(item.organization.website);
              setBio(item.organization.bio);
            }
          });
      }
    } catch (err) {}
  };

  const updateBrand = async () => {
    let res = await API.graphql(
      graphqlOperation(
        `mutation  updateBrand($input : UpdateBrandInput!) {
          updateBrand(input: $input) {
            brand {
              name
            }
				imageUploadUrl
			}
		}`,
        {
          input: {
            id: brandId,
          },
        }
      )
    );

    if (
      res.data &&
      res.data !== null &&
      res.data.updateBrand &&
      res.data.updateBrand !== null
    ) {
      setImageUrl(res.data.updateBrand.imageUploadUrl);
      setBrandName(res.data.updateBrand.brand.name);
    }
  };

  const postImage = (url) => {
    UploadImage(url, imageFile);
  };

  const UploadImage = async (URL, file) => {
    console.log(URL, file);
    var requestOptions = {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "",
      },
      redirect: "follow",
    };

    try {
      let response = await fetch(URL, requestOptions);
      let result = await response.text();
      setProfileUpdate(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const ActiveSave = () => {
    if (
      name !== "" &&
      name !== null &&
      phoneNumber !== "" &&
      phoneNumber !== null &&
      bio !== null &&
      bio !== "" &&
      email !== "" &&
      email !== null
    ) {
      setActiveSave(false);
    } else setActiveSave(true);
  };

  const onCancel = () => {
    getBrands();
    setEditOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.profileHeading}>
          <div className={styles.brandInfo}>
            <Avatar className={styles.brandImage} src={`${path}`}></Avatar>
            <div className={styles.nameAndMessage}>
              <div className={styles.brandName}>
                {influencerId ? name : brandName}
              </div>
              {influencerId === undefined && (
                <>
                  <label htmlFor="hero1" className={styles.heroLabel}>
                    Upload Profile Photo
                  </label>
                  <input
                    id="hero1"
                    className={styles.heroInput}
                    type={"file"}
                    onChange={(e) => {
                      setImageFile(e.target.files[0]);
                      setInfluencerProfile(
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                  />
                </>
              )}
            </div>
          </div>
          {isOwner ? (
            ""
          ) : (
            <div className={styles.buttonContainer}>
              {/*  Hidden for Phase 1 */}
              {/* <button className={styles.addButton}>Add to Prospects</button>  */}
            </div>
          )}
        </div>
        <div className={styles.profileDetails}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <BrandInformation
                name={name}
                handleName={(e) => setName(e.target.value)}
                age={age}
                handleAge={(e) => setAge(e.target.value)}
                website={website}
                handleWebsite={(e) => setWebsite(e.target.value)}
                phoneNumber={phoneNumber}
                handlePhoneNumber={(e) => setPhoneNumber(e.target.value)}
                bio={bio}
                handleBio={(e) => setBio(e.target.value)}
                location={location}
                handleLocation={(e) => setLocation(e.target.value)}
                isOwner={true}
                email={email}
                handleEmail={(e) => setEmail(e.target.value)}
                handleActiveSave={ActiveSave}
                handleUpdate={UpdateInfluencer}
                activeSave={activeSave}
                editOpen={editOpen}
                setEditOpen={setEditOpen}
                onCancel={onCancel}
                errorMessage={errorMessage}
                influencerId={influencerId}
              />
            </Grid>
            <Grid item xs={6}>
              <ProductCategories isOwner={isOwner} />
            </Grid>
            <Grid item xs={12}>
              <PopularProducts isOwner={isOwner} />
            </Grid>
          </Grid>
        </div>
      </div>
      {/* <div className={styles.rightSidebar}>
        <RightMenu isOwner={isOwner} />
      </div> */}
    </div>
  );
};

export default BrandProfile;
