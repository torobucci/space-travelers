import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const Profile = () => {
  const { missions } = useSelector((state) => state.missions);
  const { rockets } = useSelector((state) => state.rockets);
  const myMissions = missions.filter((mission) => mission.reserved);
  const myRockets = rockets.filter((mission) => mission.reserved);
  return (
    <Container className="d-flex">
      <Container>
        <h2>My Missions</h2>
        <ListGroup>
          {myMissions.map((mission) => (
            <ListGroup.Item key={mission.mission_id}>{mission.mission_name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <Container>
        <h2>My Rockets</h2>
        <ListGroup>
          {myRockets.map((rocket) => (
            <ListGroup.Item key={rocket.id}>{rocket.name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </Container>

  );
};

export default Profile;
