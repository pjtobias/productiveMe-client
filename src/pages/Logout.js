import { useContext, useEffect } from 'react'
import UserContext from '../UserContext'
import React from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Logout() {
    
    const { unsetUser, setUser} = useContext(UserContext);
    
    useEffect(() => {
        Swal.fire(
            'Logout Successfully!',
            'You are logged out!',
            'success'
        )
        unsetUser();
        // localStorage.clear()
        setUser({
            id: null
        });
    },[])



    return (
        <Navigate to="/" />
    )
}