import React, { useState, useEffect, useContext } from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink 
	} from './NavbarElements';
import UserContext from '../UserContext';


const NavbarSignedIn = () => {
	const { user } = useContext(UserContext);


	return(
		<React.Fragment>
			<NavLink to="/masterplan" activeStyles>
				Masterplan
			</NavLink>
			<NavLink to="/userdetails" activeStyles>
				User
			</NavLink>
		</React.Fragment>
	)
}

export default NavbarSignedIn;