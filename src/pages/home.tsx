/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/jsx-no-comment-textnodes */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>World Travelers</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Este es el home</h1>

      <main className={styles.main}>
        <a href="/api/auth/login">Login</a>
        {/* auth 0 don't recommend to use here the Link component because we're
        pointing to an API route here and not a client page, see more: https://auth0.com/docs/quickstart/webapp/nextjs/01-login#add-login-to-your-application */}
        <br />
        <a href="/api/auth/logout">Logout</a>
        <br />
        <Link href="/user/profile">Profile</Link>
        <br />
      </main>
    </div>
  );
};

export default Home;
