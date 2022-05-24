import React from 'react';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext'
import DatePicker from 'react-date-picker';
import '../css/style.masterplan.css'
import '../css/style.project.css'
import Popup from 'reactjs-popup';
import { IoIosRefresh } from "react-icons/io";
import PropTypes from 'prop-types';
import Axios from 'axios'
import ProjectCard from '../components/ProjectCard';
import styled from 'styled-components';
import { ModalAddProject } from '../components/ModalAddProject';
import ModalAddProjectB from '../components/ModalAddProjectB';
import Swal from 'sweetalert2';
const moment = require('moment')




const Project = () => {
	const [ value, onChange ] = useState(new Date());
	const { user } = useContext(UserContext)
	const [ getProjects, setGetProjects ] = useState([])

	const [ listOfActiveProjects, setListOfActiveProjects ] = useState([])
	const [ listOfDoneProjects, setListOfDoneProjects ] = useState([])
	const [ listOfProjectsNearDeadline, setListOfProjectsNearDeadline ] = useState([])

	const [ listToShow,  setListToShow ] = useState([])
	const [ listToShowHandler,  setListToShowHandler ] = useState('all')
	const [ firstListToShow,  setFirstListToShow ] = useState(true)

	const [ aToZ,  setAToZ ] = useState(true)

	const [ searchThisName, setSearchThisName ] = useState('')

		// Adding Project //
	const [ projectName, setProjectName ] = useState('')
	const [ dateCreated, setDateCreated ] = useState(new Date())
	const [ dateEnd, setDateEnd ] = useState('')
	const [ adminId, setAdminId ] = useState('')


  


	














		// for Modal Controls //
	const [ openAddProjectB, setOpenAddProjectB ] = useState(false)
	const openOrCloseAddProjectB = () => {
		setOpenAddProjectB(prev => !prev);
		setDateEnd('')
		setProjectName('')
	};

	const [ showModal, setShowModal ] = useState(false);
	const openModal = () => {
		setShowModal(prev => !prev);
	};
		// END for Modal Controls //
























		// for refresh of page //

	const [ refresh, setRefresh ] = useState(false)
	function refreshNow() {
		setRefresh(prev => !prev);
	}
 	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getProject`, {
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
	    	setGetProjects(data)
	    })



		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getAllActiveProjects`, {
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
	    	console.log(data)
	    	setListOfActiveProjects(data)
	    })


		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getAllDoneProjects`, {
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
	    	setListOfDoneProjects(data)
	    })
	}, [refresh])

		// END for refresh of page //
















































	// -------- Counting and show of Active, Done and All Projects

	const atozAllProjects = getProjects.sort((a, b) => {
		if(a.projectName < b.projectName) {
			return -1 
		} else if (a.projectName > b.projectName) {
			return 1
		} else {
			return 0
		}
	})
	const listOfProjectsAtoz = atozAllProjects.map(ewan => {
		return (
			<ProjectCard
			  key={ewan._id}
			  projectProp={ewan}
			/>
		)
	})
	const ztoaAllProjects = getProjects.sort((a, b) => {
		if(a.projectName < b.projectName) {
			return 1 
		} else if (a.projectName > b.projectName) {
			return -1
		} else {
			return 0
		}
	})
	const listOfProjectsZtoa = ztoaAllProjects.map(ewan => {
		return (
			<ProjectCard
			  key={ewan._id}
			  projectProp={ewan}
			/>
		)
	})





	const countAllActiveProjectsA = listOfActiveProjects.filter(ewan => ewan.isActive === true)
	const countAllActiveProjectsB = countAllActiveProjectsA.length

	const atozActiveProjects = listOfActiveProjects.sort((a, b) => {
		if(a.projectName < b.projectName) {
			return -1 
		} else if (a.projectName > b.projectName) {
			return 1
		} else {
			return 0
		}
	})
	const showActiveProjectsAtoz = atozActiveProjects.map(ewan => {
		return (
			<ProjectCard
			  key={ewan._id}
			  projectProp={ewan}
			/>
		)
	})
	const ztoaActiveProjects = listOfActiveProjects.sort((a, b) => {
		if(a.projectName < b.projectName) {
			return 1 
		} else if (a.projectName > b.projectName) {
			return -1
		} else {
			return 0
		}
	})
	const showActiveProjectsZtoa = ztoaActiveProjects.map(ewan => {
		return (
			<ProjectCard
			  key={ewan._id}
			  projectProp={ewan}
			/>
		)
	})




	const countAllDoneProjectsA = listOfDoneProjects.filter(ewan => ewan.isActive === false)
	const countAllDoneProjectsB = countAllDoneProjectsA.length

	const atozDoneProjects = listOfDoneProjects.sort((a, b) => {
		if(a.projectName < b.projectName) {
			return -1 
		} else if (a.projectName > b.projectName) {
			return 1
		} else {
			return 0
		}
	})
	const showDoneProjectsAtoz = atozDoneProjects.map(ewan => {
		return (
			<ProjectCard
			  key={ewan._id}
			  projectProp={ewan}
			/>
		)
	})
	const ztoaDoneProjects = listOfDoneProjects.sort((a, b) => {
		if(a.projectName < b.projectName) {
			return 1 
		} else if (a.projectName > b.projectName) {
			return -1
		} else {
			return 0
		}
	})
	const showDoneProjectsZtoa = ztoaDoneProjects.map(ewan => {
		return (
			<ProjectCard
			  key={ewan._id}
			  projectProp={ewan}
			/>
		)
	})


	useEffect(() => {
		if ( listToShowHandler === 'all' && aToZ === true) {
			setListToShow(listOfProjectsAtoz)
		} else if ( listToShowHandler === 'all' && aToZ === false) {
			setListToShow(listOfProjectsZtoa)
		} else if ( listToShowHandler === 'active' && aToZ === true) {
			setListToShow(showActiveProjectsAtoz)
		} else if ( listToShowHandler === 'active' && aToZ === false) {
			setListToShow(showActiveProjectsZtoa)
		} else if ( listToShowHandler === 'done' && aToZ === true) {
			setListToShow(showDoneProjectsAtoz)
		} else if ( listToShowHandler === 'done' && aToZ === false) {
			setListToShow(showDoneProjectsZtoa)
		} else {
			setListToShow(listOfProjectsAtoz)
		}
		// console.log(listToShow)
	}, [listToShowHandler, aToZ, firstListToShow])

	const showActiveBtn = () => {
		setListToShowHandler('active')
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

	// -------- END Counting and show of Active, Done and All Projects



	const searchedName = getProjects.filter((ewan) => {
		if (searchThisName === '') {
			return ewan
		} else if (ewan.projectName.toLowerCase().includes(searchThisName.toLowerCase())) {
			return ewan
		} 
	}).map((ewan, key) => {
		return (
			<ProjectCard
			  key={ewan._id}
			  projectProp={ewan}
			/>
		)
	})



	



























	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getAllActiveProjects`, {
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
	    	setListOfActiveProjects(data)
	    })
	}, [])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getAllDoneProjects`, {
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
	    	if(data === null) {
	    		setListOfDoneProjects([])
	    	} else {
	    		setListOfDoneProjects(data)
	    	}
	    })
	}, [])


	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getProject`, {
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
	    	setGetProjects(data)
	    	// console.log(data)
	    })
	}, [])

	




// ------------- AXIOS http request -------------
// ------------- This also WORKS -------------
	// useEffect(() => {
	// 	console.log(user.id)
	// 	Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getProject`, {
	// 		 adminId: user.id 
	// 	})
	// 		.then((response) => {
	// 			console.log(response.data)
	// 			setGetProjects(response.data)
	// 		})
	// }, [])
// ------------- end AXIOS http request -------------

// value={}
// onChange={(e) => setProjectNameToUpdate(e.target.value)
































	const onChangeDateEnd = dateEnd => {
		setDateEnd(dateEnd)
	}

	function addProject(h) {
		h.preventDefault();
		if( dateEnd === '') {
	        Swal.fire({
	            icon: 'error',
	            title: 'Oops...',
	            text: 'No Date Entered!',
	        })
		} else {
			fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/addProject`, 
			    {
			        method: 'POST',
			        headers: {
			            'Content-Type': 'application/json'
			        },
			        body: JSON.stringify({
			            projectName: projectName,
			            dateCreated: dateCreated,
			            dateEnd: dateEnd,
			            adminId: user.id
			        })
			    }
			)
			.then(res => res.json())
			.then(data => {
			    Swal.fire(
			        'Added a project Successfully!',
			        'You can sign-in now!',
			        'success'
			    )
			    openOrCloseAddProjectB()
			    refreshNow()
			})
		}

	}

	const loadProject = (q) => {
		q.preventDefault()
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getProject`, {
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
	    	setGetProjects(data)
	    })



		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getAllActiveProjects`, {
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
	    	console.log(data)
	    	setListOfActiveProjects(data)
	    })


		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/getAllDoneProjects`, {
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
	    	setListOfDoneProjects(data)
	    })
	}
























	return (
		<React.Fragment>
		<div className="ContainerForProjectPage">
			<div className="ContainerForProjectPageHeader">
				<div className="ContainerForProjectPageHeader-a">
					<h1 className="containerForProjectPageHeader-aa">Project page</h1>
					<div className="containerForProjectPageHeader-ab">
						<div className="containerForProjectPageHeader-aba">
							{/*<button className="buttonForProjectPageA" onClick={openModal}>Add project</button>*/}
							<button className="buttonForProjectPageA" onClick={() => openOrCloseAddProjectB()}>Add project</button>
							<button className="buttonForProjectPageF" onClick={(q) => loadProject(q)}><IoIosRefresh /></button>
						</div>
						<div className="containerForProjectPageHeader-abb">
							<div className="containerForProjectPageHeader-abba">
								{( aToZ === true )
									?
										<button className="buttonForProjectPageH-atoz" onClick={() => aToZToTrueBtn()}>a-z</button>
									:
										<button className="buttonForProjectPageG-atoz" onClick={() => aToZToTrueBtn()}>a-z</button>
								}


								{( aToZ === true )
									?
										<button className="buttonForProjectPageG-atoz" onClick={() => aToZToFalseBtn()}>z-a</button>
									:
										<button className="buttonForProjectPageH-atoz" onClick={() => aToZToFalseBtn()}>z-a</button>
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
				<div className="ContainerForProjectPageHeader-b">
					<div className="ContainerForProjectPageHeader-b-a">
						
						{ ( listToShowHandler === 'active')
							?
								<button className="buttonForProjectPageJ" onClick={() => showAllBtn()}>Total Active:</button>
							:
								<button className="buttonForProjectPageI" onClick={() => showActiveBtn()}>Total Active:</button>
						}
						<h3>{ countAllActiveProjectsB }</h3>
					</div>
					<div className="ContainerForProjectPageHeader-b-a">
						{ ( listToShowHandler === 'done')
							?
								<button className="buttonForProjectPageJ" onClick={() => showAllBtn()}>Total Done:</button>
							:
								<button className="buttonForProjectPageI" onClick={() => showDoneBtn()}>Total Done:</button>
						}
						<h3>{ countAllDoneProjectsB }</h3>
					</div>
				</div>
			</div>
			










			<ModalAddProject showModal={showModal} setShowModal={setShowModal} />
			{( searchThisName === '' )
				?
					( firstListToShow === true )
					?
						<div>{ listOfProjectsAtoz }</div>
					:
						<div>{ listToShow }</div>
				:
					<div>{ searchedName }</div>
			}




            <ModalAddProjectB open={openAddProjectB} onClose={() => setOpenAddProjectB(false)}>

                <div className="subContAddProjectBModal-header">
                  <span className="subContAddProjectBModal-header-text01">Add project here</span>

                </div>

                <form className="subContAddProjectBModal-body" onSubmit={(h) => addProject(h)}>
                    <div>
                        <span className="subContAddProjectBModal-body-text01">Project Name</span>
                        <br />
                        <input 
                        	className="subContAddProjectBModal-body-textbox"
                            type="text" 
                            placeholder="Enter project" 
                            // value={email}
                            onChange={(h) => setProjectName(h.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <span className="subContAddProjectBModal-body-text01">Date End</span>
                        <br />
                        <DatePicker 
                        	className="subContAddProjectBModal-body-datePicker"
                            onChange={onChangeDateEnd} 
                            value={dateEnd}
                        />
                        <br />
                        <br />
                    </div>
                    <div>
                      <button className="addProjectBModal-btn-addProject">Add project</button>
                      
                    </div>
                </form>

                <div className="subContAddProjectBModal-footer">
                	<button className="addProjectBModal-btn-close" onClick={() => openOrCloseAddProjectB(prev => !prev)}>Close</button>
                </div>

            </ModalAddProjectB>




















	
		</div>
		</React.Fragment>
	)
}

export default Project;





