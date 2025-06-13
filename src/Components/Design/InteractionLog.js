import React from 'react';
import './HomePage.css'; // Ensure you import the CSS file

const InteractionLog = ({ interactions }) => {
  return (
    <div className="interaction-log">
      <h3>Interaction Log</h3>
      <ul>
        {interactions.map((interaction, index) => (
          <li key={index}>
            <strong>Time:</strong> {new Date(interaction.timestamp).toLocaleString()}, 
            <strong> Type:</strong> {interaction.type},
            <strong> User:</strong> {interaction.userType},
            {interaction.type === 'star-rating' && (
              <>
                <strong> Rating:</strong> {interaction.detail} out of 5
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InteractionLog;