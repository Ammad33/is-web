import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LeftSideDrawer from '../../components/LeftSideDrawer';
import Header from './../../components/Header';
import { RootContext } from './../../context/RootContext';
import Brand from '../../components/Brand';
import { API, Auth } from 'aws-amplify';

const drawerWidth = 284;
/**useStyles hook from material-ui */
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100%',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		backgroundColor: '#fff',
		color: '#000',
		boxShadow: 'none',
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		padding: '30px 19px',
	},
	customToolbar: {
		minHeight: '84px',
	},
	content: {
		flexGrow: 1,
		backgroundColor: '#fff',
		height: '100%',
		padding: theme.spacing(3),
	},
}));

/**ResponsiveDrawer from material-ui */
function ResponsiveDrawer(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	/**accessing RootContext */
	const { brandType, updateMeData, setUpdateMeData, meData, setMeData, setCurrentUser, currentUser } = useContext(RootContext);

	/**react hook initiate the api call whenever updateMeData changes */
	useEffect(() => {
		if (meData === null) {
			myData();
		}
	}, [meData]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	/**API call */
	const myData = async () => {

		try {
			const mydata = await API.graphql({
				query: `{
						me {
							email
							fullName
							id
							organizations {
								organization {
									id
									name
									__typename
									roles {
										id
									}
									imageUrl
									email
								}
							}
							about
							age
							companyTitle
							imageUrl
							joined
							modified
							phoneNumber
						}
				}`,
			});
			setMeData(mydata.data.me);
			setUpdateMeData(false);
		} catch (e) {
			console.log(e);
		}
	};


	// Refresh Token for user 

	const getAuth = async () => {
		try {
			const cognitoUser = await Auth.currentAuthenticatedUser();
			const currentSession = await Auth.currentSession();
			cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
				let currentUserAWS = { ...currentUser };
				currentUserAWS.signInUserSession = session;
				setCurrentUser(currentUserAWS);

			});
		} catch (e) {
			console.log('Unable to refresh Token', e);
		}
	}

	const container =
		window !== undefined ? () => window().document.body : undefined;
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar className={classes.customToolbar}>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Header meData={meData} brandType={brandType} />
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label='mailbox folders'>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation='css'>
					<Drawer
						container={container}
						variant='temporary'
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						<div className={classes.toolbar}>
							<Brand />
						</div>
						<LeftSideDrawer />        {/**sidebar */}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant='permanent'
						open
					>
						<div className={classes.toolbar}>
							<Brand />
						</div>
						<LeftSideDrawer />
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{props.children}
			</main>
		</div>
	);
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default ResponsiveDrawer;
