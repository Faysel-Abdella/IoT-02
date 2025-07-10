"use client";

import { dataPracticesData } from "./data/dataPracticesData.js";
import CustomSelect from "../CustomSelect.js";

// We can reuse the same smart ColorCircle component from SecurityMechanisms
// const ColorCircle = ({ color, isChecked }) => {
//   if (!color) return null;
//   let finalColor;
//   let isAlwaysFilled = false;
//   if (typeof color === "object" && color.checked && color.unchecked) {
//     finalColor = isChecked ? color.checked : color.unchecked;
//     isAlwaysFilled = true;
//   } else {
//     finalColor = color;
//   }
//   return (
//     <span
//       className="color-indicator"
//       style={{
//         borderColor: finalColor,
//         backgroundColor:
//           isAlwaysFilled || isChecked ? finalColor : "transparent",
//       }}
//     />
//   );
// };

const DataPractices = ({ formData, updateFormData }) => {
  const parentKey = "dataPractices";

  const handleCheckboxChange = (field, value) => {
    const currentValues = formData[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    // Call with the variable
    updateFormData(parentKey, field, updatedValues);
  };

  const handleRadioChange = (field, value) => {
    // Call with the variable
    updateFormData(parentKey, field, value);
  };
  return (
    <div className="step-content">
      <h2 className="step-title">Data Practices</h2>
      {/* Sensor Data Collection Section */}
      <div className="form-section">
        <h3 className="section-title">Data Collection Method</h3>
        <div className="dropdown-wrapper">
          {/* REPLACED <select> with CustomSelect */}
          <CustomSelect
            placeholder="Select a method..."
            options={dataPracticesData.sensorDataCollectionMethod}
            value={formData.sensorDataCollectionMethod || ""}
            onChange={(value) =>
              handleRadioChange("sensorDataCollectionMethod", value)
            }
          />
        </div>
      </div>

      {/* --- SENSOR TYPE DROPDOWN SECTION --- */}
      <div className="form-section">
        <h3 className="section-title">Sensor Type</h3>
        <div className="dropdown-wrapper">
          {/* REPLACED <select> with CustomSelect */}
          <CustomSelect
            placeholder="Select a sensor type..."
            options={dataPracticesData.sensorTypes}
            value={formData.sensorDataType || ""}
            onChange={(value) => handleRadioChange("sensorDataType", value)}
          />
        </div>
      </div>
      {/* ======================================================= */}
      {/* === UPDATE THE DATA FREQUENCY SECTION HERE            === */}
      {/* ======================================================= */}
      <div className="form-section">
        <h3 className="section-title">Data Collection Frequency</h3>
        <p class="title-description">
          How frequent user's data is being shared{" "}
        </p>
        {/* Use checkbox-list for styling consistency */}
        <div className="checkbox-list">
          {dataPracticesData.dataFrequency.map((option) => {
            // Check if the value is in the formData array
            const isChecked = (formData.dataFrequency || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  {" "}
                  {/* Use checkbox-label class */}
                  <input
                    type="checkbox" // <-- CHANGE to checkbox
                    value={option.value}
                    checked={isChecked}
                    // Use the new handler
                    onChange={() =>
                      handleCheckboxChange("dataFrequency", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>{" "}
                    {/* Use checkbox-text class */}
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                <span className="tooltip-text">{option.description}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* ======================================================= */}
      {/* === UPDATE THE PURPOSE SECTION HERE                   === */}
      {/* ======================================================= */}
      <div className="form-section">
        <h3 className="section-title">Purpose of Data Collection</h3>
        <p class="title-description">The purpose of data collection </p>
        <div className="checkbox-list">
          {dataPracticesData.dataPurpose.map((option) => {
            const isChecked = (formData.dataPurpose || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox" // <-- CHANGE to checkbox
                    value={option.value}
                    checked={isChecked}
                    onChange={() =>
                      handleCheckboxChange("dataPurpose", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                {option.description !== "" && (
                  <span className="tooltip-text">{option.description}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Data stored on the device</h3>
        <div className="checkbox-list">
          {dataPracticesData.dataStorage.map((option) => {
            // Note: We use a new state field 'dataStorage'
            const isChecked = (formData.dataStorage || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    // And we update that new state field here
                    onChange={() =>
                      handleCheckboxChange("dataStorage", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                <span className="tooltip-text">{option.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Local Data Retention Time</h3>
        {/* FIX: Changed 'class' to the correct JSX 'className' */}
        <p className="title-description">
          For how long data will be stored on the device{" "}
        </p>

        <div className="radio-list">
          {/* Using the clean, destructured parameters */}
          {dataPracticesData.localDataRetention.map(
            ({ value, label, description }) => {
              const isChecked = formData.localDataRetention === value;

              return (
                <div key={value} className="tooltip-container">
                  {/* The input is now a sibling, placed before the label */}
                  <input
                    type="radio"
                    // A unique ID for this specific input (ldr = Local Data Retention)
                    id={`radio-ldr-${value}`}
                    // The name groups these radios together
                    name="localDataRetention"
                    value={value}
                    checked={isChecked}
                    onChange={() =>
                      handleRadioChange("localDataRetention", value)
                    }
                    // Visually hide the default radio button
                    style={{ display: "none" }}
                  />

                  {/* The label now uses 'htmlFor' to connect to the input */}
                  <label htmlFor={`radio-ldr-${value}`} className="radio-label">
                    <div className="label-content">
                      <span className="radio-text">{label}</span>
                    </div>
                  </label>

                  <span className="tooltip-text">{description}</span>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Data Stored in the Cloud</h3>
        <p class="title-description">
          Whether user's identity could be revealed by the data stored in the
          cloud
        </p>
        <div className="checkbox-list">
          {dataPracticesData.cloudDataStorage.map((option) => {
            // We use a new state field 'cloudDataStorage'
            const isChecked = (formData.cloudDataStorage || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    // The generic checkbox handler works perfectly
                    onChange={() =>
                      handleCheckboxChange("cloudDataStorage", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                {option.description !== "" && (
                  <span className="tooltip-text">{option.description}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Cloud Data Retention Time</h3>

        {/* BONUS FIX: Corrected description and used 'className' instead of 'class' */}
        <p className="title-description">
          For how long data will be stored in the cloud
        </p>

        <div className="radio-list">
          {/* Using the clean, destructured parameters as requested */}
          {dataPracticesData.cloudDataRetention.map(
            ({ value, label, description }) => {
              const isChecked = formData.cloudDataRetention === value;

              return (
                <div key={value} className="tooltip-container">
                  {/* The input is now a sibling, placed before the label */}
                  <input
                    type="radio"
                    // A unique ID for this specific input
                    id={`radio-cdr-${value}`}
                    // The name groups these radios together
                    name="cloudDataRetention"
                    value={value}
                    checked={isChecked}
                    onChange={() =>
                      handleRadioChange("cloudDataRetention", value)
                    }
                    // Visually hide the default radio button
                    style={{ display: "none" }}
                  />

                  {/* The label now uses 'htmlFor' to connect to the input */}
                  <label htmlFor={`radio-cdr-${value}`} className="radio-label">
                    <div className="label-content">
                      <span className="radio-text">{label}</span>
                    </div>
                  </label>

                  <span className="tooltip-text">{description}</span>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Data shared with:</h3>
        <p class="title-description"> Who user's data will be shared with</p>
        <div className="checkbox-list">
          {dataPracticesData.dataSharedWith.map((option) => {
            // We use a new state field 'dataSharedWith'
            const isChecked = (formData.dataSharedWith || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    // The generic checkbox handler works perfectly
                    onChange={() =>
                      handleCheckboxChange("dataSharedWith", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                <span className="tooltip-text">{option.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Data sharing frequency</h3>

        <p class="title-description">
          {" "}
          How frequent user's data is being shared
        </p>

        <div className="radio-list">
          {dataPracticesData.dataSharingFrequency.map(
            ({ value, label, description }) => {
              const isChecked = formData.dataSharingFrequency === value;
              return (
                <div key={value} className="tooltip-container">
                  <input
                    type="radio"
                    id={`radio-dsf-${value}`}
                    name="dataSharingFrequency"
                    value={value}
                    checked={isChecked}
                    onChange={() =>
                      handleRadioChange("dataSharingFrequency", value)
                    }
                    style={{ display: "none" }}
                  />
                  <label htmlFor={`radio-dsf-${value}`} className="radio-label">
                    <div className="label-content">
                      <span className="radio-text">{label}</span>
                    </div>
                  </label>
                  <span className="tooltip-text">{description}</span>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Data sold to</h3>
        <div className="checkbox-list">
          {dataPracticesData.dataSoldTo.map((option) => {
            // We use a new state field 'dataSoldTo'
            const isChecked = (formData.dataSoldTo || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    // The generic checkbox handler works perfectly
                    onChange={() =>
                      handleCheckboxChange("dataSoldTo", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                {option.description !== "" && (
                  <span className="tooltip-text">{option.description}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Other collected data</h3>
        <div className="checkbox-list">
          {dataPracticesData.otherDataCollected.map((option) => {
            // We use a new state field 'otherDataCollected'
            const isChecked = (formData.otherDataCollected || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    // The generic checkbox handler works perfectly
                    onChange={() =>
                      handleCheckboxChange("otherDataCollected", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                <span className="tooltip-text">{option.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">
          Special Data Handling Practices for Children
        </h3>
        {/* We use 'checkbox-grid' to lay items out in a row */}
        <div className="checkbox-grid">
          {dataPracticesData.childrensDataHandling.map((option) => {
            // We use a new state field 'childrensDataHandling'
            const isChecked = (formData.childrensDataHandling || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    // The generic checkbox handler works perfectly
                    onChange={() =>
                      handleCheckboxChange(
                        "childrensDataHandling",
                        option.value
                      )
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                <span className="tooltip-text">{option.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Data linkage</h3>
        <div className="checkbox-list">
          {dataPracticesData.dataLinkage.map((option) => {
            // We use a new state field 'dataLinkage'
            const isChecked = (formData.dataLinkage || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    onChange={() =>
                      handleCheckboxChange("dataLinkage", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                {/* This span will only render if a description exists */}
                {option.description && (
                  <span className="tooltip-text">{option.description}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">In Compliance with</h3>
        <div className="checkbox-list">
          {dataPracticesData.compliance.map((option) => {
            // We use a new state field 'compliance'
            const isChecked = (formData.compliance || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    onChange={() =>
                      handleCheckboxChange("compliance", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                    {/* This component will now automatically show Red when unchecked and Green when checked */}
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                <span className="tooltip-text">{option.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">
          What will be inferred from user's Data
        </h3>
        <div className="checkbox-list">
          {dataPracticesData.dataInference.map((option) => {
            // We use a new state field 'dataInference'
            const isChecked = (formData.dataInference || []).includes(
              option.value
            );
            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    // The generic checkbox handler works perfectly
                    onChange={() =>
                      handleCheckboxChange("dataInference", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                    {/* <ColorCircle color={option.color} isChecked={isChecked} /> */}
                  </div>
                </label>
                {option.description !== "" && (
                  <span className="tooltip-text">{option.description}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataPractices;
