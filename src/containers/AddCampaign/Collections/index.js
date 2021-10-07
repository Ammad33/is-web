import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import CollectionItem from './CollectionItem';
import styles from './Collection.module.scss';
import SVG from 'react-inlinesvg';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { CheckCircle, Circle } from 'react-feather';
import * as _ from 'lodash';
import {
	CarouselProvider,
	Slider,
	Slide,
	Image,
	ButtonBack,
	ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

/**styles */
const Accordion = withStyles({
	root: {
		marginTop: '10px',
		boxShadow: 'none',
		'&:not(:last-child)': {},
		'&:before': {
			display: 'none',
		},
		'&$expanded': {
		},
	},
	expanded: {},
})(MuiAccordion);

/**styles */
const AccordionSummary = withStyles({
	root: {
		minHeight: 66,
		'&$expanded': {
		},
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
	expanded: {},
})(MuiAccordionSummary);

/**styles */
const AccordionDetails = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
		flexDirection: 'column',
	},
}))(MuiAccordionDetails);

/**SVG */
const PlusSVG = () => {
	return <SVG src={`${process.env.PUBLIC_URL}/images/plus1.svg`} />;
};

const MinusSVG = () => {
	return <SVG src={`${process.env.PUBLIC_URL}/images/minus1.svg`} />;
};


const Collection = ({
	collections,
	handleCollectionItem,
	handleActiveForCollection,
	handleCollectionExpand,
	handleCollectionAllCheck,
	handleCollectionAllUncheck,
	products,
}) => {
	/**check for conditions and activate the next button for collection */
	useEffect(() => {
		handleActiveForCollection();
	}, [products]);

	useEffect(() => {
		document.getElementsByClassName(
			'AddCampaign_dialogContent__3teJx'
		)[0].scrollTop = 0;
	}, []);

	const [collectionData, setCollectionData] = useState([]);

	useEffect(() => {
		let collls = [];
		if (products && products.length > 0) {
			products.forEach((item) => {
				let index = collections.findIndex(
					(collItem) => collItem.id === item.collectionId
				);
				if (index !== -1) {
					collls.push({
						id: collections[index].id,
						products:
							collections[index].products &&
							collections[index].products.products.filter((itm) => {
								let secIndex = item.products.findIndex(
									(sec) => sec.productId === itm.id
								);
								if (secIndex !== -1) {
									return itm;
								}
							}),
					});
				}
			});
		}

		setCollectionData(collls);
	}, [products, collections]);

	return (
		<Grid container>
			<Grid item xs={12} sm={12} md={12}>
				<CarouselProvider
					naturalSlideWidth={10}
					naturalSlideHeight={10}
					totalSlides={100}
					visibleSlides={8}
					className={styles.collectionCarousel}
				>
					<div className={styles.sliderContainer}>
						<Slider className={styles.sliderMain}>
							{collectionData.map(
								(item, index) =>
									item.products.length > 0 &&
									item.products.map((collection, index) => {
										return (
											<Slide key={index} className={styles.slideContent}>
												<div className={styles.imageOverlay}></div>
												<Image
													index={index}
													src={
														collection.images &&
														collection.images.images.length > 0 &&
														collection.images.images[0].src
													}
													className={styles.sliderImage}
												/>
												<div className={styles.imageRemove}>
													<button
														className={styles.removeButton}
														onClick={() =>
															handleCollectionItem(item.id, {
																productId: collection.id,
															})
														}
													>
														Remove
                          </button>
												</div>
											</Slide>
										);
									})
							)}
						</Slider>

						{collectionData && collectionData.length > 0 ? (
							<>
								<ButtonBack className={styles.buttonBack}>&lt;</ButtonBack>
								<ButtonNext className={styles.buttonNext}>&gt;</ButtonNext>
							</>
						) : (
								''
							)}
					</div>
				</CarouselProvider>
				{collections &&
					collections.length > 0 &&
					collections.map((collection, index) => {
						return (
							<Accordion
								square
								expanded={collection.expand}
								key={Math.random()}
								onChange={() =>
									handleCollectionExpand(collection.expand, index)
								}
							>
								<AccordionSummary
									className={styles.accordianSummary}
									aria-controls='panel1d-content'
									id='panel1d-header'
									key={Math.random()}
								>
									<div className={styles.collectionName}>
										{collection && collection.name}
										<div className={styles.heading}>
											{products &&
												products.length > 0 &&
												products.find(
													(item) =>
														item.collectionId === collection.id &&
														item.products !== undefined &&
														item.products.length !== 0
												) && (
													<div className={styles.quantity}>
														<span className={styles.collectionNumber}>
															{
																products.find(
																	(item) => item.collectionId === collection.id
																).products.length
															}
														</span>
													</div>
												)}

											<span className={styles.svg}>
												{collection.expand ? <MinusSVG /> : <PlusSVG />}
											</span>
										</div>
									</div>
								</AccordionSummary>
								<AccordionDetails key={Math.random()}>
									{collection &&
										collection.products &&
										collection.products.products &&
										collection.products.products.length > 0 ? (
											<>
												<div className={styles.checkCollection}>
													{collection.selectedAll ? (
														<CheckCircleIcon
															onClick={() => {
																handleCollectionAllUncheck(collection);
															}}
														/>
													) : (
															<Circle
																onClick={() => {
																	handleCollectionAllCheck(collection);
																}}
															/>
														)}

													<p>Select Entire Collection</p>
												</div>
												<Grid item xs={12} className={styles.collections}>
													<Grid
														container
														spacing={3}
														className={styles.collectionContainer}
													>
														{collection.products.products.map(
															(collectionItem, index1) => {
																return (
																	<Grid item xs={3} key={index1}>
																		<CollectionItem
																			collectionItem={collectionItem}
																			key={index1}
																			products={products}
																			collectionId={collection.id}
																			collectionKey={collection}
																			collection={collection}
																			collections={collections}
																			handleCollectionItem={handleCollectionItem}
																		/>
																	</Grid>
																);
															}
														)}
													</Grid>
												</Grid>
											</>
										) : null}
								</AccordionDetails>
							</Accordion>
						);
					})}
			</Grid>
		</Grid>
	);
};

export default Collection;
