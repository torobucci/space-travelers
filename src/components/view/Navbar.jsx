import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import logo from '../assets/planet.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Navbar.css';

function NavBar() {
  return (
    <>
      <Navbar bg="white">
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <img
              src={logo}
              width="60"
              height="60"
              className="d-inline-block align-top me-3"
              alt="Space Travelers Hub Logo"
            />
            <Navbar.Text className="brand-text">Space Travelers Hub</Navbar.Text>
          </Navbar.Brand>
          <Nav className="ms-auto d-flex">
            <NavLink className="ms-3" to="/">Rockets</NavLink>
            <NavLink className="mission ms-3" to="missions">Missions</NavLink>
            <NavLink className="ms-3" to="my profile">My Profile</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
