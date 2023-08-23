import React from 'react'
import SignUp from './SignUp/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import ToDo from './Todo/ToDo';
function App() {
  return (
    <div>

<Router>
     
     <Routes>
     <Route exact path="/" element={< SignUp/>} />
     <Route path='login' element={<Login/>}/>
     <Route path='todo' element={<ToDo/>}/>

    
     </Routes>
     </Router>


    </div>
  )
}

export default App