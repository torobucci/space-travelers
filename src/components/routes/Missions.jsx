import { useSelector, useDispatch } from 'react-redux';
import { React } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { joinMission, leaveMission } from '../redux/missions/missionsSlice';

const Missions = () => {
  const { missions } = useSelector((state) => state.missions);
  const dispatch = useDispatch();

  return (
    <Table striped bordered className="container">
      <thead>
        <tr>
          <th>Missions</th>
          <th>Description</th>
          <th>Status</th>
          <th aria-label="none" />
        </tr>
      </thead>
      <tbody>
        {missions.map((mission) => (
          <tr key={mission.mission_id}>
            <td>{mission.mission_name}</td>
            <td>{mission.description}</td>
            {mission.reserved && (
            <>
              <td className="align-middle"><Button variant="primary" size="sm" className="not-member">ACTIVE MEMBER</Button></td>
              <td className="align-middle"><Button variant="outline-danger" size="sm" className="join-mission" onClick={() => dispatch(leaveMission(mission.mission_id))}>Leave Mission</Button></td>
            </>
            )}
            {!mission.reserved && (
            <>
              <td className="align-middle"><Button variant="secondary" size="sm" className="not-member">NOT A MEMBER</Button></td>
              <td className="align-middle"><Button variant="outline-secondary" size="sm" className="join-mission" onClick={() => dispatch(joinMission(mission.mission_id))}>Join Mission</Button></td>
            </>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Missions;
