import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { useRouter } from 'next/router'
import classNames from 'classnames'
import { Nav } from 'react-bootstrap'

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

    <Nav className="p-2 mb-1 bg-dark text-white">
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-blue text-decoration-none">
            <span className="fs-4">RSS reader</span>
          </a>

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

    <div className="container">
      {children}
    </div>
  </>
)

export default MainLayout
