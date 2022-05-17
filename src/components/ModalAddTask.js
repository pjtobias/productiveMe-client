import React from 'react';
import { useState } from 'react';


const ModalAddTask = ({ open, children, onClose }) => {
  if (!open) return null

  return (
    <div>
      { children }
      {/*<button onClick={onClose}>Close Modal</button>*/}
    </div>
  )
}

export default ModalAddTask;