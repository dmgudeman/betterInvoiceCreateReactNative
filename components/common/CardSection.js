import React from 'react';
import { View } from 'react-native';


const CardSection = (props) => {
  return (
    <View style={styles.containerStyle} >
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 0,
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  }
}

export { CardSection };