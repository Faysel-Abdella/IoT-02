export const privacyRisks = [
  {
    id: "message-1",
    riskText: "Risk of credential disclosure to personal data",
    MitigationId: "Mitigation-1"
  },
  {  
    id: "message-2",
    riskText: "Risk of data eavesdropping",
    MitigationId: "Mitigation-2"
  },
  {  
    id: "message-3",
    riskText: "Risk of log data access.",
    MitigationId: "Mitigation-3"
  },
  {  
    id: "message-4",
    riskText: "Risk of unauthorised access.",
    MitigationId: "Mitigation-4"
  },
  {  
    id: "message-5",
    riskText: "Data from the light sensor can be used to infer information.",
    MitigationId: "Mitigation-5"
  },
  {  
    id: "message-6",
    riskText: "The sensor does not collect personally identifiable information but, if someone gains unauthorized access, they may be able to identify the behaviours or patterns of people.",
    MitigationId: "Mitigation-5"
  },
  {
    id: "message-7",
    riskText: "Using camera can lead to record and identify personal information.",
    MitigationId: "Mitigation-6"
  },
  {
    id: "message-8",
    riskText: "Using voice device or microphone can lead to record and identify personal information.",
    MitigationId: "Mitigation-7"
  }
];

export const mitigation = [
  {
    id: "Mitigation-1",
    Action: "Apply Encryption",
  },
  {
    id: "Mitigation-2",
    Action: "Apply Authentication",
  },
  {
    id: "Mitigation-3",
    Action: "Apply Consent list",
  },
  {
    id: "Mitigation-4",
    Action: "Apply Authorisation",
  },
  {
    id: "Mitigation-5",
    Action: "Apply Data Minimization"
  },
  {
    id: "Mitigation-6",
    Action: "Apply Inform, Apply Encryption, Face Blurring"
  },
  {
    id: "Mitigation-7",
    Action: "Apply Inform, Apply Control"
  }
];
