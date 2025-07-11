"use client";

import TooltipWrapper from "../TooltipWrapper";
// 1. Import our new data object!
import { securityData } from "./data/SecurityMechanismsData";

// A simple, reusable component for our colored circle.
// It now receives the color directly, making it much simpler.
// REPLACE your existing ColorCircle component with this one
// const ColorCircle = ({ color, isChecked }) => {
//   // If no color data is provided for this option, render nothing.
//   if (!color) {
//     return null;
//   }

//   let finalColor;
//   let isAlwaysFilled = false;

//   // Check if the color data is an object (for our new two-state system)
//   if (typeof color === "object" && color.checked && color.unchecked) {
//     finalColor = isChecked ? color.checked : color.unchecked;
//     isAlwaysFilled = true; // This type of circle is always filled, just with different colors.
//   } else {
//     // Otherwise, use the old system (a simple color string)
//     finalColor = color;
//   }

//   return (
//     <span
//       className="color-indicator"
//       style={{
//         // The border is always the determined color
//         borderColor: finalColor,
//         // The background fills based on the system type
//         backgroundColor:
//           isAlwaysFilled || isChecked ? finalColor : "transparent",
//       }}
//     />
//   );
// };

const SecurityMechanisms = ({ formData, updateFormData }) => {
  // These handler functions remain exactly the same. No changes needed.
  const parentKey = "securityMechanisms"; // Or whatever parent key you use
  const handleCheckboxChange = (field, value) => {
    const currentValues = formData[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    updateFormData("securityMechanisms", field, updatedValues);
  };

  const handleRadioChange = (field, value) => {
    updateFormData("securityMechanisms", field, value);
  };

  const handleDateChange = (optionValue, date) => {
    const currentDates = formData.securityUpdateDates || {};
    const updatedDates = {
      ...currentDates,
      [optionValue]: date,
    };
    updateFormData(parentKey, "securityUpdateDates", updatedDates);
  };
  // const handleInputChange = (field, value) => {
  //   updateFormData("securityMechanisms", field, value);
  // };

  const CheckboxItem = ({ option, formData, handleCheckboxChange }) => {
    const isChecked = (formData.accessControl || []).includes(option.value);

    return (
      <div className="parent-checkbox-group">
        {/* The main checkbox label */}
        <div className="tooltip-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() =>
                handleCheckboxChange("accessControl", option.value)
              }
            />
            <span className="checkbox-text">{option.label}</span>
          </label>
          <span className="tooltip-text">{option.description}</span>
        </div>

        {/* --- THE RECURSIVE MAGIC --- */}
        {/* If this item is checked AND has children, render a nested list. */}
        {/* Each item in that list is another <CheckboxItem />. */}
        {isChecked && option.children && (
          <div className="nested-checkbox-list">
            {option.children.map((childOption) => (
              <CheckboxItem
                key={childOption.value}
                option={childOption}
                formData={formData}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // This handles the main checkbox (selecting/deselecting an item)
  const handleTechDocCheckboxChange = (optionValue) => {
    const currentSelections = formData.technicalDocumentation || {};
    const newSelections = { ...currentSelections };

    if (newSelections[optionValue]) {
      // If it exists, we are UNCHECKING it, so delete the key
      delete newSelections[optionValue];
    } else {
      // If it doesn't exist, we are CHECKING it, so add it with a default of 'no'
      newSelections[optionValue] = "no";
    }

    updateFormData(
      "securityMechanisms",
      "technicalDocumentation",
      newSelections
    );
  };

  // This handles the Yes/No radio buttons
  const handleTechDocYesNoChange = (optionValue, yesOrNo) => {
    const currentSelections = formData.technicalDocumentation || {};
    const newSelections = {
      ...currentSelections,
      [optionValue]: yesOrNo, // Update the value for the specific key
    };
    updateFormData(
      "securityMechanisms",
      "technicalDocumentation",
      newSelections
    );
  };

  const TechnicalDocumentationSection = () => {
    return (
      <div className="checkbox-list">
        {securityData.technicalDocumentation.map(
          ({ value, label, description }) => {
            const selectionState = (formData.technicalDocumentation || {})[
              value
            ];
            return (
              <div key={value} className="parent-checkbox-group">
                <div className="tooltip-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={!!selectionState}
                      onChange={() => handleTechDocCheckboxChange(value)}
                    />
                    <span className="checkbox-text">{label}</span>
                  </label>
                  <span className="tooltip-text">{description}</span>
                </div>
                {selectionState && (
                  <div className="yes-no-options">
                    <label>
                      <input
                        type="checkbox"
                        name={`yes-no-option ${value}`}
                        value="yes"
                        checked={selectionState === "yes"}
                        onChange={() => handleTechDocYesNoChange(value, "yes")}
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name={`yes-no-option ${value}`}
                        value="no"
                        checked={selectionState === "no"}
                        onChange={() => handleTechDocYesNoChange(value, "no")}
                      />{" "}
                      No
                    </label>
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    );
  };

  return (
    <div className="step-content">
      <h2 className="step-title">Security Mechanisms</h2>

      {/* Security Updates Section - Now generated from our data file */}
      <div className="form-section">
        <TooltipWrapper tooltipText="How the device receives security updates">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Security Updates
          </h3>
        </TooltipWrapper>

        <div className="checkbox-grid security-updates-grid">
          {" "}
          {/* Add new class for specific styling */}
          {securityData.securityUpdates.map(
            ({ value, label, description, hasDateInput }) => {
              const isChecked = (formData.securityUpdates || []).includes(
                value
              );

              return (
                <div
                  key={value}
                  // This applies a full-width class to the "NO SECURITY UPDATES" option
                  className={`checkbox-group tooltip-container ${
                    value === "none" ? "grid-item-full-width" : ""
                  }`}
                >
                  {/* The label and checkbox stay the same */}
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        handleCheckboxChange("securityUpdates", value)
                      }
                    />
                    <span className="checkbox-text">{label}</span>
                  </label>

                  {/* --- NEW: Conditionally render the date input --- */}
                  {hasDateInput && (
                    <input
                      type="date"
                      className="date-input"
                      // The input is disabled if the checkbox is not checked
                      disabled={!isChecked}
                      // Get the date value from a separate state object
                      value={(formData.securityUpdateDates || {})[value] || ""}
                      onChange={(e) => handleDateChange(value, e.target.value)}
                    />
                  )}

                  {/* Your tooltip for description */}
                  {description && (
                    <span className="tooltip-text">{description}</span>
                  )}
                </div>
              );
            }
          )}
        </div>
        {/* ... Additional Info textarea ... */}
      </div>

      {/* Access Control Section - Also generated from data! */}
      <div className="form-section">
        <TooltipWrapper tooltipText="How the device can be accessed and who is allowed to access">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Access Control
          </h3>
        </TooltipWrapper>

        <div className="checkbox-list">
          {/* Just map over the top-level items and let the recursive component do the rest. */}
          {securityData.accessControl.map((option) => (
            <CheckboxItem
              key={option.value}
              option={option}
              formData={formData}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
      </div>

      {/* Security Oversight Section - Generated too! */}
      <div className="form-section">
        <div className="section-title">
          {/* 1. The first item in the flex container is the title with its tooltip */}
          <TooltipWrapper tooltipText="Audits performed by internal and third-party security auditors">
            <h3 style={{ cursor: "help", margin: 0 }}>
              {" "}
              {/* Reset h3 margin for proper alignment */}
              Security Oversight
            </h3>
          </TooltipWrapper>

          {/* 2. The second item is the button, which will be pushed to the end */}
          <button
            className="clear-selection-btn"
            onClick={() => handleRadioChange("securityOversight", "")}
          >
            Clear Selection
          </button>
        </div>

        <div className="radio-list">
          {/* The destructuring is already correct here, which is great! */}
          {securityData.securityOversight.map(
            ({ value, label, color, description }) => {
              const isChecked = formData.securityOversight === value;
              return (
                <div key={value} className="tooltip-container">
                  {/* The input is now a sibling, placed before the label */}
                  <input
                    type="radio"
                    // A unique ID for this specific input (so = security oversight)
                    id={`radio-so-${value}`}
                    // The name groups these radios together
                    name="securityOversight"
                    value={value}
                    checked={isChecked}
                    onChange={() =>
                      handleRadioChange("securityOversight", value)
                    }
                    // Visually hide the default radio button
                    style={{ display: "none" }}
                  />

                  {/* The label now uses 'htmlFor' to connect to the input */}
                  <label htmlFor={`radio-so-${value}`} className="radio-label">
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
        <TooltipWrapper tooltipText="Availability of technical documents.">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Technical Documentation
          </h3>
        </TooltipWrapper>
        <TechnicalDocumentationSection />
      </div>
      {/* All other sections (textareas, URLs) would remain the same */}
    </div>
  );
};

export default SecurityMechanisms;
