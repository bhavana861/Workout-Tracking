import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getEditWorkotDetailsAPI, updateWorkoutDetailsAPI } from '../services/allAPI';

const Update = () => {
  const navigate = useNavigate(); 
  const { id } = useParams();
  const [workoutDetails, seteditWorkoutDetails] = useState({
    workoutName: '',
    datee: '',
    duration: '',
    imgUrl: '',
  });
  const [show, setShow] = useState(true);

  const handleClosed = () => {
    setShow(false);
    navigate('/');
  };

  useEffect(() => {
    const geteditedWorkoutDetails = async () => {
      try {
        const result = await getEditWorkotDetailsAPI(id);
        if (result.status >= 200 && result.status < 300) {
          seteditWorkoutDetails(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    geteditedWorkoutDetails();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const { workoutName, datee, duration, imgUrl } = workoutDetails;

    if (workoutName && datee && duration && imgUrl) {
      try {
        const result = await updateWorkoutDetailsAPI(id, workoutDetails);
        if (result.status >= 200 && result.status < 300) {
          alert('Workout details updated successfully!');
          handleClosed();
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please fill in all the fields!');
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClosed} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update WorkOut Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3">
            <FloatingLabel controlId="floatingWorkOut" label="WorkOut">
              <Form.Control type="text" placeholder="WorkOut" value={workoutDetails.workoutName} onChange={(e) => seteditWorkoutDetails({ ...workoutDetails, workoutName: e.target.value })} />
            </FloatingLabel>
            <FloatingLabel className='mt-2' controlId="floatingDate" label="">
              <Form.Control type="date" placeholder="Date" value={workoutDetails.datee} onChange={(e) => seteditWorkoutDetails({ ...workoutDetails, datee: e.target.value })} />
            </FloatingLabel>
            <FloatingLabel className="mt-2" controlId="floatingDuration" label="Duration (in hours)">
              <Form.Control type="number" placeholder="Enter duration in hours" min="0" step="0.5" value={workoutDetails.duration} 
                onChange={(e) => seteditWorkoutDetails({ ...workoutDetails, duration: e.target.value })} />
            </FloatingLabel>
            <FloatingLabel className='mt-2' controlId="floatingLink" label="Image link">
              <Form.Control type="text" placeholder="Image link" value={workoutDetails.imgUrl} onChange={(e) => seteditWorkoutDetails({ ...workoutDetails, imgUrl: e.target.value })} />
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosed}>Cancel</Button>
          <Button onClick={handleUpdate} className='btn btn-info' variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Update;
