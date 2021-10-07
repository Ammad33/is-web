import React from 'react';
import styles from './ForgotPassword.module.scss';
import { Button } from '@material-ui/core';
import mainStyles from './../../index.module.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const Confirmation = () => {
	const history = useHistory();
	return (

		<div className={styles.forgotPasswordContainer}>
			<h1 className={styles.heading}>Forgot your password?</h1>
			<p className={styles.des}>If there is an account associated to the email you entered you will receive an email with instructions to reset your password.</p>
			<div className={styles.actionsContainer}>
				<Button
					onClick={() => {
						history.push('/login');
					}}
					className={mainStyles.defaultButton}
					variant='outlined'
				>
					Login
        </Button> </div>
			<div>
				<Link to="#">Re-send password reset link</Link>
			</div>
		</div>
	);
}

export default Confirmation;
