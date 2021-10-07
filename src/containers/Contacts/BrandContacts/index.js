import React, { useState, useContext, useEffect } from "react";
import styles from "./BrandContacts.module.scss";
import { MoreVertical, Edit, Trash } from "react-feather";
import { Grid, Avatar, Popover } from "@material-ui/core";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import SVG from "react-inlinesvg";
import { Facebook, Youtube, Instagram } from "react-feather";
import { Link } from "react-router-dom";
import { RootContext } from "../../../context/RootContext";
import { API, graphqlOperation } from "aws-amplify";

const Users = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/users.svg`} />;
};

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    borderRadius: "10px",
  },
  table: {
    minWidth: 650,
  },
}));

const Contacts = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [bkupContacts, setBkupContacts] = useState([]);
  const { searchValue, brandId } = useContext(RootContext);
  const classes = useStyles();

  const [newInfluencer, setNewInfluencer] = useState({
    fullName: "",
    instagramHandler: "",
    email: "",
    mobilePhone: "",
  });

  const [newInfluencerError, setNewInfluencerError] = useState({
    fullName: false,
    instagramHandler: false,
    email: false,
    mobilePhone: false,
  });

  const handleNewInfluencerChange = (value, fieldName) => {
    const newInfluner = { ...newInfluencer };
    newInfluner[fieldName] = value;
    const newInflunerError = { ...newInfluencerError };
    if (
      fieldName === "email" ||
      (fieldName === "mobilePhone" &&
        newInflunerError[fieldName] === true &&
        value !== "")
    ) {
      newInflunerError["mobilePhone"] = false;
      newInflunerError["email"] = false;
      setNewInfluencerError(newInflunerError);
    } else if (newInflunerError[fieldName] === true && value !== "") {
      newInflunerError[fieldName] = false;
      setNewInfluencerError(newInflunerError);
    }
    setNewInfluencer(newInfluner);
  };

  const setNew = () => {
    if (hasFormError()) {
      return;
    }
    handleAPICall(false);
    setNewInfluencer({
      fullName: "",
      instagramHandler: "",
      email: "",
      mobilePhone: "",
    });

    setNewInfluencerError({
      fullName: false,
      instagramHandler: false,
      email: false,
      mobilePhone: false,
    });
  };

  const addNewInfluencer = async () => {
    if (hasFormError()) {
      return;
    }
    handleAPICall(true);
  };

  const hasFormError = () => {
    const newInfluencerErrorr = { ...newInfluencerError };
    if (newInfluencer.fullName === "") {
      newInfluencerErrorr.fullName = true;
    }
    if (newInfluencer.instagramHandler === "") {
      newInfluencerErrorr.instagramHandler = true;
    }

    if (newInfluencer.email === "" && newInfluencer.mobilePhone === "") {
      newInfluencerErrorr.email = true;
    }

    if (newInfluencer.email === "" && newInfluencer.mobilePhone === "") {
      newInfluencerErrorr.mobilePhone = true;
    }

    setNewInfluencerError(newInfluencerErrorr);

    if (Object.values(newInfluencerErrorr).includes(true)) {
      return true;
    }

    return false;
  };

  const handleAPICall = async (closeDialog) => {
    try {
      const data = {
        input: {
          name: newInfluencer.fullName,
          currencyType: "USD",
          timezone: 10,
        },
      };
      await API.graphql(
        graphqlOperation(
          `mutation createInfluencer($input : CreateInfluencerInput!) {
              createInfluencer(input: $input) {
                imageUploadUrl
              }
            }`,
          data
        )
      );
      if (closeDialog) {
        setAddOpen(false);
      }
    } catch (e) {}
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const closeHandle = () => {
    setAddOpen(false);
    setNew();
  };

  useEffect(() => {
    searchContacts();
  }, [searchValue]);

  useEffect(() => {
    getContacts();
  }, [brandId]);

  const searchContacts = () => {
    let copiedContacts = [...bkupContacts];
    if (searchValue.trim()) {
      copiedContacts = copiedContacts.filter((contact) => {
        return (
          contact?.user?.fullName
            .toLowerCase()
            .indexOf(searchValue.toLowerCase()) > -1
        );
      });
    }
    setContacts(copiedContacts);
  };

  const getContacts = async () => {
    try {
      const data = (
        await API.graphql({
          query: `{
			              brand(id: "${brandId}") {
					            users {
					              user {
						              fullName
					              }
					            }
				            }
                  }`,
        })
      ).data?.brand?.users;
      setContacts(data || []);
      setBkupContacts(data || []);
    } catch (e) {}
  };

  return (
    <div className={styles.contactsContainer}>
      <div className={styles.contactsHeadingContainer}>
        <div className={styles.contactsHeading}>
          <span>Contacts</span>
          <p>
            Alphabetical
            <ExpandMoreIcon fontSize="small" />
          </p>
        </div>
        <button onClick={() => setAddOpen(true)}>
          <AddIcon /> Add Influencers
        </button>
      </div>
      <div className={styles.contactsBanner}>
        <p className={styles.firstp}>Get 1 free campaign credit</p>
        <p className={styles.secondp}>
          For every person you invite that joins fomopromo and creates a
          campaign.{" "}
          <Link to="#" className={styles.learnMoreStyle}>
            Learn more here.
          </Link>
        </p>
      </div>
      <AddContact
        formData={newInfluencer}
        handleFormChange={handleNewInfluencerChange}
        handleAdd={addNewInfluencer}
        setNew={setNew}
        open={addOpen}
        formError={newInfluencerError}
        closeAdd={closeHandle}
        type={"Influencer"}
      />
      <EditContact open={editOpen} closeAdd={() => setEditOpen(false)} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={styles.popOver}>
          <div
            className={styles.editDiv}
            onClick={() => {
              setEditOpen(true);
              setAnchorEl(null);
            }}
          >
            {" "}
            <Edit /> <p>Edit </p>
          </div>
          <div className={styles.deleteDiv}>
            {" "}
            <Trash /> <p>Delete</p>
          </div>
        </div>
      </Popover>
      <Grid container alignItems="center">
        {contacts.length ? (
          <TableContainer component={Paper} className={classes.root}>
            <div className={styles.tableWrap}>
              <Table aria-label="simple table">
                <TableBody>
                  {contacts.map((contact, i) => (
                    <>
                      <TableRow key={"key"}>
                        <TableCell className={styles.firstTableCell}>
                          <Avatar
                            className={styles.avatar}
                            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                          />{" "}
                          <p className={styles.avatarName}>
                            {contact?.user?.fullName}
                          </p>
                        </TableCell>
                        <TableCell className={styles.avatarName}>
                          Lennie James
                        </TableCell>
                        <TableCell className={styles.avatarName}>
                          marketing@gmail.com
                        </TableCell>
                        <TableCell className={styles.avatarNameSocial}>
                          <div className={styles.instaIcon}>
                            <Instagram />
                            <p className={styles.instafollowers}>345</p>
                          </div>
                          <span className={styles.ytIcon}>
                            <Youtube />
                            <div className={styles.ytfollowers}> 456</div>
                          </span>
                          <span className={styles.fbIcon}>
                            <Facebook />
                            <div className={styles.influencername}>999</div>
                          </span>
                        </TableCell>
                        <TableCell align="right" className={styles.avatarName}>
                          <MoreVertical onClick={handleClick} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Divider variant="FullWidth" />
                        </TableCell>
                        <TableCell>
                          <Divider variant="FullWidth" />
                        </TableCell>
                        <TableCell>
                          <Divider variant="FullWidth" />
                        </TableCell>
                        <TableCell>
                          <Divider variant="FullWidth" />
                        </TableCell>
                        <TableCell>
                          <Divider variant="FullWidth" />
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableContainer>
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={styles.ContactContainer}
          >
            <Grid item xs={12}>
              <Users />
            </Grid>
            <Grid item xs={12}>
              <div className={styles.noCampaignYet}>No Contacts Yet</div>
            </Grid>
            <Grid item xs={12}>
              <div className={styles.noCampaignYetHelper}>
                Invite Brands to FOMO Promo so you can collaborate on campaigns
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Contacts;
