import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../components/layout' 

const ProjectTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiProject.name}</h1>
    <Img fixed={data.strapiProject.logo.childImageSharp.fixed}/>
    <p>{data.strapiProject.explain}</p>
    <p><Link to="/">Top Page</Link></p>
  </Layout>
)

export default ProjectTemplate

export const query = graphql`
  query projectTemplate($id: String!) {
    strapiProject(id: {eq: $id}) {
      name
      logo {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      explain
    }
  }
`