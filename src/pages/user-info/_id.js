import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../components/layout'
import Reactmarkdown from 'react-markdown'

const UserInfoTemplate = ({ data }) => (
  <Layout>
    <h1 className="c-mv">ユーザー情報</h1>
    <div className="userinfo-page wrapper">
      <Img fixed={data.strapiUserInfo.user_img.childImageSharp.fixed}/>
      <div className="block">
        <h2>{data.strapiUserInfo.user_name}</h2>
        <Reactmarkdown source={data.strapiUserInfo.user_explain} />
        <h3 className="c-ttl2">参加中プロジェクト</h3>
        <ul className="project-list">
          {data.strapiUserInfo.projects.map(p => (
            <li key={p.id}>
              <Link to={`/project/Project_${p.id}`}>
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="c-ttl2">気になるプロジェクト</h3>
        <ul className="project-list">
          {data.strapiUserInfo.liked.map(p => (
            <li key={p.id}>
              <Link to={`/project/Project_${p.id}`}>
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Layout>
)

export default UserInfoTemplate

export const query = graphql`
  query userInfoTemplate($id: String!) {
    strapiUserInfo(id: {eq: $id}) {
      user_name
      user_explain
      user_img {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      projects {
        id
        name
      }
      liked {
        id
        name
      }
    }
  }
`