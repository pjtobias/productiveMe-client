import React from 'react';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext'
import '../css/style.masterplan.css'
import '../css/style.task.css'
import TaskCard from '../components/TaskCard';
import { IoIosRefresh } from "react-icons/io";


const Task = () => {
	const { user } = useContext(UserContext)
	const [ userTasks, setUserTasks ] = useState([])

	const [ listOfPendingTasks, setListOfPendingTasks ] = useState([])
	const [ listOfOngoingTasks, setListOfOngoingTasks ] = useState([])
	const [ listOfDoneTasks, setListOfDoneTasks ] = useState([])

	const [ listToShow,  setListToShow ] = useState([])
	const [ listToShowHandler,  setListToShowHandler ] = useState('all')
	const [ firstListToShow,  setFirstListToShow ] = useState(true)

	const [ aToZ,  setAToZ ] = useState(true)

	const [ searchThisName, setSearchThisName ] = useState('')




	const loadTask = (q) => {
		q.preventDefault()
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getTasksOfUser`, {
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
	    	setUserTasks(data)
	    })

	    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getAllPendingTasks`, {
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
	    	setListOfPendingTasks(data)
	    	// console.log(data)
	    })

		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getAllOngoingTasks`, {
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
	    	setListOfOngoingTasks(data)
	    	// console.log(data)
	    })

		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getAllDoneTasks`, {
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
	    	setListOfDoneTasks(data)
	    	// console.log(data)
	    })
	}














	//------ Sorting, Filtering and Counting


	const countAllPendingTasksA = listOfPendingTasks.filter(ewan => ewan.status === "pending")
	const countAllPendingTasksB = countAllPendingTasksA.length

	const countAllOngoingTasksA = listOfOngoingTasks.filter(ewan => ewan.status === "ongoing")
	const countAllOngoingTasksB = countAllOngoingTasksA.length

	const countAllDoneTasksA = listOfDoneTasks.filter(ewan => ewan.status === "done")
	const countAllDoneTasksB = countAllDoneTasksA.length





	const atozAllTasks = userTasks.sort((a, b) => {
		if(a.taskName < b.taskName) {
			return -1 
		} else if (a.taskName > b.taskName) {
			return 1
		} else {
			return 0
		}
	})
	const listOfAllTasksAtoz = atozAllTasks.map(ewan => {
		return (
			<TaskCard
			  key={ewan._id}
			  taskProp={ewan}
			/>
	  )
	})

	const ztoaAllTasks = userTasks.sort((a, b) => {
		if(a.taskName < b.taskName) {
			return 1 
		} else if (a.taskName > b.taskName) {
			return -1
		} else {
			return 0
		}
	})
	const listOfAllTasksZtoa = ztoaAllTasks.map(ewan => {
		return (
			<TaskCard
			  key={ewan._id}
			  taskProp={ewan}
			/>
	  )
	})


	const atozPendingTasks = listOfPendingTasks.sort((a, b) => {
		if(a.taskName < b.taskName) {
			return -1 
		} else if (a.taskName > b.taskName) {
			return 1
		} else {
			return 0
		}
	})
	const listOfPendingTasksAtoz = atozPendingTasks.map(ewan => {
		return (
			<TaskCard
			  key={ewan._id}
			  taskProp={ewan}
			/>
	  )
	})
	const ztoaPendingTasks = listOfPendingTasks.sort((a, b) => {
		if(a.taskName < b.taskName) {
			return 1 
		} else if (a.taskName > b.taskName) {
			return -1
		} else {
			return 0
		}
	})
	const listOfPendingTasksZtoa = ztoaPendingTasks.map(ewan => {
		return (
			<TaskCard
			  key={ewan._id}
			  taskProp={ewan}
			/>
	  )
	})


	const atozOngoingTasks = listOfOngoingTasks.sort((a, b) => {
		if(a.taskName < b.taskName) {
			return -1 
		} else if (a.taskName > b.taskName) {
			return 1
		} else {
			return 0
		}
	})
	const listOfOngoingTasksAtoz = atozOngoingTasks.map(ewan => {
		return (
			<TaskCard
			  key={ewan._id}
			  taskProp={ewan}
			/>
	  )
	})
	const ztoaOngoingTasks = listOfOngoingTasks.sort((a, b) => {
		if(a.taskName < b.taskName) {
			return 1 
		} else if (a.taskName > b.taskName) {
			return -1
		} else {
			return 0
		}
	})
	const listOfOngoingTasksZtoa = ztoaOngoingTasks.map(ewan => {
		return (
			<TaskCard
			  key={ewan._id}
			  taskProp={ewan}
			/>
	  )
	})


	const atozDoneTasks = listOfDoneTasks.sort((a, b) => {
		if(a.taskName < b.taskName) {
			return -1 
		} else if (a.taskName > b.taskName) {
			return 1
		} else {
			return 0
		}
	})
	const listOfDoneTasksAtoz = atozDoneTasks.map(ewan => {
		return (
			<TaskCard
			  key={ewan._id}
			  taskProp={ewan}
			/>
	  )
	})
	const ztoaDoneTasks = listOfDoneTasks.sort((a, b) => {
		if(a.taskName < b.taskName) {
			return 1 
		} else if (a.taskName > b.taskName) {
			return -1
		} else {
			return 0
		}
	})
	const listOfDoneTasksZtoa = ztoaDoneTasks.map(ewan => {
		return (
			<TaskCard
			  key={ewan._id}
			  taskProp={ewan}
			/>
	  )
	})


	useEffect(() => {
		if ( listToShowHandler === 'all' && aToZ === true) {
			setListToShow(listOfAllTasksAtoz)
		} else if ( listToShowHandler === 'all' && aToZ === false) {
			setListToShow(listOfAllTasksZtoa)
		} else if ( listToShowHandler === 'pending' && aToZ === true) {
			setListToShow(listOfPendingTasksAtoz)
		} else if ( listToShowHandler === 'pending' && aToZ === false) {
			setListToShow(listOfPendingTasksZtoa)
		} else if ( listToShowHandler === 'ongoing' && aToZ === true) {
			setListToShow(listOfOngoingTasksAtoz)
		} else if ( listToShowHandler === 'ongoing' && aToZ === false) {
			setListToShow(listOfOngoingTasksZtoa)
		} else if ( listToShowHandler === 'done' && aToZ === true) {
			setListToShow(listOfDoneTasksAtoz)
		} else if ( listToShowHandler === 'done' && aToZ === false) {
			setListToShow(listOfDoneTasksZtoa)
		} else {
			setListToShow(listOfAllTasksAtoz)
		}
	}, [listToShowHandler, aToZ, firstListToShow])

	const showPendingBtn = () => {
		setListToShowHandler('pending')
		setFirstListToShow(false)
		// console.log(listToShowHandler)
	}

	const showOngoingBtn = () => {
		setListToShowHandler('ongoing')
		setFirstListToShow(false)
		// console.log(listToShowHandler)
	}

	const showDoneBtn = () => {
		setListToShowHandler('done')
		setFirstListToShow(false)
		// console.log(listToShowHandler)
	}

	const showAllBtn = () => {
		setListToShowHandler('all')
		setFirstListToShow(false)
		// console.log(listToShowHandler)
	}

	const aToZToTrueBtn = () => {
		setAToZ(true)
		setFirstListToShow(false)
		// console.log(aToZ)
	}

	const aToZToFalseBtn = () => {
		setAToZ(false)
		setFirstListToShow(false)
		// console.log(aToZ)
	}



	//------ END Sorting, Filtering and Counting


	const searchedName = userTasks.filter((ewan) => {
		if (searchThisName === '') {
			return ewan
		} else if (ewan.taskName.toLowerCase().includes(searchThisName.toLowerCase())) {
			return ewan
		} 
	}).map((ewan, key) => {
		return (
			<TaskCard
			  key={ewan._id}
			  taskProp={ewan}
			/>
	  	)
	})






























	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getTasksOfUser`, {
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
	    	setUserTasks(data)
	    	// console.log(data)
	    })
	}, [])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getAllPendingTasks`, {
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
	    	setListOfPendingTasks(data)
	    	// console.log(data)
	    })
	}, [])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getAllOngoingTasks`, {
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
	    	setListOfOngoingTasks(data)
	    	// console.log(data)
	    })
	}, [])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getAllDoneTasks`, {
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
	    	setListOfDoneTasks(data)
	    	// console.log(data)
	    })
	}, [])












	return (
		<div>
			<div className="containerForTaskPage">
				<div className="containerForTaskPage-1">
					
					<div className="containerForTaskPage-1a">
						<h1>Task page</h1>
					</div>
					<div className="containerForTaskPage-1b">
						<div className="containerForTaskPage-1ba">
							<button className="btnForTaskPage-1bb" onClick={(q) => loadTask(q)}><IoIosRefresh /></button>
						</div>
						<div className="containerForTaskPage-1bb">
							<div className="containerForTaskPage-1bba">
								{( aToZ === true )
									?
										<button className="btnForTaskPage-1bbb-atoz" onClick={() => aToZToTrueBtn()}>a-z</button>
									:
										<button className="btnForTaskPage-1bba-atoz" onClick={() => aToZToTrueBtn()}>a-z</button>
								}
								{( aToZ === true )
									?
										<button className="btnForTaskPage-1bba-atoz" onClick={() => aToZToFalseBtn()}>z-a</button>
									:
										<button className="btnForTaskPage-1bbb-atoz" onClick={() => aToZToFalseBtn()}>z-a</button>
								}
							</div>
							<input 
							  type="text"
							  placeholder="Search here..."
							  onChange={e => setSearchThisName(e.target.value)}
							/>
						</div>
					</div>
					
				</div>
				<div className="containerForTaskPage-2">
					<div className="">
						{( listToShowHandler === 'pending' )
							?
								<button className="btnForTaskPage-2a" onClick={() => showAllBtn()}>Total Pending:</button>
							:
								<button className="btnForTaskPage-2b" onClick={() => showPendingBtn()}>Total Pending:</button>
						}
						<h3>{ countAllPendingTasksB }</h3>
					</div>
					<div className="">
						{( listToShowHandler === 'ongoing' )
							?
								<button className="btnForTaskPage-2a" onClick={() => showAllBtn()}>Total Ongoing:</button>
							:
								<button className="btnForTaskPage-2b" onClick={() => showOngoingBtn()}>Total Ongoing:</button>
						}
						<h3>{ countAllOngoingTasksB }</h3>
					</div>
					<div className="">
						{( listToShowHandler === 'done' )
							?
								<button className="btnForTaskPage-2a" onClick={() => showAllBtn()}>Total Done:</button>
							:
								<button className="btnForTaskPage-2b" onClick={() => showDoneBtn()}>Total Done:</button>
						}
						<h3>{ countAllDoneTasksB }</h3>
					</div>					
				</div>
			</div>
			<div>
			{ ( searchThisName === '' )
				?
					( firstListToShow === true )
					?
						<div className="containerForTaskList">{ listOfAllTasksAtoz }</div>
					:
						<div className="containerForTaskList">{ listToShow }</div>
				:
					<div className="containerForTaskList">{ searchedName }</div>
			}
			</div>
		</div>
	)
}

export default Task;