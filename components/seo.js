import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';


const Seo = ({ seo, uri }) => {
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

	const { asPath } = useRouter();


	const currentLocation = process.browser ? window.location.origin : null;
	const opengraphUrl = "https://icdindia.com" + asPath;
	const image = opengraphImage?.sourceUrl;
	const twitterImag = twitterImage?.sourceUrl

	return (
		<NextSeo
			title={title}
			description={opengraphDescription || metaDesc}
			canonical={opengraphUrl}
			// robots={metaRobotsNoindex || metaRobotsNofollow}
			// googlebot={metaRobotsNofollow || metaRobotsNoindex }
			openGraph={{
				type: 'website',
				locale: 'en_US',
				url: opengraphUrl,
				title: opengraphTitle,
				description: opengraphDescription,
				images: [
					{
						url: image,
						width: 1125,
						height: 843
					}
				],

				/* eslint-disable */
				site_name: opengraphSiteName
				/* eslint-enable */
			}}
			twitter={{
				site: opengraphUrl,
				cardType: 'summary_large_image',
				image: twitterImag,
				title: { title },
				description: { metaDesc }
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
			sourceUrl: ''
		},
		opengraphUrl: '',
		opengraphSiteName: ''
	}
};

export default Seo;
