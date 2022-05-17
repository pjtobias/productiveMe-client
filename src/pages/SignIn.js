import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from "react-router-dom";
import UserContext from '../UserContext'
import Swal from 'sweetalert2'
// import { useNavigate, useLocation, Redirect } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import '../css/style.signin.css'
import '../css/style.css'

const SignIn = () => {
	const { setUser } = useContext(UserContext)
	// const history = useHistory();
	// let navigate = useNavigate();
	// let location = useLocation();

	const [ email, setEmail ] = useState('');
	const [ pw, setpw ] = useState('');
	const [ tokenId, setTokenId ] = useState(null)
	const [ goToHome, setGoToHome ] = useState(false)
	// const from = "/Home"





    function authenticate(e) {
        e.preventDefault();


        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/signIn`, 
        	{
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({
	                email: email,
	                pw: pw
	            })
			}
        )
        .then(res => res.json())
        .then(data => {
        	// console.log(data)
        	// console.log("andito na ko")
            if (typeof data.accessToken !== 'undefined') {
                Swal.fire(
                    'Sign-in Successfully!',
                    'You are logged in!',
                    'success'
                )
                localStorage.setItem('token', data.accessToken)
                retrieveUserDetails(data.accessToken)
                setGoToHome(true)
            } else {
                if(data.error === 'email-not-existing') {
                    Swal.fire(
                        'Authentication Failed',
                        'User does not exist.',
                        'error'
                    )
                } else if (data.error === 'incorrect-password') {
                    Swal.fire(
                        'Authentication Failed',
                        'Password is incorrect.',
                        'error'
                    )
                }
            }
    	})
    }


    const retrieveUserDetails = (accessToken) => {
        	// console.log("andito na ko")
        	// console.log(accessToken)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/details`,
        	{
				headers: { Authorization: `Bearer ${ accessToken }`}
			}
        )
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data._id
            })

            // Router.push('/')
            // history.push("/");
            // navigate(from, { replace: true })
            // setGoToHome(true)
            // return <Redirect to='/profile' />
        })
    }


	return (
		goToHome === true
		?
		<Navigate to='/masterplan' />
		:
		<div className='containerSignInPage'>
			<div className="subSectionSignInPage-1">
			</div>
			<div className="subSectionSignInPage-2">
				<span className="subSectionSignInPage-2-text01">Sign in</span>
			</div>
			<div className='subSectionSignInPage-3'>
			    <div className="create">
			      {/*<h2>Sign in</h2>*/}
			      <form onSubmit={e => authenticate(e)}>
			        <label>E-mail:</label>
			        <input 
			          type="text" 
			          required 
			          value={email}
			          placeholder="Enter your e-mail here..."
			          onChange={(e) => setEmail(e.target.value)}
			        />
			        <label>Password:</label>
			        <input 
			          type="password" 
			          aria-describedby="pwdnote"
			          required 
			          value={pw}
			          placeholder="Enter your password here..."
			          onChange={(e) => setpw(e.target.value)}
			        />
			        <button className="submitButton">Sign in</button>
			        {/*<button>Goodle Login</button>*/}
			      </form>
			    </div>
			</div>
			<div className="subSectionHomePage-4">
				<span className="subSectionHomePage-4-text01">Psalm Tobias - 2022 - Intern Project-making</span>
			</div>
		</div>
	)
}

export default SignIn;


