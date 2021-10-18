const API_URL = ' https://digital.icdindia.com/graphql'

async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { 'Content-Type': 'application/json' , 'User-Agent': '*' , 'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGlnaXRhbC5pY2RpbmRpYS5jb20iLCJpYXQiOjE2MzQwNDExOTYsIm5iZiI6MTYzNDA0MTE5NiwiZXhwIjozMzE3MDA0MTE5NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.7UDiUivpkYmbc5Oc8opxBVsR9t2Wq7QsIYTU7HFdmvg'};



  // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  //   headers[
  //     'Authorization'
  //   ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  // }

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  // error handling work
  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log('error details', query, variables);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

async function fetchCommentnAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { 'Content-Type': 'application/json' , 'User-Agent': '*'};



  // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  //   headers[
  //     'Authorization'
  //   ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  // }

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  // error handling work
  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log('error details', query, variables);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `fragment SeoFragment on PostTypeSEO{
      breadcrumbs{
        text
        url
      }
      title
      metaDesc
      metaRobotsNoindex
        metaRobotsNofollow
      opengraphAuthor
      opengraphDescription
      schema {
        raw
      }
      opengraphImage{
        sourceUrl
      }
      opengraphSiteName
      opengraphPublishedTime
      opengraphModifiedTime
    }
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            seo {
              ...SeoFragment
            }
            excerpt
            slug
            date
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

export async function comment(value, value2 , value3 , value4) {
  const data = await fetchCommentnAPI(
    `
    mutation CREATE_COMMENT {
      createComment(input: {commentOn: ${value2}, content: "${value}", author: "${value3}" , authorEmail: "${value4}"}) {
        success
        comment {
          id
          content
          author {
            node {
              name
            }
          }
        }
      }
    }
    `)

  return data
}


export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment SeoFragment on PostTypeSEO{
      breadcrumbs{
        text
        url
      }
      title
      metaDesc
      metaRobotsNoindex
        metaRobotsNofollow
      opengraphAuthor
      opengraphDescription
      schema {
        raw
      }
      opengraphImage{
        sourceUrl
      }
      twitterImage {
        sourceUrl
      }
      opengraphSiteName
      opengraphPublishedTime
      opengraphModifiedTime
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    fragment CommentFields on Comment {
      approved
      content
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        id
        content
        likes {
          likes
        }
        postId
        seo {
          ...SeoFragment
        }
        comments {
          nodes {
            ...CommentFields
            replies {
              nodes {
                ...CommentFields
                replies {
                  nodes {
                    ...CommentFields
                  }
                }
                replies {
                  nodes {
                    ...CommentFields
                  }
                }
                replies {
                  nodes {
                    ...CommentFields
                    replies {
                      nodes {
                        ...CommentFields
                      }
                    }
                    replies {
                      nodes {
                        ...CommentFields
                      }
                    }
                    replies {
                      nodes {
                        ...CommentFields
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              postId
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )


  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}


export async function getAllProjectsForHome(preview) {
  const data = await fetchAPI(
    `
    query Allprojects {
      projects {
        edges {
          node {
            id
            projectId
            slug
            title
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )
  return data?.projects
}


export async function getAllProjectsWithSlug() {
  const data = await fetchAPI(
    `
    {
      projects(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.projects;
}



export async function getProject(slug) {
  const data = await fetchAPI(
    `
    fragment ProjectFields on Project {
      title
      slug
      date
    }
    fragment SeoFragment on PostTypeSEO {
      breadcrumbs {
        text
        url
      }
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
      opengraphAuthor
      opengraphDescription
      schema {
        raw
      }
      opengraphImage {
        sourceUrl
      }
      opengraphSiteName
      opengraphPublishedTime
      opengraphModifiedTime
    }
    query ProjectBySlug($id: ID!, $idType: ProjectIdType!) {
      project(id: $id, idType: $idType) {
        ...ProjectFields
        seo {
          ...SeoFragment
        }
        id
        projectId
        slug
        title
        likes {
          likes
        }
        content
        clients {
          edges {
            node {
              name
            }
          }
        }
        leadComponent {
          leadComponent {
            sourceUrl
          }
        }
        leadVideo {
          leadVideo
          video {
            sourceUrl
          }
        }
        projectComponent {
          description
          details
        }
        shortDescription {
          shortDesc
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: 'URI'
      }
    }
  );
  return data;
}


export async function  getHighlightedProject(){
  const data = await fetchAPI(
    `
    query highlightedProject {
      projects(where: {highlighted: true, orderby: {field: MENU_ORDER, order: ASC}}) {
        edges {
          node {
            id
            title
            slug
            content(format: RENDERED)
            date
            clients {
              edges {
                node {
                  name
                }
              }
            }
            projectTypes {
              edges {
                node {
                  name
                }
              }
            }
            projectSubTypes {
              edges {
                node {
                  name
                }
              }
            }
            leadComponent {
              leadComponent {
                sourceUrl
              }
            }
            highlightedImage {
              highlightedThumbnail {
                sourceUrl
              }
              highlightedThumbnailMobile {
                sourceUrl
              }
              video {
                mediaItemUrl
              }
              videoForMobile {
                sourceUrl
              }
            }
          }
        }
      }
    }    
    `,
  )
  return data?.projects;
}


export async function getLogo(){
  const data = await fetchAPI(
      `{
        siteLogo {
          sourceUrl
          altText
        }
      }
      `,
    )
    return data.siteLogo;
}

export async function getMenus(){
  const data = await fetchAPI(
      `{
        menus {
          edges {
            node {
              name
            }
          }
        }
      }
      `,
    )
    return data?.menus;
}


export async function getClients(){
  const data = await fetchAPI(
    `
    {
      clients(first: 10000) {
        edges {
          node {
            name
            projects {
              edges {
                node {
                  title
                }
              }
            }
          }
        }
      }
    }
    `
  )
  return data?.clients
}
  

export async function getIndustries(){
  const data = await fetchAPI(
    `
    {
      industries(first: 1000){
        nodes {
          name
          projects{
           edges {
             node {
               title
             }
           }
          }
        }
      }
    }
    
    `
  )
  return data?.industries
}


export async function getProjectTypes(){
  const data = await fetchAPI(
    `
    {
      projectTypes {
        nodes {
          name
          projects {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    }
    
    `
  )
  return data?.projectTypes
}

export async function updateTokken() {
  const data = await fetchAPI(
    `
    mutation MyMutation {
      login(input: {password: "icd123", username: "admin"}) {
        authToken
        refreshToken
      }
    }
    `
    )

  return data
}

export async function updateProjectLikes(id, likes ) {
  const data = await fetchAPI(
    `
    mutation updateLikes {
      updateProject(input: {id: "${id}", likes: ${likes}}) {
        project {
          title
          likes {
            likes
          }
        }
      }
    }
    `)

  return data
}

export async function updatePostLikes(id, likes , authToken) {
  const data = await fetchAPI(
    `
    mutation updateLikes {
      updatePost(input: {id: "${id}", likes: ${likes} }) {
        post {
          title
          likes {
            likes
          }
        }
      }
    }`
    )

  return data
}




export async function getPages() {
  const data = await fetchAPI(
    `
    {
      pages(where: {title: "services"}) {
        edges {
          node {
            servicesSection2Text {
              text
            }
            content
          }
        }
      }
    }
    `
  )
  return data
}

export async function getHome() {
  const data = await fetchAPI(
    `
    {
      pages(where: {title: "home"}) {
        edges {
          node {
            seo {
              ...SeoFragment
            }
            title
            content
            homePage {
              featuredText {
                ... on Text {
                  content
                }
              }
              featuredCards {
                ... on Card {
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                  content
                  cardCategories {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                  designOptions {
                    darkBg
                    yellowBg
                  }
                }
              }
            }
          }
        }
      }
    }
    
    fragment SeoFragment on PostTypeSEO {
      fullHead
    }
    
    `
  )
  return data
}


export async function getService() {
  const data = await fetchAPI(
    `
    {
      servicesCategories {
        edges {
          node {
            name
            services {
              edges {
                node {
                  title
                  content
                }
              }
            }
          }
        }
      }
    }
    `
  )
  return data?.servicesCategories
}


export async function Contact(firstName , lastName , enquiryAbout , email , number , linkedin , designation , company , message , companyWebsite) {
  const data = await fetchAPI(
    `
    mutation CREATE_CONTACT {
      contactForm(
        input: {firstName: "${firstName}", lastName: "${lastName}", enquiryAbout: "${enquiryAbout}", email: "${email}", number: "${number}", linkedin: "${linkedin}", designation: "${designation}", company: "${company}", message: "${message}", companyWebsite: "${companyWebsite}"}
      ) {
        data
        success
      }
    }
    `)

  return data
}

export async function getServicePage() {
  const data = await fetchAPI(
    `
    {
      pages(where: {title: "careers"}) {
        edges {
          node {
            title
            content
          }
        }
      }
    }
    `
  )
  return data
}

export async function getOurteamPage() {
  const data = await fetchAPI(
    `
    {
      pages(where: {title: "our-team"}) {
        edges {
          node {
            title
            content
          }
        }
      }
    }
    `
  )
  return data
}

export async function getJobs() {
  const data = await fetchAPI(
    `
    {
      jobs {
        edges {
          node {
            title
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
    `
  )
  return data?.jobs
}


export async function getTeam() {
  const data = await fetchAPI(
    `
    {
      teams {
        edges {
          node {
            title
            content
            profileImage {
              profileImage {
                sourceUrl
              }
              profileImageOnHover {
                sourceUrl
              }
            }
          }
        }
      }
    }
    `
  )
  return data?.teams
}


export async function careerContact(enquiryAbout , firstName, lastName, qualification ,experience, number, city ,email , Website) {
  const data = await fetchAPI(
    `
    mutation CREATE_CONTACT {
      careerContactForm(
        input: {enquiryAbout: "${enquiryAbout}", firstName: "${firstName}", lastName: "${lastName}", educationalQualification: "${qualification}", experience: "${experience}", number: "${number}", city: "${city}", email: "${email}", website: "${Website}"}
      ) {
        data
        success
      }
    }
    `)

  return data
}



export async function getAllNewsletterWithSlug() {
  const data = await fetchAPI(
    `
    {
      newsletters(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.newsletters;
}


export async function getArticle(slug) {
  const data = await fetchAPI(
  `  
  query NewsletterBySlug($id: ID!, $idType: NewsletterIdType! ) {
    newsletter(id: $id, idType: $idType) {
      slug
      title
      content
      seo {
        ...SeoFragment
      }
      yellowEnvelope {
        newsletterArticles {
          ... on Article {
            title
            content
          }
        }
      }
    }
  }
  fragment SeoFragment on PostTypeSEO {
    breadcrumbs {
      text
      url
    }
    title
    metaDesc
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphAuthor
    opengraphDescription
    schema {
      raw
    }
    opengraphSiteName
    opengraphPublishedTime
    opengraphModifiedTime
  }
  `,
    {
      variables: {
        id: slug,
        idType: 'URI'
      }
    }
  );
  return data;
}

export async function getAllArticleForHome(preview) {
  const data = await fetchAPI(
    `
     {
      newsletters {
        edges {
          node {
            slug
            title
            content
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )
  return data?.newsletters
}

export async function getAllPosts() {
  const data = await fetchAPI(
    `
    {
      categories {
        edges {
          node {
            name
            posts {
              edges {
                node {
                  slug
                  title
                  excerpt
                }
              }
            }
          }
        }
      }
    }
  `,
  )
  return data?.categories
}

export async function getFooter() {
  const data = await fetchAPI(
    `
    {
      generalSettingSettings {
        behance
        call
        email
        facebook
        instagram
        job
        linkedin
        twitter
        vimeo
      }
    }
    `,
  )
  return data?.generalSettingSettings
}