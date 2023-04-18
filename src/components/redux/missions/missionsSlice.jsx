import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const MISSIONS_URL = 'https://api.spacexdata.com/v3/missions';

const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  const response = await axios.get(MISSIONS_URL);
  return response.data;
});

const initialState = {
  missions: [],
};
const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinMission: (state, missionId) => {
      const newState = state.missions.map((mission) => {
        if (mission.mission_id !== missionId.payload) return mission;

        return { ...mission, reserved: true };
      });
      return { ...state, missions: newState };
    },
    leaveMission: (state, missionId) => {
      const newState = state.missions.map((mission) => {
        if (mission.mission_id !== missionId.payload) return mission;

        return { ...mission, reserved: false };
      });
      return { ...state, missions: newState };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMissions.fulfilled, (state, action) => {
      const newData = [];
      const receivedData = action.payload;
      receivedData.forEach((mission) => {
        const newMissionObj = Object.fromEntries(Object.entries(mission).filter(([key]) => key === 'mission_name' || key === 'mission_id' || key === 'description'));
        newData.push(newMissionObj);
      });
      return { ...state, missions: newData };
    });
  },
});
const { joinMission, leaveMission } = missionsSlice.actions;
export { fetchMissions, joinMission, leaveMission };
export default missionsSlice.reducer;
