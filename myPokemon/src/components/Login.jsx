import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";

const Login = ({ setIsLogin, users }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const user = users.find((user) => user.userId === userId && user.password === password);
  //   if (user) {
  //     setIsLogin(true);
  //     nav('/');
  //   } else {
  //     alert('아이디 또는 비밀번호가 일치하지 않습니다.');
  //     setUserId('');
  //     setPassword('');
  //   }

  // }
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: userId,
      password: password,
    };


    axios.post('http://localhost:8080/member/login', data)
      .then((response) => {
        if (response.data === 'success') {

          alert('로그인이 완료되었습니다.');
          nav('/');
          setIsLogin(true);
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
          setUserId('');
          setPassword('');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('로그인에 실패하였습니다. 에러: ' + error.message);
      });
  }

  return (
    <div className="Login">
      <form className="login_form" onSubmit={handleSubmit}>
        <label>
          아이디 : <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <label>
          비밀번호 : <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">로그인</button>


      </form>

    </div>
  )
}

export default Login;