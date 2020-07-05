import React, {useEffect, useState, useRef} from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../components/layout'

const endpoint = 'https://lam-strapi-gatsby.herokuapp.com/user-infos'

const UserInfoPage = ({ data }) => {
  const nameRef = useRef();
  const positionRef = useRef();
  const explainRef = useRef();
  const jwtRef = useRef();
  let img;

  useEffect(() => {
    const jwt = window.sessionStorage.getItem('jwt');
    if (!jwt) {
      navigate('/login')
    }
    jwtRef.current = jwt

  }, []);

  const handleChange = (event) => {
    img = event.target.files[0]
  }

  const createUserInfo = async () => {
    const user_name = nameRef.current.value;
    const position = positionRef.current.value;
    const user_explain = explainRef.current.value;
    const author = window.sessionStorage.getItem('user').id
    // console.log(user_img);

    const formData = new FormData();
    const data = {
      user_name,
      position,
      user_explain,
      author,
    }
    formData.append('files.user_img', img, 'images.jpg');
    formData.append('data', JSON.stringify(data));

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtRef.current}`,
      },
      body: formData,
    }).then(r => r.json());

    window.location.reload();
    // const newUserInfo = [...userInfos, res];
    // setuserInfos(newUserInfo);
  }

  return (
    <Layout>
      <h1>ユーザー情報</h1>
      <ul>
        {data.allStrapiUserInfo.edges.map(document => (
          <li key={document.node.id}>
            <h2>
              <Link to={`/user-info/${document.node.id}`}>{document.node.user_name}</Link>
            </h2>
            <Img fixed={document.node.user_img.childImageSharp.fixed}/>
            <p>{document.node.explain}</p>
          </li>
        ))}
      </ul>
      <div className="userInput">
        <p>
          <span>名前：</span>
          <input type="text" name="user_name" placeholder="名前" ref={nameRef} />
        </p>
        <p>
          <span>画像：</span>
        <input onChange={e => handleChange(e)} type="file" name="user_img" src=""  />
        </p>
        <p>
          <span>ポジション：</span>
        <input type="text" name="position" placeholder="Position" ref={positionRef} />
        </p>
        <p>
          <span>自己紹介：</span>
        <textarea placeholder="自己紹介" name="user_explain" ref={explainRef} />
        </p>
        <button onClick={() => createUserInfo()}>登録</button>
      </div>
      <p><Link to="/">Top Page</Link></p>
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
                    fixed(width: 200) {
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