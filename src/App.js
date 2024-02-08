
import './App.css';
import { useState } from "react";

import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout'

import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewPost from './components/NewPost';
import Home from './components/Home';
import AllPosts from './components/AllPosts';
import Profile from './components/Profile';


function App() {



  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("isLoggedIn"))|| false);

  return (
    <div className='App'>
      <Router>
        <Header isLoggedIn={isLoggedIn}/>
 
        <Routes >
        <Route path='/' exact element={<Home/>}/>
          <Route path='/register' element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path='/logout' element={<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/allposts" element={<AllPosts/>}/>
          <Route path="/newpost" element={<NewPost isLoggedIn={isLoggedIn}/>}/>
          <Route path="/profile" element={<Profile/>}/>
      
      
      </Routes>
    
      
      </Router>
      </div>
   
  );
}

export default App;
