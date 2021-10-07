import React from 'react';
import styles from './ProductItem.module.scss'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const CompensationProductItem = ({ compensationItem, compensationProduct, compensationProducts, handleCompensationProductItem }) => {

	const index = compensationProducts.length > 0 && compensationProducts.findIndex(item => item.collectionName === compensationProduct);

	let secondItem = null;

	if (index !== false && index !== -1) {
		secondItem = compensationProducts[index].collectionItems.findIndex(second => second.sku === compensationItem.sku);
	}

	return (
		<div onClick={() => handleCompensationProductItem(compensationProduct, compensationItem)} className={styles.collectionItemContainer}>
			<div className={styles.divContainer}><div className={styles.divGary}></div>
				{secondItem !== null && secondItem !== -1 && <CheckCircleIcon />}</div>
			<p className={styles.itemName}>{compensationItem.name}</p>
			<p  >${compensationItem.price} <span>({compensationItem.sku})</span></p>
			<p>{compensationItem.quntity} in stock</p>
		</div>
	);

};

export default CompensationProductItem;