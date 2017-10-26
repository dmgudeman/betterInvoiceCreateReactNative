
import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
      <View style={[styles.containerStyle, {backgroundColor: props.color }]}>
        {props.children}
      </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 0,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  }
};

export { Card };
