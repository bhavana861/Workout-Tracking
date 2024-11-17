import { Route, Routes } from 'react-router-dom'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Create from './components/Create'
import Update from './components/Update'
import Home from './components/Home'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element ={<Home/>} />
      <Route path='/create' element ={<Create/>} />
      <Route path='/update/:id' element={<Update />} />
      </Routes>
    </>
  )
}

export default App
