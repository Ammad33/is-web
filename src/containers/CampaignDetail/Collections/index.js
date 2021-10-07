import React, { useState, useEffect } from 'react';
import styles from './Collections.module.scss';
import { Edit } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

const Collections = ({ handleEdit, removeSeeAll, products, id, status }) => {

	const history = useHistory();


	let counter = 0;
	let second = 0;
	const [enable, setEnable] = useState(false);

	useEffect(() => {
		if (counter >= 8 || second >= 2) {
			setEnable(true);
		}
	}, [counter, second, products]);

	return (<div className={styles.collectionContainer}>
		<div className={styles.headerContainer}>
			<h1>Collection</h1>
			{(status && status === 'DRAFT') ? (
				<Edit onClick={() => handleEdit(4)} />
			) : (
					''
				)}
		</div>
		{
			products && products !== null && products.length > 0 && counter < 9 &&
			products.map(item => {
				second = second + 1;
				return (
					<div className={styles.collectionSubContent}>
						{counter < 8 && second < 3 && <h6>{item.collection && item.collection.name}</h6>}
						<div className={styles.containerRow}>
							{
								item.products && item.products.length > 0 &&
								item.products.map((pro, index) => {
									counter = counter + 1;
									if (counter < 9 && second < 3) {
										return (
											<div className={styles.boxContainer} >
												<div className={styles.box}><img className={styles.box} src={pro && pro.product.images && pro.product.images !== null && pro.product.images.images.length > 0 && pro.product.images.images[0].src} /></div>
												<Tooltip title={pro.name} placement="bottom">
													<p className={styles.boxItem}>{pro.product.name}</p>
												</Tooltip>
												<p className={styles.boxPrice}>${pro.product.priceRange && pro.product.priceRange.max ? pro.product.priceRange.max.amount : ''} </p>
												{/* <span>(1234367)</span> */}
												{pro && pro.product.estimatedQty && pro.product.estimatedQty !== null && <p className={styles.boxPrice}> 25 in stock</p>}
											</div>
										)
									}
								}
								)
							}
						</div>
					</div>
				)

			})
		}

		{enable === false ? null : <button onClick={() => history.push(`/collections/${id}`, { campaignId: id })} >See all</button>}
	</div >);
}

export default Collections;