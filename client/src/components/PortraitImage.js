import React from 'react';

const PortraitImage = ({ type, imageUrl, onSave, onRetake, width, height }) => {
  return (
    <div>
      {imageUrl ?
        <img src={imageUrl} alt='default' />
        :
        <img
          src='http://cdn7.bigcommerce.com/s-viqdwewl26/stencil/8f903ed0-76e7-0135-12e4-525400970412/icons/icon-no-image.svg'
          height={height}
          width={width}
          alt={type}
        />
      }
    </div>
  );
}

export default PortraitImage;