// components/CustomSelect.js

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    top: 0,
    left: 0,
  });

  const selectedOption = options.find((option) => option.value === value);

  // --- NEW: A single function to handle closing the dropdown and hiding the tooltip ---
  const closeDropdown = () => {
    setIsOpen(false);
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const handleSelect = (option) => {
    onChange(option.value);
    closeDropdown(); // Use the new helper function
  };

  const handleMouseEnter = (e, description) => {
    if (!description) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      content: description,
      top: rect.top,
      left: rect.left + rect.width / 2,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  // This effect now correctly closes the dropdown AND the tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown(); // Use the new helper function
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // Dependency array is fine as empty

  return (
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
                className="custom-select-option"
                onClick={() => handleSelect(option)}
                onMouseEnter={(e) => handleMouseEnter(e, option.description)}
                onMouseLeave={handleMouseLeave}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {tooltip.visible &&
        ReactDOM.createPortal(
          <div
            className="portal-tooltip"
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
