import React, { useState } from 'react';
import styles from './ColorComponent.module.scss';
import { ChromePicker } from 'react-color';
import { X } from 'react-feather';


const ColorComponent = ({ heading, value, handlValue, onClick, open, onChangeComplete, bottom, stopPropagation }) => {

	let style = bottom === true ? { position: 'absolute', bottom: '76px' } : { position: 'absolute' }
	let stle1 = bottom === true && open === true ? { position: 'relative' } : {};

	const myFunction1 = (event) => {
		onClick();
		stopPropagation(event);
	}
	return (

		<div className={styles.colorContainer} style={stle1} >

			{open && bottom === true && <div><div style={style} onClick={stopPropagation}><ChromePicker color={value} onChangeComplete={onChangeComplete} /></div></div>}
			<h6>{heading}</h6>
			<div className={styles.colorPicker}>
				<div className={styles.colorValue} onClick={myFunction1} style={{ backgroundColor: value }}></div>
				<input value={value} onChange={handlValue} maxLength={7} />
			</div>
			{open && bottom === undefined && <div>
				{/* < X onClick={onClick} />   */}
				<div style={style} onClick={stopPropagation}>
					<ChromePicker color={value} onChangeComplete={onChangeComplete} />
				</div></div>}
		</div >

	);

};

export default ColorComponent;