
import './App.css';
import { useState } from "react";

import Header from './components/Header';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewPost from './components/NewPost';
import Home from './components/Home';
import AllPosts from './components/AllPosts';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import ResponsiveAppBar from './components/ResponsiveAppBar';


function App() {



  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("isLoggedIn"))|| false);

  return (
    <div className='App'>
      <Router>
        {/* <Header isLoggedIn={isLoggedIn}/> */}
        <ResponsiveAppBar isLoggedIn={isLoggedIn} />
 
        <Routes >
        <Route path='/' exact element={<Home/>}/>
          <Route path='/signin' element={<SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path='/signout' element={<SignOut isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/allposts" element={<AllPosts/>}/>
          <Route path="/newpost" element={<NewPost isLoggedIn={isLoggedIn}/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/signup" element={<SignUp/>}/>
      
      
      </Routes>
    
      
      </Router>
      </div>
   
  );
}

export default App;
