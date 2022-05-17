import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/style.masterplan.css'
import { IoMdCreate,  IoIosTrash, IoMdAdd } from "react-icons/io";
import ModalUpdateProject from './ModalUpdateProject';
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

	const [ openUpdatePortion, setOpenUpdatePortion ] = useState(false)
	const [ openAddTaskPortion, setOpenAddTaskPortion ] = useState(false)


	const [ createdDateConverted, setCreatedDateConverted ] = useState('')
	const [ endDateConverted, setEndDateConverted ] = useState('')

	const [ isActiveToFalse, setIsActiveToFalse ] = useState(false)
	const [ isActiveToTrue, setIsActiveToTrue ] = useState(true)

	const [ deadlineNotif, setDeadlineNotif ] = useState(false)







	const openOrCloseUpdatePortion = () => {
		setOpenUpdatePortion(prev => !prev);
		setOpenAddTaskPortion(false);
	};

	const openOrCloseAddTaskPortion = () => {
		setOpenAddTaskPortion(prev => !prev);
		setOpenUpdatePortion(false);
		// console.log(projectProp._id)
		// console.log(userAssignedInThisTaskId)
		// console.log(user.id)
	};

	const onChangeDateEndToUpdate = dateEndToUpdate => {
		setDateEndToUpdate(dateEndToUpdate)
	}	
	const onChangeUserAssignedInThisTaskId = z => {
		setUserAssignedInThisTaskId(z)
		// console.log(userAssignedInThisTaskId)
	}



















// ----------------------- drop down for "Assign member" ----------------//

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

// ----------------------- END drop down for "Assign member" ----------------//


























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
	                'Push LOAD PROJECTS button!',
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
					<button className="buttonForProjectPageB"><IoIosTrash /> Delete</button>
					<br />
				</div>
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