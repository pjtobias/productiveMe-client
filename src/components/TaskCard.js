import React, { useState, useEffect, useContext }from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import '../css/style.masterplan.css'
import { IoMdCreate,  IoIosTrash, IoMdAdd } from "react-icons/io";
import ModalUpdateTask from './ModalUpdateTask';


export default function TaskCard ({ taskProp }) {
	const { _id, taskName, status, description, projectThisTaskBelongToId, userAssignedInThisTaskId, adminOfThisProjectId } = taskProp
	const [ openUpdatePortion, setOpenUpdatePortion ] = useState(false)

	const [ updateTaskId, setUpdateTaskId ] = useState('')
	const [ updateTaskName, setUpdateTaskName ] = useState('')
	const [ updateDescription, setUpdateDescription ] = useState('')

	const openOrCloseOpenUpdatePortion = () => {
		setOpenUpdatePortion(prev => !prev);
		// console.log(updateTaskId)
		// console.log(updateTaskName)
		// console.log(updateDescription)
	};




















	useEffect(() => {
		// console.log(updateTaskId)
		// console.log(updateTaskName)
		// console.log(updateDescription)
	}, [])

	useEffect(() => {
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/tasks/getSpecificTask`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskId: taskProp._id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
			setUpdateTaskName(data.taskName)
			setUpdateDescription(data.description)
	    })
	}, [])

























	function updateTask(e) {
		e.preventDefault()
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/tasks/updateTask`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskId: taskProp._id,
					taskName: updateTaskName,
					description: updateDescription
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
	            setOpenUpdatePortion(false)
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


	function updateStatusToPending(a) {
		a.preventDefault()
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/tasks/updateStatusToPending`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskId: taskProp._id,
					status: "pending"
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
	            Swal.fire(
	                'Changed it to pending!',
	                'It s okay, you can start it again later!',
	                'success'
	            )
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


	function updateStatusToOngoing(b) {
		b.preventDefault()
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/tasks/updateStatusToOngoing`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskId: taskProp._id,
					status: "ongoing"
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
	            Swal.fire(
	                'Changed it to ongoing!',
	                'This task is on!',
	                'success'
	            )
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


	function updateStatusToDone(c) {
		c.preventDefault()
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/tasks/updateStatusToDone`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					taskId: taskProp._id,
					status: "done"
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
	            Swal.fire(
	                'Changed it to done!',
	                'Nice, You`re done with this task!',
	                'success'
	            )
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






























// onClick={(b) => updateIsActiveToTrue(b)}

	return (
		<div>
				{/*<div className="containerForTaskPage">*/}
					<div className="containerItemsTaskCard">
						<div className="peritemTaskCard-1">
							<span><b>{taskName}</b></span>
						</div>
						<div className="peritemTaskCard-2">
							<span>Description: </span>
							<br />&nbsp;&nbsp;<i>{description}</i>
							<br /><br /><span>Status: </span>
							<br />&nbsp;&nbsp;{/*<i>{status}</i>*/}
							{(status === "pending")
							?
								<React.Fragment>&nbsp;&nbsp;
									<button className="buttonForTaskPageC">Pending</button>
									<button className="buttonForTaskPageF" onClick={(b) => updateStatusToOngoing(b)}>Ongoing</button>
									<button className="buttonForTaskPageF" onClick={(c) => updateStatusToDone(c)}>Done</button>
								</React.Fragment>

							:

								(status === "ongoing")
								?
									<React.Fragment>&nbsp;&nbsp;
										<button className="buttonForTaskPageF" onClick={(a) => updateStatusToPending(a)}>Pending</button>
										<button className="buttonForTaskPageD">Ongoing</button>
										<button className="buttonForTaskPageF" onClick={(c) => updateStatusToDone(c)}>Done</button>
									</React.Fragment>
								:
									<React.Fragment>&nbsp;&nbsp;
										<button className="buttonForTaskPageF" onClick={(a) => updateStatusToPending(a)}>Pending</button>
										<button className="buttonForTaskPageF" onClick={(b) => updateStatusToOngoing(b)}>Ongoing</button>
										<button className="buttonForTaskPageE">Done</button>
									</React.Fragment>
							}
						</div>
						<div className="peritemTaskCard-3">
							<button className="buttonForTaskPageB" onClick={() => openOrCloseOpenUpdatePortion()}><IoMdCreate /> Update Task</button>
						</div>
					</div>
				{/*</div>		*/}











			<ModalUpdateTask open={openUpdatePortion} onClose={() => setOpenUpdatePortion(false)}>
				<div className="">
					<form className="containerForUpdateTaskModal" onSubmit={(e) => updateTask(e)}>
						<div  className="formHolderForUpdateTaskModal updateTaskItems-1">
							<label>Task Name:</label><br />
							<input 
							  type="text"
							  value={updateTaskName}
							  placeholder="Enter new task name here..."
							  onChange={(e) => setUpdateTaskName(e.target.value)}
							/>
						</div>
						<div  className="formHolderForUpdateTaskModal updateTaskItems-2">
							<label>Description:</label><br />
							<textarea 
								rows="4" 
								cols="30"
								maxLength="30"
								value={updateDescription}
								placeholder="Enter description here..."
								onChange={(e) => setUpdateDescription(e.target.value)}
							>
							</textarea>
						</div>
						<div  className="formHolderForUpdateTaskModal updateTaskItems-3">
							<button className="buttonForUpdateTaskModal">Update</button>
						</div>
					</form>
				</div>
			</ModalUpdateTask>










		</div>
	)
}



TaskCard.propTypes = {
	// shape() - used to check that the prop conforms to a specific
	taskProp: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		taskName: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		projectThisTaskBelongToId: PropTypes.string.isRequired,
		userAssignedInThisTaskId: PropTypes.string.isRequired,
		adminOfThisProjectId: PropTypes.string.isRequired
	})
}