import React, { useContext } from 'react';
import { RootContext } from '../../context/RootContext';
import { Route, Redirect } from 'react-router-dom';

/**unprotected routes redirects to root(/) if  logged in */
const UnProtectedRoute = ({ children, ...routeProps }) => {

	const { currentUser } = useContext(RootContext);

	return (
		<Route
			{...routeProps}
			render={() => {
				if (
					currentUser &&
					currentUser !== null && currentUser.signInUserSession &&
					currentUser.signInUserSession !== null &&
					currentUser.signInUserSession.accessToken.jwtToken
				) {
					return <Redirect to={'/'} />;
				} else {
					return children;
				}
			}}
		/>
	);
};

export default UnProtectedRoute;
