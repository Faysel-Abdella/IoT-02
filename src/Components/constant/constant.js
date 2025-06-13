const getStyledImpact = (impact) => {
  switch (impact.toLowerCase()) {
    case 'low':
      return <span style={{ color: 'green' }}>Low</span>;
    case 'moderate':
      return <span style={{ color: 'orange' }}>Moderate</span>;
    case 'high':
      return <span style={{ color: 'red' }}>High</span>;
    default:
      return impact;
  }
};

export const initialData = {
  users: [
    { itemId: "user_0", userId: "1", userRole: "Data subject" ,warningMessage:'Does the data subject provide personal data to a device?' },
    { itemId: "controller-2", userId: "2", userRole: "Controller"  },
    { itemId: "dataprocessor-2", userId: "3", userRole: "Data processor"},
  ],
  storageOptions: [
    { itemId: "cloud_0", storageId: "1", storageType: "Cloud"},
    { itemId: "localstorage_0", storageId: "2", storageType: "Local Storage" },
  ],
  devices: [
    /*{ itemId: "camera_0", deviceId: "camera1", deviceType: "Camera" },
    { itemId: "lamp_0", deviceId: "lamp_0", deviceType: "Lamp" },
    { itemId: "lock_1", deviceId: "lock1", deviceType: "Lock" },
    { itemId: "smartphone_1", deviceId: "smartphone1", deviceType: "Smartphone"},
    { itemId: "vacuumCleaner_1", deviceId: "vacuumCleaner1", deviceType: "Vacuum Cleaner" },
    { itemId: "video_1", deviceId: "video1", deviceType: "Video" },
    { itemId: "smartwatch_0", deviceId: "smartwatch1", deviceType: "SmartWatch"},*/
    { itemId: "Microcontroller_0", deviceId: "Microcontroller_0", deviceType: "Microcontroller" },
  ],
  sensors: [
    { itemId: "temperature1", sensorId: "temperature1", deviceId: "lamp1", sensorType: "Temperature"},
    { itemId: "humidity1", sensorId: "humidity1", deviceId: "lamp1", sensorType: "Humidity"},
    { itemId: "light1", sensorId: "light1", sensorType: "Light"},
   // { itemId: "obstacle1", sensorId: "obstacle1", sensorType: "Obstacle Detection"},
    { itemId: "proximity1", sensorId: "proximity1", sensorType: "Proximity" },
    { itemId: "laser1", sensorId: "laser1", sensorType: "Laser" },
    { itemId: "camera1", sensorId: "camera1", sensorType: "Camera" },
    { itemId: "voice1", sensorId: "voice1", sensorType: "Voice"},
    { itemId: "GPS1", sensorId: "GPS1", sensorType: "GPS"},
    { itemId: "ultrasonic1", sensorId: "ultrasonic1", sensorType: "Ultrasonic"},
  ],
  privacies: [
 
    { itemId:'authentication1', privacyId: "Authentication_0", iconType: "Authentication", warningMessage:'Do you want to apply the authentication? If you apply authentication, you will be committed to the security of processing in accordance with GDPR principles.' },
    { itemId:'control1', privacyId: "Control_0", iconType: "Control", warningMessage:'Do you want to apply control? If you apply control, you will be committed to the principles of transparency and consent, in accordance with GDPR guidelines.' },
    { itemId:'demonstrate', privacyId: "Demonstrate_0", iconType: "Demonstrate", warningMessage:'Do you want to apply the Demonstrate?' },
    { itemId:'consentlist_0', privacyId: "Consentlist_0", iconType: "Consent list" , warningMessage:'Do you want to apply the consent list?' },
    { itemId:'encryption', privacyId: "Encryption_0", iconType: "Encryption" , warningMessage:'Do you want to apply the encryption? If you apply encryption, you will be committed to the security of processing in accordance with GDPR principles.' },
    { itemId:'authorization', privacyId: "Authorization_0", iconType: "Authorization" , warningMessage:'Do you want to apply the authorisation? If you apply authorisation, you will be committed to the security of processing in accordance with GDPR principles.' },
    { itemId:'inform', privacyId: "Inform_0", iconType: "Inform" , warningMessage:'Do you want to apply the Inform?' },
    { itemId:'minimization', privacyId: "Minimization_0", iconType: "Minimization" , warningMessage:'Do you want to apply minimisation? If you apply minimisation, you will be committed to data minimisation in accordance with GDPR principles.' },
    { itemId:'anonymous', privacyId: "anonymous_0", iconType: "anonymous" , warningMessage:'Do you want to apply Anonymisation? If you apply anonymization, you will be committed to the Anonymity and Pseudonymity Principles in accordance with GDPR guidelines.' },
  ],
  
  privacyRules: [
    { 
      riskId: "Microcontroller, data subject", 
      items: ['Microcontroller_0','user_0'], 
      risk:[
        {
          riskText: "Risk of credential disclosure to personal data", 
          mitigation: "Apply Encryption ", 
          impact: getStyledImpact("High"),
          privacyId: "Encryption_0",
        },
        {
          riskText: "Risk of data eavesdropping", 
          mitigation: "Apply Authentication", 
          impact: getStyledImpact("High"),
          privacyId: "Authentication_0",
        },
        {
          riskText: "Risk of log data access", 
          mitigation: "Apply Consent list", 
          impact: getStyledImpact("High"),
          privacyId: "Consentlist_0",
        },
        {
          riskText: "Risk of unauthorised access", 
          mitigation: "Apply Authorisation", 
          impact: getStyledImpact("High"),
          privacyId: "Authorization_0",
        }
        
      ]
    },
    { 
      riskId: "Microcontroller, light sensor", 
      items: ['Microcontroller_0','light1_0'], 
      risk:[
        {
          riskText: "Data from the light sensor can be used to infer information.", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Low"),
          privacyId: "Minimization_0",
        }
      ]
    },
    { 
      riskId: "Microcontroller, temperature sensor", 
      items: ['Microcontroller_0','temperature1_0'], 
      risk:[
        {
          riskText: "The sensor does not collect personally identifiable information but, if someone gains unauthorized access, they may be able to identify the behaviours or patterns of people.", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Low"),
          privacyId: "Minimization_0",
        }
      ]
    },
    { 
      riskId: "Lamp, humidiy sensor", 
      items: ['Microcontroller_0','humidity1_0'], 
      risk:[
        {
          riskText: "The sensor does not collect personally identifiable information but, if someone gains unauthorized access, they may be able to identify the behaviours or patterns of people.", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Low"),
          privacyId: "Minimization_0",
        }
      ]
    },
    { 
      riskId: "Microcontroller, camera sensor", 
      items: ['Microcontroller_0','camera1_0'], 
      risk:[
        {
          riskText: "Record and identify personal information.", 
          mitigation: "Apply Inform",
          impact: getStyledImpact("High"), 
          privacyId: "Inform_0",
        },
        {
          riskText: "Risk of credential disclosure to personal data.", 
          mitigation: "Apply Encryption ", 
          impact: getStyledImpact("High"),
          privacyId: "Encryption_0",
        },
        {
          riskText: "Record and identify personal information.", 
          mitigation: "Apply Face Blurring ", 
          impact: getStyledImpact("High"),
          privacyId: "",
        }
      
      ]
    },
    { 
      riskId: "Lamp, voice sensor", 
      items: ['lamp_0','voice1_0'], 
      risk:[
        {
          riskText: "Record and identify personal information.", 
          mitigation: "Apply Inform", 
          impact: getStyledImpact("High"), 
          privacyId: "Inform_0",
        },
        {
          riskText: "Risk of credential disclosure to personal data.", 
          mitigation: "Apply Encryption ", 
          impact: getStyledImpact("High"),
          privacyId: "Encryption_0",
        }
      ]
    },
     { 
      riskId: "Lamp, proximity sensor", 
      items: ['lamp_0','proximity1_0'], 
      risk:[
        {
          riskText: "The sensor does not collect personally identifiable information but, if someone gains unauthorized access, they may be able to identify the behaviours or patterns of people.", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Low"), 
          privacyId: "Minimization_0",
        }
      ]
    },
    { 
      riskId: "Lamp, clould, data subject", 
      items: ['lamp_0','cloud_0','user_0'], 
      risk:[
        {
          riskText: "Sharing personal data with third parties (controller).", 
          mitigation: "Apply Inform", 
          impact: getStyledImpact("High"), 
          privacyId: "Inform_0",
        },
        {
          riskText: "Sharing personal data with third parties (controller).", 
         // mitigation: "Vague the data subject’s data by adding fake data to the database", 
          mitigation: "Apply anonymisation", 
          impact: getStyledImpact("High"), 
          privacyId:"anonymous_0",
       
        },
        {
          riskText: "Sharing personal data with third parties (controller).", 
          mitigation: "Apply Demonstrate", 
          impact: getStyledImpact("High"), 
          privacyId: "Demonstrate_0",
        }
      ]
      
    },
    { 
      riskId: "Lamp, local storage, data subject", 
      items: ['lamp_0','localstorage_0','user_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Encryption", 
          impact: getStyledImpact("High"), 
          privacyId: "Encryption_0",
        }
      ]
    },
    { 
      riskId: "Lamp, local storage, data subject", 
      items: ['lamp_0','localstorage_0','user_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Inform", 
          impact: getStyledImpact("High"), 
          privacyId: "Inform_0",
        }
      ]
    },
    { 
      riskId: "Lamp, local storage, data subject", 
      items: ['lamp_0','localstorage_0','user_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Demonstrate", 
          impact: getStyledImpact("High"), 
          privacyId: "Demonstrate_0",
        }
      ]
    },

    { 
      riskId: "Lamp, cloud, data subject, controller", 
      items: ['lamp_0','cloud_0','user_0','Controller_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Encryption", 
          impact: getStyledImpact("High"), 
          privacyId: "Encryption_0",
        }
      ]
    },
    { 
      riskId: "Lamp, cloud, data subject, controller", 
      items: ['lamp_0','cloud_0','user_0','Controller_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Inform", 
          impact: getStyledImpact("High"), 
          privacyId: "Inform_0",
        }
      ]
    },
    { 
      riskId: "Lamp, cloud, data subject, controller", 
      items: ['lamp_0','cloud_0','user_0','Controller_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Demonstrate", 
          impact: getStyledImpact("High"), 
          privacyId: "Demonstrate_0",
        }
      ]
    },
    { 
      riskId: "Lamp, local storage, data subject, data processor", 
      items: ['lamp_0','localstorage_0','user_0','Dataprocessor_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Encryption", 
          impact: getStyledImpact("High"), 
          privacyId: "Encryption_0",
        }
      ]
    },
    { 
      riskId: "Lamp, local storage, data subject, data processor", 
      items: ['lamp_0','localstorage_0','user_0','Dataprocessor_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Inform", 
          impact: getStyledImpact("High"), 
          privacyId: "Inform_0",
        }
      ]
    },
    { 
      riskId: "Lamp, local storage, data subject, data processor", 
      items: ['lamp_0','localstorage_0','user_0','Dataprocessor_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Demonstrate", 
          impact: getStyledImpact("High"), 
          privacyId: "Demonstrate_0",
        }
      ]
    },
    //The second use case:
    { 
      riskId: "risk2", 
      items: ['Vacuum_0','dirtdetection1_0'], 
      risk:[
        {
          riskText: "Inference of lifestyle or cleanliness habits", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Low"), 
          privacyId: "Minimization_0",
        },
      ]
    },
    { 
      riskId: "risk2", 
      items: ['Vacuum_0','obstacle1_0'],
      risk:[
        {
          riskText: "Mapping of home layout: The sensor has the potential to map out a home's layout, which could infer sensitive information to unauthorised parties.", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Moderate"), 
          privacyId: "Minimization_0",
        },
        
      ]
    },
    { 
      riskId: "risk2", 
      items:['Vacuum_0','wheel1_0'],
      risk:[
        {
          riskText: "None are significant in terms of privacy", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Low"), 
          privacyId: "Minimization_0",
        },
        
      ]
    },
    { 
      riskId: "risk2", 
      items:['Vacuum_0','cliff1_0'],
      risk:[
        {
          riskText: "None are significant in terms of privacy", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Low"), 
          privacyId: "Minimization_0",
        },
        
      ]
    },
    { 
      riskId: "risk2", 
      items:['Vacuum_0','bumper1_0'],
      risk:[
        {
          riskText: "Mapping of home layout: The sensor has the potential to map out a home's layout, which could infer sensitive information to unauthorised parties.", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Moderate"), 
          privacyId: "Minimization_0",
        },
        
      ]
    },
    { 
      riskId: "risk2", 
      items:['Vacuum_0','bumper1_0'],
      risk:[
        {
          riskText: "None are significant in terms of privacy.", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Low"), 
          privacyId: "Minimization_0",
        },
        
      ]
    },
    { 
      riskId: "risk2", 
      items:['Vacuum_0','battery1_0'],
      risk:[
        {
          riskText: "Indicating home occupancy patterns based on vacuum usage times..", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("Low"), 
          privacyId: "Minimization_0",
        },
        
      ]
    },
    { 
      riskId: "risk2", 
      items:['Vacuum_0','laser1_0'],
      risk:[
        {
          riskText: "Detailed mapping of home interiors: These can create precise layouts of a home, which could be sensitive if leaked.", 
          mitigation: "Apply Minimization", 
          impact: getStyledImpact("High"), 
          privacyId: "Minimization_0",
        },
        
      ]
    },
    { 
      riskId: "risk2", 
      items:['Vacuum_0','camera1_0'],
      risk:[
        {
          riskText: "Cameras can capture images or videos of a home's inside, potentially leading to significant privacy violations if this data is accessed unauthorizedly.", 
          mitigation: "Apply Minimization",
          impact: getStyledImpact("High"), 
          privacyId: "Minimization_0",
        },
        
      ]
    },
    { 
      riskId: "risk2", 
      items:['Vacuum_0','voice1_0'],
      risk:[
        {
          riskText: "Recording sound, leading to significant privacy violations if this data is accessed unauthorizedly.", 
          mitigation: "Apply Minimization",
          impact: getStyledImpact("High"), 
          privacyId: "Minimization_0",
        },
        
      ]
    }, 
    { 
      riskId: "risk2", 
      items:['Vacuum_0','temperature1_0'],
      risk:[
        {
          riskText: "Inferring home environment and habits: both sensors could be used to infer certain lifestyle or environmental conditions in the home..", 
          mitigation: "Apply Minimization",
          impact: getStyledImpact("Low"), 
          privacyId: "Minimization_0",
        },
        
      ]
    }, 
    { 
      riskId: "risk2", 
      items:['Vacuum_0','humidity1_0'],
      risk:[
        {
          riskText: "Inferring home environment and habits: both sensors could be used to infer certain lifestyle or environmental conditions in the home..", 
          mitigation: "Apply Minimization",
          impact: getStyledImpact("Low"), 
          privacyId: "Minimization_0",
        },
        
      ]
    },
    
    { 
      riskId: "risk5", 
      items: ['Vacuum_0','localstorage_0','user_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Inform", 
          impact: getStyledImpact("High"), 
          privacyId: "Inform_0",
        },
        {
          riskText: "Risk of data eavesdropping.", 
          mitigation: "Apply Authentication", 
          impact: getStyledImpact("High"), 
          privacyId: "Authentication_0",
        },
        {
          riskText: "Risk of data eavesdropping.", 
          mitigation: "Apply Authentication", 
          impact: getStyledImpact("High"),
          privacyId: "Authentication_0",
        }

      ]
    },
    { 
      riskId: "risk5", 
      items: ['Vacuum_0','cloud_0','user_0'], 
      risk:[
        {
          riskText: "Unauthorized Access and Sharing personal data.", 
          mitigation: "Apply Inform", 
          impact: getStyledImpact("High"), 
          privacyId: "Inform_0",
        },
        {
          riskText: "Risk of data eavesdropping.", 
          mitigation: "Apply Authentication", 
          impact: getStyledImpact("High"), 
          privacyId: "Authentication_0",
        },
        {
          riskText: "Risk of data eavesdropping.", 
          mitigation: "Apply Authentication", 
          impact: getStyledImpact("High"),
          privacyId: "Authentication_0",
        }

      ]
    },

  ],

  irrelevantCombination:[
    /*{
    combinationId: "1",
    items: ['lamp_0','dirtdetection1_0'],
    },
    {
    combinationId: "2",
    items: ['lamp_0','cliff1_0'],
    },
    {
    combinationId: "3",
    items: ['lamp_0','wheel1_0'],
    },
       {
    combinationId: "5",
    items: ['lamp_0','obstacle1_0'],
    },
    {
    combinationId: "6",
    items: ['lamp_0','bumper1_0'],
    },*/
    {
    combinationId: "1",
    items: ['lamp_0','laser1_0'],
    },
    {
      combinationId: "2",
      items: ['lamp_0','GPS1_0'],
      },

    ]
};
