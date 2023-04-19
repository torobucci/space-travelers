import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ROCKETS_URL = 'https://api.spacexdata.com/v4/rockets';

const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  const response = await axios.get(ROCKETS_URL);
  return response.data;
});

const initialState = {
  rockets: [],
};
const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket: (state, rocketId) => {
      const newState = state.rockets.map((rocket) => {
        if (rocket.id !== rocketId.payload) return rocket;

        return { ...rocket, reserved: true };
      });
      return { ...state, rockets: newState };
    },
    cancelReservation: (state, rocketId) => {
      const newState = state.rockets.map((rocket) => {
        if (rocket.id !== rocketId.payload) return rocket;

        return { ...rocket, reserved: false };
      });
      return { ...state, rockets: newState };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchRockets.fulfilled, (state, action) => {
      const newData = [];
      const receivedData = action.payload;
      receivedData.forEach((rocket) => {
        const newRocketObj = Object.fromEntries(Object.entries(rocket).filter(([key]) => key === 'id' || key === 'name' || key === 'description' || key === 'flickr_images'));
        newData.push(newRocketObj);
      });
      return { ...state, rockets: newData };
    });
  },
});

const { reserveRocket, cancelReservation } = rocketsSlice.actions;
export { fetchRockets, reserveRocket, cancelReservation };
export default rocketsSlice.reducer;
