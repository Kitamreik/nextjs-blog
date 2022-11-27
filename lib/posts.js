// read this to understand how to capture the data from the .md files
// https://nextjs.org/learn/basics/data-fetching/blog-data

// info
/*
fs is a Node.js module that let's you read files from the file system.
path is a Node.js module that let's you manipulate file paths.
matter is a library that let's you parse the metadata in each markdown file.
In Next.js, the lib folder does not have an assigned name like the pages folder, so you can name it anything. It's usually convention to use lib or utils.
*/ 

// import statements always at the top
// primary
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
//secondary
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// Fetch External API or Query Database - getStaticProps
// pulled from github: https://github.com/vercel/next-learn/blob/master/basics/demo/lib/posts.js
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// add the following getAllPostIds function at the bottom. It will return the list of file names (excluding .md) in the posts directory:
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// Important: We added the async keyword to getPostData because we need to use await for remark. async/await allow you to fetch data asynchronously. --> go to pages/posts/[id].js to use await when calling getPostData

// update the getPostData() function in the same file as follows to use remark
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

// --------END--------
// Important re: getAllPostIds function: The returned list is not just an array of strings — it must be an array of objects that look like the comment above. Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.

// Implement getStaticProps - We need to fetch necessary data to render the post with the given id. add the following getPostData function at the bottom. It will return the post data based on id:

// OG code (getStaticProps):
/*
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
*/ 


// Data Fetching: https://nextjs.org/learn/basics/data-fetching/request-time
// if doing server-side rendering: you need to export getServerSideProps instead of getStaticProps from your page

// Starter code:
/*
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
*/ 

// Notes re: getStaticProps:
/*
In development (npm run dev or yarn dev), getStaticProps runs on every request.
In production, getStaticProps runs at build time. However, this behavior can be enhanced using the fallback key returned by getStaticPaths
getStaticProps can only be exported from a page. 
*/ 

// Link: https://swr.vercel.app/docs/getting-started
// import useSWR from 'swr'; // not used here
/*
function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
*/ 

// init code - pulling from MD files- getStaticProps
/*
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
const postsDirectory = path.join(process.cwd(), 'posts');
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

*/ 
