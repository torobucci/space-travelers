import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import Missions from '../routes/Missions';
import '@testing-library/jest-dom';

jest.mock('axios', () => 'Mockedaxios');
const mockStore = configureStore([]);

describe('Missions component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      missions: {
        missions: [
          {
            mission_id: 1,
            mission_name: 'Mission 1',
            description: 'Mission 1 Description',
            reserved: false,
          },
          {
            mission_id: 2,
            mission_name: 'Mission 2',
            description: 'Mission 2 Description',
            reserved: true,
          },
        ],
      },
    });

    component = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
  });

  it('should render the table with the correct headers', () => {
    const { getByText } = component;
    expect(getByText('Missions')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
  });

  it('should render the table with the correct data', () => {
    const { getByText } = component;
    expect(getByText('Mission 1')).toBeInTheDocument();
    expect(getByText('Mission 1 Description')).toBeInTheDocument();
    expect(getByText('NOT A MEMBER')).toBeInTheDocument();
    expect(getByText('Join Mission')).toBeInTheDocument();
    expect(getByText('Mission 2')).toBeInTheDocument();
    expect(getByText('Mission 2 Description')).toBeInTheDocument();
    expect(getByText('ACTIVE MEMBER')).toBeInTheDocument();
    expect(getByText('Leave Mission')).toBeInTheDocument();
  });

  it('should dispatch joinMission action when Join Mission button is clicked', () => {
    const { getByText } = component;
    fireEvent.click(getByText('Join Mission'));
    const actions = store.getActions();
    expect(actions[0].type).toBe('missions/joinMission');
    expect(actions[0].payload).toBe(1);
  });

  it('should dispatch leaveMission action when Leave Mission button is clicked', () => {
    const { getByText } = component;
    fireEvent.click(getByText('Leave Mission'));
    const actions = store.getActions();
    expect(actions[0].type).toBe('missions/leaveMission');
    expect(actions[0].payload).toBe(2);
  });
  it('Missions snapshots match', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Missions />
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
