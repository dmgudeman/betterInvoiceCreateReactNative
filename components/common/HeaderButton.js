
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const HeaderButton = ( props )  => {
  const { textStyle } = styles;
  console.log('HEADERBUTTON props', props);
  return (
    <TouchableOpacity onPress={props.onPress}>
    <View style={props.buttonStyle}>
      <Text style={textStyle}>
        {props.children}
      </Text>
      </View>
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
  },
    //  backgroundColor: 'blue',
    // borderRadius: 5,
    //  borderWidth: 1,
    //  borderColor: 'red',
    //  paddingLeft: 5,
    //  paddingRight: 5,
    // marginLeft: 20,
    // marginRight: 20,
}

export { HeaderButton };


