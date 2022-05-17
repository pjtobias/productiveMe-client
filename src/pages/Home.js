import React from 'react';
import { useState } from 'react';
import { IoMdCheckboxOutline, IoMdPaper, IoMdGlobe, IoIosList, IoIosPeople, IoMdAlarm, IoMdFingerPrint, IoMdPaperPlane } from "react-icons/io";


const Home = () => {
	

	return (
		<div className="containerHomePage">
			<div className="subSectionHomePage-1">
			</div>
			<div className="subSectionHomePage-2">
				<div className="subSectionHomePage-2a">
					<span className="subSectionHomePage-2a-text01">Be PRODUCTIVE with us!</span>
					<span className="subSectionHomePage-2a-text02">Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br />Lorem Ipsum has been the industry's standard dummy text ever since the<br /> 1500s, when an unknown printer took a galley of type and scrambled<br /></span>
					<div>
						<button className="subSectionHomePage-2a-button01">More details</button>
						{/*<button className="subSectionHomePage-2a-button02">Register Now</button>*/}
					</div>
				</div>
				<div className="subSectionHomePage-2b">
					<div className="subSectionHomePage-2ba">			
					</div>
					<div className="subSectionHomePage-2bb">				
						<div className="subSectionHomePage-2bba">
							<span className="subSectionHomePage-2bba-icons"><IoMdCheckboxOutline /></span>
							<span className="subSectionHomePage-2bba-text01">System</span>
						</div>
						<div className="subSectionHomePage-2bbb">
							<span className="subSectionHomePage-2bba-icons"><IoMdPaper /></span>
							<span className="subSectionHomePage-2bba-text01">Tasks</span>
						</div>
						<div className="subSectionHomePage-2bbc">
							<span className="subSectionHomePage-2bba-icons"><IoMdGlobe /></span>
							<span className="subSectionHomePage-2bba-text01">Online</span>
						</div>
						<div className="subSectionHomePage-2bbd">
							<span className="subSectionHomePage-2bba-icons"><IoIosList /></span>
							<span className="subSectionHomePage-2bba-text01">Projects</span>
						</div>
						<div className="subSectionHomePage-2bbe">
							<span className="subSectionHomePage-2bba-icons"><IoIosPeople /></span>
							<span className="subSectionHomePage-2bba-text01">Team</span>
						</div>
						<div className="subSectionHomePage-2bbf">
							<span className="subSectionHomePage-2bba-icons"><IoMdAlarm /></span>
							<span className="subSectionHomePage-2bba-text01">Time</span>
						</div>
						<div className="subSectionHomePage-2bbg">
							<span className="subSectionHomePage-2bba-icons">
							<IoMdFingerPrint /></span>
							<span className="subSectionHomePage-2bba-text01">Safe</span>
						</div>
						<div className="subSectionHomePage-2bbh">
							<span className="subSectionHomePage-2bba-icons">
							<IoMdPaperPlane /></span>
							<span className="subSectionHomePage-2bba-text01">Message</span>
						</div>
					</div>
					<div className="subSectionHomePage-2bc">
					</div>
				</div>
			</div>
			<div className="subSectionHomePage-3">
				<span className="subSectionHomePage-3-text01">Organize your projects and tasks<br /> in a more convenient way</span>
				<span className="subSectionHomePage-3-text02">There are many variations of passages of Lorem Ipsum available,<br /> but the majority have suffered alteration in some<br /> form, by injected humour, or randomised words<br /> which don't look even slightly believable.</span>
			</div>
			<div className="subSectionHomePage-4">
				<span className="subSectionHomePage-4-text01">Psalm Tobias - 2022 - Intern Project-making</span>
			</div>
		</div>
	)
}

export default Home;