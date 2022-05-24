import React from 'react';
import { useState } from 'react';


const ModalUpdateTaskB = ({ open, children, onClose }) => {
  if (!open) return null

  return (
  	<React.Fragment>
	    <div className="overlayBgUpdateTaskForPPModal" onClick={onClose}></div>
	    <div className="containerUpdateTaskForPPModal">
	      { children }
	      {/*<button onClick={onClose}>Close Modal</button>*/}
	    </div>
    </React.Fragment>
  )
}

export default ModalUpdateTaskB;