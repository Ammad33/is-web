import React from 'react';
import InfluencerCard from './InfluencerCard';
import BrandCard from './BrandCard';
import styles from './RightMenu.module.scss';

const influencers = [
	{
		avatar:
			'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
		name: 'Mark',
		socialTag: 'aatikta',
		description:
			'Trendy Womens Clothing and accessories.Chic outfits for everyday wear!',
		instaFollowers: '10k',
		youtubeFollowers: '20k',
		facebookFollowers: '30k',
		selected: false,
	},
	{
		avatar:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
		name: 'Julie',
		socialTag: 'jurica',
		description:
			'Trendy Womens Clothing and accessories.Chic outfits for everyday wear!',
		instaFollowers: '20k',
		youtubeFollowers: '20k',
		facebookFollowers: '40k',
		selected: false,
	},
	{
		avatar:
			'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
		name: 'Muntasir',
		socialTag: 'aatiktas',
		description:
			'Trendy Womens Clothing and accessories.Chic outfits for everyday wear!',
		instaFollowers: '50k',
		youtubeFollowers: '70k',
		facebookFollowers: '60k',
		selected: false,
	},
	{
		avatar:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
		name: 'Sam',
		socialTag: 'miracle',
		description:
			'Trendy Womens Clothing and accessories.Chic outfits for everyday wear!',
		instaFollowers: '32k',
		youtubeFollowers: '29k',
		facebookFollowers: '45k',
		selected: false,
	},
	{
		avatar:
			'https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=802&q=80',
		name: 'Chris',
		socialTag: 'happy',
		description:
			'Trendy Womens Clothing and accessories.Chic outfits for everyday wear!',
		instaFollowers: '22k',
		youtubeFollowers: '23k',
		facebookFollowers: '33k',
		selected: true,
	},
];

const RightMenu = ({ isOwner }) => {
	return (
		<div className={styles.container}>
			<div>
				<p className={styles.heading}>
					{isOwner ? 'Explore Influencers' : 'Similar Brands'}
				</p>
			</div>
			<div className={styles.cardsContainer}>
				{influencers.map((influencer) => {
					return isOwner ? (
						<InfluencerCard influencer={influencer} />
					) : (
							<BrandCard brand={influencer} />
						);
				})}
			</div>
		</div>
	);
};

export default RightMenu;
