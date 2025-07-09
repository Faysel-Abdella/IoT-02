"use client";

import { MoreInformationsData } from "./data/MoreInforrmationsData";

// We can reuse the same smart ColorCircle component
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

const MoreInformation = ({ formData, updateFormData }) => {
  // This component manages its own checkbox changes

  const parentKey = "moreInformation";
  const handleCheckboxChange = (field, value) => {
    // We assume this component's data will be stored under the 'moreInformation' key in the main form state
    const parentKey = "moreInformation";

    const currentValues = formData[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    updateFormData(parentKey, field, updatedValues);
  };

  const handleRadioChange = (field, value) => {
    updateFormData(parentKey, field, value);
  };

  const handleInputChange = (field, value) => {
    updateFormData(parentKey, field, value);
  };

  return (
    <div className="step-content">
      <h2 className="step-title">More Information</h2>

      {/* Privacy Policy Section */}
      <div className="form-section">
        <h3 className="section-title">Privacy Policy:</h3>
        <div className="checkbox-list">
          {MoreInformationsData.privacyPolicy.map((option) => {
            const isChecked = (formData.privacyPolicy || []).includes(
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
                      handleCheckboxChange("privacyPolicy", option.value)
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
        <h3 className="section-title">Functionality when offline</h3>
        <div className="radio-list">
          {MoreInformationsData.offlineFunctionality.map((option) => {
            // Check if the single value in formData matches this option
            const isChecked = formData.offlineFunctionality === option.value;
            return (
              <div key={option.value} className="tooltip-container">
                <label className="radio-label">
                  <input
                    type="radio"
                    // The 'name' must be the same for all options in this group
                    name="offlineFunctionality"
                    value={option.value}
                    checked={isChecked}
                    // Use the new radio change handler
                    onChange={() =>
                      handleRadioChange("offlineFunctionality", option.value)
                    }
                  />
                  <div className="label-content">
                    <span className="radio-text">{option.label}</span>
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
        <h3 className="section-title">Functionality with No Data Processing</h3>
        <div className="checkbox-list">
          {MoreInformationsData.noDataFunctionality.map((option) => {
            // We use a new state field 'noDataFunctionality'
            const isChecked = (formData.noDataFunctionality || []).includes(
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
                      handleCheckboxChange("noDataFunctionality", option.value)
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
        <h3 className="section-title">Physical actuations and triggers</h3>
        {/* Add the subtitle here */}
        <p className="section-description">
          How the device is expected to behave in response to triggers
        </p>

        <div className="form-group">
          <textarea
            className="form-textarea"
            rows="4"
            placeholder="e.g., Windows 10, macOS, iOS 15+, Android 12+, etc."
            // We use a new state field 'compatiblePlatforms'
            value={formData.compatiblePlatforms || ""}
            onChange={(e) =>
              handleInputChange("compatiblePlatforms", e.target.value)
            }
          />
        </div>
        <div className="checkbox-list">
          {MoreInformationsData.physicalActuations.map((option) => {
            // We use a new state field 'physicalActuations'
            const isChecked = (formData.physicalActuations || []).includes(
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
                      handleCheckboxChange("physicalActuations", option.value)
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
        <h3 className="section-title">Compatible platforms</h3>
        <p className="section-description">
          List of platforms the device can work with
        </p>

        <div className="form-group">
          <textarea
            className="form-textarea"
            rows="4"
            placeholder="e.g., Windows 10, macOS, iOS 15+, Android 12+, etc."
            // We use a new state field 'compatiblePlatforms'
            value={formData.compatiblePlatforms || ""}
            onChange={(e) =>
              handleInputChange("compatiblePlatforms", e.target.value)
            }
          />
        </div>
      </div>

      {/* You can add more sections to this component in the future */}
    </div>
  );
};

export default MoreInformation;
