import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// --- Data source imports ---
import { securityData } from "../steps/data/SecurityMechanismsData";
import { dataPracticesData } from "../steps/data/dataPracticesData";
import { MoreInformationsData } from "../steps/data/MoreInforrmationsData";

// --- STYLES ---
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
  nestedItem: {
    marginLeft: 15,
  },
});

// --- HELPER FUNCTIONS & COMPONENTS ---

const allDataSources = [securityData, dataPracticesData, MoreInformationsData];

const findOptionInTree = (tree, value) => {
  for (const option of tree) {
    if (option.value === value) return option;
    if (option.children) {
      const found = findOptionInTree(option.children, value);
      if (found) return found;
    }
  }
  return null;
};

const findOptionData = (dataKey, value) => {
  if (!value) return null;
  if (dataKey === "accessControl") {
    return findOptionInTree(securityData.accessControl, value);
  }
  for (const source of allDataSources) {
    if (source && source[dataKey] && Array.isArray(source[dataKey])) {
      const option = source[dataKey].find((o) => o.value === value);
      if (option) return option;
    }
  }
  return null;
};

// --- THE CORRECTED Field Component ---
const Field = ({ label, value }) => {
  if (!value) return null;
  return (
    // The container View no longer needs flex styles
    <View style={styles.field}>
      {/* 
        This is the magic. By nesting Text components, they are treated 
        as a single, continuous line of text that will wrap correctly.
      */}
      <Text>
        <Text style={styles.fieldLabel}>{label}: </Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </Text>
    </View>
  );
};

// const TextAreaField = ({ label, value }) => {
//   if (!value) return null;
//   return (
//     <View style={{ marginBottom: 8 }}>
//       <Text style={styles.h3}>{label}</Text>
//       <Text style={styles.textAreaValue}>{value}</Text>
//     </View>
//   );
// };

const RadioField = ({ title, selectedValue, dataKey }) => {
  if (!selectedValue) return null;
  const option = findOptionData(dataKey, selectedValue);
  if (!option) return null;
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

const CheckboxGroup = ({ title, selections = [], dataKey, extraData }) => {
  if (!selections || selections.length === 0) return null;
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.h3}>{title}</Text>
      {selections.map((value) => {
        const option = findOptionData(dataKey, value);
        if (!option) return null;
        let displayText = option.label;
        if (extraData && extraData[value]) {
          displayText = `${option.label} ${extraData[value]}`;
        }
        return (
          <View key={value} style={styles.listItem}>
            {option.color && (
              <View
                style={[
                  styles.colorBox,
                  { backgroundColor: option.color.checked || option.color },
                ]}
              />
            )}
            <Text>{displayText}</Text>
          </View>
        );
      })}
    </View>
  );
};

// MODIFIED YesNoCheckboxGroup to be more generic
const YesNoCheckboxGroup = ({ title, selectionsObject = {}, dataKey }) => {
  const selectionKeys = Object.keys(selectionsObject);
  if (selectionKeys.length === 0) return null;
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.h3}>{title}</Text>
      {selectionKeys.map((value) => {
        const option = findOptionData(dataKey, value); // Use the provided dataKey
        if (!option) return null;
        const selectionState = selectionsObject[value];
        const color = selectionState === "yes" ? "#4CAF50" : "#F44336";
        return (
          <View key={value} style={styles.listItem}>
            <View style={[styles.colorBox, { backgroundColor: color }]} />
            <Text>{option.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

const RecursiveListItem = ({ option, selections }) => {
  if (!selections.includes(option.value)) return null;
  const optionData = findOptionData("accessControl", option.value);
  if (!optionData) return null;
  return (
    <View>
      <View style={styles.listItem}>
        {optionData.color && (
          <View
            style={[styles.colorBox, { backgroundColor: optionData.color }]}
          />
        )}
        <Text>{optionData.label}</Text>
      </View>
      {option.children && (
        <View style={styles.nestedItem}>
          {option.children.map((child) => (
            <RecursiveListItem
              key={child.value}
              option={child}
              selections={selections}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const HierarchicalCheckboxGroup = ({ title, selections = [], dataKey }) => {
  if (!selections || selections.length === 0) return null;
  const topLevelData = securityData[dataKey];
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.h3}>{title}</Text>
      {topLevelData.map((option) => (
        <RecursiveListItem
          key={option.value}
          option={option}
          selections={selections}
        />
      ))}
    </View>
  );
};

const ContactInfoSection = ({ data }) => {
  // Check if there's any contact info to display
  if (!data || (!data.contactPhone && !data.contactEmail)) {
    return null;
  }
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>Contact for Questions</Text>
      <Field label="Phone" value={data.contactPhone} />
      <Field label="Email" value={data.contactEmail} />
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
    type: "checkbox",
    title: "Sensor data collection Method",
    dataKey: "sensorDataCollectionMethod",
  },
  { type: "checkbox", title: "Sensor Type", dataKey: "sensorDataTypes" },
  {
    type: "checkbox",
    title: "Data Collection Frequency",
    dataKey: "dataFrequency",
  },
  { type: "radio", title: "Purpose of Collection", dataKey: "dataPurpose" },
  { type: "radio", title: "Data Stored on Device", dataKey: "dataStorage" },
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
  { type: "radio", title: "Data Shared With", dataKey: "dataSharedWith" },
  {
    type: "radio",
    title: "Data Sharing Frequency",
    dataKey: "dataSharingFrequency",
  },
  { type: "checkbox", title: "Data Sold To", dataKey: "dataSoldTo" },
  {
    type: "radio",
    title: "Other Collected Data",
    dataKey: "otherDataCollected",
  },
  {
    type: "radio",
    title: "Children's Data Handling",
    dataKey: "childrensDataHandling",
  },
  { type: "checkbox", title: "Data Linkage", dataKey: "dataLinkage" },
  { type: "checkbox", title: "In Compliance With", dataKey: "compliance" }, // This remains a checkbox type
  { type: "checkbox", title: "Data Inferences", dataKey: "dataInference" },
];

const moreInformationItems = [
  {
    type: "checkbox",
    title: "Privacy Policy",
    dataKey: "privacyPolicy",
  },
  {
    type: "radio",
    title: "Functionality when offline",
    dataKey: "offlineFunctionality",
  },
  {
    type: "radio", // CHANGED from checkbox
    title: "Functionality with No Data Processing",
    dataKey: "noDataFunctionality",
  },
  {
    type: "text", // CHANGED to a simple text field
    title: "Physical actuations and triggers",
    dataKey: "physicalActuations",
  },
  {
    type: "text", // ADDED as a text field
    title: "Compatible platforms",
    dataKey: "compatiblePlatforms",
  },
];

// --- THIS IS THE CORRECTED TwoColumnSection COMPONENT ---
const TwoColumnSection = ({ sectionTitle, items, data }) => {
  const leftColumnItems = items.filter((_, index) => index % 2 === 0);
  const rightColumnItems = items.filter((_, index) => index % 2 === 1);

  const renderItem = (item) => {
    switch (item.type) {
      case "checkbox":
        // ... (all your existing logic for different checkboxes)
        if (item.dataKey === "securityUpdates") {
          return (
            <CheckboxGroup
              key={item.dataKey}
              title={item.title}
              selections={data[item.dataKey]}
              dataKey={item.dataKey}
              extraData={data.securityUpdateDates}
            />
          );
        }
        if (item.dataKey === "accessControl") {
          return (
            <HierarchicalCheckboxGroup
              key={item.dataKey}
              title={item.title}
              selections={data[item.dataKey]}
              dataKey={item.dataKey}
            />
          );
        }
        if (item.dataKey === "technicalDocumentation") {
          return (
            <YesNoCheckboxGroup
              key={item.dataKey}
              title={item.title}
              selectionsObject={data[item.dataKey]}
              dataKey={item.dataKey}
            />
          );
        }
        if (item.dataKey === "sensorDataTypes") {
          return (
            <CheckboxGroup
              key={item.dataKey}
              title={item.title}
              selections={data[item.dataKey]}
              dataKey="sensorTypes"
            />
          );
        }
        if (item.dataKey === "compliance") {
          return (
            <YesNoCheckboxGroup
              key={item.dataKey}
              title={item.title}
              selectionsObject={data[item.dataKey]}
              dataKey={item.dataKey}
            />
          );
        }
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

      // --- This case will now render correctly with text wrapping ---
      case "text":
        if (item.dataKey === "physicalActuations") {
          const value =
            data[item.dataKey] === "PHYSICAL_ACTUATIONS_NOT_DISCLOSED"
              ? "Not Disclosed"
              : data[item.dataKey];
          return <Field key={item.dataKey} label={item.title} value={value} />;
        }
        return (
          <Field
            key={item.dataKey}
            label={item.title}
            value={data[item.dataKey]}
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
    <TwoColumnSection
      sectionTitle="More Information"
      items={moreInformationItems}
      data={data}
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
      <TwoColumnSection
        sectionTitle="Data Practices"
        items={dataPracticesItems}
        data={formData.dataPractices}
      />
      <MoreInformationSection data={formData.moreInformation} />
      <ContactInfoSection data={formData.dataPractices} />
    </Page>
  </Document>
);

export default PdfDocument;
