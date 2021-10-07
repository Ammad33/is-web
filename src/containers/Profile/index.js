import React, { useContext } from 'react';
import { RootContext } from './../../context/RootContext';

import BrandProfile from './BrandProfile';
import InfluencerProfile from './InfluencerProfile';

const Profile = () => {
	const { brandType } = useContext(RootContext);
	return (
		<>
			<div>
				{brandType === 'Brand' ? <BrandProfile /> : <InfluencerProfile />}
			</div>
		</>
	);
};

export default Profile;
