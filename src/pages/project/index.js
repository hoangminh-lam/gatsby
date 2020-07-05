import React, {useEffect, useState, useRef} from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../components/layout'
import '../../layout.scss'

const endpoint = 'https://lam-strapi-gatsby.herokuapp.com/projects'

const ProjectPage = ({ data }) => {
  const jwtRef = useRef();
  const [likes, setLikes] = useState(false)

  useEffect(() => {
    const jwt = window.sessionStorage.getItem('jwt');
    if (!jwt) {
      navigate('/login')
      return
    }
    jwtRef.current = jwt

  }, []);

  let user, userInfo, userID
  if (typeof window !== 'undefined') {
    user = window.sessionStorage.getItem('user')
    userInfo = JSON.parse(user)
    userID = userInfo.userinfo.id
    console.log(userID);
  }

  const listID = (list) => {
    const lists = []
    list.map(l => lists.push(l.id));
    console.log(list)
    return lists
  }

  const updateLike = async (postID, like) => {
    const postIDs = postID.split('_')[1]
    const likeList = listID(like)
    const listIDs = [...likeList, userID]
    console.log(listIDs)
    const res = await fetch(`${endpoint}/${postIDs}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwtRef.current}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: listIDs,
      })
    }).then(r => r.json());
  }

  return (
    <Layout>
      <h1>Project情報</h1>
      <ul>
        {data.allStrapiProject.edges.map(document => (
          <li key={document.node.id}>
            <h2>
              <Link to={`/project/${document.node.id}`}>{document.node.name}</Link>
            </h2>
            <Img fixed={document.node.logo.childImageSharp.fixed}/>
            {/* <p>{document.node.explain}</p> */}
            <p className="button-like" onClick={() => updateLike(document.node.id, document.node.likes)}>気になる</p>
          </li>
        ))}
      </ul>
      <p><Link to="/">Top Page</Link></p>
    </Layout>
  )
}
export default ProjectPage

export const projectPageQuery = graphql`  
  query ProjectQuery {
    allStrapiProject {
      edges {
        node {
          id
          name
          logo {
            childImageSharp {
                fixed(width: 200) {
                  ...GatsbyImageSharpFixed
                }
            }
          }
          likes {
            id
            user_name
          }
        }
      }
    }
  }
`