import React from 'react';
import { useState } from 'react';


const ModalAddProjectB = ({ open, children, onClose }) => {
  if (!open) return null

  return (
  	<React.Fragment>
	    <div className="overlayBgAddProjectBModal" onClick={onClose}></div>
	    <div className="containerAddProjectBModal">
	      { children }
	      {/*<button onClick={onClose}>Close Modal</button>*/}
	    </div>
    </React.Fragment>
  )
}

export default ModalAddProjectB;