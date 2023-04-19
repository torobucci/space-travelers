import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/Badge';
import { reserveRocket, cancelReservation } from '../redux/rockects/rocketsSlice';

const Rockets = () => {
  const { rockets } = useSelector((state) => state.rockets);
  const dispatch = useDispatch();
  return (
    <div className="container">
      {rockets.map((rocket) => (
        <div className="d-flex m-4" key={rocket.id}>
          <img src={rocket.flickr_images[0]} alt="rocket-img" width="300px" />
          <div className="ms-4">
            <h1>{rocket.name}</h1>
            <p>
              {rocket.reserved && (
              <Badge bg="primary" className="me-2">
                Reserved
              </Badge>
              )}
              {rocket.description}
            </p>
            {rocket.reserved && (
              <Button variant="outline-secondary" onClick={() => dispatch(cancelReservation(rocket.id))}>Cancel Reservation</Button>
            )}
            {!rocket.reserved && (
              <Button variant="primary" onClick={() => dispatch(reserveRocket(rocket.id))}>Reserve Rocket</Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rockets;
