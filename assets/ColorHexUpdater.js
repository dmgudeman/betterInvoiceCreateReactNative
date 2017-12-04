import React from 'react';


export default ColorHexUpdater = (color, updateCompany) => {
  console.log('COLLLORRRRRRRR HEXXXXXXX FIRED color', color);
  switch(color, updateCompany) {
    case 'blue': {
      updateCompany('hex', '#3498db')
    }
    case 'red': {
      updateCompany('hex', '#e74c3c' )
    }
    default: {
      updateCompany('hex', '#3498db')
    }
  }
}