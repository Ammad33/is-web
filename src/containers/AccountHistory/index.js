import React, { useContext, useEffect } from 'react';
import { RootContext } from './../../context/RootContext';
import BrandAccountHistory from './BrandAccountHistory';
import InfluencerAccountHistory from './InfluencerAccountHistory';

const branddata = [
	{
		id: 1,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		billed: '$1555',
		totalCampaignSale: '$5,1235',
		averageCartValue: '$65',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		averageCartQuality: '2',
		totalInfluencerPayout: '$9891',
	},
	{
		id: 2,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		billed: '$1555',
		totalCampaignSale: '$5,1235',
		averageCartValue: '$65',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		averageCartQuality: '2',
		totalInfluencerPayout: '$9891',
	},
	{
		id: 3,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		billed: '$1555',
		totalCampaignSale: '$5,1235',
		averageCartValue: '$65',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		averageCartQuality: '2',
		totalInfluencerPayout: '$9891',
	},
	{
		id: 4,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		billed: '$1555',
		totalCampaignSale: '$5,1235',
		averageCartValue: '$65',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		averageCartQuality: '2',
		totalInfluencerPayout: '$9891',
	},
	{
		id: 5,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		billed: '$1555',
		totalCampaignSale: '$5,1235',
		averageCartValue: '$65',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		averageCartQuality: '2',
		totalInfluencerPayout: '$9891',
	},
	{
		id: 6,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		billed: '$1555',
		totalCampaignSale: '$5,1235',
		averageCartValue: '$65',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		averageCartQuality: '2',
		totalInfluencerPayout: '$9891',
	},
];

const influencerData = [
	{
		id: 1,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		billed: '$1,909.40',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Care / of',
		earnings: '$1555',
		totalCampaignSale: '$5,1235',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		totalInfluencerPayout: '$9891',
	},
	{
		id: 2,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		billed: '$1,909.40',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		earnings: '$1555',
		totalCampaignSale: '$5,1235',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		totalInfluencerPayout: '$9891',
	},
	{
		id: 3,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		billed: '$1,909.40',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		earnings: '$1555',
		totalCampaignSale: '$5,1235',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		totalInfluencerPayout: '$9891',
	},
	{
		id: 4,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		billed: '$1,909.40',
		billed: '$1,909.40',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		earnings: '$1555',
		totalCampaignSale: '$5,1235',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		totalInfluencerPayout: '$9891',
	},
	{
		id: 5,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		billed: '$1,909.40',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		earnings: '$1555',
		totalCampaignSale: '$5,1235',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		totalInfluencerPayout: '$9891',
	},
	{
		id: 6,
		campaign: 'CampaignName',
		date: '11/1/2020 - 12/1/2020',
		billed: '$1,909.40',
		img:
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		member: 'Sam Ozkural',
		earnings: '$1555',
		totalCampaignSale: '$5,1235',
		compensation: 'Revenue Share 5%',
		campaignDuration: '11/1/2020 - 12/1/2020',
		totalInfluencerPayout: '$9891',
	},
];

const fomoPromoInvoiceData = [
	{
		id: 1,
		invoiceIssued: '10/30/2020',
		autoPayment: '11/1/2020',
		billed: '$1,909.40',
		activeUsers: '8',
		activeCampaigns: '15',
		gmv: '55000',
		activeUserFee: '19.95',
		activeCampaignFee: '44.95',
		gmvFee: '1.881',
	},
	{
		id: 2,
		invoiceIssued: '10/30/2020',
		autoPayment: '11/1/2020',
		billed: '$1,909.40',
		activeUsers: '1',
		activeCampaigns: '1',
		gmv: '1',
		activeUserFee: '19.95',
		activeCampaignFee: '44.95',
		gmvFee: '1.881',
	},
	{
		id: 3,
		invoiceIssued: '10/30/2020',
		autoPayment: '11/1/2020',
		billed: '$1,909.40',
		activeUsers: '8',
		activeCampaigns: '15',
		gmv: '55000',
		activeUserFee: '19.95',
		activeCampaignFee: '44.95',
		gmvFee: '1.881',
	},
	{
		id: 4,
		invoiceIssued: '10/30/2020',
		autoPayment: '11/1/2020',
		billed: '$1,909.40',
		activeUsers: '8',
		activeCampaigns: '15',
		gmv: '55000',
		activeUserFee: '19.95',
		activeCampaignFee: '44.95',
		gmvFee: '1.881',
	},
	{
		id: 5,
		invoiceIssued: '10/30/2020',
		autoPayment: '11/1/2020',
		billed: '$1,909.40',
		activeUsers: '8',
		activeCampaigns: '15',
		gmv: '55000',
		activeUserFee: '19.95',
		activeCampaignFee: '44.95',
		gmvFee: '1.881',
	},
];
const AccountHistory = () => {
	const { brandType, setActiveRoute } = useContext(RootContext);
	useEffect(() => {
		setActiveRoute('AccountHistory');
	});
	return (
		<>
			<div>
				{brandType === 'Brand' ? (
					<BrandAccountHistory
						data={branddata}
						fomoPromoInvoiceData={fomoPromoInvoiceData}
					/>
				) : (
						<InfluencerAccountHistory
							data={influencerData}
							fomoPromoInvoiceData={fomoPromoInvoiceData}
						/>
					)}
			</div>
		</>
	);
};

export default AccountHistory;
