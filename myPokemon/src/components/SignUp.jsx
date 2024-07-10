import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';
import axios from "axios";
import update from 'immutability-helper';

const SignUp = ({ users, setUsers }) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const handleSubmit2 = (e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const data = {
      name: userName,
      email: email,
      id: userId,
      password: password,
    };
    //회원가입에 실패하였습니다. 에러: Request failed with status code 500
    axios.post('http://localhost:8080/member/register', data)
      .then((response) => {
        alert('회원가입이 완료되었습니다.');
        nav('/login');
        setUsers(prevUsers =>
          update(prevUsers || [], {
            $push: [response.data]
          })
        );
      })
      .catch((error) => {
        console.error(error);
        alert('회원가입에 실패하였습니다. 에러: ' + error.message);
      });
  }

  return (
    <div className="SignUp">
      <form className="signUp_form" onSubmit={handleSubmit2}>
        <label>
          이름 : <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Name" />
        </label>
        <label>
          아이디 : <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Id" />
        </label>
        <label>
          비밀번호 : <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </label>
        <label>
          비밀번호 확인 : <input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} placeholder="Password" />
        </label>
        <label>
          이메일 : <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </label>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignUp;
