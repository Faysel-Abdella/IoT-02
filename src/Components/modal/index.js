import React from 'react';
import './index.css'; // For custom styling
import DeviceForm from './components/deviceForm';
import SensorForm from './components/sensorForm';
import StorageForm from './components/storageForm';

const Modal = ({ isOpen, onClose, currentDropItem,setCheckDeviceName,setToggleState }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  // Define the device, sensor, and storage prefixes
  const devicePrefixes = ["camera", "lamp", "lock", "Vacuum", "video", "SmartWatch", "Smartphone"];
  const sensorPrefixes = ["temperature1", "humidity1", "light1", "proximity1", "laser1", "camera1", "voice1", "GPS1", "ultrasonic1"];
  const storagePrefixes = ["localstorage", "cloud"];

  // Determine if the currentDropItem matches a prefix from any list
  const matchDevice = devicePrefixes.find(prefix => currentDropItem.startsWith(prefix));
  const matchSensor = sensorPrefixes.find(prefix => currentDropItem.startsWith(prefix));
  const matchStorage = storagePrefixes.find(prefix => currentDropItem.startsWith(prefix));

  // Capitalize the prefix of the matched item for display
  const capitalizeFirstLetter = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  };

  const result = capitalizeFirstLetter(matchDevice);
  const resultSensor = capitalizeFirstLetter(matchSensor);
  const storageResult = capitalizeFirstLetter(matchStorage);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          {matchSensor?.length > 0 ?  <SensorForm setToggleState={setToggleState} currentDropItem={currentDropItem}  result={resultSensor} onClose={onClose} /> : matchDevice?.length> 0 ? <DeviceForm currentDropItem={currentDropItem} matchDevice={matchDevice} onClose={onClose} result={result} setCheckDeviceName={setCheckDeviceName}/> :
          matchStorage?.length > 0 ? <StorageForm currentDropItem={currentDropItem} result={storageResult} onClose={onClose}/> : null
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;
