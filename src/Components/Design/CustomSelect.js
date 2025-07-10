// components/CustomSelect.js

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom"; // <-- STEP 1.1: Import ReactDOM

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- STEP 1.2: Add state to manage the tooltip ---
  // This will hold all the information our portal needs.
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    top: 0,
    left: 0,
  });

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  // --- STEP 1.3: Create handlers to show and hide the tooltip ---
  // This runs when the mouse enters a dropdown option.
  const handleMouseEnter = (e, description) => {
    if (!description) return; // Don't do anything if there's no description.

    // Get the exact position of the hovered list item on the screen.
    const rect = e.currentTarget.getBoundingClientRect();

    // Update our state with the tooltip's content and position.
    setTooltip({
      visible: true,
      content: description,
      top: rect.top, // The distance from the top of the viewport.
      left: rect.left + rect.width / 2, // The distance to the horizontal center of the item.
    });
  };

  // This runs when the mouse leaves the dropdown option.
  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // Effect to close the dropdown when clicking outside. (This logic is unchanged).
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- STEP 1.4: Update the JSX ---
  return (
    // Use a React Fragment (<>) to render the dropdown and its portal as siblings.
    <>
      <div className="custom-select-wrapper" ref={dropdownRef}>
        <div
          className={`custom-select-trigger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <span className="custom-arrow"></span>
        </div>
        {isOpen && (
          <ul className="custom-select-options">
            {options.map((option) => (
              <li
                key={option.value}
                // REMOVE the 'tooltip-container' class. It's no longer needed here.
                className="custom-select-option"
                onClick={() => handleSelect(option)}
                // ADD the mouse event listeners to trigger our new handlers.
                onMouseEnter={(e) => handleMouseEnter(e, option.description)}
                onMouseLeave={handleMouseLeave}
              >
                {option.label}
                {/* The old <span className="tooltip-text"> is GONE from here. */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- STEP 1.5: Render the Tooltip using a Portal --- */}
      {/* This checks if the tooltip should be visible. */}
      {tooltip.visible &&
        // ReactDOM.createPortal takes two arguments:
        // 1. WHAT to render (our tooltip div).
        // 2. WHERE to render it (the document body).
        ReactDOM.createPortal(
          <div
            className="portal-tooltip" // Use a new class for special positioning.
            style={{
              top: `${tooltip.top}px`,
              left: `${tooltip.left}px`,
            }}
          >
            {tooltip.content}
          </div>,
          document.body
        )}
    </>
  );
};

export default CustomSelect;
