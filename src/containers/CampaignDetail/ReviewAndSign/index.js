import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ReviewAndSign.module.scss';
import CreateMicrosite from '../CreateMicrosite';
import { API, graphqlOperation } from 'aws-amplify';
import { RootContext } from '../../../context/RootContext';
import {
	MoreVertical,
	Download,
	Copy,
	Mail,
	ChevronRight,
	XCircle,
	AlertCircle,
	Plus,
} from 'react-feather';
import Tooltip from '@material-ui/core/Tooltip';

const ReviewAndSign = ({
	name,
	campaignId,
	createMircositeFlag,
	handleCreateMicrosite,
	template,
	getCampaign,
	brand,
	influencer
}) => {
	const history = useHistory();
	const { brandId } = useContext(RootContext);
	const [internalState, setInternalState] = useState('');
	const [errorMessage, setErrorMessage] = useState('');



	const handleReviewAndSign = () => {
		signContract();

	}

	const signContract = async () => {
		try {
			await API.graphql(
				graphqlOperation(
					`mutation InfluencerSignContract {
						influencerSignContractDev(
							campaignId: "${campaignId}", 
							influencerId: "${brandId}")
					}`
				)
			)
			getInternalState();
			history.push(`/campaignDetail/createmicrosite/${campaignId}`);

		}
		catch (err) {
			console.log("Error in signing contract ", err)
			let message = '';

			if (err.errors && err.errors.length > 0)
				err.errors.forEach(m => {
					message = message + m.message;
				});

			setErrorMessage(message);
			return null;
		}
	}

	const getInternalState = async () => {
		try {
			const state = await API.graphql({
				query: `{
						influencerCampaign(influencerId: "${brandId}", id: "${campaignId}") {
							id
							internalState
						}
					}`
			});
			setInternalState(state.data.influencerCampaign.internalState);
		}
		catch (e) {
			console.log("error", e)
		}
	}



	return (
		<>
			{/* {createMircositeFlag && internalState && internalState != '' ? (
				<CreateMicrosite
					name={name}
					handleCreateMicrosite={handleCreateMicrosite}
					internalState={internalState}
					template={template}
					getCampaign={getCampaign}
					campaignId={campaignId}
					influencer={influencer}
					brand={brand}
				/>
			) : (
					internalState != 'MICROSITE_APPROVAL_REQUESTED' && */}
			<div className={styles.mainContainer}>
				<div className={styles.crumsContainer}>
					<span onClick={() => history.push('/campaigns')}>Campaigns</span>
					<ChevronRight />
					<Tooltip title={name}>
						<span>{name.length > 15 ? (`${name.substring(0, 15)}...`) : name}</span>
					</Tooltip>
					<ChevronRight />
					<span>Review and Sign</span>
				</div>
				<div className={styles.contentContainer}>
					<div className={styles.micrositeContainer}>
						<h2>
							Influencer Collaboration Agreement <span> DRAFT </span>
						</h2>
						<h5>
							AGREEMENT
								</h5>
						<p>
							This Influencer Collaboration Agreement ("Agreement") is entered into this  ​ Month Day Year
							(“Effective Date”) by and between the Advertiser  Company Name and the Influencer  @handle
							. The Advertiser and the Influencer agree:
								</p>
						<p> <span > 1.Appointment. </span>
									The Advertiser would like the Influencer’s assistance in promoting / offering /
									selling the Advertiser’s products via their social media accounts. The Advertiser hereby appoints the
									Influencer as its representative on a non-exclusive, non-employee basis to endorse and promote its
								services to the target audience. </p>

						<p> <span > 2.Term​. </span>
								This Agreement shall have a campaign start datetime, end datetime, and duration stated
									in Campaign Summary​ ​ and shall automatically expire on the end datetime stated in Campaign
								Summary, unless both parties agree to an extension and an Extension Agreement is fully executed. </p>

						<p> <span > 3.Deliverables. </span>
								​ The Influencer will deliver the agreed number of posts and on the agreed social
									media platforms stated in Campaign Summary​ ​ on behalf of the Advertiser according to the post
									frequency delivery schedule stated in Campaign Summary. The Services shall conform to the
									specifications and instructions of the Advertiser as outlined in detail in Campaign Summary, abide by
									the rules of the relevant social media platforms, and are subject to the Advertiser's acceptance and
									approval collected in the fomopromo application. It is understood and agreed, the Advertiser can at any
									time stop the campaign before the scheduled end datetime and will provide a reason to the Influencer
									collected and distributed to both parties in the fomopromo application. Any additional revisions and/or
									amendments will be requested in a new campaign. </p>

						<p> <span > 4.Cancellation. </span>
									​ Either party may terminate this agreement upon ten (10) days prior written notice
									if the other party breaches this agreement and does not cure such breach within such time period. In
									addition to any right or remedy that may be available to the Advertiser under this agreement or
									applicable law, In addition, in the event that the Influencer has breached this agreement, the Advertiser
									may (i) immediately suspend, limit or terminate the Influencer’s access to any Advertiser campaign
									and/or (ii) instruct the Influencer to cease all promotional activities including the fomopromo-hosted
									microsite or make clarifying statements/modifications/edits, and the Influencer shall immediately comply.
									Either party may terminate this agreement at any time without cause upon ten (10) days prior written
									notice to the other party collected and distributed to both parties in the fomopromo application. </p>


						<p> <span > 5.Collateral Details. </span>
								The Advertiser shall provide the product samples and creative resources
								including brand tag and hashtag stated in Campaign Summary​ ​ to enable the Influencer to perform the
								marketing services. If the Influencer has obtained employees or agents (the "Influencer Personnel"),
								the Influencer shall be solely responsible for all costs associated with the Influencer Personnel. </p>


						<p> <span > 6.Items to Avoid in Influencer Posts and Microsites. </span>
								The Influencer agrees to promote
								Advertiser in good taste and to avoid inappropriate language and/or any content promoting bigotry,
								racism or discrimination based on race, gender, religion, nationality, disability, sexual orientation or
								age. </p>



						<p> <span > 7.Approval and Content Origination: </span>
								The Influencer understands that all promotions and
								products they promote as part of this agreement are controlled by the Advertiser. The Influencerassumes all
								responsibility for verifying that the campaign materials used meet the Advertiser’s approval. </p>



						<p> <span > 8.Confidentiality​ : </span>
								The Influencer agrees that he/she will not use, disclose, communicate, copy
								or permit the use or disclosure of any Advertiser’s confidential information to any third party in any
								manner whatsoever except to the existing employees of the Advertiser or as otherwise directed by the
								Advertiser in the course of the Influencer's performance of services under this Agreement, and
								thereafter only with the written permission of the Advertiser. </p>


						<p> <span > 9.Content Ownership:</span>
								The Advertiser retains the right to reuse all content, photos and
								materials created throughout this Agreement for future campaigns, advertisements, social media
								posts and brand website promotion. </p>


						<p> <span > 10.Compensation. </span>
								​In full consideration of the Influencer’s performance to deliver social media
								posts and drive shopping cart checkouts, his / her obligations and the rights granted herein, the
								Influencer shall be paid the amount detailed for the Compensation Types and Amounts detailed in the
								Campaign Summary. The Influencer will otherwise perform the services at his/her own expense and
								use his/her own resources and equipment. The Influencer acknowledges that the agreed upon
								Compensation Type(s) and Amount(s) for each Deliverable as detailed in Campaign Summary
								represents the Influencer’s total compensation with respect to this agreement and the Advertiser shall
								have no other obligation for any other compensation to or expenses or costs incurred by the Influencer
								in connection with the performance of its obligations under this agreement. </p>


						<p> <span > 11.Material disclosures and compliance with FTC Guidelines​. </span>
								When publishing
								posts/statuses about the Advertiser’s products or services, the Influencer must clearly disclose his/her
								“material connection” with the Advertiser, including the fact that the Influencer was given any
								consideration, was provided with certain experiences or is being paid for a particular service. It is the
								Influencer’s responsibility to ensure that all FTC Guidelines are met and abided by. </p>


						<p> <span > 12.Payment Terms and Invoice Settlement​ . </span>
								At the calendar month end, Advertiser and
								Influencer shall be provided both an Invoice and supporting Return on Campaign business intelligence
								reports as available in the fomopromo mobile and web application to support direct Invoice Settlement
								between both parties of the agreement. Subject to satisfactory execution of the agreed to deliverables,
								Advertiser hereby agrees to compensate Influencer in accordance with the payment terms and invoice
								as detailed. </p>


						<p> <span > 13.Force Majeure​ . </span>
								If either party is unable to perform any of its obligations by reason of fire or
								other casualty, strike, act or order of public authority, act of God, or other cause beyond the control of
								such party, then such party shall be excused from such performance during the pendency of such
								cause. </p>


						<p> <span > 14.Independent Contractor. </span>
								The Influencer is retained as an independent contractor of the
								Advertiser. The Influencer acknowledges and agrees that (i) The Influencer is solely responsible for the
								manner and form by which the Influencer performs under this Agreement, and (ii) The Influencer is a
								self-employed individual, who performs services similar to the services detailed in Campaign Summary
								for various entities and individuals other than the Advertiser. The Influencer is responsible for the
								withholding and payment of all taxes and other assessments arising out of the Influencer's performance
								of services, and neither the Influencer nor any of the Influencer's employees or independent clients shall
								be entitled to participate in any employee benefit plans of the Advertiser. </p>

						<p> <span > 15.Choice of Law. </span>
								This Agreement shall be construed and enforced pursuant to the laws and
								decisions of California / United States. </p>

						<p> <span > 16. </span>
								This Agreement has been executed by the Parties on the Effective Date. </p>

						<p> Signature Section Here. </p>

						<h2>Campaign Summary​</h2>

						<div>
							<p> Campaign_ID</p>
							<p> Campaign Name</p>
							<p> Start DateTime </p>
							<p> End DateTime</p>
							<p> Campaign Duration</p>
							<p>Promotional Discount </p>
							<p>Collection</p>
							<p>Deliverable</p>
							<p>Deliverable Deadline</p>
							<p>Social Platform</p>
							<p>Post Type</p>
							<p>Content Type</p>
							<p>Frames Required</p>
							<p>Brand Tag</p>
							<p>Hashtag</p>
							<p>Post Frequency</p>
							<p>Post Total</p>
							{/* <p></p>
									<p></p>
									<p></p>
									<p></p>
									<p></p>
									<p></p>
									<p></p>
									<p></p> */}

						</div>
					</div>
					<div className={styles.actionsContainer}>
						<button className={styles.approveBtn} onClick={() => handleReviewAndSign()}> Sign</button>
					</div>
					{errorMessage !== '' && <div className={styles.errorSignContract}>{errorMessage}</div>}
				</div>
			</div>
			{/* )
			} */}

		</>
	);
};

export default ReviewAndSign;
