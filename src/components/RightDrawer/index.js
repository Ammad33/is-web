import React from 'react';
import { Drawer, makeStyles } from '@material-ui/core'

/*** Override the Style of Drawer */

const useStyles = makeStyles(() => ({
	paper: {
		width: '391px',
		backgroundColor: '#FFFFFF',
		boxShadow: '0 6px 50px 0 rgba(0,0,0,0.1)',
		marginTop: '85px',
		overflowY: 'hidden',
		paddingBottom: '85px'
	},
}
));



const DrawerStyled = (props) => {

	const classes = useStyles();

	return (
		<Drawer
			BackdropProps={{ invisible: true }}
			classes={{
				paper: classes.paper,
			}}
			{...props}
		/>)
};

export default DrawerStyled;