import './App.css'
import {Route,Routes} from "react-router-dom"
import SignupForm from './pages/SignupForm'
import LoginForm from './pages/LoginForm'
import DriverDashboard from './pages/DriverDashboard'
import Home from './pages/Home'
import RiderDashboard from './pages/RiderDashboard'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/SignupForm' element={<SignupForm/>}></Route>
      <Route path='/LoginForm' element={<LoginForm/>}></Route>
      <Route path='/DriverDashboard' element={<DriverDashboard/>}></Route>
      <Route path='/RiderDashboard' element={<RiderDashboard/>}></Route>
    </Routes>
      
    </>
  )
}

export default App
