import React from 'react';

import { Switch, withStyles } from '@material-ui/core';

/*** Override the Style of Drawer */
const StyledSwitch = withStyles({
	switchBase: {
		color: '#E5E5E5',
		'&$checked': {
			color: '#4A90E2',
		},
		'&$track': {
			color: '#C2C2C2'
		},
		'&$checked + $track': {
			backgroundColor: '#6CADFF',
		},
	},
	checked: {},
	track: {
	},
})(Switch);

const CustomizedSwich = (props) => <StyledSwitch {...props} />;

export default CustomizedSwich;