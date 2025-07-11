import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import "react-responsive-modal/styles.css";

import "./HomePage.css";
import "./SensorGrid.css";
import {
  FaChevronDown,
  FaChevronRight,
  // FaDownload,
  // FaFilePdf,
} from "react-icons/fa";

// --- All image imports ---
import userImg from "./Images/users/user.png";
import ControllerImg from "./Images/users/Controller.png";
import DataprocessorImg from "./Images/users/Dataprocessor.png";
import MicroImg from "./Images/Devices/Micro.png";
import batteryImg from "./Images/Devices/battery.png";
// import hubImg from "./Images/Devices/hub.png";
// import CameraModelImg from "./Images/Devices/CameraModel.svg";
import PowerImg from "./Images/Devices/Power.svg";
import bluetoothImg from "./Images/Connectivity/bluetooth.png";
import wifiImg from "./Images/Connectivity/wifi.png";
import GsmImg from "./Images/Connectivity/Gsm.png";
import LedImg from "./Images/Actuators/Led.png";
import MotorImg from "./Images/Actuators/motor.png";
import WheelImg from "./Images/Actuators/Wheel.svg";
import TagImg from "./Images/Actuators/Tag.svg";
import clouldImg from "./Images/Storage/Cloud.png";
import localStorageImg from "./Images/Storage/Localstorage.png";
import Authenticationimg from "./Images/Privacy/Authentication.png";
import Minimizationimg from "./Images/Privacy/Minimization.png";
import Controlimg from "./Images/Privacy/Control.png";
import Informimg from "./Images/Privacy/Inform.png";
import Authorizationinimg from "./Images/Privacy/Authorization.png";
import Encryptionimg from "./Images/Privacy/Encryption.png";
import Consentlistimg from "./Images/Privacy/Consentlist.png";
import Demonstrateimg from "./Images/Privacy/Demonstrate.png";
import anonymousimg from "./Images/Privacy/anonymous.png";
import { sensorsData } from "./sensorsData";
import sensorDefaultImg from "./Images/Sensors/Temperature.png";
import TemperatureImg from "./Images/Sensors/Temperature.png";
import HumidityImg from "./Images/Sensors/Humidity.png";
import lampSensorImg from "./Images/Sensors/LampSensor.png";
import ProximityImage from "./Images/Sensors/Proximity.png";
import cameraImage from "./Images/Sensors/camerasensor.png";
import voiceImage from "./Images/Sensors/voice.png";
import GPSImage from "./Images/Sensors/GPS.png";
import UltraImg from "./Images/Sensors/ultrasonic.png";
import LaserImage from "./Images/Sensors/laser.png";
import smartPhoneImg from "./Images/UserInterface/SmartPhone.png";
import dashboardImg from "./Images/UserInterface/dashboard.png";
// import log from "./Images/log.png";
// --- End of image imports ---

import Swal from "sweetalert2";
// import StarRating from "./StarRating";
// import InteractionLog from "./InteractionLog";
import { useDispatch } from "react-redux";
import { initialData } from "../constant/constant.js";
import { BiPlus } from "react-icons/bi";
import Modal from "../modal/index.js";
// import PdfGenerator from "../modal/components/pdfFile.js";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { useDrag, useDrop } from "react-dnd";
import MultiStepForm from "./MultiStepForm.js";
import FormModal from "./../modal/form/FormModal.js"; // Adjust the path if necessary
import PdfPreviewer from "./pdf/PdfPreviewer.js"; // Adjust path
// import { useNavigate } from "react-router-dom";
import { resetForm } from "../../lib/features/form/formSlice.js";
import TooltipWrapper from "./TooltipWrapper.js";
// import Chatbot from "./Chatbot.js";
// import { resetForm } from "@/lib/features/form/formSlice"; // Adjust path

// --- React DnD Setup ---
const ItemTypes = { CARD: "card" };

const DraggableSidebarItem = ({ id, type, name, imgSrc, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, type, name, imgSrc, from: "sidebar" },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}>
      {children}
    </div>
  );
};

const DraggableCanvasItem = ({ uniqueId, left, top, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { uniqueId, left, top, from: "canvas" },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left,
        top,
        opacity: isDragging ? 0.4 : 1,
        cursor: "move",
      }}
      className="canvas-item-wrapper"
    >
      {children}
    </div>
  );
};
// --- End of DnD Setup ---

const sensorImages = {
  light: lampSensorImg,
  temperature: TemperatureImg,
  humidity: HumidityImg,
  proximity: ProximityImage,
  laser: LaserImage,
  camera: cameraImage,
  voice: voiceImage,
  GPS: GPSImage,
  ultrasonic: UltraImg,
  default: sensorDefaultImg,
};

export default function HomePage() {
  // const [formData, setFormData] = useState({
  //   // Based on your DeviceInformation component (assumed simple text fields)
  //   deviceInfo: {
  //     manufacturer: "",
  //     deviceName: "",
  //     modelNumber: "",
  //     firmwareVersion: "",
  //     updatedOn: "",
  //     manufacturedIn: "",
  //   },

  //   // Based on the fields in your SecurityMechanisms.js component and its data
  //   securityMechanisms: {
  //     securityUpdates: [],
  //     accessControl: [],
  //     securityOversight: "",
  //     technicalDocumentation: [],
  //   },

  //   // Based on the fields in your DataPractices.js component and dataPracticesData
  //   dataPractices: {
  //     sensorDataCollection: {}, // For the special parent-child checkbox group
  //     dataFrequency: [],
  //     dataPurpose: [],
  //     dataStorage: [],
  //     localDataRetention: "", // Radio button group
  //     cloudDataStorage: [],
  //     cloudDataRetention: "", // Radio button group
  //     dataSharedWith: [],
  //     dataSharingFrequency: "", // Radio button group
  //     dataSoldTo: [],
  //     otherDataCollected: [],
  //     childrensDataHandling: [],
  //     dataLinkage: [],
  //     compliance: [],
  //     dataInference: [],
  //   },

  //   // Based on the fields in your MoreInformation.js component and its data
  //   moreInformation: {
  //     privacyPolicy: [],
  //     offlineFunctionality: "", // Radio button group
  //     noDataFunctionality: [],
  //     physicalActuations: [],
  //     compatiblePlatforms: "", // Textarea
  //   },
  // });

  const username = localStorage.getItem("username") || "User";
  const dispatch = useDispatch();

  // --- State Definitions ---
  const [CurrentItem, SetCurrentItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentDropItem, setCurrentCurrentItem] = useState(null);
  // const [showInteractionLog, setShowInteractionLog] = useState(false);
  const [history, setHistory] = useState([]);

  const [interactions, setInteractions] = useState(() => {
    const saved = localStorage.getItem(username + "_interactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [isUsersOpen, setIsUsersOpen] = useState(true);
  const [isDeviceOpen, setDeviceOpen] = useState(true);
  const [isActuatorsOpen, setActuatorsOpen] = useState(true);
  const [isNetworkOpen, setNetworkOpen] = useState(true);
  const [isSensorOpen, setSensorOpen] = useState(false);
  const [isinterfaceOpen, setInterfaceOpen] = useState(false);
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const [isMultiStepFormOpen, setIsMultiStepFormOpen] = useState(false);

  // ... your other states

  // --- 1. ADD THE REFS ---
  // This ref will be attached to the scrollable div inside FormModal
  const modalScrollRef = useRef(null);
  // This ref will store the scroll position number
  const scrollPositionRef = useRef(0);

  // --- 2. ADD THE EFFECT HOOKS ---
  // This hook runs BEFORE React updates the DOM.
  useLayoutEffect(() => {
    // We only act if the modal is open and our ref is attached to the div
    if (isMultiStepFormOpen && modalScrollRef.current) {
      // SAVE the current scroll position of our div
      scrollPositionRef.current = modalScrollRef.current.scrollTop;
    }
  }); // No dependency array, runs on every render

  // This hook runs AFTER React updates the DOM.
  useLayoutEffect(() => {
    // We only act if the modal is open and our ref is attached
    if (isMultiStepFormOpen && modalScrollRef.current) {
      // RESTORE the scroll position of our div
      modalScrollRef.current.scrollTop = scrollPositionRef.current;
    }
  }); // No dependency array, runs after every render

  const closeFormModal = () => {
    setIsMultiStepFormOpen(false);
    dispatch(resetForm());
  };
  // --- Core State for Canvas and Arrows (Loads from localStorage) ---
  const [canvasCards, setCanvasCards] = useState(() => {
    const saved = localStorage.getItem(username + "_canvasCards");
    return saved ? JSON.parse(saved) : [];
  });

  const [arrows, setArrows] = useState(() => {
    const saved = localStorage.getItem(username + "_arrows");
    return saved ? JSON.parse(saved) : [];
  });

  const lineInsts = useRef({});
  const leftBoxRef = useRef(null);

  // --- Helper Function ---
  const getCanonicalArrowId = (id1, id2) => {
    if (!id1 || !id2) return null;
    return [id1, id2].sort().join("-");
  };

  // const updateFormData = useCallback((stepKey, field, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [stepKey]: {
  //       ...prev[stepKey],
  //       [field]: value,
  //     },
  //   }));
  // }, []);

  // --- Effects to Save State to localStorage ---
  useEffect(() => {
    localStorage.setItem(
      username + "_canvasCards",
      JSON.stringify(canvasCards)
    );
  }, [canvasCards, username]);

  useEffect(() => {
    localStorage.setItem(username + "_arrows", JSON.stringify(arrows));
  }, [arrows, username]);

  useEffect(() => {
    localStorage.setItem(
      username + "_interactions",
      JSON.stringify(interactions)
    );
  }, [interactions, username]);

  // --- THE DEFINITIVE LEADER-LINE MANAGEMENT EFFECT ---
  useEffect(() => {
    const timer = setTimeout(() => {
      const LeaderLine = window.LeaderLine;
      if (!LeaderLine) return;
      const arrowIdsInState = new Set(
        arrows.map((arrow) => getCanonicalArrowId(arrow.startId, arrow.endId))
      );
      Object.keys(lineInsts.current).forEach((existingArrowId) => {
        if (!arrowIdsInState.has(existingArrowId)) {
          const lineInstance = lineInsts.current[existingArrowId];
          if (lineInstance) {
            try {
              lineInstance.remove();
            } catch (e) {}
          }
          delete lineInsts.current[existingArrowId];
        }
      });
      arrows.forEach(({ startId, endId, color, type }) => {
        const startElem = document.getElementById(startId);
        const endElem = document.getElementById(endId);
        const arrowId = getCanonicalArrowId(startId, endId);
        if (startElem && endElem && arrowId) {
          if (lineInsts.current[arrowId]) {
            lineInsts.current[arrowId].position();
          } else {
            const line = new LeaderLine(startElem, endElem, {
              color: color || "grey",
              path: "grid",
              size: 3,
              startPlug: "disc",
              endPlug: "arrow1",
            });
            if (type === "double") {
              line.startPlug = "arrow1";
            }
            lineInsts.current[arrowId] = line;
          }
        }
      });
    }, 50);
    return () => {
      clearTimeout(timer);
      if (document.readyState === "complete") {
        Object.values(lineInsts.current).forEach((line) => {
          try {
            line.remove();
          } catch (e) {}
        });
        lineInsts.current = {};
      }
    };
  }, [arrows, canvasCards]);

  // Add this `descriptions` object to hold the text

  const descriptions = {
    user: "An individual whose personal data is collected or processed.",
    Controller:
      "The entity (person or organization) that determines the purposes and means of processing personal data.",
    Dataprocessor:
      "A party that processes personal data on behalf of the controller.",
    battery:
      "A power storage unit that supplies electrical energy to the system.",
    // hub: "A compact integrated circuit that runs embedded software to control devices.",
    // CameraModel: "A sensor capturing images and video.",
    Power:
      "The circuitry or hardware responsible for distributing and regulating power.",
    Microcontroller:
      "A compact integrated circuit that runs embedded software to control devices.",
    Led: "A light‐emitting diode that provides visual signals or illumination.",
    motor:
      "An electromechanical device that converts electrical energy into rotational motion.",
    Wheel: "A rotating component that enables movement or locomotion.",
    Tag: "An electronic identifier (e.g., RFID tag) used to label or track objects.",
    bluetooth:
      "A short-range wireless protocol for data exchange between devices.",
    wifi: "A wireless networking technology for high-speed Internet and LAN access.",
    Gsm: "A cellular communication standard for mobile voice and data services.",
    cloud:
      "Remote servers accessed over the Internet for computing and storage.",
    localstorage:
      "On-device memory (e.g., hard drive, flash) used to store data locally.",
    Temperature: "A sensor that measures ambient or object temperature.",
    Humidity: "A device that detects the moisture level in the air.",
    Light: "A photodetector that measures light intensity.",
    Proximity:
      "A sensor that detects the presence or distance of nearby objects without contact.",
    Laser:
      "A sensor that uses laser beams for precise distance or position measurement.",
    Camera: "A sensor capturing images and video",
    Voice: "A microphone or audio sensor that captures sound.",
    GPS: "A receiver that obtains geolocation coordinates via satellite signals.",
    Ultrasonic:
      "A sensor that uses high-frequency sound waves to measure distance or detect objects.",
    dashboard:
      "A visual interface presenting key metrics and controls in one view.",
    SmartPhone:
      "Software applications (typically mobile or desktop) users interact with.",
    Minimization:
      "Collect or process only the minimum personal data necessary.",
    Control: "Grant individuals the ability to manage how their data is used.",
    Demonstrate:
      "Show proof of compliance with privacy regulations and policies.",
    Consentlist: "A record of user consents, detailing what they’ve agreed to.",
    Encryption:
      "Protect data by encoding it so only authorized parties can read it.",
    Authorization: "Grant or restrict permissions for data access or actions.",
    anonymous: "Process data without any personally identifiable information.",
    Inform:
      "Provide clear notice to individuals about data collection and use.",
    Authentication:
      "Verify the identity of a user or system before granting access.",
  };

  // A helper function to add descriptions to an array of items
  const addDescriptions = (items) =>
    items.map((item) => ({
      ...item,
      description: descriptions[item.id] || "No description available.",
    }));

  // --- Sidebar Data ---
  const sidebarItems = {
    users: addDescriptions([
      { id: "user", type: "user", name: "Data subject", imgSrc: userImg },
      {
        id: "Controller",
        type: "Controller",
        name: "Controller",
        imgSrc: ControllerImg,
      },
      {
        id: "Dataprocessor",
        type: "Dataprocessor",
        name: "Data processor",
        imgSrc: DataprocessorImg,
      },
    ]),
    devices: addDescriptions([
      { id: "battery", type: "battery", name: "Battery", imgSrc: batteryImg },
      // { id: "hub", type: "hub", name: "Smart hub", imgSrc: hubImg },
      // {
      //   id: "CameraModel",
      //   type: "CameraModel",
      //   name: "CameraModel",
      //   imgSrc: CameraModelImg,
      // },
      { id: "Power", type: "Power", name: "Power system", imgSrc: PowerImg },
      {
        id: "Microcontroller",
        type: "Microcontroller",
        name: "Microcontroller",
        imgSrc: MicroImg,
      },
    ]),
    actuators: addDescriptions([
      { id: "Led", type: "Led", name: "Led", imgSrc: LedImg },
      { id: "motor", type: "motor", name: "Motor", imgSrc: MotorImg },
      { id: "Wheel", type: "Wheel", name: "Wheel", imgSrc: WheelImg },
      { id: "Tag", type: "Tag", name: "Tag", imgSrc: TagImg },
    ]),
    network: addDescriptions([
      {
        id: "bluetooth",
        type: "bluetooth",
        name: "Bluetooth",
        imgSrc: bluetoothImg,
      },
      { id: "wifi", type: "wifi", name: "Wifi", imgSrc: wifiImg },
      { id: "Gsm", type: "Gsm", name: "Gsm", imgSrc: GsmImg },
      { id: "cloud", type: "cloud", name: "Cloud", imgSrc: clouldImg },
      {
        id: "localstorage",
        type: "localstorage",
        name: "Local Storage",
        imgSrc: localStorageImg,
      },
    ]),
    sensors: sensorsData.map((s) => ({
      ...s,
      imgSrc: sensorImages[s.type] || sensorImages.default,
      description: descriptions[s.name] || "No description available.",
    })),
    interfaces: addDescriptions([
      {
        id: "dashboard",
        type: "dashboard",
        name: "Dashboard",
        imgSrc: dashboardImg,
      },
      {
        id: "SmartPhone",
        type: "SmartPhone",
        name: "Apps",
        imgSrc: smartPhoneImg,
      },
    ]),
    privacy: addDescriptions([
      {
        id: "Minimization",
        type: "Minimization",
        name: "Minimise",
        imgSrc: Minimizationimg,
      },
      { id: "Control", type: "Control", name: "Control", imgSrc: Controlimg },
      {
        id: "Demonstrate",
        type: "Demonstrate",
        name: "Demonstrate",
        imgSrc: Demonstrateimg,
      },
      {
        id: "Consentlist",
        type: "Consentlist",
        name: "Consent list",
        imgSrc: Consentlistimg,
      },
      {
        id: "Encryption",
        type: "Encryption",
        name: "Encryption",
        imgSrc: Encryptionimg,
      },
      {
        id: "Authorization",
        type: "Authorization",
        name: "Authorisation",
        imgSrc: Authorizationinimg,
      },
      {
        id: "anonymous",
        type: "anonymous",
        name: "Anonymous",
        imgSrc: anonymousimg,
      },
      { id: "Inform", type: "Inform", name: "Inform", imgSrc: Informimg },
      {
        id: "Authentication",
        type: "Authentication",
        name: "Authentication",
        imgSrc: Authenticationimg,
      },
    ]),
  };

  // --- UI and State Manipulation Functions ---
  const savePositionsAndArrows = () => {
    // Since data is saved automatically by useEffect, this button provides user confirmation.
    Swal.fire({
      title: "Saved!",
      text: "Your design is saved automatically.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const addHistory = (action) => {
    setHistory((prev) => [...prev, action]);
  };

  const undoLastAction = () => {
    if (history.length === 0) {
      Swal.fire("Nothing to undo.", "", "info");
      return;
    }
    const lastAction = history[history.length - 1];
    if (lastAction.type === "ADD_CARD") {
      deleteItem(lastAction.id); // Use deleteItem to ensure arrows are also cleaned up
    } else if (lastAction.type === "ADD_ARROW") {
      setArrows((prev) => prev.slice(0, prev.length - 1));
    }
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const addArrow = (type) => {
    let lineColor = document.getElementById("lineColor").value || "grey";
    const availableItems = canvasCards.map((card) => ({
      text: card.name,
      id: card.uniqueId,
    }));
    if (availableItems.length < 2) {
      Swal.fire("Error", "You need at least two items on the canvas.", "error");
      return;
    }
    Swal.fire({
      title: "Select the starting item:",
      input: "select",
      inputOptions: Object.fromEntries(
        availableItems.map((item) => [item.id, item.text])
      ),
      inputPlaceholder: "Select an item",
      showCancelButton: true,
    }).then((result1) => {
      if (result1.isConfirmed && result1.value) {
        const startId = result1.value;
        const remainingItems = availableItems.filter(
          (item) => item.id !== startId
        );
        Swal.fire({
          title: "Select the ending item:",
          input: "select",
          inputOptions: Object.fromEntries(
            remainingItems.map((item) => [item.id, item.text])
          ),
          inputPlaceholder: "Select an item",
          showCancelButton: true,
        }).then((result2) => {
          if (result2.isConfirmed && result2.value) {
            const endId = result2.value;
            const newArrowId = getCanonicalArrowId(startId, endId);
            if (
              arrows.some(
                (arrow) =>
                  getCanonicalArrowId(arrow.startId, arrow.endId) === newArrowId
              )
            ) {
              Swal.fire(
                "Duplicate Arrow",
                "An arrow already exists between these two items.",
                "warning"
              );
              return;
            }
            const newArrow = {
              startId,
              endId,
              color: lineColor,
              type: type[0],
            };
            setArrows((prevArrows) => [...prevArrows, newArrow]);
            addHistory({ type: "ADD_ARROW" });
          }
        });
      }
    });
  };

  const deleteLine = () => {
    if (arrows.length === 0) {
      Swal.fire("No Lines", "There are no lines to delete.", "info");
      return;
    }
    const cardNameMap = new Map(canvasCards.map((c) => [c.uniqueId, c.name]));
    const arrowOptions = {};
    arrows.forEach((arrow) => {
      const startName = cardNameMap.get(arrow.startId) || "Unknown";
      const endName = cardNameMap.get(arrow.endId) || "Unknown";
      const canonicalId = getCanonicalArrowId(arrow.startId, arrow.endId);
      arrowOptions[canonicalId] = `${startName} → ${endName}`;
    });
    Swal.fire({
      title: "Select a line to delete",
      input: "select",
      inputOptions: arrowOptions,
      inputPlaceholder: "Select a line",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const idToDelete = result.value;
        setArrows((prev) =>
          prev.filter(
            (arrow) =>
              getCanonicalArrowId(arrow.startId, arrow.endId) !== idToDelete
          )
        );
      }
    });
  };

  const deleteAll = (type) => {
    const msg =
      type === "lines"
        ? "Are you sure you want to delete all lines?"
        : "Are you sure you want to delete all items and lines?";
    Swal.fire({
      title: "Delete All",
      text: msg,
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === "lines") setArrows([]);
        if (type === "all") {
          setCanvasCards([]);
          setArrows([]);
        }
      }
    });
  };

  const deleteItem = (idToDelete) => {
    setCanvasCards((prev) =>
      prev.filter((card) => card.uniqueId !== idToDelete)
    );
    setArrows((prevArrows) =>
      prevArrows.filter(
        (arrow) => arrow.startId !== idToDelete && arrow.endId !== idToDelete
      )
    );
  };

  // --- DRAG AND DROP LOGIC ---
  const moveCard = useCallback((id, newLeft, newTop) => {
    setCanvasCards((prevCards) =>
      prevCards.map((card) =>
        card.uniqueId === id ? { ...card, left: newLeft, top: newTop } : card
      )
    );
  }, []);

  const addNewCard = useCallback(
    (item, left, top) => {
      const { id, type, name, imgSrc } = item;
      const count = canvasCards.filter((card) => card.originalId === id).length;
      const uniqueId = `${id}_${count}`;
      const newCard = {
        uniqueId,
        originalId: id,
        type,
        name: count > 0 ? `${name} ${count}` : name,
        imgSrc,
        left,
        top,
      };
      setCanvasCards((prev) => [...prev, newCard]);
      addHistory({ type: "ADD_CARD", id: uniqueId });
      SetCurrentItem(uniqueId);
      if (
        type === "user" ||
        type === "Controller" ||
        type === "Dataprocessor"
      ) {
        setShowPopup(true);
      }
    },
    [canvasCards]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop(item, monitor) {
        const clientOffset = monitor.getClientOffset();
        const dropZoneRect = leftBoxRef.current?.getBoundingClientRect();
        if (!clientOffset || !dropZoneRect) return;
        const itemWidth = 150,
          itemHeight = 50;
        const {
          width: dropZoneWidth,
          height: dropZoneHeight,
          left: dropZoneLeft,
          top: dropZoneTop,
        } = dropZoneRect;
        let cursorX = clientOffset.x - dropZoneLeft,
          cursorY = clientOffset.y - dropZoneTop;
        let finalLeft, finalTop;
        if (item.from === "sidebar") {
          finalLeft = cursorX - itemWidth / 2;
          finalTop = cursorY - itemHeight / 2;
        } else {
          const initialSourceOffset = monitor.getInitialSourceClientOffset();
          const initialClientOffset = monitor.getInitialClientOffset();
          if (!initialSourceOffset || !initialClientOffset) return;
          const dragOffsetX = initialClientOffset.x - initialSourceOffset.x;
          const dragOffsetY = initialClientOffset.y - initialSourceOffset.y;
          finalLeft = cursorX - dragOffsetX;
          finalTop = cursorY - dragOffsetY;
        }
        const clampedLeft = Math.max(
          0,
          Math.min(finalLeft, dropZoneWidth - itemWidth)
        );
        const clampedTop = Math.max(
          0,
          Math.min(finalTop, dropZoneHeight - itemHeight)
        );
        if (item.from === "sidebar") {
          addNewCard(item, clampedLeft, clampedTop);
        } else {
          moveCard(item.uniqueId, clampedLeft, clampedTop);
        }
      },
    }),
    [addNewCard, moveCard]
  );

  useEffect(() => {
    if (leftBoxRef.current) {
      drop(leftBoxRef);
    }
  }, [drop]);

  // --- Other Functions & Components ---
  const logInteraction = (type, detail = null, userType = "User") => {
    const newInteraction = {
      type,
      detail,
      userType,
      timestamp: new Date().toISOString(),
    };
    setInteractions((prevInteractions) => [
      ...prevInteractions,
      newInteraction,
    ]);
  };
  // const handleStarClick = (rating, userType) =>
  //   logInteraction("star-rating", rating, userType);
  const handleLearnMoreClick = (userType) =>
    logInteraction("learn-more", null, userType);
  const handleCloseClick = (userType) => {
    logInteraction("close", null, userType);
    setShowPopup(false);
  };
  // const toggleInteractionLog = () => setShowInteractionLog(!showInteractionLog);

  const droppedItems = React.useMemo(() => {
    return canvasCards.reduce((acc, card) => {
      acc[card.uniqueId] = true;
      acc[card.originalId] = true;
      return acc;
    }, {});
  }, [canvasCards]);

  const renderSidebarItem = (item, placement) => (
    <DraggableSidebarItem key={item.id} {...item}>
      {/* Pass the placement prop down to the TooltipWrapper */}
      <TooltipWrapper tooltipText={item.description} placement={placement}>
        <div className="list list-default" data-type={item.type} id={item.id}>
          <div className="container-icons">
            <img src={item.imgSrc} alt={item.name} className="icon-img" />
            <p>{item.name}</p>
          </div>
        </div>
      </TooltipWrapper>
    </DraggableSidebarItem>
  );

  const renderCanvasCard = (card) => {
    const hasPlusButton = ["cloud", "localstorage", "Microcontroller"].includes(
      card.originalId
    );
    return (
      <DraggableCanvasItem key={card.uniqueId} {...card}>
        <div className="list dropped" data-type={card.type} id={card.uniqueId}>
          <div className="container-icons">
            <img src={card.imgSrc} alt={card.name} className="icon-img" />{" "}
            <p>{card.name}</p>
            <div
              style={{
                display: "flex",
                gap: 5,
                position: "absolute",
                right: "5px",
              }}
            >
              <button
                className="delete-btn"
                onClick={() => deleteItem(card.uniqueId)}
              >
                ×
              </button>
              {hasPlusButton && (
                <button
                  className="delete-btn plus-btn"
                  onClick={() => {
                    setCurrentCurrentItem(card.uniqueId);
                    setIsModalOpen(true);
                  }}
                >
                  <BiPlus />
                </button>
              )}
            </div>
          </div>
        </div>
      </DraggableCanvasItem>
    );
  };

  const GDPRPopup = ({
    // onStarClick,
    onLearnMoreClick,
    onCloseClick,
    userType,
  }) => {
    let content;
    if (CurrentItem === "Controller_0" || CurrentItem === "Dataprocessor_0") {
      content = (
        <>
          <div className="header">
            <h3>Data Collection Notice</h3>
            {/* <div className="star-container">
              <StarRating
                onStarClick={(rating) => onStarClick(rating, userType)}
              />
            </div> */}
          </div>
          <p>
            Collect only the data necessary for your goals to keep it relevant
            and limited.
          </p>
          <a
            href="https://gdpr-info.eu/art-5-gdpr/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onLearnMoreClick(userType)}
          >
            Learn more
          </a>
        </>
      );
    } else {
      content = (
        <>
          <div className="header">
            <h3>Privacy Notice</h3>
            {/* <div className="star-container">
              <StarRating
                onStarClick={(rating) => onStarClick(rating, userType)}
              />
            </div> */}
          </div>
          <p>
            Users must be informed when and who and how their data is being
            collected.
          </p>
          <a
            href="https://gdpr-info.eu/art-13-gdpr/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onLearnMoreClick(userType)}
          >
            Learn more
          </a>
        </>
      );
    }
    return (
      <div className="gdpr-popup">
        {content}
        <button onClick={() => onCloseClick(userType)}>Close</button>
      </div>
    );
  };

  const PrivacyComponent = ({ userData }) => {
    const [privacyRisk, setPrivacyRisk] = useState([]);
    const [privacyMitigation, setPrivacyMitigation] = useState([]);
    const [privacyImpact, setPrivacyImpact] = useState([]);
    const [privacyRiskId, setPrivacyRiskId] = useState([]);

    useEffect(() => {
      if (!initialData || !initialData.privacyRules) return;
      const irrelevantCombinationMatch =
        initialData.irrelevantCombination?.some((combination) =>
          combination.items?.every((item) => userData?.hasOwnProperty(item))
        );
      if (irrelevantCombinationMatch) {
        Swal.fire({
          title: "Warning!",
          text: "This object is not relevant to the other items.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      let filteredRisks = initialData.privacyRules.filter((rule) =>
        rule.items.every((item) => userData.hasOwnProperty(item))
      );
      filteredRisks = filteredRisks.map((rule) => ({
        ...rule,
        risk: rule.risk.filter((riskItem) => !userData[riskItem.privacyId]),
      }));
      const risks = filteredRisks
        ?.map((rule) => rule.risk?.map((r) => r.riskText))
        ?.flat();
      const mitigations = filteredRisks
        ?.map((rule) => rule.risk.map((r) => r.mitigation))
        ?.flat();
      const impacts = filteredRisks
        ?.map((rule) => rule.risk?.map((r) => r.impact))
        ?.flat();
      const riskIds = filteredRisks
        ?.map((rule) => rule.risk.map((r) => r.riskId))
        ?.flat();
      setPrivacyRisk(risks);
      setPrivacyMitigation(mitigations);
      setPrivacyImpact(impacts);
      setPrivacyRiskId(riskIds);
    }, [userData]);

    const hasNoData =
      privacyRisk?.length === 0 &&
      privacyMitigation?.length === 0 &&
      privacyImpact?.length === 0;
    return (
      <div style={{ width: "100%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                  minWidth: hasNoData ? "150px" : "auto",
                }}
              >
                Risk Id
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                  minWidth: hasNoData ? "150px" : "auto",
                }}
              >
                Privacy Risks
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                  minWidth: hasNoData ? "150px" : "auto",
                }}
              >
                Privacy Impact
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                  minWidth: hasNoData ? "150px" : "auto",
                }}
              >
                Privacy Mitigation
              </th>
            </tr>
          </thead>
          <tbody>
            {hasNoData ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    border: "1px solid #ddd",
                  }}
                >
                  No privacy risks identified for the current combination of
                  items.
                </td>
              </tr>
            ) : (
              privacyRisk?.map((risk, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      verticalAlign: "top",
                    }}
                  >
                    <pre
                      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                    >
                      {privacyRiskId[index]}
                    </pre>
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      verticalAlign: "top",
                    }}
                  >
                    <pre
                      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                    >
                      {risk}
                    </pre>
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      verticalAlign: "top",
                    }}
                  >
                    <pre
                      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                    >
                      {privacyImpact[index]}
                    </pre>
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      verticalAlign: "top",
                    }}
                  >
                    <pre
                      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                    >
                      {privacyMitigation[index]}
                    </pre>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  // --- FINAL JSX RENDER ---
  return (
    <div className="container">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentDropItem={currentDropItem}
      />
      <div className="username-display">Welcome, {username}!</div>
      {/* <Chatbot /> */}

      <div className="left-wrapper">
        <div id="left-parent">
          {/* --- RESTORED TOOLBAR --- */}
          <div className="btns-cont">
            <button title="Save" onClick={savePositionsAndArrows}>
              {" "}
              <i className="fa-regular fa-floppy-disk"></i>{" "}
            </button>
            <button title="Undo last action" onClick={undoLastAction}>
              {" "}
              <i className="fa-solid fa-rotate-left"></i>{" "}
            </button>
            <select title="Line color" id="lineColor" defaultValue="">
              <option value="" disabled>
                Colour
              </option>
              <option value="grey">Grey</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="orange">Orange</option>
            </select>
            <button
              title="Draw a single arrow line"
              onClick={() => addArrow(["single"])}
            >
              {" "}
              →{" "}
            </button>
            <button
              title="Draw a double arrow line"
              onClick={() => addArrow(["double"])}
            >
              {" "}
              ↔{" "}
            </button>
            <button
              className="del-btn"
              title="Delete a line"
              onClick={deleteLine}
            >
              {" "}
              <i className="fa-solid fa-trash-arrow-up"></i>{" "}
            </button>
            <button
              className="del-btn"
              title="Delete all lines"
              onClick={() => deleteAll("lines")}
            >
              {" "}
              <i className="fa-solid fa-trash-arrow-up"></i>{" "}
            </button>
            <button
              className="del-btn"
              title="Delete all items and lines"
              onClick={() => deleteAll("all")}
            >
              {" "}
              <i className="fa-solid fa-trash"></i>{" "}
            </button>
            <button onClick={() => setIsMultiStepFormOpen(true)}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          {/* Canvas Area */}
          <div
            id="left"
            ref={leftBoxRef}
            style={{ position: "relative", height: "500px" }}
          >
            {canvasCards.map((card) => renderCanvasCard(card))}
          </div>

          {showPopup && (
            <GDPRPopup
              // onStarClick={handleStarClick}
              onLearnMoreClick={handleLearnMoreClick}
              onCloseClick={handleCloseClick}
              userType={CurrentItem}
            />
          )}
        </div>

        {/* --- RESTORED BOTTOM PANEL LAYOUT --- */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 10,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "600px", marginRight: "20px" }}>
            <PrivacyComponent userData={droppedItems} />
          </div>
          {/* <div id="Feedback">
            <div className="container">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={log}
                  alt="Interaction Log Icon"
                  className="interaction-log-img"
                  title="Show Interaction Log"
                  onClick={toggleInteractionLog}
                  style={{ cursor: "pointer" }}
                />
                {showInteractionLog && (
                  <InteractionLog
                    interactions={interactions}
                    onCloseClick={toggleInteractionLog}
                    onStarClick={handleStarClick}
                  />
                )}
                {typeof window !== "undefined" && (
                  <PDFDownloadLink
                    document={<PdfGenerator />}
                    fileName="download.pdf"
                    style={{
                      textDecoration: "none",
                      marginLeft: 10,
                    }}
                  >
                    {({ loading }) => (
                      <button
                        className="del-button"
                        disabled={loading}
                        style={{ padding: 5 }}
                      >
                        <FaDownload color="#D93831" size="1.3em" />
                        {loading ? " Loading..." : " Download Pdf"}
                      </button>
                    )}
                  </PDFDownloadLink>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* --- SIDEBAR --- */}
      <div id="right">
        <div
          className="section-header"
          onClick={() => setIsUsersOpen(!isUsersOpen)}
        >
          <h2>Users</h2>{" "}
          <button type="button" className="collapse-btn">
            {isUsersOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </div>
        {isUsersOpen && (
          <div className="user-container contt">
            {sidebarItems.users.map((item) =>
              renderSidebarItem(item, "bottom")
            )}
          </div>
        )}
        <div
          className="section-header"
          onClick={() => setDeviceOpen(!isDeviceOpen)}
        >
          <h2>Devices</h2>
          <button type="button" className="collapse-btn">
            {isDeviceOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </div>
        {isDeviceOpen && (
          <div className="user-container contt">
            {sidebarItems.devices.map(renderSidebarItem)}
          </div>
        )}
        <div
          className="section-header"
          onClick={() => setActuatorsOpen(!isActuatorsOpen)}
        >
          <h2>Actuators</h2>
          <button type="button" className="collapse-btn">
            {isActuatorsOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </div>
        {isActuatorsOpen && (
          <div className="user-container contt">
            {sidebarItems.actuators.map(renderSidebarItem)}
          </div>
        )}
        <div
          className="section-header"
          onClick={() => setNetworkOpen(!isNetworkOpen)}
        >
          <h2>Network & Storage</h2>
          <button type="button" className="collapse-btn">
            {isNetworkOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </div>
        {isNetworkOpen && (
          <div className="user-container contt">
            {sidebarItems.network.map(renderSidebarItem)}
          </div>
        )}
        <div
          className="section-header"
          onClick={() => setSensorOpen(!isSensorOpen)}
        >
          <h2>Sensors</h2>
          <button type="button" className="collapse-btn">
            {isSensorOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </div>
        {isSensorOpen && (
          <div className="user-container contt">
            {sidebarItems.sensors.map(renderSidebarItem)}
          </div>
        )}
        <div
          className="section-header"
          onClick={() => setInterfaceOpen(!isinterfaceOpen)}
        >
          <h2>User Interface</h2>
          <button type="button" className="collapse-btn">
            {isinterfaceOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </div>
        {isinterfaceOpen && (
          <div className="user-container contt">
            {sidebarItems.interfaces.map(renderSidebarItem)}
          </div>
        )}
        <div
          className="section-header"
          onClick={() => setPrivacyOpen(!isPrivacyOpen)}
        >
          <h2>Privacy Icons</h2>
          <button type="button" className="collapse-btn">
            {isPrivacyOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </div>
        {isPrivacyOpen && (
          <div className="user-container contt">
            {sidebarItems.privacy.map(renderSidebarItem)}
          </div>
        )}
      </div>
      {isMultiStepFormOpen && (
        // Pass the ref to the FormModal component
        <FormModal onClose={closeFormModal} ref={modalScrollRef}>
          <div className="sticky-layout-container">
            <div className="form-panel-scrollable">
              <MultiStepForm />
            </div>
            <div className="preview-panel-sticky">
              {/* Ensure PdfPreviewer itself doesn't have a style that breaks layout */}
              <PdfPreviewer />
            </div>
          </div>
        </FormModal>
      )}
    </div>
  );
}
