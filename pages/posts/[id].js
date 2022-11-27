// Pages that begin with [ and end with ] are dynamic routes in Next.js.
// https://nextjs.org/learn/basics/dynamic-routes/polishing-post-page

// Add this import at the top of the file
import utilStyles from '../../styles/utils.module.css';

// make sure this is imported
import Layout from '../../components/layout';

// Add this import
import Head from 'next/head';

// Add this import
import Date from '../../components/date';

// Now, let's update the Post component to use postData. In pages/posts/[id].js replace the exported Post component:
// export default function Post() {
//   return <Layout>...</Layout>;
// }
// with the following init code:
// export default function Post({ postData }) {
//     return (
//       <Layout>
//         {postData.title}
//         <br />
//         {postData.id}
//         <br />
//         {postData.date}
//       </Layout>
//     );
// }
// to this via update the Post component in pages/posts/[id].js to render contentHtml using dangerouslySetInnerHTML:
export default function Post({ postData }) {
    return (
      <Layout>
        {/* Add this <Head> tag */}
        <Head>
            <title>{postData.title}</title>
        </Head>
        
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
}

/*
paths contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js. Learn more in the paths key documentation: https://nextjs.org/docs/basic-features/data-fetching/overview#the-paths-key-required
*/ 

// We’ll export an async function called getStaticPaths from this page. In this function, we need to return a list of possible values for id.
export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
}

// init code
// export async function getStaticProps({ params }) {
//     // Fetch necessary data for the blog post using params.id
//     const postData = getPostData(params.id);
//     return {
//       props: {
//         postData,
//       },
//     };
// }
// The post page is now using the getPostData function in getStaticProps to get the post data and return it as props.

// we need to update getStaticProps in pages/posts/[id].js to use await when calling getPostData
export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id);
  
    return {
      props: {
        postData,
      },
    };
}

// Finally, we'll import the getAllPostIds function and use it inside getStaticPaths. above the exported Post component:
// Replace:
// import { getAllPostIds } from '../../lib/posts';
// with:
import { getAllPostIds, getPostData } from '../../lib/posts';