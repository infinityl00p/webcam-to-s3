import React from 'react';

const PortraitImage = ({ type, defaultImageUrl, imageUrl, onSave, onRetake, width, height }) => {
  const imageSrc = imageUrl ? imageUrl : defaultImageUrl
  return (
    <div>
      <img
        src={imageSrc}
        height={height}
        width={width}
        alt='default'
      />
    </div>
  );
}

export default PortraitImage;