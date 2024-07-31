// pages/about.js
import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export default function About() {
  return (
    <Container maxWidth="sm">
        <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <h1>About the Headstarter AI Fellowship Project</h1>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <Typography>
          Tools re: implementationTech Stack: NEXT.JS/REACT/FIREBASE/GCP/VERCEL/OPENAI, CI/CD
          </Typography>
          <br />
          <Typography>
            Premise of Application: This project is a pantry management application that allows users to keep track of pantry items by adding or removing items and updating their quantities. The project uses Next.js as the frontend framework, Material UI for the UI components, and Firebase as the backend service. 
          </Typography>
        </section>
        <span>
          <h2>Developer and Contact Info</h2>
          <ul className={utilStyles}>
            <li className={utilStyles}>
            Email: <a href="mailto:">kitdamreik@gmail.com</a>, subject: “GitHub Personal Project”
            </li>
            <li className={utilStyles}>
             <a href="https://kit-fenrir-amreik-portfolio.onrender.com/">Portfolio</a>
            </li>
            <li className={utilStyles}>
            <a href="https://www.linkedin.com/in/kit-amreik/">LinkedIn</a>
            </li>
          </ul>
        </span>
        <Link href="/" passHref>
          <Button variant="contained" color="primary">
            Go Back
          </Button>
            </Link>
        </Layout>
    </Container>
  );
}
