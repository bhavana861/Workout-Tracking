import React, { useEffect, useState } from 'react';
import Create from './Create';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteWorkoutDetailsAPI, getAllWorkoutAPI } from '../services/allAPI';

const Home = () => {
  const [allworkout, setAllWorkout] = useState([]);

  useEffect(() => {
    getAllworkout();
  }, []);

  const getAllworkout = async () => {
    try {
      const result = await getAllWorkoutAPI();
      if (result.status >= 200 && result.status < 300) {
        setAllWorkout(result.data);
      }
    } catch (err) {
    console.log(err);
    
    }
  };

  const addWorkoutToList = (newWorkout) => {
    setAllWorkout((prevWorkouts) => [...prevWorkouts, newWorkout]);
  };

  const removeWorkoutdetails = async (id) => {
    try {
      await deleteWorkoutDetailsAPI(id);
      setAllWorkout((prevWorkouts) => prevWorkouts.filter((work) => work.id !== id));
    } catch (err) {
     console.log(err);
     
    }
  };

  return (
    <div>
      <div className="text-center mt-5">
        <h1>Stay Fit, Stay Focused: Log Your Daily Workouts!</h1>
        <Create addWorkoutToList={addWorkoutToList} />
        {allworkout.map((work) => (
          <Row key={work.id} style={{ width: '70%', marginLeft: '250px', height: '300px' }} className="mt-5 g-1 border shadow">
            <Col style={{ marginLeft: '40px' }} className="mt-5">
              <h2>Workout Name: {work.workoutName}</h2>
              <p className="h4" style={{ color: 'magenta' }}>Date: {work.datee}</p>
              <p className="h4" style={{ color: 'green' }}>Duration: {work.duration} hours</p>
              <div className="d-flex justify-content-evenly">
                <Link to={`/update/${work.id}`}>
                  <button className="btn bg-info text-white">Edit</button>
                </Link>
                <button className="btn bg-danger text-white" onClick={() => removeWorkoutdetails(work.id)}>Delete</button>
              </div>
            </Col>
            <Col style={{ marginRight: '100px' }} className="mt-4">
              <img src={work.imgUrl} alt="Workout" width="350" height="250" />
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default Home;
