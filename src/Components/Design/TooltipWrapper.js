// TooltipWrapper.js

import React, { useState } from "react";
import ReactDOM from "react-dom";

// It now accepts a 'placement' prop, defaulting to 'top'
const TooltipWrapper = ({ children, tooltipText, placement = "top" }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    top: 0,
    left: 0,
  });

  const handleMouseEnter = (e) => {
    if (!tooltipText) return;

    const rect = e.currentTarget.getBoundingClientRect();

    // The position calculation changes based on the placement prop
    setTooltip({
      visible: true,
      // If bottom, we want the bottom edge of the element. Otherwise, the top.
      top: placement === "bottom" ? rect.bottom : rect.top,
      left: rect.left + rect.width / 2,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  if (!tooltipText) {
    return children;
  }

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative", display: "inline-block" }}
      >
        {children}
      </div>

      {tooltip.visible &&
        ReactDOM.createPortal(
          <div
            // Conditionally apply a new class for bottom placement
            className={`portal-tooltip ${
              placement === "bottom" ? "placement-bottom" : ""
            }`}
            style={{
              top: `${tooltip.top}px`,
              left: `${tooltip.left}px`,
            }}
          >
            {tooltipText}
          </div>,
          document.body
        )}
    </>
  );
};

export default TooltipWrapper;
