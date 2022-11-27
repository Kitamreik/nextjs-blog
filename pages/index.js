// https://nextjs.org/learn/basics/create-nextjs-app
// https://nextjs.org/docs/routing/introduction

// Index.js = HOME
// DO NOT TOUCH

/*
Link Component
When linking between pages on websites, you use the <a> HTML tag.

In Next.js, you can use the Link Component next/link to link between pages in your application. <Link> allows you to do client-side navigation and accepts props that give you better control over the navigation behavior.
*/ 


// follow back: https://nextjs.org/learn/basics/dynamic-routes/polishing-index-page

import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
// Now, we need to add an import for getSortedPostsData and call it inside getStaticProps in pages/index.js.
// Link: https://nextjs.org/learn/basics/data-fetching/implement-getstaticprops
// Open pages/index.js in your editor and add the following code above the exported Home component:
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

// By returning allPostsData inside the props object in getStaticProps, the blog posts will be passed to the Home component as a prop. Now you can access the blog posts like so:
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Hello world! This is Kit! I am a Jr. Full Stack Web Dev. You can contact me at kitdamreik@gmail.com.]</p>
        {/* <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p> */}
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
        </ul>
      </section>
      {/* Keep the existing code here */}
    {/* MATCHES GITHUB REPO ABOVE */}

    {/* original code: 
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            
            <li className={utilStyles.listItem} key={id}>
            {title}
            <br />
            {id}
            <br />
            {date}
            </li>
          ))}
        </ul>
      </section>
    
      */}
    </Layout>
  )
}

{/* Keep the existing code here */}
{/* MATCHES GITHUB REPO below */}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// Why this code was commented out: https://nextjs.org/learn/basics/assets-metadata-css/polishing-layout
/*
    <div className={styles.container}>
      <Head> is a React Component that is built into Next.js. It allows you to modify the <head> of a page. Link: https://nextjs.org/docs/api-reference/next/head 
    
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={styles.title}>
          Learn <a href="https://nextjs.org">Next.js!</a> 
          Note: You create routes as files under pages and use the built-in Link component. If you need to link to an external page outside the Next.js app, just use an <a> tag without Link. 
          Read <Link href="/posts/first-post">this page!</Link>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    */