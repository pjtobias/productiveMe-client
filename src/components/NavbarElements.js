import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

// color palette
// #6F6FD8 - main - purple
// #98CE00 - 2nd - yellow green
// #89A6FB - 3rd - little boy blue
// #78C3FB - 4th - maya blue
// #16E0BD - 5th - turqouise

//-------- Color 002 active

export const Nav = styled.nav`
	background:#fff;
	height: 80px;
	display: flex;
	justify-content: space-between;
	padding: 0.5 calc((100vw - 1000px) / 2);
	z-index: 10;
	border-bottom: 3px solid #6F6FD8;
	/*Mine*/
	top: 0;
	position: fixed;
	width: 100%
	/*end Mine*/
`;

//---------- mine --------------//
export const NavLinkForLogo = styled(Link)`
	color: #6F6FD8;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 1rem;
	height: 100%;
	cursor: pointer;
`;
//---------- end mine --------------//

export const NavLink = styled(Link)`
	color: #6F6FD8;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 1rem;
	height: 100%;
	cursor: pointer;

	&.active {
		color: #98CE00;
	}
	&.hover {
		color: #98CE00;
	}
`;


export const Bars = styled(FaBars)`
	display: none;
	color: #fff;

	@media screen and (max-width: 768px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translated(-100%, 75%);
		font-size: 1.8rem;
		cursor: pointer;
	}
`;


export const NavMenu = styled.div`
	display: flex;
	align-items: center;
	margin-right: center;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;


export const NavBtn = styled.div`
	display: flex;
	align-items: center;
	margin-right: 24px;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;


export const NavBtnLink = styled(Link)`
	border-radius: 4px;
	background: #6F6FD8;
	padding: 10px 22px;
	color: #fff;
	border: 2px solid #EAF0CE;
	outline: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;

	&:hover {
		transition: all 0.2s ease-in-out;
		background: #f2f2f2;
		color: #6F6FD8;
		border: 2px solid #6F6FD8;
		border-radius: 3px;
	}
	&.active {
		border-radius: 4px;
		background: #98CE00;
		padding: 10px 22px;
		color: #fff;
		border: 2px solid #EAF0CE;
		outline: none;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		text-decoration: none;
	}
`;

//-------- end Color 002 active





//-------- Color 001

// export const Nav = styled.nav`
// 	background:#574B60;
// 	height: 80px;
// 	display: flex;
// 	justify-content: space-between;
// 	padding: 0.5 calc((100vw - 1000px) / 2);
// 	z-index: 10;
// `;


// export const NavLink = styled(Link)`
// 	color: #EAF0CE;
// 	display: flex;
// 	align-items: center;
// 	text-decoration: none;
// 	padding: 0 1rem;
// 	height: 100%;
// 	cursor: pointer;

// 	&.active {
// 		color: #fff;
// 	}
// `;


// export const Bars = styled(FaBars)`
// 	display: none;
// 	color: #fff;

// 	@media screen and (max-width: 768px) {
// 		display: block;
// 		position: absolute;
// 		top: 0;
// 		right: 0;
// 		transform: translated(-100%, 75%);
// 		font-size: 1.8rem;
// 		cursor: pointer;
// 	}
// `;


// export const NavMenu = styled.div`
// 	display: flex;
// 	align-items: center;
// 	margin-right: center;

// 	@media screen and (max-width: 768px) {
// 		display: none;
// 	}
// `;


// export const NavBtn = styled.div`
// 	display: flex;
// 	align-items: center;
// 	margin-right: 24px;

// 	@media screen and (max-width: 768px) {
// 		display: none;
// 	}
// `;


// export const NavBtnLink = styled(Link)`
// 	border-radius: 4px;
// 	background: #EAF0CE;
// 	padding: 10px 22px;
// 	color: #000;
// 	border: 2px solid #EAF0CE;
// 	outline: none;
// 	cursor: pointer;
// 	transition: all 0.2s ease-in-out;
// 	text-decoration: none;

// 	&:hover {
// 		transition: all 0.2s ease-in-out;
// 		background: #574B60;
// 		color: #EAF0CE;
// 		border: 2px solid #EAF0CE;
// 		border-radius: 3px;
// 	}
// `;

//-------- end Color 001




















