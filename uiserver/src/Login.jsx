import React from 'react'

function Login(props) {
    const [user, setuser] = React.useState({
        username:'',
        password:''
    })
    function login(){
        fetch('http://localhost:4000/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: JSON.stringify(user) // body data type must match "Content-Type" header
        })
        .then((res)=>{
            return res.json()
        })
        .then(data=>{
            console.log(data)
            if(data.token){
                window.localStorage.setItem('token',data.token);
                props.setIsLoggedIn(true);
            }
            else{
                alert("username password not matched")
            }
        })
    }
  return (
    <div>
        <input type="text" onKeyUp={(e)=>{setuser({...user,username:e.target.value})}} placeholder='username' />
        <input type="text" onKeyUp={(e)=>{setuser({...user,password:e.target.value})}} placeholder='password' />
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login