import React, { useRef, useEffect, useCallback, useState, useContext } from 'react';
import UserContext from '../UserContext'
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import DatePicker from 'react-date-picker';
import Swal from 'sweetalert2';


/*
  color palette
    #6F6FD8 - main - purple
    #98CE00 - 2nd - yellow green
    #89A6FB - 3rd - little boy blue
    #78C3FB - 4th - maya blue
    #16E0BD - 5th - turqouise
*/

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  // width: 800px;
  width: 500px;
  // height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  // display: grid;
  // grid-template-columns: 1fr 1fr;
  // position: relative;
  // z-index: 10;
  z-index: 1; /* Sit on top */
  border-radius: 10px;


  // box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
`;



const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  line-height: 1.8;
  color: #6F6FD8;
  padding: 5px 30px 30px 30px;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #6F6FD8;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;






export const ModalAddProject = ({ showModal, setShowModal }) => {
    const { user } = useContext(UserContext)
  const [ projectName, setProjectName ] = useState('')
  const [ dateCreated, setDateCreated ] = useState(new Date())
  const [ dateEnd, setDateEnd ] = useState('')
  const [ adminId, setAdminId ] = useState('')


  


  const onChangeDateEnd = dateEnd => {
    setDateEnd(dateEnd)
  }

  function addProject(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_PUBLIC_API_URL}/api/projects/addProject`, 
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
        setShowModal(false)
    })
  }

    useEffect(() => {
        // console.log(dateCreated)
        // console.log(dateEnd)
        // console.log(user.id)
    },[dateEnd])










  const modalRef = useRef();


  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>

            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <div>
                  <h2>Add project here</h2>

                </div>

                <form onSubmit={(e) => addProject(e)}>
                    <div>
                        <label>Project Name</label>
                        <br />
                        <input 
                            type="text" 
                            placeholder="Enter project" 
                            // value={email}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Date End</label>
                        <br />
                        <DatePicker 
                            onChange={onChangeDateEnd} 
                            value={dateEnd}
                        />
                        <br />
                        <br />
                    </div>
                    <div>
                      <button className="button">Add project</button>
                      <button className="button" onClick={() => setShowModal(prev => !prev)}>Close</button>
                    </div>
                </form>
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>

        </Background>
      ) : null}
    </>
  );
};
