import React, { useRef } from 'react'
import { navigate } from 'gatsby'

const endpoint = 'https://lam-strapi-gatsby.herokuapp.com/auth/local/register';

export default () => {
  const loginRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();

  const register = async () => {
    const username = loginRef.current.value;
    const email = emailRef.current.value;
    const password = pwdRef.current.value;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }).then(res => res.json());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="allCont">
        <div className="register">
          <input type="text" placeholder="ユーザーネーム" ref={loginRef} />
          <input type="text" placeholder="メール" ref={emailRef} />
          <input type="password" placeholder="パスワード" ref={pwdRef} />
          <button onClick={() => register()}>登録</button>
        </div>
      </div>
  );
};

// export default registerPage