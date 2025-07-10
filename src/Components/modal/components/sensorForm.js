import { useEffect, useState } from "react";
import "./device.css";
// import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
// import { useDispatch } from 'react-redux';

const SensorForm = ({ result, currentDropItem, onClose, setToggleState }) => {
  const [value, setValue] = useState(new Date());
  console.log("val", value);
  const [showCalendar, setShowCalendar] = useState(false); // Control calendar visibility
  const [deviceName, setDeviceName] = useState(result || ""); // Device name state

  const [sensorDataCollection, setSensorDataCollection] = useState("Visual");
  const [
    sensorDataCollectionadditionalInfo,
    setSensorDataCollectionadditionalInfo,
  ] = useState("");
  const [sensorTypeAdditionalInfo, setSensorTypeAdditionalInfo] = useState("");
  const [
    dataCollectionFrequencyAdditionalInformation,
    setDataCollectionFrequencyAdditionalInformation,
  ] = useState("");
  const [purposeAdditionalInformation, setPurposeAditionalInformation] =
    useState("");
  const [
    otherCollectedDataAdditionalInformation,
    setOtherCollectedDataAdditionalInformation,
  ] = useState("");

  const [inferredData, setInferredData] = useState("Attitudes and preferences");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState("");
  const [otherAdditionalInfo, setOtherAdditionalInfo] = useState("");
  const [complianceAdditionalInformation, setComplianceAdditionalInformation] =
    useState("");

  const [sensorType, setSensorType] = useState("Camera");
  const [dataCollectionFrequency, setDataCollectionFrequency] = useState(
    "When an event happens"
  );
  const [purpose, setPurpose] = useState(
    "Providing and improving device functions"
  );
  const [otherCollectedData, setOtherCollectedData] = useState(
    "User's contact information is collected"
  );
  const [dataHandlingForChildren, setDataHandlingForChildren] = useState("No");
  const [dataLinkage, setDataLinkage] = useState(
    "Data may be linked with internal data sources"
  );
  const [complianceInfo, setComplianceInfo] = useState("");

  // const toggleCalendar = () => {
  //   setShowCalendar(!showCalendar);
  // };

  // Handle date selection
  // const handleDateChange = (date) => {
  //   setValue(date); // Update the selected date
  //   setShowCalendar(false); // Close the calendar when a date is selected
  // };
  // const handleChangeValue = (e) => {
  //   setValue(e.target.value);
  // };
  useEffect(() => {
    if (result) {
      setDeviceName(result);
    }
  }, [result]);

  const handeSubmit = (e) => {
    e.preventDefault();

    const payload = {
      _deviceName: deviceName,
      sensorDataCollection,
      sensorDataCollectionadditionalInfo,
      sensorType,
      sensorTypeAdditionalInfo,
      dataCollectionFrequency,
      dataCollectionFrequencyAdditionalInformation,
      purpose,
      purposeAdditionalInformation,
      otherCollectedData,
      otherCollectedDataAdditionalInformation,
      dataHandlingForChildren,
      dataLinkage,
      complianceInfo,
      complianceAdditionalInformation,
      inferredData,
      additionalInfo,
      privacyPolicyUrl,
      otherAdditionalInfo,
      resultInfo: result,
    };

    const formatPayload = {
      sensors: [
        { name: "Data Linkage", value: dataLinkage },
        {
          name: "Special Data Handling Practices for Children",
          value: dataHandlingForChildren,
        },
        { name: "Compliance with", value: complianceInfo },
        { name: "Inferred Data", value: inferredData },
        { name: "Additional Information", value: additionalInfo },
        { name: "Privacy Policy (URL)", value: privacyPolicyUrl },
        { name: "Other Additional Information", value: otherAdditionalInfo },
        {
          name: "Sensor Data Collection Additional Information",
          value: sensorDataCollectionadditionalInfo,
        },
        {
          name: "Sensor Type Additional Information",
          value: sensorTypeAdditionalInfo,
        },
        {
          name: "Data Collection Frequency Additional Information",
          value: dataCollectionFrequencyAdditionalInformation,
        },
        {
          name: "Purpose Additional Information",
          value: purposeAdditionalInformation,
        },
        {
          name: "Other Collected Data Additional Information",
          value: otherCollectedDataAdditionalInformation,
        },
        {
          name: "Compliance Additional Information",
          value: complianceAdditionalInformation,
        },
      ],
      resultInfo: result,
      _deviceName: deviceName,
      sensorType,
      purpose,
      dataCollectionFrequency,
      otherCollectedData,
      otherCollectedDataAdditionalInformation,
      purposeAdditionalInformation,
      sensorDataCollectionadditionalInfo,
      sensorAdditionalInfo: additionalInfo,
      sensorDataCollection,
    };

    const getLocalStorage = localStorage.getItem("pdfData");
    const parsedData = getLocalStorage ? JSON.parse(getLocalStorage) : {};

    const excludedValues = ["Visual", "Location", "Audio", "Physiological"]; // Values to exclude

    if (!excludedValues.includes(sensorDataCollection)) {
      const newSensorValue = sensorDataCollection; // New value to append

      if (parsedData.sensorDataCollectionArray) {
        const currentValues = parsedData.sensorDataCollectionArray.split(","); // Split existing values into an array

        if (!currentValues.includes(newSensorValue)) {
          // Add the new value if it doesn't already exist
          currentValues.push(newSensorValue);
          parsedData.sensorDataCollectionArray = currentValues.join(","); // Join the values back into a string
        }
      } else {
        // If `sensorDataCollectionArray` doesn't exist, initialize it with the new value
        parsedData.sensorDataCollectionArray = newSensorValue;
      }
    }

    var sensorTypeCollection = parsedData?.sensorTypeCollection || []; // Initialize if undefined

    // const validSensorTypes = ["Camera sensor", "Voice sensor", "GPS sensor"];
    console.log({ sensorType });

    const sensorListCollection = {
      type: sensorDataCollection,
      sensorType,
      purpose,
    };

    // if (!validSensorTypes.includes(sensorType)) {
    sensorTypeCollection.push(sensorListCollection);
    // }
    console.log({ sensorListCollection });

    const updatedData = {
      ...parsedData,
      ...formatPayload,
      sensorTypeCollection,
      // sensorListCollection
    };
    const sensorArray = {
      currentDropItem: currentDropItem,
      formatPayload,
    };

    localStorage.setItem("pdfData", JSON.stringify(updatedData));
    localStorage.setItem("sensorArray", JSON.stringify(sensorArray));

    localStorage.setItem(currentDropItem, JSON.stringify(payload));
    setToggleState(currentDropItem);
    // dispatch(setToggle(true));

    onClose();
  };

  useEffect(() => {
    const data = localStorage.getItem(currentDropItem);
    const parsedData = data ? JSON.parse(data) : null;

    if (parsedData) {
      setDeviceName(parsedData?.resultInfo || "");
      setSensorDataCollection(parsedData.sensorDataCollection || "Visual");
      setSensorDataCollectionadditionalInfo(
        parsedData.sensorDataCollectionadditionalInfo || ""
      );
      setSensorType(parsedData.sensorType || "Camera");
      setSensorTypeAdditionalInfo(parsedData.sensorTypeAdditionalInfo || "");
      setDataCollectionFrequency(
        parsedData.dataCollectionFrequency || "When an event happens"
      );
      setDataCollectionFrequencyAdditionalInformation(
        parsedData.dataCollectionFrequencyAdditionalInformation || ""
      );
      setPurpose(
        parsedData.purpose || "Providing and improving device functions"
      );
      setPurposeAditionalInformation(
        parsedData.purposeAdditionalInformation || ""
      );
      setOtherCollectedData(
        parsedData.otherCollectedData ||
          "User's contact information is collected"
      );
      setOtherCollectedDataAdditionalInformation(
        parsedData.otherCollectedDataAdditionalInformation || ""
      );
      setDataHandlingForChildren(parsedData.dataHandlingForChildren || "No");
      setDataLinkage(
        parsedData.dataLinkage ||
          "Data may be linked with internal data sources"
      );
      setComplianceInfo(parsedData.complianceInfo || "");
      setComplianceAdditionalInformation(
        parsedData.complianceAdditionalInformation || ""
      );
      setInferredData(parsedData.inferredData || "Attitudes and preferences");
      setAdditionalInfo(parsedData.additionalInfo || "");
      setPrivacyPolicyUrl(parsedData.privacyPolicyUrl || "");
      setOtherAdditionalInfo(parsedData.otherAdditionalInfo || "");
    }
  }, [currentDropItem]);

  return (
    <div>
      <form onSubmit={handeSubmit}>
        <div className="form-container">
          <p>Sensor</p>
          <div className="border-line"></div>
          <h5>Additional notes:</h5>
          <ul class="list-disc ">
            <li>
              By default, all the fields in this section are shown as “Not
              disclosed.”
            </li>
          </ul>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper sensor-wrapper">
              <label for="deviceName">Sensor data collection</label>
              <select
                id="grid-manufactured-in"
                value={sensorDataCollection}
                onChange={(e) => setSensorDataCollection(e.target.value)}
              >
                <option data-v-7c1b719a="" value="Visual">
                  Visual
                </option>
                <option data-v-7c1b719a="" value="Audio">
                  Audio
                </option>
                <option data-v-7c1b719a="" value="Location">
                  Position
                </option>
                <option data-v-7c1b719a="" value="Physiological">
                  Physiological
                </option>
                {/* <option data-v-7c1b719a="" value="Motion">Motion</option> */}
                {/* <option data-v-7c1b719a="" value="Changes to the magnetic field">Changes to the magnetic field */}
                {/* </option> */}
                {/* <option data-v-7c1b719a="" value="Presence">Presence</option> */}
                {/* <option data-v-7c1b719a="" value="Pressure">Pressure</option> */}
                {/* <option data-v-7c1b719a="" value="Tampering efforts">Tampering efforts</option> */}
                {/* <option data-v-7c1b719a="" value="Distance">Distance</option> */}
                {/* <option data-v-7c1b719a="" value="Liquid level">Liquid level</option> */}
                <option data-v-7c1b719a="" value="Light">
                  Light
                </option>
                {/* <option data-v-7c1b719a="" value="Carbon monoxide">Carbon monoxide</option> */}
                <option data-v-7c1b719a="" value="Humidity">
                  Humidity
                </option>
                {/* <option data-v-7c1b719a="" value="Water quality">Water quality</option> */}
                {/* <option data-v-7c1b719a="" value="Smoke">Smoke</option> */}
                <option data-v-7c1b719a="" value="Temperature">
                  Temperature
                </option>
                <option data-v-7c1b719a="" value="Voice">
                  Voice
                </option>
                <option data-v-7c1b719a="" value="Ultrasonic ">
                  Ultrasonic
                </option>
                <option data-v-7c1b719a="" value="Proximity">
                  Proximity
                </option>
                <option data-v-7c1b719a="" value="Laser">
                  Laser
                </option>
                {/* <option data-v-7c1b719a="" value="Other">Other</option> */}
              </select>
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper ">
              <label for="deviceName">Additional Information (optional)</label>
              <textarea
                value={sensorDataCollectionadditionalInfo}
                onChange={(e) =>
                  setSensorDataCollectionadditionalInfo(e.target.value)
                }
                rows={3}
                cols={39}
                placeholder="Additional Information"
                type="text"
                id="deviceName"
                name="deviceName"
              />
            </div>
          </div>

          <div className="field-wrapper">
            <div className="form-group sensor-wrapper sensor-wrapper">
              <label for="deviceName">Sensor type</label>
              <select
                id="grid-manufactured-in"
                className="width-339"
                value={sensorType}
                onChange={(e) => setSensorType(e.target.value)}
              >
                <option data-v-7c1b719a="" value="Tamperature">
                  Tamperature sensor
                </option>

                <option data-v-7c1b719a="" value="Humidity sensor">
                  Humidity sensor
                </option>
                <option data-v-7c1b719a="" value="Light sensor">
                  Light sensor
                </option>
                <option data-v-7c1b719a="" value="Proximity sensor">
                  Proximity sensor
                </option>
                <option data-v-7c1b719a="" value="Laser sensor">
                  Laser sensor
                </option>

                <option data-v-7c1b719a="" value="Camera sensor">
                  Camera sensor
                </option>

                <option data-v-7c1b719a="" value="Voice sensor">
                  Voice sensor
                </option>
                <option data-v-7c1b719a="" value="GPS sensor">
                  GPS sensor
                </option>
                <option data-v-7c1b719a="" value="Ultrasonic sensor">
                  Ultrasonic sensor
                </option>

                {/* <option data-v-7c1b719a="" value="Other">Other</option> */}
              </select>
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">Additional Information (optional)</label>
              <textarea
                value={sensorTypeAdditionalInfo}
                onChange={(e) => setSensorTypeAdditionalInfo(e.target.value)}
                rows={3}
                cols={39}
                placeholder="Additional Information"
                type="text"
                id="deviceName"
                name="deviceName"
              />
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">Data collection frequency</label>
              <select
                id="grid-manufactured-in"
                value={dataCollectionFrequency}
                onChange={(e) => setDataCollectionFrequency(e.target.value)}
              >
                <option data-v-7c1b719a="" value="When an event happens">
                  When an event happens
                </option>
                <option
                  data-v-7c1b719a=""
                  value="When third parties request it"
                >
                  When third parties request it
                </option>
                <option data-v-7c1b719a="" value="When user requests it">
                  When user requests it
                </option>
                <option data-v-7c1b719a="" value="Periodic">
                  Periodic
                </option>
                <option data-v-7c1b719a="" value="Continuous">
                  Continuous
                </option>
                <option data-v-7c1b719a="" value="When required by law">
                  When required by law
                </option>
                <option data-v-7c1b719a="" value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">Additional Information (optional)</label>
              <textarea
                value={dataCollectionFrequencyAdditionalInformation}
                onChange={(e) =>
                  setDataCollectionFrequencyAdditionalInformation(
                    e.target.value
                  )
                }
                rows={3}
                cols={39}
                placeholder="Additional Information"
                type="text"
                id="deviceName"
                name="deviceName"
              />
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">Purpose</label>
              <select
                id="grid-manufactured-in"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option
                  data-v-7c1b719a=""
                  value="Providing and improving device functions"
                >
                  Providing and improving core device functionality
                </option>
                <option data-v-7c1b719a="" value="Personalization">
                  Personalization
                </option>
                <option
                  data-v-7c1b719a=""
                  value="Tailored advertising and monetization"
                >
                  Tailored advertising and monetization
                </option>
                <option
                  data-v-7c1b719a=""
                  value="Contacting and updating users"
                >
                  Contacting and updating users
                </option>
                <option data-v-7c1b719a="" value="Security and safety">
                  Security and safety
                </option>
                <option data-v-7c1b719a="" value="Research">
                  Research
                </option>
                <option data-v-7c1b719a="" value="Unspecified third-party use">
                  Unspecified third-party use
                </option>
                <option data-v-7c1b719a="" value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">Additional Information (optional)</label>
              <textarea
                value={purposeAdditionalInformation}
                onChange={(e) => setPurposeAditionalInformation(e.target.value)}
                rows={3}
                cols={39}
                placeholder="Additional Information"
                type="text"
                id="deviceName"
                name="deviceName"
              />
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">Other Collected Data</label>
              <select
                id="grid-manufactured-in"
                value={otherCollectedData}
                onChange={(e) => setOtherCollectedData(e.target.value)}
              >
                <option
                  data-v-7c1b719a=""
                  value="User's contact information is collected"
                >
                  Contact info
                </option>
                <option
                  data-v-7c1b719a=""
                  value="User's account information is collected"
                >
                  Account info
                </option>
                <option
                  data-v-7c1b719a=""
                  value="User's payment information is collected"
                >
                  Payment info
                </option>
                <option
                  data-v-7c1b719a=""
                  value="Device's setup information is collected"
                >
                  Device setup info
                </option>
                <option
                  data-v-7c1b719a=""
                  value="Technical information related to the device is collected"
                >
                  Device tech info
                </option>
                <option
                  data-v-7c1b719a=""
                  value="Device's usage information is collected"
                >
                  Device usage info
                </option>
                <option
                  data-v-7c1b719a=""
                  value="Device's unique identifiers (e.g., MAC address) are collected"
                >
                  Device unique identifiers
                </option>
                <option data-v-7c1b719a="" value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">Additional Information (optional)</label>
              <textarea
                value={otherCollectedDataAdditionalInformation}
                onChange={(e) =>
                  setOtherCollectedDataAdditionalInformation(e.target.value)
                }
                rows={3}
                cols={39}
                placeholder="Additional Information"
                type="text"
                id="deviceName"
                name="deviceName"
              />
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">
                Special Data Handling Practices for Children
              </label>
              <select
                id="grid-manufactured-in"
                value={dataHandlingForChildren}
                onChange={(e) => setDataHandlingForChildren(e.target.value)}
              >
                <option data-v-7c1b719a="" value="Yes">
                  Yes
                </option>
                <option data-v-7c1b719a="" value="No">
                  No
                </option>
              </select>
            </div>
          </div>

          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">Data linkage</label>
              <select
                id="grid-manufactured-in"
                value={dataLinkage}
                onChange={(e) => setDataLinkage(e.target.value)}
              >
                <option
                  data-v-7c1b719a=""
                  value="Data may be linked with internal data sources"
                >
                  Data may be linked with internal data sources
                </option>
                <option
                  data-v-7c1b719a=""
                  value="Data may be linked with external data sources"
                >
                  Data may be linked with external data sources
                </option>
                <option
                  data-v-7c1b719a=""
                  value="Data may be linked with internal and external data sources"
                >
                  Data may be linked with internal and external data sources
                </option>
                <option
                  data-v-7c1b719a=""
                  value="Data will not be linked with other data sources"
                >
                  Data will not be linked with other data sources
                </option>
              </select>
            </div>
          </div>

          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">In Compliance with</label>
              <input
                value={complianceInfo}
                onChange={(e) => setComplianceInfo(e.target.value)}
                style={{ width: "350px" }}
                type="text"
                id="deviceName"
                name="deviceName"
              />
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label for="deviceName">Additional Information (optional)</label>
              <textarea
                value={complianceAdditionalInformation}
                onChange={(e) =>
                  setComplianceAdditionalInformation(e.target.value)
                }
                rows={3}
                cols={39}
                placeholder="Additional Information"
                type="text"
                id="deviceName"
                name="deviceName"
              />
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label htmlFor="inferredData">
                What will be inferred from user's data
              </label>
              <select
                id="inferredData"
                value={inferredData}
                onChange={(e) => setInferredData(e.target.value)}
              >
                <option value="Attitudes and preferences">
                  Attitudes and preferences
                </option>
                <option value="Characteristics and psychological traits">
                  Characteristics and psychological traits
                </option>
                <option value="Aptitudes and abilities">
                  Aptitudes and abilities
                </option>
                <option value="Behaviors">Behaviors</option>
                <option value="No data inference">No data inference</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label htmlFor="additionalInfo">
                Additional Information (optional)
              </label>
              <textarea
                rows={3}
                cols={39}
                placeholder="Additional Information"
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label htmlFor="privacyPolicyUrl">
                Privacy Policy <span>(URL)</span>
              </label>
              <input
                type="text"
                id="privacyPolicyUrl"
                placeholder="https://www.NS200.example.com/policy"
                style={{ width: "350px" }}
                value={privacyPolicyUrl}
                onChange={(e) => setPrivacyPolicyUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label htmlFor="otherAdditionalInfo">
                Additional Information (optional)
              </label>
              <textarea
                rows={3}
                cols={39}
                placeholder="Additional Information"
                id="otherAdditionalInfo"
                value={otherAdditionalInfo}
                onChange={(e) => setOtherAdditionalInfo(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="border-line"></div>
        <div className="submit">
          <button className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SensorForm;
