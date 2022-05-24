import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/style.masterplan.css'
import '../css/style.task.css'
import '../css/style.project.css'
import { IoMdCreate,  IoIosTrash, IoMdAdd, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ModalUpdateProject from './ModalUpdateProject';
import ModalUpdateTaskB from './ModalUpdateTaskB';
import ModalAddTask from './ModalAddTask';
import UserContext from '../UserContext'
import DatePicker from 'react-date-picker';
import Swal from 'sweetalert2';
const moment = require('moment')

// IoIosTrash
// IoMdRefresh
// IoMdCreate
// IoMdClose
// IoMdCheckmark
// IoMdAdd

export default function ProjectCard ({ projectProp }) {
	const { _id, projectName, dateCreated, adminId, dateEnd, isActive } = projectProp

	const { user } = useContext(UserContext)
	const [ userFirstName, setUserFirstName ] = useState('')

	const [ projectNameToUpdate, setProjectNameToUpdate ] = useState('')
	const [ dateEndToUpdate, setDateEndToUpdate ] = useState('')

	const [ taskName, setTaskName ] = useState('')
	const [ description, setDescription ] = useState('')
	const [ projectThisTaskBelongToId, setProjectThisTaskBelongToId ] = useState('')
	const [ userAssignedInThisTaskId, setUserAssignedInThisTaskId ] = useState('')
	const [ adminOfThisProjectId, setAdminOfThisProjectId ] = useState('')

	const [ allUsers, setAllUsers ] = useState([])
	const [ listOfTasksInsideProject, setListOfTasksInsideProject ] = useState([])



	const [ taskIdToUpdate, setTaskIdToUpdate ] = useState('')
	const [ taskNameToUpdate, setTaskNameToUpdate ] = useState('')
	const [ descriptionToUpdate, setDescriptionToUpdate ] = useState('')
	const [ statusToUpdate, setStatusToUpdate ] = useState('')



	const [ createdDateConverted, setCreatedDateConverted ] = useState('')
	const [ endDateConverted, setEndDateConverted ] = useState('')

	const [ isActiveToFalse, setIsActiveToFalse ] = useState(false)
	const [ isActiveToTrue, setIsActiveToTrue ] = useState(true)

	const [ deadlineNotif, setDeadlineNotif ] = useState(false)








		// Modal Controls //

	const [ openUpdatePortion, setOpenUpdatePortion ] = useState(false)
	const openOrCloseUpdatePortion = () => {
		setOpenUpdatePortion(prev => !prev);
		setOpenAddTaskPortion(false);
		setOpenTableTasksList(false)
	};

	const [ openAddTaskPortion, setOpenAddTaskPortion ] = useState(false)
	const openOrCloseAddTaskPortion = () => {
		setOpenAddTaskPortion(prev => !prev);
		setOpenUpdatePortion(false);
		setOpenTableTasksList(false)
		// console.log(projectProp._id)
		// console.log(userAssignedInThisTaskId)
		// console.log(user.id)
	};

	const [ openTableTasksList, setOpenTableTasksList ] = useState(false)
	const openOrCloseOpenTableTasksList = () => {
		setOpenTableTasksList(prev => !prev);
		refreshTasksList()
		setOpenAddTaskPortion(false);
		setOpenUpdatePortion(false);
	};

	const [ openUpdateTask, setOpenUpdateTask ] = useState(false)
	const openOrCloseOpenUpdateTask = (taskId) => {
		setOpenUpdateTask(prev => !prev);
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getSpecificTask`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskId: taskId
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setTaskIdToUpdate(data._id)
			setTaskNameToUpdate(data.taskName)
			setDescriptionToUpdate(data.description)
			setStatusToUpdate(data.status)
			console.log(data._id)
			console.log(data.taskName)
			console.log(data.description)
	    })
	};


		// END Modal Controls //






















		// Display stuffs //
// ------------------------
			// drop down for "Assign member" //



	// const allUsersShow = allUsers.map(ewan => {
	//  return 
	// })

	const allUsersShow = allUsers.map((option) => (
		<React.Fragment>
			<option value="" disabled selected hidden>Assign here...</option>
			{/*<option value={option._id}>{option.firstName}{option._id}</option>*/}
			<option value={option._id}>{option.firstName}</option>
		</React.Fragment>
	))

	const options = [
		{ label: 'Fruit', value: 'fruit' },
		{ label: 'Vegetable', value: 'vegetable' },
		{ label: 'Meat', value: 'meat' },
	];
	const [value, setValue] = React.useState('');

	const handleChange = (z) => {
		setUserAssignedInThisTaskId(z.target.value);
	};



			// END drop down for "Assign member" //
		// -------------------------------
			// list of Tasks //



	const listOfTasks = listOfTasksInsideProject.map(ewan => {
		return (
			<tr key={ewan._id}>
				<td>{ewan.taskName}</td>
				<td>{ewan.description}</td>
				<td>{(ewan.status)}</td>
				<td>
					<button className="actionBtn" onClick={() => openOrCloseOpenUpdateTask(ewan._id)}>Update</button>
					<button className="actionBtn" onClick={() => deleteTask(ewan._id)}>Delete</button>
				</td>
			</tr>
		)
	})

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getTasksThruProjectId`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectThisTaskBelongToId: projectProp._id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setListOfTasksInsideProject(data)
	    	// console.log(data)
	    })
	}, [])


	function refreshTasksList() {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/getTasksThruProjectId`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectThisTaskBelongToId: projectProp._id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setListOfTasksInsideProject(data)
	    	// console.log(data)
	    })
	}
// onClick={() => {handleShow(indivCourse._id)}}



			// END list of Tasks //
// ------------------------
		// END Display stuffs //




















	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getSpecificProject`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectId: projectProp._id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setProjectNameToUpdate(data.projectName)
	    })
	}, [openUpdatePortion])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/getAllUsers`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setAllUsers(data)
	    })
	}, [openAddTaskPortion])


	useEffect(() => {
		// console.log(user.id)
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/getUser`, {
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
	    	setUserFirstName(data.firstName)
	    	// console.log(data.firstName)
	    })
	}, [])































//--------- counting deadlines

	useEffect(() => {
		const dateAA = moment(dateCreated, "YYYY-MM-DD")
		const dateAB = dateAA.format('MMM DD YYYY')
		setCreatedDateConverted(dateAB)
		const dateBA = moment(dateEnd, "YYYY-MM-DD")
		const dateBB = dateBA.format('MMM DD YYYY')
		setEndDateConverted(dateBB)
		// console.log(dateBA)	
		// console.log(dateBB)


		const dateEndCompareA = moment(dateEnd).format('YYYYMMDD')
		// console.log(dateEndCompareA)
		const dateEndCompareB = moment(new Date()).add(7, 'day').format('YYYYMMDD') 
		const dateEndCompareC = moment(new Date()).add(6, 'day').format('YYYYMMDD') 
		const dateEndCompareD = moment(new Date()).add(5, 'day').format('YYYYMMDD') 
		const dateEndCompareE = moment(new Date()).add(4, 'day').format('YYYYMMDD') 
		const dateEndCompareF = moment(new Date()).add(3, 'day').format('YYYYMMDD') 
		const dateEndCompareG = moment(new Date()).add(2, 'day').format('YYYYMMDD') 
		const dateEndCompareH = moment(new Date()).add(1, 'day').format('YYYYMMDD') 
		// console.log(dateEndCompareB)

		if ( dateEndCompareA === dateEndCompareB ) {
			setDeadlineNotif(true)
		} else if ( dateEndCompareA === dateEndCompareC ) {
			setDeadlineNotif(true) 
		} else if ( dateEndCompareA === dateEndCompareD ) {
			setDeadlineNotif(true) 
		} else if ( dateEndCompareA === dateEndCompareE ) {
			setDeadlineNotif(true) 
		} else if ( dateEndCompareA === dateEndCompareF ) {
			setDeadlineNotif(true)  
		} else if ( dateEndCompareA === dateEndCompareG ) {
			setDeadlineNotif(true) 
		} else if ( dateEndCompareA === dateEndCompareH ) {
			setDeadlineNotif(true) 
		} else {
			setDeadlineNotif(false) 
		}
	}, [])

//--------- END counting deadlines
		



























	const onChangeDateEndToUpdate = dateEndToUpdate => {
		setDateEndToUpdate(dateEndToUpdate)
	}	
	const onChangeUserAssignedInThisTaskId = z => {
		setUserAssignedInThisTaskId(z)
		// console.log(userAssignedInThisTaskId)
	}

	function updateProject(e) {
		e.preventDefault()
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/updateProject`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectId: projectProp._id,
					projectName: projectNameToUpdate,
					dateEnd: dateEndToUpdate
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
	            Swal.fire(
	                'Updated Project Successfully!',
	                'Push REFRESH button!',
	                'success'
	            )
	            setOpenUpdatePortion(false)
	    	} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Update project failed!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
	    	}

	    })
	}



	function addTask(z) {
		z.preventDefault()
		// console.log(taskName)
		// console.log(projectProp._id)
		// console.log(userAssignedInThisTaskId)
		// console.log(user.id)
		// console.log('dito na ko')
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/addTask`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskName: taskName,
					description: description,
					projectThisTaskBelongToId: projectProp._id,
					userAssignedInThisTaskId: userAssignedInThisTaskId,
					adminOfThisProjectId: user.id
				})
	    	}
	    )
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
	            Swal.fire(
	                'Added task Successfully!',
	                'Push LOAD PROJECTS button!',
	                'success'
	            )
	            setTaskName('')
				setDescription('')
				setUserAssignedInThisTaskId('')
				setOpenAddTaskPortion(false)
				refreshTasksList()
	    	} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Add task failed!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
	    	}

	    })
	}


	function updateIsActiveToFalse(a) {
		a.preventDefault()
		// console.log(isActiveToFalse)
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/updateIsActiveToFalse`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectId: projectProp._id,
					isActive: isActiveToFalse
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
	            Swal.fire(
	                'Congratulation!',
	                'You finsished a project!',
	                'success'
	            )
	    	} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Update project failed!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
	    	}
	    })
	}


	function updateIsActiveToTrue(b) {
		b.preventDefault()
		// console.log(isActiveToTrue)
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/updateIsActiveToTrue`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					projectId: projectProp._id,
					isActive: isActiveToTrue
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
	            Swal.fire(
	                'We brought back your project!',
	                'Its okay!',
	                'success'
	            )
	    	} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Update project failed!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
	    	}

	    })
	}


	function deleteProject(q) {
		q.preventDefault()
		// console.log(isActiveToTrue)
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		    if (result.isConfirmed) {
				fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/deleteProject`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							projectId: projectProp._id
						})
			    })
			    .then(res => res.json())
			    .then(data => {
			    	if (data === true) {
			            Swal.fire(
					      'Deleted!',
					      'Your Project has been deleted.',
					      'success'
			            )
			    	} else {
		                Swal.fire({
		                    icon: 'error',
		                    title: 'Oops...',
		                    text: 'Delete project failed!',
		                    footer: '<a href>Why do I have this issue?</a>'
		                })
			    	}

			    })
		    }
		})
	}

	function updateTask(h) {
		h.preventDefault()
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/updateTask`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskId: taskIdToUpdate,
					taskName: taskNameToUpdate,
					description: descriptionToUpdate
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
	            Swal.fire(
	                'Updated Task Successfully!',
	                'Push LOAD PROJECTS button!',
	                'success'
	            )
	            setOpenUpdateTask()
	            setOpenTableTasksList(false)
	            refreshTasksList()
	    	} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Update task failed!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
	    	}

	    })
	}

	function updateStatusToPending(h) {
		h.preventDefault()
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/updateStatusToPending`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskId: taskIdToUpdate,
					status: "pending"
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
				Swal.fire({
				    position: 'top-end',
				    icon: 'success',
				    title: 'Changed to "PENDING"!!',
				    showConfirmButton: false,
				    timer: 1500
				})
				setOpenUpdateTask()
				refreshTasksList()
	    	} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Update task failed!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
	    	}
	    })
	}


	function updateStatusToOngoing(h) {
		h.preventDefault()
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/updateStatusToOngoing`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskId: taskIdToUpdate,
					status: "ongoing"
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
				Swal.fire({
				    position: 'top-end',
				    icon: 'success',
				    title: 'Changed to "ONGOING"!',
				    showConfirmButton: false,
				    timer: 1500
				})
				setOpenUpdateTask()
				refreshTasksList()
	    	} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Update task failed!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
	    	}
	    })
	}


	function updateStatusToDone(h) {
		h.preventDefault()
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/updateStatusToDone`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskId: taskIdToUpdate,
					status: "done"
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
				Swal.fire({
				    position: 'top-end',
				    icon: 'success',
				    title: 'Changed to "DONE"!!',
				    showConfirmButton: false,
				    timer: 1500
				})
				setOpenUpdateTask()
				refreshTasksList()
	    	} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Update task failed!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
	    	}
	    })
	}

	function deleteTask(q) {
		// q.preventDefault()
		console.log(q)
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		    if (result.isConfirmed) {
				fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/deleteTask`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							taskId: q
						})
			    })
			    .then(res => res.json())
			    .then(data => {
			    	if (data === true) {
			            Swal.fire(
					      'Deleted!',
					      'Your Task has been deleted.',
					      'success'
			            )
			            refreshTasksList()
			    	} else {
		                Swal.fire({
		                    icon: 'error',
		                    title: 'Oops...',
		                    text: 'Delete project failed!',
		                    footer: '<a href>Why do I have this issue?</a>'
		                })
			    	}

			    })
		    }
		})
	}





























	

	return (
		
		<div>
			<div  className="containerItemsProjectCard">
				<div className="perItemProjectCard-1">
					<h3>{projectName}</h3>
					<span>&nbsp;&nbsp;&nbsp;&nbsp;Created date: </span>
						<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{createdDateConverted}
				</div>
				<div className="perItemProjectCard-2">
					<div className="perItemProjectCard-2-1">
						<span>Admin name: </span>
						<br />&nbsp;&nbsp;{userFirstName}
					</div>
						
					<div className="perItemProjectCard-2-1">
						<span>End Date: </span>
						<br />&nbsp;&nbsp;{endDateConverted}
						<br />
						<br />
						{(deadlineNotif === true)
							?
								<span>7-day/less deadline</span>
							:
								<span>pending</span>
						}
						
					</div>
						
					<div className="perItemProjectCard-2-2">
						<span>Status: </span>
						<br />
						{(isActive === true)
							?
								<React.Fragment>&nbsp;&nbsp;
									<button className="buttonForProjectPageC">Active</button>
									<button className="buttonForProjectPageE" onClick={(a) => updateIsActiveToFalse(a)}>Done</button>
								</React.Fragment>
							:
								<React.Fragment>&nbsp;&nbsp;
									<button className="buttonForProjectPageE" onClick={(b) => updateIsActiveToTrue(b)}>Active</button>
									<button className="buttonForProjectPageD">Done</button>
								</React.Fragment>

						}
					</div>
				</div>
				<div className="perItemProjectCard-3">
					<button className="buttonForProjectPageB" onClick={() => openOrCloseUpdatePortion()}><IoMdCreate /> Update Project</button>
					<br />
					<button className="buttonForProjectPageB" onClick={() => openOrCloseAddTaskPortion()}><IoMdAdd /> Add Task</button>
					<br />
					<button className="buttonForProjectPageB" onClick={(q) => deleteProject(q)}><IoIosTrash /> Delete</button>
					<br />
				</div>

			</div>





			<div className="containerTasksListInProjectPage">
			
				{( openTableTasksList === false)
				?
					<button className="tableTaskListProjectPage-btn" onClick={() => openOrCloseOpenTableTasksList()}><IoIosArrowDown />&nbsp;&nbsp; Tasks List &nbsp;&nbsp;<IoIosArrowDown /></button>
				:
					<React.Fragment>
						<button className="tableTaskListProjectPage-btn" onClick={() => openOrCloseOpenTableTasksList()}><IoIosArrowUp />&nbsp;&nbsp; Tasks List &nbsp;&nbsp;<IoIosArrowUp /></button>
							<br />
						<table className="tableTaskListProjectPage">
							<thead>
								<tr>
									<th>Name</th>
									<th>Description</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{ listOfTasks }
							</tbody>
						</table>
					</React.Fragment>
				}
			</div>













			<ModalUpdateProject open={openUpdatePortion} onClose={() => setOpenUpdatePortion(false)}>
				<div className="containerForUpdateProjectModal">
					<form className="formHolderForUpdateProjectModal" onSubmit={(e) => updateProject(e)}>
						<div  className="updateProjectItems-1">
							<label>Project Name:</label>
							<input 
							  type="text"
							  value={projectNameToUpdate}
							  placeholder="Enter new project name here..."
							  onChange={(e) => setProjectNameToUpdate(e.target.value)}
							/>
						</div>
						<div  className="updateProjectItems-2">
							<label>Date End:</label>
							<DatePicker 
		                            onChange={onChangeDateEndToUpdate} 
		                            value={dateEndToUpdate}
		                        />
						</div>
						<div  className="updateProjectItems-3">
							<button className="buttonForUpdateProjectModal">Update Details</button>
						</div>
					</form>
				</div>
			</ModalUpdateProject>


















			<ModalAddTask open={openAddTaskPortion} onClose={() => setOpenAddTaskPortion(false)}>
				<div className="containerForUpdateProjectModal">
					<form className="formHolderForUpdateProjectModal" onSubmit={(z) => addTask(z)}>
						<div  className="updateProjectItems-1">
							<label>Task Name:  </label>
							<input 
							  type="text"
							  value={taskName}
							  placeholder="Enter new project name here..."
							  onChange={(z) => setTaskName(z.target.value)}
							/>
						</div>
						<div  className="updateProjectItems-1">
							<label>Description:  </label>
{/*							<input 
							  class="heighttext"
							  type="text"
							  value={description}
							  placeholder="Enter new project name here..."
							  onChange={(z) => setDescription(z.target.value)}
							/>*/}
							<textarea 
								id="w3review" 
								name="w3review" 
								rows="4" 
								cols="30"
								maxLength="30"
								value={description}
								placeholder="Enter description here..."
								onChange={(z) => setDescription(z.target.value)}
							>
							</textarea>
						</div>
						<div  className="updateProjectItems-1">
							<label>Assign members:  </label>
					        <select value={userAssignedInThisTaskId} onChange={handleChange} as="select">
					          {allUsersShow}
					        </select>
						</div>
						<div  className="updateProjectItems-3">
							<button className="buttonForUpdateProjectModal">Add Task</button>
						</div>
					</form>
				</div>
			</ModalAddTask>



            <ModalUpdateTaskB open={openUpdateTask} onClose={() => setOpenUpdateTask(false)}>
                <div className="subContUpdateTaskForPPModal-header">
                    <span className="subContUpdateTaskForPPModal-header-text01">Update Task here</span>
                </div>
                <div className="subContUpdateTaskForPPModal-body">
	                <form className="subContUpdateTaskForPPModal-body-a" onSubmit={(h) => updateTask(h)}>
	                    <div>
	                        <span className="subContUpdateTaskForPPModal-body-text01">Task Name:</span>
	                        <br />
	                        <input 
	                        	className="subContUpdateTaskForPPModal-body-textbox"
	                            type="text" 
	                            placeholder="Enter project" 
	                            value={taskNameToUpdate}
	                            onChange={(h) => setTaskNameToUpdate(h.target.value)}
	                            required
	                        />
	                    </div>
	                    <div>
	                        <span className="subContUpdateTaskForPPModal-body-text01">Description:</span>
	                        <br />
	                        <input
	                        	className="subContUpdateTaskForPPModal-body-textbox"
	                            type="text" 
	                            placeholder="Enter project"
	                            value={descriptionToUpdate}
	                            onChange={(h) => setDescriptionToUpdate(h.target.value)}
	                            required
	                        />
	                    </div>

	                    <div>
	                      <button className="updateTaskForPPModal-btn-updateTask">Update Task</button>
	                      
	                    </div>
	                </form>
	                <div className="subContUpdateTaskForPPModal-body-b">
	                    <span className="subContUpdateTaskForPPModal-body-text01">Status:</span>
	                    <div className="subContUpdateTaskForPPModal-statusBtns">
							{(statusToUpdate === "pending")
							?
								<React.Fragment>
									<button className="buttonForTaskPageC">Pending</button>
									<button className="buttonForTaskPageF" onClick={(h) => updateStatusToOngoing(h)}>Ongoing</button>
									<button className="buttonForTaskPageF" onClick={(h) => updateStatusToDone(h)}>Done</button>
								</React.Fragment>

							:

								(statusToUpdate === "ongoing")
								?
									<React.Fragment>
										<button className="buttonForTaskPageF" onClick={(h) => updateStatusToPending(h)}>Pending</button>
										<button className="buttonForTaskPageD">Ongoing</button>
										<button className="buttonForTaskPageF" onClick={(h) => updateStatusToDone(h)}>Done</button>
									</React.Fragment>
								:
									(statusToUpdate === "done")
									?
										<React.Fragment>
											<button className="buttonForTaskPageF" onClick={(h) => updateStatusToPending(h)}>Pending</button>
											<button className="buttonForTaskPageF" onClick={(h) => updateStatusToOngoing(h)}>Ongoing</button>
											<button className="buttonForTaskPageE">Done</button>
										</React.Fragment>
									:
										<React.Fragment>
											<button className="buttonForTaskPageF">Pending</button>
											<button className="buttonForTaskPageF">Ongoing</button>
											<button className="buttonForTaskPageF">Done</button>
										</React.Fragment>
							}
	                	</div>
	                </div>
                </div>
                <div className="subContUpdateTaskForPPModal-footer">
                	<button className="updateTaskForPPModal-btn" onClick={() => openOrCloseOpenUpdateTask()}>Close</button>
                </div>
            </ModalUpdateTaskB>




		</div>
	)
}






ProjectCard.propTypes = {
	// shape() - used to check that the prop conforms to a specific
	projectProp: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		projectName: PropTypes.string.isRequired,
		dateCreated: PropTypes.string.isRequired,
		adminId: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired
	})
}



                        // <label>Date End</label>
                        // <br />
                        // <DatePicker 
                        //     onChange={onChangeDateEnd} 
                        //     value={dateEnd}
                        // />
                        // <br />
                        // <br />