"use client";

import { dataPracticesData } from "./data/dataPracticesData.js";

// We can reuse the same smart ColorCircle component from SecurityMechanisms
const ColorCircle = ({ color, isChecked }) => {
  if (!color) return null;
  let finalColor;
  let isAlwaysFilled = false;
  if (typeof color === "object" && color.checked && color.unchecked) {
    finalColor = isChecked ? color.checked : color.unchecked;
    isAlwaysFilled = true;
  } else {
    finalColor = color;
  }
  return (
    <span
      className="color-indicator"
      style={{
        borderColor: finalColor,
        backgroundColor:
          isAlwaysFilled || isChecked ? finalColor : "transparent",
      }}
    />
  );
};

const DataPractices = ({ formData, updateFormData }) => {
  const parentKey = "dataPractices";

  const handleParentChange = (parentValue) => {
    const currentSelections = formData.sensorDataCollection || {};
    const newSelections = { ...currentSelections };
    if (newSelections[parentValue]) {
      delete newSelections[parentValue];
    } else {
      newSelections[parentValue] = [];
    }
    // Call with the variable
    updateFormData(parentKey, "sensorDataCollection", newSelections);
  };

  const handleChildChange = (parentValue, childValue) => {
    const currentSelections = formData.sensorDataCollection || {};
    const newSelections = { ...currentSelections };
    const currentChildren = newSelections[parentValue] || [];
    if (currentChildren.includes(childValue)) {
      newSelections[parentValue] = currentChildren.filter(
        (c) => c !== childValue
      );
    } else {
      newSelections[parentValue] = [...currentChildren, childValue];
    }
    // Call with the variable
    updateFormData(parentKey, "sensorDataCollection", newSelections);
  };

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
        <h3 className="section-title">Sensor data collection</h3>
        <div className="checkbox-list">
          {dataPracticesData.sensorData.map((parentOption) => {
            const isParentChecked = !!(formData.sensorDataCollection || {})[
              parentOption.value
            ];

            return (
              <div key={parentOption.value} className="parent-checkbox-group">
                <div className="tooltip-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isParentChecked}
                      onChange={() => handleParentChange(parentOption.value)}
                    />
                    <div className="label-content">
                      <span className="checkbox-text">
                        {parentOption.label}
                      </span>
                      {/* <ColorCircle
                        color={parentOption.color}
                        isChecked={isParentChecked}
                      /> */}
                    </div>
                  </label>
                  <span className="tooltip-text">
                    {parentOption.description}
                  </span>
                </div>

                {/* --- NESTED CHECKBOXES RENDERED HERE --- */}
                {isParentChecked && parentOption.subItems && (
                  <div className="nested-checkbox-list">
                    {parentOption.subItems.map((childOption) => {
                      const isChildChecked = (
                        (formData.sensorDataCollection || {})[
                          parentOption.value
                        ] || []
                      ).includes(childOption.value);
                      return (
                        <label
                          key={childOption.value}
                          className="checkbox-label nested-label"
                        >
                          <input
                            type="checkbox"
                            checked={isChildChecked}
                            onChange={() =>
                              handleChildChange(
                                parentOption.value,
                                childOption.value
                              )
                            }
                          />
                          <span className="checkbox-text">
                            {childOption.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* ======================================================= */}
      {/* === UPDATE THE DATA FREQUENCY SECTION HERE            === */}
      {/* ======================================================= */}
      <div className="form-section">
        <h3 className="section-title">Data Collection Frequency</h3>
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
        <div className="radio-list">
          {dataPracticesData.localDataRetention.map((option) => {
            // Check if the single value in formData matches this option
            const isChecked = formData.localDataRetention === option.value;
            return (
              <div key={option.value} className="tooltip-container">
                <label className="radio-label">
                  <input
                    type="radio"
                    // The 'name' must be the same for all options in this group
                    name="localDataRetention"
                    value={option.value}
                    checked={isChecked}
                    // Use the new radio change handler
                    onChange={() =>
                      handleRadioChange("localDataRetention", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="radio-text">{option.label}</span>
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
        <h3 className="section-title">Data Stored in the Cloud</h3>
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
        <div className="radio-list">
          {dataPracticesData.cloudDataRetention.map((option) => {
            // Check if the single value in formData matches this option
            const isChecked = formData.cloudDataRetention === option.value;
            return (
              <div key={option.value} className="tooltip-container">
                <label className="radio-label">
                  <input
                    type="radio"
                    // The 'name' must be the same for all options in this group
                    name="cloudDataRetention"
                    value={option.value}
                    checked={isChecked}
                    // Use the existing radio change handler
                    onChange={() =>
                      handleRadioChange("cloudDataRetention", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="radio-text">{option.label}</span>
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
        <h3 className="section-title">Data shared with:</h3>
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
        <div className="radio-list">
          {dataPracticesData.dataSharingFrequency.map((option) => {
            // Check if the single value in formData matches this option
            const isChecked = formData.dataSharingFrequency === option.value;
            return (
              <div key={option.value} className="tooltip-container">
                <label className="radio-label">
                  <input
                    type="radio"
                    // The 'name' must be the same for all options in this group
                    name="dataSharingFrequency"
                    value={option.value}
                    checked={isChecked}
                    // Use the existing radio change handler
                    onChange={() =>
                      handleRadioChange("dataSharingFrequency", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="radio-text">{option.label}</span>
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
