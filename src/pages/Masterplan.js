import React from 'react';
import { useState, useContext,useEffect } from 'react';
import '../css/style.masterplan.css'
import UserContext from '../UserContext'
import Project from './Project'
import Dashboard from './Dashboard'
import Task from './Task'
import Inbox from './Inbox'
import ConvoSocketIo from './ConvoSocketIo'
import { IoMdStats, IoMdFiling, IoMdList, IoMdPaperPlane, IoMdCog } from "react-icons/io";

// IoMdPie
// IoMdPulse


const Masterplan = () => {
	const { user } = useContext(UserContext)
	const [ goToDashboard, setGoToDashboard ] = useState(false)
	const [ goToProject, setGoToProject ] = useState(false)
	const [ goToTask, setGoToTask ] = useState(false)
	const [ goToInbox, setGoToInbox ] = useState(false)
	const [ goToConvoSocketIo, setGoToConvoSocketIo ] = useState(false)

	const [ firstName, setFirstName ] = useState('')

	useEffect(() => {
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/users/getUser`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: user.id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setFirstName(data.firstName)
	    	// console.log(data.firstName)
	    })
	}) 








	function goDashboard() {
		setGoToDashboard(false)
		setGoToProject(false)
		setGoToTask(false)
		setGoToInbox(false)
		setGoToConvoSocketIo(false)
	}

	function goProject() {
		setGoToDashboard(true)
		setGoToProject(false)
		setGoToTask(false)
		setGoToInbox(false)
		setGoToConvoSocketIo(false)
	}

	function goTask() {
		setGoToDashboard(true)
		setGoToProject(true)
		setGoToTask(false)
		setGoToInbox(false)
		setGoToConvoSocketIo(false)
	}

	function goInbox() {
		setGoToDashboard(true)
		setGoToProject(true)
		setGoToTask(true)
		setGoToInbox(false)
		setGoToConvoSocketIo(false)
	}

	function goConvoSocketIo() {
		setGoToDashboard(true)
		setGoToProject(true)
		setGoToTask(true)
		setGoToInbox(true)
		setGoToConvoSocketIo(true)
	}


	return (




		<React.Fragment>
			<div className='container-masterplan-nav'>
				<div className='container-masterplan-nav-a'>
					<span className="container-masterplan-nav-text01">Hi! {firstName}</span><br />
				</div>
				<div className='container-masterplan-nav-b'>
					<button className="rightside-btn" onClick={() => goDashboard()}><IoMdStats />&nbsp;&nbsp;Dashboard</button>
					<button className="rightside-btn" onClick={() => goProject()}><IoMdFiling />&nbsp;&nbsp;Project</button>
					<button className="rightside-btn" onClick={() => goTask()}>
						<IoMdList />&nbsp;&nbsp;Task
					</button>
					<button className="rightside-btn" onClick={() => goInbox()}><IoMdPaperPlane />&nbsp;&nbsp;Inbox</button>
					<button className="rightside-btn" onClick={() => goConvoSocketIo()}><IoMdCog />&nbsp;&nbsp;Socket.io</button>
				</div>
			</div>



			<div className='container-masterplan-main'>
				<div className='container-masterplan-content'>
					<div className='container-masterplan-a-leftside'>
					</div>
					<div className='container-masterplan-b-rightside'>
						{(goToDashboard === true)
						?
							(goToProject === true)
							?
								(goToTask === true)
								?
									(goToInbox === true)
									?
									<ConvoSocketIo />
									:
									<Inbox />
								:
								<Task />
							:
							<Project />
						:
						<Dashboard />
						}
					</div>
				</div>
			</div>
		</React.Fragment>
		
	)
}

export default Masterplan;