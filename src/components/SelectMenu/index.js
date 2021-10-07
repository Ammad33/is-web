import React from 'react';
import { withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

/*** Override the Style of Drawer */
const CssSelectMenu = withStyles({
	root: {
		'label.Mui-focused': {
			color: '#000000',
			fontFamily: 'Poppins',
			fontSize: '16px !important'
		},
	},
	input: {
		borderRadius: 5,
		border: '1px solid #939393 !important',
		fontFamily: 'Poppins',
		fontSize: '16px',
		color: '#000000',
		padding: "20px 20px 15px 20px",
		'&:focus': {
			borderColor: '#939393 !important',
			borderRadius: '5px',
			backgroundColor: 'white'

		},
		'&:hover': {
			borderColor: '#939393  !important',
			borderRadius: '5px',
			backgroundColor: 'white'
		},
	},
})(InputBase);

const SelectMenu = (props) => <CssSelectMenu  {...props} />;

export default SelectMenu;