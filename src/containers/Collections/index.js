import React, { useEffect, useContext, useState } from 'react';
import styles from './Collections.module.scss';
import { ChevronRight, Edit } from 'react-feather';
import { useHistory, withRouter } from 'react-router-dom';
import { RootContext } from '../../context/RootContext';
import AddCampaign from '../AddCampaign';
import brandCampaignDetailQuery from '../../GraphQL/brandCampaignDetailQuery';
import influencerCampaignDetailQuery from '../../GraphQL/influencerCampaignDetailQuery';

const Collections = ({ location }) => {

	let campaignId = 'campaign' + location.hash;

	/*** States for Data handling */

	const history = useHistory();
	const [addCampaign, setAddCampaign] = useState(false);
	const [data, setData] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

	const { activeCampaign, brandId, brandType } = useContext(RootContext);

	/*** Call first and when active Campaign changes */

	useEffect(() => {
		window.scrollTo(0, 0);
		getCampaign();
	}, [activeCampaign]);

	/***Call Campaign Detail API */

	const getCampaign = async () => {

		try {
			const result = brandType.toLowerCase() == 'influencer' ? await influencerCampaignDetailQuery(brandId, campaignId) : await brandCampaignDetailQuery(brandId, campaignId);

			if (result.error === false) {
				setData(result.data);
				setErrorMessage('');
			} else {
				setErrorMessage(result.message);
			}

		} catch (e) {

			setErrorMessage(e);

		}
	};

	/****Call when redirect to campiagn detail main page */

	const handleCampaginDetail = (id) => {
		history.push(`/campaignDetail/${id}`, { campaignId: id });
	};


	return (
		<>
			{addCampaign && (
				<AddCampaign
					open={addCampaign}
					step={4}
					campaign={data}
					brandId={data.brand.id}
					handleCancel={() => {
						setAddCampaign(false);
						getCampaign();
					}}
				/>
			)}
			<div className={styles.collectionContainer}>
				<div className={styles.collectionHeading}>
					<span onClick={() => history.push('/campaigns')}>Campaigns</span>
					<ChevronRight />
					<span onClick={() => handleCampaginDetail(data.id)}>{data && data !== null && data.name}</span>
					<ChevronRight />
					<span>Collections</span>
					{data && data.status && data.status === 'DRAFT' ? (<Edit onClick={() => setAddCampaign(true)} />) : ('')}
				</div>
				{
					data && data !== null && data.products && data.products.length > 0 &&
					data.products.map(item => {
						return (<div className={styles.collectionSubContent}>
							<h6>{item.collection.name}</h6>
							<div className={styles.containerRow}>
								{item.products && item.products.length !== 0 && item.products.map(pro => {
									return (<div className={styles.boxContainer} >
										<div className={styles.box}><img className={styles.box} src={pro.product.images && pro.product.images && pro.product.images.images[0].src} /></div>
										<p className={styles.boxItem}>{pro.product.name}</p>
										<p className={styles.boxPrice}>${pro.product.priceRange && pro.product.priceRange.max && pro.product.priceRange.max.amount} </p>
										{/* <span>(1276124)</span> */}
										{pro.product && pro.product.estimatedQty && pro.product.estimatedQty !== null && < p className={styles.boxPrice}>{pro.product.estimatedQty} in stock</p>}
									</div>)
								})

								}
							</div>
						</div>
						);
					})
				}
				{errorMessage !== '' && (
					<div className={styles.errorMessageContainer}>
						{errorMessage}
					</div>
				)}
			</div >
		</>
	);
}

export default withRouter(Collections);