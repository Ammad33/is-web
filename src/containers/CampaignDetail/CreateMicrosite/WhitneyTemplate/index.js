import React, { useState, useEffect, useContext } from 'react';
import styles from './WhitneyTemplate.module.scss';
import ColorComponent from '../ColorComponent';
import { Divider, Tooltip, Popover } from '@material-ui/core';
import TextField from '../../../../components/TextField';
import styles1 from '../ImagePicker/ImagePicker.module.scss';
import { HelpCircle, X } from 'react-feather'
import { API, graphqlOperation } from 'aws-amplify';
import { RootContext } from '../../../../context/RootContext';
import Iframe from 'react-iframe';
import uploadImages from '../../../../actions/uploadImges';
import { Auth } from 'aws-amplify';
import { DebounceInput } from 'react-debounce-input';

const Templates = ({ campaignId, internalState, template, microsite,
	changeTemplate, influencer, getCampaign, handleCampaginDetail }) => {

	///*****States for colors and images for all templates */

	const [headerColor, setHeaderColor] = useState("");
	const [headerColorOpen, setHeaderColorOpen] = useState(false);
	const [buttonColor, setButtonColor] = useState("");
	const [buttonColorOpen, setButtonColorOpen] = useState(false);
	const [quotesColor, setQuotesColor] = useState("");
	const [quotesColorOpen, setQuotesColorOpen] = useState(false);
	const [quotesBGColor, setQuotesBGColor] = useState("");
	const [quotesBGColorOpen, setQuotesBGColorOpen] = useState(false);
	const [shopColor, setShopColor] = useState("");
	const [shopColorOpen, setShopColorOpen] = useState(false);
	const [footerColor, setFooterColor] = useState("");
	const [footerColorOpen, setFooterColorOpen] = useState(false);
	const [heroImage1, setHeroImage1] = useState(null);
	const [heroImage2, setHeroImage2] = useState(null);
	const [heroImage3, setHeroImage3] = useState(null);

	const [heroImage1Url, setHeroImage1Url] = useState(null);
	const [heroImage2Url, setHeroImage2Url] = useState(null);
	const [heroImage3Url, setHeroImage3Url] = useState(null);

	const [update, setUpdate] = useState(false);
	const [heroImage1File, setHeroImage1File] = useState(null);
	const [heroImage2File, setHeroImage2File] = useState(null);
	const [heroImage3File, setHeroImage3File] = useState(null);
	const [heroImage, setHeroImage] = useState(null);
	const [heroFile, setHeroFile] = useState(null);
	const [image2, setImage2] = useState(null);
	const [image2File, setImage2File] = useState(null);
	const [quoteMessage, setQuoteMessage] = useState('');
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [heroUrl, setHeroUrl] = useState('');
	const [heroUrlSmall, setHeroUrlSmall] = useState('');
	const [heroUrlMedium, setHeroUrlMedium] = useState('');

	const [image2Url, setImage2Url] = useState('');
	const [image2UrlMedium, setImage2UrlMedium] = useState('');
	const [image2UrlSmall, setImage2UrlSmall] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const { brandId, currentUser, setCurrentUser, setTemplate, setCreateMicrositeFlag } = useContext(RootContext);


	//*** Call when pop open on */

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};


	//*** Close the pop on image dimistions */

	const handleClose = () => {
		setAnchorEl(null);
	};


	//*** Set Colors For Each Template When Component loads first time */

	useEffect(() => {

		if ((template === 'ONE' && (microsite === '' || microsite === undefined)) || (template === 'ONE' && changeTemplate === true)) {
			setHeaderColor('#984949');
			setButtonColor('#984949');
			setQuotesColor('#984949');
			setShopColor('#D38989');
			setFooterColor('#984949');
			setQuoteMessage('');
			setImage2(null);
			setHeroImage(null);

		} else if (template === 'ONE' && microsite !== null && microsite != '') {

			setHeaderColor(microsite.appHeader.titleBgColor);
			setButtonColor(microsite.appHeader.shopCtaColor);
			setQuotesColor(microsite.influencerQuote.quoteIconColor);
			setShopColor(microsite.shopBelow.bgColor);
			setFooterColor(microsite.footer.bgColor);
			setQuoteMessage(microsite.influencerQuote.quoteContent);
			setImage2(microsite.hero.imageLarge && microsite.hero.imageLarge !== null ? microsite.hero.imageLarge : null)
			setHeroImage(microsite.appHeader.imageLarge && microsite.appHeader.imageLarge !== null ? microsite.appHeader.imageLarge : null)

		} else if ((template === 'TWO' && (microsite === '' || microsite === undefined)) || (template === 'TWO' && changeTemplate === true)) {

			setHeaderColor('#FEF5CB');
			setButtonColor('#DCB7D1');
			setQuotesColor('');
			setShopColor('#FEF5CB');
			setFooterColor('#DCB7D1');
			setQuotesBGColor("#F1E2EC");
			setQuoteMessage('');
			setImage2(null)
			setHeroImage(null)

		}
		else if (template === 'TWO' && (microsite !== null && microsite != '')) {

			setHeaderColor(microsite.appHeader.titleBgColor);
			setButtonColor(microsite.appHeader.shopCtaColor);
			setQuotesColor('');
			setShopColor(microsite.shopBelow.bgColor);
			setFooterColor(microsite.footer.bgColor);
			setQuotesBGColor(microsite.influencerQuote.bgColor);
			setQuoteMessage(microsite.influencerQuote.quoteContent);
			setImage2(microsite.hero.imageLarge && microsite.hero.imageLarge !== null ? microsite.hero.imageLarge : null)
			setHeroImage(microsite.appHeader.image && microsite.appHeader.image !== null ? microsite.appHeader.image : null)

		} else if ((template === 'FOUR' && (microsite === '' || microsite === undefined)) || (template === 'FOUR' && changeTemplate === true)) {

			setHeaderColor('#B4C389');
			setButtonColor('#B4C389');
			setQuotesColor('');
			setShopColor('#FEF5CB');
			setFooterColor('#B4C389');
			setQuotesBGColor("#B4C389");
			setQuoteMessage('');
			setImage2(null);
			setHeroImage1Url(null);
			setHeroImage2Url(null);
			setHeroImage3Url(null);



		} else if (template === 'FOUR' && (microsite !== null && microsite != '')) {

			setHeaderColor(microsite.appHeader.titleBgColor);
			setButtonColor(microsite.appHeader.shopCtaColor);
			setQuotesColor('');
			setShopColor(microsite.shopBelow.bgColor);
			setFooterColor(microsite.footer.bgColor);
			setQuotesBGColor(microsite.influencerQuote.bgColor);
			setQuoteMessage(microsite.influencerQuote.quoteContent);
			setHeroImage1Url(microsite.appHeader.image1 && microsite.appHeader.image1 !== null ? microsite.appHeader.image1 : null)
			setHeroImage2Url(microsite.appHeader.image2 && microsite.appHeader.image2 !== null ? microsite.appHeader.image2 : null)
			setHeroImage3Url(microsite.appHeader.image3 && microsite.appHeader.image3 !== null ? microsite.appHeader.image3 : null)
			setImage2(microsite.hero.imageLarge && microsite.hero.imageLarge !== null ? microsite.hero.imageLarge : null)

		} else if ((template === 'THREE' && (microsite === '' || microsite === undefined)) || (template === 'THREE' && changeTemplate === true)) {

			setHeaderColor('#2B426F');
			setButtonColor('#2B426F');
			setQuotesColor('');
			setShopColor('#2B426F');
			setFooterColor('#2B426F');
			setQuotesBGColor("#2B426F");
			setQuoteMessage('');
			setImage2(null)
			setHeroImage(null)

		} else if (template === 'THREE' && (microsite !== null && microsite != '')) {

			setHeaderColor(microsite.appHeader.titleBgColor);
			setButtonColor(microsite.appHeader.shopCtaColor);
			setQuotesColor('');
			setShopColor(microsite.shopBelow.bgColor);
			setFooterColor(microsite.footer.bgColor);
			setQuotesBGColor(microsite.influencerQuote.bgColor);
			setQuoteMessage(microsite.influencerQuote.quoteContent);
			setImage2(microsite.hero.imageLarge && microsite.hero.imageLarge !== null ? microsite.hero.imageLarge : null)
			setHeroImage(microsite.appHeader.image && microsite.appHeader.image !== null ? microsite.appHeader.image : null)
		}

	}, [template, microsite]);


	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const [campaign, setCampaign] = useState('');

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		let id = campaignId.split('#');
		setCampaign(id[1]);
	}, []);


	//*** API Call for Hero Image */

	const PostHeroImage = (URL) => {
		uploadImages(URL, heroFile);
	}

	//*** API Call for Hero Image */

	const PostHeroImage1 = (URL) => {
		uploadImages(URL, heroImage1File);
	}

	//*** API Call for Hero Image */

	const PostHeroImage2 = (URL) => {
		uploadImages(URL, heroImage2File);
	}
	//*** API Call for Hero Image */

	const PostHeroImage3 = (URL) => {
		uploadImages(URL, heroImage3File);
	}


	//*** API Call for Image 2 */

	const PostImage2 = (URL) => {
		uploadImages(URL, image2File);
		setUpdate(!update);

	}

	//** Call Life cycle hook for first time and when any of these state is changed */

	useEffect(() => {
		if ((internalState && internalState != null && internalState === 'CONTRACT_SIGNED' && headerColor !== '')) {
			createOrUpdateMicroSite();
		}
	}, [headerColor, buttonColor, footerColor, shopColor, quoteMessage, quotesColor, quotesBGColor, template, update]);

	//** API Call for create and update microsite */

	const createOrUpdateMicroSite = async () => {
		let data = {
			appHeader: {
				shopCtaColor: buttonColor,
				titleBgColor: headerColor
			},
			campaignId: `${campaignId}`,
			footer: {
				bgColor: footerColor
			},
			influencerDisplayName: influencer.name,
			influencerId: `${brandId}`,
			influencerQuote: {
				quoteAuthor: influencer.name,
				quoteContent: quoteMessage,
				quoteIconColor: quotesColor,
				bgColor: quotesBGColor
			},
			influencerTitleName: influencer.name,
			mainHeader: {
				dark: false
			},
			productBuyBgColor: buttonColor,
			productBuyTextColor: "#FFFFFF",
			products: {
				direction: 'ROW',
				total: 10
			},
			shopBelow: {
				bgColor: shopColor
			},
			template: template
		};

		try {
			let response = await API.graphql(
				graphqlOperation(

					`mutation  createOrUpdateMicrosite($input: MicrositeInput !) {
                        createOrUpdateMicrosite(input: $input) {
                appHeader {
                    imageLargeUploadUrl
                    imageMediumUploadUrl
					imageUploadUrl
					image1UploadUrl
					image2UploadUrl
					image3UploadUrl
                }
                footer {
                    logoUploadUrl
                }
                hero {
                    imageLargeUploadUrl
                    imageMediumUploadUrl
                    imageUploadUrl
                }
                influencerQuote {
                    imageUploadUrl
                }
                mainHeader {
                    brandImageUploadUrl
                    influencerImageUploadUrl
                }
                microsite {
                    template
                }
            }
        }`,
					{
						input: data,
					}));


			if (response.data && response.data.createOrUpdateMicrosite) {
				if (response.data.createOrUpdateMicrosite.hero && response.data.createOrUpdateMicrosite.hero !== null) {
					if (response.data.createOrUpdateMicrosite.hero.imageLargeUploadUrl) {
						setImage2Url(response.data.createOrUpdateMicrosite.hero.imageLargeUploadUrl);
					}
					if (response.data.createOrUpdateMicrosite.hero.imageMediumUploadUrl) {
						setImage2UrlMedium(response.data.createOrUpdateMicrosite.hero.imageMediumUploadUrl);
					}
					if (response.data.createOrUpdateMicrosite.hero.imageUploadUrl) {
						setImage2UrlSmall(response.data.createOrUpdateMicrosite.hero.imageUploadUrl);
					}
				}

				if (response.data.createOrUpdateMicrosite.appHeader && response.data.createOrUpdateMicrosite.appHeader !== null) {

					if (response.data.createOrUpdateMicrosite.appHeader.imageLargeUploadUrl) {
						setHeroUrl(response.data.createOrUpdateMicrosite.appHeader.imageLargeUploadUrl);


					}
					if (response.data.createOrUpdateMicrosite.appHeader.imageMediumUploadUrl) {

						setHeroUrlMedium(response.data.createOrUpdateMicrosite.appHeader.imageMediumUploadUrl);

					}
					if (response.data.createOrUpdateMicrosite.appHeader.imageUploadUrl) {

						setHeroUrlSmall(response.data.createOrUpdateMicrosite.appHeader.imageUploadUrl);

					}

				}

				if (response.data.createOrUpdateMicrosite.appHeader && response.data.createOrUpdateMicrosite.appHeader !== null) {
					if (template === 'FOUR') {
						if (response.data.createOrUpdateMicrosite.appHeader.image1UploadUrl) {
							setHeroImage1(response.data.createOrUpdateMicrosite.appHeader.image1UploadUrl)
						}
						if (response.data.createOrUpdateMicrosite.appHeader.image2UploadUrl) {

							setHeroImage2(response.data.createOrUpdateMicrosite.appHeader.image2UploadUrl)
						}
						if (response.data.createOrUpdateMicrosite.appHeader.image3UploadUrl) {
							setHeroImage3(response.data.createOrUpdateMicrosite.appHeader.image3UploadUrl)
						}


					}

				}

				if (response.data.createOrUpdateMicrosite.hero && response.data.createOrUpdateMicrosite.hero !== null && template === 'FOUR') {
					if (response.data.createOrUpdateMicrosite.hero.imageLargeUploadUrl) {
						setImage2Url(response.data.createOrUpdateMicrosite.hero.imageLargeUploadUrl);
					}
					if (response.data.createOrUpdateMicrosite.hero.imageMediumUploadUrl) {
						setImage2UrlMedium(response.data.createOrUpdateMicrosite.hero.imageMediumUploadUrl);
					}
					if (response.data.createOrUpdateMicrosite.hero.imageUploadUrl) {
						setImage2UrlSmall(response.data.createOrUpdateMicrosite.hero.imageUploadUrl);
					}
				}
			}
		} catch (err) {
			console.log("Error in signing contract ", err)
			let message = '';

			if (err.errors && err.errors.length > 0)
				err.errors.forEach(m => {
					message = message + m.message;
				});

			setErrorMessage(message);
			return null;

		}
	};


	/** Call when hero file is uploading and post Image file is uploading */


	useEffect(() => {

		if (heroFile !== null && heroUrl && heroUrl !== '') {
			PostHeroImage(heroUrl);
		}

		if (heroFile !== null && heroUrlMedium && heroUrlMedium !== '') {
			PostHeroImage(heroUrlMedium);
		}

		if (heroFile !== null && heroUrlSmall && heroUrlSmall !== '') {
			PostHeroImage(heroUrlSmall);
		}

		if (image2File !== null && image2Url && image2Url !== '') {
			PostImage2(image2Url);
		}
		if (image2File !== null && image2UrlMedium && image2UrlMedium !== '') {
			PostImage2(image2UrlMedium);
		}
		if (image2File !== null && image2UrlSmall && image2UrlSmall !== '') {
			PostImage2(image2UrlSmall);
		}
	}, [heroFile, image2File]);

	useEffect(() => {

		if (heroImage1File !== null && heroImage1 && heroImage1 !== '') {
			PostHeroImage1(heroImage1);
		}
		if (heroImage2File !== null && heroImage2 && heroImage2 !== '') {
			PostHeroImage2(heroImage2);
		}
		if (heroImage3File !== null && heroImage3 && heroImage3 !== '') {
			PostHeroImage3(heroImage3);
		}
	}, [heroImage1File, heroImage2File, heroImage3File]);



	/** Request micro site approvel */

	const requestMicrositeApproval = async () => {
		try {
			await API.graphql(
				graphqlOperation(
					`mutation requestMicrositeApproval {
                    requestMicrositeApproval(
                        campaignId: "${campaignId}",
                        influencerId: "${brandId}"
                    )
                }`
				)
			)


			handleCampaginDetail(campaignId);
			setCreateMicrositeFlag(false);
			setTemplate('');

		}
		catch (err) {
			console.log("Error in requesting microSite approval ", err)
			let message = '';

			if (err.errors && err.errors.length > 0)
				err.errors.forEach(m => {
					message = message + m.message;
				});

			setErrorMessage(message);
			return null;
		}
	};

	//** GEt heading of each Template */

	const getHeading = (template) => {
		switch (template) {
			case 'ONE':
				return 'Whitney';
			case 'TWO':
				return 'Everett';
			case 'THREE':
				return 'Avron';
			case 'FOUR':
				return 'Lemmon';
			default:
				return 'Whitney';

		}
	};

	useEffect(() => {
		getAuth();
	}, []);


	const getAuth = async () => {

		try {
			const cognitoUser = await Auth.currentAuthenticatedUser();
			const currentSession = await Auth.currentSession();
			cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
				let currentUserAWS = { ...currentUser };
				currentUserAWS.signInUserSession = session;
				setCurrentUser(currentUserAWS);

			});
		} catch (e) {
			console.log('Unable to refresh Token', e);
		}

	}

	const handleHeaderColorComplete = (color, event) => {
		setHeaderColor(color.hex);
	}

	const handleButtonColorComplete = (color, event) => {
		setButtonColor(color.hex);

	}

	const handleShopColorComplete = (color, event) => {
		setShopColor(color.hex);
	}

	const handleQuotesColorComplete = (color, event) => {
		setQuotesColor(color.hex);

	}

	const handleQuotesBGColorComplete = (color, event) => {
		setQuotesBGColor(color.hex);
	}


	const handleFooterColorComplete = (color, event) => {
		setFooterColor(color.hex);

	}
	const closePicker = () => {
		setHeaderColorOpen(false)
		setButtonColorOpen(false)
		setQuotesColorOpen(false)
		setQuotesBGColorOpen(false)
		setShopColorOpen(false)
		setFooterColorOpen(false)
	}
	const stopPropagation = (event) => {
		event.stopPropagation();
	}

	return (
		<>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'right',
					horizontal: 'center',
				}}
				PaperProps={{
					style: {
						boxSizing: 'border-box',
						height: '80px',
						width: '222.5px',
						border: '1px solid #939393',
						backgroundColor: '#FFFFFF',
						color: '#000000',
						fontFamily: 'Poppins',
						fontSize: '14px',
						fontWeight: '500',
						letterSpacing: 0,
						lineHeight: '21px',
						padding: '19px 17px 19px 24px'
					},
				}}
				transformOrigin={{
					vertical: 'right',
					horizontal: 'center',
				}}
			>
				<div className={styles1.tooltip} >Image should be no larger than 800 <X className={styles.x} /> 500.</div>

			</Popover>

			<div onClick={closePicker}>
				<div className={styles.mainContainer}>
					<div className={styles.firstContainer}>
						<h4>
							Customize {getHeading(template)}
						</h4>
						{template !== 'FOUR' && <ColorComponent
							heading="Header highlight color"
							value={headerColor}
							open={headerColorOpen}
							handlValue={(e) => setHeaderColor(e.target.value)}
							onClick={() => setHeaderColorOpen(!headerColorOpen)}
							onChangeComplete={handleHeaderColorComplete}
							stopPropagation={stopPropagation}
						/>}
						<ColorComponent
							heading="Button color"
							open={buttonColorOpen}
							onClick={() => setButtonColorOpen(!buttonColorOpen)}
							value={buttonColor}
							handlValue={(e) => setButtonColor(e.target.value)}
							onChangeComplete={handleButtonColorComplete}
							stopPropagation={stopPropagation}

						/>

						{template !== 'FOUR' &&
							<div className={styles1.mainContainer}>
								<div className={styles1.firstContainer}>
									<div >
										<h6>Hero Image</h6>

										<HelpCircle onClick={handleClick} />

									</div>
									<label htmlFor='hero'>Upload</label>
									<input id='hero' className={styles1.inputFileStyle} type={'file'} onChange={(e) => { setHeroFile(e.target.files[0]); setHeroImage(URL.createObjectURL(e.target.files[0])) }} />

								</div>
								<div className={styles1.secondConatiner}>
									{heroImage !== null && <img src={heroImage} />}
								</div>

							</div >
						}

						{template === 'FOUR' &&
							<>
								<div className={styles1.mainContainer}>
									<div className={styles1.firstContainer}>
										<div >
											<h6>Hero Image 1</h6>

											<HelpCircle onClick={handleClick} />

										</div>
										<label htmlFor='hero1'>Upload</label>
										<input id='hero1' className={styles1.input} type={'file'} onChange={(e) => { setHeroImage1File(e.target.files[0]); setHeroImage1Url(URL.createObjectURL(e.target.files[0])) }} />

									</div>
									<div className={styles1.secondConatiner}>
										{heroImage1Url !== null && <img src={heroImage1Url} />}
									</div>

								</div >
								<div className={styles1.mainContainer}>
									<div className={styles1.firstContainer}>
										<div >
											<h6>Hero Image 2</h6>

											<HelpCircle onClick={handleClick} />

										</div>
										<label htmlFor='hero2'>Upload</label>
										<input id='hero2' className={styles1.input} type={'file'} onChange={(e) => { setHeroImage2Url(URL.createObjectURL(e.target.files[0])); setHeroImage2File(e.target.files[0]) }} />

									</div>
									<div className={styles1.secondConatiner}>
										{heroImage2Url !== null && <img src={heroImage2Url} />}
									</div>

								</div >
								<div className={styles1.mainContainer}>
									<div className={styles1.firstContainer}>
										<div >
											<h6>Hero Image 3</h6>

											<HelpCircle onClick={handleClick} />

										</div>
										<label htmlFor='hero3'>Upload</label>
										<input id='hero3' className={styles1.input} type={'file'} onChange={(e) => { setHeroImage3Url(URL.createObjectURL(e.target.files[0])); setHeroImage3File(e.target.files[0]); }} />

									</div>
									<div className={styles1.secondConatiner}>
										{heroImage3Url !== null && <img src={heroImage3Url} />}
									</div>

								</div >
							</>
						}

						<Divider className={styles.divider1} />
						{template === 'ONE' && <ColorComponent
							heading="Quotes color"
							open={quotesColorOpen}
							onClick={() => setQuotesColorOpen(!quotesColorOpen)}
							value={quotesColor}
							handlValue={(e) => setQuotesColor(e.target.value)}
							onChangeComplete={handleQuotesColorComplete}
							bottom={true}
							stopPropagation={stopPropagation}
						/>}
						{template !== 'ONE' && <ColorComponent
							heading="Quotes background color"
							value={quotesBGColor}
							open={quotesBGColorOpen}
							onClick={() => setQuotesBGColorOpen(!quotesBGColorOpen)}
							handlValue={(e) => setQuotesBGColor(e.target.value)}
							onChangeComplete={handleQuotesBGColorComplete}
							bottom={true}
							stopPropagation={stopPropagation}
						/>}
						<DebounceInput
							element="textarea"
							value={quoteMessage}
							minLength={2}
							debounceTimeout={100}
							forceNotifyOnBlur={true}
							placeholder="Quote about product"
							variant='outlined'
							onChange={(e) => setQuoteMessage(e.target.value)}
							className={styles.quotesInput}
						/>
						<Divider className={styles.divider2} />
						<div className={styles1.mainContainer}>
							<div className={styles1.firstContainer}>
								<div >
									<h6>Image 2</h6>
									<Tooltip placement="right"
										title={<div className={styles1.tooltip} >Image should be no larger than 800<span><X /></span>500  </div>}
									>
										<HelpCircle onClick={handleClick} />
									</Tooltip>
								</div>
								<label htmlFor={'image2'}>Upload</label>
								<input id={'image2'} className={styles1.input2} type={'file'} onChange={(e) => { setImage2File(e.target.files[0]); setImage2(URL.createObjectURL(e.target.files[0])) }} />

							</div>
							<div className={styles1.secondConatiner}>
								{image2 !== null && <img src={image2} />}
							</div>

						</div >
						{(template === 'ONE' || template === 'TWO') && <ColorComponent
							heading="Shop below background color"
							value={shopColor}
							open={shopColorOpen}
							onClick={() => setShopColorOpen(!shopColorOpen)}
							handlValue={(e) => setShopColor(e.target.value)}
							onChangeComplete={handleShopColorComplete}
							stopPropagation={stopPropagation}
						/>}

						<Divider className={styles.divider1} />
						<ColorComponent heading="Footer Color"
							value={footerColor}
							open={footerColorOpen}
							onClick={() => setFooterColorOpen(!footerColorOpen)}
							onChangeComplete={handleFooterColorComplete}
							handlValue={(e) => setFooterColor(e.target.value)}
							stopPropagation={stopPropagation}
						/>

					</div>
					<div className={styles.secondContainer}>
						<Iframe
							url={`${process.env.REACT_APP_FOMO_URL}/?influencerId=${brandId}&campaignId=campaign%23${campaign}&accessToken=${currentUser.signInUserSession.accessToken.jwtToken}`}
							width="100%"
							height="100%"
							id="myId"
							className={styles.secondContainer}
							display="initial"
							position="relative" />
					</div>
				</div >
				<div className={styles.buttonContainer}>
					<button className={styles.sendButton} onClick={() => requestMicrositeApproval()}> Send to Brand for Approval</button>
				</div>
				<div className={styles.errorContainer}>
					{errorMessage !== '' && <div className={styles.errorSignContract}>{errorMessage}</div>}
				</div>
			</div>
		</>
	);

};

export default Templates;