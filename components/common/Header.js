// Import libraries to make component
import React from 'react';
import { Text, View } from 'react-native';
import { HeaderButton } from './';


// make a component
const Header = (props) => {
  const { textStyle, viewStyle, rightButtonStyle} = styles;
  console.log('HEADER props.leftButtonStyle', props.leftButtonStyle);
    return (
      <View style={viewStyle}>
      <HeaderButton buttonStyle={rightButtonStyle}>
         RightButton
        </HeaderButton>
        <Text style={textStyle}>{props.headerText}</Text>
      <HeaderButton buttonStyle={props.leftButtonStyle}>
       {props.leftButtonText}
        </HeaderButton>
      </View>
    );
};

const styles = {
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    justifyContent: 'space-around',
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
  // buttonStyle: {
  //    color: '#95a5a6', 
  //   //  backgroundColor: 'red'
  // }
};
// Make the component available to other parts of app
export { Header };
