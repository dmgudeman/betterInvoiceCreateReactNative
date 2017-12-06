import React from 'react';


export default ColorHexUpdater = (color, updateCompany) => {
  switch(color) {
    case 'blue': {
      updateCompany('hex', '#3498db')
      break;
    }
    case 'brown': {
      updateCompany('hex', '#8D6E63');
      break
    }
    case 'green': {
      updateCompany('hex', '#00C853')
      break
    }
    case 'purple': {
      updateCompany('hex', '#9b59b6')
      break
    }
    case 'red': {
      updateCompany('hex', '#e74c3c' )
      break
    }
    case 'yellow':{
      updateCompany('hex', '#f1c40f') 
      break
    }
    default: {
      updateCompany('hex', '#3498db')
    }
  }
}