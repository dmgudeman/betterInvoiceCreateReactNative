export const validate = ( value, rules ) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'minLength': {
        isValid = isValid && minLengthValidator(value, rules[rule])
        break;
      }
      case 'isNumeric': {
        isValid = isValid && isNumericValidator(value);
        break;
      }
      default: {
        isValid= true;
      }
    }    
  }
  return isValid;
}

const isNumericValidator = value => {
  // console.log( 'IN ISNUMERIC VALIDATOR regex ',  /^[1-9]\d*(\.\d+)?$/.test(value));
  return /^[1-9]\d*(\.\d+)?$/.test(value);
}

const minLengthValidator = (value, minLength) => {
  noWhiteSpace = value.replace(/\s+/g, '').length;
  return noWhiteSpace >= minLength;
}
