const EXTERNAL_DATA_URL = 'https://icdindia.com';
import { getAllProjects, getAllPostsSlug } from '../lib/api'

function generateSiteMap({allProjects , allposts}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://icdindia.com</loc>
     </url>
      <url>
       <loc>https://icdindia.com/projects</loc>
     </url>
          <url>
       <loc>https://icdindia.com/posts</loc>
     </url>
          <url>
       <loc>https://icdindia.com/clients</loc>
     </url>
          <url>
       <loc>https://icdindia.com/services</loc>
     </url>
          <url>
       <loc>https://icdindia.com/</loc>
     </url>
     ${allProjects?.edges
       .map(({ node }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/projects/${node?.slug}`}</loc>
       </url>
     `;
       })
       .join('')}

      ${allposts?.edges
       .map(( node ) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/posts/${node?.node?.slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const allProjects = await getAllProjects()
   const allposts = await getAllPostsSlug()
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap({allProjects , allposts});
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();


  return {
    props: {
      allProjects,
      allposts
    },
  };
}

export default generateSiteMap;