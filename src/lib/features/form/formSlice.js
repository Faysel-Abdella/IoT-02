import { createSlice } from "@reduxjs/toolkit";

// This is the initial, empty state for your form. It matches your HomePage state.
const initialState = {
  deviceInfo: {
    manufacturer: "",
    deviceName: "",
    modelNumber: "",
    firmwareVersion: "",
    updatedOn: "",
    manufacturedIn: "",
  },
  securityMechanisms: {
    securityUpdates: [],
    accessControl: [],
    securityOversight: "",
    technicalDocumentation: [],
  },
  dataPractices: {
    sensorDataCollectionMethod: "", // <-- ADDED for the first dropdown
    sensorDataType: "",
    dataFrequency: [],
    dataPurpose: [],
    dataStorage: [],
    localDataRetention: "",
    cloudDataStorage: [],
    cloudDataRetention: "",
    dataSharedWith: [],
    dataSharingFrequency: "",
    dataSoldTo: [],
    otherDataCollected: [],
    childrensDataHandling: [],
    dataLinkage: [],
    compliance: [],
    dataInference: [],
    contactPhone: "",
    contactEmail: "",
  },
  moreInformation: {
    privacyPolicy: [],
    offlineFunctionality: "",
    noDataFunctionality: "", // This was a radio button, should be a string
    physicalActuations: "", // CHANGED from [] to ""
    compatiblePlatforms: "",
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // This one powerful reducer can handle all your updates.
    // An "action" will look like: { payload: { stepKey: 'deviceInfo', field: 'manufacturer', value: 'Casa' } }
    updateFormData: (state, action) => {
      const { stepKey, field, value } = action.payload;
      // This uses Immer library behind the scenes, so it's safe to "mutate" the state here.
      if (state[stepKey]) {
        state[stepKey][field] = value;
      }
    },
    // Optional: A way to reset the form when the modal closes, if you want.
    resetForm: (state, action) => {
      // Add the state and action parameters
      // --- ADD THIS LOG ---
      console.log("resetForm reducer was called!");
      console.log(
        "Current state before reset:",
        JSON.parse(JSON.stringify(state))
      );

      // This is the logic that actually resets the state.
      // It must return the new state.
      return initialState;
    },
  },
});

// Export the "actions" so your components can dispatch them.
export const { updateFormData, resetForm } = formSlice.actions;

// Export the reducer itself for the store.
export default formSlice.reducer;
