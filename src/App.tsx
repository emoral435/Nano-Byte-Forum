import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login/Login"
import Register from "./components/Register/Register"


function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<div>this is the homepage</div>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
