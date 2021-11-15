const API_URL = 'https://digital.icdindia.com/graphql'

async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { 'Content-Type': 'application/json' , 'User-Agent': '*' , 'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGlnaXRhbC5pY2RpbmRpYS5jb20iLCJpYXQiOjE2MzUyNDg2MDgsIm5iZiI6MTYzNTI0ODYwOCwiZXhwIjozMzE3MTI0ODYwOCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.-Bqv76lgWORwFfc11ft6iY7umCbDndL42N9grpDtmEc'};



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

export async function getPostPage() {
  const data = await fetchAPI(
    `
    {
      pages(where: {title: "posts"}) {
        edges {
          node {
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            seo {
              ...SeoFragment
            }
          }
        }
      }
    }
    
    fragment SeoFragment on PostTypeSEO {
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
    }    
    `
  )
  return data
}

export async function getPostCategories() {
  const data = await fetchAPI(
    `
    {
      categories(where: {orderby: TERM_ID}){
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }   
    `
  )
  return data
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
      date
      author {
        node {
          name
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        relatedPost {
          relatedProject {
            ... on Project {
              id
              slug
              projectComponent {
                heading
              }
              clients {
                edges {
                  node {
                    name
                  }
                }
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
          relatedBlog {
            ... on Post {
              id
              slug
              title
              excerpt
              featuredImage {
                node {
                  sourceUrl
                }
              }
              content
              likes {
                likes
              }
              date
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
          }
        }
        id
        content
        leadComponentPost {
          leadComponent {
            sourceUrl
          }
        }
        postAuthor {
          author {
            ... on Team {
              title
              profileImage {
                profileImage {
                  sourceUrl
                }
              }
            }
          }
        }
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
            featuredImage {
              node {
                sourceUrl
              }
            }
            clients {
              edges {
                node {
                  name
                }
              }
            }
            projectComponent {
              heading
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
        projectComponent {
          heading
        }
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
        awards {
          awardsReceived
        }
        leadComponent {
          leadComponent {
            sourceUrl
          }
          leadComponentMobile {
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
        menuItems {
          nodes {
            label
            path
          }
        }
      }
      `,
    )
    return data?.menuItems;
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
                  slug
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
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
      industries(first: 1000, where: {orderby: TERM_ORDER}) {
        nodes {
          name
          slug
          id
          projects {
            edges {
              node {
                id
                slug
                title
                projectComponent {
                  heading
                }
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                clients {
                  edges {
                    node {
                      name
                    }
                  }
                }
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
      projectTypes(where: {parent: 0 , orderby: TERM_ID }) {
        nodes {
          name
          slug
          projects {
            edges {
              node {
                id
                slug
                title
                projectComponent{
                  heading
                }
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                projectSubTypes {
                  edges {
                    node {
                      name
                    }
                  }
                }
                clients {
                  edges {
                    node {
                      name
                    }
                  }
                }
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
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
            seo {
              ...SeoFragment
            }
          }
        }
      }
    }

    fragment SeoFragment on PostTypeSEO {
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
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
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
            seo {
              ...SeoFragment
            }
            featuredtext {
              content
            }
            homePage {
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
            projects {
              highlightedProjects {
                ... on Project {
                  id
                  title
                  slug
                  clients {
                    edges {
                      node {
                        name
                      }
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
        }
      }
    }
    
    fragment SeoFragment on PostTypeSEO {
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
    }
    
    
    
    `
  )
  return data
}

export async function getProjectPage() {
  const data = await fetchAPI(
    `
    {
      pages(where: {title: "projects"}) {
        edges {
          node {
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
            seo {
              ...SeoFragment
            }
          }
        }
      }
    }
    
    fragment SeoFragment on PostTypeSEO {
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
    }    
    `
  )
  return data
}

export async function getClientsPage() {
  const data = await fetchAPI(
    `
    {
      pages(where: {title: "clients"}) {
        edges {
          node {
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            seo {
              title
              metaDesc
            }
          }
        }
      }
    }
    `
  )
  return data
}


export async function getService() {
  const data = await fetchAPI(
    `
    {
      servicesCategories(where: {slug: "brand-expression"}) {
        edges {
          node {
            services(where: {orderby: {field: MODIFIED, order: ASC}}) {
              edges {
                node {
                  title
                  content
                  featuredImage {
                    backgroundImg {
                      sourceUrl
                    }
                    gifAnimationImg {
                      sourceUrl
                    }
                  }
                  projectLink {
                    linkProject {
                      ... on Project {
                        slug
                      }
                    }
                  }
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


export async function getOtherService() {
  const data = await fetchAPI(
    `
    {
      servicesCategories(where: {slug: "brand-strategy"}) {
        edges {
          node {
            services(where: {orderby: {field: SLUG, order: ASC}}) {
              edges {
                node {
                  title
                  content
                  featuredImage {
                    backgroundImg {
                      sourceUrl
                    }
                    gifAnimationImg {
                      sourceUrl
                    }
                  }
                  projectLink {
                    linkProject {
                      ... on Project {
                        slug
                      }
                    }
                  }
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

export async function getCareerPage() {
  const data = await fetchAPI(
    `
    {
      pages(where: {title: "careers"}) {
        edges {
          node {
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
            seo {
              ...SeoFragment
            }
          }
        }
      }
    }

    fragment SeoFragment on PostTypeSEO {
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
    }  
    `
  )
  return data
}

export async function getOurteamPage() {
  const data = await fetchAPI(
    `
    {
      pages(where: {title: "icd"}) {
        edges {
          node {
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
            seo {
              ...SeoFragment
            }
          }
        }
      }
    }

    fragment SeoFragment on PostTypeSEO {
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
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
            id
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
      teams(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
        edges {
          node {
            title
            id
            content
            positions {
              edges {
                node {
                  name
                }
              }
            }
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

export async function getAllPostsByCategory() {
  const data = await fetchAPI(
    `
    {
      categories {
        edges {
          node {
            slug
          }
        }
      }
    }
  `,
  )
  return data?.categories
}

export async function getAllTags() {
  const data = await fetchAPI(
    `
    {
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
  `,
  )
  return data?.tags
}

export async function getAllPostsByCategorySlug(slug) {
  const data = await fetchAPI(
    `
    {
      categories(where: {slug: "${slug}"}) {
        edges {
          node {
            name
            slug
            posts(where: {orderby: {field: DATE, order: DESC}}) {
              edges {
                node {
                  id
                  slug
                  title
                  excerpt
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                  content
                  likes {
                    likes
                  }
                  date
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

export async function getAllPosts() {
  const data = await fetchAPI(
    `
    {
      posts(where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            id
            slug
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
            likes {
              likes
            }
            date
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
        }
      }
    }
  `,
  )
  return data?.posts
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


export async function getAllProjectsTypes() {
  const data = await fetchAPI(
    `
    {
      projectTypes(where: {parent: 0, orderby: TERM_ID }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.projectTypes;
}


export async function getAllProjectsSubTypes() {
  const data = await fetchAPI(
    `
    {
      projectTypes(where: {parent: 0 , orderby: TERM_ID }) {
        edges {
          node {
            slug
            children {
              edges {
                node {
                  slug
                }
              }
            }
          }
        }
      }
    }
  `);
  return data?.projectTypes;
}

export async function getProjectByTypes(slug) {
  const data = await fetchAPI(
    `
    {
      projectTypes(where: {slug: "${slug}", parent: 0 , orderby: TERM_ID }) {
        edges {
          node {
            children(where: {orderby: TERM_ORDER}) {
              edges {
                node {
                  slug
                  name
                  projects {
                    edges {
                      node {
                        id
                        slug
                        projectComponent {
                          heading
                        }
                        featuredImage {
                          node {
                            sourceUrl
                          }
                        }
                        projectSubTypes {
                          edges {
                            node {
                              name
                              slug
                            }
                          }
                        }
                        clients {
                          edges {
                            node {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            seo {
              opengraphDescription
            }
            name
            slug
            description
            projects {
              edges {
                node {
                  id
                  slug
                  projectComponent {
                    heading
                  }
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                  projectSubTypes {
                    edges {
                      node {
                        name
                        slug
                      }
                    }
                  }
                  clients {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }    
  `,
  );
  return data;
}

export async function getProjectSubTypes(slug , sub_slug) {
  const data = await fetchAPI(
    `
    {
      projectTypes(where: {slug: "${slug}" , parent: 0 ,orderby: TERM_ID }) {
        edges {
          node {
            slug
            children(where: {slug: "${sub_slug}"}) {
              edges {
                node {
                  projects {
                    edges {
                      node {
                        id
                        slug
                        projectComponent {
                          heading
                        }
                        featuredImage {
                          node {
                            sourceUrl
                          }
                        }
                        clients {
                          edges {
                            node {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
  `,
  );
  return data;
}


export async function getContactPage() {
  const data = await fetchAPI(
    `
    {
      pages(where: {title: "contact"}) {
        edges {
          node {
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
            seo {
              ...SeoFragment
            }
          }
        }
      }
    }
    
    fragment SeoFragment on PostTypeSEO {
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
    }    
    `
  )
  return data
}