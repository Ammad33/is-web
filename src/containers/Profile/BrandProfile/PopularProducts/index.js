import React, { useState } from "react";
import { Edit } from "react-feather";
import { Grid } from "@material-ui/core";
import styles from "./popularProducts.module.scss";
import EditPopularProducts from "./EditPopularProducts";

const PopularProducts = ({ isOwner }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popularProducts, setPopularProducts] = useState(true);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className={styles.postContainer}>
      <div className={styles.headingContainer}>
        <h1>Popular Products</h1>
        {isOwner ? (
          <Edit
            className={styles.productOwner}
            onClick={() => {
              setEditOpen(true);
              setAnchorEl(null);
            }}
          />
        ) : (
          ""
        )}
      </div>
      <EditPopularProducts
        open={editOpen}
        closeAdd={() => setEditOpen(false)}
      />
      {popularProducts ? (
        <Grid container>
          <Grid item xs={2}>
            <div className={styles.mainDiv}>
              <div className={styles.elemtdiv}>
                <img
                  alt="post1"
                  src={`${process.env.PUBLIC_URL}/images/dummy.png`}
                />
                <div className={styles.postsDescription}> vanilla plant </div>
                <div> $28</div>
              </div>
              <div className={styles.elemtdiv}>
                <img
                  alt="post2"
                  src={`${process.env.PUBLIC_URL}/images/dummy.png`}
                />
                <div className={styles.postsDescription}> vanilla plant </div>
                <div> $28</div>
              </div>
              <div className={styles.elemtdiv}>
                <img
                  alt="post3"
                  src={`${process.env.PUBLIC_URL}/images/dummy.png`}
                />
                <div className={styles.postsDescription}> vanilla plant </div>
                <div> $28</div>
              </div>
              <div className={styles.elemtdiv}>
                <img
                  alt="post3"
                  src={`${process.env.PUBLIC_URL}/images/dummy.png`}
                />
                <div className={styles.postsDescription}> vanilla plant </div>
                <div> $28</div>
              </div>
              <div className={styles.elemtdiv}>
                <img
                  alt="post3"
                  src={`${process.env.PUBLIC_URL}/images/dummy.png`}
                />
                <div className={styles.postsDescription}> vanilla plant </div>
                <div> $28</div>
              </div>
            </div>
          </Grid>
        </Grid>
      ) : (
        <div className={styles.detailSubContent}>
          <p>
            Show influencers your most popular products, or select any products
            you would like to feature here.
          </p>
        </div>
      )}
    </div>
  );
};

export default PopularProducts;
