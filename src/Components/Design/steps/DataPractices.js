"use client";

import { dataPracticesData } from "./data/dataPracticesData.js";
import CustomSelect from "../CustomSelect.js";
import TooltipWrapper from "../TooltipWrapper.js";

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

  // --- NEW HANDLERS for the "In Compliance with" section ---

  // This handler toggles the main checkbox for a compliance item
  const handleComplianceCheckboxChange = (optionValue) => {
    const currentSelections = formData.compliance || {};
    const newSelections = { ...currentSelections };

    if (newSelections[optionValue]) {
      // If it's already checked, unchecking it removes it from the state
      delete newSelections[optionValue];
    } else {
      // If it's not checked, checking it adds it with a default value of 'no'
      newSelections[optionValue] = "no";
    }
    // Make sure 'dataPractices' is the correct parent key
    updateFormData("dataPractices", "compliance", newSelections);
  };

  // This handler manages the "Yes" or "No" selection

  const handleComplianceDocYesNoChange = (optionValue, yesOrNo) => {
    const currentSelections = formData.technicalDocumentation || {};
    const newSelections = {
      ...currentSelections,
      [optionValue]: yesOrNo, // Update the value for the specific key
    };
    updateFormData("dataPractices", "compliance", newSelections);
  };
  return (
    <div className="step-content">
      <h2 className="step-title">Data Practices</h2>
      {/* Sensor Data Collection Section */}
      <div className="form-section">
        <TooltipWrapper tooltipText="">
          <h3 className="section-title" style={{ display: "inline-block" }}>
            Sensor data collection
          </h3>
        </TooltipWrapper>

        {/* The dropdown is replaced with this checkbox list */}
        <div className="checkbox-list">
          {/* We map over the same data source as before */}
          {dataPracticesData.sensorDataCollectionMethod.map(
            ({ value, label, description }) => {
              // Check if the current option's value is in our state array
              const isChecked = (
                formData.sensorDataCollectionMethod || []
              ).includes(value);

              return (
                <div key={value} className="tooltip-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      // Use the new handler for array-based state
                      onChange={() =>
                        handleCheckboxChange(
                          "sensorDataCollectionMethod",
                          value
                        )
                      }
                    />
                    <div className="label-content">
                      <span className="checkbox-text">{label}</span>
                    </div>
                  </label>
                  {/* Display a tooltip if a description exists */}
                  {description && (
                    <span className="tooltip-text">{description}</span>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* --- SENSOR TYPE DROPDOWN SECTION --- */}
      <div className="form-section">
        <h3 className="section-title">Sensor Type</h3>

        {/* The dropdown is replaced with this checkbox list */}
        <div className="checkbox-list">
          {/* We map over the sensorTypes data */}
          {dataPracticesData.sensorTypes.map(
            ({ value, label, description }) => {
              // Check if the current option's value is in our new state array
              const isChecked = (formData.sensorDataTypes || []).includes(
                value
              );

              return (
                <div key={value} className="tooltip-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      // Use the checkbox handler and our new state key "sensorDataTypes"
                      onChange={() =>
                        handleCheckboxChange("sensorDataTypes", value)
                      }
                    />
                    <div className="label-content">
                      <span className="checkbox-text">{label}</span>
                    </div>
                  </label>
                  {/* Display a tooltip if a description exists */}
                  {description && (
                    <span className="tooltip-text">{description}</span>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
      {/* ======================================================= */}
      {/* === UPDATE THE DATA FREQUENCY SECTION HERE            === */}
      {/* ======================================================= */}
      <div className="form-section">
        <TooltipWrapper tooltipText="How frequent user's data is being shared">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Data Collection Frequency
          </h3>
        </TooltipWrapper>
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
                {option.description !== "" && (
                  <span className="tooltip-text">{option.description}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* ======================================================= */}
      {/* === UPDATE THE PURPOSE SECTION HERE                   === */}
      {/* ======================================================= */}
      <div className="form-section">
        <TooltipWrapper tooltipText="The purpose of data collection">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Purpose of data collection
          </h3>
        </TooltipWrapper>

        {/* Use 'radio-list' to get the same styling as your example */}
        <div className="radio-list">
          {dataPracticesData.dataPurpose.map(
            ({ value, label, description }) => {
              // The check for "checked" changes from an array search to a simple string comparison
              const isChecked = formData.dataPurpose === value;

              return (
                <div key={value} className="tooltip-container">
                  {/* The hidden radio input, just like your example */}
                  <input
                    type="radio"
                    // A unique ID for this specific input
                    id={`radio-purpose-${value}`}
                    // This 'name' groups all these radios together, allowing only one to be selected
                    name="dataPurpose"
                    value={value}
                    checked={isChecked}
                    // Use handleRadioChange, which sets a single string value in the state
                    onChange={() => handleRadioChange("dataPurpose", value)}
                    style={{ display: "none" }}
                  />

                  {/* The clickable label, linked by 'htmlFor' to the input's 'id' */}
                  <label
                    htmlFor={`radio-purpose-${value}`}
                    className="radio-label"
                  >
                    <div className="label-content">
                      <span className="radio-text">{label}</span>
                    </div>
                  </label>

                  {/* The tooltip logic remains the same */}
                  {description !== "" && (
                    <span className="tooltip-text">{description}</span>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Data stored on the device</h3>

        {/* Use 'radio-list' for consistent styling */}
        <div className="radio-list">
          {dataPracticesData.dataStorage.map(
            ({ value, label, description }) => {
              // The check now compares strings, not an array
              const isChecked = formData.dataStorage === value;

              return (
                <div key={value} className="tooltip-container">
                  {/* The hidden radio input */}
                  <input
                    type="radio"
                    // A unique ID for this input
                    id={`radio-storage-${value}`}
                    // The 'name' attribute groups these radio buttons
                    name="dataStorage"
                    value={value}
                    checked={isChecked}
                    // Use the radio handler to set a single value
                    onChange={() => handleRadioChange("dataStorage", value)}
                    style={{ display: "none" }}
                  />

                  {/* The clickable label linked to the input */}
                  <label
                    htmlFor={`radio-storage-${value}`}
                    className="radio-label"
                  >
                    <div className="label-content">
                      <span className="radio-text">{label}</span>
                    </div>
                  </label>

                  {/* The tooltip remains the same */}
                  <span className="tooltip-text">{description}</span>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="form-section">
        <TooltipWrapper tooltipText=" For how long data will be stored on the device">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Local Data Retention Time
          </h3>
        </TooltipWrapper>

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
        <TooltipWrapper tooltipText="Whether user's identity could be revealed by the data stored in the cloud">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Data Stored in the Cloud
          </h3>
        </TooltipWrapper>
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
        <TooltipWrapper tooltipText="For how long data will be stored in the cloud">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Cloud Data Retention Time
          </h3>
        </TooltipWrapper>
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
        <TooltipWrapper tooltipText="Who user's data will be shared with">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Data shared with
          </h3>
        </TooltipWrapper>

        {/* Use 'radio-list' for consistent styling */}
        <div className="radio-list">
          {dataPracticesData.dataSharedWith.map(
            ({ value, label, description }) => {
              // The check is now a simple string comparison
              const isChecked = formData.dataSharedWith === value;

              return (
                <div key={value} className="tooltip-container">
                  {/* The hidden radio input */}
                  <input
                    type="radio"
                    // A unique ID for this specific input
                    id={`radio-shared-${value}`}
                    // The 'name' attribute groups these radios together
                    name="dataSharedWith"
                    value={value}
                    checked={isChecked}
                    // Use the radio handler to set a single string value
                    onChange={() => handleRadioChange("dataSharedWith", value)}
                    style={{ display: "none" }}
                  />

                  {/* The clickable label linked to its input */}
                  <label
                    htmlFor={`radio-shared-${value}`}
                    className="radio-label"
                  >
                    <div className="label-content">
                      <span className="radio-text">{label}</span>
                    </div>
                  </label>

                  {/* Your tooltip for the description (if you want to add it back) */}
                  {description && (
                    <span className="tooltip-text">{description}</span>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="form-section">
        <TooltipWrapper tooltipText="How frequent user's data is being shared">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Data sharing frequency
          </h3>
        </TooltipWrapper>

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
                  {description !== "" && (
                    <span className="tooltip-text">{description}</span>
                  )}
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

        <div className="radio-list">
          {dataPracticesData.otherDataCollected.map(
            ({ value, label, description }) => {
              // This line reads from the CORRECT state key
              const isChecked = formData.otherDataCollected === value;

              return (
                <div key={value} className="tooltip-container">
                  <input
                    type="radio"
                    id={`radio-other-${value}`}
                    name="otherDataCollected"
                    value={value}
                    checked={isChecked}
                    // This line now UPDATES the CORRECT state key
                    onChange={() =>
                      handleRadioChange("otherDataCollected", value)
                    }
                    style={{ display: "none" }}
                  />

                  <label
                    htmlFor={`radio-other-${value}`}
                    className="radio-label"
                  >
                    <div className="label-content">
                      <span className="radio-text">{label}</span>
                    </div>
                  </label>

                  {/* Your tooltip description */}
                  {/* <span className="tooltip-text">{description}</span> */}
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">
          Special Data Handling Practices for Children
        </h3>

        {/* Use 'radio-list' for consistent styling with your other radio groups */}
        <div className="radio-list">
          {dataPracticesData.childrensDataHandling.map(
            ({ value, label, description }) => {
              // The check is now a simple string comparison for a single selected value
              const isChecked = formData.childrensDataHandling === value;

              return (
                <div key={value} className="tooltip-container">
                  {/* The hidden radio input */}
                  <input
                    type="radio"
                    // A unique ID for this input
                    id={`radio-children-${value}`}
                    // The 'name' attribute is essential to group these two options
                    name="childrensDataHandling"
                    value={value}
                    checked={isChecked}
                    // Use the radio handler to set a single string value in the state
                    onChange={() =>
                      handleRadioChange("childrensDataHandling", value)
                    }
                    style={{ display: "none" }}
                  />

                  {/* The clickable label linked to its corresponding input */}
                  <label
                    htmlFor={`radio-children-${value}`}
                    className="radio-label"
                  >
                    <div className="label-content">
                      <span className="radio-text">{label}</span>
                    </div>
                  </label>

                  {/* The tooltip for the description */}
                  <span className="tooltip-text">{description}</span>
                </div>
              );
            }
          )}
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

        {/* Use 'checkbox-list' for the main container */}
        <div className="checkbox-list">
          {dataPracticesData.compliance.map(({ value, label, description }) => {
            // Get the current state for this item ('yes', 'no', or undefined)
            const selectionState = (formData.compliance || {})[value];

            return (
              <div key={value} className="parent-checkbox-group">
                <div className="tooltip-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      // The main checkbox is active if the state exists
                      checked={!!selectionState}
                      // Use the new handler for the main checkbox
                      onChange={() => handleComplianceCheckboxChange(value)}
                    />
                    <div className="label-content">
                      <span className="checkbox-text">{label}</span>
                    </div>
                  </label>
                  <span className="tooltip-text">{description}</span>
                </div>

                {/* Conditionally render the Yes/No options only when the main box is checked */}
                {selectionState && (
                  <div className="yes-no-options">
                    <label>
                      <input
                        type="checkbox"
                        name={`yes-no-option ${value}`}
                        value="yes"
                        checked={selectionState === "yes"}
                        onChange={() =>
                          handleComplianceDocYesNoChange(value, "yes")
                        }
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name={`yes-no-option ${value}`}
                        value="no"
                        checked={selectionState === "no"}
                        onChange={() =>
                          handleComplianceDocYesNoChange(value, "no")
                        }
                      />{" "}
                      No
                    </label>
                  </div>
                )}
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

      <div className="form-section">
        <label htmlFor="contactPhone" className="form-label">
          <span className="section-title">Call with your questions at </span>
          <span className="label-hint">(Phone number)</span>
        </label>
        <input
          id="contactPhone"
          type="tel"
          placeholder="Number to contact"
          value={formData.contactPhone || ""}
          onChange={(e) =>
            updateFormData(parentKey, "contactPhone", e.target.value)
          }
          className="form-input"
        />
      </div>

      {/* --- NEW: Email Address Input --- */}
      <div className="form-section">
        <label htmlFor="contactEmail" className="form-label">
          <span className="section-title">Email with your questions at </span>
          <span className="label-hint">(Email address)</span>
        </label>
        <input
          id="contactEmail"
          type="email"
          placeholder="Email to contact"
          value={formData.contactEmail || ""}
          onChange={(e) =>
            updateFormData(parentKey, "contactEmail", e.target.value)
          }
          className="form-input"
        />
      </div>
    </div>
  );
};

export default DataPractices;
