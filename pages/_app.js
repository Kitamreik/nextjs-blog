// ALWAYS Restart the Development Server whenever you make changes to code here

// To load global CSS files, create a file called pages/_app.js with the following content:
// Finally, import the CSS file inside the pages/_app.js file you've created earlier on:

// JS Scripts: https://nextjs.org/docs/basic-features/script

// To load a third-party script for all routes, import next/script and include the script directly in pages/_app.js:
import '../styles/globals.css';
import Script from 'next/script';
export default function App({ Component, pageProps }) {
    return (
        <>
        <Script src="../public/js/script.js"
        onLoad={() => {
            console.log('Script has loaded')
          }} 
        />
        <Component {...pageProps} />;
        </>
    )
}
// This App component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages, for example.
