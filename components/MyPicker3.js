import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Animated,
  TouchableHighlight,
} from 'react-native';
import Style from './style';

class MyPicker3 extends Component {

componentDidMount() {
  modalVisible= false
  // animatedHeight = new Animated.Value(0);
  allowPointerEvents=  true;
  cancelBtnText = "cancel";
  confirmBtnText = "confirm";
}

_renderIcon() {
  const {
    showIcon,
    iconSource,
    iconComponent,
    customStyles
  } = this.props;

  if (showIcon) {
    if (iconComponent) {
      return iconComponent;
    }
    return (
      <Image
        style={[Style.dateIcon, customStyles.dateIcon]}
        source={iconSource}
      />
    );
  }

  return null;
}
render() {
 return ( 
  
  <TouchableHighlight
    style={[styles.container]}
    underlayColor={'transparent'}
    onPress={console.log('buttonPressed')}
  
  >
    
               <Animated.View
                    style={[Style.datePickerCon, {height: this.animatedHeight}, ]}
                  >
                    <View pointerEvents={this.props.allowPointerEvents ? 'auto' : 'none'}>
                    <Picker selectedValue = {this.props.language} onValueChange = {this.props.updateLanguage}>
                      <Picker.Item label = "Java" value = "java" />
                      <Picker.Item label = "JavaScript" value = "js" />
                    </Picker>
                    </View>
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={this.onPressCancel}
                      style={[Style.btnText, Style.btnCancel]}
                    >
                      <Text
                        style={[Style.btnTextText, Style.btnTextCancel]}
                      >
                        {this.cancelBtnText}
                      </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={this.onPressConfirm}
                      style={[Style.btnText, Style.btnConfirm]}
                     
                    >
                      <Text style={[Style.btnTextText]}>{this.confirmBtnText}</Text>
                    </TouchableHighlight>
                  </Animated.View>

    
  </ TouchableHighlight>

  )}
//  );
// }
}
const styles = StyleSheet.create ({
  container: {

  }
});

export default MyPicker3;