// To load global CSS files, create a file called pages/_app.js with the following content:
// Finally, import the CSS file inside the pages/_app.js file you've created earlier on:
// `pages/_app.js`
import '../styles/globals.css';
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
// This App component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages, for example.

// ALWAYS Restart the Development Server