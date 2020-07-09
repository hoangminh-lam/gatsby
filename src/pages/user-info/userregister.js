import React, { useEffect, useRef } from 'react'
import { navigate } from 'gatsby'

const endpoint = 'http://localhost:1337/user-infos'

export default () => {
  const jwtRef = useRef();
  const nameRef = useRef();
  const positionRef = useRef();
  const explainRef = useRef();
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
    const user = window.sessionStorage.getItem('user')
    const userID = JSON.parse(user)
    const author = userID.id
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
    navigate('/');
    // window.location.reload();
    // const newUserInfo = [...userInfos, res];
    // setuserInfos(newUserInfo);
  }

  return (
    <div className="form-wrapper">
        <h1 className="c-mv">ユーザー情報登録</h1>
        <div className="userInput">
            <p>
            <span>名前</span>
            <input type="text" name="user_name" placeholder="名前" ref={nameRef} />
            </p>
            <p>
            <span>画像</span>
            <input onChange={e => handleChange(e)} type="file" name="user_img" src=""  />
            </p>
            <p>
            <span>ポジション</span>
            <input type="text" name="position" placeholder="Position" ref={positionRef} />
            </p>
            <p>
            <span>自己紹介</span>
            <textarea placeholder="自己紹介" name="user_explain" ref={explainRef} />
            </p>
            <p className="button-like" onClick={() => createUserInfo()}>登録</p>
        </div>
    </div>
  );
}