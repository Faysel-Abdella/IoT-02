"use client";

import TooltipWrapper from "../TooltipWrapper";
import { MoreInformationsData } from "./data/MoreInforrmationsData";

// We can reuse the same smart ColorCircle component
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

  // const handleInputChange = (field, value) => {
  //   updateFormData(parentKey, field, value);
  // };

  return (
    <div className="step-content">
      <h2 className="step-title">More Information</h2>

      {/* Privacy Policy Section */}
      <div className="form-section">
        <h3 className="section-title">Privacy Policy</h3>
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
        <TooltipWrapper tooltipText="How the device is expected to function when no internet is available">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Functionality when offline
          </h3>
        </TooltipWrapper>

        <div className="radio-list">
          {/* Using the clean, destructured parameters as requested */}
          {MoreInformationsData.offlineFunctionality.map(
            ({ value, label, description }) => {
              const isChecked = formData.offlineFunctionality === value;

              return (
                <div key={value} className="tooltip-container">
                  {/* The input is now a sibling, placed before the label */}
                  <input
                    type="radio"
                    // A unique ID for this specific input (of = offline functionality)
                    id={`radio-of-${value}`}
                    // The name groups these radios together
                    name="offlineFunctionality"
                    value={value}
                    checked={isChecked}
                    onChange={() =>
                      handleRadioChange("offlineFunctionality", value)
                    }
                    // Visually hide the default radio button
                    style={{ display: "none" }}
                  />

                  {/* The label now uses 'htmlFor' to connect to the input */}
                  <label htmlFor={`radio-of-${value}`} className="radio-label">
                    <div className="label-content">
                      <span className="radio-text">{label}</span>
                    </div>
                  </label>

                  {/* The tooltip remains unchanged */}
                  {description && description !== "" && (
                    <span className="tooltip-text">{description}</span>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="form-section">
        <TooltipWrapper tooltipText="How the device is expected to function when data is not being processed">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Functionality with No Data Processing
          </h3>
        </TooltipWrapper>

        {/* Use 'radio-list' for consistent styling */}
        <div className="radio-list">
          {MoreInformationsData.noDataFunctionality.map(
            ({ value, label, description }) => {
              // The check is now a simple string comparison, not an array search
              const isChecked = formData.noDataFunctionality === value;

              return (
                <div key={value} className="tooltip-container">
                  {/* The hidden radio input */}
                  <input
                    type="radio"
                    // A unique ID for this input (ndf = No Data Functionality)
                    id={`radio-ndf-${value}`}
                    // The 'name' attribute is essential for grouping radio buttons
                    name="noDataFunctionality"
                    value={value}
                    checked={isChecked}
                    // Use the radio handler to set a single value
                    onChange={() =>
                      handleRadioChange("noDataFunctionality", value)
                    }
                    style={{ display: "none" }}
                  />

                  {/* The clickable label linked to its input */}
                  <label htmlFor={`radio-ndf-${value}`} className="radio-label">
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
        <TooltipWrapper tooltipText="How the device is expected to behave in response to triggers">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Physical actuations and triggers
          </h3>
        </TooltipWrapper>

        {/* --- The Free-Text Input --- */}
        <input
          id="actuators"
          type="text"
          placeholder="Device blinks when motion is detected"
          // Display the value ONLY if it's not the 'Not Disclosed' flag.
          // This makes the input clear when the box is checked.
          value={
            formData.physicalActuations === "PHYSICAL_ACTUATIONS_NOT_DISCLOSED"
              ? ""
              : formData.physicalActuations || ""
          }
          // Any typing in this box will update the state, automatically unchecking the box below.
          // We can reuse your handleRadioChange because it sets a single string value.
          onChange={(e) =>
            handleRadioChange("physicalActuations", e.target.value)
          }
          className="form-input"
        />

        {/* --- The "Not Disclosed" Checkbox --- */}
        {/* We wrap it in its own div for proper spacing. */}
        <div className="checkbox-list" style={{ marginTop: "12px" }}>
          {MoreInformationsData.physicalActuations.map((option) => {
            // The box is checked ONLY if the state exactly matches its value.
            const isChecked = formData.physicalActuations === option.value;

            return (
              <div key={option.value} className="tooltip-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    // This logic handles both checking and unchecking.
                    onChange={() => {
                      const newValue = isChecked ? "" : option.value;
                      handleRadioChange("physicalActuations", newValue);
                    }}
                  />
                  <div className="label-content">
                    <span className="checkbox-text">{option.label}</span>
                  </div>
                </label>
                <span className="tooltip-text">{option.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-section">
        <TooltipWrapper tooltipText="List of platforms the device can work with">
          <h3
            className="section-title"
            style={{ cursor: "help", display: "inline-block" }}
          >
            Compatible platforms
          </h3>
        </TooltipWrapper>
        <input
          id="platforms"
          type="text"
          placeholder="Amazon Alexa"
          // FIX 1: Read directly from the formData prop passed to this component.
          // It should not be formData.MoreInformation.compatiblePlatforms
          value={formData.compatiblePlatforms || ""}
          // FIX 2: Update the correct state field: "compatiblePlatforms"
          onChange={(e) =>
            updateFormData(parentKey, "compatiblePlatforms", e.target.value)
          }
          className="form-input"
        />
      </div>

      {/* You can add more sections to this component in the future */}
    </div>
  );
};

export default MoreInformation;
