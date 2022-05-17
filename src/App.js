// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import styles from './css/style.module.css'
import Navbar from './components/Navbar'
import { UserProvider } from './UserContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// import io from 'socket.io-client'
// const socket = io.connect("http://localhost:4000");
// client-side
// socket.on("connect", () => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
// });


export default function App() {
   const [user, setUser] = useState({
        id: null
    })

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data._id){
                setUser({
                    id: data._id,
                    accessType: data.accessType

                })
            }else{
                setUser({
                    id: null
                })
            }            
        })
    }, [user.id])

    const unsetUser = () => {
        localStorage.clear()

        setUser({
            id: null
        });
    }

   return (
      <UserProvider value={{user, setUser, unsetUser}}>
         <Navbar />
      </UserProvider>
   );
}



