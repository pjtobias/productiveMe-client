import React from 'react';
import { useState } from 'react';


const ModalUpdateConversation = ({ open, children, onClose }) => {
  if (!open) return null

  return (
  	<React.Fragment>
	    <div className="overlayBgAddConvoModal" onClick={onClose}></div>
	    <div className="containerAddConvoModal">
	      { children }
	      {/*<button onClick={onClose}>Close Modal</button>*/}
	    </div>
    </React.Fragment>
  )
}

export default ModalUpdateConversation;