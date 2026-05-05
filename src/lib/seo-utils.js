const SITE_URL = "https://www.icdindia.com";
const SITE_NAME = "ICD India";

export function buildMetadata(seo = {}, fallback = {}) {
  const title = seo?.title || fallback.title;
  const description = seo?.metaDesc || fallback.description;
  const ogImage = seo?.opengraphImage?.sourceUrl || seo?.twitterImage?.sourceUrl || fallback.image;

  return {
    ...(title && { title }),
    ...(description && { description }),
    robots: {
      index: seo?.metaRobotsNoindex !== "noindex",
      follow: seo?.metaRobotsNofollow !== "nofollow",
    },
    openGraph: {
      siteName: SITE_NAME,
      ...(title && { title }),
      ...(description && { description: seo?.opengraphDescription || description }),
      ...(ogImage && { images: [{ url: ogImage }] }),
      ...(seo?.opengraphPublishedTime && { publishedTime: seo.opengraphPublishedTime }),
      ...(seo?.opengraphModifiedTime && { modifiedTime: seo.opengraphModifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      ...(title && { title }),
      ...(description && { description }),
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export function buildBreadcrumbSchema(breadcrumbs = []) {
  if (!breadcrumbs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.text,
      item: crumb.url?.startsWith("http") ? crumb.url : `${SITE_URL}${crumb.url}`,
    })),
  };
}

export function buildArticleSchema({ title, image, datePublished, author, authorImage }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    ...(image && { image: [image] }),
    ...(datePublished && { datePublished, dateModified: datePublished }),
    author: [{ "@type": "Person", name: author, ...(authorImage && { image: authorImage }) }],
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function buildOrganizationSchema(socialLinks = {}) {
  const sameAs = [
    socialLinks.facebook,
    socialLinks.twitter,
    socialLinks.linkedin,
    socialLinks.instagram,
    socialLinks.vimeo,
    socialLinks.behance,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "itu chaudhuri design",
    url: SITE_URL,
    ...(sameAs.length && { sameAs }),
    ...(socialLinks.email && {
      contactPoint: [{ "@type": "ContactPoint", email: socialLinks.email, contactType: "customer service" }],
    }),
    ...(socialLinks.call && { telephone: socialLinks.call }),
  };
}
