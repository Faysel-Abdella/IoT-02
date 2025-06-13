import React, { useRef, useEffect, useState, useCallback } from "react";
import "react-responsive-modal/styles.css";

import "./HomePage.css";
import "./SensorGrid.css";
// import Chatbot from "./Chatbot.js";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

// --- All image imports remain the same ---
import userImg from "./Images/users/user.png";
import ControllerImg from "./Images/users/Controller.png";
import DataprocessorImg from "./Images/users/Dataprocessor.png";
import MicroImg from "./Images/Devices/Micro.png";
import batteryImg from "./Images/Devices/battery.png";
import hubImg from "./Images/Devices/hub.png";
import CameraModelImg from "./Images/Devices/CameraModel.svg";
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
import log from "./Images/log.png";
// --- End of image imports ---

import Swal from "sweetalert2";
import StarRating from "./StarRating";
import InteractionLog from "./InteractionLog";
import { useDispatch, useSelector } from "react-redux";
import { setJsonData } from "../../store/reducer/reducer.js";
import { initialData } from "../constant/constant.js";
import { BiPlus } from "react-icons/bi";
import Modal from "../modal/index.js";
import PdfGenerator from "../modal/components/pdfFile.js";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// --- React DnD Setup ---

const ItemTypes = {
  CARD: "card",
};

// Sidebar item remains the same
const DraggableSidebarItem = ({ id, type, name, imgSrc, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, type, name, imgSrc, from: "sidebar" }, // Identify as from sidebar
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}>
      {children}
    </div>
  );
};

// Canvas item is now simpler: it's just draggable, not a drop target for reordering.
// It renders at the absolute position passed in props.
const DraggableCanvasItem = ({ uniqueId, left, top, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { uniqueId, left, top, from: "canvas" }, // Identify as from canvas
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
      className="canvas-item-wrapper" // Added for potential styling
    >
      {children}
    </div>
  );
};

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
  const username = localStorage.getItem("username") || "User";
  const dispatch = useDispatch();

  // --- State ---
  const [CurrentItem, SetCurrentItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentDropItem, setCurrentCurrentItem] = useState(null);

  // The state now includes left/top coordinates for each card
  const [canvasCards, setCanvasCards] = useState(() => {
    const saved = localStorage.getItem(username + "_canvasCards");
    return saved ? JSON.parse(saved) : [];
  });

  // Effect to sync state with localStorage
  useEffect(() => {
    localStorage.setItem(
      username + "_canvasCards",
      JSON.stringify(canvasCards)
    );
  }, [canvasCards, username]);

  // --- Other state variables ---
  const [arrows, setArrows] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [showInteractionLog, setShowInteractionLog] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(true);
  const [isDeviceOpen, setDeviceOpen] = useState(true);
  const [isActuatorsOpen, setActuatorsOpen] = useState(true);
  const [isNetworkOpen, setNetworkOpen] = useState(true);
  const [isSensorOpen, setSensorOpen] = useState(false);
  const [isinterfaceOpen, setInterfaceOpen] = useState(false);
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);

  // --- Sidebar Data ---
  const sidebarItems = {
    users: [
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
    ],
    devices: [
      { id: "battery", type: "battery", name: "Battery", imgSrc: batteryImg },
      { id: "hub", type: "hub", name: "Smart hub", imgSrc: hubImg },
      {
        id: "CameraModel",
        type: "CameraModel",
        name: "CameraModel",
        imgSrc: CameraModelImg,
      },
      { id: "Power", type: "Power", name: "Power system", imgSrc: PowerImg },
      {
        id: "Microcontroller",
        type: "Microcontroller",
        name: "Microcontroller",
        imgSrc: MicroImg,
      },
    ],
    actuators: [
      { id: "Led", type: "Led", name: "Led", imgSrc: LedImg },
      { id: "motor", type: "motor", name: "Motor", imgSrc: MotorImg },
      { id: "Wheel", type: "Wheel", name: "Wheel", imgSrc: WheelImg },
      { id: "Tag", type: "Tag", name: "Tag", imgSrc: TagImg },
    ],
    network: [
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
    ],
    sensors: sensorsData.map((s) => ({
      ...s,
      imgSrc: sensorImages[s.type] || sensorImages.default,
    })),
    interfaces: [
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
    ],
    privacy: [
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
    ],
  };

  //arrow functions

  const savePositionsAndArrows = () => {
    //-- Save positions user-specific
    localStorage.setItem(
      username + "_droppedItems",
      JSON.stringify(droppedItems)
    );

    save_Arrow_Data();
  };

  const redrawArrows = () => {
    removeAllArrows();

    //-- Get all saved arrows
    const savedArrows = JSON.parse(localStorage.getItem(username + "arrows"));

    if (savedArrows !== null && savedArrows.length > 0) {
      savedArrows.forEach((arrow) => {
        draw_Arrow(arrow.start, arrow.end, arrow.type, arrow.color);
      });
    }
  };

  const removeAllArrows = () => {
    //-- remove all arrows from the DOM
    const lines = document.querySelectorAll(".leader-line");
    lines.forEach((line) => {
      line.remove();
    });
  };

  const undoLastAction = () => {
    // This undo function is now simplified to work with the new state model.
    // It can undo adding the last card or the last arrow.

    // For a more robust undo/redo, a more complex state management
    // or a library like zustand or redux-undo would be beneficial.

    // A simple strategy: check if there are more arrows than cards added recently, or vice-versa.
    // This is a basic heuristic. We'll just undo the last added card for now as an example.

    if (canvasCards.length > 0) {
      console.log("Undoing last added card.");
      setCanvasCards((prevCards) => prevCards.slice(0, -1));
    } else if (arrows.length > 0) {
      console.log("Undoing last added arrow.");
      setArrows((prevArrows) => prevArrows.slice(0, -1));
    } else {
      console.log("Nothing to undo.");
    }
  };

  const draw_Arrow = (start, end, type, color) => {
    const start_elem = document.getElementById(start.id);
    const end_elem = document.getElementById(end.id);

    if (start_elem === null || end_elem === null) {
      return;
    }

    //-- if both start and end are the same, then return
    if (start_elem == end_elem) {
      //-- show swal2 alert
      Swal.fire({
        title: "Error",
        text: "You cannot draw an arrow from an item to itself",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const LeaderLine = window.LeaderLine;
    LeaderLine.positionByWindowResize = false;

    let line = new LeaderLine(start_elem, end_elem);

    let arrow_config = [
      {
        startSocket: "auto",
        endSocket: "auto",
        color: color,
        path: "auto",
        size: 2,
      },
    ];

    line.startPlug = "disc";

    //-- if type is double, then draw a double arrow
    if (type === "double") {
      //-- update arrow_config
      line.endPlug = "arrow1";
      line.startPlug = "arrow2";
      line.startPlugSize = 1;
      line.endPlugSize = 1;
    }

    //-- get random number between 0 and arrows.length
    line.setOptions(arrow_config[0]);

    //-- use start id and end id to form a new id for the line
    let line_id = `${start.id}_${end.id}`;

    line.id = line_id;

    let arrow_data = {
      id: line_id,
      type: "arrow",
    };

    //-- set undo stack
    setUndoStack((prevStack) => [...prevStack, arrow_data]);
    setUndoStack((prevStack) => [...prevStack, arrow_data]);
  };

  const addArrow = (type) => {
    let lineColor = document.getElementById("lineColor").value;

    //-- get all .list elements in #left
    const selectedSensorsData = Array.from(
      document.querySelector("#left").querySelectorAll(".list")
    );

    //-- get text from p using selectedSensorsData and the keys
    let availablePositionsData = selectedSensorsData.map((elem) => {
      let text = elem.querySelector("p").textContent;
      let data_type = elem.getAttribute("data-type");

      //-- if data_type is not in no_arrows, then return an object with the text as key and the id as value
      if (!arrows.includes(data_type)) {
        // return an object with the text as key and the id as value
        return { text: text, id: elem.id };
      } else {
        return null;
      }
    });

    //-- remove null values from availablePositionsData
    availablePositionsData = availablePositionsData.filter(
      (elem) => elem !== null
    );

    if (availablePositionsData.length < 2) {
      Swal.fire({
        title: "Error",
        text: "You need at least two items to draw an arrow",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Select object 1:",
      input: "select",
      inputOptions: availablePositionsData.map((elem) => elem.text),
      showCancelButton: false,
      inputValidator: (value1) => {
        return new Promise((resolve) => {
          if (value1 === "") {
            resolve("You need to select an object");
          } else {
            Swal.fire({
              title: "Select object 2:",
              input: "select",
              inputOptions: availablePositionsData.map((elem) => elem.text),
              showCancelButton: true,
              inputValidator: (value2) => {
                //-- Add this arrow's data to the arrows variable. The arrows variable will be saved when 'save' is clicked.
                setArrows([
                  ...arrows,
                  {
                    start: availablePositionsData[value1],
                    end: availablePositionsData[value2],
                    type: type[0],
                    color: lineColor,
                  },
                ]);

                let arrow_start = availablePositionsData[value1];
                let arrow_end = availablePositionsData[value2];

                draw_Arrow(arrow_start, arrow_end, type[0], lineColor);
              },
            });
          }
        });
      },
    });
  };

  const save_Arrow_Data = () => {
    //-- get arrows from local storage
    let savedArrows = JSON.parse(localStorage.getItem(username + "arrows"));

    //-- if savedArrows is not null
    if (savedArrows !== null && savedArrows.length > 0) {
      localStorage.setItem(
        username + "arrows",
        JSON.stringify(savedArrows.concat(arrows))
      );
    } else {
      localStorage.setItem(username + "arrows", JSON.stringify(arrows));
    }
  };

  const deleteAll = (type) => {
    let msg;
    if (type === "lines") {
      msg = "Are you sure you want to delete all lines?";
    }
    if (type === "all") {
      msg = "Are you sure you want to delete all items and lines?";
    }

    //-- show swal2 alert
    Swal.fire({
      title: "Delete All",
      text: msg,
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === "lines") {
          deleteAllLines();
        }

        if (type === "all") {
          deleteAllLines();
          deleteAllItems();
        }
      }
    });
  };

  const deleteAllLines = () => {
    //-- remove all arrows from the local storage
    localStorage.removeItem(username + "arrows");

    //--remove arrows from the DOM
    const lines = document.querySelectorAll(".leader-line");
    lines.forEach((line) => {
      line.remove();
    });

    //-- remove all arrows from the state
    setArrows([]);
  };

  const deleteLine = () => {
    //-- get arrows from local storage
    let savedArrows = JSON.parse(localStorage.getItem(username + "arrows"));

    if (savedArrows === null || savedArrows.length === 0) {
      //-- copy the value of the array 'arrows' to 'savedArrows'
      savedArrows = [...arrows];
    }

    const arrow_selector_data = savedArrows.map((arrow, key) => {
      return {
        text: `${arrow.start.text} to ${arrow.end.text}`,
        id: key,
        line: `${arrow.start.id}_${arrow.end.id}`,
      };
    });

    if (arrow_selector_data.length !== 0) {
      //-- show swal2 alert
      Swal.fire({
        title: "Delete Line",
        input: "select",
        inputOptions: arrow_selector_data.map((elem) => elem.text),
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === "") {
              resolve("You need to select a line to delete");
            } else {
              let selected_arrow_to_delete = arrow_selector_data[value];

              //-- splice the arrow from the savedArrows array
              savedArrows.splice(selected_arrow_to_delete.id, 1);

              //-- remove this arrow from arrows
              setArrows((prevArrows) => {
                const newArrows = [...prevArrows];
                newArrows.splice(selected_arrow_to_delete.id, 1);
                return newArrows;
              });

              //-- overwrite the savedArrows in the local storage
              localStorage.setItem(
                username + "arrows",
                JSON.stringify(savedArrows)
              );

              //-- redraw all lines
              redrawArrows();

              resolve("Deleted!");

              //-- close the swal2 alert
              Swal.close();
            }
          });
        },
      });
    } else {
      //-- Show an error
      Swal.fire({
        title: "Error",
        text: "No lines available for deleting!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  };

  //interactions
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    // Retrieve stored interactions from local storage or initialize
    const storedInteractions =
      JSON.parse(localStorage.getItem(username + "_interactions")) || [];
    setInteractions(storedInteractions);
  }, [username]);

  useEffect(() => {
    // Save interactions to local storage whenever they change
    localStorage.setItem(
      username + "_interactions",
      JSON.stringify(interactions)
    );
  }, [interactions]);

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

  const handleStarClick = (rating, userType) => {
    logInteraction("star-rating", rating, userType);
  };

  const handleLearnMoreClick = (userType) => {
    logInteraction("learn-more", null, userType);
  };

  const handleCloseClick = (userType) => {
    logInteraction("close", null, userType);
    setShowPopup(false);
  };

  const toggleInteractionLog = () => {
    setShowInteractionLog(!showInteractionLog);
  };

  // --- Core Drag and Drop Logic ---
  const leftBoxRef = useRef(null);

  // Function to move an existing card on the canvas
  const moveCard = useCallback((id, newLeft, newTop) => {
    setCanvasCards((prevCards) =>
      prevCards.map((card) =>
        card.uniqueId === id ? { ...card, left: newLeft, top: newTop } : card
      )
    );
  }, []);

  // Function to add a new card from the sidebar
  const addNewCard = useCallback(
    (item, left, top) => {
      const { id, type, name, imgSrc } = item;
      const count = canvasCards.filter((card) => card.originalId === id).length;
      const uniqueId = `${id}_${count}`;

      const newCard = {
        uniqueId,
        originalId: id,
        type: type,
        name: count > 0 ? `${name} ${count}` : name, // Adjust naming as needed
        imgSrc: imgSrc,
        left,
        top,
      };

      setCanvasCards((prev) => [...prev, newCard]);
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

  // The main drop handler for the canvas
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop(item, monitor) {
        const clientOffset = monitor.getClientOffset();
        const dropZoneRect = leftBoxRef.current?.getBoundingClientRect();

        if (!clientOffset || !dropZoneRect) {
          return;
        }

        // --- Item and Drop Zone Dimensions ---
        // These dimensions are an approximation of your item's size. Adjust if needed.
        const itemWidth = 150;
        const itemHeight = 50;

        const {
          width: dropZoneWidth,
          height: dropZoneHeight,
          left: dropZoneLeft,
          top: dropZoneTop,
        } = dropZoneRect;

        // Base position of cursor inside the canvas
        let cursorX = clientOffset.x - dropZoneLeft;
        let cursorY = clientOffset.y - dropZoneTop;

        // --- Calculate final position (before clamping) ---
        let finalLeft, finalTop;

        if (item.from === "sidebar") {
          // Center new items on the cursor
          finalLeft = cursorX - itemWidth / 2;
          finalTop = cursorY - itemHeight / 2;
        } else {
          // For existing items, account for the grab offset
          const initialSourceOffset = monitor.getInitialSourceClientOffset();
          const initialClientOffset = monitor.getInitialClientOffset();

          if (!initialSourceOffset || !initialClientOffset) return;

          const dragOffsetX = initialClientOffset.x - initialSourceOffset.x;
          const dragOffsetY = initialClientOffset.y - initialSourceOffset.y;

          finalLeft = cursorX - dragOffsetX;
          finalTop = cursorY - dragOffsetY;
        }

        // --- Clamp the position to stay within the drop zone boundaries ---
        const clampedLeft = Math.max(
          0,
          Math.min(finalLeft, dropZoneWidth - itemWidth)
        );
        const clampedTop = Math.max(
          0,
          Math.min(finalTop, dropZoneHeight - itemHeight)
        );

        // --- Apply the final, clamped position ---
        if (item.from === "sidebar") {
          addNewCard(item, clampedLeft, clampedTop);
        } else {
          moveCard(item.uniqueId, clampedLeft, clampedTop);
        }
      },
    }),
    [addNewCard, moveCard]
  );

  // Attach the drop ref to the canvas
  useEffect(() => {
    if (leftBoxRef.current) {
      drop(leftBoxRef);
    }
  }, [drop]);

  // --- Deletion and other handlers ---

  const deleteItem = (idToDelete) => {
    setCanvasCards((prev) =>
      prev.filter((card) => card.uniqueId !== idToDelete)
    );
    // Additional cleanup logic can be added here if needed
  };

  const deleteAllItems = () => {
    setCanvasCards([]);
  };

  // --- Rendering Functions ---

  const renderSidebarItem = (item) => (
    <DraggableSidebarItem key={item.id} {...item}>
      <div className="list list-default" data-type={item.type} id={item.id}>
        <div className="container-icons">
          <img src={item.imgSrc} alt={item.name} className="icon-img" />
          <p>{item.name}</p>
        </div>
      </div>
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
            <img src={card.imgSrc} alt={card.name} className="icon-img" />
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

  // (PrivacyComponent, GDPRPopup, and other components/functions can be included here without major changes)
  // ...
  const GDPRPopup = ({
    onStarClick,
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
            <div className="star-container">
              <StarRating
                onStarClick={(rating) => onStarClick(rating, userType)}
              />
            </div>
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
            <div className="star-container">
              <StarRating
                onStarClick={(rating) => onStarClick(rating, userType)}
              />
            </div>
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

  // Note: For this to work, you will need a 'droppedItems' state.
  // We can create a derived state for this purpose.
  const droppedItems = React.useMemo(() => {
    return canvasCards.reduce((acc, card) => {
      acc[card.uniqueId] = true;
      // Also add the base type for rule matching
      acc[card.originalId] = true;
      return acc;
    }, {});
  }, [canvasCards]);

  const PrivacyComponent = ({ userData }) => {
    const [privacyRisk, setPrivacyRisk] = useState([]);
    const [privacyMitigation, setPrivacyMitigation] = useState([]);
    const [privacyImpact, setPrivacyImpact] = useState([]);
    const [privacyRiskId, setPrivacyRiskId] = useState([]);

    useEffect(() => {
      // Check for irrelevant combinations and show SweetAlert if there's a match
      const irrelevantCombinationMatch =
        initialData?.irrelevantCombination?.some((combination) =>
          combination?.items?.every((item) => userData?.hasOwnProperty(item))
        );

      if (irrelevantCombinationMatch) {
        Swal.fire({
          title: "Warning!",
          text: "This object is not relevant to the other items.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return; // Stop execution if there is an irrelevant combination
      }

      let filteredRisks = initialData.privacyRules.filter((rule) =>
        rule.items.every((item) => userData.hasOwnProperty(item))
      );

      // Remove risks where the privacyId is present in userData
      filteredRisks = filteredRisks.map((rule) => ({
        ...rule,
        risk: rule.risk.filter((riskItem) => !userData[riskItem.privacyId]),
      }));
      const risks = filteredRisks
        ?.map((rule) => rule?.risk?.map((r) => r?.riskText))
        ?.flat();
      const mitigations = filteredRisks
        ?.map((rule) => rule?.risk.map((r) => r?.mitigation))
        ?.flat();
      const impacts = filteredRisks
        ?.map((rule) => rule?.risk?.map((r) => r?.impact))
        ?.flat();
      const riskIds = filteredRisks
        ?.map((rule) => rule?.risk.map((r) => rule?.riskId))
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
      <>
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
                    padding: "6px",
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
              {privacyRisk?.map((risk, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div className="container">
      {/* --- TOP LEVEL CONTAINER --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentDropItem={currentDropItem}
      />
      <div className="username-display">Welcome, {username}!</div>

      {/* --- MAIN CONTENT WRAPPER (Flexbox will act on this and #right) --- */}
      <div className="left-wrapper">
        <div id="left-parent">
          {/* Toolbar JSX goes here */}
          <div className="btns-cont">
            <button title="Save" onClick={savePositionsAndArrows}>
              <i className="fa-regular fa-floppy-disk"></i>
            </button>
            <button title="Undo" onClick={undoLastAction}>
              <i className="fa-solid fa-rotate-left"></i>
            </button>
            <select title="Line color" id="lineColor">
              <option value="" disabled selected>
                Colour
              </option>
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
              onClick={() => deleteLine()}
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
          </div>

          {/* Canvas Area */}
          <div
            id="left"
            ref={leftBoxRef}
            style={{ position: "relative", height: "500px" }}
          >
            {canvasCards.map((card) => renderCanvasCard(card))}
          </div>

          {/* GDPR Popup */}
          {showPopup && (
            <GDPRPopup
              onStarClick={handleStarClick}
              onLearnMoreClick={handleLearnMoreClick}
              onCloseClick={handleCloseClick}
              userType={CurrentItem}
            />
          )}
        </div>

        {/* --- BOTTOM PANEL MOVED HERE (Still inside left-wrapper) --- */}
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
          <div id="Feedback">
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
                    style={{ textDecoration: "none", marginLeft: 10 }}
                  >
                    {({ loading }) => (
                      <button className="del-button" disabled={loading}>
                        <i
                          className="fa-regular fa-file-pdf"
                          style={{
                            color: "red",
                            fontSize: "24px",
                            border: "none",
                          }}
                        ></i>
                        {loading ? " Loading..." : " Download Pdf"}
                      </button>
                    )}
                  </PDFDownloadLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SIDEBAR (Now a direct sibling of left-wrapper) --- */}
      <div id="right">
        <div
          className="section-header"
          onClick={() => setIsUsersOpen(!isUsersOpen)}
        >
          <h2>Users</h2>
          <button type="button" className="collapse-btn">
            {isUsersOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </div>
        {isUsersOpen && (
          <div className="user-container contt">
            {sidebarItems.users.map(renderSidebarItem)}
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
    </div>
  );
}
