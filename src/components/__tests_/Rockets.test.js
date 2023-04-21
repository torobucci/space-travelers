import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import renderer from 'react-test-renderer';
import Rockets from '../routes/Rockets';
import '@testing-library/jest-dom';

jest.mock('react-redux');
jest.mock('react-bootstrap/esm/Button', () => 'MockedBootstrapButton');
jest.mock('axios', () => 'Mockedaxios');

describe('Test Rockets Component', () => {
  const mockRockets = [
    {
      id: 'falcon1',
      name: 'Falcon 1',
      description: 'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009.',
      flickr_images: ['https://farm1.staticflickr.com/27/60914660_3a1a118583_b.jpg'],
      reserved: true,
    },
    {
      id: 'falcon9',
      name: 'Falcon 9',
      description: 'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.',
      flickr_images: ['https://farm1.staticflickr.com/745/32394687645_a9c54a34ef_b.jpg'],
      reserved: false,
    },
  ];

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      rockets: {
        rockets: mockRockets,
      },
    }));
    useDispatch.mockReturnValue(jest.fn());
  });

  it('renders the rocket list', () => {
    const { getByText } = render(<Rockets />);
    expect(getByText('Falcon 1')).toBeInTheDocument();
    expect(getByText('Falcon 9')).toBeInTheDocument();
  });

  it('displays reserved badge when rocket is reserved', () => {
    const { getByText } = render(<Rockets />);
    expect(getByText('Reserved')).toBeInTheDocument();
  });

  it('calls reserveRocket when reserve button is clicked', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    const { getByText } = render(<Rockets />);
    const reserveButton = getByText('Reserve Rocket');
    fireEvent.click(reserveButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'rockets/reserveRocket', payload: 'falcon9' });
  });

  it('calls cancelReservation when cancel button is clicked', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    const { getByText } = render(<Rockets />);
    const cancelButton = getByText('Cancel Reservation');
    fireEvent.click(cancelButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'rockets/cancelReservation', payload: 'falcon1' });
  });
  it('Rockets snapshots match', () => {
    const tree = renderer.create(<Rockets />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
