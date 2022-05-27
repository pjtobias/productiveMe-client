import React from 'react';
import { useState, useEffect, useContext } from 'react';
import '../css/style.masterplan.css'
import '../css/style.dashboard.css'
import UserContext from '../UserContext'
import { DataTry } from "../DataTry";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
const moment = require('moment')

const Dashboard = () => {
	const { user } = useContext(UserContext)
	const [ tasksOfUser, setTasksOfUser ] = useState([])

	const [ allTasksCount, getAllTasksCount ] = useState("")
	const [ allProjectsCount, getAllProjectsCount ] = useState("")
	const [ dateToday, setDateToday ] = useState('')

	const [ pendingTaskCount, setPendingTaskCount ] = useState("")
	const [ ongoingTaskCount, setOngoingTaskCount ] = useState("")
	const [ doneTaskCount, setDoneTaskCount ] = useState("")

	const [ activeProjectCount, setActiveProjectCount ] = useState("")
	const [ doneProjectCount, setDoneProjectCount ] = useState("")

	let pending = "Pending"
  	let ongoing = "Ongoing"
  	let done = "Done"	

  	let activeProject = "Active"
  	let doneProject = "Done"	





	var currentDay = moment().format("dddd");
	var currentDate = moment().format("LL");
	// setDateToday(CurrentDate)
	// console.log(currentDay)


  	useEffect(() => {
  		// console.log(user.id)
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/tasks/getTasksOfUser`, {
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
	    	// console.log(data)
	    	var a = data.length
	    	// setTasksOfUser(data)
	    	getAllTasksCount(a)
	    	// console.log(allTasksCount)
	    })

	    fetch(`${process.env.REACT_PUBLIC_API_URL}/api/projects/getProject`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					adminId: user.id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	// console.log(data)
	    	var a = data.length
	    	// setTasksOfUser(data)
	    	getAllProjectsCount(a)
	    	// console.log(allProjectsCount)
	    })
  	}, [])





  	
  	
//-------------------- data for charts
	useEffect(() => {
	    fetch(`${process.env.REACT_PUBLIC_API_URL}/api/tasks/getAllPendingTasks`, {
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
	    	var a = data.length
			setPendingTaskCount(a)
	    	// console.log(a)
	    })

	    fetch(`${process.env.REACT_PUBLIC_API_URL}/api/tasks/getAllOngoingTasks`, {
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
	    	var a = data.length
			setOngoingTaskCount(a)
	    	// console.log(a)
	    })

	    fetch(`${process.env.REACT_PUBLIC_API_URL}/api/tasks/getAllDoneTasks`, {
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
	    	var a = data.length
			setDoneTaskCount(a)
	    	// console.log(a)
	    })

	    fetch(`${process.env.REACT_PUBLIC_API_URL}/api/projects/getAllActiveProjects`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					adminId: user.id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	var a = data.length
			setActiveProjectCount(a)
			// console.log(data)
	  //   	console.log(a)
	    })

	    fetch(`${process.env.REACT_PUBLIC_API_URL}/api/projects/getAllDoneProjects`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					adminId: user.id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	var a = data.length
			setDoneProjectCount(a)
	    	// console.log(data)
	    	// console.log(a)
	    })

  		// console.log(user.id)
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/tasks/getTasksOfUser`, {
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
	    	// console.log(data)
	    	var a = data.length
	    	// setTasksOfUser(data)
	    	getAllTasksCount(a)
	    	// console.log(allTasksCount)
	    })

	    fetch(`${process.env.REACT_PUBLIC_API_URL}/api/projects/getProject`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					adminId: user.id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	// console.log(data)
	    	var a = data.length
	    	// setTasksOfUser(data)
	    	getAllProjectsCount(a)
	    	// console.log(allProjectsCount)
	    })
	    
	})

//-------------------- END data for charts






	return (
		<div className="containerForDashboardPage">
			<div className="subSectionDashboardPage-1">
				<h1>Dashboard page</h1>
			</div>
			<div className="subSectionDashboardPage-2">
				<div className="subSectionDashboardPage-2a subSectionDashboardPage-2aa">
					<span className="subSectionDashboardPage-2a-text01">Total Projects:</span>
					<span className="subSectionDashboardPage-2a-text02">{ allProjectsCount }</span>
				</div>
				<div className="subSectionDashboardPage-2a subSectionDashboardPage-2ab">
					<span className="subSectionDashboardPage-2a-text01">Total Tasks:</span>
					<span className="subSectionDashboardPage-2a-text02">{ allTasksCount }</span>
				</div>
				<div className="subSectionDashboardPage-2a subSectionDashboardPage-2ac">
					<span className="subSectionDashboardPage-2a-text01">Date Today:</span>
					<span className="subSectionDashboardPage-2a-text02">{ currentDate }</span>
				</div>
				<div className="subSectionDashboardPage-2a subSectionDashboardPage-2ad">
					<span className="subSectionDashboardPage-2a-text01">Day Today:</span>
					<span className="subSectionDashboardPage-2a-text02">{ currentDay }</span>
				</div>
			</div>
			<div className="subSectionDashboardPage-3">
				<div className="subSectionDashboardPage-3a">
					<div style={{ width: 550 } }>
						<BarChart 
							chartData={{
								labels: [ "pending", "ongoing", "done" ],
								datasets: [
								  {
								    label: [ 'Tasks' ],
								    data: [ pendingTaskCount, ongoingTaskCount, doneTaskCount ],
								    backgroundColor: [
								      "#78C3FB",
								      "#98CE00",
								      "#6F6FD8"
								    ],
								    borderColor: "black",
								    borderWidth: 2,
								  }
								]
							}}
							redraw={ false } 
							options={{
								indexAxis: 'y',
				        		responsive: true,
				        		maintainAspectRatio: true,
				        		plugins: {
					        		title: {
					        			display: true,
					        			text: 'Number of Tasks'
					        		},
					        		legend: {
					        			display: false
					        		}
				        		}

					        }}
						/>
					</div>
				</div>
				<div className="subSectionDashboardPage-3a">
					<div style={{ width: 300 }}>
						<DoughnutChart 
							chartData={{
								labels: [ activeProject,  doneProject],
								datasets: [
								  {
								    label: [ "Active", "Done" ],
								    data: [ activeProjectCount, doneProjectCount ],
								    backgroundColor: [
								      "#89A6FB",
								      "#16E0BD"
								    ],
								    borderColor: "black",
								    borderWidth: 2,
								  }
								]
							}}
							redraw={ false } 
							options={{
					          responsive: true,
					          maintainAspectRatio: true,
					        }}
						/>
					</div>
				</div>
			</div>
			<div className="subSectionDashboardPage-4">
			</div>
			<div className="subSectionHomePage-4">
				<span className="subSectionHomePage-4-text01">Psalm Tobias - 2022 - Intern Project-making</span>
			</div>
		</div>
	)
}

export default Dashboard;