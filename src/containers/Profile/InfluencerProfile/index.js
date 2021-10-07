import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import styles from "./InfluencerProfile.module.scss";
import { RootContext } from "../../../context/RootContext";
import { Avatar } from "@material-ui/core";
import SVG from "react-inlinesvg";
import InfluencerInformation from "./InfluencerInformation";
import InfluencerCategories from "./InfluencerCategories";
import InfluencerPosts from "./RecentPosts";
import Social from "./Social";
import { API, graphqlOperation } from "aws-amplify";
import { useParams } from "react-router-dom";
import getInfluencerDetailQuery from "../../../GraphQL/getInfluencerDetailQuery";
import AverageEngagement from "./AverageEngagement"

import updateInfluencerMutation from "../../../GraphQL/updateInfluencerMutation";

const User = () => {
  return (
    <span>
      <SVG src={`${process.env.PUBLIC_URL}/images/user.svg`} />
    </span>
  );
};
const MapPin = () => {
  return (
    <span>
      <SVG src={`${process.env.PUBLIC_URL}/images//map-pin.svg`} />
    </span>
  );
};

const InfluencerProfile = () => {
  const [isOwner, setIsOwner] = useState(false);
  const { influencerId } = useParams();

  const [path, setPath] = useState("");
  var [influencerProfile, setInfluencerProfile] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
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

  ////////for picture to correctly work////////
  useEffect(() => {
    setPath(null);
    if (influencerProfile != null) {
      if (influencerProfile.indexOf("blob") == -1)
        influencerProfile += "?t=" + Date.now();
      setPath(influencerProfile);
    }
  }, [influencerProfile]);

  const UpdateInfluencer = async () => {
    setErrorMessage("");
    try {
      let res = await updateInfluencerMutation({
        id: brandId,
        age: age,
        bio: bio,
        email: email,
        name: name,
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
      } else {
        setErrorMessage(res.message);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const isOwner = localStorage.getItem("isOwner");
    setIsOwner(isOwner);
  });

  const { brandId, setBrands, setInfluencers } = useContext(RootContext);

  const getInfluencers = async () => {
    try {
      if (influencerId) {
        const response = await getInfluencerDetailQuery(influencerId);
        if (response.error === false) {
          setInfluencerProfile(response.data.imageUrl);
          setName(response.data.name);
          setAge(response.data.age);
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
							... on Influencer {
							  id
							  email
							  imageUrl
							  name
                      		  age
                       		  bio
							  website
							  phoneNumber
                        	  location
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

  const onCancel = () => {
    getInfluencers();
    setEditOpen(false);
  };

  const getMeData = async () => {
    try {
      const mydata = await API.graphql({
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

      /**seprating brands and influencers data */
      let brandsData = [];
      let influencersData = [];
      mydata.data.me.organizations !== null &&
        mydata.data.me.organizations.forEach((item) => {
          if (item.organization.__typename === "Influencer") {
            influencersData.push(item);
          } else if (item.organization.__typename === "Brand") {
            brandsData.push(item);
          }
        });
      setBrands(brandsData);
      setInfluencers(influencersData);
    } catch (e) {
      if (e.data) {
        /**seprating brands and influencers data */
        let brandsData = [];
        let influencersData = [];
        e.data.me.organizations !== null &&
          e.data.me.organizations.forEach((item) => {
            if (item.organization.__typename === "Influencer") {
              influencersData.push(item);
            } else if (item.organization.__typename === "Brand") {
              brandsData.push(item);
            }
          });
        setBrands(brandsData);
        setInfluencers(influencersData);
      }
    }
  };

  useEffect(() => {
    getInfluencers();
  }, []);

  useEffect(() => {
    updateInfluencer();
  }, []);

  const updateInfluencer = async () => {
    let res = await API.graphql(
      graphqlOperation(
        `mutation updateInfluencer ($input : UpdateInfluencerInput!) {
					updateInfluencer(input: $input) {
						influencer {
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
      res.data.updateInfluencer &&
      res.data.updateInfluencer !== null
    ) {
      setImageUrl(res.data.updateInfluencer.imageUploadUrl);
      setInfluencerName(res.data.updateInfluencer.influencer.name);
    }
  };

  const postImage = (url) => {
    UploadImage(url, imageFile);
  };

  const UploadImage = (URL, file) => {
    console.log(URL, file);
    var requestOptions = {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "",
      },
      redirect: "follow",
    };

    fetch(URL, requestOptions)
      .then((response) => response.text())
      .then((result) => getMeData())
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (imageFile !== null && imageUrl !== "") {
      postImage(imageUrl);
    }
  }, [imageUrl, imageFile]);

  const ActiveSave = () => {
    if (
      name !== "" &&
      phoneNumber !== "" &&
      website !== "" &&
      bio !== "" &&
      age !== "" &&
      email !== ""
    ) {
      setActiveSave(false);
    } else setActiveSave(true);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.profileHeading}>
          <div className={styles.influencerInfo}>
            <Avatar
              className={styles.influencerImage}
              alt="Profile"
              src={`${path}`}
            />
            <div className={styles.nameAndMessage}>
              <div>
                <div className={styles.influencerName}>
                  {influencerId ? name : influencerName}
                </div>
                {influencerId !== undefined ? (
                  <div className={styles.address}>
                    <User /> 25-30 <MapPin /> Fort Lauderdale, FL
                  </div>
                ) : (
                  ""
                )}
              </div>
              {influencerId === undefined ? (
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
              ) : (
                <button className={styles.messageButton}>Message</button>
              )}{" "}
            </div>
          </div>
          {isOwner ? "" : ""}
        </div>
        <div className={styles.profileDetails}>
          <div container spacing={4}>
            <div className={styles.infoContainer}>
              <div>
                <InfluencerInformation
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
                <Social />
              </div>
              <InfluencerCategories isOwner={isOwner} />
            </div>
            <div>
              <InfluencerPosts />
            </div>
          </div>
          {/* <AverageEngagement /> */}
        </div>
      </div>
    </div>
    /* <div className={styles.rightSidebar}>
				<RightMenu isOwner={isOwner} />
			</div> */
  );
};

export default InfluencerProfile;
