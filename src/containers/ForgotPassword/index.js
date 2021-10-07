import React, { useState, useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import styles from './ForgotPassword.module.scss';
import mainStyles from './../../index.module.scss';
import { useHistory } from 'react-router-dom';
import Confirmation from './confirmation';
import { RootContext } from '../../context/RootContext';

const ForgotPassword = () => {
	const history = useHistory();
	const [confirmation, setConfirmation] = useState(false);
	const [username, setUsername] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { setShowLoader } = useContext(RootContext);

	const onForgotPassword = async () => {
		try {
			setShowLoader(true);
			const user = await Auth.forgotPassword(username);
			setConfirmation(true);
			setShowLoader(false);
		} catch (e) {
			setErrorMessage(e.message);
			setShowLoader(false);
		}
	};

	return confirmation ? (
		<Confirmation />
	) : (
			<div className={styles.forgotPasswordContainer}>
				<h1 className={styles.heading}>Forgot your password?</h1>
				<p className={styles.des}>
					We will send you an email with instructions to reset your password.
      </p>
				<TextField
					id='outlined-basic'
					label='Email'
					onChange={(e) => setUsername(e.target.value)}
					variant='outlined'
					type='text'
					className={styles.emailStyle}
				/>
				<div className={styles.actionsContainer}>
					<Button
						onClick={onForgotPassword}
						className={mainStyles.defaultButton}
						variant='contained'
					>
						<p className={styles.buttonText}>Send a Link </p>
					</Button>
					<Button
						onClick={() => {
							history.push('/login');
						}}
						className={mainStyles.defaultOutlinedButton}
						variant='outlined'
					>
						Login
        </Button>
				</div>
			</div>
		);
};

export default ForgotPassword;
