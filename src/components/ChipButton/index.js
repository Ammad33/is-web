import React from 'react';
import mainStyles from '../../index.module.scss';
import clsx from 'clsx';

const ChipButton = ({ title, buttonSize, handleClick }) => {
	return (
		<button
			onClick={handleClick}
			className={clsx(buttonSize === 'sm' ? mainStyles.chipBlkBtnSm : '')}
		>
			{title}
		</button>
	);
};

export default ChipButton;
