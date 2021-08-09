import Head from "next/head"; // head component of next to put head tag in html
import 'bootstrap/dist/css/bootstrap.css' // import bootstrap css
import '../styles/globals.css' // import global styles
import Link from 'next/link' // import Link from next  not from react
import { useState } from "react" // import hook from react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // fontawesome icon container
import { faBars } from '@fortawesome/free-solid-svg-icons' // fontawesome icon
import BarsSvg from "../assets/menu_white_24dp.svg"
function MyApp({ Component, pageProps }) { // my app component
  const [open, setOpen] = useState(false) // use State hook
  const toggler = () => { // function to toggle navbar
    setOpen(!open)
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />      </Head>
      <nav className="navbar navbar-expand-lg my-bg-primary text-white">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand" href="#">Zippia Jobs Available</a>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation" onClick={toggler}>
            <i className="fa fa-bars text-white"></i>

          </button>
          <div className={open ? "show collapse navbar-collapse" : "collapse navbar-collapse"} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link active" aria-current="page" >Home</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/test/jobs">
                  <a className="nav-link">Jobs</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
