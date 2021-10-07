import React from 'react';
import styles from './ImagePicker.module.scss';
import { HelpCircle } from 'react-feather'

const ImagePicker = ({ key, handleValue, value, heading }) => {

	return (
		<div className={styles.mainContainer}>
			<div className={styles.firstContainer}>
				<div >
					<h6>{heading}</h6>
					<HelpCircle />
				</div>
				<label htmlFor={key}>Upload</label>
				<input id={key} className={styles.inputFileStyle} type={'file'} onChange={handleValue} />

			</div>
			<div className={styles.secondConatiner}>
				{value !== null && <img src={value} />}
			</div>

		</div >)
};

export default ImagePicker;