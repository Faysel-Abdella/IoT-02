export const MoreInformationsData = {
  privacyPolicy: [
    {
      value: "DETAILED_PRACTICES_PROVIDED",
      label: "Detailed privacy and security practices",
      description:
        "A comprehensive privacy policy detailing data and security practices is provided.",
      color: "#4CAF50", // Green
    },
    {
      value: "POLICY_NOT_DISCLOSED",
      label: "Not disclosed",
      description:
        "The manufacturer does not provide a privacy policy or disclose their practices.",
      color: "#F44336", // Red
    },
  ],

  offlineFunctionality: [
    {
      value: "FULL_FUNCTIONALITY",
      label: "Full functionality",
      description:
        "Device will remain fully functional when no internet is available.",
      color: "#4CAF50", // Green
    },
    {
      value: "LIMITED_FUNCTIONALITY",
      label: "Limited functionality",
      description:
        "Device will remain partially functional when no internet is available.",
      color: "#FFC107", // Yellow
    },
    {
      value: "NO_FUNCTIONALITY",
      label: "No functionality",
      description:
        "Device will not remain functional when no internet is available.",
      color: "#F44336", // Red
    },
    {
      value: "FUNCTIONALITY_NOT_DISCLOSED",
      label: "Not disclosed",
      description: "",
      color: "#F44336", // Red
    },
  ],

  noDataFunctionality: [
    {
      value: "FULL_FUNCTIONALITY_NO_DATA",
      label: "Full functionality",
      description:
        "Device will remain fully functional when data is not being processed.",
      color: "#4CAF50", // Green
    },
    {
      value: "NOT_APPLICABLE_NO_DATA",
      label: "Not applicable",
      description:
        "This is not applicable as the device will not process any data.",
      color: "#4CAF50", // Green
    },
    {
      value: "LIMITED_FUNCTIONALITY_NO_DATA",
      label: "Limited functionality",
      description:
        "Device will remain partially functional when data is not being processed.",
      color: "#FFC107", // Yellow
    },
    {
      value: "NO_FUNCTIONALITY_NO_DATA",
      label: "No functionality",
      description:
        "Device will not remain functional when data is not being processed.",
      color: "#F44336", // Red
    },
    {
      value: "FUNCTIONALITY_NOT_DISCLOSED_NO_DATA",
      label: "Not disclosed",
      description: "",
      color: null, // No color for 'Not disclosed'
    },
  ],

  physicalActuations: [
    {
      value: "PHYSICAL_ACTUATIONS_NOT_DISCLOSED",
      label: "Not disclosed",
      description:
        "Information about how the device behaves in response to physical triggers is not disclosed.",
      color: null, // No color specified
    },
  ],
};
