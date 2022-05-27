import React from 'react';
import { useState, useEffect } from 'react';
import ChatBubbleForSocket from "../components/ChatBubbleForSocket";
import io from 'socket.io-client'

import { nanoid } from "nanoid";
const socket = io.connect(process.env.REACT_PUBLIC_API_URL);
const userNanoId = nanoid(4)





const ConvoSocketIo = () => {
	const [ nameOfUser, setNameOfUser ] = useState('')
	const [ room, setRoom ] = useState('')
	const [ liveChatSec, setLiveChatSec ] = useState(false)


	const [ messageBody, setMessageBody ] = useState('')
	const [ chat, setChat ] = useState([])






	const openLiveChat = () => {
		setLiveChatSec(prev => !prev)
		if( liveChatSec === true) {
			setNameOfUser('')
			setRoom('')	
		} else {
			
		}

		// console.log(liveChatSec)
	}








	function sendChat(e) {
		e.preventDefault()
		socket.emit("chat", { messageBody, userNanoId })
		setMessageBody('')
	}

	function joinRoom(e) {
		if ( nameOfUser !== "" && room !== "") {
			socket.emit("join_room", room)
		}
	}










	useEffect(() => {
		socket.on("chat", (payload) => {
			setChat([...chat, payload])
		})
	})

	return (
		<div className="containerOfSocketIoPage">
			<div className="subSecSocketIoPage-01-header">
				<h1 className="subSecSocketIoPage-01-header-a">Socket.io page</h1>
			</div>


			<div className="subSecSocketIoPage-02-JoinRoom">
				<div className="subSecSocketIoPage-02-JoinRoom-a">
					{ ( liveChatSec === false )
						?
							<>
								<span className="subSecSocketIoPage-02-text01-a">Join a chat</span>
								<input 
									className="subSecSocketIoPage-02-textbox-a"
								    type="text"
								    value={nameOfUser}
								    placeholder="Name of user here..."
								    onChange={(e) => {
								    	setNameOfUser(e.target.value)
								    }}
								/>
								<input 
									className="subSecSocketIoPage-02-textbox-a"
								    type="text"
								    value={room}
								    placeholder="Chat room here..."
								    onChange={(e) => {
								    	setRoom(e.target.value)
								    }}
								/>
								<button className="subSecSocketIoPage-02-btn-a" onClick={() => (
										joinRoom(), 
										openLiveChat()
									)}>Join a room</button>
							</>
						:
								<ChatBubbleForSocket socket={socket} nameOfUser={nameOfUser} room={room} open={liveChatSec} onClose={() => openLiveChat(true)}/>
					}
				</div>
			</div>






		</div>
	)
}

export default ConvoSocketIo;




			// <div>
			// 	<h3 className="">------------------------</h3><br />
			// 	<form className="" onSubmit={sendChat}>
			// 		<div className="">
			// 			{chat.map((payload, index) => {
			// 				return(
			// 					<p key={index}>
			// 						{payload.messageBody}: 
			// 						<span>id: {payload.userNanoId}</span>
			// 					</p>
			// 				)
			// 			})

			// 			}
			// 			<h3 className="">Message:</h3><br />
			// 			<input 
			// 				className=""
			// 			    type="text"
			// 			    name="chat"
			// 			    value={messageBody}
			// 			    placeholder="Message here..."
			// 			    onChange={(e) => {
			// 			    	setMessageBody(e.target.value)
			// 			    }}
			// 			/>
			// 		</div>
			// 		<div  className="">
			// 			<button className="">Send</button>
			// 		</div>
			// 	</form>
			// </div>