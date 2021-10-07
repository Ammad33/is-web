/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { Grid, InputAdornment, Select } from "@material-ui/core";
import TextField from "../../../../components/TextField";
import FormControl from "@material-ui/core/FormControl";
import SelectMenu from "../../../../components/SelectMenu";
import MenuItem from "@material-ui/core/MenuItem";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import styles from "./CreateDeliverable.module.scss";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DateFnsUtils from "@date-io/date-fns";
import { Calendar } from "react-feather";
import { Trash } from "react-feather";
import clsx from "clsx";
import SVG from "react-inlinesvg";
import mainStyles from "../../../../index.module.scss";
import moment from "moment";

const frames = [];
for (let i = 1; i <= 15; i += 1) {
  frames.push(i);
}

const CreateDeliverable = ({
  index,
  deliveries,
  handleDilverableContent,
  handleDeliverDeadlineDate,
  deliverableItem,
  deliverableDate,
  handleDeliverableDate,
  handleRemoveDeliverable,
  deliverableDeadlineDateError,
  fb,
  insta,
  tictock,
  youtube,
  twitch,
  twitter,
}) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(false);
  const [options, setOptions] = useState(false);
  const [platform, setPlatform] = useState({
    postType: ["Does not apply"],
    frameContentType: ["Does not apply"],
  });

  const Chevron = ({ Check, MenuId, ...other }) => {
    const onClick = (event) => {
      if (
        event.target.closest(".MuiInputBase-root").querySelector("div")
          .attributes["aria-disabled"] &&
        event.target.closest(".MuiInputBase-root").querySelector("div")
          .attributes["aria-disabled"].value == "true"
      )
        return false;

      if (Check === "open") {
        setOpen(!open);
      } else if (Check === "open1") {
        setOpen1(!open1);
      } else if (Check === "open2") {
        setOpen2(!open2);
      } else if (Check === "open3") {
        setOpen3(!open3);
      } else if (Check === "open4") {
        setOpen4(!open4);
      }

      if (Check === "open") {
        setOpen(!open);
      }
    };
    return (
      <span
        onClick={onClick}
        {...other}
        className={
          options ? styles.disablePointer : styles.dropDownCustomizeSvg
        }
      >
        <SVG src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`} />
      </span>
    );
  };

  /**to set the platform**/
  useEffect(() => {
    handleSetValue();
  }, [deliverableItem.platform]);

  /**handleDeliverDeadlineDate **/
  useEffect(() => {
    handleDeliverDeadlineDate("12/13/2021", index);
  }, []);

  /**{function} to handle post type */
  const handlePostType = (value, index, name) => {
    if (value === "Post") {
      setPost(true);
      handleDilverableContent(value, index, name);
    } else {
      setPost(false);
      handleDilverableContent(value, index, name);
    }
  };

  /**{function} to handle social platform */
  const handleSocialPlatform = (value, index, name) => {
    if (value === "Youtube") {
      setOptions(true);
      setPost(true);
      handleDilverableContent(value, index, name);
    } else if (value === "Tiktok") {
      setOptions(true);
      setPost(true);
      handleDilverableContent(value, index, name);
    } else if (value === "Twitter") {
      setOptions(true);
      setPost(true);
      handleDilverableContent(value, index, name);
    } else if (value === "Twitch") {
      setOptions(true);
      setPost(true);
      handleDilverableContent(value, index, name);
    } else {
      setOptions(false);
      handleDilverableContent(value, index, name);
    }
  };
  /**{function} to handle platform */
  const handleSetValue = () => {
    switch (deliverableItem.platform) {
      case "Youtube":
        setOptions(true);
        setPost(true);
        setPlatform(youtube);
        break;
      case "Instagram":
        setPlatform(insta);
        break;
      case "Tiktok":
        setOptions(true);
        setPost(true);
        setPlatform(tictock);
        break;
      case "Facebook":
        setPlatform(fb);
        break;
      case "Twitch":
        setOptions(true);
        setPost(true);
        setPlatform(twitch);
        break;
      case "Twitter":
        setOptions(true);
        setPost(true);
        setPlatform(twitter);
        break;
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        className={clsx(
          styles.headerContainer,
          index > 0 ? styles.marginTop : ""
        )}
      >
        <p className={styles.headingColor}>Deliverable {index + 1} </p>
        {deliveries.length > 1 && (
          <Trash onClick={() => handleRemoveDeliverable(index)} />
        )}
      </Grid>
      <Grid item xs={12} className={mainStyles.displayNone}>
        <TextField
          id="outlined-basic"
          fullWidth
          label="Deliverable Deadline Date"
          variant="outlined"
          className={mainStyles.placeholderColor}
          helperText={
            deliverableDeadlineDateError ? (
              <span className={styles.errorText}>
                Deliverable Date Must Between Start and End Date of Campaign
              </span>
            ) : (
              " "
            )
          }
          value={deliverableItem && deliverableItem.deadlineDate}
          onChange={(e) => handleDeliverDeadlineDate(e.target.value, index)}
          InputProps={{
            pattern: "d{1,2}/d{1,2}/d{4}",
            endAdornment: (
              <InputAdornment
                className={styles.cursorPointer}
                position="end"
                onClick={() => handleDeliverableDate(true)}
              >
                <Calendar />
              </InputAdornment>
            ),
          }}
        />
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          className={styles.displayNone}
        >
          <DatePicker
            className={mainStyles.displayNone}
            open={deliverableDate}
            onChange={(date) => handleDeliverDeadlineDate(date, index)}
            value={deliverableItem && deliverableItem.deadlineDate}
            orientation="landscape"
            openTo="date"
            format="MM/dd/yyyy"
            margin="normal"
            onClose={() => handleDeliverableDate(false)}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormControl fullWidth variant="outlined">
          <TextField
            id="Social Platform"
            fullWidth
            label="Social Platform"
            variant="outlined"
            value={deliverableItem.platform}
            className={mainStyles.placeholderColor}
            helperText={error ? <span> error </span> : " "}
            onChange={(e) =>
              handleSocialPlatform(e.target.value, index, "platform")
            }
            menuprops={{ variant: "menu" }}
            select
            SelectProps={{
              IconComponent: () => (
                <Chevron MenuId="menuSocialPlatform" Check="open" />
              ),
              open: open,
              onClose: () => {
                setOpen(false);
              },
              onOpen: () => {
                setOpen(true);
              },
            }}
          >
            <MenuItem value="" disabled>
              Social Platform
            </MenuItem>
            <MenuItem value={"Instagram"}>Instagram </MenuItem>
            <MenuItem value={"Facebook"}>Facebook </MenuItem>
            <MenuItem value={"Youtube"}>YouTube</MenuItem>
            <MenuItem value={"Tiktok"}>TikTok</MenuItem>
            <MenuItem value={"Twitch"}>Twitch</MenuItem>
            <MenuItem value={"Twitter"}>Twitter</MenuItem>
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6} className={styles.marginbottomSelect}>
        <FormControl fullWidth variant="outlined">
          <TextField
            id="Post Type"
            fullWidth
            label="Post Type"
            variant="outlined"
            disabled={
              options ||
              deliverableItem.platform.toLowerCase() === "youtube" ||
              deliverableItem.platform.toLowerCase() === "tiktok" ||
              deliverableItem.platform.toLowerCase() === "twitch" ||
              deliverableItem.platform.toLowerCase() === "twitter"
                ? true
                : false
            }
            className={
              options
                ? `${styles.inputfield} ${mainStyles.placeholderColor}`
                : mainStyles.placeholderColor
            }
            helperText={error ? <span> error </span> : " "}
            value={deliverableItem && deliverableItem.postType}
            onChange={(e) => handlePostType(e.target.value, index, "postType")}
            menuprops={{ variant: "menu" }}
            select
            SelectProps={{
              IconComponent: () => <Chevron MenuId="open1" Check="open1" />,
              open: open1,
              onClose: () => {
                setOpen1(false);
              },
              onOpen: () => {
                setOpen1(true);
              },
            }}
          >
            <MenuItem value="" disabled>
              Post Type
            </MenuItem>
            {platform.postType.map((item) => (
              <MenuItem key={item} value={item}>
                {item}{" "}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormControl fullWidth variant="outlined">
          <TextField
            disabled={
              options ||
              deliverableItem.platform.toLowerCase() === "youtube" ||
              deliverableItem.platform.toLowerCase() === "tiktok" ||
              deliverableItem.platform.toLowerCase() === "twitch" ||
              deliverableItem.platform.toLowerCase() === "twitter"
                ? true
                : false
            }
            labelid="demo-simple-select-outlined-label"
            id="Content Type"
            fullWidth
            label="Content Type"
            variant="outlined"
            displayempty="true"
            className={
              options
                ? `${styles.inputfield} ${mainStyles.placeholderColor}`
                : mainStyles.placeholderColor
            }
            helperText={error ? <span> error </span> : " "}
            value={deliverableItem && deliverableItem.frameContentType}
            onChange={(e) =>
              handleDilverableContent(e.target.value, index, "frameContentType")
            }
            menuprops={{ variant: "menu" }}
            select
            SelectProps={{
              IconComponent: () => <Chevron MenuId="open2" Check="open2" />,
              open: open2,
              onClose: () => {
                setOpen2(false);
              },
              onOpen: () => {
                setOpen2(true);
              },
            }}
          >
            <MenuItem value="" disabled>
              Content Type
            </MenuItem>
            {platform.frameContentType.map((item) => (
              <MenuItem key={item} value={item}>
                {item}{" "}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6} className={styles.marginbottom}>
        <FormControl fullWidth variant="outlined">
          <TextField
            disabled={
              post ||
              deliverableItem.platform.toLowerCase() === "youtube" ||
              deliverableItem.platform.toLowerCase() === "tiktok" ||
              deliverableItem.platform.toLowerCase() === "twitch" ||
              deliverableItem.platform.toLowerCase() === "twitter"
                ? true
                : false
            }
            labelid="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled-Frame-Required"
            fullWidth
            label="Frames Required"
            variant="outlined"
            className={
              options
                ? `${styles.inputfield} ${mainStyles.placeholderColor}`
                : mainStyles.placeholderColor
            }
            helperText={error ? <span> error </span> : " "}
            value={deliverableItem && deliverableItem.framesRequired}
            onChange={(e) =>
              handleDilverableContent(e.target.value, index, "framesRequired")
            }
            menuprops={{ variant: "menu" }}
            select
            SelectProps={{
              IconComponent: () => <Chevron MenuId="open3" Check="open3" />,
              open: open3,
              onClose: () => {
                setOpen3(false);
              },
              onOpen: () => {
                setOpen3(true);
              },
            }}
          >
            <MenuItem value="" disabled>
              Frame Required
            </MenuItem>
            {post ||
            deliverableItem.platform.toLowerCase() === "youtube" ||
            deliverableItem.platform.toLowerCase() === "tiktok" ||
            deliverableItem.platform.toLowerCase() === "twitch" ||
            deliverableItem.platform.toLowerCase() === "twitter" ? (
              <MenuItem value={"frame"}>{tictock.framesRequired[0]}</MenuItem>
            ) : (
              frames.map((frame) => (
                <MenuItem key={frame} value={frame}>
                  {frame}
                </MenuItem>
              ))
            )}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Grid container alignItems="center" className={styles.marginbottom}>
          <Grid item xs={1} className={styles.optionsItem}>
            {deliverableItem && deliverableItem.brandTagRequired ? (
              <CheckCircleIcon
                onClick={() => {
                  handleDilverableContent(
                    !deliverableItem.brandTagRequired,
                    index,
                    "brandTagRequired"
                  );
                  handleDilverableContent("", index, "brandTag");
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                className={styles.svgDisabled}
                onClick={() =>
                  handleDilverableContent(
                    !deliverableItem.brandTagRequired,
                    index,
                    "brandTagRequired"
                  )
                }
              />
            )}
          </Grid>
          <Grid item xs={4}>
            <p
              className={
                !deliverableItem.brandTagRequired ? styles.disabled : ""
              }
            >
              Brand tag required
            </p>
          </Grid>
          <Grid item xs={7}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Brand tag"
              variant="outlined"
              className={mainStyles.placeholderColor}
              disabled={!deliverableItem.brandTagRequired}
              value={deliverableItem && deliverableItem.brandTag}
              onChange={(e) =>
                handleDilverableContent(e.target.value, index, "brandTag")
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">@</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Grid container alignItems="center">
          <Grid item xs={1} className={styles.optionsItem}>
            {deliverableItem && deliverableItem.hashTagRequired ? (
              <CheckCircleIcon
                onClick={() => {
                  handleDilverableContent(
                    !deliverableItem.hashTagRequired,
                    index,
                    "hashTagRequired"
                  );
                  handleDilverableContent("", index, "hashTag");
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                className={styles.svgDisabled}
                onClick={() =>
                  handleDilverableContent(
                    !deliverableItem.hashTagRequired,
                    index,
                    "hashTagRequired"
                  )
                }
              />
            )}
          </Grid>
          <Grid item xs={4}>
            <p
              className={
                !deliverableItem.hashTagRequired ? styles.disabled : ""
              }
            >
              Hashtag required
            </p>
          </Grid>
          <Grid item xs={7}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Hashtag"
              className={mainStyles.placeholderColor}
              value={deliverableItem && deliverableItem.hashTag}
              onChange={(e) =>
                handleDilverableContent(e.target.value, index, "hashTag")
              }
              variant="outlined"
              disabled={!deliverableItem.hashTagRequired}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p className={styles.headingColor}>Post Frequency</p>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id="outlined-basic"
          fullWidth
          label="Number of Posts"
          helperText={error ? <span> error </span> : " "}
          className={mainStyles.placeholderColor}
          variant="outlined"
          value={deliverableItem && deliverableItem.posts}
          onChange={(e) =>
            handleDilverableContent(e.target.value, index, "posts")
          }
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <FormControl fullWidth variant="outlined">
          {/* <Select
						id='outlined-basic'
						fullWidth
						label='Per time period'
						variant='outlined'
						helperText={error ? <span> error </span> : ' '}
						value={deliverableItem && deliverableItem.frequency}
						onChange={(e) =>
							handleDilverableContent(e.target.value, index, 'frequency')
						}
						displayEmpty
						IconComponent={() => <Chevron />}
						MenuProps={{ variant: 'menu' }}
						input={<SelectMenu />}
					>
						<MenuItem value='' disabled>
							Per Time Period
			</MenuItem>
						<MenuItem value={'MONTH'}> Every Month </MenuItem>
						<MenuItem value={'BI_MONTHLY'}>Every other month </MenuItem>
						<MenuItem value={'WEEK'}>Every Week </MenuItem>
						<MenuItem value={'BI_WEEKLY'}>Every other week </MenuItem>
					</Select> */}
          <TextField
            id="Per time period"
            fullWidth
            label="Per time period"
            variant="outlined"
            value={deliverableItem && deliverableItem.frequency}
            className={mainStyles.placeholderColor}
            onChange={(e) =>
              handleDilverableContent(e.target.value, index, "frequency")
            }
            menuprops={{ variant: "menu" }}
            select
            SelectProps={{
              IconComponent: () => <Chevron MenuId="open4" Check="open4" />,
              open: open4,
              onClose: () => {
                setOpen4(false);
              },
              onOpen: () => {
                setOpen4(true);
              },
            }}
          >
            <MenuItem value="" disabled>
              Per Time Period
            </MenuItem>
            <MenuItem value={"MONTH"}> Every Month </MenuItem>
            <MenuItem value={"BI_MONTHLY"}>Every other month </MenuItem>
            <MenuItem value={"WEEK"}>Every Week </MenuItem>
            <MenuItem value={"BI_WEEKLY"}>Every other week </MenuItem>
          </TextField>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CreateDeliverable;
