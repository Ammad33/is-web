import React, { useState, useContext, useEffect } from "react";
import styles from "./InfluencerContacts.module.scss";
import { MoreVertical, Edit, Trash } from "react-feather";
import { Grid, Avatar, Popover } from "@material-ui/core";
import AddContact from "../BrandContacts/AddContact";
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

const InfluencerContacts = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [brandContacts, setBrandContacts] = useState("");
  const [contacts, setContacts] = useState([]);
  const [bkupContacts, setBkupContacts] = useState([]);
  const { searchValue, brandId } = useContext(RootContext);
  const classes = useStyles();

  const [brand, setNewBrand] = useState({
    brandName: "",
    pointOfContact: "",
    email: "",
    mobilePhone: "",
  });

  const [brandErrors, setNewBrandErrors] = useState({
    brandName: false,
    pointOfContact: false,
    email: false,
    mobilePhone: false,
  });

  const handleFormChange = (value, fieldName) => {
    const newBrand = { ...brand };
    newBrand[fieldName] = value;
    const brandError = { ...brandErrors };
    if (
      fieldName === "email" ||
      (fieldName === "mobilePhone" &&
        brandError[fieldName] === true &&
        value !== "")
    ) {
      brandError["mobilePhone"] = false;
      brandError["email"] = false;
      setNewBrandErrors(brandError);
    } else if (brandError[fieldName] === true && value !== "") {
      brandError[fieldName] = false;
      setNewBrandErrors(brandError);
    }
    setNewBrand(newBrand);
  };

  const setNew = () => {
    if (hasFormError()) {
      return;
    }
    handleAPICall(false);
    setNewBrand({
      brandName: "",
      pointOfContact: "",
      email: "",
      mobilePhone: "",
    });

    setNewBrandErrors({
      brandName: false,
      pointOfContact: false,
      email: false,
      mobilePhone: false,
    });
  };

  const addNewBrand = () => {
    if (hasFormError()) {
      return;
    }
    handleAPICall(true);
  };

  const hasFormError = () => {
    const brandError = { ...brandErrors };
    if (brand.brandName === "") {
      brandError.brandName = true;
    }
    if (brand.pointOfContact === "") {
      brandError.pointOfContact = true;
    }

    if (brand.email === "" && brand.mobilePhone === "") {
      brandError.email = true;
    }

    if (brand.email === "" && brand.mobilePhone === "") {
      brandError.mobilePhone = true;
    }

    setNewBrandErrors(brandError);

    if (Object.values(brandError).includes(true)) {
      return true;
    }

    return false;
  };

  const handleAPICall = async (closeDialog) => {
    try {
      const data = {
        input: {
          name: brand.brandName,
          currencyType: "USD",
          timezone: 10,
        },
      };
      await API.graphql(
        graphqlOperation(
          `
            mutation createBrand($input : CreateBrandInput!) {
              createBrand(input: $input) {
                imageUploadUrl
              }
            }
            `,
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
                  }
                  `,
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
          <AddIcon /> Add Brands
        </button>
      </div>
      <div className={styles.contactsBanner}>
        <p className={styles.firstp}>Get 1 free campaign credit</p>
        <p className={styles.secondp}>
          For every person you invite that joins fomopromo and creates a
          campaign.{" "}
          <Link to="#" className={styles.learnMore}>
            Learn more here.
          </Link>
          .
        </p>
      </div>
      <AddContact
        formData={brand}
        handleFormChange={handleFormChange}
        handleAdd={addNewBrand}
        setNew={setNew}
        open={addOpen}
        formError={brandErrors}
        closeAdd={closeHandle}
        type={"Brand"}
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
        {brandContacts.length < 1 ? (
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
            className={styles.contactContainer}
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

export default InfluencerContacts;
