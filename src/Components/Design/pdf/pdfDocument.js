import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// --- Data source imports (Unchanged) ---
import { securityData } from "../steps/data/SecurityMechanismsData";
import { dataPracticesData } from "../steps/data/dataPracticesData";
import { MoreInformationsData } from "../steps/data/MoreInforrmationsData";

// --- STYLES (Unchanged) ---
const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica", fontSize: 10, color: "#333" },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 3,
    marginBottom: 8,
  },
  twoColumn: { flexDirection: "row", justifyContent: "space-between" },
  column: { width: "48%" },
  h3: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 5 },
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
  textAreaValue: {
    fontStyle: "italic",
    color: "#555",
    marginTop: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 5,
    borderRadius: 3,
  },
});

// --- HELPER COMPONENTS ---

const allDataSources = [securityData, dataPracticesData, MoreInformationsData];
const findOptionData = (dataKey, value) => {
  if (!value) return null;
  for (const source of allDataSources) {
    if (source && source[dataKey] && Array.isArray(source[dataKey])) {
      const option = source[dataKey].find((o) => o.value === value);
      if (option) return option;
    }
  }
  console.error(
    `[PDF Debug] Could not find an array named "${dataKey}" to search for value: "${value}"`
  );
  return { label: `(ERROR: ${value})`, color: null };
};

// FIX: All helper components now correctly use explicit `return` statements.
const Field = ({ label, value }) => {
  if (!value) {
    return null;
  }
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      <Text>{value}</Text>
    </View>
  );
};

const TextAreaField = ({ label, value }) => {
  if (!value) {
    return null;
  }
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.h3}>{label}</Text>
      <Text style={styles.textAreaValue}>{value}</Text>
    </View>
  );
};

const RadioField = ({ title, selectedValue, dataKey }) => {
  if (!selectedValue) {
    return null;
  }
  const option = findOptionData(dataKey, selectedValue);
  if (!option) {
    return null;
  }
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

const CheckboxGroup = ({ title, selections = [], dataKey }) => {
  if (!selections || selections.length === 0) {
    return null;
  }
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.h3}>{title}</Text>
      {selections.map((value) => {
        const option = findOptionData(dataKey, value);
        if (!option) {
          return null; // The inner map function also needs a return
        }
        let color = option.color;
        if (typeof color === "object" && color !== null) {
          color = color.checked;
        }
        // This inner map function also needs an explicit return
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

// --- SECTION COMPONENTS ---

const DeviceInfoSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <Text style={styles.sectionTitle}>Device Information</Text>
    <View style={styles.twoColumn}>
      <View style={styles.column}>
        <Field label="Manufacturer" value={data.manufacturer} />
        <Field label="Device Name" value={data.deviceName} />
        <Field label="Model" value={data.modelNumber} />
      </View>
      <View style={styles.column}>
        <Field label="Firmware" value={data.firmwareVersion} />
        <Field label="Updated On" value={data.updatedOn} />
        <Field label="Manufactured In" value={data.manufacturedIn} />
      </View>
    </View>
  </View>
);

const securityMechanismsItems = [
  { type: "checkbox", title: "Security Updates", dataKey: "securityUpdates" },
  { type: "radio", title: "Security Oversight", dataKey: "securityOversight" },
  { type: "checkbox", title: "Access Control", dataKey: "accessControl" },
  {
    type: "checkbox",
    title: "Technical Documentation",
    dataKey: "technicalDocumentation",
  },
];

const dataPracticesItems = [
  {
    type: "radio",
    title: "Data Collection Method",
    dataKey: "sensorDataCollectionMethod",
  },
  { type: "radio", title: "Sensor Type", dataKey: "sensorTypes" },
  {
    type: "checkbox",
    title: "Data Collection Frequency",
    dataKey: "dataFrequency",
  },
  { type: "checkbox", title: "Purpose of Collection", dataKey: "dataPurpose" },
  { type: "checkbox", title: "Data Stored on Device", dataKey: "dataStorage" },
  {
    type: "radio",
    title: "Local Data Retention",
    dataKey: "localDataRetention",
  },
  {
    type: "checkbox",
    title: "Data Stored in Cloud",
    dataKey: "cloudDataStorage",
  },
  {
    type: "radio",
    title: "Cloud Data Retention",
    dataKey: "cloudDataRetention",
  },
  { type: "checkbox", title: "Data Shared With", dataKey: "dataSharedWith" },
  {
    type: "radio",
    title: "Data Sharing Frequency",
    dataKey: "dataSharingFrequency",
  },
  { type: "checkbox", title: "Data Sold To", dataKey: "dataSoldTo" },
  {
    type: "checkbox",
    title: "Other Collected Data",
    dataKey: "otherDataCollected",
  },
  {
    type: "checkbox",
    title: "Children's Data Handling",
    dataKey: "childrensDataHandling",
  },
  { type: "checkbox", title: "Data Linkage", dataKey: "dataLinkage" },
  { type: "checkbox", title: "In Compliance With", dataKey: "compliance" },
  { type: "checkbox", title: "Data Inferences", dataKey: "dataInference" },
];

const moreInformationItems = [
  { type: "checkbox", title: "Privacy Policy", dataKey: "privacyPolicy" },
  {
    type: "radio",
    title: "Functionality Offline",
    dataKey: "offlineFunctionality",
  },
  {
    type: "checkbox",
    title: "Functionality with No Data Processing",
    dataKey: "noDataFunctionality",
  },
  {
    type: "checkbox",
    title: "Physical Actuations",
    dataKey: "physicalActuations",
  },
];

const TwoColumnSection = ({ sectionTitle, items, data }) => {
  const leftColumnItems = items.filter((_, index) => index % 2 === 0);
  const rightColumnItems = items.filter((_, index) => index % 2 === 1);

  const renderItem = (item) => {
    switch (item.type) {
      case "checkbox":
        return (
          <CheckboxGroup
            key={item.dataKey}
            title={item.title}
            selections={data[item.dataKey]}
            dataKey={item.dataKey}
          />
        );
      case "radio":
        return (
          <RadioField
            key={item.dataKey}
            title={item.title}
            selectedValue={data[item.dataKey]}
            dataKey={item.dataKey}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <View style={styles.twoColumn}>
        <View style={styles.column}>{leftColumnItems.map(renderItem)}</View>
        <View style={styles.column}>{rightColumnItems.map(renderItem)}</View>
      </View>
    </View>
  );
};

const MoreInformationSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    {/* Pass an explicit title to the TwoColumnSection */}
    <TwoColumnSection
      sectionTitle="More Information"
      items={moreInformationItems}
      data={data}
    />
    {/* Render the full-width text area below the two-column part */}
    <TextAreaField
      label="Compatible Platforms"
      value={data.compatiblePlatforms}
    />
  </View>
);

// --- THE MAIN PDF DOCUMENT ---
const PdfDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>IoT Security & Privacy Label</Text>

      <DeviceInfoSection data={formData.deviceInfo} />

      <TwoColumnSection
        sectionTitle="Security Mechanisms"
        items={securityMechanismsItems}
        data={formData.securityMechanisms}
      />

      <MoreInformationSection data={formData.moreInformation} />
      <TwoColumnSection
        sectionTitle="Data Practices"
        items={dataPracticesItems}
        data={formData.dataPractices}
      />

      {/* The MoreInformationSection now handles its own title */}
    </Page>
  </Document>
);

export default PdfDocument;
