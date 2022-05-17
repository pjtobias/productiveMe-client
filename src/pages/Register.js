import React, { useState } from 'react';
import '../css/style.css'
import '../css/style.signin.css'
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

console.log(process.env)

const Register = () => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ contactNo, setContactNo ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ pw, setpw ] = useState('');
	const [ pwB, setpwB ] = useState('');

	const [ goToHome, setGoToHome ] = useState(false)

	const resetAll = () => {
		setFirstName('')
		setLastName('')
		setContactNo('')
		setEmail('')
		setpw('')
		setpwB('')
	}

	function isNumeric(num){
		return !isNaN(num)
	}

	function addUser(e) {
		e.preventDefault();
// process.env.REACT_APP_BACKEND_URL
				if (isNumeric(contactNo)) {
					if(contactNo.length === 11) {
						if(( pw !== '' && pwB !== '' ) && ( pw === pwB )) {
							console.log("isThisEmailExists step")
							fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/isThisEmailExists`, 
								{
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										email: email,
									})
								}
							)
							.then(res => res.json())
							.then(data => {
								if (data === false) {
									fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/addUser`,
										{
											method: 'POST',
											headers: {
												'Content-Type': 'application/json'
											},
											body: JSON.stringify({
												firstName: firstName,
												lastName: lastName,
												contactNo: contactNo,
												email: email,
												pw: pw
											})
										}
									)
									.then(res => res.json())
									.then(data => {
										if ( data === true ) {
											console.log("Registered successfully")
				                            Swal.fire(
				                                'Registered Successfully!',
				                                'You can sign-in now!',
				                                'success'
				                            )
				                            setGoToHome(true)
				                            resetAll()
										} else {
											console.log("Error occured")
				                            Swal.fire({
				                                icon: 'error',
				                                title: 'Oops...',
				                                text: 'Error occured!',
				                                footer: '<a href>Why do I have this issue?</a>'
				                            })
										}

									})
								} else {
		                            Swal.fire({
		                                icon: 'error',
		                                title: 'Oops...',
		                                text: 'Email already exists. Please use other email.',
		                                // footer: '<a href>Why do I have this issue?</a>'
		                            })
								}
							})
						} else {
							if ( pw === '' && pwB === '' ) {
								console.log("Please enter a password")
					            Swal.fire({
					                icon: 'error',
					                title: 'Oops...',
					                text: '"Please enter your password."',
					                // footer: '<a href>Why do I have this issue?</a>'
					            })
							} else {
								console.log("Please make the passwords match.")
					            Swal.fire({
					                icon: 'error',
					                title: 'Oops...',
					                text: 'Password confirmation failed',
					                // footer: 'Confirmation password do not match'
					            })
							}
						}
					} else {
						console.log("Please enter your 11-digit number")
			            Swal.fire({
			                icon: 'error',
			                title: 'Oops...',
			                text: 'Please enter your 11-digit number',
			                // footer: '<a href>Why do I have this issue?</a>'
			            })
					}
				} else {
					console.log("Please enter numeric value only")
		            Swal.fire({
		                icon: 'error',
		                title: 'Oops...',
		                text: 'Please enter numeric value only.',
		                // footer: '<a href>Why do I have this issue?</a>'
		            })
				}
	}

	return (
		goToHome === true
		?
		<Navigate to='/signIn' />
		:
		<div className='containerSignInPage'>
			<div className="subSectionSignInPage-1">
			</div>
			<div className="subSectionSignInPage-2">
				<span className="subSectionSignInPage-2-text01">Register here</span>
			</div>
			<div className="subSectionSignInPage-3">
			    <div className="create">
					{/*<h2>Register</h2>*/}
					<form onSubmit={(e) => addUser(e)}>
						<label>First name:</label>
						<input 
						  type="text" 
						  required 
						  value={firstName}
						  placeholder="Enter your first name here..."
						  onChange={(e) => setFirstName(e.target.value)}
						/>
						<label>Last name:</label>
						<input 
						  type="text" 
						  required 
						  value={lastName}
						  placeholder="Enter your last name here..."
						  onChange={(e) => setLastName(e.target.value)}
						/>
						<label>Contact No:</label>
						<input 
						  type="text"
						  maxlength="11"
						  required 
						  value={contactNo}
						  placeholder="Enter your contact number here..."

						  onChange={(e) => 

						  	setContactNo(e.target.value)
						  }
						/>
						<label>Email:</label>
						<input 
						  type="email" 
						  required 
						  value={email}
						  placeholder="Enter your email here..."
						  onChange={(e) => setEmail(e.target.value)}
						/>
						<label>Password:</label>
						<input 
						  type="password" 
						  value={pw}
						  placeholder="Enter your password here..."
						  onChange={(e) => setpw(e.target.value)}
						/>
						<label>Confirm Password:</label>
						<input 
						  type="password" 
						  value={pwB}
						  placeholder="Confirm your password here..."
						  onChange={(e) => setpwB(e.target.value)}
						/>
						<button className="submitButton">Register</button>
					</form>
			    </div>
		    </div>
		    <div className="subSectionHomePage-4">
				<span className="subSectionHomePage-4-text01">Psalm Tobias - 2022 - Intern Project-making</span>
			</div>
		</div>
	)
}

export default Register;