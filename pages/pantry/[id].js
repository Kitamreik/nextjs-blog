import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PantryPost() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Post {id}</h1>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
    </div>
  );
}