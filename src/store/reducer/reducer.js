import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  users: [],
  storageOptions: [],
  devices: [],
  sensors: [],
  privacyRules: [],
  combinations: [],
  privacies: [],
  droppedItems:[],
  jsonData:{},
  downloadForm:false,

};

const reducerSlice = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
  
    addCombination(state, { payload }) {
      state.combinations.push({
        id: `${payload.device.deviceId}-${payload.sensor.sensorId}`,
        device: payload.device,
        sensor: payload.sensor
      });
    },
    removeCombination(state, { payload }) {
      state.combinations = state.combinations.filter(c => c.id !== payload);
    },
    loadData(state, { payload }) {
      state.users = payload.users;
      state.storageOptions = payload.storageOptions;
      state.devices = payload.devices;
      state.sensors = payload.sensors;
      state.privacyRules = payload.privacyRules;
      state.privacies = payload.privacies;
    },
    addPrivacyIcon(state, { payload }) {
      const combination = state.combinations.find(c => c.id === payload.combinationId);
      if (combination) {
        combination.privacies = combination.privacies || [];
        combination.privacies.push(payload.icon);
      }
    },
    removePrivacyIcon(state, { payload }) {
      const combination = state.combinations.find(c => c.id === payload.combinationId);
      if (combination) {
        combination.privacies = combination.privacies.filter(icon => icon.iconId !== payload.iconId);
      }
    },
    setDroppedItems(state, { payload }) {
      state.droppedItems = payload;
    },
    setJsonData(state, payload) {
      state.jsonData = payload;
    },
    setDownloadForm(state, payload) {
      state.downloadForm = payload;
    }
  }
});

export const {
  addCombination,
  removeCombination,
  loadData,
  addPrivacyIcon,
  removePrivacyIcon,
  setJsonData,
  setDownloadForm
} = reducerSlice.actions;

export default reducerSlice.reducer;
