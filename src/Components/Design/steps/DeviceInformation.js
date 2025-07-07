"use client";

const DeviceInformation = ({ formData, updateFormData }) => {
  const countries = [
    "United States",
    "China",
    "Germany",
    "Japan",
    "South Korea",
    "Taiwan",
    "United Kingdom",
    "Canada",
    "France",
    "Italy",
    "Other",
  ];

  return (
    <div className="step-content">
      <h2 className="step-title">Device Information</h2>

      {/* <div className="additional-notes">
        <h3>Additional notes:</h3>
        <ul>
          <li>
            By default, all the fields in this section are shown as "Not
            disclosed."
          </li>
        </ul>
      </div> */}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input
            id="manufacturer"
            type="text"
            placeholder="Casa"
            value={formData.manufacturer || ""}
            onChange={(e) =>
              updateFormData("deviceInfo", "manufacturer", e.target.value)
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="deviceName">Device name</label>
          <input
            id="deviceName"
            type="text"
            placeholder="Smart Security Camera"
            value={formData.deviceName || ""}
            onChange={(e) =>
              updateFormData("deviceInfo", "deviceName", e.target.value)
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="modelNumber">Model number</label>
          <input
            id="modelNumber"
            type="text"
            placeholder="N200"
            value={formData.modelNumber || ""}
            onChange={(e) =>
              updateFormData("deviceInfo", "modelNumber", e.target.value)
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="firmwareVersion">Firmware version</label>
          <input
            id="firmwareVersion"
            type="text"
            placeholder="2.5.1"
            value={formData.firmwareVersion || ""}
            onChange={(e) =>
              updateFormData("deviceInfo", "firmwareVersion", e.target.value)
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="updatedOn">Updated on</label>
          <input
            id="updatedOn"
            type="date"
            value={formData.updatedOn || ""}
            onChange={(e) =>
              updateFormData("deviceInfo", "updatedOn", e.target.value)
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="manufacturedIn">Manufactured in</label>
          <select
            id="manufacturedIn"
            value={formData.manufacturedIn || ""}
            onChange={(e) =>
              updateFormData("deviceInfo", "manufacturedIn", e.target.value)
            }
            className="form-select"
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DeviceInformation;
