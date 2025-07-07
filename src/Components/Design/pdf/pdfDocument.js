import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Import all the data sources to look up labels and colors
import { securityData } from "../steps/data/SecurityMechanismsData";
import { dataPracticesData } from "../steps/data/dataPracticesData";
import { MoreInformationsData } from "../steps/data/MoreInforrmationsData";

// Register fonts if needed (optional but good practice)
// Font.register({ family: 'Helvetica', ... });

// --- STYLES FOR THE PDF DOCUMENT ---
const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica", fontSize: 10, color: "#333" },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
  twoColumn: { flexDirection: "row", justifyContent: "space-between" },
  column: { width: "48%" },
  section: { marginBottom: 15 },
  h2: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 3,
    marginBottom: 8,
  },
  h3: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 5 },
  text: { marginBottom: 3 },
  field: { flexDirection: "row", marginBottom: 3 },
  fieldLabel: { fontFamily: "Helvetica-Bold", marginRight: 5 },
  listItem: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  colorBox: {
    width: 8,
    height: 8,
    marginRight: 5,
    borderWidth: 0.5,
    borderColor: "#000",
  },
  nestedItem: { marginLeft: 15, marginTop: 2 },
  textAreaValue: {
    fontStyle: "italic",
    color: "#555",
    marginTop: 2,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    borderRadius: 3,
  },
});

// --- HELPER COMPONENTS TO BUILD THE PDF ---

// Helper to find the full data object for a given value (e.g., to get its label and color)
const allDataSources = [securityData, dataPracticesData, MoreInformationsData];
const findOptionData = (dataKey, value) => {
  for (const source of allDataSources) {
    if (source[dataKey]) {
      const option = source[dataKey].find((o) => o.value === value);
      if (option) return option;
    }
  }
  return { label: value.replace(/_/g, " "), color: null }; // Fallback
};

// Component for a simple Label: Value pair
const Field = ({ label, value }) => {
  if (!value) return null;
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      <Text>{value}</Text>
    </View>
  );
};

// Component for a text area value
const TextAreaField = ({ label, value }) => {
  if (!value) return null;
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.h3}>{label}</Text>
      <Text style={styles.textAreaValue}>{value}</Text>
    </View>
  );
};

// Component for a single radio button selection
const RadioField = ({ title, selectedValue, dataKey }) => {
  if (!selectedValue) return null;
  const option = findOptionData(dataKey, selectedValue);
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.h3}>{title}</Text>
      <View style={styles.listItem}>
        {option.color && (
          <View style={[styles.colorBox, { backgroundColor: option.color }]} />
        )}
        <Text>{option.label}</Text>
      </View>
    </View>
  );
};

// Component for a list of checkbox selections
const CheckboxGroup = ({ title, selections = [], dataKey }) => {
  if (!selections || selections.length === 0) return null;
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.h3}>{title}</Text>
      {selections.map((value) => {
        const option = findOptionData(dataKey, value);
        let color = option.color;
        // Handle state-dependent colors (e.g., GDPR, Technical Docs)
        if (typeof color === "object" && color !== null) {
          color = color.checked; // In the PDF, always show the "checked" state color
        }
        return (
          <View key={value} style={styles.listItem}>
            {color && (
              <View style={[styles.colorBox, { backgroundColor: color }]} />
            )}
            <Text>{option.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

// Special component for the nested sensor data
const SensorGroup = ({ data = {} }) => {
  const entries = Object.entries(data);
  if (entries.length === 0) return null;
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.h3}>Sensor Data Collection</Text>
      {entries.map(([parent, children]) => (
        <View key={parent} style={styles.text}>
          <Text>• {findOptionData("sensorData", parent).label}</Text>
          {children.length > 0 && (
            <View style={styles.nestedItem}>
              {children.map((child) => (
                <Text key={child}>
                  -{" "}
                  {
                    findOptionData("sensorData", parent).subItems.find(
                      (s) => s.value === child
                    ).label
                  }
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

// --- THE MAIN PDF DOCUMENT ---
const PdfDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>IoT Security & Privacy Label</Text>

      <View style={styles.twoColumn}>
        {/* === LEFT COLUMN === */}
        <View style={styles.column}>
          <View style={styles.section}>
            <Text style={styles.h2}>Device Information</Text>
            <Field
              label="Manufacturer"
              value={formData.deviceInfo.manufacturer}
            />
            <Field label="Device Name" value={formData.deviceInfo.deviceName} />
            <Field label="Model" value={formData.deviceInfo.modelNumber} />
            <Field
              label="Firmware"
              value={formData.deviceInfo.firmwareVersion}
            />
            <Field label="Updated On" value={formData.deviceInfo.updatedOn} />
            <Field
              label="Manufactured In"
              value={formData.deviceInfo.manufacturedIn}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.h2}>Security Mechanisms</Text>
            <CheckboxGroup
              title="Security Updates"
              selections={formData.securityMechanisms.securityUpdates}
              dataKey="securityUpdates"
            />
            <CheckboxGroup
              title="Access Control"
              selections={formData.securityMechanisms.accessControl}
              dataKey="accessControl"
            />
            <RadioField
              title="Security Oversight"
              selectedValue={formData.securityMechanisms.securityOversight}
              dataKey="securityOversight"
            />
            <CheckboxGroup
              title="Technical Documentation"
              selections={formData.securityMechanisms.technicalDocumentation}
              dataKey="technicalDocumentation"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.h2}>More Information</Text>
            <CheckboxGroup
              title="Privacy Policy"
              selections={formData.moreInformation.privacyPolicy}
              dataKey="privacyPolicy"
            />
            <RadioField
              title="Functionality Offline"
              selectedValue={formData.moreInformation.offlineFunctionality}
              dataKey="offlineFunctionality"
            />
            <CheckboxGroup
              title="Functionality with No Data Processing"
              selections={formData.moreInformation.noDataFunctionality}
              dataKey="noDataFunctionality"
            />
            <CheckboxGroup
              title="Physical Actuations"
              selections={formData.moreInformation.physicalActuations}
              dataKey="physicalActuations"
            />
            <TextAreaField
              label="Compatible Platforms"
              value={formData.moreInformation.compatiblePlatforms}
            />
          </View>
        </View>

        {/* === RIGHT COLUMN === */}
        <View style={styles.column}>
          <View style={styles.section}>
            <Text style={styles.h2}>Data Practices</Text>
            <SensorGroup data={formData.dataPractices.sensorDataCollection} />
            <CheckboxGroup
              title="Data Collection Frequency"
              selections={formData.dataPractices.dataFrequency}
              dataKey="dataFrequency"
            />
            <CheckboxGroup
              title="Purpose of Collection"
              selections={formData.dataPractices.dataPurpose}
              dataKey="dataPurpose"
            />
            <CheckboxGroup
              title="Data Stored on Device"
              selections={formData.dataPractices.dataStorage}
              dataKey="dataStorage"
            />
            <RadioField
              title="Local Data Retention"
              selectedValue={formData.dataPractices.localDataRetention}
              dataKey="localDataRetention"
            />
            <CheckboxGroup
              title="Data Stored in Cloud"
              selections={formData.dataPractices.cloudDataStorage}
              dataKey="cloudDataStorage"
            />
            <RadioField
              title="Cloud Data Retention"
              selectedValue={formData.dataPractices.cloudDataRetention}
              dataKey="cloudDataRetention"
            />
            <CheckboxGroup
              title="Data Shared With"
              selections={formData.dataPractices.dataSharedWith}
              dataKey="dataSharedWith"
            />
            <RadioField
              title="Data Sharing Frequency"
              selectedValue={formData.dataPractices.dataSharingFrequency}
              dataKey="dataSharingFrequency"
            />
            <CheckboxGroup
              title="Data Sold To"
              selections={formData.dataPractices.dataSoldTo}
              dataKey="dataSoldTo"
            />
            <CheckboxGroup
              title="Other Collected Data"
              selections={formData.dataPractices.otherDataCollected}
              dataKey="otherDataCollected"
            />
            <CheckboxGroup
              title="Children's Data Handling"
              selections={formData.dataPractices.childrensDataHandling}
              dataKey="childrensDataHandling"
            />
            <CheckboxGroup
              title="Data Linkage"
              selections={formData.dataPractices.dataLinkage}
              dataKey="dataLinkage"
            />
            <CheckboxGroup
              title="In Compliance With"
              selections={formData.dataPractices.compliance}
              dataKey="compliance"
            />
            <CheckboxGroup
              title="Data Inferences"
              selections={formData.dataPractices.dataInference}
              dataKey="dataInference"
            />
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
