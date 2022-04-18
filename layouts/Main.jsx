import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'
import classNames from 'classnames'
import { Container, Nav } from 'react-bootstrap'

const MenuLink = ({ href, children }) => {
  const router = useRouter();
  const active = (router.asPath === href);
  return (
    <Link href={href}>
      <a className={classNames('nav-link', active ? 'active' : null)}>{children}</a>
    </Link>);
}

const MainLayout = ({ children }) => (
  <>
    <Head>
      <title>RSS reader</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className='position-absolute vw-100 vh-100 d-flex flex-column py-3'>
      <Nav className="p-2 mb-1 bg-dark text-white">
        <div className="container">
          <header className="d-flex flex-wrap justify-content-center">
            <Link href="/">
              <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-blue text-decoration-none">
                <span className="fs-4">RSS reader</span>
              </a>
            </Link>

            <ul className="nav nav-pills">
              <li className="nav-item">
                <MenuLink href="/">Home</MenuLink>
              </li>
              <li className="nav-item">
                <MenuLink href="/settings">Settings</MenuLink>
              </li>
            </ul>
          </header>
        </div>
      </Nav>

      {children}
    </div>
  </>
)

export default MainLayout
