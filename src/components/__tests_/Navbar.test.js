import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../view/Navbar';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'

jest.mock('react-bootstrap/esm/Navbar', () => 'MockedBootstrapNavbar');
describe('NavBar', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });

  it('renders a logo', () => {
    const logo = screen.getByAltText('Space Travelers Hub Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'planet.png');
  });

  it('renders the brand name', () => {
    const brandName = screen.getByText('Space Travelers Hub');
    expect(brandName).toBeInTheDocument();
  });

  it('renders a link to the Rockets page', () => {
    const rocketsLink = screen.getByText('Rockets');
    expect(rocketsLink).toBeInTheDocument();
    expect(rocketsLink).toHaveAttribute('href', '/');
  });

  it('renders a link to the Missions page', () => {
    const missionsLink = screen.getByText('Missions');
    expect(missionsLink).toBeInTheDocument();
    expect(missionsLink).toHaveAttribute('href', '/missions');
  });

  it('renders a link to the My Profile page', () => {
    const profileLink = screen.getByText('My Profile');
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute('href', '/my profile');
  });
  it('Navbar snapshots match', () => {
    const tree = renderer.create(<BrowserRouter>
        <NavBar />
      </BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
