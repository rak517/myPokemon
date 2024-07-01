import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PokeList from './components/PokeList'
import PokeDetails from './components/PokeDetails'
import SignUp from './components/SignUp'
import Login from './components/Login'
import MyPokedex from './components/MyPokedex'



import './App.css'

function App() {

  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes >
          <Route path='/' element={<PokeList />} />
          <Route path='/pokemon/:id' element={<PokeDetails />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mypokedex' element={<MyPokedex />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
