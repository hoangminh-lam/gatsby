import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../components/layout' 
import Reactmarkdown from 'react-markdown'

const ProjectTemplate = ({ data }) => (
  <Layout>
    <h1 className="c-mv">プロジェクト</h1>
    <div className="project-page wrapper">
      <Img fixed={data.strapiProject.logo.childImageSharp.fixed}/>
      <div class="block">
        <h2 className="block-h2">{data.strapiProject.name}</h2>
        <div className="block-text">
          <Reactmarkdown  source={data.strapiProject.explain} />
        </div>
        <h3 className="c-ttl2">メンバー</h3>
        <ul className="project-list">
          {data.strapiProject.member.map(p => (
            <li key={p.id}>
              <Link to={`/user-info/User-info_${p.id}`}>
                {p.user_name}
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="c-ttl2">気になる</h3>
        <ul className="project-list">
          {data.strapiProject.likes.map(p => (
            <li key={p.id}>
              <Link to={`/user-info/User-info_${p.id}`}>
                {p.user_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
      member {
        id
        user_name
      }
      likes {
        id
        user_name
      }
    }
  }
`