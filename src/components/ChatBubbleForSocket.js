import React from 'react';
import { useState, useEffect } from 'react';

import "../css/style.socketio.css"
import AutoScrollDown from 'react-scroll-to-bottom'


const ChatBubbleForSocket = ({socket, nameOfUser, room, open, onClose}) => {
	const [currentMessage, setCurrentMessage] = useState("");
  	const [messageList, setMessageList] = useState([]);

	const sendMessage = async () => {
		if (currentMessage !== "") {
		const messageData = {
		    room: room,
		    author: nameOfUser,
		    message: currentMessage,
		    time:
		   		new Date(Date.now()).getHours() + ":" +
		   		new Date(Date.now()).getMinutes(),
		};

		  await socket.emit("send_message", messageData);
		  setMessageList((list) => [...list, messageData]);
		  setCurrentMessage("");
		}
	};

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);


	return (
		<div className="containerChat">
			<div className="chat-header">
				<span className="subSecSocketIoPage-02-text02-b">Socket.io Chat</span>
				<span className="subSecSocketIoPage-02-text02-b">Rm: {room}</span>
				<button className="exitChat-btn" onClick={() => onClose(false)}>x</button>
			</div>
			<div className="chat-body">
				<AutoScrollDown className="secForAutoScroll">
			        {messageList.map((messageContent) => {
			            return (
			            	<div
				                className="message"
				                id={nameOfUser === messageContent.author ? "you" : "other"}
			            	>
				                <div className="message-bubble">
				                	<div className="message-content">
				                    	<span>{messageContent.message}</span>
				                	</div>
				                	<div className="message-meta">
				                    	<span className="time">{messageContent.time}</span>
				                    	{( nameOfUser === messageContent.author )
				                    		?
				                    			<span className="author">Me</span>
				                    		:
				                    			<span className="author">{messageContent.author}</span>
				                    	}
				                    	
				                	</div>
				                </div>
			                </div>
			            );
			        })}
			    </AutoScrollDown>
			</div>
			<div className="chat-footer">
				<input 
					className="sendMessageTextbox"
				    type="text"
				    name="chat"
				    value={currentMessage}
				    placeholder="Message here..."
				    onChange={(e) => {
				    	setCurrentMessage(e.target.value)
				    }}
					onKeyPress={(event) => {
		            	event.key === "Enter" && sendMessage();
		          	}}
				/>
				<button className="sendMessageBtn" onClick={sendMessage}>&#9658; Send</button>
			</div>
		</div>
	)
}

export default ChatBubbleForSocket;


