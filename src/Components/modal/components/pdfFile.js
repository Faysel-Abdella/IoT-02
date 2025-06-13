import React, { useEffect, useState } from 'react';

import img5 from "../../../assets/img5.png";
import img6 from "../../../assets/img6.png";
import img7 from "../../../assets/img7.png";
import sensor1 from "../../../assets/sensor1.png";
import sensor3 from "../../../assets/sensor3.jpeg";
import sensor4 from "../../../assets/sensor4.png";
import audio from "../../../assets/audio.png";
import "./table.css"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { useSelector } from 'react-redux';


const PdfGenerator = ({toggleState}) => {

  const [downloadForm, setDownloadForm] = useState({});
  const [parsedData, setParsedData] = useState(null); // Store parsed data
  const [noData, setNoData] = useState(false); // State to handle no data case

  useEffect(() => {
    const data = typeof window !== "undefined" && localStorage.getItem("pdfData");

    let _parsedData = {};
    try {
      _parsedData = data ? JSON?.parse(data) : {};
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      _parsedData = {}; // Default to an empty object on error
    }

    // Check if the deviceName is empty
    if (_parsedData?.deviceName === "") {
      setNoData(true);
      setParsedData(null); // Reset parsed data
      return;
    }

    // Process parsedData
    const processedData = {
      ..._parsedData,
      sensors: _parsedData?.sensors?.filter(
        (sensor) => sensor?.value && sensor?.value?.trim()?.length > 0
      ) || [],
      sensorTypeCollection:
        _parsedData?.sensorTypeCollection?.filter(
          (item, index, self) =>
            index ===
            self?.findIndex(
              (t) =>
                t?.type === item?.type &&
                t?.sensorType === item?.sensorType &&
                t?.purpose === item?.purpose
            )
        ) || [],
    };

    setParsedData(processedData);
    setNoData(false); // Reset noData state
  }, [toggleState]);

  ///new adding
  //if (noData || !parsedData) {
    //return (
      //<Document>
       // <Page size="A4" style={{ padding: 20 }}>
         // <Text>No Data Available to Generate PDF</Text>
    //    </Page>
   //   </Document>
    //);
  //}
  // // Early return for no data case
  // if (noData) {
  //   return (
  //     <Document>
  //       <Page size={[1850, 1300]} style={styles.page}>
  //         <View style={styles.pageContainer}>
  //           <View style={styles.section}>
  //             <Text style={styles.deviceHeading}>No data available</Text>
  //           </View>
  //         </View>
  //       </Page>
  //     </Document>
  //   );
  // }

  // // Render based on parsedData
  // if (!parsedData) {
  //   return null; // Optionally render a loader or nothing
  // }
    

  // const PdfDocument = () => (

    return(
    <Document>
      <Page
        size={[1850, 1300]}

        style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.section}>
            <Text style={styles.heading}>Security & Privacy Overview</Text>
            <Text style={styles.deviceHeading}>{parsedData?.deviceName}</Text>
            <Text style={styles.text}>{parsedData?.manufacturedIn} {parsedData?.modelNumber}</Text>
            {
              <Text style={styles.text}>
                Firmware version:
                {parsedData?.firmwareVersion ? parsedData?.firmwareVersion : ""}
                - updated on: {parsedData?.updatedOn ? parsedData?.updatedOn : ""}
              </Text>
            }
            {
              <Text style={styles.text}>
                The device was manufactured in: <Text>{parsedData?.selectedCountry ? parsedData?.selectedCountry : "N/A"}</Text>
              </Text>
            }
          </View>
          <View style={styles.securitySection}>
            <View style={styles.securityHeader}>
              <Image src={img5} style={styles.image} />
              <Text style={styles.subHeading}>Security Mechanisms</Text>
            </View>

            <View style={styles.secruityListItemContainer}>
              <View style={styles.securityItems}>
                <View style={styles.nameContainer}>
                  <Text style={styles.securityListHeading}>Security Updates</Text>
                </View>
                <View style={styles.valueContainer}>
                  {
                    parsedData?.securityUpdates?.map((item, index) => (
                      <Text style={styles.text} key={index}>
                        {item?.name} - Available until at least {item?.value}
                      </Text>
                    ))}
                </View>
              </View>

              {parsedData?.securityAdditionalInformation?.length > 0 && (
                <View style={styles.securityItems}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.securityListHeading}>Additional Information</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.accessText}>
                      {parsedData?.securityAdditionalInformation || "N/A"}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.accessControlsItems}>
                <View style={styles.nameContainer}>
                  <Text style={styles.securityListHeading}>Access Control</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.text}>
                    {parsedData?.accessControls?.isPasswordChecked ? "Password" : ""}
                    {parsedData?.accessControls?.isFactoryDefaultChecked ? " - Factory Default" : ""}
                    {parsedData?.accessControls?.isUserGeneratedChecked ? " - User Generated" : ""}
                    {parsedData?.accessControls?.isUserChangeableChecked ? " - User Changeable" : ""}

                  </Text>
                  <Text style={styles.text}>
                    {parsedData?.accessControls?.biometricState ? "Biometric" : ""}
                  </Text>
                  <Text style={styles.text}>
                    {parsedData?.accessControls?.multiFactorState ? "Multi-factor Authentication" : ""}
                  </Text>
                  <Text style={styles.text}>
                    {parsedData?.accessControls?.noControlState ? "No Control Over access" : ""}
                  </Text>
                  <Text style={styles.text}>
                    {parsedData?.accessControls?.multipleUserState ? "Multiple User" : ""}
                    {parsedData?.accessControls?.requiredUserAccounts ? " - Required User Accounts" : ""}
                    {parsedData?.accessControls?.noUserAccountState ? " - No User Account" : ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.securitySection}>
            <View style={styles.securityHeader}>
              <Image src={img6} style={{ width: 30, height: 30 }} />
              <Text style={styles.subHeading}>Data Practices</Text>
            </View>
            <View style={styles.secruityListItemContainer}>

              <View >
                <View style={styles._table}>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.headerCol]}>
                      <Text style={{ fontSize: 12, textAlign: "right", marginRight: 30, marginTop: 50 }}>Sensor data collection</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.iconContainer}>
                        <Image src={sensor1} style={[styles.icon, parsedData?.sensorDataCollection === "Visual" ? styles.selectedImage : styles.unselectedImage]} />
                        <Text style={styles._text}>Visual</Text>
                      </View>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.iconContainer}>
                        <Image src={audio} style={[styles.icon, parsedData?.sensorDataCollection === "Audio" ? styles.selectedImage : styles.unselectedImage]} />
                        <Text style={styles._text}>Audio</Text>
                      </View>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.iconContainer}>
                        <Image src={sensor3} style={[styles.icon, parsedData?.sensorDataCollection === "Physiological" ? styles.selectedImage : styles.unselectedImage]} />
                        <Text style={styles._text}>Physiological</Text>
                      </View>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.iconContainer}>
                        <Image src={sensor4} style={[styles.icon, parsedData?.sensorDataCollection === "Location" ? styles.selectedImage : styles.unselectedImage]} />
                        <Text style={styles._text}>Location</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.headerCol]}>
                      <Text style={{ fontSize: 12, textAlign: "right", marginTop: 5, marginRight: 30 }}>Sensor type</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.tableInnerContainer}>
                        <Text style={styles._text}>{
                          parsedData?.sensorDataCollection === "Visual" && parsedData?.sensorType?.length > 0 ? parsedData?.sensorType : ""
                        }</Text>
                      </View>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.tableInnerContainer}>

                        <Text style={styles._text}>{
                          parsedData?.sensorDataCollection === "Audio" && parsedData?.sensorType?.length > 0 ? parsedData?.sensorType : ""

                        }</Text>
                      </View>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.tableInnerContainer}>

                        <Text style={styles._text}>{
                          parsedData?.sensorDataCollection === "Physiological" && parsedData?.sensorType?.length > 0 ? parsedData?.sensorType : ""

                        }
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.tableInnerContainer}>

                        <Text style={styles._text}>{
                          parsedData?.sensorDataCollection === "Location" && parsedData?.sensorType?.length > 0 ? parsedData?.sensorType : ""

                        }</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.headerCol]}>
                      <Text style={{ fontSize: 12, textAlign: "right", marginRight: 30, marginTop: 5 }}>Purpose</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.tableInnerContainer}>

                        <Text style={styles._text}>{
                          parsedData?.sensorDataCollection === "Visual" && parsedData?.purpose?.length > 0 ? parsedData?.purpose : ""

                        }</Text>
                      </View>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.tableInnerContainer}>

                        <Text style={styles._text}>{
                          parsedData?.sensorDataCollection === "Audio" && parsedData?.purpose?.length > 0 ? parsedData?.purpose : ""

                        }</Text>
                      </View>
                    </View>
                    <View style={styles.tableCol}>

                      <View style={styles.tableInnerContainer}>

                        <Text style={styles._text}>{
                          parsedData?.sensorDataCollection === "Physiological" && parsedData?.purpose?.length > 0 ? parsedData?.purpose : ""

                        } </Text>

                      </View>
                    </View>
                    <View style={styles.tableCol}>
                      <View style={styles.tableInnerContainer}>

                        <Text style={styles._text}>{
                          parsedData?.sensorDataCollection === "Location" && parsedData?.purpose?.length > 0 ? parsedData?.purpose : ""

                        }</Text>

                      </View>
                    </View>
                  </View>


                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.headerCol]}>
                      <Text style={{ fontSize: 12, textAlign: "right", marginTop: 5, marginRight: 30 }}>Other collected data</Text>
                    </View>
                    <View style={[styles.tableCol, { flex: 4.1 }]}>
                      <View style={styles.tableInnerContainer}>
                        <Text style={[styles._text, { textAlign: "left" }]}>{
                          parsedData?.sensorDataCollectionArray
                        }
                        </Text>
                      </View>

                    </View>

                  </View>

                </View>
              </View>
              {parsedData?.sensors?.length > 0 &&
                parsedData?.sensors?.map((item, index) => {
                  if (item?.value?.length > 0) {
                    const isEven = (index + 1) % 2 === 0; 
                    const isNotLast = index !== parsedData?.sensors?.length - 1;

                    return (
                      <View
                        style={
                          isEven && isNotLast && item.value.length > 0 
                            ? [styles.securityItems, { backgroundColor: "white", borderBottom: "none" }]
                            : styles.securityItems
                        }
                        key={index}
                      >
                        <View style={styles.nameContainer}>
                          <Text style={styles.nameText}>{item?.name}</Text>
                        </View>
                        <View style={styles.valueContainer}>
                          <Text style={styles.valueText}>{item?.value}</Text>
                        </View>
                      </View>
                    );
                  }
                  return null;
                })}

                {
                  parsedData?.sensorTypeCollection?.length > 0 &&
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableColHeader}>
                    <Text style={styles.tableHeaderText}>Sensor Data Collection</Text>
                  </View>
                  <View style={styles.tableColHeader}>
                    <Text style={styles.tableHeaderText}>Sensor Type</Text>
                  </View>
                  <View style={styles.tableColHeader}>
                    <Text style={styles.tableHeaderText}>Purpose</Text>
                  </View>
                 
                </View>

                {parsedData?.sensorTypeCollection?.length > 0 &&
                  parsedData?.sensorTypeCollection.map((data, index) => {
                    return (
                      <View style={styles.tableRow}>

                        <View style={styles.tableColGray}>
                          <Text style={styles.tableText}>{data?.type}</Text>
                        </View>
                        <View style={styles.tableColGray}>
                          <Text style={styles.tableText}>{data?.sensorType}</Text>
                        </View>
                        <View style={styles.tableColGray}>
                          <Text style={styles.tableText}>{data?.purpose}</Text>
                        </View>
                      </View>
                    )
                  })}


              </View>
                }

              {
                parsedData?.localStorage?.dataStoredOnDevice &&
                  <View style={styles.securityItems}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Data Stored in the device</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.localStorage?.dataStoredOnDevice}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.localStorage?.additionalInfo1 &&

                  <View style={[styles.securityItems,{backgroundColor:"white",borderBottom:"none"}]}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Additional Information</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.localStorage?.additionalInfo1}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.localStorage?.localDataRetentionTime &&
                  <View style={styles.securityItems}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Local data retention time</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.localStorage?.localDataRetentionTime}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.localStorage?.additionalInfo2 &&
                  <View style={[styles.securityItems,{backgroundColor:"white",borderBottom:"none"}]}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Additional Information</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.localStorage?.additionalInfo2}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.cloudData?.dataStoredInCloud &&
                  <View style={styles.securityItems}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Data stored in the cloud</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.cloudData?.dataStoredInCloud}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.cloudData?.additionalInfo1 &&
                <View style={[styles.secruityListItemContainer, { padding: 2, width: "100%" }]}>
                  <View style={[styles.securityItems,{backgroundColor:"white",borderBottom:"none"}]}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Additional Information</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.cloudData?.additionalInfo1}
                      </Text>
                    </View>
                  </View>
                </View>
              }
              {
                parsedData?.cloudData?.cloudDataRetentionTime &&
                  <View style={styles.securityItems}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Cloud data retention time</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.cloudData?.cloudDataRetentionTime}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.cloudData?.additionalInfo2 &&
                  <View style={[styles.securityItems,{backgroundColor:"white",borderBottom:"none"}]}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Additional Information</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.cloudData?.additionalInfo2}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.cloudData?.dataSharedWith &&
                  <View style={styles.securityItems}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Data shared with</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.cloudData?.dataSharedWith}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.cloudData?.additionalInfo3 &&
                  <View style={[styles.securityItems,{backgroundColor:"white",borderBottom:"none"}]}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Additional Information</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.cloudData?.additionalInfo3}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.cloudData?.dataSharingFrequency &&
                  <View style={styles.securityItems}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Data sharing frequency</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.cloudData?.dataSharingFrequency}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.cloudData?.dataSoldTo &&
                  <View style={[styles.securityItems,{backgroundColor:"white",borderBottom:"none"}]}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Data sold to</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.cloudData?.dataSoldTo}
                      </Text>
                    </View>
                  </View>
              }
              {
                parsedData?.cloudData?.additionalInfo4 &&
                  <View style={styles.securityItems}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.securityListHeading}>Additional Information</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText} >
                        {parsedData?.cloudData?.additionalInfo4}
                      </Text>
                    </View>
                  </View>
              }

            </View>
          </View> 

          <View style={styles.securitySection}>
            <View style={styles.securityHeader}>
              <Image src={img7} style={styles.image} />
              <Text style={styles.subHeading}>More Information</Text>
            </View>

            <View style={styles.secruityListItemContainer}>
              <View style={[styles.securityItems,{backgroundColor:"white",borderBottom:"none"}]}>
                <View style={styles.nameContainer}>
                  <Text style={styles.securityListHeading}>Detailed Security & Privacy Label:
                  </Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.accessText}>
                    Not Disclosed
                  </Text>
                </View>
              </View>
            </View>

          </View>
        </View>
      </Page>
    </Document>
    )
  // );

  // return (
  //   <PdfDocument />
  // )


  // return (
  //   <div>
  //     {/* <h1>PDF Generator</h1> */}
  //     {/* PDF Viewer */}
  //     <PDFViewer style={{ width: '100%', height: '600px' }}>
  //       <PdfDocument />
  //     </PDFViewer>

  //     {/* PDF Download Link */}
  //     <PDFDownloadLink
  //       document={<PdfDocument />}
  //       fileName="download.pdf"
  //       style={{
  //         marginTop: 20,
  //         padding: 10,
  //         backgroundColor: '#007BFF',
  //         color: '#FFF',
  //         textDecoration: 'none',
  //         borderRadius: 5,
  //       }}
  //     >
  //       {({ loading }) =>
  //         loading ? 'Preparing document...' : 'Download PDF'
  //       }
  //     </PDFDownloadLink>
  //   </div>


  // );
};

export default PdfGenerator;

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    padding: 10,
  },
  securitySection: {
    border: '1px solid black',
    // marginBottom: 20,
    display: "flex",
    flexDirection: "row"
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deviceHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: "#828282"
  },
  subHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  accessText: {
    fontSize: 12,
    marginBottom: 5,
    width: '50%',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: 10,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  securityHeader: {
    display: 'flex',
    flexDirection: 'column',
    width: "20%",
    backgroundColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
  }
  , securityItems: {
    display: 'flex',
    flexDirection: 'row',
    // gap:50,
    // justifyContent:"space-between",
    overflow: "hidden",
    // padding: 10,
    // marginTop: 10,
    backgroundColor: "#E5E5E5",


  }
  , sensorsListItems: {
    marginLeft: 100,
    display: "flex",
  }
  , secturityListItems: {
    marginLeft: 30,
    display: "flex",
  },
  securityListHeading: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  secruityListItemContainer: {
    // padding: 10,
    width: "80%",
  },
  pageContainer: {
    border: "5px solid #000"
  },
  securityItems: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures even spacing between name and value
    // padding: 10,
    // marginTop: 10,
    backgroundColor: "#E5E5E5",
    borderBottom: '1px solid #ccc', // Optional separator for clarity
  },
  nameContainer: {
    flex: 2, // 40% of the space
    textAlign: 'left',
    paddingRight: 10,
  },
  valueContainer: {
    flex: 3, // 60% of the space
    textAlign: 'left',
  },
  nameText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  valueText: {
    fontSize: 12,
    color: '#555',
  },

  accessControlsItems: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items at the top
    justifyContent: 'space-between', // Maintain spacing between name and value
    padding: 10,
    marginTop: 10,
    // backgroundColor: '#E5E5E5',
    // borderBottom: '1px solid #ccc', // Optional for visual separation
  },

  securityItems: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items at the top
    justifyContent: 'space-between', // Maintain spacing between name and value
    padding: 10,
    // marginTop: 10,
    backgroundColor: '#E5E5E5',
    borderBottom: '1px solid #ccc', // Optional for visual separation
    // paddingLeft:10
    width:"98%",
    margin:"0 auto"
  },
  nameContainer: {
    flex: 2, // 40% width
    textAlign: 'left',
    paddingRight: 10,
  },
  valueContainer: {
    flex: 3, // 60% width
    textAlign: 'left',
  },
  securityListHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  accessText: {
    fontSize: 12,
    color: '#555',
  },

  _table: {
    display: "table",
    width: "90%",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    // padding: 5,
  },
  headerCol: {
    flex: 1,
    // backgroundColor: "#f9f9f9",
    fontWeight: "bold",
    textAlign: "left",
    border: "none"
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    padding: 20
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  _text: {
    fontSize: 10,
    textAlign: "center",
  },
  selectedImage: {
    opacity: 1,
  },
  unselectedImage: {
    opacity: 0.4,
  },
  unselectedText: {
    color: "#ccc",
  },
  otherCollectedContainer: {
    display: "flex",
    flexDirection: "row",
  },
  otherCollectedHeader: {
    width: "20%",
    padding: 5,
    textAlign: "right",
    // marginRight:30
  },
  otherCollectedContent: {
    width: "80%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    // position:"relative",
    // left:0.2

  },
  tableInnerContainer: {
    padding: "10px"
  },
  sensorTypeHeading: {
    // width:50,
    height: 60,
    border: "1px solid #000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRight: "1px solid #000",
    // width:50,
  },
  sensorContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  sensorDataCollectionLable: {
    textAlign: "center",
    justifyContent: "center",
  },
  sensorDataCollectionLableText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000"
  },
  sensorTypeHeadingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000"
  },
  sensorTypeListed: {
    width: 150,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E5E5"
  },
  nestedSensorContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20
  },
  customNestedSensorContainer: {
    overflowX: "auto", /* Enables horizontal scrolling */
    marginTop: 20,
    padding: 1,
    border: "1px solid #ccc",
    display: "flex"
  },

  customTableWrapper: {
    display: "table",
    width: "100%",
    minWidth: 600, // Ensures horizontal scroll for smaller screens
    borderCollapse: "collapse",
    display: "flex",
    flexDirection: "row"
  },
  customTableHeader: {
    display: "table-row",
    backgroundColor: "#f5f5f5",
  },
  customHeaderCell: {
    display: "table-cell",
    padding: 10,
    fontWeight: "bold",
    fontSize: 12,
    border: "1px solid #ccc",
    textAlign: "center",
    wordWrap: "break-word",
    whiteSpace: "normal",
    wordBreak: "break"

  },
  customTableBody: {
    display: "flex",
    flexDirection: "row"
    // display: "table-row-group",
  },
  customTableRow: {
    display: "table-row",
  },
  customTableCell: {
    display: "table-cell",
    padding: 10,
    fontSize: 12,
    border: "1px solid #ccc",
    textAlign: "center",
    // wordWrap: "break-word",
    whiteSpace: "nowrap",
    wordBreak: "break-all",
    // minWidth: '200px',
    overflow: 'hidden',

  },



  page: {
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: '#000',
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#EEE',
    padding: 5,
    textAlign: 'center',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  tableColGray: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    // backgroundColor: '#DDD',
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableText: {
    fontSize: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#DDD',
  },
  infoRowText: {
    fontSize: 10,
    fontWeight: 'bold',
  },

});
