import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Profile from '../routes/Profile';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'

jest.mock('react-bootstrap/esm/Container', () => 'MockedBootstrapContainer');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Profile component', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback({
      missions: {
        missions: [
          {
            mission_id: 1,
            mission_name: 'Mission 1',
            reserved: true,
          },
          {
            mission_id: 2,
            mission_name: 'Mission 2',
            reserved: false,
          },
        ],
      },
      rockets: {
        rockets: [
          {
            id: 1,
            name: 'Rocket 1',
            reserved: true,
          },
          {
            id: 2,
            name: 'Rocket 2',
            reserved: false,
          },
        ],
      },
    }));
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it('renders the My Missions and My Rockets sections', () => {
    const { getByText } = render(<Profile />);

    expect(getByText('My Missions')).toBeInTheDocument();
    expect(getByText('My Rockets')).toBeInTheDocument();
  });

  it('renders the reserved missions', () => {
    const { getByText, queryByText } = render(<Profile />);

    expect(getByText('Mission 1')).toBeInTheDocument();
    expect(queryByText('Mission 2')).not.toBeInTheDocument();
  });

  it('renders the reserved rockets', () => {
    const { getByText, queryByText } = render(<Profile />);

    expect(getByText('Rocket 1')).toBeInTheDocument();
    expect(queryByText('Rocket 2')).not.toBeInTheDocument();
  });
  it('Profile snapshots match', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
