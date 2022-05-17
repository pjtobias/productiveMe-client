import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext'
import Swal from 'sweetalert2'
import '../css/style.userdetails.css'
import '../css/style.css'


const UserDetails = () => {
	const { user } = useContext(UserContext)

	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ contactNo, setContactNo ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ pw, setPw ] = useState('');
	const [ newPw, setNewPw ] = useState('');
	const [ newPwB, setNewPwB ] = useState('');

	// console.log(user.id)

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
			setFirstName(data.firstName)
			setLastName(data.lastName)
			setContactNo(data.contactNo)
			setEmail(data.email)
			// console.log(data)
        })
	}, [])

	function isNumeric(num){
		return !isNaN(num)
	}

	function updateUser(e) {
		e.preventDefault();
		if ((firstName !== '') && (lastName !== '') && (contactNo !== '') && (email !== '')) {
			if ((contactNo.length === 11) && (isNumeric(contactNo))) {
				fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/updateUser`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userId: user.id,
						firstName: firstName,
						lastName: lastName,
						contactNo: contactNo,
						email: email
					})
				})
				.then(res => res.json())
				.then(data => {
					if(data === true) {
						Swal.fire(
		                    'Updated Successfully!',
		                    'You edited your profile!',
		                    'success'
		                )
					} else {
						Swal.fire({
		                    icon: 'error',
		                    title: 'Oops...',
		                    text: 'Something went wrong!',
		                })
					}
				})
			} else {
				Swal.fire({
		            icon: 'error',
		            title: 'Oops...',
		            text: 'Entered a non-11-digit number or a word.!',
		        })
			}
		} else {
			Swal.fire({
	            icon: 'error',
	            title: 'Oops...',
	            text: 'Incomplete entry!',
	        })
		}
	}

	function updatePw(f) {
		f.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/updatePw`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: user.id,
				pw: pw,
				newPw: newPw,
				newPwB: newPwB
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data.error)
			if(data === true) {
				Swal.fire(
                    'Password Updated Successfully!',
                    'You edited your password!',
                    'success'
                )
                setPw('')
                setNewPw('')
                setNewPwB('')
			} else if (data.error === 'no-entered-new-pw'){
				Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '	Please enter something!',
                })
			} else if (data.error === 'confirm-failed'){
				Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '	New password did not match!',
                })
			} else {
				Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Entered a wrong current password!',
                })
			}
		})
	}
	

	return (
		<div className='containerUserDetails'>
			<div className='subSectionUserDetails-1'>
			</div>
			<div className='subSectionUserDetails-2'>
				<span className="textForPageTitles">User Update</span>
			</div>
			<div className='subSectionUserDetails-3'>
			    <div className="subSectionUserDetails-3a create">
					<h2>Details</h2>
					<form onSubmit={(e) => updateUser(e)}>
						<label>First name:</label>
						<input 
						  type="text" 
						   
						  value={firstName}
						  placeholder="Enter your first name here..."
						  onChange={(e) => setFirstName(e.target.value)}
						/>
						<label>Last name:</label>
						<input 
						  type="text" 
						   
						  value={lastName}
						  placeholder="Enter your last name here..."
						  onChange={(e) => setLastName(e.target.value)}
						/>
						<label>Contact No:</label>
						<input 
						  type="text"
						  maxLength="11"
						   
						  value={contactNo}
						  placeholder="Enter your contact number here..."

						  onChange={(e) => 

						  	setContactNo(e.target.value)
						  }
						/>
						<label>Email:</label>
						<input 
						  type="email" 
						   
						  value={email}
						  placeholder="Enter your email here..."
						  onChange={(e) => setEmail(e.target.value)}
						/>
						<button className="submitButton">Update Details</button>
					</form>
				</div>

			    <div className="subSectionUserDetails-3b">
			    </div>
			    
			    <div className="subSectionUserDetails-3c create">
					<h2>Password</h2>
					<form onSubmit={(f) => updatePw(f)}>
						<label>Current Password:</label>
						<input 
						  type="password" 
						  value={pw}
						  placeholder="Enter your current password here..."
						  onChange={(f) => setPw(f.target.value)}
						/>
						<label>New Password:</label>
						<input 
						  type="password" 
						  value={newPw}
						  placeholder="Enter your new password here..."
						  onChange={(f) => setNewPw(f.target.value)}
						/>
						<label>Confirm New Password:</label>
						<input 
						  type="password" 
						  value={newPwB}
						  placeholder="Confirm your new password here..."
						  onChange={(f) => setNewPwB(f.target.value)}
						/>
						<button className="submitButton">Update Password</button>
					</form>
			    </div>
			</div>
			<div className="subSectionHomePage-4">
				<span className="subSectionHomePage-4-text01">Psalm Tobias - 2022 - Intern Project-making</span>
			</div>
		</div>
			
	)
}

export default UserDetails;


