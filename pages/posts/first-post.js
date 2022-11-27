// creating a new page: https://nextjs.org/learn/basics/navigate-between-pages/pages-in-nextjs

// Note: when you implement getStaticPaths, you can remove this page completely from the directory

/*
// Using the Script Component
// next/script is an extension of the HTML <script> element and optimizes when additional scripts are fetched and executed.

// import Script from 'next/script';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';

export default function FirstPost() {
    return (
      <Layout> 
         add an import for the Layout component, and make it the outermost component 
         <Head>
         <title>First Post</title>
       </Head>
       - strategy controls when the third-party script should load. A value of lazyOnload tells Next.js to load this particular script lazily during browser idle time
       - onLoad is used to run any JavaScript code immediately after the script has finished loading. In this example, we log a message to the console that mentions that the script has loaded correctly 
       {/* Link: https://nextjs.org/learn/basics/assets-metadata-css/third-party-javascript 
       <Script
       src="https://connect.facebook.net/en_US/sdk.js"
       strategy="lazyOnload"
       onLoad={() =>
         console.log(`script loaded correctly, window.FB has been populated`)
       }
     /> 
       <h1>First Post</h1>
       <h2>
         <Link href="/">← Back to home</Link>
       </h2>
     </Layout>
   //   end
   );
 }

// The component can have any name, but you must export it as a default export.

// Now, make sure that the development server is running and visit http://localhost:3000/posts/first-post. 
// Simply create a JS file under the pages directory, and the path to the file becomes the URL path.
*/ 

