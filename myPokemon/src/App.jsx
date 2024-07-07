import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PokeList from './components/PokeList'
import PokeDetailPage from './components/PokeDetailPage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import MyPokedex from './components/MyPokedex'
import './App.css'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [users, setUsers] = useState([]);              //사용자 정보
  const [isLogin, setIsLogin] = useState(false);       //로그인 여부
  const [myPokedex, setMyPokedex] = useState([]);      //나만의 포켓몬 리스트
  const [search, setSearch] = useState('');            //검색어

  const addMyPokedex = (pokemon) => {
    setMyPokedex([...myPokedex, pokemon]);
    toast.success(`${pokemon.koreanName}을(를) 추가했습니다.`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  }

  const removeMyPokedex = (id) => {
    const removedMyPokedex = myPokedex.find((pokemon) => pokemon.id === pokemon.id);
    setMyPokedex((prevMyPokedex) =>
      prevMyPokedex.filter((pokemon) => pokemon.id !== id));
    toast.success(`${removedMyPokedex.koreanName}을(를) 삭제했습니다.`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });


  }

  return (
    <Router>
      <div className='App'>
        <ToastContainer />
        <Header search={search} setSearch={setSearch} />
        <Routes >
          <Route path='/' element={<PokeList addMyPokedex={addMyPokedex} search={search} />} />
          <Route path='/pokemon/:id' element={<PokeDetailPage />} />
          <Route path='/login' element={<Login setIsLogin={setIsLogin} users={users} />} />
          <Route path='/signup' element={<SignUp setUsers={setUsers} />} />
          <Route path='/mypokedex' element={
            isLogin ? <MyPokedex myPokedex={myPokedex} removeMyPokedex={removeMyPokedex} /> : <Login setIsLogin={setIsLogin} users={users} />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
