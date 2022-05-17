import React from 'react';
import "../css/style.modal.css";

function ModalSignIn({ closeModalSignIn }) {
	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseBtn">
					<button onClick={() => closeModalSignIn(false)}> X </button>
				</div>
				<div className="title">
					<h1>Sign Modal</h1>
				</div>
				<div className="body">
					<p>This part will contain the textboxes</p>
				</div>
				<div className="footer">
					<button> Sign in </button>
					<button onClick={() => closeModalSignIn(false)}> Cancel </button>
				</div>
			</div>
		</div>
	)
}



export default ModalSignIn;


			// <br />
			// <h1>Modal</h1>