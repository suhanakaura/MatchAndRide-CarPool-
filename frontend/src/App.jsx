import './App.css'
import {Route,Routes, useNavigate} from "react-router-dom"
import SignupForm from './pages/SignupForm'
import LoginForm from './pages/LoginForm'
import DriverDashboard from './pages/DriverDashboard'
import Home from './pages/Home'
import RiderDashboard from './pages/RiderDashboard'

function App() {
  const isAuthenticated = localStorage.getItem('user') !== null;
  const Navigate = useNavigate();
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/SignupForm' element={<SignupForm/>}></Route>
      <Route path='/LoginForm' element={<LoginForm/>}></Route>
      <Route path='/DriverDashboard' element={isAuthenticated?<DriverDashboard/>:<LoginForm/>}></Route>
      <Route path='/RiderDashboard' element={isAuthenticated?<RiderDashboard/>:<LoginForm/>}></Route>
    </Routes>
      
    </>
  )
}

export default App
