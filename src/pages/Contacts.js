import React from 'react';
import '../css/style.contacts.css'
import '../css/style.css'
import { IoLogoFacebook, IoLogoInstagram, IoLogoSkype, IoLogoLinkedin, IoIosCall, IoIosGlobe, IoIosNavigate } from "react-icons/io";


const Contacts = () => {

	return (
		<div className="containerContactsPage">
			<div className="subSectionContactsPage-1">
			</div>
			<div className="subSectionContactsPage-2">
				<span className="subSectionContactsPage-2-text01">Contact Us</span>
			</div>
			<div className="subSectionContactsPage-3">
				<div className="subSectionContactsPage-3a">
					<div className="subSectionContactsPage-3ad">
					</div>
					<div className="subSectionContactsPage-3aa">
						<span className="subSectionContactsPage-3a-text01">Contact Information</span>
						<br />
						<span className="subSectionContactsPage-3a-text02">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
					</div>
					<div className="subSectionContactsPage-3ab">
						<span className="subSectionContactsPage-3a-text03"><IoIosNavigate />&nbsp;&nbsp;0999 999 9999</span>
						<br />
						<span className="subSectionContactsPage-3a-text03"><IoIosGlobe />&nbsp;&nbsp;companyname@mail.com</span>
						<br />
						<span className="subSectionContactsPage-3a-text03"><IoIosNavigate />&nbsp;&nbsp;Manila, Philippines</span>
					</div>
					<div className="subSectionContactsPage-3ac">
						<span className="subSectionContactsPage-3a-text04"><IoLogoFacebook /></span>
						<span className="subSectionContactsPage-3a-text04"><IoLogoInstagram /></span>
						<span className="subSectionContactsPage-3a-text04"><IoLogoSkype /></span>
						<span className="subSectionContactsPage-3a-text04"><IoLogoLinkedin /></span>
					</div>
				</div>
				<div className="subSectionContactsPage-3b">
					<form className="subSectionContactsPage-3ba">
						{/*<h2>Message Psalm now</h2>*/}
						<div>
							<label className="subSectionContactsPage-3ba-text01">Name</label>
							<br />
							<input type="text" className="subSectionContactsPage-3ba-textbox01" placeholder="Full name here..." />
						</div>
						<div>
							<label className="subSectionContactsPage-3ba-text01">E-mail</label>
							<br />
							<input type="email" className="subSectionContactsPage-3ba-textbox01" placeholder="E-mail address here..." />
						</div>
						<div>
							<label className="subSectionContactsPage-3ba-text01">Message</label>
							<br />
							<textarea className="subSectionContactsPage-3ba-textarea01" placeholder="Write Here..."></textarea>
						</div>
						<button className="subSectionContactsPage-3ba-btn01" type="button">Submit</button>
					</form>
				</div>
			</div>
			<div className="subSectionContactsPage-4">
			</div>

			<div className="subSectionHomePage-4">
				<span className="subSectionHomePage-4-text01">Psalm Tobias - 2022 - Intern Project-making</span>
			</div>
			
		</div>
	)
}

export default Contacts;