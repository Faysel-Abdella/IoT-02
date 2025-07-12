export const dataPracticesData = {
  sensorDataCollectionMethod: [
    {
      value: "visual",
      label: "Visual",
      description: "Device can collect visual",
      color: "#F44336", // Red
    },
    {
      value: "audio",
      label: "Audio",
      description: "Device can collect audio.",
      color: "#F44336", // Red
    },
    {
      value: "position",
      label: "Position",
      description:
        "Device can measure the exact location of an object or its relative position.",
      color: "#F44336", // Red
    },
    {
      value: "temperature",
      label: "Temperature",
      description: "Device can measure temperature",
      color: "#4CAF50", // Green
    },
    {
      value: "humidity",
      label: "Humidity",
      description:
        "Device can detect humidity to measure the amount of water in the air.",
      color: "#4CAF50", // Green
    },
    {
      value: "light",
      label: "Light",
      description: "Device can detect the amount of light.",
      color: "#4CAF50", // Green
    },

    {
      value: "presence",
      label: "Presence",
      description: "Device can sense the pressure.",
      color: "#FFC107", // Yellow
    },
    {
      value: "distance",
      label: "Distance",
      description:
        "Device can sense ultrasonic sound waves to measure the distance to an object",
      color: "#4CAF50", // Green
    },
  ],

  // --- Data for the SECOND dropdown ---
  sensorTypes: [
    { value: "camera", label: "Camera" },
    { value: "microphone", label: "Microphone" },
    { value: "gps_sensor", label: "GPS sensor" },
    { value: "temperature_sensor", label: "Temperature sensor" },
    { value: "humidity_sensor", label: "Humidity sensor" },
    { value: "ambient_light_sensor", label: "Ambient light sensor" },
    { value: "proximity", label: "Proximity" },
    { value: "ultrasonic", label: "Ultrasonic" },
  ],
  // ADD THE NEW DATA FOR FREQUENCY
  dataFrequency: [
    {
      value: "ON_EVENT",
      label: "When an event happens",
      description: "Data is shared only when specific events happen.",
      color: "#4CAF50", // Green
    },
    {
      value: "ON_THIRD_PARTY_REQUEST",
      label: "When third parties request it",
      description: "The frequency of data sharing is imposed by third parties.",
      color: "#F44336", // Red
    },
    {
      value: "ON_USER_REQUEST",
      label: "When user requests it",
      description: "Data is shared only when the user explicitly requests it.",
      color: "#4CAF50", // Green
    },
    {
      value: "PERIODIC",
      label: "Periodic",
      description: "",
      color: "#FFC107", // Yellow
    },
    {
      value: "CONTINUOUS",
      label: "Continuous",
      description: "",
      color: "#F44336", // Red
    },
    {
      value: "ON_LEGAL_REQUIREMENT",
      label: "When required by law",
      description: "",
      color: "#FFC107", // Yellow
    },
    {
      value: "NOT_DISCLOSED",
      label: "Not disclosed",
      description: "",
      color: "#F44336", // Red
    },
  ],

  // ADD THE NEW DATA FOR PURPOSE
  dataPurpose: [
    {
      value: "CORE_FUNCTIONALITY",
      label: "Providing and improving core device functionality",
      description:
        "Data is collected to provide main features, improve services, and develop new features.",
      color: "#4CAF50", // Green
    },
    {
      value: "PERSONALIZATION",
      label: "Personalization",
      description:
        "Data is collected to provide the user with personally relevant features and customized content.",
      color: "#FFC107", // Yellow
    },
    {
      value: "TAILORED_ADVERTISING",
      label: "Tailored advertising and monetization",
      description: "Tailored advertising and monetization",
      color: "#F44336", // Red
    },
    {
      value: "CONTACTING_AND_UPDATING_USERS",
      label: "Contacting and updating users",
      description: "Contacting and updating user",
      color: "#FFC107", // Yellow
    },
    {
      value: "SECURITY_AND_SEFETY",
      label: "Security and safety ",
      description:
        "Data is being collected to increase and maintain safety and prevent potentially illegal activities",
      color: "#4CAF50", // Green
    },

    {
      value: "RESEARCH",
      label: "Research",
      description: "Data is being collected for research purposes.",
      color: "#FFC107", // Yellow
    },

    {
      value: "UNSPECIFIED_THIRD_PARTY_USE",
      label: "Unspecified third-party use",
      description:
        "The manufacturer is not able to specify the purpose of the collected data that will be shared with third parties.",
      color: "#F44336", // Red
    },
    {
      value: "NOT_DISCLOSED",
      label: "Not disclosed",
      description: "",
      color: "#F44336", // Red
    },
  ],

  dataStorage: [
    {
      value: "IDENTIFIABLE",
      label: "Identifiable",
      description:
        "Whether user's identity could be revealed by the data stored on the device.",
      color: "#F44336", // Red
    },
    {
      value: "DE_IDENTIFIABLE",
      label: "De-Identifiable",
      description:
        "The data stored on the device does not contain any personal identifiers that reveal a user's identity.",
      color: "#4CAF50", // Green
    },
    {
      value: "PSEUDONYMIZED",
      label: "Pseudonymized",
      description:
        "The identifiers in the data stored on the device are replaced with pseudonyms, which are held separately from the data subject to technical safeguards.",
      color: "#4CAF50", // Green
    },
    {
      value: "NO_DEVICE_STORAGE",
      label: "No device storage",
      description: "The collected data will not be stored on the device.",
      color: "#4CAF50", // Green
    },
  ],

  localDataRetention: [
    {
      value: "UP_TO_A_DAY",
      label: "Up to a day",
      description:
        "User's data will be retained on the device up to one day and after that it will get deleted.",
      color: "#4CAF50", // Green
    },
    {
      value: "UP_TO_A_WEEK",
      label: "Up to a week",
      description:
        "User's data will be retained on the device up to one week and after that it will get deleted.",
      color: "#FFC107", // Yellow
    },
    {
      value: "UP_TO_A_MONTH",
      label: "Up to a month",
      description:
        "User's data will be retained on the device up to one month and after that it will get deleted.",
      color: "#FFC107", // Yellow
    },
    {
      value: "UP_TO_10_YEARS",
      label: "Up to 10 years",
      description:
        "User's data will be retained on the device up to 10 years and after that it will get deleted.",
      color: "#F44336", // Red
    },
    {
      value: "FOREVER",
      label: "Forever",
      description: "User's data may be retained on the device indefinitely.",
      color: "#F44336", // Red
    },
    {
      value: "NO_RETENTION",
      label: "No retention",
      description: "User's data will not be retained on the device.",
      color: "#4CAF50", // Green
    },
  ],

  cloudDataStorage: [
    {
      value: "IDENTIFIABLE_CLOUD",
      label: "Identifiable",
      description:
        "User's identity could be revealed from the data stored in the cloud.",
      color: "#F44336", // Red
    },
    {
      value: "DE_IDENTIFIED_CLOUD",
      label: "De-identified",
      description:
        "The data stored in the cloud does not contain any personal identifiers that reveal a user's identity.",
      color: "#4CAF50", // Green
    },
    {
      value: "PSEUDONYMIZED_CLOUD",
      label: "Pseudonymized",
      description:
        "The identifiers in the data stored in the cloud are replaced with pseudonyms, which are held separately from the data subject to technical safeguards.",
      color: "#FFC107", // Yellow
    },
    {
      value: "NO_CLOUD_STORAGE",
      label: "No cloud storage",
      description: "The collected data will not be stored in the cloud.",
      color: "#4CAF50", // Green
    },
    {
      value: "NOT_DISCLOSED_CLOUD",
      label: "Not disclosed",
      description: "",
      color: "#F44336", // Red
    },
  ],

  cloudDataRetention: [
    {
      value: "UP_TO_A_DAY_CLOUD",
      label: "Up to a day",
      description:
        "User's data will be retained in the cloud for up to one day and then deleted.",
      color: "#4CAF50", // Green
    },
    {
      value: "UP_TO_A_WEEK_CLOUD",
      label: "Up to a week",
      description:
        "User's data will be retained in the cloud for up to one week and then deleted.",
      color: "#FFC107", // Yellow
    },
    {
      value: "UP_TO_A_MONTH_CLOUD",
      label: "Up to a month",
      description:
        "User's data will be retained in the cloud for up to one month and then deleted.",
      color: "#FFC107", // Yellow
    },
    {
      value: "UP_TO_10_YEARS_CLOUD",
      label: "Up to 10 years",
      description:
        "User's data will be retained in the cloud for up to 10 years and then deleted.",
      color: "#F44336", // Red
    },
    {
      value: "FOREVER_CLOUD",
      label: "Forever",
      description: "User's data may be retained in the cloud indefinitely.",
      color: "#F44336", // Red
    },
    {
      value: "NO_RETENTION_CLOUD",
      label: "No retention",
      description: "User's data will not be retained in the cloud.",
      color: "#4CAF50", // Green
    },
  ],

  dataSharedWith: [
    {
      value: "THIRD_PARTIES",
      label: "Third parties",
      // description:
      //   "User data is shared with external companies or partners for their own use (e.g., marketing, analytics).",
      color: "#F44336", // Red
    },
    {
      value: "EMERGENCY_SERVICES",
      label: "Emergency services",
      // description:
      //   "Data is shared with emergency services (e.g., police, ambulance) in case of an incident.",
      color: "#4CAF50", // Green
    },

    {
      value: "MANUFACTURER",
      label: "Manufacturer",
      // description:
      //   "Data is shared internally within the manufacturer's organization or with its direct affiliates.",
      color: "#FFC107", // Yellow
    },
    {
      value: "GOVERNMENT_AND_LEGAL",
      label: "Government and legal authorities",
      // description:
      //   "Data is shared with government bodies or law enforcement when legally required.",
      color: "#FFC107", // Yellow
    },
    {
      value: "SERVICE_PROVIDERS",
      label: "Service providers",
      // description:
      //   "Data is shared with companies that perform services on behalf of the manufacturer (e.g., cloud hosting).",
      color: "#FFC107", // Yellow
    },
    {
      value: "PUBLIC",
      label: "Public",
      // description: "Data is made publicly available to anyone.",
      color: "#F44336", // Red
    },
    {
      value: "NOT_SHARED",
      label: "Not shared",
      // description: "User data is not shared with any external parties.",
      color: "#4CAF50", // Green
    },
    {
      value: "NOT_DISCLOSED_SHARED",
      label: "Not disclosed",
      // description:
      //   "The manufacturer does not disclose who the data is shared with.",
      color: "#F44336", // Red
    },
  ],

  dataSharingFrequency: [
    {
      value: "ON_THIRD_PARTY_REQUEST_FREQ",
      label: "When third parties request it",
      description:
        "The frequency of data sharing is imposed by the third parties.",
      color: "#F44336", // Red
    },
    {
      value: "ON_USER_REQUEST_FREQ",
      label: "When user requests it",
      description: "Data is shared when the user requests it.",
      color: "#4CAF50", // Green
    },
    {
      value: "PERIODIC_FREQ",
      label: "Periodic",
      description: "",
      color: "#FFC107", // Yellow
    },

    {
      value: "CONTINUOUS_FREQ",
      label: "Continuous",
      description: "",
      color: "#F44336", // Red
    },
    {
      value: "ON_LEGAL_REQUIREMENT_FREQ",
      label: "When required by law",
      description: "",
      color: "#FFC107", // Yellow
    },
    {
      value: "NOT_SHARED_FREQ",
      label: "Not shared",
      description: "",
      color: "#F44336", // Red
    },
    {
      value: "NOT_DISCLOSED_FREQ",
      label: "Not disclosed",
      description: "",
      color: "#F44336", // Red
    },
  ],

  dataSoldTo: [
    {
      value: "SOLD_TO_THIRD_PARTIES",
      label: "Third parties",
      description: "User data is sold to external companies or partners.",
      color: "#F44336", // Red
    },
    {
      value: "SOLD_TO_OTHER",
      label: "Other",
      description: "User data is sold to other, unspecified entities.",
      color: "#F44336", // Red
    },
  ],

  otherDataCollected: [
    {
      value: "CONTACT_INFO",
      label: "Contact info",
      // description:
      //   "Personal contact information such as name, email address, or phone number.",
      color: null, // No color specified
    },
    {
      value: "ACCOUNT_INFO",
      label: "Account info",
      // description:
      //   "Information related to the user's account, such as username or profile settings.",
      color: null,
    },
    {
      value: "DEVICE_SETUP_INFO",
      label: "Device setup info",
      // description:
      //   "Information about how the device was configured during its initial setup.",
      color: null,
    },
    {
      value: "DEVICE_TECH_INFO",
      label: "Device tech info",
      // description:
      //   "Technical information about the device, such as model, OS version, or network status.",
      color: null,
    },
    {
      value: "DEVICE_USAGE_INFO",
      label: "Device usage info",
      // description:
      //   "Data about how the user interacts with the device, such as app usage or feature frequency.",
      color: null,
    },
    {
      value: "DEVICE_UNIQUE_IDENTIFIERS",
      label: "Device unique identifiers",
      // description:
      //   "Unique IDs associated with the device, such as serial number or advertising ID.",
      color: null,
    },
    {
      value: "OTHER",
      label: "Other",
      // description: "Other types of data not listed above.",
      color: null,
    },
  ],

  childrensDataHandling: [
    {
      value: "CHILDREN_YES",
      label: "Yes",
      description:
        "The manufacturer has special data handling practices in place for children.",
      color: "#4CAF50", // Green
    },
    {
      value: "CHILDREN_NO",
      label: "No",
      description:
        "The manufacturer does not have special data handling practices for children.",
      color: "#F44336", // Red
    },
  ],

  dataLinkage: [
    {
      value: "LINKED_INTERNAL",
      label: "Data may be linked with internal data sources",
      color: null,
      description: "",
    },
    {
      value: "LINKED_EXTERNAL",
      label: "Data may be linked with external data sources",
      color: null,
      description: "",
    },
    {
      value: "LINKED_BOTH",
      label: "Data may be linked with internal and external data sources",
      color: null,
      description: "",
    },
    {
      value: "NOT_LINKED",
      label: "Data is not being linked with any sources of information",
      color: null,
      description: "",
    },
    {
      value: "LINKING_NOT_DISCLOSED",
      label: "Not disclosed",
      color: null,
      description: "",
    },
  ],

  compliance: [
    {
      value: "GDPR_COMPLIANT",
      label: "GDPR",
      description:
        "The device's data practices are compliant with the General Data Protection Regulation (GDPR).",
      color: {
        checked: "#4CAF50", // Green for Ticked
        unchecked: "#F44336", // Red for Not Ticked
      },
    },
  ],

  dataInference: [
    {
      value: "ATTITUDES_PREFERENCES",
      label: "Attitudes and preferences",
      description: "",
      color: "#FFC107", // Yellow
    },
    {
      value: "APTITUDES_ABILITIES",
      label: "Aptitudes and abilities",
      description: "",
      color: "#F44336", // Red
    },
    {
      value: "BEHAVIORS",
      label: "Behaviors",
      description: "",
      color: "#F44336", // Red
    },
    {
      value: "NO_INFERENCE",
      label: "No data inference",
      description: "",
      color: "#4CAF50", // Green
    },
    {
      value: "INFERENCE_NOT_DISCLOSED",
      label: "Not disclosed",
      description: "",
      color: "#F44336", // Red
    },
  ],

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
};
