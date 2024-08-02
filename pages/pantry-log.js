import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';


export default function Pantry() {
    return (
    <Container>
        <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <h1>Pantry Log Page</h1>
        <section className={utilStyles.headingMd}>
          <Typography>
            content here...
          </Typography>
          <Link href="/search" passHref>
                <Button variant="contained" color="primary">
                  Search
                </Button>
            </Link>
        </section>
        </Layout>
    </Container>
  );
}

