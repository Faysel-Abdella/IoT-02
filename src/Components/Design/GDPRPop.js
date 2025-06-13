import React from 'react';
import StarRating from './StarRating';

const GDPRPop = ({ currentItem, onStarClick, onLearnMoreClick, onCloseClick }) => {
  let content;
  if (currentItem === 'Controller' || currentItem === 'Dataprocessor') {
    content = (
      <>
        <h3>Data Collection Notice</h3>
        <p>Collect only the data necessary for your goals to keep it relevant and limited.</p>
        <a href="https://gdpr-info.eu/art-5-gdpr/" onClick={onLearnMoreClick}>Learn more</a>
      </>
    );
  } else {
    content = (
      <>
        <h3>Privacy Notice</h3>
        <div className="star-container">
          <StarRating onStarClick={onStarClick} />
        </div>
        <p>Users must be informed when and who and how their data is being collected.</p>
        <a href="https://gdpr-info.eu/art-13-gdpr/" onClick={onLearnMoreClick}>Learn more</a>
      </>
    );
  }

  return (
    <div className="gdpr-popup">
      <div className="star-container">
        <StarRating onStarClick={onStarClick} />
      </div>
      {content}
      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};

export default GDPRPop;
