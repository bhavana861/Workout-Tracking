import React, { useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { saveworkoutAPI } from '../services/allAPI';

const Create = ({ addWorkoutToList }) => {
  const [workoutDetails, setWorkoutDetails] = useState({
    workoutName: '',
    datee: '',
    duration: '',
    imgUrl: '',
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpload = async (event) => {
    event.preventDefault();
    const { workoutName, datee, duration, imgUrl } = workoutDetails;

    if (workoutName && datee && duration && imgUrl) {
      try {
        const result = await saveworkoutAPI(workoutDetails);
        if (result.status >= 200 && result.status < 300) {
          addWorkoutToList(result.data); 
          handleClose();
          alert('Workout added successfully!');
        } else {
          console.log(result);
          
        }
      } catch (err) {
       console.log(err);
      }
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <h3>Add Your Daily Workout Accomplishments</h3>
        <Button className="ms-3" onClick={handleShow}>+</Button>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Workout Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingWorkoutName" label="Workout Name">
            <Form.Control type="text" placeholder="Workout Name" onChange={(e) => setWorkoutDetails({ ...workoutDetails, workoutName: e.target.value })}/>
          </FloatingLabel>
          <FloatingLabel className="mt-2" controlId="floatingDate" label="Date">
            <Form.Control type="date" onChange={(e) => setWorkoutDetails({ ...workoutDetails, datee: e.target.value })} />
          </FloatingLabel>
          <FloatingLabel className="mt-2" controlId="floatingDuration" label="Duration (hours)">
            <Form.Control  type="number" min="0" step="0.5" onChange={(e) => setWorkoutDetails({ ...workoutDetails, duration: e.target.value })}/>
          </FloatingLabel>
          <FloatingLabel className="mt-2" controlId="floatingImgUrl" label="Image URL">
            <Form.Control type="text" placeholder="Image URL" onChange={(e) => setWorkoutDetails({ ...workoutDetails, imgUrl: e.target.value })}/>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleUpload}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Create;
