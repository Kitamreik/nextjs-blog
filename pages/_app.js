// ALWAYS Restart the Development Server whenever you make changes to code here

// To load global CSS files, create a file called pages/_app.js with the following content:
// Finally, import the CSS file inside the pages/_app.js file you've created earlier on:

// JS Scripts: https://nextjs.org/docs/basic-features/script

//2024 Headstarter Pantry App: Using Material UI
import * as React from 'react'; //the code imports the entire React library and assigns it to the React namespace.
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme';

// To load a third-party script for all routes, import next/script and include the script directly in pages/_app.js:
import '../styles/globals.css';
import Script from 'next/script';
export default function App({ Component, pageProps }) {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
        }
      }, []);
    return (
        <>
        <Script src="../public/js/script.js"
        onLoad={() => {
            console.log('Script has loaded')
          }} 
        />
        <ThemeProvider theme={theme}>
             {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
        </>
    )
}
// This App component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages, for example.
