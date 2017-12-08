export const validate = ( value, rules ) => {
  console.log('IN VALIDATE value', value);
  console.log('IN VALIDATE rules', rules);
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      // case 'name': {
      //   isValid = isValid && nameValidator(value);
      //   break;
      // }
      case 'minLength': {
        isValid = isValid && minLengthValidator(value, rules[rule])
        break;
      }
      case 'paymentTerms': {
        isValid = isValid && paymentTermsValidator(value);
        break;
      }
      default: {
        isValid= true;
        break;
      }
    }    
  }
  return isValid;
}

// const nameValidator = (value, minLength) => {
//   return value.length>= minLength
// }

const paymentTermsValidator = value => {
  console.log( 'IN PAYMENTTERMS VALIDATOR regex ',  /\/^([+-]?[1-9]\d*|0)$/.test(value));
  return /\/^([+-]?[1-9]\d*|0)$/.test(value);
}

const minLengthValidator = (value, minLength) => {
  noWhiteSpace = value.replace(/\s+/g, '').length;
  
 console.log('MINLENGTHVALIDATOR noWhiteSpace.length', noWhiteSpace);
 console.log('MINLENGTHVALIDATOR', noWhiteSpace >= minLength );
  return noWhiteSpace >= minLength;
}
