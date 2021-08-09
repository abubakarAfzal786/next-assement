import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link' // import Link from next  not from react

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zippia Challange</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My Next.js Test ! </h1>
        <p>
          everything is made according to the document i recieved.
          you can check the working app on
          <Link href="/test/jobs">
            <a className="link"> JOBS </a>
          </Link> page
        </p>
        <h4>Completed Tasks</h4>
        <ul>
          <li>/test/jobs/ page created</li>
          <li>Data fetched from <code>https://www.zippia.com/api/jobs/</code></li>
          <li>Display List the first 10 jobs with cards</li>
          <li>Form to search jobs by company name</li>
          <li>Button to show all jobs within last week</li>
          <li>Added bootstrap to make application responsive and look beautiful</li>
          <li>Done with SSR</li>
          <li>Comments about the js part of the app.</li>
          <li>Done before 4 hours</li>
          <li>Deployed over
            <Link href="/">
              <a className="link"> Vercel </a>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  )
}