import React from 'react';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext'
import '../css/style.inbox.css'
import '../css/style.css'
import ConversationCard from '../components/ConversationCard';
import MessageCard from '../components/MessageCard';
import ModalAddConversation from '../components/ModalAddConversation';
import ModalUpdateConversation from '../components/ModalUpdateConversation';
import Swal from 'sweetalert2';
import { IoIosMore } from "react-icons/io";







const Inbox = () => {
	const { user } = useContext(UserContext)

				// displaying purposes //
	const [ getConversations, setGetConversations ] = useState([])
	const [ getConversationsNonAdmin, setGetConversationsNonAdmin ] = useState([])
	const [ getAllConversations, setGetAllConversations ] = useState([])
	const [ getAllUsers, setGetAllUsers ] = useState([])
	const [ getMessages, setGetMessages ] = useState([])
	const [ whichConvoToShowId, setWhichConvoToShowId ] = useState('')
	const [ contactsInAConvo, setContactsInAConvo] = useState([])

				// send message //
	const [ messageBody, setMessageBody ] = useState('')
	const [ dateCreatedMessage, setDateCreatedMessage ] = useState(new Date())
	const [ convoNameDisplay, setConvoNameDisplay ] = useState('...')

				// btns in conversation div //
	const [ btnConvoState, setBtnConvoState ] = useState('')
	const [ activeConvo, setActiveConvo ] = useState('')

				// update convo //
	const [ toBeUpdatedConvoId, setToBeUpdatedConvoId ] = useState('')
	const [ toBeUpdatedConvoName, setToBeUpdatedConvoName ] = useState('')
	const [ updateConversationName, setUpdateConversationName ] = useState('')

				// create convo //
	const [ conversationName, setConversationName ] = useState('')
	const [ dateCreated, setDateCreated ] = useState(new Date())

				// add contact //
	const [ contactPersonName, setContactPersonName ] = useState('')
	const [ contactPersonId, setContactPersonId ] = useState('')
	const [ convoThisContactBelongToId, setConvoThisContactBelongToId ] = useState('')

	const [ refresh, setRefresh ] = useState(true)
	const refreshNow = () => {
		setRefresh(prev => !prev);
	};
	
	



				// modals controls //
	const [ openAddConversation, setOpenAddConversation ] = useState(false)
	const openOrCloseAddConversation = () => {
		setOpenAddConversation(prev => !prev);
		if( openAddConversation === false ) {
			setConversationName("")
		}
	};

	const [ openUpdateConversation, setOpenUpdateConversation ] = useState(false)
	const openOrCloseUpdateConversation = () => {
		setOpenUpdateConversation(prev => !prev);
		// setToBeUpdatedConvo('')
		// setToBeUpdatedConvoName('')
		// console.log(toBeUpdatedConvoId)
		// console.log(toBeUpdatedConvoName)
	};

























//--------------- Displaying Conversation List
	const convoToBeShownA = getConversations.sort((a, b) => {
		if(a.conversationName < b.conversationName) {
			return 1 //element will going to the right
		} else if (a.conversationName > b.conversationName) {
			return -1 //element will going to the left
		} else {
			return 0
		}
	})
	const listOfConversations = convoToBeShownA.map(ewan => {
		return (
			<div>
			{( activeConvo === whichConvoToShowId )
				?
					( activeConvo === '' )
						?
							<div className="containerConversationCard-btns">
								<button className="conversationCard-btn-1" onClick={() => (setWhichConvoToShowId(ewan._id),
									setConvoNameDisplay(ewan.conversationName),
									setActiveConvo(ewan._id)
									)}>
									<ConversationCard
									  key={ewan._id}
									  conversationProp={ewan}
									/>
								</button>
								<button className="conversationCard-btn-3"  onClick={() => (
									openOrCloseUpdateConversation(),
									setToBeUpdatedConvoId(ewan._id),
									setToBeUpdatedConvoName(ewan.conversationName)
								)}>
									<IoIosMore />
								</button>
							</div>
						:
							( activeConvo === ewan._id )
							?
								<div className="containerConversationCard-btns">
									<button className="conversationCard-btn-2" onClick={() => (setWhichConvoToShowId(''),
										setConvoNameDisplay('...'),
										setActiveConvo(''),
										setConvoThisContactBelongToId('')
										)}>
										<ConversationCard
										  key={ewan._id}
										  conversationProp={ewan}
										/>
									</button>
									<button className="conversationCard-btn-3"  onClick={() => (
										openOrCloseUpdateConversation(),
										setToBeUpdatedConvoId(ewan._id),
										setToBeUpdatedConvoName(ewan.conversationName)
									)}>
										<IoIosMore />
									</button>
								</div>	
							:
								<div className="containerConversationCard-btns">							
									<button className="conversationCard-btn-1" onClick={() => (setWhichConvoToShowId(ewan._id),
										setConvoNameDisplay(ewan.conversationName),
										setActiveConvo(ewan._id)
										)}>
										<ConversationCard
										  key={ewan._id}
										  conversationProp={ewan}
										/>
									</button>
									<button className="conversationCard-btn-3"  onClick={() => (
										openOrCloseUpdateConversation(),
										setToBeUpdatedConvoId(ewan._id),
										setToBeUpdatedConvoName(ewan.conversationName)
									)}>
										<IoIosMore />
									</button>
								</div>
				:
					<div className="containerConversationCard-btns">
						<button className="conversationCard-btn-1" onClick={() => (setWhichConvoToShowId(ewan._id),
							setConvoNameDisplay(ewan.conversationName),
							setActiveConvo(ewan._id)
							)}>
							<ConversationCard
							  key={ewan._id}
							  conversationProp={ewan}
							/>
						</button>
						<button className="conversationCard-btn-3"  onClick={() => (
							openOrCloseUpdateConversation(),
							setToBeUpdatedConvoId(ewan._id),
							setToBeUpdatedConvoName(ewan.conversationName)
						)}>
							<IoIosMore />
						</button>
					</div>					
			}
			</div>
		)
	})

	const convoToBeShownB = getConversationsNonAdmin.sort((a, b) => {
		if(a.conversationName < b.conversationName) {
			return 1 //element will going to the right
		} else if (a.conversationName > b.conversationName) {
			return -1 //element will going to the left
		} else {
			return 0
		}
	})
	const listOfConversationsNonAdmin = convoToBeShownB.map(ewan => {
		return (
			<div>
			{( activeConvo === whichConvoToShowId )
				?
					( activeConvo === '' )
						?
							<div className="containerConversationCard-btns">
								<button className="conversationCard-btn-1" onClick={() => (setWhichConvoToShowId(ewan._id),
									setConvoNameDisplay(ewan.conversationName),
									setActiveConvo(ewan._id)
									)}>
									<ConversationCard
									  key={ewan._id}
									  conversationProp={ewan}
									/>
								</button>
								<button className="conversationCard-btn-3"  onClick={() => (
									openOrCloseUpdateConversation(),
									setToBeUpdatedConvoId(ewan._id),
									setToBeUpdatedConvoName(ewan.conversationName)
								)}>
									<IoIosMore />
								</button>
							</div>
						:
							( activeConvo === ewan._id )
							?
								<div className="containerConversationCard-btns">
									<button className="conversationCard-btn-2" onClick={() => (setWhichConvoToShowId(''),
										setConvoNameDisplay('...'),
										setActiveConvo(''),
										setContactPersonName(''),
										setContactPersonId(''),
										setConvoThisContactBelongToId('')
										)}>
										<ConversationCard
										  key={ewan._id}
										  conversationProp={ewan}
										/>
									</button>
									<button className="conversationCard-btn-3"  onClick={() => (
										openOrCloseUpdateConversation(),
										setToBeUpdatedConvoId(ewan._id),
										setToBeUpdatedConvoName(ewan.conversationName)
									)}>
										<IoIosMore />
									</button>							</div>
							:
								<div className="containerConversationCard-btns">
									<button className="conversationCard-btn-1" onClick={() => (setWhichConvoToShowId(ewan._id),
										setConvoNameDisplay(ewan.conversationName),
										setActiveConvo(ewan._id)
										)}>
										<ConversationCard
										  key={ewan._id}
										  conversationProp={ewan}
										/>
									</button>
									<button className="conversationCard-btn-3"  onClick={() => (
										openOrCloseUpdateConversation(),
										setToBeUpdatedConvoId(ewan._id),
										setToBeUpdatedConvoName(ewan.conversationName)
									)}>
										<IoIosMore />
									</button>
								</div>
							
				:
					<div className="containerConversationCard-btns">
						<button className="conversationCard-btn-1" onClick={() => (setWhichConvoToShowId(ewan._id),
							setConvoNameDisplay(ewan.conversationName),
							setActiveConvo(ewan._id)
							)}>
							<ConversationCard
							  key={ewan._id}
							  conversationProp={ewan}
							/>
						</button>
						<button className="conversationCard-btn-3"  onClick={() => (
							openOrCloseUpdateConversation(),
							setToBeUpdatedConvoId(ewan._id),
							setToBeUpdatedConvoName(ewan.conversationName)
						)}>
							<IoIosMore />
						</button>
					</div>
							
			}
			</div>
		)
	})
//--------------- END Displaying Conversation List


//--------------- Displaying Messages
	const messagesToBeShownA = getMessages.sort((a, b) => {
		if(a.dateCreatedMessage < b.dateCreatedMessage) {
			return 1 //element will going to the right // original 1 here
		} else if (a.dateCreatedMessage > b.dateCreatedMessage) {
			return -1 //element will going to the left // original -1 here
		} else {
			return 0
		}
	})
	const listOfMessages = messagesToBeShownA.map(ewan => {
		return (
				<MessageCard
				  key={ewan._id}
				  messageProp={ewan}
				/>
		)
	})	
//--------------- END Displaying Messages


//--------------- Displaying Contact list
	const userToBeShownA = getAllUsers.sort((a, b) => {
		if(a.conversationName < b.conversationName) {
			return 1 //element will going to the right
		} else if (a.conversationName > b.conversationName) {
			return -1 //element will going to the left
		} else {
			return 0
		}
	})
	const listOfUsers = userToBeShownA.map(ewan => {
		return (
			<div className="containerContactsCard">	
			{ ( contactPersonId === ewan._id)
				?
					<button className="contactsCard-btn-02" onClick={() => (
						setContactPersonName(''),
						setContactPersonId(''),
						setConvoThisContactBelongToId('')
					)}>
						<span className="contacts-text01">{ewan.firstName} {ewan.lastName}<br /></span>
					</button>
				:
					<button className="contactsCard-btn-01" onClick={() => (
						setContactPersonName(ewan.firstName),
						setContactPersonId(ewan._id),
						setConvoThisContactBelongToId(whichConvoToShowId)
						// ,console.log(whichConvoToShowId)
					)}>
						<span className="contacts-text01">{ewan.firstName} {ewan.lastName}<br /></span>
					</button>
			}

			</div>
		)
	})
//--------------- END Displaying Contact list

//--------------- Displaying Contacts in a Convo list
	const contactsToBeShownA = contactsInAConvo.sort((a, b) => {
		if(a.contactPersonName < b.contactPersonName) {
			return 1 //element will going to the right
		} else if (a.contactPersonName > b.contactPersonName) {
			return -1 //element will going to the left
		} else {
			return 0
		}
	})
	const listOfContactsInAConvo = contactsToBeShownA.map(ewan => {
		return (
			<span className="contacts-text01">{ewan.contactPersonName}<br /></span>

		)
	})
//--------------- END Displaying Contacts in a Convo list
























 




	useEffect(() => {
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/conversations/getConversationsThruAdminId`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					ownerOfThisConvoId: user.id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setGetConversations(data)
	    	// console.log(data)
	    })
	}, [refresh])




	useEffect(() => {
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/conversations/getAllConversation`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setGetAllConversations(data)
	    	// console.log(data)
	    })
	}, [refresh])


	useEffect(() => {
		// console.log(whichConvoToShowId)
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/messages/getMessagesThruConvoId`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					convoItBelongstoId: whichConvoToShowId
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setGetMessages(data)
	    	// console.log(data)
	    })
	}, [whichConvoToShowId, refresh])


	useEffect(() => {
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/users/getAllUsers`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setGetAllUsers(data)
	    })
	}, [])


	useEffect(() => {
		// console.log()
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/contacts/getListOfConvoIdsThruContactPersonId`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					contactPersonId: user.id
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	// console.log(data)
	    	// setGetConversationsNonAdmin(data)

			// for (let i = 0; i < data.length; i++) {
				// console.log(data[0].convoThisContactBelongToId)
				fetch(`${process.env.REACT_PUBLIC_API_URL}/api/conversations/getConversationsThruConvoId`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							convoItBelongstoId: data[0].convoThisContactBelongToId
						})
			    })
			    .then(res => res.json())
			    .then(data => {
			    	setGetConversationsNonAdmin(data)
			    	// console.log(getConversationsNonAdmin)
			    })
			// }
	    })
	}, [refresh])

	useEffect(() => {
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/contacts/getListContactInAConvo`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					convoThisContactBelongToId: whichConvoToShowId
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	setContactsInAConvo(data)
	    	// console.log(data)
	    })
	})






















	function addMessage(e) {
		e.preventDefault();
		setDateCreatedMessage(new Date())
		if( whichConvoToShowId !== '' ) {
			fetch(`${process.env.REACT_PUBLIC_API_URL}/api/messages/addMessage`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						messageBody: messageBody,
						dateCreatedMessage: dateCreatedMessage,
						convoItBelongstoId: whichConvoToShowId,
						senderOfThisMessageId: user.id
					})
				}
			)
			.then(res => res.json())
			.then(data => {
		        // Swal.fire(
		        //     'Message sent!',
		        //     'Nice!',
		        //     'success'
		        // )
		        // console.log("message sent")
		        setMessageBody('')
		        refreshNow()
			})	
		} else {
	        Swal.fire({
	            icon: 'error',
	            title: 'Oops...',
	            text: 'Select a Conversation first!'
	        })
		}

	}

	function addConversation(z) {
		z.preventDefault();
		setDateCreatedMessage(new Date())
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/conversations/addConversation`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					conversationName: conversationName,
					dateCreated: dateCreated,
					ownerOfThisConvoId: user.id
				})
			}
		)
		.then(res => res.json())
		.then(data => {
	        Swal.fire(
	            'Added a Conversation Successfully!',
	            'Nice!',
	            'success'
	        )

			fetch(`${process.env.REACT_PUBLIC_API_URL}/api/messages/addMessageAsReport`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						messageBody: `Successfully added "${data.conversationName}" Conversation`,
						dateCreatedMessage: dateCreatedMessage,
						convoItBelongstoId: data._id,
						senderOfThisMessageId: user.id
					})
				}
			)
			.then(res => res.json())
			.then(data => {
				// made it empty
			})

			refreshNow()
			openOrCloseAddConversation()
		}) 
	}


	function addContact(g) {
		g.preventDefault();
		// console.log(contactPersonId)
		// console.log(activeConvo)
		setDateCreatedMessage(new Date())

		if( convoThisContactBelongToId !== '' ) {
			fetch(`${process.env.REACT_PUBLIC_API_URL}/api/conversations/getConversationsThruConvoId`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						convoItBelongstoId: activeConvo
					})
				}
			)
			.then(res => res.json())
			.then(data => {
				// console.log(data[0].ownerOfThisConvoId)
				if( data[0].ownerOfThisConvoId === contactPersonId ) {
			        Swal.fire({
			            icon: 'error',
			            title: 'Oops...',
			            text: 'You are the Admin of this Conversation!'
			        })
				} else {



					fetch(`${process.env.REACT_PUBLIC_API_URL}/api/contacts/doesThisContactExistInThisConvo`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								contactPersonId: contactPersonId,
								convoThisContactBelongToId: activeConvo
							})
						}
					)
					.then(res => res.json())
					.then(data => {
						// console.log(data)
						if ( data ) {
					        Swal.fire({
					            icon: 'error',
					            title: 'Oops...',
					            text: 'Contact already added!'
					        })
						} else {
							fetch(`${process.env.REACT_PUBLIC_API_URL}/api/contacts/addContact`,
								{
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										contactPersonName: contactPersonName,
										contactPersonId: contactPersonId,
										convoThisContactBelongToId: convoThisContactBelongToId
									})
								}
							)
							.then(res => res.json())
							.then(data => {
						        Swal.fire(
						            'Added a Contact Successfully!',
						            'Nice!',
						            'success'
						        )
								fetch(`${process.env.REACT_PUBLIC_API_URL}/api/messages/addMessageAsReport`,
									{
										method: 'POST',
										headers: {
											'Content-Type': 'application/json'
										},
										body: JSON.stringify({
											messageBody: `Added a contact named "${data.contactPersonName}" with ID, "${data.contactPersonId}" `,
											dateCreatedMessage: dateCreatedMessage,
											convoItBelongstoId: convoThisContactBelongToId,
											senderOfThisMessageId: user.id
										})
									}
								)
								.then(res => res.json())
								.then(data => {
									// made it empty
									refreshNow()
								})

							})
						}
					})


				}
			})
		} else {
	        Swal.fire({
	            icon: 'error',
	            title: 'Oops...',
	            text: 'Select a Conversation first!'
	        })
		}

	}


	function updateConversation(y) {
		y.preventDefault()
		fetch(`${process.env.REACT_PUBLIC_API_URL}/api/conversations/updateConversation`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					toBeUpdatedConvoId: toBeUpdatedConvoId,
					toBeUpdatedConvoName: toBeUpdatedConvoName
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data === true) {
	            Swal.fire(
	                'Updated Conversation Successfully!',
	                'Push LOAD PROJECTS button!',
	                'success'
	            )
	            openOrCloseUpdateConversation()
	    	} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Update Conversation failed!',
                })
	    	}
	    	refreshNow()
	    })
	}













 
	

	return (
		<React.Fragment>
		<div className="containerInboxPage">
			<div className="subSecInboxPage-1">
				<div className="subSecInboxPage-1a">
					<h1>Inbox page</h1>
				</div>
				<div className="subSecInboxPage-1b">
					<div>
						<span><b>Adding a conversation</b></span><br />
						<span>&nbsp; 1. Click "Add Conversation" located in "Convo you manage".</span><br />
						<span>&nbsp; 2. Fill the boxes.</span><br />
						<span>&nbsp; 3. Click "Add now".</span>
					</div>
					<div>
						<span><b>Adding a contact</b></span><br />
						<span>&nbsp; 1. Choose a Conversation first.(Add first if none)</span><br />
						<span>&nbsp; 2. Choose users to add in the list under Contacts pane.</span><br />
						<span>&nbsp; 3. Click "Add Contact" on the bottom of the Contacts pane.</span>
					</div>
				</div>
			</div>
			<div className="subSecInboxPage-2">
				<div className="subSecInboxPage-2a">
					<div className="subSecInboxPage-2aa">
						<span className="subSecInboxPage-2ab-text01">Convo you manage</span>
					</div>
					<div className="subSecInboxPage-2ab">
						<div>
							{ listOfConversations }
						</div>
						<button className="subSecInboxPage-2ab-btn" onClick={() => openOrCloseAddConversation()}>Add Conversation</button>
					</div>
					<div className="subSecInboxPage-2ac">
						<span className="subSecInboxPage-2ab-text01">Convo you're in</span>
					</div>
					<div className="subSecInboxPage-2ad">
						{ listOfConversationsNonAdmin }
					</div>
				</div>				
				<div className="subSecInboxPage-2b">
					<div className="subSecInboxPage-2ba">
						<span className="subSecInboxPage-2ba-text01">{ convoNameDisplay }</span>
					</div>



					<div className="subSecInboxPage-2bb">
						<div className="subSecInboxPage-2bba">
							<div className="subSecInboxPage-2bbaa">
								{ listOfMessages }
							</div>
							<form className="subSecInboxPage-2bbab" onSubmit={(e) => addMessage(e)}>
								<div className="subSecInboxPage-2bbaba">
									<input 
										type="text" 
										className="subSecInboxPage-2bbaba-textbox" 
										placeholder="Enter your message here..." 
										value={messageBody}
										onChange={(e) => setMessageBody(e.target.value)}
									/>
									<button className="subSecInboxPage-2bbaba-btn">Send</button>
								</div>
							</form>
						</div>
						<div className="subSecInboxPage-2bbb">
							<div className="subSecInboxPage-2bbba">
								<div className="subSecInboxPage-2bbbaa">
									<span className="subSecInboxPage-2bbba-text01">All Users</span>
								</div>
								<div className="subSecInboxPage-2bbbab">
									{ listOfUsers }
								</div>
								<div className="subSecInboxPage-2bbbac">
									<button className="subSecInboxPage-2bbbc-btn" onClick={(g) => addContact(g)}>Add Contact</button>
								</div>
							</div>
							<div className="subSecInboxPage-2bbbb">
								<div className="subSecInboxPage-2bbbaa">
									<span className="subSecInboxPage-2bbba-text01">Members</span>
								</div>
								<div className="subSecInboxPage-2bbbab">
									{ listOfContactsInAConvo }
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>








			<ModalAddConversation open={openAddConversation} onClose={() => setOpenAddConversation(false)}>
				<div className="addConvoModal-header">
					<span className="addConvoModal-header-text01">Add a Conversation</span>
				</div>
				<form className="addConvoModal-body-form" onSubmit={(z) => addConversation(z)}>
					<div className="addConvoModal-body-form-01">
						<label className="addConvoModal-body-form-01-text01">Conversation Name:</label><br />
						<input 
							className="addConvoModal-textbox01"
						    type="text"
						    value={conversationName}
						    placeholder=" Enter new conversation name here..."
						    onChange={(z) => setConversationName(z.target.value)}
						/>
					</div>
					<div  className="addConvoModal-body-form-02">
						<button className="addConvoModal-btn-body">Add Now</button>
					</div>
				</form>
				<div className="addConvoModal-footer">
					<button className="addConvoModal-btn-footer" onClick={() => openOrCloseAddConversation()}>Close</button>
				</div>
			</ModalAddConversation>






			<ModalUpdateConversation open={openUpdateConversation} onClose={() => openOrCloseUpdateConversation(false)}>
				<div className="addConvoModal-header">
					<span className="addConvoModal-header-text01">Update a Conversation</span>
				</div>
				<form className="addConvoModal-body-form" onSubmit={(y) => updateConversation(y)}>
					<div className="addConvoModal-body-form-01">
						<label className="addConvoModal-body-form-01-text01">Conversation Name:</label><br />
						<input 
							className="addConvoModal-textbox01"
						    type="text"
						    value={toBeUpdatedConvoName}
						    placeholder=" Enter new conversation name here..."
						    onChange={(y) => setToBeUpdatedConvoName(y.target.value)}
						/>
					</div>
					<div  className="addConvoModal-body-form-02">
						<button className="addConvoModal-btn-body">Update</button>
					</div>
				</form>
				<div className="addConvoModal-footer">
					<button className="addConvoModal-btn-footer" onClick={() => openOrCloseUpdateConversation()}>Close</button>
				</div>
			</ModalUpdateConversation>





		</div>
		</React.Fragment>
	)
}

export default Inbox;


