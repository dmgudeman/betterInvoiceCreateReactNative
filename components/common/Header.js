
// Import libraries to make component
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './';


// make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

    return (
      <View style={viewStyle}>
        <Button >
          click
        </Button>
        <Text style={textStyle}>{props.headerText}</Text>
        <Button >
          HotDog
        </Button>
      </View>
    );
};

const styles = {
  viewStyle: {
    flexDirection : 'row',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  },
};
// Make the component available to other parts of app
export { Header };
