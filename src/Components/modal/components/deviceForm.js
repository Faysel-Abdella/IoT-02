import React, { useEffect, useState } from "react";
import "./device.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DeviceForm = ({
  result,
  onClose,
  matchDevice,
  currentDropItem,
  setCheckDeviceName,
}) => {
  const [value, setValue] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // Control calendar visibility
  const [deviceName, setDeviceName] = useState(result || ""); // Device name state
  const [automaticUpdatesCalender, setAutomaticUpdateCalendar] =
    useState(false); // Automatic updates state
  const [automaticValue, setAutomaticValue] = useState(new Date()); // Automatic updates date state
  const [manualUpdatesCalender, setManualUpdateCalendar] = useState(false); // Manual updates state
  const [manualValue, setManualValue] = useState(new Date()); // Manual updates date state
  const [consentUpdateCalnedar, setConsentUpdateCalendar] = useState(false); // Consent state
  const [consentValue, setConsentValue] = useState(new Date()); // Consent date state
  const [otherUpdateCalnedar, setOtherUpdateCalendar] = useState(false); // Other updates state
  const [otherValue, setOtherValue] = useState(new Date()); // Other updates date state

  const [isPasswordChecked, setPasswordChecked] = useState(true);
  const [isFactoryDefaultChecked, setFactoryDefaultChecked] = useState(false);
  const [isUserGeneratedChecked, setUserGeneratedChecked] = useState(false);
  const [isUserChangeableChecked, setUserChangeableChecked] = useState(false);

  const [biometricState, setBiometricState] = useState(false);
  const [multiFactorState, setMultiFactorState] = useState(false);
  const [noControlState, setNoControlState] = useState(false);
  const [multipleUserState, setMultipleUserState] = useState(false);
  // const [bioMetricCheckbox, setBioMetricCheckbox] = useState(false);
  const [noUserAccountState, setNoUserAccountState] = useState(false);
  const [requiredUserAccounts, setRequiredUserAccounts] = useState(false);
  // const [multifactorAuthetication, setMultifactorAuthetication] = useState(false);
  // const [noControlOverAccess, setNoControlOverAccess] = useState(false);
  // const [multipleUserAccounts, setMultipleUserAccounts] = useState(false);
  const [vehicleState, setVehicleState] = useState(false);
  const [noSecurityUpdates, setNoSecurityUpdates] = useState(false);
  const [manualState, setManualState] = useState(false);
  const [consentValueState, setConsentValueState] = useState(false);
  const [otherUpdatesState, setOtherUpdatesState] = useState(false);
  const [otherstate, setOtherState] = useState(false);
  const [bioMetricCheckboxState, setBioMetricCheckboxState] = useState(false);

  const [formValues, setFormValues] = useState({
    deviceName: "",
    modelNumber: "",
    firmwareVersion: "",
    updatedOn: "",
    manufacturedIn: "",
    automaticUpdates: "",
    automaticUpdatesUntil: "",
    manualUpdates: "",
    manualUpdatesUntil: "",
    consentUpdates: "",
    consentUpdatesUntil: "",
    otherUpdates: "",
    otherUpdatesUntil: "",
    vehicle: "",
    noSecurityUpdates: "",
    securityAdditionalInformation: "",
    bioMetricAdditionalInformation: "",
  });
  const [selectedCountry, setSelectedCountry] = useState();

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setValue(date); // Update the selected date
    setShowCalendar(false); // Close the calendar when a date is selected
  };
  const handleChangeValue = (e) => {
    setDeviceName(e.target.value);
  };

  const toggleAutomaticUpdateCalendar = () => {
    setAutomaticUpdateCalendar(!automaticUpdatesCalender);
  };

  const handleAutomaticDateChange = (date) => {
    setAutomaticValue(date);
    setAutomaticUpdateCalendar(false);
  };

  const toggleManualUpdateCalendar = () => {
    setManualUpdateCalendar(!manualUpdatesCalender);
  };

  const handleManualDateChange = (date) => {
    setManualValue(date);
    setManualUpdateCalendar(false);
  };
  const toggleConsentUpdateCalendar = () => {
    setConsentUpdateCalendar(!consentUpdateCalnedar);
  };

  const handleConsentDateChange = (date) => {
    setConsentValue(date);
    setConsentUpdateCalendar(false);
  };
  const toggleOtherUpdateCalendar = () => {
    setOtherUpdateCalendar(!otherUpdateCalnedar);
  };

  const handleOtherDateChange = (date) => {
    setOtherValue(date);
    setOtherUpdateCalendar(false);
  };

  // const formChangeHandler = (e) => {
  //     setFormValues({
  //         ...formValues,
  //         [e.target.name]: e.target.value
  //     })
  // }
  const formChangeHandler = (e) => {
    const { name, type, checked, value } = e.target;
    console.log("type and checked", type, checked);

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (result) {
      setDeviceName(result);
    }

    // get data from localstorage with key matchDevice and set in formValues
    const data = localStorage.getItem(currentDropItem);

    if (data) {
      const parsedData = JSON.parse(data);

      setFormValues(parsedData);
      setSelectedCountry(parsedData?.selectedCountry || "");
      setValue(new Date(parsedData?.updatedOn || new Date()));
      setAutomaticValue(
        new Date(parsedData?.automaticUpdatesUntil || new Date())
      );
      setManualValue(new Date(parsedData?.manualUpdatesUntil || new Date()));
      setConsentValue(new Date(parsedData?.consentUpdatesUntil || new Date()));
      setOtherValue(new Date(parsedData?.otherUpdatesUntil || new Date()));

      setPasswordChecked(parsedData?.isPasswordChecked || false);
      setFactoryDefaultChecked(parsedData?.isFactoryDefaultChecked || false);
      setUserGeneratedChecked(parsedData?.isUserGeneratedChecked || false);
      setUserChangeableChecked(parsedData?.isUserChangeableChecked || false);

      setBiometricState(parsedData?.biometricState || false);
      setMultiFactorState(parsedData?.multiFactorState || false);
      setNoControlState(parsedData?.noControlState || false);
      setMultipleUserState(parsedData?.multipleUserState || false);
      // setBioMetricCheckbox(parsedData?.bioMetricCheckbox || false);
      setNoUserAccountState(parsedData?.noUserAccountState || false);
      setRequiredUserAccounts(parsedData?.requiredUserAccounts || false);
      // setMultifactorAuthetication(parsedData?.multifactorAuthetication || false);
      // setNoControlOverAccess(parsedData?.noControlOverAccess || false);
      // setMultipleUserAccounts(parsedData?.multipleUserAccounts || false);
      setVehicleState(parsedData?.vehicleState || false);
      setNoSecurityUpdates(parsedData?.noSecurityUpdates || false);
      setManualState(parsedData?.manualState || false);
      setConsentValueState(parsedData?.consentValueState || false);
      setOtherUpdatesState(parsedData?.otherUpdatesState || false);
      setOtherState(parsedData?.otherstate || false);
      setBioMetricCheckboxState(parsedData?.bioMetricCheckboxState || false);
    }
  }, [result, currentDropItem]);

  function formatToYYYYMMDD(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formValues,
      updatedOn: value,
      deviceName,
      // manufacturedIn: manufacturedIn,
      automaticUpdatesUntil: automaticValue,
      manualUpdatesUntil: manualValue,
      consentUpdatesUntil: consentValue,
      otherUpdatesUntil: otherValue,
      isPasswordChecked: isPasswordChecked,
      isFactoryDefaultChecked: isFactoryDefaultChecked,
      isUserChangeableChecked: isUserChangeableChecked,
      isUserGeneratedChecked: isUserGeneratedChecked,
      biometricState: biometricState,
      multiFactorState: multiFactorState,
      noControlState: noControlState,
      multipleUserState: multipleUserState,
      // bioMetricCheckbox:bioMetricCheckbox,
      noUserAccountState: noUserAccountState,
      requiredUserAccounts: requiredUserAccounts,
      // multifactorAuthetication:multifactorAuthetication,
      // noControlOverAccess:noControlOverAccess,
      // multipleUserAccounts:multipleUserAccounts,
      vehicleState: vehicleState,
      noSecurityUpdates: noSecurityUpdates,
      manualState: manualState,
      consentValueState: consentValueState,
      otherUpdatesState: otherUpdatesState,
      otherstate: otherstate,
      bioMetricCheckboxState: bioMetricCheckboxState,
      selectedCountry: selectedCountry,
    };
    const pdfPayload = {
      ...formValues,
      updatedOn: formatToYYYYMMDD(value),
      selectedCountry: selectedCountry,
      deviceName,
      securityUpdates: [
        {
          name: "Automatic Updates",
          value: formatToYYYYMMDD(automaticValue),
          label: "Available until at least ",
        },
        {
          name: "Manual Updates",
          value: formatToYYYYMMDD(manualValue),
          label: "Available until at least ",
        },
        {
          name: "Consent Updates",
          value: formatToYYYYMMDD(consentValue),
          label: "Available until at least ",
        },
        {
          name: "Other Updates",
          value: formatToYYYYMMDD(otherValue),
          label: "Available until at least ",
        },
      ],
      accessControls: {
        isPasswordChecked: isPasswordChecked ? "Password" : "",
        isFactoryDefaultChecked: isFactoryDefaultChecked
          ? "Factory Default"
          : "",
        isUserGeneratedChecked: isUserGeneratedChecked ? "User Generated" : "",
        isUserChangeableChecked: isUserChangeableChecked
          ? "User Changeable"
          : "",
        biometricState: biometricState ? "Biometric" : "",
        multiFactorState: multiFactorState ? "Multi-Factor" : "",
        noControlState: noControlState ? "No Control" : "",
        multipleUserState: multipleUserState ? "Multiple User" : "",
        bioMetricCheckboxState: bioMetricCheckboxState ? "Biometric" : "",
        noUserAccountState: noUserAccountState ? "No User Account" : "",
        requiredUserAccounts: requiredUserAccounts
          ? "Required User Account"
          : "",
      },
    };

    localStorage.setItem(currentDropItem, JSON.stringify(payload));

    const getLocalStorage = localStorage.getItem("pdfData");

    const parsedData =
      typeof window !== undefined && getLocalStorage
        ? JSON.parse(getLocalStorage)
        : {};

    const updatedData = {
      ...parsedData,
      ...pdfPayload,
    };

    localStorage.setItem("pdfData", JSON.stringify(updatedData));

    setCheckDeviceName(true);

    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <p>Device Information</p>
          <div className="border-line"></div>
          <h5>Additional notes:</h5>
          <ul class="list-disc ">
            <li>
              By default, all the fields in this section are shown as “Not
              disclosed.”
            </li>
          </ul>
          <div className="field-wrapper">
            <div className="form-group">
              <label className="label-text" for="deviceName">
                Manufracture
              </label>
              <input
                value={formValues.manufacturedIn}
                onChange={formChangeHandler}
                placeholder="Casa"
                type="text"
                id="deviceName"
                name="manufacturedIn"
              />
            </div>
            <div className="form-group">
              <label className="label-text" for="deviceName">
                Device Name
              </label>
              <input
                value={deviceName}
                onChange={handleChangeValue}
                placeholder="Smart Camera Device"
                type="text"
              />
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group">
              <label className="label-text" for="deviceName">
                Model Number
              </label>
              <input
                value={formValues.modelNumber}
                onChange={formChangeHandler}
                placeholder="1234"
                type="text"
                name="modelNumber"
              />
            </div>
            <div className="form-group">
              <label className="label-text" for="deviceName">
                Firmware version
              </label>
              <input
                value={formValues.firmwareVersion}
                onChange={formChangeHandler}
                placeholder="2.5.1"
                type="text"
                id="deviceName"
                name="firmwareVersion"
              />
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group">
              <label className="label-text" for="deviceName">
                Updated on
              </label>
              <input
                type="text"
                value={value?.toLocaleDateString()} // Display selected date
                readOnly
                onClick={toggleCalendar} // Toggle calendar on click
                placeholder="Select a date"
              />
              {showCalendar && (
                <div className="calendar-wrapper">
                  <Calendar onChange={handleDateChange} value={value} />
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="label-text" for="deviceName">
                Manufracture
              </label>
              <select
                id="grid-manufactured-in"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                <option value="Afghanistan" data-v-7c1b719a="">
                  Afghanistan
                </option>
                <option value="Albania" data-v-7c1b719a="">
                  Albania
                </option>
                <option value="Algeria" data-v-7c1b719a="">
                  Algeria
                </option>
                <option value="American Samoa" data-v-7c1b719a="">
                  American Samoa
                </option>
                <option value="Andorra" data-v-7c1b719a="">
                  Andorra
                </option>
                <option value="Angola" data-v-7c1b719a="">
                  Angola
                </option>
                <option value="Anguilla" data-v-7c1b719a="">
                  Anguilla
                </option>
                <option value="Antarctica" data-v-7c1b719a="">
                  Antarctica
                </option>
                <option value="Antigua and Barbuda" data-v-7c1b719a="">
                  Antigua and Barbuda
                </option>
                <option value="Argentina" data-v-7c1b719a="">
                  Argentina
                </option>
                <option value="Armenia" data-v-7c1b719a="">
                  Armenia
                </option>
                <option value="Aruba" data-v-7c1b719a="">
                  Aruba
                </option>
                <option value="Australia" data-v-7c1b719a="">
                  Australia
                </option>
                <option value="Austria" data-v-7c1b719a="">
                  Austria
                </option>
                <option value="Azerbaijan" data-v-7c1b719a="">
                  Azerbaijan
                </option>
                <option value="Bahamas" data-v-7c1b719a="">
                  Bahamas
                </option>
                <option value="Bahrain" data-v-7c1b719a="">
                  Bahrain
                </option>
                <option value="Bangladesh" data-v-7c1b719a="">
                  Bangladesh
                </option>
                <option value="Barbados" data-v-7c1b719a="">
                  Barbados
                </option>
                <option value="Belarus" data-v-7c1b719a="">
                  Belarus
                </option>
                <option value="Belgium" data-v-7c1b719a="">
                  Belgium
                </option>
                <option value="Belize" data-v-7c1b719a="">
                  Belize
                </option>
                <option value="Benin" data-v-7c1b719a="">
                  Benin
                </option>
                <option value="Bermuda" data-v-7c1b719a="">
                  Bermuda
                </option>
                <option value="Bhutan" data-v-7c1b719a="">
                  Bhutan
                </option>
                <option value="Bolivia" data-v-7c1b719a="">
                  Bolivia
                </option>
                <option value="Bosnia and Herzegovina" data-v-7c1b719a="">
                  Bosnia and Herzegovina
                </option>
                <option value="Botswana" data-v-7c1b719a="">
                  Botswana
                </option>
                <option value="Bouvet Island" data-v-7c1b719a="">
                  Bouvet Island
                </option>
                <option value="Brazil" data-v-7c1b719a="">
                  Brazil
                </option>
                <option
                  value="British Indian Ocean Territory"
                  data-v-7c1b719a=""
                >
                  British Indian Ocean Territory
                </option>
                <option value="Brunei" data-v-7c1b719a="">
                  Brunei
                </option>
                <option value="Bulgaria" data-v-7c1b719a="">
                  Bulgaria
                </option>
                <option value="Burkina Faso" data-v-7c1b719a="">
                  Burkina Faso
                </option>
                <option value="Burundi" data-v-7c1b719a="">
                  Burundi
                </option>
                <option value="Cambodia" data-v-7c1b719a="">
                  Cambodia
                </option>
                <option value="Cameroon" data-v-7c1b719a="">
                  Cameroon
                </option>
                <option value="Canada" data-v-7c1b719a="">
                  Canada
                </option>
                <option value="Cape Verde" data-v-7c1b719a="">
                  Cape Verde
                </option>
                <option value="Cayman Islands" data-v-7c1b719a="">
                  Cayman Islands
                </option>
                <option value="Central African Republic" data-v-7c1b719a="">
                  Central African Republic
                </option>
                <option value="Chad" data-v-7c1b719a="">
                  Chad
                </option>
                <option value="Chile" data-v-7c1b719a="">
                  Chile
                </option>
                <option value="China" data-v-7c1b719a="">
                  China
                </option>
                <option value="Christmas Island" data-v-7c1b719a="">
                  Christmas Island
                </option>
                <option value="Cocos (Keeling) Islands" data-v-7c1b719a="">
                  Cocos (Keeling) Islands
                </option>
                <option value="Colombia" data-v-7c1b719a="">
                  Colombia
                </option>
                <option value="Comoros" data-v-7c1b719a="">
                  Comoros
                </option>
                <option value="Congo" data-v-7c1b719a="">
                  Congo
                </option>
                <option
                  value="The Democratic Republic of Congo"
                  data-v-7c1b719a=""
                >
                  The Democratic Republic of Congo
                </option>
                <option value="Cook Islands" data-v-7c1b719a="">
                  Cook Islands
                </option>
                <option value="Costa Rica" data-v-7c1b719a="">
                  Costa Rica
                </option>
                <option value="Ivory Coast" data-v-7c1b719a="">
                  Ivory Coast
                </option>
                <option value="Croatia" data-v-7c1b719a="">
                  Croatia
                </option>
                <option value="Cuba" data-v-7c1b719a="">
                  Cuba
                </option>
                <option value="Cyprus" data-v-7c1b719a="">
                  Cyprus
                </option>
                <option value="Czech Republic" data-v-7c1b719a="">
                  Czech Republic
                </option>
                <option value="Denmark" data-v-7c1b719a="">
                  Denmark
                </option>
                <option value="Djibouti" data-v-7c1b719a="">
                  Djibouti
                </option>
                <option value="Dominica" data-v-7c1b719a="">
                  Dominica
                </option>
                <option value="Dominican Republic" data-v-7c1b719a="">
                  Dominican Republic
                </option>
                <option value="East Timor" data-v-7c1b719a="">
                  East Timor
                </option>
                <option value="Ecuador" data-v-7c1b719a="">
                  Ecuador
                </option>
                <option value="Egypt" data-v-7c1b719a="">
                  Egypt
                </option>
                <option value="England" data-v-7c1b719a="">
                  England
                </option>
                <option value="El Salvador" data-v-7c1b719a="">
                  El Salvador
                </option>
                <option value="Equatorial Guinea" data-v-7c1b719a="">
                  Equatorial Guinea
                </option>
                <option value="Eritrea" data-v-7c1b719a="">
                  Eritrea
                </option>
                <option value="Estonia" data-v-7c1b719a="">
                  Estonia
                </option>
                <option value="Ethiopia" data-v-7c1b719a="">
                  Ethiopia
                </option>
                <option value="Falkland Islands" data-v-7c1b719a="">
                  Falkland Islands
                </option>
                <option value="Faroe Islands" data-v-7c1b719a="">
                  Faroe Islands
                </option>
                <option value="Fiji Islands" data-v-7c1b719a="">
                  Fiji Islands
                </option>
                <option value="Finland" data-v-7c1b719a="">
                  Finland
                </option>
                <option value="France" data-v-7c1b719a="">
                  France
                </option>
                <option value="French Guiana" data-v-7c1b719a="">
                  French Guiana
                </option>
                <option value="French Polynesia" data-v-7c1b719a="">
                  French Polynesia
                </option>
                <option value="French Southern territories" data-v-7c1b719a="">
                  French Southern territories
                </option>
                <option value="Gabon" data-v-7c1b719a="">
                  Gabon
                </option>
                <option value="Gambia" data-v-7c1b719a="">
                  Gambia
                </option>
                <option value="Georgia" data-v-7c1b719a="">
                  Georgia
                </option>
                <option value="Germany" data-v-7c1b719a="">
                  Germany
                </option>
                <option value="Ghana" data-v-7c1b719a="">
                  Ghana
                </option>
                <option value="Gibraltar" data-v-7c1b719a="">
                  Gibraltar
                </option>
                <option value="Greece" data-v-7c1b719a="">
                  Greece
                </option>
                <option value="Greenland" data-v-7c1b719a="">
                  Greenland
                </option>
                <option value="Grenada" data-v-7c1b719a="">
                  Grenada
                </option>
                <option value="Guadeloupe" data-v-7c1b719a="">
                  Guadeloupe
                </option>
                <option value="Guam" data-v-7c1b719a="">
                  Guam
                </option>
                <option value="Guatemala" data-v-7c1b719a="">
                  Guatemala
                </option>
                <option value="Guernsey" data-v-7c1b719a="">
                  Guernsey
                </option>
                <option value="Guinea" data-v-7c1b719a="">
                  Guinea
                </option>
                <option value="Guinea-Bissau" data-v-7c1b719a="">
                  Guinea-Bissau
                </option>
                <option value="Guyana" data-v-7c1b719a="">
                  Guyana
                </option>
                <option value="Haiti" data-v-7c1b719a="">
                  Haiti
                </option>
                <option
                  value="Heard Island and McDonald Islands"
                  data-v-7c1b719a=""
                >
                  Heard Island and McDonald Islands
                </option>
                <option
                  value="Holy See (Vatican City State)"
                  data-v-7c1b719a=""
                >
                  Holy See (Vatican City State)
                </option>
                <option value="Honduras" data-v-7c1b719a="">
                  Honduras
                </option>
                <option value="Hong Kong" data-v-7c1b719a="">
                  Hong Kong
                </option>
                <option value="Hungary" data-v-7c1b719a="">
                  Hungary
                </option>
                <option value="Iceland" data-v-7c1b719a="">
                  Iceland
                </option>
                <option value="India" data-v-7c1b719a="">
                  India
                </option>
                <option value="Indonesia" data-v-7c1b719a="">
                  Indonesia
                </option>
                <option value="Iran" data-v-7c1b719a="">
                  Iran
                </option>
                <option value="Iraq" data-v-7c1b719a="">
                  Iraq
                </option>
                <option value="Ireland" data-v-7c1b719a="">
                  Ireland
                </option>
                <option value="Israel" data-v-7c1b719a="">
                  Israel
                </option>
                <option value="Isle of Man" data-v-7c1b719a="">
                  Isle of Man
                </option>
                <option value="Italy" data-v-7c1b719a="">
                  Italy
                </option>
                <option value="Jamaica" data-v-7c1b719a="">
                  Jamaica
                </option>
                <option value="Japan" data-v-7c1b719a="">
                  Japan
                </option>
                <option value="Jersey" data-v-7c1b719a="">
                  Jersey
                </option>
                <option value="Jordan" data-v-7c1b719a="">
                  Jordan
                </option>
                <option value="Kazakhstan" data-v-7c1b719a="">
                  Kazakhstan
                </option>
                <option value="Kenya" data-v-7c1b719a="">
                  Kenya
                </option>
                <option value="Kiribati" data-v-7c1b719a="">
                  Kiribati
                </option>
                <option value="Kuwait" data-v-7c1b719a="">
                  Kuwait
                </option>
                <option value="Kyrgyzstan" data-v-7c1b719a="">
                  Kyrgyzstan
                </option>
                <option value="Laos" data-v-7c1b719a="">
                  Laos
                </option>
                <option value="Latvia" data-v-7c1b719a="">
                  Latvia
                </option>
                <option value="Lebanon" data-v-7c1b719a="">
                  Lebanon
                </option>
                <option value="Lesotho" data-v-7c1b719a="">
                  Lesotho
                </option>
                <option value="Liberia" data-v-7c1b719a="">
                  Liberia
                </option>
                <option value="Libyan Arab Jamahiriya" data-v-7c1b719a="">
                  Libyan Arab Jamahiriya
                </option>
                <option value="Liechtenstein" data-v-7c1b719a="">
                  Liechtenstein
                </option>
                <option value="Lithuania" data-v-7c1b719a="">
                  Lithuania
                </option>
                <option value="Luxembourg" data-v-7c1b719a="">
                  Luxembourg
                </option>
                <option value="Macao" data-v-7c1b719a="">
                  Macao
                </option>
                <option value="North Macedonia" data-v-7c1b719a="">
                  North Macedonia
                </option>
                <option value="Madagascar" data-v-7c1b719a="">
                  Madagascar
                </option>
                <option value="Malawi" data-v-7c1b719a="">
                  Malawi
                </option>
                <option value="Malaysia" data-v-7c1b719a="">
                  Malaysia
                </option>
                <option value="Maldives" data-v-7c1b719a="">
                  Maldives
                </option>
                <option value="Mali" data-v-7c1b719a="">
                  Mali
                </option>
                <option value="Malta" data-v-7c1b719a="">
                  Malta
                </option>
                <option value="Marshall Islands" data-v-7c1b719a="">
                  Marshall Islands
                </option>
                <option value="Martinique" data-v-7c1b719a="">
                  Martinique
                </option>
                <option value="Mauritania" data-v-7c1b719a="">
                  Mauritania
                </option>
                <option value="Mauritius" data-v-7c1b719a="">
                  Mauritius
                </option>
                <option value="Mayotte" data-v-7c1b719a="">
                  Mayotte
                </option>
                <option value="Mexico" data-v-7c1b719a="">
                  Mexico
                </option>
                <option
                  value="Micronesia, Federated States of"
                  data-v-7c1b719a=""
                >
                  Micronesia, Federated States of
                </option>
                <option value="Moldova" data-v-7c1b719a="">
                  Moldova
                </option>
                <option value="Monaco" data-v-7c1b719a="">
                  Monaco
                </option>
                <option value="Mongolia" data-v-7c1b719a="">
                  Mongolia
                </option>
                <option value="Montserrat" data-v-7c1b719a="">
                  Montserrat
                </option>
                <option value="Montenegro" data-v-7c1b719a="">
                  Montenegro
                </option>
                <option value="Morocco" data-v-7c1b719a="">
                  Morocco
                </option>
                <option value="Mozambique" data-v-7c1b719a="">
                  Mozambique
                </option>
                <option value="Myanmar" data-v-7c1b719a="">
                  Myanmar
                </option>
                <option value="Namibia" data-v-7c1b719a="">
                  Namibia
                </option>
                <option value="Nauru" data-v-7c1b719a="">
                  Nauru
                </option>
                <option value="Nepal" data-v-7c1b719a="">
                  Nepal
                </option>
                <option value="Netherlands" data-v-7c1b719a="">
                  Netherlands
                </option>
                <option value="Netherlands Antilles" data-v-7c1b719a="">
                  Netherlands Antilles
                </option>
                <option value="New Caledonia" data-v-7c1b719a="">
                  New Caledonia
                </option>
                <option value="New Zealand" data-v-7c1b719a="">
                  New Zealand
                </option>
                <option value="Nicaragua" data-v-7c1b719a="">
                  Nicaragua
                </option>
                <option value="Niger" data-v-7c1b719a="">
                  Niger
                </option>
                <option value="Nigeria" data-v-7c1b719a="">
                  Nigeria
                </option>
                <option value="Niue" data-v-7c1b719a="">
                  Niue
                </option>
                <option value="Norfolk Island" data-v-7c1b719a="">
                  Norfolk Island
                </option>
                <option value="North Korea" data-v-7c1b719a="">
                  North Korea
                </option>
                <option value="Northern Ireland" data-v-7c1b719a="">
                  Northern Ireland
                </option>
                <option value="Northern Mariana Islands" data-v-7c1b719a="">
                  Northern Mariana Islands
                </option>
                <option value="Norway" data-v-7c1b719a="">
                  Norway
                </option>
                <option value="Oman" data-v-7c1b719a="">
                  Oman
                </option>
                <option value="Pakistan" data-v-7c1b719a="">
                  Pakistan
                </option>
                <option value="Palau" data-v-7c1b719a="">
                  Palau
                </option>
                <option value="Palestine" data-v-7c1b719a="">
                  Palestine
                </option>
                <option value="Panama" data-v-7c1b719a="">
                  Panama
                </option>
                <option value="Papua New Guinea" data-v-7c1b719a="">
                  Papua New Guinea
                </option>
                <option value="Paraguay" data-v-7c1b719a="">
                  Paraguay
                </option>
                <option value="Peru" data-v-7c1b719a="">
                  Peru
                </option>
                <option value="Philippines" data-v-7c1b719a="">
                  Philippines
                </option>
                <option value="Pitcairn" data-v-7c1b719a="">
                  Pitcairn
                </option>
                <option value="Poland" data-v-7c1b719a="">
                  Poland
                </option>
                <option value="Portugal" data-v-7c1b719a="">
                  Portugal
                </option>
                <option value="Puerto Rico" data-v-7c1b719a="">
                  Puerto Rico
                </option>
                <option value="Qatar" data-v-7c1b719a="">
                  Qatar
                </option>
                <option value="Reunion" data-v-7c1b719a="">
                  Reunion
                </option>
                <option value="Romania" data-v-7c1b719a="">
                  Romania
                </option>
                <option value="Russian Federation" data-v-7c1b719a="">
                  Russian Federation
                </option>
                <option value="Rwanda" data-v-7c1b719a="">
                  Rwanda
                </option>
                <option value="Saint Helena" data-v-7c1b719a="">
                  Saint Helena
                </option>
                <option value="Saint Kitts and Nevis" data-v-7c1b719a="">
                  Saint Kitts and Nevis
                </option>
                <option value="Saint Lucia" data-v-7c1b719a="">
                  Saint Lucia
                </option>
                <option value="Saint Pierre and Miquelon" data-v-7c1b719a="">
                  Saint Pierre and Miquelon
                </option>
                <option
                  value="Saint Vincent and the Grenadines"
                  data-v-7c1b719a=""
                >
                  Saint Vincent and the Grenadines
                </option>
                <option value="Samoa" data-v-7c1b719a="">
                  Samoa
                </option>
                <option value="San Marino" data-v-7c1b719a="">
                  San Marino
                </option>
                <option value="Sao Tome and Principe" data-v-7c1b719a="">
                  Sao Tome and Principe
                </option>
                <option value="Saudi Arabia" data-v-7c1b719a="">
                  Saudi Arabia
                </option>
                <option value="Scotland" data-v-7c1b719a="">
                  Scotland
                </option>
                <option value="Senegal" data-v-7c1b719a="">
                  Senegal
                </option>
                <option value="Serbia" data-v-7c1b719a="">
                  Serbia
                </option>
                <option value="Seychelles" data-v-7c1b719a="">
                  Seychelles
                </option>
                <option value="Sierra Leone" data-v-7c1b719a="">
                  Sierra Leone
                </option>
                <option value="Singapore" data-v-7c1b719a="">
                  Singapore
                </option>
                <option value="Slovakia" data-v-7c1b719a="">
                  Slovakia
                </option>
                <option value="Slovenia" data-v-7c1b719a="">
                  Slovenia
                </option>
                <option value="Solomon Islands" data-v-7c1b719a="">
                  Solomon Islands
                </option>
                <option value="Somalia" data-v-7c1b719a="">
                  Somalia
                </option>
                <option value="South Africa" data-v-7c1b719a="">
                  South Africa
                </option>
                <option
                  value="South Georgia and the South Sandwich Islands"
                  data-v-7c1b719a=""
                >
                  South Georgia and the South Sandwich Islands
                </option>
                <option value="South Korea" data-v-7c1b719a="">
                  South Korea
                </option>
                <option value="South Sudan" data-v-7c1b719a="">
                  South Sudan
                </option>
                <option value="Spain" data-v-7c1b719a="">
                  Spain
                </option>
                <option value="SriLanka" data-v-7c1b719a="">
                  SriLanka
                </option>
                <option value="Sudan" data-v-7c1b719a="">
                  Sudan
                </option>
                <option value="Suriname" data-v-7c1b719a="">
                  Suriname
                </option>
                <option value="Svalbard and Jan Mayen" data-v-7c1b719a="">
                  Svalbard and Jan Mayen
                </option>
                <option value="Swaziland" data-v-7c1b719a="">
                  Swaziland
                </option>
                <option value="Sweden" data-v-7c1b719a="">
                  Sweden
                </option>
                <option value="Switzerland" data-v-7c1b719a="">
                  Switzerland
                </option>
                <option value="Syria" data-v-7c1b719a="">
                  Syria
                </option>
                <option value="Tajikistan" data-v-7c1b719a="">
                  Tajikistan
                </option>
                <option value="Tanzania" data-v-7c1b719a="">
                  Tanzania
                </option>
                <option value="Thailand" data-v-7c1b719a="">
                  Thailand
                </option>
                <option value="Timor-Leste" data-v-7c1b719a="">
                  Timor-Leste
                </option>
                <option value="Togo" data-v-7c1b719a="">
                  Togo
                </option>
                <option value="Tokelau" data-v-7c1b719a="">
                  Tokelau
                </option>
                <option value="Tonga" data-v-7c1b719a="">
                  Tonga
                </option>
                <option value="Trinidad and Tobago" data-v-7c1b719a="">
                  Trinidad and Tobago
                </option>
                <option value="Tunisia" data-v-7c1b719a="">
                  Tunisia
                </option>
                <option value="Turkey" data-v-7c1b719a="">
                  Turkey
                </option>
                <option value="Turkmenistan" data-v-7c1b719a="">
                  Turkmenistan
                </option>
                <option value="Turks and Caicos Islands" data-v-7c1b719a="">
                  Turks and Caicos Islands
                </option>
                <option value="Tuvalu" data-v-7c1b719a="">
                  Tuvalu
                </option>
                <option value="Uganda" data-v-7c1b719a="">
                  Uganda
                </option>
                <option value="Ukraine" data-v-7c1b719a="">
                  Ukraine
                </option>
                <option value="United Arab Emirates" data-v-7c1b719a="">
                  United Arab Emirates
                </option>
                <option value="United Kingdom" data-v-7c1b719a="">
                  United Kingdom
                </option>
                <option value="United States" data-v-7c1b719a="">
                  United States
                </option>
                <option
                  value="United States Minor Outlying Islands"
                  data-v-7c1b719a=""
                >
                  United States Minor Outlying Islands
                </option>
                <option value="Uruguay" data-v-7c1b719a="">
                  Uruguay
                </option>
                <option value="Uzbekistan" data-v-7c1b719a="">
                  Uzbekistan
                </option>
                <option value="Vanuatu" data-v-7c1b719a="">
                  Vanuatu
                </option>
                <option value="Venezuela" data-v-7c1b719a="">
                  Venezuela
                </option>
                <option value="Vietnam" data-v-7c1b719a="">
                  Vietnam
                </option>
                <option value="Virgin Islands, British" data-v-7c1b719a="">
                  Virgin Islands, British
                </option>
                <option value="Virgin Islands, U.S." data-v-7c1b719a="">
                  Virgin Islands, U.S.
                </option>
                <option value="Wales" data-v-7c1b719a="">
                  Wales
                </option>
                <option value="Wallis and Futuna" data-v-7c1b719a="">
                  Wallis and Futuna
                </option>
                <option value="Western Sahara" data-v-7c1b719a="">
                  Western Sahara
                </option>
                <option value="Yemen" data-v-7c1b719a="">
                  Yemen
                </option>
                <option value="Yugoslavia" data-v-7c1b719a="">
                  Yugoslavia
                </option>
                <option value="Zambia" data-v-7c1b719a="">
                  Zambia
                </option>
                <option value="Zimbabwe" data-v-7c1b719a="">
                  Zimbabwe
                </option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "10px", color: "#4a5568" }}>
            Security updates
          </div>

          <div className="field-wrapper">
            <div className="form-group">
              <div className="checkbox-lablel">
                <input
                  checked={vehicleState}
                  onChange={(e) => setVehicleState(e.target.checked)}
                  type="checkbox"
                  id="vehicle1"
                  className="custom-checkbox"
                  name="vehicle"
                />
                <label className="label-text" for="deviceName">
                  AUTOMACTIC UNTILL
                </label>
              </div>
              <input
                type="text"
                value={automaticValue?.toLocaleDateString()} // Display selected date
                readOnly
                onClick={toggleAutomaticUpdateCalendar} // Toggle calendar on click
                // placeholder='Select a date'
              />
              {automaticUpdatesCalender && (
                <div className="calendar-wrapper">
                  <Calendar
                    onChange={handleAutomaticDateChange}
                    value={automaticValue}
                  />
                </div>
              )}
            </div>
            <div className="form-group">
              <div className="checkbox-lablel">
                <input
                  checked={manualState}
                  onChange={(e) => setManualState(e.target.checked)}
                  type="checkbox"
                  id="vehicle1"
                  className="custom-checkbox"
                  name="manualUpdatesUntil"
                />
                <label className="label-text" for="deviceName">
                  MANUAL UNTILL
                </label>
              </div>
              <input
                type="text"
                value={manualValue?.toLocaleDateString()} // Display selected date
                readOnly
                onClick={toggleManualUpdateCalendar} // Toggle calendar on click
                // placeholder='Select a date'
              />
              {manualUpdatesCalender && (
                <div className="calendar-wrapper">
                  <Calendar
                    onChange={handleManualDateChange}
                    value={manualValue}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="field-wrapper">
            <div className="form-group">
              <div className="checkbox-lablel">
                <input
                  checked={consentValueState}
                  onChange={(e) => setConsentValueState(e.target.checked)}
                  type="checkbox"
                  id="vehicle1"
                  className="custom-checkbox"
                  name="consentUpdatesUntil"
                />
                <label className="label-text" for="deviceName">
                  CONSENT UNTILL
                </label>
              </div>
              <input
                type="text"
                value={consentValue?.toLocaleDateString()} // Display selected date
                readOnly
                onClick={toggleConsentUpdateCalendar} // Toggle calendar on click
                // placeholder='Select a date'
              />
              {consentUpdateCalnedar && (
                <div className="calendar-wrapper">
                  <Calendar
                    onChange={handleConsentDateChange}
                    value={consentValue}
                  />
                </div>
              )}
            </div>
            <div className="form-group">
              <div className="checkbox-lablel">
                <input
                  type="checkbox"
                  checked={otherUpdatesState}
                  onChange={(e) => setOtherUpdatesState(e.target.checked)}
                  id="vehicle1"
                  className="custom-checkbox"
                  name="otherUpdatesUntil"
                />
                <label className="label-text" for="deviceName">
                  OTHER UNTILL
                </label>
              </div>
              <input
                type="text"
                value={otherValue?.toLocaleDateString()} // Display selected date
                readOnly
                onClick={toggleOtherUpdateCalendar} // Toggle calendar on click
                // placeholder='Select a date'
              />
              {otherUpdateCalnedar && (
                <div className="calendar-wrapper">
                  <Calendar
                    onChange={handleOtherDateChange}
                    value={otherValue}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="checkbox-lablel" style={{ marginTop: "20px" }}>
            <input
              checked={noSecurityUpdates}
              onChange={(e) => setNoSecurityUpdates(e.target.checked)}
              type="checkbox"
              className="custom-checkbox"
              name="noSecurityUpdates"
            />
            <label className="label-text" for="deviceName">
              NO SECURITY UPDATES
            </label>
          </div>

          <div className="field-wrapper">
            <div className="form-group sensor-wrapper ">
              <label className="label-text" for="deviceName">
                Additional Information (optional)
              </label>
              <textarea
                rows={3}
                cols={39}
                onChange={formChangeHandler}
                value={formValues.securityAdditionalInformation}
                type="text"
                id="deviceName"
                name="securityAdditionalInformation"
              />
            </div>
          </div>
          <div style={{ marginTop: "10px", color: "#4a5568" }}>
            Access Control
          </div>
          <div className="checkbox-group">
            <div className="checkbox-lablel" style={{ marginTop: "20px" }}>
              <input
                type="checkbox"
                id="password"
                className="custom-checkbox"
                checked={isPasswordChecked}
                onChange={() => setPasswordChecked(!isPasswordChecked)}
              />
              <label className="label-text" htmlFor="password">
                Password
              </label>
            </div>

            {/* Conditionally render child checkboxes if Password is checked */}
            {isPasswordChecked && (
              <div style={{ marginLeft: "20px", marginTop: "30px" }}>
                <div
                  className="checkbox-group"
                  style={{ display: "flex", gap: 10 }}
                >
                  <input
                    type="checkbox"
                    id="factory-default"
                    className="custom-checkbox"
                    checked={isFactoryDefaultChecked}
                    onChange={() =>
                      setFactoryDefaultChecked(!isFactoryDefaultChecked)
                    }
                  />
                  <label className="label-text" htmlFor="factory-default">
                    Factory Default
                  </label>
                </div>

                {/* Conditionally render User Changeable checkbox if Factory Default is checked */}
                {isFactoryDefaultChecked && (
                  <div
                    className="checkbox-lablel"
                    style={{ marginLeft: "20px", marginTop: "30px" }}
                  >
                    <input
                      type="checkbox"
                      id="user-changeable"
                      className="custom-checkbox"
                      checked={isUserChangeableChecked}
                      onChange={() =>
                        setUserChangeableChecked(!isUserChangeableChecked)
                      }
                    />
                    <label className="label-text" htmlFor="user-changeable">
                      User Changeable
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* User Generated Checkbox */}
            {isPasswordChecked && (
              <div
                className="checkbox-lablel"
                style={{ marginLeft: "20px", marginTop: "30px" }}
              >
                <input
                  type="checkbox"
                  id="user-generated"
                  className="custom-checkbox"
                  checked={isUserGeneratedChecked}
                  onChange={() =>
                    setUserGeneratedChecked(!isUserGeneratedChecked)
                  }
                />
                <label className="label-text" htmlFor="user-generated">
                  User Generated
                </label>
              </div>
            )}
          </div>
          <div className="checkbox-lablel" style={{ marginTop: "20px" }}>
            <input
              checked={biometricState}
              onChange={(e) => setBiometricState(e.target.checked)}
              type="checkbox"
              id="vehicle1"
              className="custom-checkbox"
              name="Biometric"
            />
            <label className="label-text" for="deviceName">
              Biometric
            </label>
          </div>
          <div className="checkbox-lablel" style={{ marginTop: "20px" }}>
            <input
              checked={multiFactorState}
              onChange={(e) => setMultiFactorState(e.target.checked)}
              type="checkbox"
              id="vehicle1"
              className="custom-checkbox"
              name="multifactorAuthetication"
            />
            <label className="label-text" for="deviceName">
              Multi-factor authentication
            </label>
          </div>
          <div className="checkbox-lablel" style={{ marginTop: "20px" }}>
            <input
              checked={noControlState}
              onChange={(e) => setNoControlState(e.target.checked)}
              type="checkbox"
              id="vehicle1"
              className="custom-checkbox"
              name="noControlOverAccess"
            />
            <label className="label-text" for="deviceName">
              No control over access
            </label>
          </div>
          <div className="checkbox-lablel" style={{ marginTop: "20px" }}>
            <input
              checked={multipleUserState}
              onChange={(e) => setMultipleUserState(e.target.checked)}
              type="checkbox"
              id="vehicle1"
              className="custom-checkbox"
              name="multipleUserAccounts"
            />
            <label className="label-text" for="deviceName">
              Multiple user accounts
            </label>
          </div>
          <div className="checkbox-lablel" style={{ marginTop: "20px" }}>
            <input
              checked={requiredUserAccounts}
              onChange={(e) => setRequiredUserAccounts(e.target.checked)}
              type="checkbox"
              id="vehicle1"
              className="custom-checkbox"
              name="requiredUserAccounts"
            />
            <label className="label-text" for="requiredUserAccounts">
              Required user account
            </label>
          </div>
          <div className="checkbox-lablel" style={{ marginTop: "20px" }}>
            <input
              checked={noUserAccountState}
              onChange={(e) => setNoUserAccountState(e.target.checked)}
              type="checkbox"
              id="vehicle1"
              className="custom-checkbox"
              name="noUserAccounts"
            />
            <label className="label-text" for="noUserAccounts">
              No user accounts
            </label>
          </div>
          <div className="checkbox-lablel" style={{ marginTop: "20px" }}>
            <input
              checked={otherstate}
              onChange={(e) => setOtherState(e.target.checked)}
              type="checkbox"
              id="vehicle1"
              className="custom-checkbox"
              name="otherUpdates"
            />
            <label className="label-text" for="otherUpdates">
              Other
            </label>
          </div>
          <div className="checkbox-lablel" style={{ marginTop: "20px" }}>
            <input
              checked={bioMetricCheckboxState}
              onChange={() =>
                setBioMetricCheckboxState(!bioMetricCheckboxState)
              }
              type="checkbox"
              id="vehicle1"
              className="custom-checkbox"
              name="bioMetricCheckbox"
            />
            <label className="label-text" for="deviceName">
              Biometric
            </label>
          </div>
          <div className="field-wrapper">
            <div className="form-group sensor-wrapper">
              <label
                className="label-text"
                for="bioMetricAdditionalInformation"
              >
                Additional Information (optional)
              </label>
              <textarea
                value={formValues.bioMetricAdditionalInformation}
                onChange={formChangeHandler}
                rows={3}
                cols={39}
                type="text"
                name="bioMetricAdditionalInformation"
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

export default DeviceForm;
