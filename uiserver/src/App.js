
import React from 'react';
import './App.css';
import Login from './Login';
import Restaurants from './Restaurants';

function App() {
  const [isLoggedIn,setIsLoggedIn] = React.useState(false)
  React.useEffect(()=>{
    if(window.localStorage.getItem('token')){
      setIsLoggedIn(true)
    }
  },[])
  return (
    <div>
      {isLoggedIn && (<Restaurants setIsLoggedIn={setIsLoggedIn}></Restaurants>)}
      {!isLoggedIn && (<Login setIsLoggedIn={setIsLoggedIn}></Login>)}
      
    </div>
  );
}

export default App;