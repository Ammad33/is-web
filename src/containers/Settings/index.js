import React, { useContext, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import styles from './Setting.module.scss';
import Notifications from './Notifications';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import Account from './Account';
import ConnectedAccounts from './ConnectedAccounts';
import Billing from './Billing';
import { RootContext } from '../../context/RootContext';

const Setting = () => {
	const [active, setActive] = useState('account');
	const [actionRequired, setActionRequired] = useState(true);
	const [signContracts, setSignContracts] = useState(true);
	const [influncerPosts, setInfluncerPosts] = useState(false);
	const [campaignStart, setCampaignStart] = useState(false);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [brands, setBrands] = useState([]);
	const [imgUrl, setImgUrl] = useState([]);
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [emailVerified, setEmailVerified] = useState('');
	const [brandNamee, setBrandNamee] = useState([]);
	const [typeName, setTypeName] = useState([]);
	const [teamAdmin, setTeamAdmin] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const [imageFile, setImageFile] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');


	const {
		brandType,
		brandName,
		setBrandName,
		brandId,
		currentUser,
		setToastrData,
		setUpdateMeData,
		setProfileUpdate,
	} = useContext(RootContext);

	useEffect(() => {
		team();
	}, []);

	useEffect(() => {
		setBrandNamee(brandName);
	}, [brandName]);

	const [newBrand, setNewBrand] = useState({
		brandName: '',
		pocName: '',
		email: '',
		mobilePhone: '',
	});

	const [newBrandError, setNewBrandError] = useState({
		brandName: false,
		pocName: false,
		email: false,
		mobilePhone: false,
	});


	const handleNewBrandChange = (value, fieldName) => {
		const brand = { ...newBrand };
		brand[fieldName] = value;
		const brandError = { ...newBrandError };
		if (
			fieldName === 'email' ||
			(fieldName === 'mobilePhone' &&
				brandError[fieldName] === true &&
				value !== '')
		) {
			brandError['mobilePhone'] = false;
			brandError['email'] = false;
			setNewBrandError(brandError);
		} else if (brandError[fieldName] === true && value !== '') {
			brandError[fieldName] = false;
			setNewBrandError(brandError);
		}
		setNewBrand(brand);
	};

	const clearNewBrand = () => {
		setNewBrand({
			brandName: '',
			pocName: '',
			email: '',
			mobilePhone: '',
		});

		setNewBrandError({
			brandName: false,
			pocName: false,
			email: false,
			mobilePhone: false,
		});
	};

	const addNewBrand = () => {
		const brandError = { ...newBrandError };
		if (newBrand.brandName === '') {
			brandError.brandName = true;
		}
		if (newBrand.pocName === '') {
			brandError.pocName = true;
		}

		if (newBrand.email === '' && newBrand.mobilePhone === '') {
			brandError.email = true;
		}

		if (newBrand.email === '' && newBrand.mobilePhone === '') {
			brandError.mobilePhone = true;
		}

		setNewBrandError(brandError);

		if (Object.values(brandError).includes(true)) {
			return;
		}

		const data = [...brands];
		data.push(newBrand);
		setBrands(data);
	};


	const myData = async () => {
		try {
			const mydata = await API.graphql({
				query: `{
					me {
						email
						fullName
						id
						verification {
							verified
							sent
						}
						organizations {
							organization {
								id
								name
								__typename
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
			setEmailVerified(mydata.data.me.verification.verified);
			setEmail(mydata.data.me.email);
			setFullName(mydata.data.me.fullName);
			setImgUrl(mydata.data.me.imageUrl);
			setBrandNamee(brandName);
			setTypeName(mydata.data.me.organizations[1].organization.__typename);
		} catch (e) {
			console.log(e);
			if (e.data) {
				setEmail(e.data.me.email);
				setFullName(e.data.me.fullName);
				setImgUrl(e.data.me.imageUrl);
			}
		}
	};

	useEffect(() => {
		myData();
	}, [])


	const team = async () => {
		try {
			const team = await API.graphql({
				query: `{
          brand(id:"${brandId}") {
            users {
            	user {
                	id
					}
				role {
					administration
					}
            }
          }
        }`,
			});
			const teamAdmin = team.data.brand.users;
			teamAdmin.map((item) => {
				if (item.role.administration == true) {
					setTeamAdmin(true);
				}
			});
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		updateImage();
	}, []);

	const updateImage = async () => {
		try {
			let res = await API.graphql(
				graphqlOperation(
					`mutation updateImage {
						updateProfileImage 
					}
					`,
				)

			)
			if (res.data && res.data !== null && res.data.updateProfileImage && res.data.updateProfileImage !== null) {
				setImageUrl(res.data.updateProfileImage);
			}
		}
		catch (e) {
			console.log("Error uploading Image", e);
			let message = '';

			if (e.errors && e.errors.length > 0)
				e.errors.forEach((m) => {
					message = message + m.message;
				});

			setErrorMessage(message);
		}
	}
	const postImage = (url) => {
		UploadImage(url, imageFile);

	};

	const UploadImage = async (URL, file) => {
		console.log(URL, file);
		var requestOptions = {
			method: 'PUT',
			body: file,
			headers: {
				'Content-Type': ''

			},
			redirect: 'follow'
		};

		try {
			let response = await fetch(URL, requestOptions);
			let result = await response.text();
			setProfileUpdate(true);
		} catch (error) { console.log('error', error) }

	};

	useEffect(() => {
		if (imageFile !== null && imageUrl !== '') {
			postImage(imageUrl);
		}
	}, [imageUrl, imageFile]);



	const handleChangePassword = async () => {
		const currentUser = await Auth.currentAuthenticatedUser();
		await Auth.changePassword(currentUser, oldPassword, newPassword);
		setNewPassword('');
		setOldPassword('');
	};
	const handleSaveAccount = async () => {
		if (brandName != brandNamee) {
			try {
				await API.graphql(
					graphqlOperation(
						`mutation UpdateBrand {
						updateBrand(input: {
							id: "${brandId}" , 
							name: "${brandNamee}"}) 
							{
							brand {
								name
							}
						}
					}`
					)
				)
				setBrandName(brandNamee);
			}
			catch (e) {
				console.log("ERROR", e)
				let message = '';

				if (e.errors && e.errors.length > 0)
					e.errors.forEach((m) => {
						message = message + m.message;
					});

				setErrorMessage(message);
			}
		}
		try {
			let data = {
				fullName,
			};
			await API.graphql(
				graphqlOperation(
					`mutation updateMe($input : UpdateMeInput!) {
			updateMe(input: $input) {
				fullName
			}
		}`,
					{
						input: data,
					}
				)
			);
			setToastrData({
				severity: 'success',
				message: 'Account info updated successfully.',
				showToastr: true,
			});
			setUpdateMeData(true);
		} catch (e) {
			console.log('Campaign Invite error ', e);
			let message = '';

			if (e.errors && e.errors.length > 0)
				e.errors.forEach((m) => {
					message = message + m.message;
				});

			setErrorMessage(message);
		}
	};

	const getContents = () => {
		switch (active) {
			case 'account':
				return (
					<Account
						fullname={fullName}
						imgUrl={imgUrl}
						handleImageFile={(value) => { setImageFile(value) }}
						handleImageProfile={(value) => { setImgUrl(value) }}
						handleFullName={(e) => {
							setFullName(e.target.value);
						}}
						email={email}
						handleEmail={(e) => {
							setEmail(e.target.value);
						}}
						brandName={brandNamee}
						handleBrandName={(e) => {
							setBrandNamee(e.target.value);
						}}
						oldPassword={oldPassword}
						newPassword={newPassword}
						setOldPassword={(e) => setOldPassword(e.target.value)}
						setNewPassword={(e) => setNewPassword(e.target.value)}
						handleChangePassword={handleChangePassword}
						handleSaveAccount={handleSaveAccount}
						emailVerfied={emailVerified}
						teamAdmin={teamAdmin}
						typeName={brandType}
						errorMessage={errorMessage}
					/>
				);
			case 'notification':
				return (
					<Notifications
						actionRequired={actionRequired}
						signContracts={signContracts}
						influncerPosts={influncerPosts}
						campaignStart={campaignStart}
						typeName={typeName}
						hanldeActionRequired={(e) => setActionRequired(e.target.checked)}
						hanldeSignContracts={(e) => setSignContracts(e.target.checked)}
						hanldeInfluencerPost={(e) => setInfluncerPosts(e.target.checked)}
						hanldeCampaignStart={(e) => setCampaignStart(e.target.checked)}
					/>
				);
			case 'connectedAccounts':
				return <ConnectedAccounts typeName={brandType} />;
			case 'billing':
				return <Billing />;
			default:
				return 'Unknown step';
		}
	};
	return (
		<div className={styles.settingContainer}>
			<div className={styles.settingHeadingContainer}>
				<div className={styles.settingHeading}>
					<span>Settings</span>
				</div>
			</div>
			<div className={styles.settingHeadingButton}>
				<button
					className={active === 'account' ? styles.active : ''}
					onClick={() => setActive('account')}
				>
					Account
        </button>
				<button
					className={active === 'notification' ? styles.active : ''}
					onClick={() => setActive('notification')}
				>
					Notifications
        </button>
				<button
					className={active === 'connectedAccounts' ? styles.active : ''}
					onClick={() => setActive('connectedAccounts')}
				>
					Connected Accounts
        </button>
				<button
					className={active === 'billing' ? styles.active : ''}
					onClick={() => setActive('billing')}
				>
					Billing
        </button>
			</div>
			<Grid containers>{getContents()}</Grid>
		</div>
	);
};

export default Setting;
