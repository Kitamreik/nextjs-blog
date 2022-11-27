// API Routes let you create an API endpoint inside a Next.js app. 
// Docs: https://nextjs.org/docs/api-routes/introduction
// API Routes with REST: https://github.com/vercel/next.js/tree/canary/examples/api-routes-rest

// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
    res.status(200).json({ text: 'Hello' });

    const email = req.body.email;
    // Then save email to your database, etc...
}

// API Routes Details
/*
1. Do Not Fetch an API Route from getStaticProps or getStaticPaths
You should not fetch an API Route from getStaticProps or getStaticPaths. Instead, write your server-side code directly in getStaticProps or getStaticPaths (or call a helper function).

Here’s why: getStaticProps and getStaticPaths run only on the server-side and will never run on the client-side. Moreover, these functions will not be included in the JS bundle for the browser. That means you can write code such as direct database queries without sending them to browsers. Read the Writing Server-Side code documentation to learn more. (https://nextjs.org/docs/basic-features/data-fetching/get-static-props#write-server-side-code-directly)

2. A Good Use Case: Handling Form Input
A good use case for API Routes is handling form input. For example, you can create a form on your page and have it send a POST request to your API Route. You can then write code to directly save it to your database. The API Route code will not be part of your client bundle, so you can safely write server-side code.

ex:

export default function handler(req, res) {
  const email = req.body.email;
  // Then save email to your database, etc...
}
*/

