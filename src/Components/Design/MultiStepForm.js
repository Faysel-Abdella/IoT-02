"use client";

import { useState } from "react";
import DeviceInformation from "./steps/DeviceInformation";
import SecurityMechanisms from "./steps/SecurityMechanisms";
import DataPractices from "./steps/DataPractices";
import MoreInformation from "./steps/MoreInformation";
import "./MultiStepForm.css";
import { PDFDownloadLink } from "@react-pdf/renderer"; // 2. Import PDFViewer
import PdfDocument from "./pdf/pdfDocument";

const steps = [
  { id: 1, title: "Device Information", key: "deviceInfo" },
  { id: 2, title: "Security Mechanisms", key: "securityMechanisms" },
  { id: 3, title: "Data Practices", key: "dataPractices" },
  { id: 4, title: "More Information", key: "moreInformation" },
];

const MultiStepForm = ({ formData, updateFormData }) => {
  const [currentStep, setCurrentStep] = useState(1);

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

  // const renderStepContent = () => {
  //   const currentStepData = formData[steps[currentStep - 1].key];

  //   switch (currentStep) {
  //     case 1:
  //       return (
  //         <DeviceInformation
  //           formData={currentStepData}
  //           updateFormData={updateFormData}
  //         />
  //       );
  //     case 2:
  //       return (
  //         <SecurityMechanisms
  //           formData={currentStepData}
  //           updateFormData={updateFormData}
  //         />
  //       );
  //     case 3:
  //       return (
  //         <DataPractices
  //           formData={currentStepData}
  //           updateFormData={updateFormData}
  //         />
  //       );
  //     case 4:
  //       return (
  //         <MoreInformation
  //           formData={currentStepData}
  //           updateFormData={updateFormData}
  //         />
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="multi-step-form">
      {/* Progress Indicator */}
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

      {/* Form Content */}
      {/* <div className="form-card">{renderStepContent()}</div> */}

      <div className="form-card">
        {steps.map((step) => {
          // Determine which component to render for the current step in the loop
          const StepComponent = {
            1: DeviceInformation,
            2: SecurityMechanisms,
            3: DataPractices,
            4: MoreInformation,
          }[step.id];

          if (!StepComponent) return null;

          return (
            // This div now has a STABLE and UNIQUE key.
            // This is the most important part of the fix.
            <div
              key={step.id}
              style={{ display: currentStep === step.id ? "block" : "none" }}
            >
              <StepComponent
                formData={formData[step.key]}
                updateFormData={updateFormData}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
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

      {/* <div className="pdf-preview-section">
        <PdfPreview formData={formData} />
      </div> */}
    </div>
  );
};

export default MultiStepForm;
