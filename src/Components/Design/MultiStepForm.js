"use client";

import { useEffect, useState } from "react";
import DeviceInformation from "./steps/DeviceInformation";
import SecurityMechanisms from "./steps/SecurityMechanisms";
import DataPractices from "./steps/DataPractices";
import MoreInformation from "./steps/MoreInformation";
import "./MultiStepForm.css";
import PdfDocument from "./pdf/pdfDocument"; // 3. Import your new PDF template
import { PDFViewer } from "@react-pdf/renderer"; // 2. Import PDFViewer

const steps = [
  { id: 1, title: "Device Information", key: "deviceInfo" },
  { id: 2, title: "Security Mechanisms", key: "securityMechanisms" },
  { id: 3, title: "Data Practices", key: "dataPractices" },
  { id: 4, title: "More Information", key: "moreInformation" },
];

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
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
      securityUpdatesInfo: "",
      accessControl: [],
      accessControlInfo: "",
      securityOversight: "",
      securityOversightInfo: "",
      portsProtocols: "",
      hardwareSafety: "",
      softwareSafety: "",
      personalSafety: "",
      vulnerabilityDisclosure: "",
      softwareHardwareComposition: "",
      encryptionKeyManagement: "",
    },
    dataPractices: {
      sensors: [],
      otherCollectedData: "",
      otherCollectedDataInfo: "",
      childrenDataHandling: "",
      childrenDataHandlingInfo: "",
      dataLinkage: "",
      dataLinkageInfo: "",
      compliance: "GDPR",
      complianceInfo: "",
      dataInference: "",
      dataInferenceInfo: "",
      privacyPolicyUrl: "",
    },
    moreInformation: {
      detailedLabelUrl: "",
      contactPhone: "",
      contactPhoneInfo: "",
      contactEmail: "",
      contactEmailInfo: "",
      functionalityOffline: "",
      functionalityOfflineInfo: "",
      functionalityNoData: "",
      functionalityNoDataInfo: "",
      physicalActuations: "",
      physicalActuationsInfo: "",
      compatiblePlatforms: "",
      compatiblePlatformsInfo: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (stepKey, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [field]: value,
      },
    }));
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

  const handleDownload = () => {
    // Create a downloadable JSON file with all form data
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "iot-security-label-data.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const renderStepContent = () => {
    const currentStepData = formData[steps[currentStep - 1].key];

    switch (currentStep) {
      case 1:
        return (
          <DeviceInformation
            formData={currentStepData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <SecurityMechanisms
            formData={currentStepData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <DataPractices
            formData={currentStepData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <MoreInformation
            formData={currentStepData}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      <div className="form-card">{renderStepContent()}</div>

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
          <button onClick={handleDownload} className="btn btn-primary">
            Download
          </button>
        ) : (
          <button onClick={handleNext} className="btn btn-primary">
            Next →
          </button>
        )}
      </div>

      <div className="pdf-preview-section">
        <h3>Live PDF Preview:</h3>
        {isClient ? (
          <PDFViewer style={{ width: "100%", height: "800px" }}>
            <PdfDocument formData={formData} />
          </PDFViewer>
        ) : (
          <div className="placeholder-text">Loading PDF Preview...</div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
