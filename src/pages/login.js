import React, { useRef } from 'react'
import { navigate } from 'gatsby'

const endpoint = 'https://lam-strapi-gatsby.herokuapp.com/auth/local';

export default () => {
  const loginRef = useRef();
  const pwdRef = useRef();

  const login = async () => {
    const identifier = loginRef.current.value;
    const password = pwdRef.current.value;

    try {
      const {jwt, user} = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      }).then(res => {
        if (res.status !== 200) {
          throw new Error('ログイン出来ない');
        }
        return res.json()
      });

      window.sessionStorage.setItem('jwt', jwt);
      window.sessionStorage.setItem('user', JSON.stringify(user));
      user.userinfo === null ? navigate('user-info/userregister') : navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="allCont">
        <div className="register">
          <input type="text" placeholder="ユーザーネーム" ref={loginRef} />
          <input type="password" placeholder="パスワード" ref={pwdRef} />
          <button onClick={() => login()}>ログイン</button>
        </div>
      </div>
  );
};

// export default registerPage