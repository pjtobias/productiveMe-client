import React, { useState, useEffect, useContext }from 'react';
import UserContext from '../UserContext'
import PropTypes from 'prop-types';
import '../css/style.masterplan.css'
import '../css/style.inbox.css'
const moment = require('moment')


export default function MessageCard ({ messageProp }) {
	const { _id, messageBody, dateCreatedMessage, convoItBelongstoId, senderOfThisMessageId, messageType, isActive } = messageProp
	const { user } = useContext(UserContext)

	const [ dateCreatedMessageConverted, setDateCreatedMessageConverted ] = useState('')
	const [ nameOfSender, setNameOfSender ] = useState('')
















	useEffect(() => {
		// console.log(messageProp)
		const dateAA = moment(dateCreatedMessage, "YYYY-MM-DD")
		const dateAB = dateAA.format('LLL')
		setDateCreatedMessageConverted(dateAB)
		// console.log(dateCreatedMessageConverted)


		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/getUser`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: senderOfThisMessageId
				})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	// console.log(data)
	    	setNameOfSender(data.firstName)
	    })
	}, [])















	return (
		<div className="containerMessageCard">
			<div className="subSecHolderMessage">
				<div className="subSecBubbleChat">
					<div className="subSecBubbleChat-1">
						<span>{dateCreatedMessageConverted}</span>
					</div>	
					{( messageType === "default")
						?
							( user.id === senderOfThisMessageId )
							?
								<div className="subSecBubbleChat-2">	
									<div className="subSecBubbleChat-2a">	
										<div className="subSecBubbleChat-2aa">	
											<span>Me</span>
										</div>
										<div className="subSecBubbleChat-2ab">	
											<span>{messageBody}</span>
										</div>
									</div>
								</div>
							:
								<div className="subSecBubbleChat-3">	
									<div className="subSecBubbleChat-3a">	
										<div className="subSecBubbleChat-3aa">	
											<span>{nameOfSender}</span>
										</div>
										<div className="subSecBubbleChat-3ab">
											<span>{messageBody}</span>
										</div>
									</div>
								</div>
						:
							<div className="subSecBubbleChat-4">	
								<div className="subSecBubbleChat-4a">	
									<div className="subSecBubbleChat-4aa">	
										<span>update</span>
									</div>
									<div className="subSecBubbleChat-4ab">
										<span>{messageBody}</span>
									</div>
								</div>
							</div>

					}
				</div>
			</div>
		</div>
	)
}





MessageCard.propTypes = {
	// shape() - used to check that the prop conforms to a specific
	messageProp: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		messageBody: PropTypes.string.isRequired,
		dateCreatedMessage: PropTypes.string.isRequired,
		convoItBelongstoId: PropTypes.string.isRequired,
		senderOfThisMessageId: PropTypes.string.isRequired,
		messageType: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired
	})
}