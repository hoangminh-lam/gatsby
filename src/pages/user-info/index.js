import React, {useEffect, useState, useRef} from 'react'
import { Link, graphql, navigate, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../components/layout'

const endpoint = 'https://lam-strapi-gatsby.herokuapp.com/user-infos'

const UserInfoPage = ({ data }) => {
  const jwtRef = useRef();
  let img;
  useEffect(() => {
    const jwt = window.sessionStorage.getItem('jwt');
    if (!jwt) {
      navigate('/login')
    }
    jwtRef.current = jwt

  }, []);

  return (
    <Layout>
      <h1 className="c-mv">ユーザー情報</h1>
      <div className="userinfo-page wrapper" id="main">
        <ul>
          {data.allStrapiUserInfo.edges.map(document => (
            <li key={document.node.id}>
              <Link to={`/user-info/${document.node.id}`}>
                <h2>
                  {document.node.user_name}
                </h2>
                <div className="c-img"><Img fixed={document.node.user_img.childImageSharp.fixed}/></div>
                <p>{document.node.explain}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="user-register">
          <Link to={`/user-info/userregister`}>情報登録</Link>
        </div>
      </div>
    </Layout>
  )
}

export default UserInfoPage

export const userInfoPageQuery = graphql`  
  query UserInfoQuery {
    allStrapiUserInfo {
        edges {
          node {
            id
            user_name
            user_img {
                childImageSharp {
                    fixed(width: 300) {
                      ...GatsbyImageSharpFixed
                    }
                }
            }
            user_explain
          }
        }
    }
  }
`