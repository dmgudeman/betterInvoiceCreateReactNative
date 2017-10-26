
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white'
  },
  buttonStyle: {
    flex: 1,
    //  backgroundColor: 'blue',
    // borderRadius: 5,
    //  borderWidth: 1,
    //  borderColor: 'red',
    //  paddingLeft: 5,
    //  paddingRight: 5,
    // marginLeft: 20,
    // marginRight: 20,
  }
}

export { Button };

