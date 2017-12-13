import React from 'react';

const hex = '';
export default ColorHexUpdater = (color) => {
  
  switch(color) {
    case 'blue': {
      return '#3498db';
    }
    case 'brown': {
      return '#8D6E63';
    }
    case 'green': {
      return '#00C853'
    }
    case 'purple': {
      return '#9b59b6';
    }
    case 'red': {
      return '#e74c3c';
    }
    case 'yellow':{
      return '#f1c40f';
    }
    default: {
      return '#7f8c8d';
    }
  }
}