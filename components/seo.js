import {NextSeo} from 'next-seo';
import PropTypes from 'prop-types';


const Seo = ( {seo, uri} ) => {
	const {
		title,
		metaDesc,
		metaRobotsNoindex,
		metaRobotsNofollow,
		opengraphDescription,
		opengraphTitle,
		opengraphImage,
		opengraphSiteName,
		twitterImage
	} = seo;

	const currentLocation = process.browser ? window.location.origin : null;
	const opengraphUrl = ( process.env.NEXT_PUBLIC_NEXTJS_SITE_URL ? process.env.NEXT_PUBLIC_NEXTJS_SITE_URL : currentLocation ) + uri;

	return (
		console.log(seo),
		<NextSeo
			title={title}
			description={opengraphDescription || metaDesc}
			canonical={opengraphUrl}
			robots={metaRobotsNoindex || metaRobotsNofollow}
			googlebot={metaRobotsNofollow || metaRobotsNoindex }
			openGraph={{
				type: 'website',
				locale: 'en_US',
				url: opengraphUrl,
				title: opengraphTitle,
				description: opengraphDescription,
				images: [
					{
						url: twitterImage?.sourceUrl,
						width: 1280,
						height: 720
					}
				],

				/* eslint-disable */
				site_name: opengraphSiteName
				/* eslint-enable */
			}}
			twitter={{
				handle: '@Codeytek',
				site: '@Codeytek',
				cardType: 'summary_large_image',
				image : twitterImage?.sourceUrl
			}}
		/>
	);
};

Seo.propTypes = {
	seo: PropTypes.object
};

Seo.defaultProps = {
	seo: {
		canonical: '',
		title: '',
		metaDesc: '',
		metaRobotsNoindex: '',
		metaRobotsNofollow: '',
		opengraphDescription: '',
		opengraphTitle: '',
		opengraphImage: {
			sourceUrl: ''
		},
		twitterImage: {
			sourceUrl:''
		},
		opengraphUrl: '',
		opengraphSiteName: ''
	}
};

export default Seo;
