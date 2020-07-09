import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Reactmarkdown from 'react-markdown'

const IndexPage = ({ data }) => (
  <Layout>
    <h1 className="c-mv">STRAPI x GATSBY</h1>
    <div className="wrapper">
      <div className="project">
        <h2 className="c-ttl">プロジェクト</h2>
        <ul>
          {data.allStrapiProject.edges.map(document => (
            <li key={document.node.id}>
              <Link to={`/project/${document.node.id}`}>
                <div className="c-img"><Img fixed={document.node.logo.childImageSharp.fixed}/></div>
                <Reactmarkdown source={document.node.name} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="userinfo">
        <h2 className="c-ttl">ユーザー情報</h2>
        <ul>
          {data.allStrapiUserInfo.edges.map(document => (
            <li key={document.node.id}>
              <Link to={`/user-info/${document.node.id}`}>
                <div className="c-img"><Img fixed={document.node.user_img.childImageSharp.fixed}/></div>
                <Reactmarkdown source={document.node.user_name} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiProject {
      edges {
        node {
          id
          name
          logo {
            childImageSharp {
              fixed(width: 300) {
                ...GatsbyImageSharpFixed
              }
          }
          }
        }
      }
    }
    allStrapiUserInfo {
      edges {
        node {
          id
          user_img {
            childImageSharp {
              fixed(width: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          user_name
        }
      }
    }
  }
`