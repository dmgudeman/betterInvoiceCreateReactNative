import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Picker } from 'react-native';
// import {Option} from "react-native-chooser";

const MyPickerItem= ({option}) => {
 
  console.log('MYPICKERITEM option',option);
  return (
        <Picker.Item label="steve" value="stteve"/>
        // <Picker.Item label = "Steve" value = "steve" />
      // <View>
      //   <Text> hi there {option}</Text>
      //   </View>
       
  )
}

export default MyPickerItem;