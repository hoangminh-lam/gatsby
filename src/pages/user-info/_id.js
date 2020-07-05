import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../components/layout'
import Reactmarkdown from 'react-markdown'

const UserInfoTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiUserInfo.user_name}</h1>
    <Img fixed={data.strapiUserInfo.user_img.childImageSharp.fixed}/>
    <Reactmarkdown source={data.strapiUserInfo.user_explain} />
    <p><Link to="/">Top Page</Link></p>
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
    }
  }
`