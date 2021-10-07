import React from 'react';
import styles from './CollectionItem.module.scss';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Tooltip } from '@material-ui/core';

const CollectionItem = ({
	collectionId,
	collectionItem,
	handleCollectionItem,
	products,
}) => {
	const index =
		products.length > 0 &&
		products.findIndex((item) => item.collectionId === collectionId);

	let secondItem = null;

	if (index !== false && index !== -1) {
		secondItem = products[index].products.findIndex(
			(second) => second.productId === collectionItem.id
		);
	}


	return (
		<div
			onClick={() =>
				handleCollectionItem(collectionId, { productId: collectionItem.id })
			}
			className={styles.collectionItemContainer}
		>
			<div className={styles.divContainer}>
				<div className={styles.divGary}>
					<img
						className={styles.divGary}
						src={
							collectionItem &&
							collectionItem.images &&
							collectionItem.images !== null &&
							collectionItem.images.images[0].src
						}
					/>
				</div>
				{secondItem !== null && secondItem !== -1 && <CheckCircleIcon />}
			</div>
			<Tooltip title={collectionItem.name} placement='bottom'>
				<p className={styles.itemName}>{collectionItem.name}</p>
			</Tooltip>
			<p>
				$
        {collectionItem.priceRange &&
					collectionItem.priceRange.max &&
					collectionItem.priceRange.max.amount}{' '}
			</p>
			{/* <span>({collectionItem.id})</span> */}
			{collectionItem.estimatedQty && <p> {collectionItem.quntity} in stock</p>}
		</div>
	);
};

export default CollectionItem;
