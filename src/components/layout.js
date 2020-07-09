/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, navigate } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  useEffect(() => {
    const jwt = window.sessionStorage.getItem('jwt');
    if (!jwt) {
      navigate('/login');
    }
  }, [])

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
        <footer>  
          © {new Date().getFullYear()}, Built with
                  {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a> and {" "}
          <a href="http://strapi.io">Strapi</a> {" "}
           by ramukun
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
