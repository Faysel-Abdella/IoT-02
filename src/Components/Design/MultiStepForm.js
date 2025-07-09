"use client"; // This pragma might not be needed if it's a child of a client component

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../lib/features/form/formSlice"; // Make sure this path is correct for your setup

// Import your step components
import DeviceInformation from "./steps/DeviceInformation";
import SecurityMechanisms from "./steps/SecurityMechanisms";
import DataPractices from "./steps/DataPractices";
import MoreInformation from "./steps/MoreInformation";
import "./MultiStepForm.css";

// Import your PDF components
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./pdf/pdfDocument";

const steps = [
  { id: 1, title: "Device Information", key: "deviceInfo" },
  { id: 2, title: "Security Mechanisms", key: "securityMechanisms" },
  { id: 3, title: "Data Practices", key: "dataPractices" },
  { id: 4, title: "More Information", key: "moreInformation" },
];

// REMOVE `formData` and `updateFormData` from the props
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();

  // GET the form's data directly from the Redux store.
  const formData = useSelector((state) => state.form);

  // This single handler will DISPATCH the update action to Redux.
  const handleUpdate = (stepKey, field, value) => {
    dispatch(updateFormData({ stepKey, field, value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  return (
    <div className="multi-step-form">
      {/* Progress Indicator (No changes needed) */}
      <div className="progress-section">
        {/* Step Labels and Progress Dots Combined */}
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.id} className="step-container">
              <button
                onClick={() => handleStepClick(step.id)}
                className={`step-label ${
                  currentStep === step.id ? "active" : ""
                }`}
              >
                {step.title}
              </button>
              <div className="step-progress">
                <button
                  onClick={() => handleStepClick(step.id)}
                  className={`progress-dot ${
                    currentStep >= step.id ? "completed" : ""
                  }`}
                />
                {index < steps.length - 1 && (
                  <div
                    className={`progress-line ${
                      currentStep > step.id ? "completed" : ""
                    }`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- THE BULLETPROOF FORM CONTENT SECTION --- */}
      <div className="form-card">
        <div style={{ display: currentStep === 1 ? "block" : "none" }}>
          <DeviceInformation
            formData={formData.deviceInfo}
            updateFormData={handleUpdate}
          />
        </div>
        <div style={{ display: currentStep === 2 ? "block" : "none" }}>
          <SecurityMechanisms
            formData={formData.securityMechanisms}
            updateFormData={handleUpdate}
          />
        </div>
        <div style={{ display: currentStep === 3 ? "block" : "none" }}>
          <DataPractices
            formData={formData.dataPractices}
            updateFormData={handleUpdate}
          />
        </div>
        <div style={{ display: currentStep === 4 ? "block" : "none" }}>
          <MoreInformation
            formData={formData.moreInformation}
            updateFormData={handleUpdate}
          />
        </div>
      </div>

      {/* Navigation Buttons (No changes needed, but PDFLink now uses Redux formData) */}
      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="btn btn-secondary"
        >
          ← Back
        </button>

        {currentStep === steps.length ? (
          <PDFDownloadLink
            document={<PdfDocument formData={formData} />}
            fileName="iot-security-label.pdf"
          >
            {({ loading }) => (
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Generating PDF..." : "Download PDF"}
              </button>
            )}
          </PDFDownloadLink>
        ) : (
          <button onClick={handleNext} className="btn btn-primary">
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
