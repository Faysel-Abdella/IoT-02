"use client";

// 1. Import our new data object!
import { securityData } from "./data/SecurityMechanismsData";

// A simple, reusable component for our colored circle.
// It now receives the color directly, making it much simpler.
// REPLACE your existing ColorCircle component with this one
const ColorCircle = ({ color, isChecked }) => {
  // If no color data is provided for this option, render nothing.
  if (!color) {
    return null;
  }

  let finalColor;
  let isAlwaysFilled = false;

  // Check if the color data is an object (for our new two-state system)
  if (typeof color === "object" && color.checked && color.unchecked) {
    finalColor = isChecked ? color.checked : color.unchecked;
    isAlwaysFilled = true; // This type of circle is always filled, just with different colors.
  } else {
    // Otherwise, use the old system (a simple color string)
    finalColor = color;
  }

  return (
    <span
      className="color-indicator"
      style={{
        // The border is always the determined color
        borderColor: finalColor,
        // The background fills based on the system type
        backgroundColor:
          isAlwaysFilled || isChecked ? finalColor : "transparent",
      }}
    />
  );
};

const SecurityMechanisms = ({ formData, updateFormData }) => {
  // These handler functions remain exactly the same. No changes needed.
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

  // const handleInputChange = (field, value) => {
  //   updateFormData("securityMechanisms", field, value);
  // };
  console.log("SecurityMechanisms component is re-rendering");
  return (
    <div className="step-content">
      <h2 className="step-title">Security Mechanisms</h2>

      {/* Security Updates Section - Now generated from our data file */}
      <div className="form-section">
        <h3 className="section-title">Security Updates</h3>

        <p class="title-description">
          How the device receives security updates.
        </p>
        <div className="checkbox-grid">
          {securityData.securityUpdates.map(
            ({ value, label, color, description }) => {
              const isChecked = (formData.securityUpdates || []).includes(
                value
              );
              return (
                <div key={value} className="checkbox-group tooltip-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        handleCheckboxChange("securityUpdates", value)
                      }
                    />
                    <span className="checkbox-text">{label}</span>
                    {/* <ColorCircle color={color} isChecked={isChecked} /> */}
                  </label>
                  {description !== "" && (
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
        <h3 className="section-title">Access Control</h3>
        <p class="title-description">
          How the device can be accessed and who is allowed to access.
        </p>
        <div className="checkbox-list">
          {securityData.accessControl.map(
            ({ value, label, color, description }) => {
              const isChecked = (formData.accessControl || []).includes(value);
              return (
                <div key={value} className="checkbox-group tooltip-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        handleCheckboxChange("accessControl", value)
                      }
                    />
                    <span className="checkbox-text">{label}</span>
                    {/* <ColorCircle color={color} isChecked={isChecked} /> */}
                  </label>
                  <span className="tooltip-text">{description}</span>
                </div>
              );
            }
          )}
        </div>
        {/* ... Additional Info textarea ... */}
      </div>

      {/* Security Oversight Section - Generated too! */}
      <div className="form-section">
        <h3 className="section-title">
          Security Oversight
          <button
            className="clear-selection-btn"
            onClick={() => handleRadioChange("securityOversight", "")}
          >
            Clear Selection
          </button>
        </h3>
        {/* FIX: Changed 'class' to the correct JSX 'className' */}
        <p className="title-description">
          Audits performed by internal and third-party security auditors.
        </p>

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
        <h3 className="section-title">Technical Documentation</h3>
        <div className="checkbox-list">
          {securityData.technicalDocumentation.map(
            ({ value, label, color, description }) => {
              const isChecked = (
                formData.technicalDocumentation || []
              ).includes(value);
              return (
                <div key={value} className="tooltip-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        handleCheckboxChange("technicalDocumentation", value)
                      }
                    />
                    <div className="label-content">
                      <span className="checkbox-text">{label}</span>
                      {/* The new ColorCircle handles the logic automatically! */}
                      {/* <ColorCircle color={color} isChecked={isChecked} /> */}
                    </div>
                  </label>
                  <span className="tooltip-text">{description}</span>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* All other sections (textareas, URLs) would remain the same */}
    </div>
  );
};

export default SecurityMechanisms;
