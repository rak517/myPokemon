import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PokeList from './components/PokeList'
import PokeDetailPage from './components/PokeDetailPage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import MyPokedex from './components/MyPokedex'
import './App.css'
import { useState } from 'react'

function App() {
  const [users, setUsers] = useState([]);              //사용자 정보
  const [isLogin, setIsLogin] = useState(false);       //로그인 여부
  const [myPokedex, setMyPokedex] = useState([]);      //나만의 포켓몬 리스트

  const addMyPokedex = (pokemon) => {
    setMyPokedex([...myPokedex, pokemon]);
    window.alert('포켓몬을 추가했습니다.');
  }

  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes >
          <Route path='/' element={<PokeList />} />
          <Route path='/pokemon/:id' element={<PokeDetailPage />} />
          <Route path='/login' element={<Login setIsLogin={setIsLogin} users={users} />} />
          <Route path='/signup' element={<SignUp setUsers={setUsers} />} />
          <Route path='/mypokedex' element={<MyPokedex myPokedex={myPokedex} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
