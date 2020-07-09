import React, {useEffect, useState, useRef} from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../components/layout'
import '../../layout.scss'

const endpoint = 'https://lam-strapi-gatsby.herokuapp.com/projects'

const ProjectPage = ({ data }) => {
  const jwtRef = useRef();
  const [likes, setLikes] = useState(false)
  const [posts, setPosts] = useState(0)

  useEffect(() => {
    const jwt = window.sessionStorage.getItem('jwt');
    if (!jwt) {
      navigate('/login')
      return
    }
    jwtRef.current = jwt

  }, []);
  useEffect(() => {
    // get data from GitHub api
    async function fetchData() {
      await fetch('https://lam-strapi-gatsby.herokuapp.com/projects')
        .then(response => response.json()) // parse JSON from request
        .then(resultData => {
          setPosts(resultData)
        }) // set data for the number of stars
    }
    fetchData();
  }, [])

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
    return lists
  }

  const updateLike = async (postID, like) => {
    const postIDs = postID.split('_')[1]
    const likeList = listID(like)
    const listIDs = [...likeList, userID]
    // console.log(listIDs)
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
      <h1 className="c-mv">プロジェクト</h1>
      <div className="project-page wrapper">
        <ul>
          {data.allStrapiProject.edges.map(document => (
            <li key={document.node.id}>
              <Link to={`/project/${document.node.id}`}>
                <h2>
                  {document.node.name}
                </h2>
                <div className="c-img"><Img fixed={document.node.logo.childImageSharp.fixed}/></div>
              </Link>
              {/* <p>{document.node.explain}</p> */}
              <p className="button-like" onClick={() => updateLike(document.node.id, document.node.likes)}>気になる</p>
            </li>
          ))}
        </ul>
      </div>
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
                fixed(width: 300) {
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