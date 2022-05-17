import React, { useState, useEffect, useContext } from 'react';
import { NavLinkForLogo, Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink 
	} from './NavbarElements';
import UserContext from '../UserContext';
import NavbarSignedIn from '../components/NavbarSignedIn'
import { GiBugleCall } from "react-icons/gi";



const NavbarDefault = () => {
	const { user } = useContext(UserContext);
	const [ firstName, setFirstName ] = useState('')
	const [ refresh, serRefresh ] = useState('')




	// useEffect(() => {
	// 	fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/getUser`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				userId: user.id
	// 			})
	//     })
	//     .then(res => res.json())
	//     .then(data => {
	//     	setFirstName(data.firstName)
	//     	console.log(data)
	//     })
	// }, [])

	// useEffect(() => {
	// 	fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/getUser`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				userId: user.id
	// 			})
	//     })
	//     .then(res => res.json())
	//     .then(data => {
	//     	setFirstName(data)
	//     	console.log(data)
	//     })
	// }, [refresh])

	const changeRefresh = () => {
		serRefresh(prev => !prev);
	};


	return (
		<>
			<Nav>
				<NavLinkForLogo to="/">
					<h1>ProductiveMe <GiBugleCall /></h1>
				</NavLinkForLogo>
				<Bars />
				<NavMenu>
					{(user.id === null)
						?
							<React.Fragment>
								<NavLink to="/services" activeStyles>
									Services
								</NavLink>
								<NavLink to="/contacts" activeStyles>
									Contacts
								</NavLink>
								<NavLink to="/register" activeStyles>
									Register
								</NavLink>
							</React.Fragment>
						:
							<React.Fragment>
								<NavbarSignedIn />
							</React.Fragment>
					}
				</NavMenu>
				<NavBtn>
					{(user.id === null)
						?
						<NavBtnLink to="/signin">Sign In</NavBtnLink>
						:
						<React.Fragment>
							{/*<button onChange={changeRefresh()}>*/}
								{/*<h3>Hi! {firstName} &nbsp;|&nbsp;&nbsp;&nbsp;</h3>*/}
							{/*</button>*/}
							<NavBtnLink to="/logout">Log out</NavBtnLink>
						</React.Fragment>
					}
					
				</NavBtn>
			</Nav>
		</>
	)
}


export default NavbarDefault;